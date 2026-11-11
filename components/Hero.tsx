import Image from "next/image";
import { ArrowRight, Camera, CheckCircle2, Plane } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import pilgrim from "@/public/images/hero-pilgrim.webp";
import madinah from "@/public/images/madinah-pilgrim.webp";
import departure1 from "@/public/images/gallery-departure-1.webp";
import kaabaNight from "@/public/images/umrah-kaaba-night.webp";
import office from "@/public/images/gallery-office-1.webp";
import departure2 from "@/public/images/gallery-departure-2.webp";

// Real photos of our travellers, cross-faded behind the headline (timing in .hero-slide).
const slides = [departure1, kaabaNight, office, departure2];

export default function Hero({ t, waText }: { t: Dictionary["hero"]; waText: string }) {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-night pt-40 pb-24 lg:pt-48 lg:pb-32">
      <div aria-hidden className="absolute inset-0 -z-20">
        {slides.map((slide, i) => (
          <Image
            key={i}
            src={slide}
            alt=""
            fill
            preload={i === 0}
            sizes="100vw"
            className="hero-slide object-cover"
            style={{ animationDelay: `${i * 6}s` }}
          />
        ))}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/75 to-night/45 rtl:bg-gradient-to-l"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-night/80 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8">
        <div className="animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-light/30 bg-white/10 px-4 py-1.5 text-sm font-bold tracking-wide text-gold-light backdrop-blur">
            <Plane className="size-4 rtl:-scale-x-100" aria-hidden />
            {t.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {t.titleStart} <span className="text-gold-gradient-light italic">{t.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">{t.subtitle}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-dark px-7 py-3.5 font-semibold text-white shadow-lg shadow-gold/30 transition hover:brightness-110"
            >
              {t.primary}
              <ArrowRight className="size-4 transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden />
            </a>
            <a
              href={whatsappLink(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-[#25D366] hover:border-[#25D366]"
            >
              <WhatsAppIcon className="size-5" />
              {t.secondary}
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {t.badges.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm font-semibold text-white/85">
                <CheckCircle2 className="size-5 text-gold-light" aria-hidden />
                {b}
              </li>
            ))}
          </ul>

          <p className="mt-8 inline-flex items-center gap-2 text-sm text-white/60">
            <Camera className="size-4" aria-hidden />
            {t.realPhotos}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm animate-rise [animation-delay:150ms] lg:max-w-md">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-black/50 ring-8 ring-white/15">
            <Image
              src={pilgrim}
              alt={t.imageAlt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent" />
          </div>

          <div className="animate-float absolute -bottom-6 start-[-1rem] flex items-center gap-3 rounded-2xl bg-white p-3 pe-5 shadow-xl sm:start-[-2rem]">
            <Image src={madinah} alt="" className="size-14 rounded-xl object-cover" sizes="56px" />
            <div>
              <p className="font-display text-lg font-semibold leading-tight text-ink">{t.cardTitle}</p>
              <p className="text-sm text-ink-soft">{t.cardText}</p>
            </div>
          </div>

          <div className="absolute top-6 end-[-0.5rem] rounded-full bg-gold px-4 py-2 text-sm font-bold text-white shadow-lg sm:end-[-1.5rem]">
            {t.cardTag}
          </div>
        </div>
      </div>
    </section>
  );
}
