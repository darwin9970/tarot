import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ReadingStageController } from "@/components/reading/reading-stage-controller";

describe("ReadingStageController", () => {
  it("highlights the active stage and shows its copy", () => {
    render(<ReadingStageController stage="attune" />);

    expect(
      screen.getByRole("heading", { level: 2, name: "感应能量" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("把注意力交还给问题，让牌堆开始回应你。"),
    ).toBeInTheDocument();
  });
});
