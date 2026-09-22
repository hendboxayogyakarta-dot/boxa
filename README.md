# BOXA.YK

Curated toy & collectible marketplace for Yogyakarta. Next.js (App Router) +
TypeScript + Tailwind CSS + Framer Motion, built on Supabase (Postgres +
Auth + Storage), deployed to Vercel.

## Status

**Backend wiring (this revision):**
- `lib/data.ts` now runs real Supabase queries when `NEXT_PUBLIC_SUPABASE_URL`
  is set (previously these were commented-out TODOs) — falls back to typed
  mock data when it isn't, so local dev never breaks.
- `/admin/*` is now actually gated: `proxy.ts` (Next's middleware) redirects
  unauthenticated visitors to `/login`, and `app/admin/layout.tsx` does a
  second check that the signed-in user's `profiles.role` is `admin` or
  `staff` — mirroring the `is_admin()` function every RLS policy in
  `db/schema.sql` relies on. A real Supabase project + `profiles` row is
  still required for this to do anything; see setup below.
- **Just adding your Supabase env vars is enough now** — no more manually
  uncommenting query code like the previous revision required.

**Visual redesign (this revision):** the customer-facing site moved from a
light marketplace look to a dark, cinematic, editorial one. Nothing in the
backend, admin dashboard, database schema, or CTA/CMS data model changed —
this was scoped as a visual/UX pass only, per your brief.

- No reference image was attached to the redesign brief (checked again) —
  built from the written description (cinematic dark UI, left rail nav,
  floating cards, oversized product imagery), reinterpreted for BOXA rather
  than copied from any specific source.
- New dark theme lives entirely under a `.boxa-site` CSS scope
  (`app/globals.css`) so `/admin` keeps its original light theme — the
  redesign only touches `app/(site)/*`.

## What's built vs. still scaffolded

Fully working against the mock data layer right now:
- Cinematic homepage: `HeroShowcase` (product-switching hero with a
  right-side numbered slide control and floating showcase cards),
  `CategoryShowcase` (asymmetric tiles), `CurationSection` ("why BOXA
  picked it"), product rails, reviews, delivery banner.
- Left vertical nav rail (`BoxaSidebar`, desktop only) + minimal top nav
  (`BoxaTopNav`) with a full-screen `SearchOverlay`.
- Redesigned, editorial product detail page with dual CTA (primary order
  button + WhatsApp).
- Shop/listing page kept intentionally more conventional/practical (per
  the brief's distinction between a cinematic homepage and a practical
  shop page), reskinned to the dark palette.
- Mobile: sidebar and the hero's right-side slide control hide below `md`;
  hero, showcase cards, and nav collapse to a single-column, scrollable
  mobile layout.

Still needs a live Supabase project to do anything beyond mock data:
- Admin dashboard CRUD forms (product/category/review create & edit) —
  the pages render and read real data once connected, but mutations
  aren't wired to Server Actions yet.
- Image uploads / media library (needs a Storage bucket).
- Hero CMS editor UI — the data model supports a full custom hero
  (`hero.badge`, `hero.featured_product_id`, manual title/subtitle/CTA
  overrides — see `lib/types.ts` `HeroSettings`), but there's no admin
  form to edit it yet; edit the `website_settings.hero` JSON directly in
  Supabase for now.
- Analytics (`app/api/cta-click/route.ts` logs the event shape, doesn't
  insert into Postgres yet).

## 1. Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000 — works immediately with no environment
variables set.

## 2. Connect Supabase

1. Create a project at https://supabase.com.
2. Run `db/schema.sql` in the SQL editor (creates every table, enum,
   index, RLS policy, and seeds `website_settings` + `homepage_sections`).
3. In **Storage**, create `product-images` and `media-library` buckets
   (public read, admin-only write — mirror the `is_admin()` pattern from
   `schema.sql`).
4. In **Authentication**, create your first admin user, then insert a row
   into `profiles` for that user with `role = 'admin'`. Without this row,
   `/admin` will bounce a logged-in user back to `/login`.
5. Copy `.env.local.example` to `.env.local` and fill in the three values
   from **Project Settings > API**.
6. In `next.config.ts`, add your Supabase storage domain to
   `images.remotePatterns`.
7. Visit `/login` and sign in — you'll land on `/admin`.

## 3. Deploy

Push to GitHub → import into Vercel → add the same env vars → connect your
Hostinger domain once ready.

## Project structure

```
app/
  layout.tsx                 Minimal root shell (fonts only)
  (site)/                    Customer-facing dark theme route group
    layout.tsx                 Sidebar + top nav + footer wrapper
    page.tsx                   Homepage
    shop/page.tsx               Listing, filters, search, sort
    product/[slug]/page.tsx     Editorial product detail
    tentang/page.tsx            About BOXA
  admin/                      Admin dashboard (light theme, own layout)
  login/page.tsx               Supabase Auth sign-in
  api/cta-click/route.ts       CTA click tracking endpoint
proxy.ts                      Session refresh + /admin route gate
components/
  boxa-sidebar.tsx, boxa-topnav.tsx, boxa-footer.tsx, search-overlay.tsx
  sections/hero-showcase.tsx, category-showcase.tsx, curation-section.tsx,
            product-rail.tsx, misc-sections.tsx
  product-card.tsx, order-cta.tsx, badges.tsx, rating-stars.tsx
lib/
  types.ts, data.ts, mock-data.ts
  supabase/client.ts, server.ts, middleware.ts
db/schema.sql
```

## Brand & theme

Dark theme tokens are defined once in `app/globals.css` under `.boxa-site`:
background `#150B0C`, raised surface `#1E1112`, card surface `#241416`,
warm white text `#F5EFE6`. Brand accents are unchanged from the original
identity — maroon `#591C1F`, flame orange `#E4590C`, ember `#F5A924`, coral
`#E8654F` — now used as emphasis against dark rather than as the base
palette. Display type stays Baloo 2 (rounded, friendly), body/UI stays
Inter, now set in uppercase with wide tracking for nav/labels per the
brief's editorial direction.

Still no logo file has been attached in this project's conversation —
palette was built from the written description both times. Drop the real
file in `public/` and wire it into `boxa-sidebar.tsx` / `boxa-topnav.tsx`
whenever you have it.
