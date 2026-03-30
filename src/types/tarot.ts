export type ArcanaType = "major" | "minor";

export type ReadingMode = "single" | "three-card" | "love" | "career" | "daily";

export type QuestionIntent = "general" | "love" | "career";

export type CardOrientation = "upright" | "reversed";

export type ReadingStage =
  | "question"
  | "mode"
  | "shuffle"
  | "attune"
  | "draw"
  | "reveal";

export interface TarotAspect {
  upright: string;
  reversed: string;
}

export interface TarotCard {
  id: string;
  number: number;
  nameZh: string;
  nameEn: string;
  arcana: ArcanaType;
  suit?: string;
  rank?: string;
  image?: string;
  tags?: string[];
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  love: TarotAspect;
  career: TarotAspect;
  wealth: TarotAspect;
  spirituality: TarotAspect;
}

export interface SpreadPosition {
  key: string;
  label: string;
  hint: string;
}

export interface SpreadDefinition {
  mode: ReadingMode;
  title: string;
  subtitle: string;
  description: string;
  cardCount: number;
  positions: SpreadPosition[];
}

export interface DrawnCard {
  card: TarotCard;
  orientation: CardOrientation;
  position: SpreadPosition;
}

export interface ReadingSummary {
  headline: string;
  overview: string;
  advice: string;
}

export interface ReadingSession {
  id: string;
  mode: ReadingMode;
  question: string;
  questionIntent: QuestionIntent;
  createdAt: string;
  cards: DrawnCard[];
  summary: ReadingSummary;
}

export interface DailyReadingRecord {
  id: string;
  dateKey: string;
  createdAt: string;
  card: TarotCard;
  orientation: CardOrientation;
  summary: ReadingSummary;
}

export interface DrawReadingInput {
  mode: Exclude<ReadingMode, "daily">;
  question?: string;
  now?: string;
  deck?: TarotCard[];
}

export interface DailyReadingInput {
  dateKey: string;
  deck?: TarotCard[];
}

export interface BuildSummaryInput {
  question: string;
  questionIntent: QuestionIntent;
  spreadMode: ReadingMode;
  drawnCards: DrawnCard[];
}
