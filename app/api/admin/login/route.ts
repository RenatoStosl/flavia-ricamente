import { NextResponse } from "next/server";
import { adminCredentialsMatch, adminSession, createAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!adminCredentialsMatch(username, password)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), { status: 303 });
  }

  const session = createAdminSession();
  const response = NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
  response.cookies.set(adminSession.cookieName, session.value, { ...adminSession.cookieOptions, maxAge: session.maxAge });
  return response;
}
