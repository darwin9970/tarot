import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TarotCardFace } from "@/components/shared/tarot-card";
import type { ReadingSession } from "@/types/tarot";

export function ResultSummary({
  session,
  onSave,
}: {
  session: ReadingSession | null;
  onSave?: () => void;
}) {
  if (!session) {
    return (
      <Card className="space-y-4 rounded-[32px] p-6">
        <Badge variant="accent">Result</Badge>
        <h1 className="font-serif text-3xl text-white">暂时还没有可解读的牌面。</h1>
        <p className="text-sm leading-7 text-[color:var(--color-muted)]">
          先回到抽牌流程，完成洗牌与揭晓后，结果才会在这里完整出现。
        </p>
        <Button asChild className="w-fit" size="lg">
          <Link href="/reading">返回抽牌页</Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-5 rounded-[32px] p-6 md:p-7">
        <Badge variant="accent">Reading Result</Badge>
        <div className="space-y-3">
          <h1 className="font-serif text-4xl text-white md:text-5xl">
            {session.summary.headline}
          </h1>
          <p className="text-sm leading-7 text-[color:var(--color-muted)]">
            问题：{session.question}
          </p>
        </div>
        <p className="text-sm leading-7 text-[color:var(--color-muted)]">
          {session.summary.overview}
        </p>
        <p className="text-sm leading-7 text-[color:var(--color-muted)]">
          {session.summary.advice}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={onSave} size="lg" type="button">
            保存结果
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href={`/reading?mode=${session.mode}&question=${encodeURIComponent(session.question)}`}>
              再抽一次
            </Link>
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        {session.cards.map((entry) => (
          <TarotCardFace
            card={entry.card}
            className="h-full"
            key={`${entry.card.id}-${entry.position.key}`}
            orientation={entry.orientation}
          />
        ))}
      </div>

      <Accordion className="space-y-3" collapsible type="single">
        {session.cards.map((entry) => (
          <AccordionItem key={`${entry.card.id}-${entry.position.key}`} value={entry.card.id}>
            <AccordionTrigger>
              <div className="space-y-1">
                <div>{entry.position.label}</div>
                <div className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-muted)]">
                  {entry.card.nameEn} · {entry.orientation === "upright" ? "正位" : "逆位"}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>{entry.orientation === "upright" ? entry.card.uprightMeaning : entry.card.reversedMeaning}</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <Card className="rounded-[22px] p-4">
                    <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-accent-gold)]">爱情</div>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
                      {entry.card.love[entry.orientation]}
                    </p>
                  </Card>
                  <Card className="rounded-[22px] p-4">
                    <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-accent-gold)]">事业</div>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
                      {entry.card.career[entry.orientation]}
                    </p>
                  </Card>
                  <Card className="rounded-[22px] p-4">
                    <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-accent-gold)]">财运</div>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
                      {entry.card.wealth[entry.orientation]}
                    </p>
                  </Card>
                  <Card className="rounded-[22px] p-4">
                    <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-accent-gold)]">灵性</div>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
                      {entry.card.spirituality[entry.orientation]}
                    </p>
                  </Card>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
