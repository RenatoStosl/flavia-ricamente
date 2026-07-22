import { NextResponse } from "next/server";
import { adminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url), { status: 303 });
  response.cookies.set(adminSession.cookieName, "", { ...adminSession.cookieOptions, maxAge: 0 });
  return response;
}
