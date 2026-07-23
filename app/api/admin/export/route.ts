import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminSession, isValidAdminSession } from "@/lib/admin-auth";
import { getDatabase } from "@/lib/db";

function escapeCsv(value: unknown) { const text = value == null ? "" : String(value); return `"${text.replaceAll('"', '""')}"`; }

export async function GET() {
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(adminSession.cookieName)?.value)) return new NextResponse("Unauthorized", { status: 401 });
  const sql = getDatabase();
  const rows = await sql`SELECT id, created_at, name, phone, score, level, duration_seconds, utm_source, utm_medium, utm_campaign, answers FROM responses ORDER BY created_at DESC`;
  const headers = ["id", "created_at", "name", "phone", "score", "level", "duration_seconds", "utm_source", "utm_medium", "utm_campaign", "answers"];
  const csv = [headers.join(","), ...rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(","))].join("\n");
  return new NextResponse(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=diagnosticos.csv" } });
}
