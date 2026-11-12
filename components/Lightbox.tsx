"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// contain: show the whole image in the carousel instead of cropping it (flyers with text).
export type Slide = { src: StaticImageData; alt: string; position?: string; contain?: boolean };
export type CarouselLabels = { prev: string; next: string; close: string; view: string };

const isRtl = () => document.documentElement.dir === "rtl";

// Swipe left/right to step through photos. In RTL the visual direction flips, so "next" is a swipe right.
export function useSwipe(step: (delta: number) => void) {
  const startX = useRef<number | null>(null);
  return {
    onTouchStart: (e: React.TouchEvent) => {
      startX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (startX.current === null) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      startX.current = null;
      if (Math.abs(dx) < 40) return;
      const forward = dx < 0 ? 1 : -1;
      step(isRtl() ? -forward : forward);
    },
  };
}

type Props = {
  slides: Slide[];
  index: number;
  onStep: (delta: number) => void;
  onClose: () => void;
  labels: CarouselLabels;
};

export default function Lightbox({ slides, index, onStep, onClose, labels }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipe = useSwipe(onStep);
  const slide = slides[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Arrow keys move visually: in RTL the next photo is to the left.
      else if (e.key === "ArrowRight") onStep(isRtl() ? -1 : 1);
      else if (e.key === "ArrowLeft") onStep(isRtl() ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, onStep]);

  const navButton =
    "absolute top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white hover:text-ink sm:size-14";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={slide.alt}
      className="fixed inset-0 z-[100] flex flex-col bg-night/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
        <span className="text-sm font-semibold tabular-nums text-white/70" dir="ltr">
          {index + 1} / {slides.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="flex size-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white hover:text-ink"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex-1" {...swipe}>
        <Image
          key={index}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          className="animate-rise object-contain px-2 sm:px-20"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onStep(-1);
          }}
          aria-label={labels.prev}
          className={`${navButton} start-2 sm:start-6`}
        >
          <ChevronLeft className="size-6 rtl:rotate-180" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onStep(1);
          }}
          aria-label={labels.next}
          className={`${navButton} end-2 sm:end-6`}
        >
          <ChevronRight className="size-6 rtl:rotate-180" />
        </button>
      </div>

      <p className="px-4 py-4 text-center text-sm text-white/80 sm:text-base">{slide.alt}</p>
    </div>,
    document.body,
  );
}
