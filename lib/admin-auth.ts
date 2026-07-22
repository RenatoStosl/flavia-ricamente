import { createHmac, timingSafeEqual } from "node:crypto";

const sessionCookieName = "flavia_admin_session";
const sessionLifetimeSeconds = 60 * 60 * 12;

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured.");
  return secret;
}

function signature(value: string): string {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function adminCredentialsMatch(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USER ?? "";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  const userMatches = timingSafeEqual(Buffer.from(username.slice(0, 256).padEnd(256)), Buffer.from(expectedUser.slice(0, 256).padEnd(256)));
  const passwordMatches = timingSafeEqual(Buffer.from(password.slice(0, 256).padEnd(256)), Buffer.from(expectedPassword.slice(0, 256).padEnd(256)));

  return Boolean(expectedUser && expectedPassword && username.length <= 256 && password.length <= 256 && userMatches && passwordMatches);
}

export function createAdminSession(): { value: string; maxAge: number } {
  const expiresAt = Math.floor(Date.now() / 1000) + sessionLifetimeSeconds;
  const payload = `admin.${expiresAt}`;
  return { value: `${payload}.${signature(payload)}`, maxAge: sessionLifetimeSeconds };
}

export function isValidAdminSession(value: string | undefined): boolean {
  if (!value) return false;
  const [subject, expiresAt, receivedSignature] = value.split(".");
  if (subject !== "admin" || !expiresAt || !receivedSignature || Number(expiresAt) < Date.now() / 1000) return false;

  const expectedSignature = signature(`${subject}.${expiresAt}`);
  return timingSafeEqual(Buffer.from(receivedSignature), Buffer.from(expectedSignature));
}

export const adminSession = {
  cookieName: sessionCookieName,
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  },
};
