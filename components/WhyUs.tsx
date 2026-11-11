import Image from "next/image";
import { BadgeCheck, Building2, Layers, MessageCircle } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import SectionHeading from "./SectionHeading";
import flights from "@/public/images/flights.webp";

const icons = [Building2, Layers, BadgeCheck, MessageCircle];

export default function WhyUs({ t }: { t: Dictionary["why"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-night py-24">
      <Image src={flights} alt="" fill placeholder="blur" sizes="100vw" className="-z-10 object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/80 to-night" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} tone="dark" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition hover:border-gold/50 hover:bg-white/10"
              >
                <Icon className="size-9 text-gold-light" aria-hidden />
                <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-white/65">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
