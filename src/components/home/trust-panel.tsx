import { LockKeyhole, Smartphone, Wand2 } from "lucide-react";

import { Card } from "@/components/ui/card";

const trustPoints = [
  {
    title: "本地记录",
    description: "占卜历史默认保留在你的设备中，不做云端上传。",
    icon: LockKeyhole,
  },
  {
    title: "移动端优先",
    description: "交互尺寸、动效密度与阅读节奏都优先按手机体验设计。",
    icon: Smartphone,
  },
  {
    title: "可持续扩展",
    description: "数据与解读逻辑已按后续接 AI、数据库与分享能力预留接口。",
    icon: Wand2,
  },
];

export function TrustPanel() {
  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        {trustPoints.map(({ title, description, icon: Icon }) => (
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
    </section>
  );
}
