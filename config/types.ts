export type QuizOption = {
  id: string;
  label: string;
  description?: string;
};

export type QuizQuestion = {
  id: string;
  title: string;
  description?: string;
  options: readonly QuizOption[];
  selectionMode?: "single" | "multiple";
};

export type QuizResult = {
  id: string;
  level: string;
  minScore: number;
  maxScore: number;
  title: string;
  sections: readonly QuizResultSection[];
  ctaLabel: string;
  ctaUrl: string;
};

export type QuizResultSection = {
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export type QuizAnswers = Record<string, string | string[]>;
