import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CardDeck } from "@/components/reading/card-deck";
import { spreadDefinitions } from "@/data/tarot/spreads";
import { majorArcana } from "@/data/tarot/major-arcana";

describe("CardDeck", () => {
  it("prevents drawing when the deck is disabled", async () => {
    const onDraw = vi.fn();
    const user = userEvent.setup();

    render(
      <CardDeck
        cards={[
          {
            card: majorArcana[0]!,
            orientation: "upright",
            position: spreadDefinitions.single.positions[0]!,
          },
        ]}
        canDraw={false}
        onDraw={onDraw}
        revealed={false}
      />,
    );

    const button = screen.getByRole("button", { name: "抽取塔罗" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onDraw).not.toHaveBeenCalled();
  });

  it("allows drawing when the deck is active", async () => {
    const onDraw = vi.fn();
    const user = userEvent.setup();

    render(<CardDeck cards={[]} canDraw onDraw={onDraw} revealed={false} />);

    await user.click(screen.getByRole("button", { name: "抽取塔罗" }));
    expect(onDraw).toHaveBeenCalledTimes(1);
  });
});
