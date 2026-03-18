import { createSupabaseServerClient } from "@/lib/supabase/server";

function getRoleFromUser(user: unknown): string | null {
  const u = user as
    | {
        app_metadata?: { role?: unknown };
        user_metadata?: { role?: unknown };
      }
    | undefined
    | null;
  const role =
    (u?.app_metadata as any)?.role ??
    (u?.user_metadata as any)?.role ??
    null;
  return typeof role === "string" ? role : null;
}

export async function isAdminUser() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    const role = getRoleFromUser(data.user);
    return role === "admin";
  } catch {
    // Si Supabase no está configurado (dev) o falla la sesión, asumimos no-admin.
    return false;
  }
}

