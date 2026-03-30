import {
  BriefcaseBusiness,
  Heart,
  Layers3,
  Sparkles,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { spreadDefinitions } from "@/data/tarot/spreads";
import { cn } from "@/lib/utils";
import type { ReadingMode } from "@/types/tarot";

const modeIcons = {
  single: Sparkles,
  "three-card": Layers3,
  love: Heart,
  career: BriefcaseBusiness,
} satisfies Record<Exclude<ReadingMode, "daily">, React.ComponentType<{ className?: string }>>;

export function SpreadSelector({
  selectedMode,
  onSelect,
}: {
  selectedMode: Exclude<ReadingMode, "daily">;
  onSelect: (mode: Exclude<ReadingMode, "daily">) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {(["single", "three-card", "love", "career"] as const).map((mode) => {
        const spread = spreadDefinitions[mode];
        const Icon = modeIcons[mode];
        const active = selectedMode === mode;

        return (
          <button
            className={cn(
              "cursor-pointer text-left",
              active && "translate-y-[-2px]",
            )}
            key={mode}
            onClick={() => onSelect(mode)}
            type="button"
          >
            <Card
              className={cn(
                "h-full rounded-[28px] p-5 transition-colors",
                active && "border-[color:var(--color-accent-gold)]/35 bg-[color:var(--color-accent-gold)]/10",
              )}
            >
              <div className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/8 text-[color:var(--color-accent-gold)]">
                <Icon className="size-5" />
              </div>
              <div className="mt-6 space-y-3">
                <h3 className="font-serif text-2xl text-white">{spread.title}</h3>
                <p className="text-sm leading-7 text-[color:var(--color-muted)]">
                  {spread.subtitle}
                </p>
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
