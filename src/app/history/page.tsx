"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { HistoryTimeline } from "@/components/history/history-timeline";
import { useMounted } from "@/hooks/use-mounted";
import { createHistoryRepository } from "@/lib/storage/repositories";
import type { ReadingSession } from "@/types/tarot";

export default function HistoryPage() {
  const router = useRouter();
  const mounted = useMounted();
  const entries = useMemo<ReadingSession[]>(() => {
    if (!mounted || typeof window === "undefined") {
      return [];
    }

    return createHistoryRepository(window.localStorage).getAll();
  }, [mounted]);

  const handleReplay = useCallback(
    (entry: ReadingSession) => {
      router.push(`/reading?mode=${entry.mode}&question=${encodeURIComponent(entry.question)}`);
    },
    [router],
  );

  return (
    <section className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-3">
          <h1 className="font-serif text-4xl text-white md:text-5xl">历史记录</h1>
          <p className="max-w-2xl text-sm leading-7 text-[color:var(--color-muted)]">
            这里保存了你曾经在夜谕里抽过的牌。它们不是固定答案，更像每个阶段留下的一次自我校准。
          </p>
        </div>
        <HistoryTimeline entries={entries} onReplay={handleReplay} />
      </div>
    </section>
  );
}
