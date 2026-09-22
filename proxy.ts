import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Only /admin needs the auth check — this was previously matching every
  // route (including the public homepage, shop, and product pages), which
  // meant an extra Supabase Auth round-trip on every single public page
  // load. Scoping it to /admin/* removes that cost for every visitor who
  // isn't in the dashboard.
  matcher: ["/admin/:path*"],
};
