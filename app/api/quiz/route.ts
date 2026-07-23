import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { calculateScore, getQuizResult, hasCompleteQuizAnswers } from "@/lib/quiz";
import type { QuizAnswers } from "@/config/types";

type SubmissionBody = {
  lead?: { name?: unknown; email?: unknown; phone?: unknown };
  answers?: unknown;
  durationSeconds?: unknown;
  utm?: { source?: unknown; medium?: unknown; campaign?: unknown };
};

function text(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  return normalized.length > 0 && normalized.length <= maxLength ? normalized : undefined;
}

function optionalText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized.slice(0, maxLength) : null;
}

function isQuizAnswers(value: unknown): value is QuizAnswers {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  return Object.values(value).every(
    (answer) => typeof answer === "string" || (Array.isArray(answer) && answer.every((option) => typeof option === "string")),
  );
}

export async function POST(request: Request) {
  let body: SubmissionBody;

  try {
    body = (await request.json()) as SubmissionBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = text(body.lead?.name, 160);
  const email = optionalText(body.lead?.email, 254);
  const phone = text(body.lead?.phone, 40);
  const answers = body.answers;
  const durationSeconds = typeof body.durationSeconds === "number" ? Math.round(body.durationSeconds) : NaN;

  const phoneDigits = phone?.replace(/\D/g, "") ?? "";
  if (!name || !phone || ![10, 11].includes(phoneDigits.length) || !isQuizAnswers(answers) || !hasCompleteQuizAnswers(answers) || !Number.isFinite(durationSeconds) || durationSeconds < 1 || durationSeconds > 7200) {
    return NextResponse.json({ error: "Invalid quiz submission." }, { status: 400 });
  }

  const { score } = calculateScore(answers);
  const result = getQuizResult(answers);
  if (!result) return NextResponse.json({ error: "Unable to determine result." }, { status: 400 });

  const utmSource = optionalText(body.utm?.source, 200);
  const utmMedium = optionalText(body.utm?.medium, 200);
  const utmCampaign = optionalText(body.utm?.campaign, 200);

  try {
    const sql = getDatabase();
    const rows = await sql`
      INSERT INTO responses (
        name, email, phone, score, level, answers, duration_seconds, utm_source, utm_medium, utm_campaign
      ) VALUES (
        ${name}, ${email}, ${phone}, ${score}, ${result.level}, ${JSON.stringify(answers)}::jsonb,
        ${durationSeconds}, ${utmSource}, ${utmMedium}, ${utmCampaign}
      )
      RETURNING id
    `;

    return NextResponse.json({ id: Number(rows[0]?.id) }, { status: 201 });
  } catch (error) {
    console.error("Quiz response persistence failed", error);
    return NextResponse.json({ error: "Unable to save response." }, { status: 500 });
  }
}
