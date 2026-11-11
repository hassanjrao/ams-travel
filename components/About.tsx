import Image from "next/image";
import { Quote } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import office from "@/public/images/gallery-office-1.webp";

export default function About({ t }: { t: Dictionary["about"] }) {
  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div aria-hidden className="pointer-events-none absolute top-20 start-[-10%] size-[28rem] rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-3 -rotate-2 rounded-[2.5rem] bg-gradient-to-br from-gold/40 to-rust/30" aria-hidden />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.25rem] shadow-2xl shadow-ink/20">
            <Image
              src={office}
              alt={t.imageAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 end-6 flex size-28 flex-col items-center justify-center rounded-full bg-ink text-center text-white shadow-xl ring-4 ring-cream">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-light">{t.since}</span>
            <span className="font-display text-3xl font-semibold">2019</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-dark">{t.eyebrow}</p>
          <blockquote className="mt-4">
            <Quote className="size-10 text-gold/50 rtl:-scale-x-100" aria-hidden />
            <p className="mt-2 font-display text-3xl font-semibold leading-snug text-gold-gradient sm:text-4xl">{t.quote}</p>
          </blockquote>

          <div className="mt-6 space-y-4 text-ink-soft">
            {t.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p className="font-semibold text-ink">{t.closing}</p>
          </div>

          <div className="mt-8 flex items-center gap-4 border-t border-sand pt-6">
            <span className="h-12 w-1 rounded-full bg-gradient-to-b from-gold to-rust" aria-hidden />
            <div>
              <p className="font-display text-xl font-semibold text-ink">{t.name}</p>
              <p className="text-sm text-ink-soft">{t.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
