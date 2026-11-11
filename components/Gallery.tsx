import Image from "next/image";
import { Camera } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import SectionHeading from "./SectionHeading";
import departure1 from "@/public/images/gallery-departure-1.webp";
import departure2 from "@/public/images/gallery-departure-2.webp";
import departure3 from "@/public/images/gallery-departure-3.webp";
import hotel from "@/public/images/gallery-hotel.webp";
import airport from "@/public/images/gallery-airport.webp";
import group from "@/public/images/gallery-group.webp";
import office1 from "@/public/images/gallery-office-1.webp";
import office2 from "@/public/images/gallery-office-2.webp";
import guest from "@/public/images/gallery-guest.webp";
import customers1 from "@/public/images/customers-1.webp";
import customers2 from "@/public/images/customers-2.webp";

// Same order as dictionary gallery.alts.
const photos = [departure1, departure2, departure3, hotel, airport, group, office1, office2, guest, customers1, customers2];
// Display order: tall portraits spread between wide shots so the masonry columns end level.
const order = [0, 3, 1, 9, 4, 2, 8, 6, 5, 10, 7];

export default function Gallery({ t }: { t: Dictionary["gallery"] }) {
  return (
    <section id="gallery" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-16 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {order.map((i) => (
            <figure key={i} className="group relative break-inside-avoid overflow-hidden rounded-2xl bg-sand shadow-md shadow-ink/10">
              <Image
                src={photos[i]}
                alt={t.alts[i]}
                placeholder="blur"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="h-auto w-full transition duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-night/85 to-transparent px-4 pb-3 pt-10 text-sm font-semibold text-white transition duration-300 group-hover:translate-y-0">
                {t.alts[i]}
              </figcaption>
            </figure>
          ))}

          <div className="break-inside-avoid rounded-2xl border-2 border-dashed border-gold/40 bg-cream p-6 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
              <Camera className="size-7" aria-hidden />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">{t.shareTitle}</h3>
            <p className="mt-2 text-sm text-ink-soft">{t.shareText}</p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe5a]"
            >
              <WhatsAppIcon className="size-4" />
              {t.shareCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
