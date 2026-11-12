"use client";

import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { umrahLand } from "@/lib/umrah";
import UmrahCard, { fill, ltr } from "./UmrahCard";

type Props = {
  t: Dictionary["umrah"];
  actions: Dictionary["actions"];
  branches: Dictionary["contact"]["branches"];
  // packages.enquiry, with {package} still in it.
  enquiry: string;
};

// Hotel, visa & transport packages: one set of cards, priced for the chosen duration.
export default function UmrahLand({ t, actions, branches, enquiry }: Props) {
  const [active, setActive] = useState(0);
  const duration = umrahLand.durations[active];
  const days = fill(t.days, { days: duration.days, split: ltr(duration.split) });

  return (
    <>
      <div role="tablist" aria-label={t.land.duration} className="mt-8 flex w-full gap-1 rounded-full bg-white/10 p-1 ring-1 ring-white/10 sm:inline-flex sm:w-auto">
        {umrahLand.durations.map((d, i) => (
          <button
            key={d.days}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`flex-1 whitespace-nowrap rounded-full px-2 py-2 text-xs font-bold transition sm:flex-none sm:px-4 sm:text-sm ${
              i === active ? "bg-gold text-white shadow-lg shadow-gold/30" : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            {fill(t.days, { days: d.days, split: ltr(d.split) })}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {umrahLand.packages.map((pkg, i) => (
          <UmrahCard
            key={pkg.id}
            n={i + 1}
            makkah={pkg.makkah}
            madinah={pkg.madinah}
            prices={pkg.prices[active]}
            enquiry={fill(enquiry, { package: `${t.land.enquiry}, ${days}: ${pkg.makkah.name} + ${pkg.madinah.name}` })}
            t={t}
            actions={actions}
            branches={branches}
          />
        ))}
      </div>
    </>
  );
}
