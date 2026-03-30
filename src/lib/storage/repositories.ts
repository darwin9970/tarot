import type { DailyReadingRecord, ReadingSession } from "@/types/tarot";

const STORAGE_KEYS = {
  history: "arcana-noctis.history.v1",
  draft: "arcana-noctis.reading-draft.v1",
  dailyPrefix: "arcana-noctis.daily.v1.",
  preferences: "arcana-noctis.preferences.v1",
} as const;

function parseJson<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function createHistoryRepository(storage: Storage) {
  return {
    getAll(): ReadingSession[] {
      const records = parseJson<ReadingSession[]>(
        storage.getItem(STORAGE_KEYS.history),
        [],
      );

      return [...records].sort((left, right) => {
        return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
      });
    },
    getById(id: string) {
      return this.getAll().find((entry) => entry.id === id) ?? null;
    },
    save(session: ReadingSession) {
      const current = this.getAll().filter((entry) => entry.id !== session.id);
      const next = [session, ...current].sort((left, right) => {
        return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
      });

      storage.setItem(STORAGE_KEYS.history, JSON.stringify(next));
    },
  };
}

export function createReadingDraftRepository(storage: Storage) {
  return {
    get(id: string) {
      const records = parseJson<Record<string, ReadingSession>>(
        storage.getItem(STORAGE_KEYS.draft),
        {},
      );

      return records[id] ?? null;
    },
    save(session: ReadingSession) {
      const records = parseJson<Record<string, ReadingSession>>(
        storage.getItem(STORAGE_KEYS.draft),
        {},
      );
      records[session.id] = session;
      storage.setItem(STORAGE_KEYS.draft, JSON.stringify(records));
    },
    remove(id: string) {
      const records = parseJson<Record<string, ReadingSession>>(
        storage.getItem(STORAGE_KEYS.draft),
        {},
      );
      delete records[id];
      storage.setItem(STORAGE_KEYS.draft, JSON.stringify(records));
    },
  };
}

export function createDailyRepository(storage: Storage) {
  return {
    get(dateKey: string) {
      return parseJson<DailyReadingRecord | null>(
        storage.getItem(`${STORAGE_KEYS.dailyPrefix}${dateKey}`),
        null,
      );
    },
    save(record: DailyReadingRecord) {
      storage.setItem(
        `${STORAGE_KEYS.dailyPrefix}${record.dateKey}`,
        JSON.stringify(record),
      );
    },
  };
}

export function createPreferencesRepository(storage: Storage) {
  return {
    get<T>(fallback: T): T {
      return parseJson<T>(storage.getItem(STORAGE_KEYS.preferences), fallback);
    },
    save<T>(value: T) {
      storage.setItem(STORAGE_KEYS.preferences, JSON.stringify(value));
    },
  };
}
