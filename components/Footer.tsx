import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { site } from "@/lib/site";
import logo from "@/public/images/logo.png";

type Props = { t: Dictionary["footer"]; nav: Dictionary["nav"]; services: Dictionary["services"]["items"]; address: string };

export default function Footer({ t, nav, services, address }: Props) {
  const links = [
    { href: "#home", label: nav.home },
    { href: "#services", label: nav.services },
    { href: "#packages", label: nav.packages },
    { href: "#testimonials", label: nav.testimonials },
    { href: "#contact", label: nav.contact },
  ];

  return (
    <footer className="bg-night text-white/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="inline-block rounded-2xl bg-white p-3">
            <Image src={logo} alt={site.name} className="h-12 w-auto" />
          </div>
          <p className="mt-5 max-w-xs">{t.tagline}</p>
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
          <ul className="mt-4 space-y-2">
            <li>
              <a href={`tel:${site.phoneIntl}`} dir="ltr" className="transition hover:text-gold-light">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition hover:text-gold-light">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.supportEmail}`} className="transition hover:text-gold-light">
                {site.supportEmail}
              </a>
            </li>
            <li>{address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {site.name}. {t.rights}
          </p>
          <p className="text-white/40">{t.photos}</p>
        </div>
      </div>
    </footer>
  );
}
