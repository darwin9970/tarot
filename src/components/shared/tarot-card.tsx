"use client";

import { motion } from "motion/react";
import { Sparkles, Stars } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CardOrientation, TarotCard } from "@/types/tarot";

interface TarotCardFaceProps {
  card: TarotCard;
  orientation?: CardOrientation;
  className?: string;
  compact?: boolean;
}

export function TarotCardBack({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "card-glow relative overflow-hidden rounded-[28px] border border-[color:var(--color-accent-gold)]/18 bg-[radial-gradient(circle_at_top,_rgba(159,181,217,0.16),_transparent_36%),linear-gradient(180deg,#12182d_0%,#0a0d16_100%)] p-5",
        className,
      )}
    >
      <div className="absolute inset-3 rounded-[24px] border border-white/10" />
      <div className="absolute inset-6 rounded-[20px] border border-[color:var(--color-accent-gold)]/15" />
      <div className="absolute inset-x-1/2 top-6 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="absolute inset-x-1/2 bottom-6 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="absolute inset-y-1/2 left-6 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/25 to-transparent" />
      <div className="absolute inset-y-1/2 right-6 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/25 to-transparent" />
      <div className="relative flex h-full flex-col items-center justify-center gap-4 rounded-[24px] border border-white/6 bg-black/20">
        <div className="flex size-14 items-center justify-center rounded-full border border-[color:var(--color-accent-gold)]/30 bg-[color:var(--color-accent-gold)]/10 text-[color:var(--color-accent-gold)]">
          <Stars className="size-6" />
        </div>
        <div className="font-serif text-xl tracking-[0.35em] text-white/90">
          ARCANA
        </div>
        <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-muted)]">
          noctis tarot
        </div>
      </div>
    </div>
  );
}

export function TarotCardFace({
  card,
  orientation = "upright",
  className,
  compact = false,
}: TarotCardFaceProps) {
  return (
    <motion.div
      className={cn(
        "card-glow relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(201,169,106,0.14),_transparent_30%),linear-gradient(180deg,rgba(20,25,44,0.96),rgba(10,12,20,0.98))] p-4 sm:p-5",
        className,
      )}
      whileHover={{ y: compact ? -4 : -6 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,_rgba(159,181,217,0.14),_transparent_24%),radial-gradient(circle_at_80%_78%,_rgba(91,77,141,0.16),_transparent_24%)]" />
      <div className="absolute inset-3 rounded-[24px] border border-white/8" />
      <div className="relative flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-serif text-xl text-white">{card.nameZh}</div>
            <div className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-muted)]">
              {card.nameEn}
            </div>
          </div>
          <div className="rounded-full border border-[color:var(--color-accent-gold)]/20 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[color:var(--color-accent-gold)]">
            {orientation === "upright" ? "正位" : "逆位"}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-4">
          <div className="relative flex aspect-[5/7] w-full max-w-[220px] items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
            <div className="absolute size-24 rounded-full border border-[color:var(--color-accent-gold)]/25" />
            <div className="absolute size-40 rounded-full border border-white/8" />
            <div className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/16 to-transparent" />
            <div className="absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/16 to-transparent" />
            <Sparkles className="size-12 text-[color:var(--color-accent-gold)]" />
            <div className="absolute bottom-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] tracking-[0.28em] text-[color:var(--color-muted)]">
              {String(card.number).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {card.keywords.slice(0, compact ? 2 : 4).map((keyword) => (
              <span
                className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] text-[color:var(--color-muted)]"
                key={keyword}
              >
                {keyword}
              </span>
            ))}
          </div>
          {!compact ? (
            <p className="text-sm leading-7 text-[color:var(--color-muted)]">
              {orientation === "upright" ? card.uprightMeaning : card.reversedMeaning}
            </p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
