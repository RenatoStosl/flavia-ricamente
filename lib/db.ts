import { neon } from "@neondatabase/serverless";

export function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL ?? process.env.NEON_DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL or NEON_DATABASE_URL is not configured.");
  }

  return neon(databaseUrl);
}
