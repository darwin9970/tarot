import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HistoryTimeline } from "@/components/history/history-timeline";

describe("HistoryTimeline", () => {
  it("renders an empty state when there is no reading history", () => {
    render(<HistoryTimeline entries={[]} onReplay={() => undefined} />);

    expect(screen.getByText("你的历史记录会在这里出现。")).toBeInTheDocument();
  });
});
