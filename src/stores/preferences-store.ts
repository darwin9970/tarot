"use client";

import { create } from "zustand";

import { createPreferencesRepository } from "@/lib/storage/repositories";

export interface PreferencesState {
  hydrated: boolean;
  soundEnabled: boolean;
  motionEnabled: boolean;
  theme: "mystic-dark";
  hydrate: () => void;
  toggleSound: () => void;
  setMotionEnabled: (value: boolean) => void;
}

const defaultPreferences = {
  soundEnabled: false,
  motionEnabled: true,
  theme: "mystic-dark" as const,
};

function readReducedMotionPreference() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const usePreferencesStore = create<PreferencesState>((set, get) => ({
  hydrated: false,
  ...defaultPreferences,
  hydrate: () => {
    if (typeof window === "undefined" || get().hydrated) {
      return;
    }

    const repository = createPreferencesRepository(window.localStorage);
    const persisted = repository.get(defaultPreferences);

    set({
      hydrated: true,
      soundEnabled: persisted.soundEnabled,
      motionEnabled: persisted.motionEnabled && !readReducedMotionPreference(),
      theme: "mystic-dark",
    });
  },
  toggleSound: () => {
    if (typeof window === "undefined") {
      return;
    }

    const next = !get().soundEnabled;

    set({ soundEnabled: next });
    createPreferencesRepository(window.localStorage).save({
      soundEnabled: next,
      motionEnabled: get().motionEnabled,
      theme: get().theme,
    });
  },
  setMotionEnabled: (value) => {
    if (typeof window === "undefined") {
      return;
    }

    set({ motionEnabled: value });
    createPreferencesRepository(window.localStorage).save({
      soundEnabled: get().soundEnabled,
      motionEnabled: value,
      theme: get().theme,
    });
  },
}));
