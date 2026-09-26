import { ShieldCheck, MessageCircle, Gem } from "lucide-react";
import { JourneyStrip } from "@/components/sections/journey-strip";
import { getSiteSettings } from "@/lib/data";

export const revalidate = 60;

const PILLAR_ICONS = [ShieldCheck, Gem, MessageCircle];

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const { about } = settings;

  const pillars = [
    { title: about.pillar1_title, text: about.pillar1_text },
    { title: about.pillar2_title, text: about.pillar2_text },
    { title: about.pillar3_title, text: about.pillar3_text },
  ];

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

      <div className="mt-8 -mx-4 sm:-mx-6">
        <JourneyStrip />
      </div>

      <div className="mt-2 grid gap-4 sm:grid-cols-3">
        {pillars.map(({ title, text }, i) => {
          const Icon = PILLAR_ICONS[i];
          return (
            <div key={title} className="rounded-2xl border border-line bg-white p-5">
              <Icon className="text-flame" size={22} />
              <h3 className="mt-3 font-display text-base font-bold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm text-muted">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
