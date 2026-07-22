import { neon } from "@neondatabase/serverless";

export function getDatabase() {
  const databaseUrl =
    process.env.DATABASE_URL ??
    process.env.NEON_DATABASE_URL ??
    process.env.NEON_DATABASE_DATABASE_URL ??
    process.env.NEON_DATABASE_POSTGRES_URL;

  if (!databaseUrl) {
    throw new Error("No supported Neon database URL is configured.");
  }

  return neon(databaseUrl);
}
