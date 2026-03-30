"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";

import { TarotCardFace } from "@/components/shared/tarot-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMounted } from "@/hooks/use-mounted";
import { getDailyReading } from "@/lib/tarot/engine";
import { createDailyRepository } from "@/lib/storage/repositories";
import { formatDisplayDate, getLocalDateKey } from "@/lib/utils/date";

interface DailyOraclePanelProps {
  compact?: boolean;
}

function getDailyRecordSnapshot() {
  if (typeof window === "undefined") {
    return null;
  }

  const dateKey = getLocalDateKey();
  const repository = createDailyRepository(window.localStorage);
  const stored = repository.get(dateKey);
  const nextRecord = stored ?? getDailyReading({ dateKey });

  if (!stored) {
    repository.save(nextRecord);
  }

  return nextRecord;
}

export function DailyOraclePanel({
  compact = false,
}: DailyOraclePanelProps) {
  const mounted = useMounted();
  const record = useMemo(
    () => (mounted ? getDailyRecordSnapshot() : null),
    [mounted],
  );

  if (!record) {
    return (
      <Card className="flex min-h-[320px] items-center justify-center">
        <p className="text-sm text-[color:var(--color-muted)]">
          正在调频今日的星象讯号...
        </p>
      </Card>
    );
  }

  return (
    <Card className="grid gap-6 md:grid-cols-[0.92fr_1.08fr] md:items-center">
      <TarotCardFace
        card={record.card}
        className="mx-auto w-full max-w-[300px]"
        compact={compact}
        orientation={record.orientation}
      />
      <div className="space-y-4">
        <Badge variant="accent">{formatDisplayDate(record.dateKey)}</Badge>
        <div className="space-y-2">
          <h3 className="font-serif text-3xl text-white">
            今日塔罗：{record.card.nameZh}
          </h3>
          <p className="text-sm leading-7 text-[color:var(--color-muted)]">
            {record.summary.overview}
          </p>
        </div>
        <p className="text-sm leading-7 text-[color:var(--color-muted)]">
          {record.summary.advice}
        </p>
        <Button asChild className="w-fit" size="lg" variant="secondary">
          <Link href="/daily">
            查看完整日签
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
