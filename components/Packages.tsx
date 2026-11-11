import Image, { type StaticImageData } from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import BranchActions from "./BranchActions";
import SectionHeading from "./SectionHeading";
import umrah from "@/public/images/umrah-kaaba-night.webp";
import hajj from "@/public/images/madinah-night.webp";
import dubai from "@/public/images/dubai.webp";
import turkey from "@/public/images/turkey.webp";
import malaysia from "@/public/images/malaysia.webp";
import maldives from "@/public/images/maldives.webp";

const images: Record<string, { src: StaticImageData; alt: string; position?: string }> = {
  umrah: { src: umrah, alt: "Our pilgrims at the Kaaba at night, Masjid al-Haram", position: "75% 50%" },
  hajj: { src: hajj, alt: "A pilgrim at Masjid an-Nabawi, Madinah, at night" },
  dubai: { src: dubai, alt: "Dubai skyline with the Burj Khalifa" },
  turkey: { src: turkey, alt: "The Blue Mosque, Istanbul" },
  malaysia: { src: malaysia, alt: "Petronas Twin Towers, Kuala Lumpur" },
  maldives: { src: maldives, alt: "Overwater villas in the Maldives" },
};

type Props = {
  t: Dictionary["packages"];
  actions: Dictionary["actions"];
  branches: Dictionary["contact"]["branches"];
};

export default function Packages({ t, actions, branches }: Props) {
  return (
    <section id="packages" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((pkg, i) => {
            const img = images[pkg.id];
            // First two cards (Umrah, Hajj) are the core business: give them extra height on large screens.
            const tall = i < 2;
            return (
              <article
                key={pkg.id}
                className={`group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl shadow-lg shadow-ink/10 ${
                  tall ? "lg:min-h-[32rem]" : ""
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  style={img.position ? { objectPosition: img.position } : undefined}
                  className="-z-10 object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/95 via-night/55 to-night/5" />

                <span className="absolute top-5 start-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-dark backdrop-blur">
                  {pkg.tag}
                </span>

                <div className="p-7">
                  <h3 className="font-display text-3xl font-semibold text-white">{pkg.title}</h3>
                  <p className="mt-2 text-white/80">{pkg.text}</p>
                  <BranchActions branches={branches} actions={actions} text={t.enquiry.split("{package}").join(pkg.title)} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
