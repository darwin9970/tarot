import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ResultSummary } from "@/components/result/result-summary";
import { drawReading } from "@/lib/tarot/engine";

describe("ResultSummary", () => {
  it("renders an empty state when no session exists", () => {
    render(<ResultSummary session={null} />);

    expect(
      screen.getByText("暂时还没有可解读的牌面。"),
    ).toBeInTheDocument();
  });

  it("renders summary copy when a session is available", () => {
    const session = drawReading({
      mode: "single",
      question: "我最近应该把精力放在哪里？",
    });

    render(<ResultSummary session={session} />);

    expect(screen.getByText(session.summary.headline)).toBeInTheDocument();
    expect(screen.getByText(session.summary.overview)).toBeInTheDocument();
  });
});
