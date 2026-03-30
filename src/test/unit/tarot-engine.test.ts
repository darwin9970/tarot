import { describe, expect, it } from "vitest";

import {
  buildReadingSummary,
  classifyQuestionIntent,
  drawReading,
  getDailyReading,
} from "@/lib/tarot/engine";

describe("tarot engine", () => {
  it("classifies love questions into the love intent", () => {
    expect(classifyQuestionIntent("这段感情会走向稳定吗？")).toBe("love");
  });

  it("draws exactly one card for the single spread", () => {
    const reading = drawReading({
      mode: "single",
      question: "我最近需要关注什么？",
    });

    expect(reading.mode).toBe("single");
    expect(reading.cards).toHaveLength(1);
    expect(reading.cards[0]?.orientation === "upright" || reading.cards[0]?.orientation === "reversed").toBe(true);
    expect(reading.cards[0]?.position.key).toBe("focus");
  });

  it("draws three unique cards for the past-present-future spread", () => {
    const reading = drawReading({
      mode: "three-card",
      question: "我的职业方向会如何发展？",
    });

    expect(reading.cards).toHaveLength(3);
    expect(new Set(reading.cards.map((card) => card.card.id)).size).toBe(3);
    expect(reading.cards.map((card) => card.position.key)).toEqual([
      "past",
      "present",
      "future",
    ]);
  });

  it("returns a stable daily reading for the same date", () => {
    const first = getDailyReading({ dateKey: "2026-03-30" });
    const second = getDailyReading({ dateKey: "2026-03-30" });

    expect(second.card.id).toBe(first.card.id);
    expect(second.orientation).toBe(first.orientation);
  });

  it("generates a structured summary with headline, overview, and advice", () => {
    const reading = drawReading({
      mode: "love",
      question: "这段关系值得继续投入吗？",
    });

    const summary = buildReadingSummary({
      question: reading.question,
      questionIntent: reading.questionIntent,
      spreadMode: reading.mode,
      drawnCards: reading.cards,
    });

    expect(summary.headline.length).toBeGreaterThan(6);
    expect(summary.overview.length).toBeGreaterThan(18);
    expect(summary.advice.length).toBeGreaterThan(12);
  });
});
