import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { adminSession, isValidAdminSession } from "@/lib/admin-auth";

export async function requireAdmin() {
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(adminSession.cookieName)?.value)) {
    redirect("/admin/login");
  }
}
