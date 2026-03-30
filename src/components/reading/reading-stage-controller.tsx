import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ReadingStage } from "@/types/tarot";

export const readingStages: {
  key: ReadingStage;
  title: string;
  description: string;
}[] = [
  {
    key: "question",
    title: "写下问题",
    description: "一句清晰的问题，会让牌面更准确地回应你的核心困惑。",
  },
  {
    key: "mode",
    title: "选择牌阵",
    description: "让合适的结构承接你的提问，而不是把所有问题混在一起。",
  },
  {
    key: "shuffle",
    title: "洗牌中",
    description: "让杂讯先沉下去，牌堆会重新排列出属于你的顺序。",
  },
  {
    key: "attune",
    title: "感应能量",
    description: "把注意力交还给问题，让牌堆开始回应你。",
  },
  {
    key: "draw",
    title: "抽取牌面",
    description: "当按钮亮起时，请主动抽取那张正要靠近你的牌。",
  },
  {
    key: "reveal",
    title: "牌义揭晓",
    description: "答案已经出现，接下来请慢慢阅读每一层讯号。",
  },
];

export function ReadingStageController({ stage }: { stage: ReadingStage }) {
  const current = readingStages.find((item) => item.key === stage) ?? readingStages[0];

  return (
    <div className="space-y-4">
      <Badge variant="accent">当前阶段</Badge>
      <div className="space-y-2">
        <h2 className="font-serif text-3xl text-white">{current.title}</h2>
        <p className="text-sm leading-7 text-[color:var(--color-muted)]">
          {current.description}
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {readingStages.map((item, index) => {
          const active = item.key === stage;
          const passed = readingStages.findIndex((entry) => entry.key === stage) > index;

          return (
            <div
              className={cn(
                "rounded-[20px] border px-4 py-3 text-sm transition-colors",
                active && "border-[color:var(--color-accent-gold)]/35 bg-[color:var(--color-accent-gold)]/10 text-white",
                !active &&
                  passed &&
                  "border-white/10 bg-white/6 text-[color:var(--color-foreground)]",
                !active && !passed && "border-white/8 bg-black/20 text-[color:var(--color-muted)]",
              )}
              key={item.key}
            >
              <div className="text-[11px] uppercase tracking-[0.3em] opacity-70">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="mt-2">{item.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
