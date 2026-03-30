import Link from "next/link";
import {
  BriefcaseBusiness,
  Heart,
  Layers3,
  Sparkles,
  SunMedium,
} from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { spreadDefinitions } from "@/data/tarot/spreads";

const modes = [
  {
    mode: "single",
    icon: Sparkles,
    highlight: "适合快速定向",
  },
  {
    mode: "three-card",
    icon: Layers3,
    highlight: "梳理时间线索",
  },
  {
    mode: "love",
    icon: Heart,
    highlight: "看见关系流向",
  },
  {
    mode: "career",
    icon: BriefcaseBusiness,
    highlight: "梳理职业路径",
  },
  {
    mode: "daily",
    icon: SunMedium,
    highlight: "每天只出现一次",
  },
] as const;

export function ModeGrid() {
  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <SectionHeading
          description="不同的问题，需要不同层次的阅读方式。夜谕把每种模式都设计成一条清晰的体验路径，让你知道自己此刻应该如何进入。"
          eyebrow="占卜模式"
          title="选择与你的问题最贴合的牌阵。"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {modes.map(({ mode, icon: Icon, highlight }) => {
            const spread = spreadDefinitions[mode];

            return (
              <Card className="flex h-full flex-col rounded-[28px] p-5" key={mode}>
                <div className="flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/8 text-[color:var(--color-accent-gold)]">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-muted)]">
                    {highlight}
                  </span>
                </div>
                <div className="mt-8 space-y-3">
                  <h3 className="font-serif text-2xl text-white">{spread.title}</h3>
                  <p className="text-sm leading-7 text-[color:var(--color-muted)]">
                    {spread.description}
                  </p>
                </div>
                <Button asChild className="mt-8 w-fit" variant="secondary">
                  <Link href={mode === "daily" ? "/daily" : `/reading?mode=${mode}`}>
                    进入模式
                  </Link>
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
