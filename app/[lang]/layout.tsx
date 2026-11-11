import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope, Noto_Nastaliq_Urdu, Playfair_Display } from "next/font/google";
import "../globals.css";
import { getDictionary } from "./dictionaries";
import { hasLocale, locales, site } from "@/lib/site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const nastaliq = Noto_Nastaliq_Urdu({ subsets: ["arabic"], variable: "--font-nastaliq" });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", ur: "/ur", "x-default": "/en" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}`,
      siteName: site.name,
      locale: lang === "ur" ? "ur_PK" : "en_PK",
      images: [{ url: "/images/hero-kaaba.webp", width: 1200, height: 1800 }],
      type: "website",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      dir={lang === "ur" ? "rtl" : "ltr"}
      className={`${manrope.variable} ${playfair.variable} ${nastaliq.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
