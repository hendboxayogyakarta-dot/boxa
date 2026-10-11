import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import { SeoLanding, type Faq } from "@/components/seo-landing";
import { SITE_URL } from "@/lib/site-config";

export const revalidate = 60;

const TITLE = "Blokees Jogja — Beli Blokees di Yogyakarta, COD";
const DESC =
  "Blokees Jogja: koleksi Blokees original di BOXA.YK Yogyakarta. Harga lokal untuk COD / ambil langsung, kondisi dicek jujur, banyak yang masih segel.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | BOXA.YK` },
  description: DESC,
  keywords: ["blokees jogja", "blokees yogyakarta", "beli blokees jogja", "blokees cod jogja", "toko blokees jogja", "blokees original"],
  alternates: { canonical: `${SITE_URL}/blokees-jogja` },
  openGraph: { type: "website", siteName: "BOXA.YK", locale: "id_ID", title: `${TITLE} | BOXA.YK`, description: DESC },
};

const FAQS: Faq[] = [
  {
    q: "Di mana beli Blokees di Jogja?",
    a: "Di BOXA.YK, toko mainan dan collectibles berbasis di Yogyakarta. Kamu bisa COD atau ambil langsung; tanya stok lewat chat WhatsApp.",
  },
  {
    q: "Apakah Blokees di BOXA original?",
    a: "Ya. Kondisi tiap produk dicek dan ditulis apa adanya. Badge Baru Segel berarti masih tersegel pabrik dan belum pernah dibuka.",
  },
  {
    q: "Apakah ada harga lebih murah dibanding online?",
    a: "Beberapa produk punya Harga Lokal yang lebih hemat dari harga online. Persentase hematnya tampil di kartu produk; tidak semua produk punya, jadi bandingkan dulu.",
  },
  {
    q: "Kalau Blokees yang dicari tidak ada?",
    a: "Cek halaman Pilihan Online untuk tautan toko resmi, atau kirim request lewat chat. Kami bantu cari.",
  },
];

function isBlokees(p: { name: string; brand: string | null; series: string | null; category?: { name: string; slug: string } | null; brand_logo?: { slug: string } | null }) {
  const hay = `${p.name} ${p.brand ?? ""} ${p.series ?? ""} ${p.category?.name ?? ""} ${p.category?.slug ?? ""} ${p.brand_logo?.slug ?? ""}`.toLowerCase();
  return hay.includes("blokees");
}

export default async function BlokeesJogjaPage() {
  const all = await getProducts();
  const products = all
    .filter(isBlokees)
    .sort((a, b) => Number(b.offline_available) - Number(a.offline_available) || b.sold_count - a.sold_count);

  return (
    <SeoLanding
      path="/blokees-jogja"
      title={TITLE}
      products={products}
      faqs={FAQS}
      intro={
        <>
          <p>
            Cari <strong>Blokees di Jogja</strong>? BOXA.YK menyediakan Blokees original di Yogyakarta, bisa COD atau
            ambil langsung dengan Harga Lokal, plus pengantaran area Yogyakarta.
          </p>
          <p>
            Kondisi tiap produk kami cek dan tulis jujur, termasuk yang masih segel pabrik. Belum ketemu seri yang
            kamu cari? Tanya lewat chat, kami bantu cari.
          </p>
        </>
      }
      related={[
        { href: "/kategori/blokees", label: "Kategori Blokees" },
        { href: "/mainan-murah-jogja", label: "Mainan murah Jogja" },
        { href: "/pilihan-online", label: "Pilihan Online" },
        { href: "/shop", label: "Semua Produk" },
      ]}
    />
  );
}
