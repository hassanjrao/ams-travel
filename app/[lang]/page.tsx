import { notFound } from "next/navigation";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import Services from "@/components/Services";
import UmrahPackages from "@/components/UmrahPackages";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhyUs from "@/components/WhyUs";
import { hasLocale, site } from "@/lib/site";
import { getDictionary } from "./dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const branches = dict.contact.branches;
  const en = await getDictionary("en");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    url: `${site.url}/${lang}`,
    logo: `${site.url}/images/logo.png`,
    email: site.email,
    foundingDate: "2019",
    founder: { "@type": "Person", name: en.about.name },
    location: site.branches.map((b, i) => ({
      "@type": "Place",
      name: `${site.name} — ${en.contact.branches[i].name}, ${en.contact.branches[i].city}`,
      telephone: b.phones,
      address: {
        "@type": "PostalAddress",
        streetAddress: en.contact.branches[i].address,
        addressLocality: en.contact.branches[i].city,
        addressCountry: "PK",
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header lang={lang} nav={dict.nav} actions={dict.actions} branches={branches} waText={dict.contact.whatsappIntro} />
      <main>
        <Hero t={dict.hero} waText={dict.contact.whatsappIntro} />
        <Services t={dict.services} />
        <UmrahPackages lang={lang} t={dict.umrah} enquiry={dict.packages.enquiry} actions={dict.actions} branches={branches} />
        <About t={dict.about} />
        <Packages t={dict.packages} actions={dict.actions} branches={branches} />
        <WhyUs t={dict.why} />
        <Gallery t={dict.gallery} />
        <Contact t={dict.contact} actions={dict.actions} services={dict.services.items.map((s) => s.title)} />
      </main>
      <Footer t={dict.footer} nav={dict.nav} services={dict.services.items} branches={branches} />
      <WhatsAppButton text={dict.contact.whatsappIntro} label={dict.hero.secondary} />
    </>
  );
}
