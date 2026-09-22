# BOXA.YK

Curated toy & collectible marketplace for Yogyakarta. Next.js (App Router) +
TypeScript + Tailwind CSS, built to run on Supabase (Postgres + Auth +
Storage) and deploy to Vercel.

## What's actually built vs. what's scaffolded

This repo is genuinely functional right now — `npm run dev` gives you a
complete, working customer site (home, shop with filters/search/sort,
product detail pages, about page) rendered from a typed mock dataset. That's
**Phase 1** from the brief, done for real, not a mockup.

What's **scaffolded but not wired to a live backend** (because that needs
your own Supabase project, credentials, and a deploy target this environment
doesn't have access to):

- **Database**: `db/schema.sql` is the complete schema — every table, enum,
  index, and RLS policy described in the brief (products, categories,
  images, reviews, website_settings, homepage_sections, navigation_items,
  media, analytics_events, profiles). Nothing is running against it yet.
- **Admin dashboard** (`/admin`): the UI shell, navigation, and all pages
  exist and render real data from the shared data layer — but there's no
  Supabase Auth check yet, and the product/category/review CRUD forms
  aren't wired to mutations. See the `TODO` comments in
  `app/admin/layout.tsx` and `app/admin/products/page.tsx`.
- **Image uploads / media library**: needs a Supabase Storage bucket.
- **Analytics**: `app/api/cta-click/route.ts` logs the shape of the event
  but doesn't insert into Postgres yet.

Everything is written so that connecting Supabase is a matter of filling in
`lib/data.ts` (each function already has the real query commented directly
underneath the mock fallback) rather than rewriting components.

## 1. Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the site works immediately with no environment
variables set (it uses `lib/mock-data.ts`).

## 2. Connect Supabase

1. Create a project at https://supabase.com.
2. In the SQL editor, paste and run `db/schema.sql` top to bottom. It
   creates every table, enum, index, RLS policy, and seeds
   `website_settings` + `homepage_sections` with sensible defaults so the
   site renders correctly the moment it's connected.
3. In **Storage**, create two public buckets: `product-images` and
   `media-library`. Add RLS policies on `storage.objects` mirroring the
   `is_admin()` pattern already used in `schema.sql` (public `SELECT`,
   admin-only `INSERT`/`UPDATE`/`DELETE`).
4. In **Authentication**, create your first admin user, then insert a row
   into `profiles` for that user with `role = 'admin'`.
5. Copy `.env.local.example` to `.env.local` and fill in the three values
   from **Project Settings > API**.
6. In `next.config.ts`, add your Supabase project's storage domain to
   `images.remotePatterns` (something like
   `{ protocol: "https", hostname: "YOUR_PROJECT.supabase.co" }`).
7. In `lib/data.ts`, uncomment the real Supabase query in each function and
   remove the mock fallback above it.
8. In `app/admin/layout.tsx`, add the session/role check described in the
   `TODO` comment at the top of the file, so `/admin` actually requires
   login.

## 3. Deploy

- Push this repo to GitHub.
- Import it into Vercel.
- Add the same three environment variables from `.env.local` in the
  Vercel project settings.
- Connect your Hostinger-purchased domain to the Vercel project once ready
  (Vercel's domain settings walk through the DNS records needed).

## Project structure

```
app/
  page.tsx                 Homepage (CMS-section driven)
  shop/page.tsx             Product listing, filters, search, sort
  product/[slug]/page.tsx   Product detail
  tentang/page.tsx          About BOXA
  admin/                    Admin dashboard shell (see TODOs)
  api/cta-click/route.ts    CTA click tracking endpoint
components/                UI components (header, footer, product card, CTA...)
lib/
  types.ts                  Types matching the DB schema exactly
  data.ts                   Single seam between UI and data source
  mock-data.ts               Typed demo content (swap out once Supabase is live)
  supabase/                 Browser/server/admin Supabase clients
db/schema.sql               Full Postgres schema + RLS policies
```

## Brand

Colors, type, and voice are documented inline in `app/globals.css`
(`@theme` tokens) and `lib/mock-data.ts` (`mockSettings`, which mirrors the
`website_settings` table). Palette: deep maroon (`#591C1F`) for nav/CTA,
flame orange (`#E4590C`) as the energetic accent, warm ember yellow
(`#F5A924`) for badges, coral (`#E8654F`) as a supporting accent, on a warm
cream background (`#FBF5EC`) so product photography stays the focus.
Display type is Baloo 2 (rounded, friendly — echoes the logo's bold rounded
wordmark); body/UI text is Inter.

**No logo file was attached to the original brief** — the color system
above was built from the written description (maroon background, flame
icon, warm coral accent, bold rounded type). Once you have the actual
BOXA.YK logo file, drop it in `public/` and wire it into
`components/site-header.tsx` and `website_settings.logo_url`.
