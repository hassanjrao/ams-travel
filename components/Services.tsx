import { BedDouble, Compass, FileCheck2, Landmark, Mountain, Plane } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import SectionHeading from "./SectionHeading";

// Same order as dictionary services.items.
const icons = [Landmark, Plane, FileCheck2, BedDouble, Compass, Mountain];

export default function Services({ t }: { t: Dictionary["services"] }) {
  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-sand bg-cream p-8 transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10"
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-rust text-white shadow-lg shadow-gold/30 transition group-hover:scale-110">
                  <Icon className="size-7" aria-hidden />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-ink-soft">{item.text}</p>
                <span
                  aria-hidden
                  className="absolute -bottom-10 -end-10 size-32 rounded-full bg-gold/10 transition duration-500 group-hover:scale-150"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
