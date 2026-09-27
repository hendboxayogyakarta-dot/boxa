import { getSiteSettings } from "@/lib/data";

export const revalidate = 60;

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const { about } = settings;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <span className="text-sm font-semibold text-flame">Tentang BOXA</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
        {about.headline}
      </h1>
      <p className="mt-3 font-display text-lg font-bold text-accent">
        Original Toys, Local Prices.
      </p>
      <p className="mt-5 text-base leading-relaxed text-ink-soft">{about.paragraph1}</p>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">{about.paragraph2}</p>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">{about.paragraph3}</p>
    </div>
  );
}
