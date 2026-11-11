"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Languages, Menu, X } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/site";
import TopBar from "./TopBar";
import logo from "@/public/images/logo.png";

type Props = {
  lang: Locale;
  nav: Dictionary["nav"];
  actions: Dictionary["actions"];
  branches: Dictionary["contact"]["branches"];
  waText: string;
};

export default function Header({ lang, nav, actions, branches, waText }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const other: Locale = lang === "en" ? "ur" : "en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home", label: nav.home },
    { href: "#services", label: nav.services },
    { href: "#about", label: nav.about },
    { href: "#packages", label: nav.packages },
    { href: "#gallery", label: nav.gallery },
    { href: "#contact", label: nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <TopBar branches={branches} actions={actions} waText={waText} />

      <div
        className={`transition-all duration-300 ${
          scrolled || open ? "bg-white/95 shadow-[0_8px_30px_-12px_rgba(60,40,10,0.35)] backdrop-blur-md" : "bg-white"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#home" className="shrink-0" aria-label="AMS Global Travel & Tours">
            <Image src={logo} alt="AMS Global Travel & Tours" className="h-12 w-auto sm:h-14" preload />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-ink-soft transition hover:bg-sand hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/${other}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-3 py-1.5 text-sm font-semibold text-gold-dark transition hover:bg-gold hover:text-white"
              lang={other}
            >
              <Languages className="size-4" aria-hidden />
              {nav.switchTo}
            </Link>
            <a
              href="#contact"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gold-dark sm:inline-flex"
            >
              {nav.cta}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-sand lg:hidden"
              aria-expanded={open}
              aria-label={nav.menu}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-sand px-4 pb-5 pt-2 lg:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-semibold text-ink-soft hover:bg-sand hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-ink px-5 py-3 text-center font-semibold text-white"
            >
              {nav.cta}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
