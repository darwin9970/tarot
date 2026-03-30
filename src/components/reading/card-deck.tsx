"use client";

import { motion, useReducedMotion } from "motion/react";

import { TarotCardBack, TarotCardFace } from "@/components/shared/tarot-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DrawnCard } from "@/types/tarot";

interface CardDeckProps {
  cards: DrawnCard[];
  canDraw: boolean;
  onDraw: () => void;
  revealed: boolean;
  className?: string;
}

export function CardDeck({
  cards,
  canDraw,
  onDraw,
  revealed,
  className,
}: CardDeckProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("space-y-5", className)}>
      <div className="relative mx-auto flex min-h-[340px] w-full items-center justify-center">
        {revealed && cards.length > 0 ? (
          <div
            className={cn(
              "grid w-full gap-4",
              cards.length === 1 ? "max-w-[320px]" : "md:grid-cols-3",
            )}
          >
            {cards.map((entry, index) => (
              <motion.div
                animate={reduceMotion ? undefined : { opacity: [0, 1], y: [18, 0] }}
                key={`${entry.card.id}-${entry.position.key}`}
                transition={{ delay: index * 0.12 + 0.1, duration: 0.4 }}
              >
                <TarotCardFace
                  card={entry.card}
                  compact={cards.length > 1}
                  orientation={entry.orientation}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="relative h-[320px] w-[240px]">
            {[0, 1, 2].map((layer) => (
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : canDraw
                      ? { rotate: [-6 + layer * 6, -2 + layer * 6, -6 + layer * 6] }
                      : { y: [0, -10 + layer * 4, 0], rotate: [-7 + layer * 6, -3 + layer * 6, -7 + layer * 6] }
                }
                className="absolute inset-0"
                key={layer}
                transition={{
                  duration: canDraw ? 1.6 : 2.6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                style={{
                  transformOrigin: "center 95%",
                }}
              >
                <TarotCardBack className="h-full w-full" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <Button
          aria-label="抽取塔罗"
          disabled={!canDraw}
          onClick={onDraw}
          size="lg"
          type="button"
        >
          抽取塔罗
        </Button>
      </div>
    </div>
  );
}
