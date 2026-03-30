import type { SpreadDefinition } from "@/types/tarot";

export const spreadDefinitions: Record<SpreadDefinition["mode"], SpreadDefinition> = {
  single: {
    mode: "single",
    title: "单张牌指引",
    subtitle: "一张牌，回应此刻最需要被看见的讯号",
    description: "适合当下需要一个清晰方向、却不想被过多信息打扰的时候。",
    cardCount: 1,
    positions: [
      {
        key: "focus",
        label: "此刻讯号",
        hint: "你当下真正需要看见的核心能量。",
      },
    ],
  },
  "three-card": {
    mode: "three-card",
    title: "过去 / 现在 / 未来",
    subtitle: "让时间的线索缓慢展开",
    description: "适合梳理事件脉络，理解当下所处的位置以及未来可能的转向。",
    cardCount: 3,
    positions: [
      { key: "past", label: "过去", hint: "仍在影响你的旧能量。" },
      { key: "present", label: "现在", hint: "当前最强烈的现实主题。" },
      { key: "future", label: "未来", hint: "接下来即将靠近你的趋势。" },
    ],
  },
  love: {
    mode: "love",
    title: "爱情占卜",
    subtitle: "让情感里未被说出口的部分显形",
    description: "适合关系观察、暧昧走向、复合判断与内在情感状态的梳理。",
    cardCount: 3,
    positions: [
      { key: "heart", label: "心之所向", hint: "关系中的真实情感温度。" },
      { key: "mirror", label: "关系映照", hint: "彼此正在看见或忽略的部分。" },
      { key: "path", label: "关系去向", hint: "接下来一段时间的情感趋势。" },
    ],
  },
  career: {
    mode: "career",
    title: "事业占卜",
    subtitle: "把职业路径里的潜流照亮",
    description: "适合用于工作选择、项目推进、升迁判断与长期方向校准。",
    cardCount: 3,
    positions: [
      { key: "foundation", label: "当前根基", hint: "你现阶段正在依赖的能力与资源。" },
      { key: "momentum", label: "推进力量", hint: "最值得借势而行的现实机会。" },
      { key: "outcome", label: "阶段结果", hint: "若延续此路径，将靠近的结果。" },
    ],
  },
  daily: {
    mode: "daily",
    title: "每日运势",
    subtitle: "今日只出现一次的微光指引",
    description: "每日固定一张牌，以日期为锚，帮助你安静地对准当天节奏。",
    cardCount: 1,
    positions: [
      {
        key: "today",
        label: "今日能量",
        hint: "今天最值得被留意的一束讯号。",
      },
    ],
  },
};
