import { DailyOraclePanel } from "@/components/daily/daily-oracle-panel";

export default function DailyPage() {
  return (
    <section className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-3">
          <h1 className="font-serif text-4xl text-white md:text-5xl">每日运势</h1>
          <p className="max-w-2xl text-sm leading-7 text-[color:var(--color-muted)]">
            今日塔罗会在本地按日期稳定生成，同一天内重复打开也会保持一致。你可以把它看作一张今日的行动提醒，而不是必须照做的命令。
          </p>
        </div>
        <DailyOraclePanel />
      </div>
    </section>
  );
}
