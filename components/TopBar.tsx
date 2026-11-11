import { Phone } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { site, telLink, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

type Props = { branches: Dictionary["contact"]["branches"]; actions: Dictionary["actions"]; waText: string };

// The strip above the nav: both branches' numbers with call and WhatsApp buttons.
export default function TopBar({ branches, actions, waText }: Props) {
  return (
    <div className="topbar-shine relative overflow-hidden bg-gradient-to-r from-ink via-rust to-gold-dark text-white">
      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-3 py-1.5 sm:justify-between sm:px-6 lg:px-8">
        <p className="hidden items-center gap-2 text-sm font-semibold text-gold-light lg:flex">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[#25D366]" />
          </span>
          {actions.reach}
        </p>

        <div className="flex items-center gap-2 sm:gap-5">
          {site.branches.map((branch, i) => (
            <div key={branch.id} className="flex items-center gap-1.5 rounded-full bg-white/10 py-1 ps-3 pe-1 ring-1 ring-white/15">
              <span className="text-xs font-bold uppercase tracking-wide text-gold-light">{branches[i].city}</span>
              <a
                href={telLink(branch.phones[0])}
                dir="ltr"
                className="hidden text-sm font-bold tabular-nums hover:text-gold-light sm:inline"
              >
                {branch.phones[0]}
              </a>
              <a
                href={telLink(branch.phones[0])}
                aria-label={`${actions.call} ${branches[i].city} ${branch.phones[0]}`}
                className="flex size-7 items-center justify-center rounded-full bg-white text-rust shadow transition hover:scale-110 hover:bg-gold-light"
              >
                <Phone className="size-3.5" aria-hidden />
              </a>
              <a
                href={whatsappLink(waText, branch.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${actions.whatsapp} ${branches[i].city}`}
                className="relative flex size-7 items-center justify-center rounded-full bg-[#25D366] text-white shadow transition hover:scale-110"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40 motion-reduce:hidden" />
                <WhatsAppIcon className="relative size-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
