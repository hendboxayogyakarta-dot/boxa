import { createClient } from "@/lib/supabase/server";

/**
 * Defense-in-depth check every admin Server Action calls before writing
 * anything. RLS (is_admin() in db/schema.sql) is the real backstop — this
 * just fails fast with a clear error instead of a confusing RLS rejection.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Tidak login.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "staff"].includes(profile.role)) {
    throw new Error("Tidak punya akses admin.");
  }

  return { supabase, user };
}
