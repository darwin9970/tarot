"use client";

import { useEffect } from "react";

import { usePreferencesStore } from "@/stores/preferences-store";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const hydrate = usePreferencesStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}
