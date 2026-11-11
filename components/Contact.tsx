"use client";

import { type FormEvent, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import SectionHeading from "./SectionHeading";

type Props = { t: Dictionary["contact"]; services: string[] };

const field =
  "w-full rounded-2xl border border-sand bg-white px-5 py-3.5 text-ink placeholder:text-ink-soft/60 outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/15";

export default function Contact({ t, services }: Props) {
  const [form, setForm] = useState({ name: "", phone: "", service: services[0], message: "" });
  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // No backend: the enquiry is composed into a WhatsApp message the visitor sends themselves.
  function submit(e: FormEvent) {
    e.preventDefault();
    const text = [
      t.whatsappIntro,
      "",
      `${t.labels.name}: ${form.name}`,
      `${t.labels.phone}: ${form.phone}`,
      `${t.labels.service}: ${form.service}`,
      form.message && `${t.labels.message}: ${form.message}`,
    ]
      .filter((line) => line !== "")
      .join("\n");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  const info = [
    { icon: Phone, label: t.callUs, value: site.phoneDisplay, href: `tel:${site.phoneIntl}`, ltr: true },
    { icon: Mail, label: t.emailUs, value: site.email, href: `mailto:${site.email}`, ltr: true },
    { icon: MapPin, label: t.visitUs, value: t.address, href: undefined, ltr: false },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-4">
            {info.map(({ icon: Icon, label, value, href, ltr }) => {
              const body = (
                <>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-rust text-white">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink-soft">{label}</span>
                    <span className="block text-lg font-bold text-ink" dir={ltr ? "ltr" : undefined}>
                      {value}
                    </span>
                  </span>
                </>
              );
              const cls = "flex items-center gap-4 rounded-3xl border border-sand bg-white p-5 transition";
              return href ? (
                <a key={label} href={href} className={`${cls} hover:border-gold/50 hover:shadow-lg`}>
                  {body}
                </a>
              ) : (
                <div key={label} className={cls}>
                  {body}
                </div>
              );
            })}

            <a
              href={whatsappLink(t.whatsappIntro)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-3xl bg-[#25D366] p-5 text-lg font-bold text-white transition hover:bg-[#1ebe5a]"
            >
              <WhatsAppIcon className="size-6" />
              <span dir="ltr">{site.phoneDisplay}</span>
            </a>
          </div>

          <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 shadow-xl shadow-ink/5 ring-1 ring-sand sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">{t.name}</span>
                <input required value={form.name} onChange={set("name")} placeholder={t.name} className={field} autoComplete="name" />
              </label>
              <label className="block">
                <span className="sr-only">{t.phone}</span>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder={t.phone}
                  className={field}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-ink-soft">{t.service}</span>
                <select value={form.service} onChange={set("service")} className={field}>
                  {services.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="sr-only">{t.message}</span>
                <textarea value={form.message} onChange={set("message")} placeholder={t.message} rows={5} className={field} />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 font-bold text-white transition hover:bg-gold-dark"
            >
              <WhatsAppIcon />
              {t.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
