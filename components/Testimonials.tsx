import Image from "next/image";
import { Camera } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import SectionHeading from "./SectionHeading";
import customers1 from "@/public/images/customers-1.webp";
import customers2 from "@/public/images/customers-2.webp";

// Same order as dictionary testimonials.captions.
const photos = [customers1, customers2];

export default function Testimonials({ t }: { t: Dictionary["testimonials"] }) {
  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {photos.map((photo, i) => (
            <figure
              key={i}
              className="group relative overflow-hidden rounded-3xl bg-sand shadow-lg shadow-ink/10"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={photo}
                  alt={t.captions[i]}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-[50%_40%] transition duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 px-5 py-3 text-center font-semibold text-ink backdrop-blur">
                {t.captions[i]}
              </figcaption>
            </figure>
          ))}

          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gold/40 bg-cream p-10 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
              <Camera className="size-8" aria-hidden />
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold text-ink">{t.shareTitle}</h3>
            <p className="mt-3 text-ink-soft">{t.shareText}</p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:bg-[#1ebe5a]"
            >
              <WhatsAppIcon />
              {t.shareCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
