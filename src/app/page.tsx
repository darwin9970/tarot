import { DailyOraclePanel } from "@/components/daily/daily-oracle-panel";
import { HeroScene } from "@/components/home/hero-scene";
import { ModeGrid } from "@/components/home/mode-grid";
import { RitualSteps } from "@/components/home/ritual-steps";
import { TrustPanel } from "@/components/home/trust-panel";
import { SectionHeading } from "@/components/shared/section-heading";

export default function HomePage() {
  return (
    <>
      <HeroScene />
      <ModeGrid />
      <RitualSteps />
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <SectionHeading
            description="同一天内，你看到的今日塔罗会保持稳定。这让它更像一张贴身日签，而不是一次次刷新的随机结果。"
            eyebrow="每日运势"
            title="一天只出现一次的塔罗讯号。"
          />
          <DailyOraclePanel compact />
        </div>
      </section>
      <TrustPanel />
    </>
  );
}
