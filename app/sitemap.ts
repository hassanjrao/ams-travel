import type { MetadataRoute } from "next";
import { locales, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${site.url}/${lang}`,
    changeFrequency: "monthly",
    priority: lang === "en" ? 1 : 0.9,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}`])) },
  }));
}
