import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseJsClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client for use in Server Components, Route Handlers,
 * and Server Actions. Reads/writes the session via cookies. Uses the public
 * anon key — RLS policies (see db/schema.sql) enforce what each role can do.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll called from a Server Component — safe to ignore when
            // middleware is refreshing the session.
          }
        },
      },
    }
  );
}

/**
 * Public-read client — plain anon-key client with NO cookie access.
 *
 * This is the important part: calling `cookies()` (which the regular
 * createClient() above does, via @supabase/ssr) is a Next.js "Dynamic API"
 * that forces the ENTIRE route to render dynamically on every request —
 * it silently overrides any `export const revalidate = ...` on the page.
 * Every public page (home, shop, product) was going through the
 * cookie-bound client for plain public reads (products, categories,
 * banners, reviews), which meant every navigation did a full fresh
 * server render + live Supabase round-trip, every time, with no caching
 * at all — this is why the site felt heavy moving between pages.
 *
 * Public data doesn't need a session — RLS already allows anon reads on
 * published products, active categories, enabled banners, approved
 * reviews, and website_settings regardless of who's asking. So public
 * reads use this cookie-free client instead, which lets Next.js actually
 * cache/ISR the route per the page's `revalidate` export. Only
 * admin-authenticated reads and every write still use createClient().
 */
export function createPublicClient() {
  return createSupabaseJsClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

/**
 * Admin-only client using the service role key. NEVER import this into any
 * file that ships to the browser — server-only route handlers and server
 * actions for /admin only. Bypasses RLS, so every caller must check auth
 * itself before using it.
 */
export function createAdminClient() {
  const { createClient: createSupabaseClient } = require("@supabase/supabase-js");
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
