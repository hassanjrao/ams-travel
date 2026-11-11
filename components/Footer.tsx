import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { site, telLink, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import logo from "@/public/images/logo.png";

type Props = {
  t: Dictionary["footer"];
  nav: Dictionary["nav"];
  services: Dictionary["services"]["items"];
  branches: Dictionary["contact"]["branches"];
};

export default function Footer({ t, nav, services, branches }: Props) {
  const links = [
    { href: "#home", label: nav.home },
    { href: "#services", label: nav.services },
    { href: "#about", label: nav.about },
    { href: "#packages", label: nav.packages },
    { href: "#gallery", label: nav.gallery },
    { href: "#contact", label: nav.contact },
  ];

  return (
    <footer className="bg-night text-white/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1.4fr] lg:px-8">
        <div>
          <div className="inline-block rounded-2xl bg-white p-3">
            <Image src={logo} alt={site.name} className="h-12 w-auto" />
          </div>
          <p className="mt-5 max-w-xs">{t.tagline}</p>
          <a href={`mailto:${site.email}`} className="mt-4 inline-block font-semibold text-white transition hover:text-gold-light">
            {site.email}
          </a>
        </div>

        <div>
          <h3 className="font-bold text-white">{t.quickLinks}</h3>
          <ul className="mt-4 space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-gold-light">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white">{t.servicesTitle}</h3>
          <ul className="mt-4 space-y-2">
            {services.map((s) => (
              <li key={s.title}>{s.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white">{t.contactTitle}</h3>
          <ul className="mt-4 space-y-6">
            {site.branches.map((branch, i) => (
              <li key={branch.id}>
                <p className="font-semibold text-gold-light">
                  {branches[i].name} · {branches[i].city}
                </p>
                <p className="mt-1 flex gap-2 text-sm">
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {branches[i].address}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 text-sm">
                  <Phone className="size-4 shrink-0" aria-hidden />
                  {branch.phones.map((p) => (
                    <a key={p} href={telLink(p)} dir="ltr" className="tabular-nums transition hover:text-gold-light">
                      {p}
                    </a>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {site.name}. {t.rights}
          </p>
          <p className="text-white/50">
            {t.developedBy}{" "}
            <a
              href={whatsappLink(undefined, site.developer.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-gold-light transition hover:text-white"
              dir="ltr"
            >
              {site.developer.name}
              <WhatsAppIcon className="size-3.5" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
