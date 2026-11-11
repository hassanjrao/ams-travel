import Image from "next/image";
import { ArrowRight, CheckCircle2, Plane } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import kaaba from "@/public/images/hero-kaaba.webp";
import madinah from "@/public/images/hajj-madinah.webp";

export default function Hero({ t, waText }: { t: Dictionary["hero"]; waText: string }) {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div aria-hidden className="pointer-events-none absolute -top-40 end-[-10%] size-[38rem] rounded-full bg-gold/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 start-[-15%] size-[30rem] rounded-full bg-rust/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div className="animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/70 px-4 py-1.5 text-sm font-bold tracking-wide text-gold-dark">
            <Plane className="size-4 rtl:-scale-x-100" aria-hidden />
            {t.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {t.titleStart} <span className="text-gold-gradient italic">{t.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">{t.subtitle}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-white shadow-lg shadow-ink/20 transition hover:bg-gold-dark"
            >
              {t.primary}
              <ArrowRight className="size-4 transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden />
            </a>
            <a
              href={whatsappLink(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-7 py-3.5 font-semibold text-ink transition hover:border-[#25D366] hover:text-[#128C4B]"
            >
              <WhatsAppIcon className="size-5 text-[#25D366]" />
              {t.secondary}
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {t.badges.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
                <CheckCircle2 className="size-5 text-gold" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-rise [animation-delay:150ms] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-ink/25 ring-8 ring-white">
            <Image
              src={kaaba}
              alt="The Kaaba in Masjid al-Haram, Makkah"
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
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
