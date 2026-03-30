"use client";

import { create } from "zustand";

import { drawReading } from "@/lib/tarot/engine";
import {
  createHistoryRepository,
  createReadingDraftRepository,
} from "@/lib/storage/repositories";
import type { ReadingMode, ReadingSession, ReadingStage } from "@/types/tarot";

interface ReadingStoreState {
  question: string;
  selectedMode: Exclude<ReadingMode, "daily">;
  stage: ReadingStage;
  currentSession: ReadingSession | null;
  lastSavedSessionId: string | null;
  setQuestion: (question: string) => void;
  setMode: (mode: Exclude<ReadingMode, "daily">) => void;
  setStage: (stage: ReadingStage) => void;
  createSession: (overrides?: {
    question?: string;
    mode?: Exclude<ReadingMode, "daily">;
  }) => ReadingSession;
  restoreSession: (sessionId: string) => ReadingSession | null;
  saveCurrentToHistory: () => void;
  reset: () => void;
}

const defaultMode: Exclude<ReadingMode, "daily"> = "single";

export const useReadingStore = create<ReadingStoreState>((set, get) => ({
  question: "",
  selectedMode: defaultMode,
  stage: "question",
  currentSession: null,
  lastSavedSessionId: null,
  setQuestion: (question) => set({ question }),
  setMode: (selectedMode) => set({ selectedMode }),
  setStage: (stage) => set({ stage }),
  createSession: (overrides) => {
    const mode = overrides?.mode ?? get().selectedMode;
    const question = overrides?.question ?? get().question;
    const session = drawReading({ mode, question });

    if (typeof window !== "undefined") {
      createReadingDraftRepository(window.localStorage).save(session);
    }

    set({
      question: session.question,
      selectedMode: mode,
      stage: "shuffle",
      currentSession: session,
    });

    return session;
  },
  restoreSession: (sessionId) => {
    if (typeof window === "undefined") {
      return null;
    }

    const storage = window.localStorage;
    const draftRepository = createReadingDraftRepository(storage);
    const historyRepository = createHistoryRepository(storage);
    const session =
      draftRepository.get(sessionId) ?? historyRepository.getById(sessionId);

    if (!session) {
      return null;
    }

    set({
      question: session.question,
      selectedMode: session.mode === "daily" ? defaultMode : session.mode,
      stage: "reveal",
      currentSession: session,
    });

    return session;
  },
  saveCurrentToHistory: () => {
    if (typeof window === "undefined") {
      return;
    }

    const session = get().currentSession;

    if (!session) {
      return;
    }

    createHistoryRepository(window.localStorage).save(session);
    set({ lastSavedSessionId: session.id });
  },
  reset: () =>
    set({
      question: "",
      selectedMode: defaultMode,
      stage: "question",
      currentSession: null,
      lastSavedSessionId: null,
    }),
}));
