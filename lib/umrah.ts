// Umrah 1448 AH prices in PKR, copied from the office flyers. Change prices here only.
// Hotel names stay in English on both languages: customers book by these names.
// Distances are metres from the Haram (Makkah) or Masjid an-Nabawi (Madinah).

export type Hotel = { name: string; distance?: string; shuttle?: boolean };

// Price order everywhere: sharing, quad, triple, double.
export const roomTypes = ["sharing", "quad", "triple", "double"] as const;
export type Prices = [number, number, number, number];

export type UmrahPackage = { id: string; makkah: Hotel; madinah: Hotel };

// Special offer: return AirSial flights Multan–Jeddah–Multan (MUX–JED–MUX) with hotels, one fixed 21-day trip.
export const umrahOffer = {
  airline: "AirSial",
  days: 21,
  split: "12+8",
  packages: [
    {
      id: "masmarah",
      makkah: { name: "Masarat Masmarah", shuttle: true },
      madinah: { name: "Abraj Diyafah", shuttle: true },
      prices: [242000, 255000, 268000, 282000],
    },
    {
      id: "sharook",
      makkah: { name: "Roza Sharook / Lulu Touheed", distance: "900" },
      madinah: { name: "Masarat Majd Taiba", distance: "700" },
      prices: [260000, 275000, 292000, 328000],
    },
    {
      id: "khalil",
      makkah: { name: "Masarat Khalil", distance: "800" },
      madinah: { name: "Naseem Al Sharia", distance: "700–750" },
      prices: [275000, 290000, 315000, 350000],
    },
    {
      id: "silver",
      makkah: { name: "Masarat Silver", distance: "600" },
      madinah: { name: "Zahra 2 / Fundaq Kayan Taiba", distance: "400–500" },
      prices: [285000, 295000, 315000, 352000],
    },
  ] as (UmrahPackage & { prices: Prices })[],
};

// Hotel, visa and transport packages (no flights), priced per duration.
export const umrahLand = {
  bookingTill: "2026-11-01",
  checkOut: "2026-12-15",
  // Each package's prices[] follows this order.
  durations: [
    { days: 15, split: "6+8" },
    { days: 21, split: "12+8" },
    { days: 28, split: "16+12" },
  ],
  packages: [
    {
      id: "masmarah",
      makkah: { name: "Masarat Masmarah", shuttle: true },
      madinah: { name: "Abraj Diyafah", shuttle: true },
      prices: [
        [72000, 77000, 82000, 94000],
        [77000, 85000, 97000, 113000],
        [83000, 91500, 103000, 125000],
      ],
    },
    {
      id: "sharook",
      makkah: { name: "Roza Sharook", distance: "1100" },
      madinah: { name: "Masarat Majd Taiba", distance: "700–800" },
      prices: [
        [83000, 90000, 101000, 122000],
        [95000, 106000, 124000, 159500],
        [106500, 121000, 141000, 182500],
      ],
    },
    {
      id: "khalil",
      makkah: { name: "Masarat Khalil", distance: "800" },
      madinah: { name: "Naseem Al Sharia", distance: "700–750" },
      prices: [
        [91500, 101500, 116000, 144500],
        [105000, 122000, 145000, 183000],
        [124500, 145000, 174000, 231000],
      ],
    },
    {
      id: "silver",
      makkah: { name: "Masarat Silver", distance: "600" },
      madinah: { name: "Fundaq Kayan Taiba", distance: "400–500" },
      prices: [
        [95500, 106500, 122500, 154000],
        [113000, 128000, 148000, 185000],
        [133000, 155000, 187000, 251000],
      ],
    },
  ] as (UmrahPackage & { prices: Prices[] })[],
};

export const formatAmount = (amount: number) => amount.toLocaleString("en-US");
