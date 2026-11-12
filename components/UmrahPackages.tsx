import { BadgeCheck, CalendarCheck, CalendarClock, Plane, Wallet } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/site";
import { umrahLand, umrahOffer } from "@/lib/umrah";
import SectionHeading from "./SectionHeading";
import UmrahCard, { fill, ltr } from "./UmrahCard";
import UmrahLand from "./UmrahLand";

type Props = {
  lang: Locale;
  t: Dictionary["umrah"];
  // packages.enquiry: the WhatsApp template with {package} in it.
  enquiry: string;
  actions: Dictionary["actions"];
  branches: Dictionary["contact"]["branches"];
};

const chip = "inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white/85 ring-1 ring-white/10";

export default function UmrahPackages({ lang, t, enquiry, actions, branches }: Props) {
  const date = new Intl.DateTimeFormat(lang === "ur" ? "ur-PK" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const days = fill(t.days, { days: umrahOffer.days, split: ltr(umrahOffer.split) });

  return (
    <section id="umrah" className="relative isolate overflow-hidden bg-night py-24">
      <div aria-hidden className="absolute -top-40 start-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -start-40 -z-10 size-[30rem] rounded-full bg-rust/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} tone="dark" />

        <div className="mt-16">
          <span className="inline-flex rounded-full bg-gradient-to-r from-rust to-gold-dark px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
            {t.offer.badge}
          </span>
          <h3 className="mt-4 font-display text-3xl font-semibold text-white">{t.offer.title}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            <li className={chip}>
              <Plane className="size-4 text-gold-light rtl:-scale-x-100" aria-hidden />
              {fill(t.offer.flights, { airline: umrahOffer.airline })}
            </li>
            <li className={chip}>{t.offer.route}</li>
            <li className={chip}>
              <CalendarClock className="size-4 text-gold-light" aria-hidden />
              {days}
            </li>
          </ul>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {umrahOffer.packages.map((pkg, i) => (
              <UmrahCard
                key={pkg.id}
                n={i + 1}
                makkah={pkg.makkah}
                madinah={pkg.madinah}
                prices={pkg.prices}
                enquiry={fill(enquiry, {
                  package: `${t.offer.title} (${umrahOffer.airline}), ${days}: ${pkg.makkah.name} + ${pkg.madinah.name}`,
                })}
                t={t}
                actions={actions}
                branches={branches}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-16">
          <h3 className="font-display text-3xl font-semibold text-white">{t.land.title}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            <li className={chip}>
              <BadgeCheck className="size-4 text-gold-light" aria-hidden />
              {t.land.includesLabel}: {t.land.includes.join(" · ")}
            </li>
            <li className={chip}>
              <CalendarClock className="size-4 text-gold-light" aria-hidden />
              {fill(t.land.bookingTill, { date: date.format(new Date(umrahLand.bookingTill)) })}
            </li>
            <li className={chip}>
              <CalendarCheck className="size-4 text-gold-light" aria-hidden />
              {fill(t.land.checkOut, { date: date.format(new Date(umrahLand.checkOut)) })}
            </li>
            <li className={chip}>
              <Wallet className="size-4 text-gold-light" aria-hidden />
              {t.land.advance}
            </li>
          </ul>

          <UmrahLand t={t} actions={actions} branches={branches} enquiry={enquiry} />
        </div>
      </div>
    </section>
  );
}
