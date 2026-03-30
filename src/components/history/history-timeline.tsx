import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ReadingSession } from "@/types/tarot";

export function HistoryTimeline({
  entries,
  onReplay,
}: {
  entries: ReadingSession[];
  onReplay: (entry: ReadingSession) => void;
}) {
  if (entries.length === 0) {
    return (
      <Card className="space-y-4 rounded-[32px] p-6">
        <Badge variant="accent">History</Badge>
        <h1 className="font-serif text-3xl text-white">你的历史记录会在这里出现。</h1>
        <p className="text-sm leading-7 text-[color:var(--color-muted)]">
          每次你保存结果，夜谕都会把这次抽牌记录留在本地，方便你之后回来重看。
        </p>
        <Button asChild className="w-fit" size="lg">
          <Link href="/reading">开始第一次抽牌</Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card className="rounded-[28px] p-5 md:p-6" key={entry.id}>
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">
                  {new Intl.DateTimeFormat("zh-CN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(entry.createdAt))}
                </Badge>
                <Badge>{entry.mode}</Badge>
              </div>
              <h2 className="font-serif text-3xl text-white">{entry.summary.headline}</h2>
              <p className="text-sm leading-7 text-[color:var(--color-muted)]">
                问题：{entry.question}
              </p>
              <p className="text-sm leading-7 text-[color:var(--color-muted)]">
                {entry.summary.overview}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link href={`/result?session=${entry.id}`}>查看结果</Link>
              </Button>
              <Button onClick={() => onReplay(entry)} size="lg" type="button">
                再抽一次
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
