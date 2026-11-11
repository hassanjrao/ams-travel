"use client";

import { type FormEvent, useState } from "react";
import { Mail, MapPin, Navigation, Phone, UserRound } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { mapsLink, site, telLink, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import SectionHeading from "./SectionHeading";

type Props = { t: Dictionary["contact"]; actions: Dictionary["actions"]; services: string[] };

const field =
  "w-full rounded-2xl border border-sand bg-white px-5 py-3.5 text-ink placeholder:text-ink-soft/60 outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/15";

export default function Contact({ t, actions, services }: Props) {
  const [form, setForm] = useState({ name: "", phone: "", service: services[0], branch: 0, message: "" });
  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: key === "branch" ? Number(e.target.value) : e.target.value }));

  // No backend: the enquiry is composed into a WhatsApp message to the chosen branch.
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
    window.open(whatsappLink(text, site.branches[form.branch].whatsapp), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {site.branches.map((branch, i) => {
            const info = t.branches[i];
            return (
              <article
                key={branch.id}
                className="relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-xl shadow-ink/5 ring-1 ring-sand sm:p-8"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gold via-rust to-gold-dark" />
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl font-semibold text-ink">{info.name}</h3>
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-dark">
                    {info.city}
                  </span>
                </div>

                <ul className="mt-5 space-y-3 text-ink-soft">
                  <li className="flex items-start gap-3">
                    <UserRound className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                    <span className="font-semibold text-ink">{info.person}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                    <span>{info.address}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                    <span className="flex flex-wrap gap-x-4 gap-y-1">
                      {branch.phones.map((p) => (
                        <a key={p} href={telLink(p)} dir="ltr" className="font-bold text-ink tabular-nums hover:text-gold-dark">
                          {p}
                        </a>
                      ))}
                    </span>
                  </li>
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  <a
                    href={telLink(branch.phones[0])}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-gold-dark"
                  >
                    <Phone className="size-4" aria-hidden />
                    {actions.call}
                  </a>
                  <a
                    href={whatsappLink(t.whatsappIntro, branch.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1ebe5a]"
                  >
                    <WhatsAppIcon className="size-4" />
                    {actions.whatsapp}
                  </a>
                  <a
                    href={mapsLink(branch)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink transition hover:border-gold hover:text-gold-dark"
                  >
                    <Navigation className="size-4 rtl:-scale-x-100" aria-hidden />
                    {t.directions}
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col justify-center rounded-[2rem] bg-gradient-to-br from-ink to-rust p-7 text-white">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15">
              <Mail className="size-5" aria-hidden />
            </span>
            <p className="mt-5 text-sm font-semibold text-gold-light">{t.emailUs}</p>
            {[site.email, site.supportEmail].map((email) => (
              <a key={email} href={`mailto:${email}`} className="mt-1 block text-lg font-bold break-all hover:text-gold-light">
                {email}
              </a>
            ))}
          </div>

          <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 shadow-xl shadow-ink/5 ring-1 ring-sand sm:p-8">
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
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink-soft">{t.service}</span>
                <select value={form.service} onChange={set("service")} className={field}>
                  {services.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink-soft">{t.branch}</span>
                <select value={form.branch} onChange={set("branch")} className={field}>
                  {t.branches.map((b, i) => (
                    <option key={b.city} value={i}>
                      {b.name} · {b.city}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="sr-only">{t.message}</span>
                <textarea value={form.message} onChange={set("message")} placeholder={t.message} rows={4} className={field} />
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
