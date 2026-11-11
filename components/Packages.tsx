import Image, { type StaticImageData } from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import SectionHeading from "./SectionHeading";
import umrah from "@/public/images/umrah-makkah.webp";
import hajj from "@/public/images/hajj-madinah.webp";
import dubai from "@/public/images/dubai.webp";
import turkey from "@/public/images/turkey.webp";
import malaysia from "@/public/images/malaysia.webp";
import maldives from "@/public/images/maldives.webp";

const images: Record<string, { src: StaticImageData; alt: string }> = {
  umrah: { src: umrah, alt: "Abraj Al Bait clock tower beside Masjid al-Haram, Makkah" },
  hajj: { src: hajj, alt: "Masjid an-Nabawi, Madinah" },
  dubai: { src: dubai, alt: "Dubai skyline with the Burj Khalifa" },
  turkey: { src: turkey, alt: "The Blue Mosque, Istanbul" },
  malaysia: { src: malaysia, alt: "Petronas Twin Towers, Kuala Lumpur" },
  maldives: { src: maldives, alt: "Overwater villas in the Maldives" },
};

export default function Packages({ t }: { t: Dictionary["packages"] }) {
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
                  className="-z-10 object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/90 via-night/35 to-transparent" />

                <span className="absolute top-5 start-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-dark backdrop-blur">
                  {pkg.tag}
                </span>

                <div className="p-7">
                  <h3 className="font-display text-3xl font-semibold text-white">{pkg.title}</h3>
                  <p className="mt-2 text-white/80">{pkg.text}</p>
                  <a
                    href={whatsappLink(`${t.enquiry} ${pkg.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-gold hover:text-white"
                  >
                    <WhatsAppIcon className="size-4 text-[#25D366]" />
                    {t.cta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
