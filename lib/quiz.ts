import { questions } from "@/config/questions";
import { results } from "@/config/results";
import { scoring } from "@/config/scoring";
import type { QuizAnswers, QuizResult } from "@/config/types";

export type QuizScore = {
  score: number;
  answeredQuestionIds: string[];
};

export function isValidAnswer(questionId: string, optionId: string): boolean {
  return questions.some(
    (question) => question.id === questionId && question.options.some((option) => option.id === optionId),
  );
}

export function calculateScore(answers: QuizAnswers): QuizScore {
  const answeredQuestionIds = Object.keys(answers).filter((questionId) => {
    const answer = answers[questionId];
    return typeof answer === "string" && isValidAnswer(questionId, answer);
  });

  const score = answeredQuestionIds.reduce((total, questionId) => {
    const optionId = answers[questionId];
    if (typeof optionId !== "string") return total;
    const points = scoring.answerScores[questionId as keyof typeof scoring.answerScores]?.[
      optionId as never
    ];

    return total + (typeof points === "number" ? points : 0);
  }, 0);

  return { score, answeredQuestionIds };
}

export function getResultForScore(score: number): QuizResult | undefined {
  return results.find((result) => score >= result.minScore && score <= result.maxScore);
}

export function getQuizResult(answers: QuizAnswers): QuizResult | undefined {
  return getResultForScore(calculateScore(answers).score);
}

export function hasCompleteQuizAnswers(answers: QuizAnswers): boolean {
  return questions.every((question) => {
    const answer = answers[question.id];

    if ("selectionMode" in question && question.selectionMode === "multiple") {
      return Array.isArray(answer) && answer.length > 0 && answer.every((optionId) => isValidAnswer(question.id, optionId));
    }

    return typeof answer === "string" && isValidAnswer(question.id, answer);
  });
}
