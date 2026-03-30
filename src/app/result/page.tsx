"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { ResultSummary } from "@/components/result/result-summary";
import {
  createHistoryRepository,
  createReadingDraftRepository,
} from "@/lib/storage/repositories";
import { useReadingStore } from "@/stores/reading-store";

function ResultPageInner() {
  const searchParams = useSearchParams();
  const currentSession = useReadingStore((state) => state.currentSession);
  const saveCurrentToHistory = useReadingStore((state) => state.saveCurrentToHistory);
  const sessionId = searchParams.get("session");

  const session = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    if (!sessionId && currentSession) {
      return currentSession;
    }

    if (!sessionId) {
      return null;
    }

    const storage = window.localStorage;
    return (
      createReadingDraftRepository(storage).get(sessionId) ??
      createHistoryRepository(storage).getById(sessionId)
    );
  }, [currentSession, sessionId]);

  return <ResultSummary onSave={saveCurrentToHistory} session={session} />;
}

export default function ResultPage() {
  return (
    <section className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <Suspense fallback={null}>
          <ResultPageInner />
        </Suspense>
      </div>
    </section>
  );
}
