import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/data";
import { SeoLanding, type Faq } from "@/components/seo-landing";
import { SITE_URL } from "@/lib/site-config";
import { savingsPercent } from "@/lib/utils";

export const revalidate = 60;

const TITLE = "Mainan Murah Jogja — Harga Lokal Lebih Hemat";
const DESC =
  "Cari mainan murah di Jogja? BOXA.YK menampilkan harga lokal (COD / ambil di Yogyakarta) yang dibandingkan langsung dengan harga online. Blokees, collectibles, dan toys original.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | BOXA.YK` },
  description: DESC,
  keywords: ["mainan murah jogja", "toko mainan murah jogja", "toko mainan termurah jogja", "mainan termurah", "harga mainan jogja", "COD mainan jogja"],
  alternates: { canonical: `${SITE_URL}/mainan-murah-jogja` },
  openGraph: { type: "website", siteName: "BOXA.YK", locale: "id_ID", title: `${TITLE} | BOXA.YK`, description: DESC },
};

const FAQS: Faq[] = [
  {
    q: "Di mana cari toko mainan murah di Jogja?",
    a: "BOXA.YK adalah toko mainan dan collectibles di Yogyakarta dengan Harga Lokal untuk COD / ambil langsung. Di setiap produk, harga lokal ditampilkan berdampingan dengan harga online supaya kamu bisa membandingkan sendiri.",
  },
  {
    q: "Apakah BOXA toko mainan termurah?",
    a: "Kami tidak mengklaim selalu termurah di semua barang, karena harga bisa berubah. Yang kami tunjukkan adalah selisih nyata: persentase 'lebih murah' dibanding harga online untuk produk yang punya Harga Lokal. Kamu yang menilai.",
  },
  {
    q: "Apa itu Harga Lokal BOXA?",
    a: "Harga khusus untuk pembelian COD atau ambil langsung di area Yogyakarta, tanpa ongkir dan biaya platform marketplace. Tidak semua produk punya Harga Lokal; yang punya ditandai badge COD Local.",
  },
  {
    q: "Apakah mainannya original dan segel?",
    a: "Ya, produk dengan badge Baru Segel masih tersegel pabrik dan belum pernah dibuka. Kondisi setiap produk ditulis jujur di halaman detail.",
  },
  {
    q: "Bisa kirim ke luar Jogja?",
    a: "Fokus kami pembeli di Yogyakarta (COD dan antar area Yogyakarta). Untuk barang yang tidak tersedia lokal, kami tampilkan pilihan toko online lewat halaman Pilihan Online.",
  },
];

export default async function MainanMurahPage() {
  const all = await getProducts();
  const local = all
    .filter((p) => p.local_price != null && p.offline_available && p.status !== "archived")
    .sort((a, b) => {
      const pa = savingsPercent(a.price, a.local_price as number);
      const pb = savingsPercent(b.price, b.local_price as number);
      return pb - pa || (a.local_price as number) - (b.local_price as number);
    });
  const products = local.length > 0 ? local : all.filter((p) => p.offline_available).sort((a, b) => a.price - b.price);

  return (
    <SeoLanding
      path="/mainan-murah-jogja"
      title={TITLE}
      products={products}
      faqs={FAQS}
      intro={
        <>
          <p>
            Cari mainan murah di Jogja tanpa ribet? Produk di bawah ini punya <strong>Harga Lokal BOXA</strong> untuk
            COD atau ambil langsung di Yogyakarta, diurutkan dari selisih terbesar dibanding harga online.
          </p>
          <p>
            Kami tidak asal klaim termurah. Setiap kartu menunjukkan persentase hemat yang nyata, jadi kamu bisa
            membandingkan sendiri sebelum membeli.
          </p>
        </>
      }
      related={[
        { href: "/shop?local=1", label: "Semua produk Harga Lokal" },
        { href: "/blokees-jogja", label: "Blokees Jogja" },
        { href: "/pilihan-online", label: "Pilihan Online" },
        { href: "/shop", label: "Semua Produk" },
      ]}
    />
  );
}
