import { majorArcana } from "@/data/tarot/major-arcana";
import { spreadDefinitions } from "@/data/tarot/spreads";
import { createId, createSeedFromString, createSeededRandom, ensureQuestion } from "@/lib/utils";
import type {
  BuildSummaryInput,
  CardOrientation,
  DailyReadingInput,
  DailyReadingRecord,
  DrawReadingInput,
  DrawnCard,
  QuestionIntent,
  ReadingSession,
  ReadingSummary,
  TarotCard,
} from "@/types/tarot";

const LOVE_KEYWORDS = ["爱", "爱情", "感情", "喜欢", "关系", "婚姻", "伴侣", "暧昧", "复合"];
const CAREER_KEYWORDS = ["事业", "工作", "职业", "面试", "升职", "项目", "合作", "offer", "团队"];

function resolveIntent(question: string, mode: DrawReadingInput["mode"]): QuestionIntent {
  if (mode === "love") {
    return "love";
  }

  if (mode === "career") {
    return "career";
  }

  return classifyQuestionIntent(question);
}

function drawOrientation(rng: () => number): CardOrientation {
  return rng() >= 0.5 ? "upright" : "reversed";
}

function pickUniqueCards(deck: TarotCard[], count: number, rng: () => number) {
  const shuffled = [...deck];

  for (let cursor = shuffled.length - 1; cursor > 0; cursor -= 1) {
    const target = Math.floor(rng() * (cursor + 1));
    [shuffled[cursor], shuffled[target]] = [shuffled[target]!, shuffled[cursor]!];
  }

  return shuffled.slice(0, count);
}

function createDrawnCards(cards: TarotCard[], positions: DrawnCard["position"][], rng: () => number): DrawnCard[] {
  return cards.map((card, index) => ({
    card,
    orientation: drawOrientation(rng),
    position: positions[index]!,
  }));
}

function describeIntent(intent: QuestionIntent) {
  if (intent === "love") {
    return "情感";
  }

  if (intent === "career") {
    return "事业";
  }

  return "整体";
}

function describeSpread(mode: BuildSummaryInput["spreadMode"]) {
  if (mode === "three-card") {
    return "时间脉络";
  }

  if (mode === "love") {
    return "关系流向";
  }

  if (mode === "career") {
    return "职业路径";
  }

  if (mode === "daily") {
    return "今日讯号";
  }

  return "核心指引";
}

function getAspectMeaning(card: TarotCard, intent: QuestionIntent, orientation: CardOrientation) {
  if (intent === "love") {
    return card.love[orientation];
  }

  if (intent === "career") {
    return card.career[orientation];
  }

  return orientation === "upright" ? card.uprightMeaning : card.reversedMeaning;
}

export function classifyQuestionIntent(question: string): QuestionIntent {
  const normalized = question.toLowerCase();

  if (LOVE_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return "love";
  }

  if (CAREER_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return "career";
  }

  return "general";
}

export function buildReadingSummary({
  question,
  questionIntent,
  spreadMode,
  drawnCards,
}: BuildSummaryInput): ReadingSummary {
  const lead = drawnCards[0];
  const closing = drawnCards[drawnCards.length - 1] ?? lead;
  const dominantCard = lead?.card ?? majorArcana[0]!;
  const closingCard = closing?.card ?? dominantCard;
  const dominantMeaning = lead
    ? getAspectMeaning(lead.card, questionIntent, lead.orientation)
    : dominantCard.uprightMeaning;
  const closingMeaning = closing
    ? getAspectMeaning(closing.card, questionIntent, closing.orientation)
    : closingCard.uprightMeaning;
  const orientationLabel = lead?.orientation === "reversed" ? "逆位" : "正位";
  const keywordText = dominantCard.keywords.slice(0, 2).join("、");
  const intentLabel = describeIntent(questionIntent);
  const spreadLabel = describeSpread(spreadMode);

  return {
    headline: `${dominantCard.nameZh}${orientationLabel}回应了你的${intentLabel}提问`,
    overview: `围绕「${question || "未命名的问题"}」，牌阵把注意力落在${spreadLabel}上。${dominantCard.nameZh}带来${keywordText}的讯号，提示你：${dominantMeaning}`,
    advice: `接下来请把节奏放慢一点，以${closingCard.nameZh}的方式收束这段能量。${closingMeaning}`,
  };
}

export function drawReading({
  mode,
  question,
  now,
  deck = majorArcana,
}: DrawReadingInput): ReadingSession {
  const spread = spreadDefinitions[mode];
  const rng = Math.random;
  const normalizedQuestion = ensureQuestion(question);
  const questionIntent = resolveIntent(normalizedQuestion, mode);
  const selectedCards = pickUniqueCards(deck, spread.cardCount, rng);
  const drawnCards = createDrawnCards(selectedCards, spread.positions, rng);

  return {
    id: createId("reading"),
    mode,
    question: normalizedQuestion,
    questionIntent,
    createdAt: now ?? new Date().toISOString(),
    cards: drawnCards,
    summary: buildReadingSummary({
      question: normalizedQuestion,
      questionIntent,
      spreadMode: mode,
      drawnCards,
    }),
  };
}

export function getDailyReading({
  dateKey,
  deck = majorArcana,
}: DailyReadingInput): DailyReadingRecord {
  const spread = spreadDefinitions.daily;
  const rng = createSeededRandom(createSeedFromString(dateKey));
  const [card] = pickUniqueCards(deck, 1, rng);
  const orientation = drawOrientation(rng);
  const drawnCards = createDrawnCards([card!], spread.positions, () => (orientation === "upright" ? 0.8 : 0.2));
  const summary = buildReadingSummary({
    question: `今日塔罗 ${dateKey}`,
    questionIntent: "general",
    spreadMode: "daily",
    drawnCards,
  });

  return {
    id: `daily-${dateKey}`,
    dateKey,
    createdAt: `${dateKey}T00:00:00.000Z`,
    card: card!,
    orientation,
    summary,
  };
}
