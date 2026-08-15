import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { applicationFormQuestions } from "@/config/application-form";
import { adminSession, isValidAdminSession } from "@/lib/admin-auth";
import { getDatabase } from "@/lib/db";

function escapeCsv(value: unknown) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET() {
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(adminSession.cookieName)?.value)) return new NextResponse("Unauthorized", { status: 401 });

  const sql = getDatabase();
  const rows = await sql`SELECT id, created_at, full_name, email, duration_seconds, utm_source, utm_medium, utm_campaign, answers FROM mentorship_applications ORDER BY created_at DESC`;
  const metadataHeaders = ["id", "created_at", "full_name", "email", "duration_seconds", "utm_source", "utm_medium", "utm_campaign"];
  const headers = [...metadataHeaders, ...applicationFormQuestions.map((question) => question.title)];
  const csvRows = rows.map((row) => {
    const answers = row.answers as Record<string, string>;
    const values = [
      ...metadataHeaders.map((header) => row[header]),
      ...applicationFormQuestions.map((question) => answers[question.id] ?? ""),
    ];
    return values.map(escapeCsv).join(",");
  });
  const csv = [`\uFEFF${headers.map(escapeCsv).join(",")}`, ...csvRows].join("\n");
  return new NextResponse(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=formularios-mentoria.csv" } });
}
