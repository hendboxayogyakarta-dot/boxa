import Link from "next/link";

// Last-resort fallback for routes that don't match anything at all (e.g.
// a mistyped /admin path) — outside the (site) layout, so no header/
// footer here. Customer-facing 404s (product/category not found, typo'd
// shop URLs) go through app/(site)/not-found.tsx instead, which gets the
// full site chrome.
export default function RootNotFound() {
  return (
    <html lang="id">
      <body style={{ fontFamily: "sans-serif", textAlign: "center", padding: "4rem 1rem" }}>
        <h1>404 — Halaman Tidak Ditemukan</h1>
        <p><Link href="/">Kembali ke BOXA.YK</Link></p>
      </body>
    </html>
  );
}
