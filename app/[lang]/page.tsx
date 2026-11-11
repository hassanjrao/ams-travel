import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhyUs from "@/components/WhyUs";
import { hasLocale, site } from "@/lib/site";
import { getDictionary } from "./dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    url: `${site.url}/${lang}`,
    logo: `${site.url}/images/logo.png`,
    telephone: site.phoneIntl,
    email: site.email,
    address: { "@type": "PostalAddress", addressLocality: "Multan", addressCountry: "PK" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header lang={lang} nav={dict.nav} />
      <main>
        <Hero t={dict.hero} waText={dict.contact.whatsappIntro} />
        <Services t={dict.services} />
        <Packages t={dict.packages} />
        <WhyUs t={dict.why} />
        <Testimonials t={dict.testimonials} />
        <Contact t={dict.contact} services={dict.services.items.map((s) => s.title)} />
      </main>
      <Footer t={dict.footer} nav={dict.nav} services={dict.services.items} address={dict.contact.address} />
      <WhatsAppButton text={dict.contact.whatsappIntro} label={dict.hero.secondary} />
    </>
  );
}
