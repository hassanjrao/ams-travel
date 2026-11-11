import { Phone } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { site, telLink, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

type Props = {
  branches: Dictionary["contact"]["branches"];
  actions: Dictionary["actions"];
  // Prefilled WhatsApp message, e.g. the package being asked about.
  text?: string;
};

// One row per branch (city, then Call and WhatsApp buttons), used on the package cards.
// Branch dictionary entries are in the same order as site.branches.
export default function BranchActions({ branches, actions, text }: Props) {
  return (
    <div className="mt-5 space-y-2">
      {site.branches.map((branch, i) => (
        <div
          key={branch.id}
          className="flex items-center justify-between gap-2 rounded-2xl bg-white/10 py-1.5 ps-4 pe-1.5 ring-1 ring-white/20 backdrop-blur-md"
        >
          <span className="text-sm font-bold text-gold-light">{branches[i].city}</span>
          <span className="flex gap-1.5">
            <a
              href={telLink(branch.phones[0])}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-ink transition hover:bg-gold hover:text-white"
              aria-label={`${actions.call} ${branches[i].city} ${branch.phones[0]}`}
            >
              <Phone className="size-3.5" aria-hidden />
              {actions.call}
            </a>
            <a
              href={whatsappLink(text, branch.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#1ebe5a]"
              aria-label={`${actions.whatsapp} ${branches[i].city}`}
            >
              <WhatsAppIcon className="size-3.5" />
              {actions.whatsapp}
            </a>
          </span>
        </div>
      ))}
    </div>
  );
}
