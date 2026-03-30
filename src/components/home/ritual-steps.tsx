import { Orbit, Sparkle, Telescope, WandSparkles } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";

const ritualSteps = [
  {
    title: "写下问题",
    description: "让问题保持准确而诚实，牌面会回应你真正关心的部分。",
    icon: Telescope,
  },
  {
    title: "进入调频",
    description: "夜色会先进行洗牌与能量过渡，让注意力慢慢沉到更稳定的位置。",
    icon: Orbit,
  },
  {
    title: "抽取牌面",
    description: "卡牌以正位或逆位出现，每一张都将携带不同方向的讯号。",
    icon: WandSparkles,
  },
  {
    title: "揭晓与回看",
    description: "你会同时得到单牌解析与整体总结，并能在历史记录里重新回看。",
    icon: Sparkle,
  },
];

export function RitualSteps() {
  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <SectionHeading
          description="我们把占卜做成一个有节奏感的进入过程。它不会催促你，而是温柔地带你一步一步靠近真正的问题。"
          eyebrow="仪式流程"
          title="从提问到揭晓，过程本身就是答案的一部分。"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ritualSteps.map(({ title, description, icon: Icon }) => (
            <Card className="rounded-[28px] p-5" key={title}>
              <div className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/8 text-[color:var(--color-accent-gold)]">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-8 font-serif text-2xl text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
