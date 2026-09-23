-- =====================================================================
-- BOXA.YK — Supabase schema
-- Run this in the Supabase SQL editor on a fresh project (or via the
-- Supabase CLI: `supabase db push`). Safe to re-run top to bottom on an
-- empty database. See README.md for the full setup walkthrough.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- ENUMS
-- ---------------------------------------------------------------------
create type stock_status as enum ('in_stock', 'low_stock', 'sold_out', 'preorder');
create type condition_type as enum ('new_sealed', 'new_built', 'pre_owned_like_new', 'pre_owned_good');
create type rarity_type as enum ('common', 'rare', 'secret', 'limited');
create type cta_type as enum ('SHOPEE', 'WHATSAPP', 'EXTERNAL_URL');
create type review_status as enum ('pending', 'approved', 'rejected', 'hidden');
create type product_status as enum ('draft', 'published', 'archived');
create type user_role as enum ('admin', 'staff');

-- ---------------------------------------------------------------------
-- PROFILES  (extends auth.users; role gates admin access)
-- ---------------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role user_role not null default 'staff',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- CATEGORIES
-- ---------------------------------------------------------------------
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  icon text,
  status text not null default 'active' check (status in ('active', 'hidden')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_categories_slug on categories(slug);
create index idx_categories_status on categories(status);

-- ---------------------------------------------------------------------
-- BRANDS  (reusable manufacturer/license logos — Blokees, Hot Toys,
-- Transformers, One Piece, etc. Upload once, attach to many products.)
-- ---------------------------------------------------------------------
create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  status text not null default 'active' check (status in ('active', 'hidden')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index idx_brands_slug on brands(slug);
create index idx_brands_status on brands(status);

-- ---------------------------------------------------------------------
-- MARKETPLACES  (same shape as brands — Shopee, Tokopedia, Lazada, etc.
-- Which one a product's online link points to, for the button's logo.)
-- ---------------------------------------------------------------------
create table marketplaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  status text not null default 'active' check (status in ('active', 'hidden')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index idx_marketplaces_slug on marketplaces(slug);
create index idx_marketplaces_status on marketplaces(status);

-- ---------------------------------------------------------------------
-- PRODUCTS
-- ---------------------------------------------------------------------
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sku text unique,
  short_description text,
  description text,
  price numeric(12,2) not null check (price >= 0),
  compare_price numeric(12,2),
  -- Optional cheaper price for local pickup in Yogyakarta ("Original Toys,
  -- Local Prices" USP). Null = product only has the one price.
  local_price numeric(12,2) check (local_price is null or local_price >= 0),
  offline_available boolean not null default true,
  recommendation_note text,
  brand_id uuid references brands(id) on delete set null,
  marketplace_id uuid references marketplaces(id) on delete set null,
  stock_quantity int not null default 0,
  stock_status stock_status not null default 'in_stock',
  category_id uuid references categories(id) on delete set null,
  brand text,
  series text,
  condition condition_type not null default 'new_sealed',
  sealed_or_built text default 'n/a',
  product_type text,
  rarity rarity_type,
  is_featured boolean not null default false,
  is_new boolean not null default false,
  is_rare boolean not null default false,
  is_secret boolean not null default false,
  is_boxa_approved boolean not null default false,
  boxa_score numeric(3,1) check (boxa_score >= 0 and boxa_score <= 10),
  location text,
  delivery_available boolean not null default true,
  instant_delivery_available boolean not null default false,
  shopee_url text,
  whatsapp_url text,
  external_order_url text,
  cta_type cta_type not null default 'WHATSAPP',
  warranty_type text,
  warranty_description text,
  pros text[] not null default '{}',
  cons text[] not null default '{}',
  what_is_included text[] not null default '{}',
  what_is_not_included text[] not null default '{}',
  sold_count int not null default 0,
  view_count int not null default 0,
  status product_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_products_slug on products(slug);
create index idx_products_name on products using gin (to_tsvector('simple', name));
create index idx_products_category on products(category_id);
create index idx_products_status on products(status);
create index idx_products_created_at on products(created_at desc);
create index idx_products_brand on products(brand_id);
create index idx_products_marketplace on products(marketplace_id);

-- ---------------------------------------------------------------------
-- PRODUCT IMAGES
-- ---------------------------------------------------------------------
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  is_primary boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index idx_product_images_product on product_images(product_id);

-- ---------------------------------------------------------------------
-- REVIEWS
-- ---------------------------------------------------------------------
create table reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  customer_name text not null,
  rating int not null check (rating between 1 and 5),
  review text not null,
  image_url text,
  verified_purchase boolean not null default false,
  status review_status not null default 'pending',
  created_at timestamptz not null default now()
);
create index idx_reviews_product on reviews(product_id);
create index idx_reviews_status on reviews(status);

-- ---------------------------------------------------------------------
-- WEBSITE SETTINGS  (single row — branding, hero, delivery, SEO)
-- ---------------------------------------------------------------------
create table website_settings (
  id int primary key default 1 check (id = 1), -- singleton row
  brand_name text not null default 'BOXA.YK',
  tagline text,
  logo_url text,
  favicon_url text,
  primary_color text default '#591C1F',
  secondary_color text default '#E4590C',
  accent_color text default '#F5A924',
  whatsapp_number text,
  instagram_url text,
  tiktok_url text,
  shopee_url text,
  address text,
  hero jsonb not null default '{}'::jsonb,
  delivery jsonb not null default '{}'::jsonb,
  seo jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- HOMEPAGE SECTIONS  (ordering + on/off for CMS-driven homepage)
-- ---------------------------------------------------------------------
create table homepage_sections (
  key text primary key,
  title text,
  subtitle text,
  enabled boolean not null default true,
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------
-- BANNERS  (homepage sliding banner carousel, Shopee-style)
-- ---------------------------------------------------------------------
create table banners (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  link_url text,
  alt_text text,
  enabled boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index idx_banners_enabled on banners(enabled);

-- ---------------------------------------------------------------------
-- NAVIGATION ITEMS
-- ---------------------------------------------------------------------
create table navigation_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  visible boolean not null default true,
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------
-- MEDIA  (Supabase Storage references for the media library)
-- ---------------------------------------------------------------------
create table media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  storage_path text not null,
  filename text,
  uploaded_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- ANALYTICS EVENTS  (lightweight: product views + CTA clicks)
-- ---------------------------------------------------------------------
create table analytics_events (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete set null,
  event_type text not null check (event_type in ('product_view', 'cta_click', 'page_view')),
  cta_type cta_type,
  created_at timestamptz not null default now()
);
create index idx_analytics_product on analytics_events(product_id);
create index idx_analytics_created_at on analytics_events(created_at desc);

-- ---------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_products_updated_at before update on products
  for each row execute function set_updated_at();
create trigger trg_categories_updated_at before update on categories
  for each row execute function set_updated_at();
create trigger trg_website_settings_updated_at before update on website_settings
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------

-- Helper: is the current user an admin/staff?
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin', 'staff')
  );
$$ language sql security definer stable;

alter table profiles enable row level security;
alter table categories enable row level security;
alter table brands enable row level security;
alter table marketplaces enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table reviews enable row level security;
alter table website_settings enable row level security;
alter table homepage_sections enable row level security;
alter table navigation_items enable row level security;
alter table banners enable row level security;
alter table media enable row level security;
alter table analytics_events enable row level security;

-- profiles: users can read their own row; admins can read all
create policy "profiles_self_read" on profiles for select using (auth.uid() = id or is_admin());
create policy "profiles_admin_write" on profiles for all using (is_admin()) with check (is_admin());

-- categories: public can read active; admins full CRUD
create policy "categories_public_read" on categories for select using (status = 'active' or is_admin());
create policy "categories_admin_write" on categories for insert with check (is_admin());
create policy "categories_admin_update" on categories for update using (is_admin()) with check (is_admin());
create policy "categories_admin_delete" on categories for delete using (is_admin());

-- brands: public can read active; admins full CRUD
create policy "brands_public_read" on brands for select using (status = 'active' or is_admin());
create policy "brands_admin_write" on brands for insert with check (is_admin());
create policy "brands_admin_update" on brands for update using (is_admin()) with check (is_admin());
create policy "brands_admin_delete" on brands for delete using (is_admin());

-- marketplaces: public can read active; admins full CRUD
create policy "marketplaces_public_read" on marketplaces for select using (status = 'active' or is_admin());
create policy "marketplaces_admin_write" on marketplaces for insert with check (is_admin());
create policy "marketplaces_admin_update" on marketplaces for update using (is_admin()) with check (is_admin());
create policy "marketplaces_admin_delete" on marketplaces for delete using (is_admin());

-- products: public can read published; admins full CRUD
create policy "products_public_read" on products for select using (status = 'published' or is_admin());
create policy "products_admin_write" on products for insert with check (is_admin());
create policy "products_admin_update" on products for update using (is_admin()) with check (is_admin());
create policy "products_admin_delete" on products for delete using (is_admin());

-- product_images: public read follows the parent product; admins full CRUD
create policy "product_images_public_read" on product_images for select using (
  exists (select 1 from products p where p.id = product_id and (p.status = 'published' or is_admin()))
);
create policy "product_images_admin_write" on product_images for insert with check (is_admin());
create policy "product_images_admin_update" on product_images for update using (is_admin()) with check (is_admin());
create policy "product_images_admin_delete" on product_images for delete using (is_admin());

-- reviews: public can read approved + insert new (pending); admins moderate
create policy "reviews_public_read" on reviews for select using (status = 'approved' or is_admin());
create policy "reviews_public_insert" on reviews for insert with check (status = 'pending' or status is null);
create policy "reviews_admin_update" on reviews for update using (is_admin()) with check (is_admin());
create policy "reviews_admin_delete" on reviews for delete using (is_admin());

-- website_settings / homepage_sections / navigation_items: public read, admin write
create policy "settings_public_read" on website_settings for select using (true);
create policy "settings_admin_write" on website_settings for all using (is_admin()) with check (is_admin());

create policy "sections_public_read" on homepage_sections for select using (true);
create policy "sections_admin_write" on homepage_sections for all using (is_admin()) with check (is_admin());

create policy "nav_public_read" on navigation_items for select using (true);
create policy "nav_admin_write" on navigation_items for all using (is_admin()) with check (is_admin());

-- banners: public can read enabled ones; admins full CRUD
create policy "banners_public_read" on banners for select using (enabled = true or is_admin());
create policy "banners_admin_write" on banners for insert with check (is_admin());
create policy "banners_admin_update" on banners for update using (is_admin()) with check (is_admin());
create policy "banners_admin_delete" on banners for delete using (is_admin());

-- media: admin-only (internal library, not public-facing)
create policy "media_admin_all" on media for all using (is_admin()) with check (is_admin());

-- analytics_events: public can insert (tracking pixel style), only admins can read
create policy "analytics_public_insert" on analytics_events for insert with check (true);
create policy "analytics_admin_read" on analytics_events for select using (is_admin());

-- ---------------------------------------------------------------------
-- SEED: singleton settings row + default homepage sections
-- (Safe defaults so the site renders correctly immediately after setup;
-- edit everything from /admin/cms and /admin/settings afterwards.)
-- ---------------------------------------------------------------------
insert into website_settings (id, brand_name, tagline, whatsapp_number, instagram_url, tiktok_url, shopee_url, address, hero, delivery, seo)
values (
  1, 'BOXA.YK', 'Original Toys, Local Prices.',
  '6281234567890', 'https://instagram.com/boxa.yk', 'https://tiktok.com/@boxa.yk', 'https://shopee.co.id/boxayk',
  'Yogyakarta, Indonesia',
  '{"enabled": true, "badge": "BOXA Featured", "title": "Original Toys, Local Prices.", "subtitle": "Mainan orisinal dengan harga lebih hemat kalau kamu ambil langsung di Yogyakarta.", "cta_text": "Pesan Sekarang", "cta_href": "/shop", "secondary_cta_text": "Kenalan dengan BOXA", "secondary_cta_href": "/tentang", "featured_product_id": null}'::jsonb,
  '{"enabled": true, "service_area": "Antar area Yogyakarta", "free_delivery_enabled": true, "free_delivery_minimum": 300000, "notes": "Gratis antar untuk pembelian di atas Rp300.000, area Kota Yogyakarta."}'::jsonb,
  '{"site_title": "BOXA.YK — Mainan pilihan dari Yogyakarta", "meta_description": "Toko mainan dan collectible kurasi dari Yogyakarta."}'::jsonb
) on conflict (id) do nothing;

insert into brands (name, slug, status, sort_order) values
  ('Blokees', 'blokees', 'active', 1),
  ('Hot Toys', 'hot-toys', 'active', 2),
  ('ZD Toy', 'zd-toy', 'active', 3),
  ('Transformers', 'transformers', 'active', 4),
  ('One Piece', 'one-piece', 'active', 5),
  ('Gundam', 'gundam', 'active', 6)
on conflict (slug) do nothing;
-- Logos aren't set here — upload each one from /admin/brands after this
-- runs (they need real files, not a placeholder URL).

insert into marketplaces (name, slug, status, sort_order) values
  ('Shopee', 'shopee', 'active', 1),
  ('Tokopedia', 'tokopedia', 'active', 2),
  ('Lazada', 'lazada', 'active', 3)
on conflict (slug) do nothing;
-- Logos aren't set here — upload each one from /admin/marketplaces.

insert into categories (name, slug, description, status, sort_order) values
  ('Blokees', 'blokees', 'Building toys ala LEGO, seri lokal & impor.', 'active', 1),
  ('Licensed Toys', 'licensed-toys', 'Karakter resmi dari film, anime, dan game favorit.', 'active', 2),
  ('Blind Box', 'blind-box', 'Seri kejutan, cocok buat koleksi.', 'active', 3),
  ('Collectibles', 'collectibles', 'Figure dan koleksi edisi terbatas.', 'active', 4),
  ('Double Collection', 'double-collection', 'Barang preloved, dicek kondisinya sama BOXA.', 'active', 5)
on conflict (slug) do nothing;

insert into homepage_sections (key, title, subtitle, enabled, sort_order) values
  ('featured', 'Pilihan BOXA', 'Produk yang lagi kami rekomendasikan', true, 1),
  ('new_arrivals', 'Baru Datang', null, true, 2),
  ('rare_secret', 'Rare & Secret Finds', 'Stok terbatas, kadang gak akan ada lagi', true, 3),
  ('categories', 'Jelajahi Kategori', null, true, 4),
  ('why_boxa', 'Kenapa BOXA', null, true, 5),
  ('reviews', 'Kata Mereka', null, true, 6),
  ('delivery', 'Antar Area Yogyakarta', null, true, 7)
on conflict (key) do nothing;

-- ---------------------------------------------------------------------
-- STORAGE BUCKETS (run once — Storage > Policies in the dashboard, or via SQL)
-- ---------------------------------------------------------------------
-- insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);
-- insert into storage.buckets (id, name, public) values ('media-library', 'media-library', true);
-- Add storage.objects RLS policies mirroring is_admin() for INSERT/UPDATE/DELETE,
-- and public SELECT, once buckets are created (Storage policy UI is the
-- easiest place to do this from the Supabase dashboard).
