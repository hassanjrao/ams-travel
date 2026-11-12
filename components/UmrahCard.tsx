import type { Dictionary } from "@/app/[lang]/dictionaries";
import { formatAmount, roomTypes, type Hotel, type Prices } from "@/lib/umrah";
import BranchActions from "./BranchActions";

// "{d} m from the Haram" -> "800 m from the Haram"
export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));

// Keeps "12+8" and "700–750" reading left to right inside Urdu text; without it they show as "8+12" and "750–700".
export const ltr = (text: string) => `⁦${text}⁩`;

type Props = {
  n: number;
  makkah: Hotel;
  madinah: Hotel;
  prices: Prices;
  // Prefilled WhatsApp message for this package.
  enquiry: string;
  t: Dictionary["umrah"];
  actions: Dictionary["actions"];
  branches: Dictionary["contact"]["branches"];
};

function HotelLine({ city, hotel, distance, shuttle, dot }: { city: string; hotel: Hotel; distance: string; shuttle: string; dot: string }) {
  return (
    <div className="flex gap-3">
      <span className={`mt-2.5 size-2.5 shrink-0 rounded-full ${dot}`} aria-hidden />
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-white/55">{city}</p>
        <p className="text-lg font-bold leading-snug text-white">{hotel.name}</p>
        <p className="text-sm text-white/60">{hotel.shuttle ? shuttle : fill(distance, { d: ltr(hotel.distance ?? "") })}</p>
      </div>
    </div>
  );
}

export default function UmrahCard({ n, makkah, madinah, prices, enquiry, t, actions, branches }: Props) {
  return (
    <article className="flex flex-col rounded-3xl bg-white/[0.05] p-5 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/[0.08] hover:ring-gold/40">
      <p className="text-sm font-bold text-gold-light">{fill(t.package, { n })}</p>

      <div className="mt-4 space-y-3">
        <HotelLine city={t.makkah} hotel={makkah} distance={t.fromHaram} shuttle={t.shuttle} dot="bg-gold-light" />
        <HotelLine city={t.madinah} hotel={madinah} distance={t.fromNabawi} shuttle={t.shuttle} dot="bg-emerald-400" />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-2">
        {roomTypes.map((room, i) => (
          <div
            key={room}
            className={`rounded-2xl px-3 py-2.5 ${
              i === 0 ? "bg-gradient-to-br from-gold to-gold-dark shadow-lg shadow-gold/20" : "bg-white/[0.07] ring-1 ring-white/10"
            }`}
          >
            <dt className="text-xs font-semibold text-white/75">{t.rooms[room]}</dt>
            <dd className="mt-0.5 font-extrabold tabular-nums text-white">
              <bdi>
                <span className="text-xs font-semibold text-white/70">Rs.</span> {formatAmount(prices[i])}
              </bdi>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto">
        <BranchActions branches={branches} actions={actions} text={enquiry} />
      </div>
    </article>
  );
}
