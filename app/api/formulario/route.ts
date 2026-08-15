import { NextResponse } from "next/server";
import { applicationFormQuestions, type ApplicationFormAnswers } from "@/config/application-form";
import { getDatabase } from "@/lib/db";

type SubmissionBody = {
  lead?: { fullName?: unknown; email?: unknown };
  answers?: unknown;
  durationSeconds?: unknown;
  utm?: { source?: unknown; medium?: unknown; campaign?: unknown };
};

function requiredText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  return normalized.length > 0 && normalized.length <= maxLength ? normalized : undefined;
}

function optionalText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized ? normalized.slice(0, maxLength) : null;
}

function validAnswers(value: unknown): value is ApplicationFormAnswers {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const answers = value as Record<string, unknown>;
  return applicationFormQuestions.every((question) => {
    const answer = answers[question.id];
    if (typeof answer !== "string" || !answer.trim() || answer.length > 2000) return false;
    if (question.type === "single" && !(question.options as readonly string[] | undefined)?.includes(answer)) return false;
    if (question.id === "age" && !/^\d{1,3}$/.test(answer)) return false;
    return true;
  });
}

export async function POST(request: Request) {
  let body: SubmissionBody;
  try {
    body = (await request.json()) as SubmissionBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const durationSeconds = typeof body.durationSeconds === "number" ? Math.round(body.durationSeconds) : NaN;
  const fullName = requiredText(body.lead?.fullName, 160);
  const email = requiredText(body.lead?.email, 254)?.toLowerCase();
  const validEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!fullName || !/^\S+(?:\s+\S+)+$/.test(fullName) || !validEmail || !validAnswers(body.answers) || !Number.isFinite(durationSeconds) || durationSeconds < 1 || durationSeconds > 7200) {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  try {
    const sql = getDatabase();
    const rows = await sql`
      INSERT INTO mentorship_applications (
        full_name, email, answers, duration_seconds, utm_source, utm_medium, utm_campaign
      ) VALUES (
        ${fullName}, ${email}, ${JSON.stringify(body.answers)}::jsonb, ${durationSeconds},
        ${optionalText(body.utm?.source, 200)}, ${optionalText(body.utm?.medium, 200)},
        ${optionalText(body.utm?.campaign, 200)}
      ) RETURNING id
    `;
    return NextResponse.json({ id: Number(rows[0]?.id) }, { status: 201 });
  } catch (error) {
    console.error("Mentorship application persistence failed", error);
    return NextResponse.json({ error: "Unable to save response." }, { status: 500 });
  }
}
