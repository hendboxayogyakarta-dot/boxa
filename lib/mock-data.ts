import type { Banner, Brand, Category, Marketplace, Product, ProductStoreRef, Review, SiteSettings, Store } from "./types";

export const mockBrands: Brand[] = [
  { id: "br1", name: "Blokees", slug: "blokees", logo_url: "https://picsum.photos/seed/logo-blokees/200/200", status: "active", sort_order: 1 },
  { id: "br2", name: "Hot Toys", slug: "hot-toys", logo_url: "https://picsum.photos/seed/logo-hottoys/200/200", status: "active", sort_order: 2 },
  { id: "br3", name: "ZD Toy", slug: "zd-toy", logo_url: "https://picsum.photos/seed/logo-zdtoy/200/200", status: "active", sort_order: 3 },
  { id: "br4", name: "Transformers", slug: "transformers", logo_url: "https://picsum.photos/seed/logo-transformers/200/200", status: "active", sort_order: 4 },
  { id: "br5", name: "One Piece", slug: "one-piece", logo_url: "https://picsum.photos/seed/logo-onepiece/200/200", status: "active", sort_order: 5 },
];

export const mockMarketplaces: Marketplace[] = [
  { id: "mp1", name: "Shopee", slug: "shopee", logo_url: "https://picsum.photos/seed/logo-shopee/200/200", status: "active", sort_order: 1 },
  { id: "mp2", name: "Tokopedia", slug: "tokopedia", logo_url: "https://picsum.photos/seed/logo-tokopedia/200/200", status: "active", sort_order: 2 },
];

export const mockStores: Store[] = [
  {
    id: "st1", name: "Blokees Official Store", slug: "blokees-official", logo_url: "https://picsum.photos/seed/store-blokees/200/200",
    description: "Toko resmi Blokees di Shopee.", platform: "Shopee", link: "https://shopee.co.id/blokeesofficial",
    location: null, status: "active", relationship_type: "reference", sort_order: 1,
  },
  {
    id: "st2", name: "Hobi Mainan Jogja", slug: "hobi-mainan-jogja", logo_url: "https://picsum.photos/seed/store-hobi/200/200",
    description: "Toko hobi & koleksi di Yogyakarta.", platform: "Tokopedia", link: "https://tokopedia.com/hobimainanjogja",
    location: "Yogyakarta", status: "active", relationship_type: "affiliate", sort_order: 2,
  },
];

export const mockProductStoreRefs: ProductStoreRef[] = [
  { id: "ps1", product_id: "p2", store_id: "st1", product_url: "https://shopee.co.id/blokeesofficial/gundam-rx78", price: 195000, sort_order: 1, store: mockStores[0] },
  { id: "ps2", product_id: "p2", store_id: "st2", product_url: "https://tokopedia.com/hobimainanjogja/gundam-rx78", price: 189000, sort_order: 2, store: mockStores[1] },
];

export const mockCategories: Category[] = [
  { id: "c1", name: "Blokees", slug: "blokees", description: "Building toys ala LEGO, seri lokal & impor.", image_url: null, icon: "Blocks", status: "active", sort_order: 1 },
  { id: "c2", name: "Licensed Toys", slug: "licensed-toys", description: "Karakter resmi dari film, anime, dan game favorit.", image_url: null, icon: "Sparkles", status: "active", sort_order: 2 },
  { id: "c3", name: "Blind Box", slug: "blind-box", description: "Seri kejutan, cocok buat koleksi.", image_url: null, icon: "Gift", status: "active", sort_order: 3 },
  { id: "c4", name: "Collectibles", slug: "collectibles", description: "Figure dan koleksi edisi terbatas.", image_url: null, icon: "Trophy", status: "active", sort_order: 4 },
  { id: "c5", name: "Double Collection", slug: "double-collection", description: "Barang preloved, dicek kondisinya sama BOXA.", image_url: null, icon: "Repeat", status: "active", sort_order: 5 },
];

function img(id: string, seed: string): { id: string; product_id: string; url: string; is_primary: boolean; sort_order: number } {
  return { id, product_id: seed, url: `https://picsum.photos/seed/${seed}/800/800`, is_primary: true, sort_order: 0 };
}

export const mockProducts: Product[] = [
  {
    id: "p1", name: "Blokees Fantasy Castle 1580pcs", slug: "blokees-fantasy-castle-1580pcs", sku: "BLK-CST-01",
    short_description: "Set kastil fantasi, 1580 keping, minifigure 6 karakter.",
    description: "Set building block bertema kastil fantasi dengan 1580 keping dan 6 minifigure. Cocok buat koleksi maupun dipajang setelah dirakit.\n\nSemua part original, box masih segel.",
    price: 425000, compare_price: 499000, local_price: 380000, stock_quantity: 6, stock_status: "in_stock",
    category_id: "c1", brand: "Blokees", series: "Fantasy Series", condition: "new_sealed", sealed_or_built: "sealed",
    rarity: "common", is_featured: true, is_new: true, is_rare: false, is_secret: false, is_boxa_approved: true, boxa_score: 8.6,
    location: "Yogyakarta", delivery_available: true, instant_delivery_available: true,
    cta_type: "WHATSAPP", shopee_url: "https://shopee.co.id/boxayk-blokees-fantasy-castle", whatsapp_url: "https://wa.me/6281234567890", external_order_url: null,
    warranty_type: "Garansi kelengkapan", warranty_description: "Kalau ada part hilang dari pabrik, BOXA bantu komplain ke distributor.",
    pros: ["Box masih segel", "Instruksi lengkap", "Warna cerah, minim fading"],
    cons: ["Box agak besar, perhatikan penyimpanan"],
    what_is_included: ["1580 keping building block", "6 minifigure", "Buku instruksi"],
    what_is_not_included: ["Lem", "Display case"],
    sold_count: 34, view_count: 512, offline_available: true, recommendation_note: null, is_bib: true, is_ofc: false, brand_id: "br1", brand_logo: mockBrands[0], marketplace_id: "mp1", marketplace: mockMarketplaces[0], status: "published", images: [img("i1", "boxa-castle-1"), img("i1b", "boxa-castle-2")],
    created_at: "2026-08-01", updated_at: "2026-09-01",
  },
  {
    id: "p2", name: "Gundam RX-78-2 Entry Grade", slug: "gundam-rx-78-2-entry-grade", sku: "LIC-GUN-02",
    short_description: "Model kit Gundam entry level, gampang dirakit tanpa lem.",
    description: "Entry Grade Gundam RX-78-2, cocok buat yang baru mulai main gunpla. Snap-fit, gak perlu lem atau cat.",
    price: 185000, compare_price: null, stock_quantity: 12, stock_status: "in_stock",
    category_id: "c2", brand: "Bandai", series: "Entry Grade", condition: "new_sealed", sealed_or_built: "sealed",
    rarity: "common", is_featured: true, is_new: false, is_rare: false, is_secret: false, is_boxa_approved: true, boxa_score: 8.0,
    location: "Yogyakarta", delivery_available: true, instant_delivery_available: true,
    cta_type: "SHOPEE", shopee_url: "https://shopee.co.id", whatsapp_url: "https://wa.me/6281234567890", external_order_url: null,
    warranty_type: "Garansi produk baru", warranty_description: "Segel resmi, box mulus.",
    pros: ["Gampang dirakit", "Harga ramah untuk pemula"],
    cons: ["Detail lebih simpel dibanding Master Grade"],
    what_is_included: ["Runner model kit", "Stiker", "Instruksi"], what_is_not_included: ["Cat", "Nozzle tambahan"],
    sold_count: 61, view_count: 890, local_price: null, offline_available: true, recommendation_note: null, is_bib: false, is_ofc: false, brand_id: null, marketplace_id: null, store_refs: mockProductStoreRefs.filter((r) => r.product_id === "p2"), status: "published", images: [img("i2", "boxa-gundam-1")],
    created_at: "2026-07-15", updated_at: "2026-08-20",
  },
  {
    id: "p3", name: "Pop Mart Crybaby Blind Box", slug: "pop-mart-crybaby-blind-box", sku: "BB-POP-03",
    short_description: "Blind box seri Crybaby, 1 box random figure.",
    description: "Satu box berisi satu figure random dari seri Crybaby. Ada kemungkinan dapat secret edition.",
    price: 149000, compare_price: null, local_price: 129000, stock_quantity: 20, stock_status: "in_stock",
    category_id: "c3", brand: "Pop Mart", series: "Crybaby", condition: "new_sealed", sealed_or_built: "sealed",
    rarity: "secret", is_featured: true, is_new: true, is_rare: true, is_secret: true, is_boxa_approved: true, boxa_score: 7.8,
    location: "Yogyakarta", delivery_available: true, instant_delivery_available: false,
    cta_type: "WHATSAPP", shopee_url: "https://shopee.co.id/boxayk-crybaby-blindbox", whatsapp_url: "https://wa.me/6281234567890", external_order_url: null,
    warranty_type: null, warranty_description: "Sifatnya random/blind box, jadi isi tidak bisa dipilih — ini kami info di depan.",
    pros: ["Ada peluang dapat secret", "Segel pabrik"], cons: ["Karakter di dalam random, bukan pilihan sendiri"],
    what_is_included: ["1 figure random dalam box tersegel"], what_is_not_included: [],
    sold_count: 102, view_count: 1340, offline_available: true, recommendation_note: null, is_bib: false, is_ofc: false, brand_id: null, marketplace_id: "mp1", marketplace: mockMarketplaces[0], status: "published", images: [img("i3", "boxa-blindbox-1")],
    created_at: "2026-06-10", updated_at: "2026-09-10",
  },
  {
    id: "p4", name: "Optimus Prime Studio Series (Preloved)", slug: "optimus-prime-studio-series-preloved", sku: "DBL-TRF-04",
    short_description: "Sudah dirakit, kondisi mulus, box ada sedikit lecet.",
    description: "Barang double collection — sudah dirakit rapi, semua parts lengkap dan gerak transformasinya masih halus. Box ada lecet minor di sudut, item dalam kondisi sangat baik.",
    price: 310000, compare_price: 450000, stock_quantity: 1, stock_status: "in_stock",
    category_id: "c5", brand: "Hasbro", series: "Studio Series", condition: "pre_owned_like_new", sealed_or_built: "built",
    rarity: "rare", is_featured: false, is_new: false, is_rare: true, is_secret: false, is_boxa_approved: true, boxa_score: 8.3,
    location: "Yogyakarta", delivery_available: true, instant_delivery_available: true,
    cta_type: "WHATSAPP", shopee_url: null, whatsapp_url: "https://wa.me/6281234567890", external_order_url: null,
    warranty_type: "Garansi cek kondisi", warranty_description: "Sudah dicek sendi dan kelengkapan sebelum dijual.",
    pros: ["Sendi masih kencang", "Warna orisinil, tidak pudar", "Lengkap dengan aksesoris"],
    cons: ["Box ada lecet minor di sudut", "Stok cuma 1, tidak restock"],
    what_is_included: ["Figure Optimus Prime", "Aksesoris senjata", "Box original"], what_is_not_included: ["Stand display"],
    sold_count: 8, view_count: 260, local_price: null, offline_available: true, recommendation_note: null, is_bib: false, is_ofc: false, brand_id: "br4", brand_logo: mockBrands[3], marketplace_id: null, status: "published", images: [img("i4", "boxa-optimus-1")],
    created_at: "2026-05-20", updated_at: "2026-09-05",
  },
  {
    id: "p5", name: "Blokees Mini Street Racer 240pcs", slug: "blokees-mini-street-racer-240pcs", sku: "BLK-CAR-05",
    short_description: "Set mobil balap mini, cocok buat pemula rakit blok.",
    description: "Set kecil yang pas buat mulai koleksi Blokees. Cepat dirakit, cocok juga buat hadiah.",
    price: 89000, compare_price: null, stock_quantity: 0, stock_status: "sold_out",
    category_id: "c1", brand: "Blokees", series: "Speed Series", condition: "new_sealed", sealed_or_built: "sealed",
    rarity: "common", is_featured: false, is_new: false, is_rare: false, is_secret: false, is_boxa_approved: true, boxa_score: 8.7,
    location: "Yogyakarta", delivery_available: true, instant_delivery_available: false,
    cta_type: "WHATSAPP", shopee_url: null, whatsapp_url: "https://wa.me/6281234567890", external_order_url: null,
    warranty_type: null, warranty_description: null, pros: [], cons: [],
    what_is_included: ["240 keping building block"], what_is_not_included: [],
    sold_count: 45, view_count: 300, local_price: null, offline_available: true, recommendation_note: null, is_bib: false, is_ofc: false, brand_id: null, marketplace_id: null, status: "published", images: [img("i5", "boxa-racer-1")],
    created_at: "2026-04-11", updated_at: "2026-08-01",
  },
  {
    id: "p6", name: "One Piece Figure Luffy Gear 5", slug: "one-piece-figure-luffy-gear-5", sku: "LIC-OP-06",
    short_description: "Figure detail tinggi, edisi terbatas.",
    description: "Figure Luffy Gear 5 dengan detail pengecatan tinggi. Termasuk edisi terbatas, stok akan habis dan tidak restock.",
    price: 550000, compare_price: 650000, stock_quantity: 3, stock_status: "low_stock",
    category_id: "c4", brand: "Banpresto", series: "One Piece", condition: "new_sealed", sealed_or_built: "sealed",
    rarity: "limited", is_featured: true, is_new: true, is_rare: true, is_secret: false, is_boxa_approved: true, boxa_score: 9.1,
    location: "Yogyakarta", delivery_available: true, instant_delivery_available: true,
    cta_type: "SHOPEE", shopee_url: "https://shopee.co.id", whatsapp_url: "https://wa.me/6281234567890", external_order_url: null,
    warranty_type: "Garansi produk resmi", warranty_description: "Lisensi resmi, ada hologram autentikasi.",
    pros: ["Detail cat rapi", "Ada hologram resmi", "Box collector edition"],
    cons: ["Harga lebih tinggi dari figure reguler"],
    what_is_included: ["Figure", "Base display", "Sertifikat keaslian"], what_is_not_included: [],
    sold_count: 19, view_count: 740, local_price: null, offline_available: true, recommendation_note: null, is_bib: true, is_ofc: true, brand_id: null, marketplace_id: null, status: "published", images: [img("i6", "boxa-luffy-1")],
    created_at: "2026-08-25", updated_at: "2026-09-15",
  },
  {
    id: "p7", name: "Hot Toys Iron Man Mark 85", slug: "hot-toys-iron-man-mark-85", sku: "LIC-HT-07",
    short_description: "Belum tersedia untuk pembelian lokal di BOXA — bisa ditemukan lewat toko online berikut.",
    description: "Figure premium skala 1:6 dari Hot Toys. BOXA belum menyetok item ini secara lokal, tapi kamu bisa menemukannya lewat pilihan toko online di bawah.",
    price: 0, compare_price: null, stock_quantity: 0, stock_status: "in_stock",
    category_id: "c4", brand: "Hot Toys", series: "Movie Masterpiece", condition: "new_sealed", sealed_or_built: "sealed",
    rarity: "limited", is_featured: false, is_new: false, is_rare: true, is_secret: false, is_boxa_approved: false, boxa_score: null,
    location: null, delivery_available: false, instant_delivery_available: false,
    cta_type: "EXTERNAL_URL", shopee_url: null, whatsapp_url: null, external_order_url: null,
    warranty_type: null, warranty_description: null,
    pros: [], cons: [],
    what_is_included: [], what_is_not_included: [],
    sold_count: 0, view_count: 0, local_price: null, offline_available: false, recommendation_note: null, is_bib: false, is_ofc: false, brand_id: null, marketplace_id: null,
    store_refs: [
      { id: "ps3", product_id: "p7", store_id: "st1", product_url: "https://shopee.co.id/blokeesofficial/iron-man-mk85", price: 2850000, sort_order: 1, store: mockStores[0] },
      { id: "ps4", product_id: "p7", store_id: "st2", product_url: "https://tokopedia.com/hobimainanjogja/iron-man-mk85", price: 2790000, sort_order: 2, store: mockStores[1] },
    ],
    status: "published", images: [img("i7", "boxa-ironman-1")],
    created_at: "2026-09-18", updated_at: "2026-09-18",
  },
];

export const mockBanners: Banner[] = [
  { id: "b1", image_url: "https://picsum.photos/seed/boxa-banner-1/1600/500", link_url: "/shop?featured=1", alt_text: "Pilihan BOXA", enabled: true, sort_order: 1 },
  { id: "b2", image_url: "https://picsum.photos/seed/boxa-banner-2/1600/500", link_url: "/shop?rare=1", alt_text: "Rare & Secret Finds", enabled: true, sort_order: 2 },
  { id: "b3", image_url: "https://picsum.photos/seed/boxa-banner-3/1600/500", link_url: "/shop?new=1", alt_text: "Baru Datang", enabled: true, sort_order: 3 },
];

export const mockReviews: Review[] = [
  { id: "r1", product_id: "p1", customer_name: "Dimas", rating: 5, review: "Segel masih rapi, minifigure lengkap. Respon WA-nya juga cepat.", image_url: null, verified_purchase: true, status: "approved", created_at: "2026-08-10" },
  { id: "r2", product_id: "p2", customer_name: "Aya", rating: 4, review: "Bagus buat pemula, cuma pengiriman agak lama karena weekend.", image_url: null, verified_purchase: true, status: "approved", created_at: "2026-08-02" },
  { id: "r3", product_id: "p6", customer_name: "Reza", rating: 5, review: "Detailnya juara, worth it buat koleksi.", image_url: null, verified_purchase: true, status: "approved", created_at: "2026-09-16" },
];

export const mockSettings: SiteSettings = {
  brand_name: "BOXA.YK",
  tagline: "Original Toys, Local Prices.",
  logo_url: null,
  favicon_url: null,
  primary_color: "#591C1F",
  secondary_color: "#E4590C",
  accent_color: "#F5A924",
  whatsapp_number: "6281234567890",
  instagram_url: "https://instagram.com/boxa.yk",
  tiktok_url: "https://tiktok.com/@boxa.yk",
  shopee_url: "https://shopee.co.id/boxayk",
  address: "Yogyakarta, Indonesia",
  hero: {
    enabled: true,
    badge: "BOXA Featured",
    title: "Original Toys, Local Prices.",
    subtitle: "Temukan mainan, pahami produknya, bandingkan harganya, dan pilih cara beli yang paling sesuai untukmu.",
    image_url: null,
    cta_text: "Jelajahi Mainan",
    cta_href: "/shop",
    secondary_cta_text: "Cari Local Price",
    secondary_cta_href: "/shop?local=1",
    featured_product_id: null,
  },
  delivery: {
    enabled: true,
    service_area: "Antar area Yogyakarta",
    free_delivery_enabled: true,
    free_delivery_minimum: 300000,
    notes: "Gratis antar untuk pembelian di atas Rp300.000, area Kota Yogyakarta.",
  },
  copy: {
    usp_subtitle: "Temukan mainan, pahami produknya, bandingkan harganya, dan pilih cara beli yang paling sesuai untukmu.",
    curation_title: "Kenapa BOXA memilihnya.",
    curation_subtitle:
      "Nggak semua yang kamu mau, harus kamu punya. Setiap produk yang masuk BOXA melewati kurasi yang sama — dicek kondisinya, dilihat nilai koleksinya, dan disampaikan apa adanya sebelum ditawarkan ke kamu.",
    rekomendasi_intro:
      "Barang-barang ini sudah kami cek dan memang bagus — cuma BOXA belum menyetok fisiknya. Klik buat lihat langsung di toko online yang tersedia.",
    request_toy_message: "Halo BOXA, aku mau request mainan: ",
  },
  about: {
    headline: "Nggak semua yang kamu mau, harus kamu punya.",
    paragraph1:
      "BOXA.YK bukan sekadar toko mainan online. Kami memilih produk, mengecek kondisinya, dan menyampaikan informasinya apa adanya — termasuk kalau ada kekurangannya. Prinsip kami sederhana: kalau sebuah barang tidak punya alasan kuat untuk dijual, ya tidak kami jual.",
    paragraph2:
      "Kami berbasis di Yogyakarta dan fokus melayani pembeli lokal dulu, dengan pengiriman area Yogyakarta yang cepat. Dari Blokees, licensed toys, blind box, sampai koleksi preloved yang sudah kami cek — semuanya melewati proses kurasi yang sama.",
    paragraph3:
      "Anggap BOXA kayak temen yang paham mainan — bukan marketplace yang cuma mau jualan. Kamu bisa temukan barangnya di sini, pahami dulu kondisi dan isi box-nya, bandingkan harga online dan lokal, baru putusin mau beli lewat mana. Kalau kebetulan barangnya belum ada di BOXA, kami tetap kasih tahu ke mana kamu bisa cek — biasanya ke official store atau toko yang bisa dipercaya.",
    pillar1_title: "Dicek Dulu",
    pillar1_text: "Kondisi produk kami periksa sebelum ditawarkan.",
    pillar2_title: "Dikurasi",
    pillar2_text: "Setiap produk punya alasan untuk masuk BOXA.",
    pillar3_title: "Gampang Ditanya",
    pillar3_text: "Belum yakin? Nggak apa-apa, tanya dulu.",
  },
  homepage_sections: [
    { key: "featured", title: "Pilihan BOXA", subtitle: "Produk yang lagi kami rekomendasikan", enabled: true, sort_order: 1 },
    { key: "new_arrivals", title: "Baru Datang", subtitle: null, enabled: true, sort_order: 2 },
    { key: "rare_secret", title: "Rare & Secret Finds", subtitle: "Stok terbatas, kadang gak akan ada lagi", enabled: true, sort_order: 3 },
    { key: "categories", title: "Jelajahi Kategori", subtitle: null, enabled: true, sort_order: 4 },
    { key: "why_boxa", title: "Kenapa BOXA", subtitle: null, enabled: true, sort_order: 5 },
    { key: "reviews", title: "Kata Mereka", subtitle: null, enabled: true, sort_order: 6 },
    { key: "delivery", title: "Antar Area Yogyakarta", subtitle: null, enabled: true, sort_order: 7 },
  ],
  seo: {
    site_title: "BOXA.YK — Mainan pilihan dari Yogyakarta",
    meta_description: "Toko mainan dan collectible kurasi dari Yogyakarta. Barang dicek dulu, informasinya jujur, belinya gampang.",
    og_image: null,
  },
};
