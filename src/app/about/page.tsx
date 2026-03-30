import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const sections = [
  {
    title: "为什么是夜谕",
    body: "Arcana Noctis 并不试图用夸张语言制造神秘感，而是希望把占卜过程重新设计成一次安静、克制、可回看的自我对话。",
  },
  {
    title: "关于隐私",
    body: "首个版本默认只在你的浏览器本地保存历史记录与今日塔罗，不会自动上传到远端数据库，也不包含登录系统。",
  },
  {
    title: "关于解读",
    body: "牌义总结来自预设规则与塔罗数据的组合，并不替代专业建议。它更适合作为整理思绪、观察当下能量的辅助工具。",
  },
];

export default function AboutPage() {
  return (
    <section className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3">
          <Badge variant="accent">About</Badge>
          <h1 className="font-serif text-4xl text-white md:text-5xl">
            关于 Arcana Noctis
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-[color:var(--color-muted)]">
            这是一个围绕“仪式感、可读性与可回访”构建的塔罗 Web 应用。我们相信，真正高级的神秘感，不是噪声，而是克制、质感与留白。
          </p>
        </div>
        <div className="grid gap-4">
          {sections.map((section) => (
            <Card className="rounded-[28px] p-6" key={section.title}>
              <h2 className="font-serif text-3xl text-white">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
                {section.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
