"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles, Stars } from "lucide-react";

import { TarotCardBack } from "@/components/shared/tarot-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { brand } from "@/lib/site";

const stats = [
  { value: "22", label: "大阿卡纳已完整收录" },
  { value: "5", label: "首发占卜模式" },
  { value: "Local", label: "记录仅保留在你的设备" },
];

export function HeroScene() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="px-4 pb-16 pt-8 md:px-8 md:pb-24 md:pt-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <motion.div
          animate={reduceMotion ? undefined : { opacity: [0, 1], y: [20, 0] }}
          className="space-y-8"
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-5">
            <Badge variant="accent">沉浸式塔罗仪式</Badge>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.38em] text-[color:var(--color-muted)]">
                {brand.subName}
              </p>
              <h1 className="max-w-4xl font-serif text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
                把问题放进夜色里，
                <span className="text-shimmer block">让牌面替你点亮答案。</span>
              </h1>
            </div>
            <p className="max-w-2xl text-sm leading-8 text-[color:var(--color-muted)] sm:text-base">
              {brand.description}
              从提问、洗牌、感应到揭晓，整个过程被设计成一次完整的进入式体验，而不是冷冰冰的表单提交。
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/reading">
                开始抽牌
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/daily">先看今日运势</Link>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((item) => (
              <Card className="rounded-[24px] p-4" key={item.label}>
                <div className="text-2xl font-serif text-white">{item.value}</div>
                <p className="mt-2 text-xs leading-6 text-[color:var(--color-muted)]">
                  {item.label}
                </p>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0, 1], scale: [0.96, 1], rotate: [0.6, 0] }
          }
          className="relative mx-auto flex w-full max-w-[460px] items-center justify-center"
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(201,169,106,0.15),_transparent_55%)] blur-3xl" />
          <div className="relative flex h-[520px] w-full items-center justify-center">
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [-5, -7, -5] }}
              className="absolute left-8 top-20 w-[220px]"
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <TarotCardBack className="aspect-[5/7]" />
            </motion.div>
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, 8, 0], rotate: [7, 9, 7] }}
              className="absolute right-6 top-14 w-[220px]"
              transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <TarotCardBack className="aspect-[5/7]" />
            </motion.div>
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
              className="relative z-10 w-[250px]"
              transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <TarotCardBack className="aspect-[5/7]" />
            </motion.div>
            <div className="absolute bottom-6 flex gap-3 text-[color:var(--color-muted)]">
              <Sparkles className="size-4" />
              <Stars className="size-4" />
              <Sparkles className="size-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
