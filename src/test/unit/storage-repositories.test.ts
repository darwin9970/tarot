import { beforeEach, describe, expect, it } from "vitest";

import { drawReading, getDailyReading } from "@/lib/tarot/engine";
import {
  createDailyRepository,
  createHistoryRepository,
  createReadingDraftRepository,
} from "@/lib/storage/repositories";

describe("storage repositories", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("persists history records in descending order by created time", () => {
    const repository = createHistoryRepository(window.localStorage);
    const older = drawReading({
      mode: "single",
      question: "旧的问题",
      now: "2026-03-29T08:00:00.000Z",
    });
    const newer = drawReading({
      mode: "single",
      question: "新的问题",
      now: "2026-03-30T08:00:00.000Z",
    });

    repository.save(older);
    repository.save(newer);

    expect(repository.getAll().map((entry) => entry.id)).toEqual([
      newer.id,
      older.id,
    ]);
  });

  it("can restore a saved reading draft by session id", () => {
    const repository = createReadingDraftRepository(window.localStorage);
    const session = drawReading({
      mode: "career",
      question: "下一阶段工作重点是什么？",
    });

    repository.save(session);

    expect(repository.get(session.id)?.question).toBe(session.question);
  });

  it("stores and reloads a daily reading by date key", () => {
    const repository = createDailyRepository(window.localStorage);
    const record = getDailyReading({ dateKey: "2026-03-30" });

    repository.save(record);

    expect(repository.get("2026-03-30")?.card.id).toBe(record.card.id);
  });
});
