import { NextRequest, NextResponse } from "next/server";

/**
 * Logs a CTA click (Shopee / WhatsApp / external link) for the lightweight
 * analytics described in the spec (section 29). Once Supabase is connected,
 * this should insert into `analytics_events` with { product_id, cta_type,
 * created_at }, using the server client so it runs with the visitor's
 * session but still respects RLS (public insert-only policy on that table).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product_id, cta_type } = body ?? {};
    if (!product_id || !cta_type) {
      return NextResponse.json({ ok: false, error: "missing fields" }, { status: 400 });
    }

    // const supabase = await createClient();
    // await supabase.from("analytics_events").insert({
    //   product_id,
    //   event_type: "cta_click",
    //   cta_type,
    // });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
