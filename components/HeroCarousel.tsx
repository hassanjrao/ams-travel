"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Lightbox, { type CarouselLabels, type Slide, useSwipe } from "./Lightbox";

const AUTOPLAY_MS = 5000;

export default function HeroCarousel({ slides, labels }: { slides: Slide[]; labels: CarouselLabels }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [viewing, setViewing] = useState<number | null>(null);
  const count = slides.length;

  const step = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);
  const stepViewer = useCallback(
    (delta: number) => setViewing((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  );
  const closeViewer = useCallback(() => setViewing(null), []);
  const swipe = useSwipe(step);

  // Auto-advance; restarts after every manual step, pauses on hover or while the viewer is open.
  useEffect(() => {
    if (hovered || viewing !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => step(1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [hovered, viewing, index, step]);

  const navButton =
    "absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-lg backdrop-blur transition hover:scale-110 hover:bg-white";

  return (
    <>
      <div
        className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-night shadow-2xl shadow-black/50 ring-8 ring-white/15"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-roledescription="carousel"
        {...swipe}
      >
        {slides.map((slide, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setViewing(i)}
            aria-label={`${labels.view}: ${slide.alt}`}
            inert={i !== index}
            className={`absolute inset-0 cursor-zoom-in transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              preload={i === 0}
              placeholder="blur"
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
              style={slide.position ? { objectPosition: slide.position } : undefined}
            />
          </button>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-night/20" />

        <span className="pointer-events-none absolute end-5 bottom-5 flex size-10 items-center justify-center rounded-full bg-black/35 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
          <Expand className="size-4" aria-hidden />
        </span>

        <button type="button" onClick={() => step(-1)} aria-label={labels.prev} className={`${navButton} start-3`}>
          <ChevronLeft className="size-5 rtl:rotate-180" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label={labels.next} className={`${navButton} end-3`}>
          <ChevronRight className="size-5 rtl:rotate-180" />
        </button>

        <div className="absolute top-6 start-6 z-10 flex gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={slide.alt}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-gold-light" : "w-2 bg-white/60 hover:bg-white"}`}
            />
          ))}
        </div>
      </div>

      {viewing !== null && (
        <Lightbox slides={slides} index={viewing} onStep={stepViewer} onClose={closeViewer} labels={labels} />
      )}
    </>
  );
}
