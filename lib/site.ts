// Business details shared by every page. Change contact info here only.
// Branch names and addresses are translated in the dictionaries (contact.branches), in this same order.
export const site = {
  name: "AMS Global Travel & Tours",
  // The final domain: Vercel redirects the bare domain to www, so canonicals and previews must use www.
  url: "https://www.amsglobal.pk",
  // Default WhatsApp (head office) for buttons that aren't tied to a branch.
  whatsapp: "923001338010",
  email: "info@amsglobal.pk",
  supportEmail: "support@amsglobal.pk",
  developer: { name: "Hassan Javaid Rao", whatsapp: "923035209409" },
  branches: [
    {
      id: "multan",
      mapQuery: "Peace & Peace Plaza, Chungi No. 6, Bosan Road, Multan, Pakistan",
      phones: ["0300-1338010", "0325-2888010"],
      whatsapp: "923001338010",
    },
    {
      id: "khanewal",
      mapQuery: "NADRA Office, Allama Iqbal Town, Khanewal, Pakistan",
      phones: ["0302-2888010"],
      whatsapp: "923022888010",
    },
  ],
};

export const locales = ["en", "ur"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const whatsappLink = (text?: string, number: string = site.whatsapp) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

// "0300-1338010" -> "tel:+923001338010"
export const telLink = (phone: string) => `tel:+92${phone.replace(/\D/g, "").replace(/^0/, "")}`;

export const mapsLink = (branch: (typeof site.branches)[number]) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`;
