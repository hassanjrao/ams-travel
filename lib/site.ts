// Business details shared by every page. Change contact info here only.
export const site = {
  name: "AMS Global Travel & Tours",
  url: "https://amsglobal.pk",
  phoneDisplay: "0300-1338010",
  phoneIntl: "+923001338010",
  whatsapp: "923001338010",
  email: "info@amsglobal.pk",
  supportEmail: "support@amsglobal.pk",
};

export const locales = ["en", "ur"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
