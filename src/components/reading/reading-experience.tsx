"use client";

import Link from "next/link";
import { startTransition, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, RotateCcw } from "lucide-react";

import { CardDeck } from "@/components/reading/card-deck";
import {
  ReadingStageController,
  readingStages,
} from "@/components/reading/reading-stage-controller";
import { SpreadSelector } from "@/components/reading/spread-selector";
import { Separator } from "@/components/ui/separator";
import { TarotCardFace } from "@/components/shared/tarot-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useReadingStore } from "@/stores/reading-store";
import type { ReadingMode } from "@/types/tarot";

const validModes = new Set<Exclude<ReadingMode, "daily">>([
  "single",
  "three-card",
  "love",
  "career",
]);

export function ReadingExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const question = useReadingStore((state) => state.question);
  const selectedMode = useReadingStore((state) => state.selectedMode);
  const stage = useReadingStore((state) => state.stage);
  const currentSession = useReadingStore((state) => state.currentSession);
  const setQuestion = useReadingStore((state) => state.setQuestion);
  const setMode = useReadingStore((state) => state.setMode);
  const setStage = useReadingStore((state) => state.setStage);
  const createSession = useReadingStore((state) => state.createSession);
  const reset = useReadingStore((state) => state.reset);

  const beginReading = () => {
    createSession({
      mode: selectedMode,
      question,
    });
  };

  useEffect(() => {
    const mode = searchParams.get("mode");
    const searchQuestion = searchParams.get("question");

    if (mode && validModes.has(mode as Exclude<ReadingMode, "daily">)) {
      setMode(mode as Exclude<ReadingMode, "daily">);
      setStage("mode");
    }

    if (searchQuestion) {
      setQuestion(searchQuestion);
    }
  }, [searchParams, setMode, setQuestion, setStage]);

  useEffect(() => {
    if (stage !== "shuffle") {
      return;
    }

    const timer = window.setTimeout(() => {
      setStage("attune");
    }, 1200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [setStage, stage]);

  useEffect(() => {
    if (stage !== "attune") {
      return;
    }

    const timer = window.setTimeout(() => {
      setStage("draw");
    }, 1600);

    return () => {
      window.clearTimeout(timer);
    };
  }, [setStage, stage]);

  const revealHeadline = useMemo(() => {
    if (!currentSession) {
      return null;
    }

    return readingStages.find((item) => item.key === "reveal")?.title ?? "牌义揭晓";
  }, [currentSession]);

  return (
    <section className="px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <Card className="space-y-6 rounded-[32px] p-6 md:p-7">
          <Badge variant="accent">Reading Ritual</Badge>
          <div className="space-y-3">
            <h1 className="font-serif text-4xl text-white md:text-5xl">
              在进入牌阵前，先让问题变得清晰。
            </h1>
            <p className="text-sm leading-7 text-[color:var(--color-muted)]">
              你可以直接写下问题，也可以只带着一个模糊方向进入。夜谕会先用结构帮你稳定下来，再把答案慢慢揭给你看。
            </p>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-3">
              <label
                className="text-sm font-medium text-white"
                htmlFor="reading-question"
              >
                你的问题
              </label>
              <Textarea
                id="reading-question"
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="例如：这段关系接下来会走向更稳定的状态吗？"
                value={question}
              />
              <p className="text-xs leading-6 text-[color:var(--color-muted)]">
                可选填写，但问题越清晰，整体解读会越聚焦。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={beginReading}
                size="lg"
                type="button"
              >
                开始占卜
                <ArrowRight className="size-4" />
              </Button>
              <Button onClick={reset} size="lg" type="button" variant="secondary">
                重置
              </Button>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-white">选择牌阵</h2>
              <Badge>{selectedMode}</Badge>
            </div>
            <SpreadSelector onSelect={setMode} selectedMode={selectedMode} />
            <Button
              onClick={beginReading}
              size="lg"
              type="button"
              variant="secondary"
            >
              开始洗牌
            </Button>
          </div>
        </Card>

        <Card className="space-y-6 rounded-[32px] p-6 md:p-7">
          <ReadingStageController stage={stage} />
          <Separator />
          <CardDeck
            canDraw={stage === "draw"}
            cards={currentSession?.cards ?? []}
            onDraw={() => setStage("reveal")}
            revealed={stage === "reveal"}
          />

          {stage === "reveal" && currentSession ? (
            <div className="space-y-5 rounded-[28px] border border-white/10 bg-black/20 p-5">
              <div className="space-y-2">
                <Badge variant="accent">{revealHeadline}</Badge>
                <h2 className="font-serif text-3xl text-white">
                  {currentSession.summary.headline}
                </h2>
                <p className="text-sm leading-7 text-[color:var(--color-muted)]">
                  {currentSession.summary.overview}
                </p>
              </div>
              {currentSession.cards.length === 1 ? (
                <TarotCardFace
                  card={currentSession.cards[0]!.card}
                  orientation={currentSession.cards[0]!.orientation}
                />
              ) : null}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    startTransition(() => {
                      router.push(`/result?session=${currentSession.id}`);
                    });
                  }}
                  size="lg"
                  type="button"
                >
                  查看完整解读
                </Button>
                <Button onClick={reset} size="lg" type="button" variant="secondary">
                  <RotateCcw className="size-4" />
                  再抽一次
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-black/20 p-5 text-sm leading-7 text-[color:var(--color-muted)]">
              当前阶段会在这里展示引导文案与揭晓结果。当抽牌按钮亮起时，请主动按下它，让牌面从深色牌背中翻开。
            </div>
          )}

          <Button asChild size="lg" variant="ghost">
            <Link href="/">返回首页</Link>
          </Button>
        </Card>
      </div>
    </section>
  );
}
