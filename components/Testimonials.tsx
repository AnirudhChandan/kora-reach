"use client";

import { useState, useEffect, useCallback } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Kora Reach matched my son with a support worker who genuinely understands him. For the first time, he actually looks forward to his community outings.",
    name: "Priya",
    detail: "Parent, Brunswick",
  },
  {
    quote:
      "They made the whole intake process so simple. No jargon, no pressure. I felt heard from the very first phone call.",
    name: "David",
    detail: "Participant, Richmond",
  },
  {
    quote:
      "I refer my clients to Kora Reach because they follow through. Reliable, communicative, and genuinely person-centred.",
    name: "Sarah",
    detail: "Support Coordinator, Inner East",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section className="py-24 bg-brand-warmNeutral">
      <div className="container-custom max-w-3xl mx-auto text-center">
        <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-brand-dark/40 mb-12">
          What People Say
        </p>

        <div
          className="relative min-h-[220px] md:min-h-[180px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-[var(--ease-smooth)]"
              style={{
                opacity: i === active ? 1 : 0,
                transform: `translateY(${i === active ? "0" : "12px"})`,
                pointerEvents: i === active ? "auto" : "none",
              }}
              aria-hidden={i !== active}
            >
              <Quote
                size={32}
                className="text-brand-accent/30 mb-6"
                strokeWidth={1.5}
              />
              <blockquote className="font-serif text-2xl md:text-3xl text-brand-dark leading-snug mb-8 px-4">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-lightGreen flex items-center justify-center">
                  <span className="font-serif font-bold text-brand-green text-sm">
                    {t.name[0]}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-sans font-semibold text-brand-dark text-sm">
                    {t.name}
                  </p>
                  <p className="font-sans text-brand-dark/50 text-xs">
                    {t.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2.5 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="group relative p-1 hitbox-expand"
              aria-label={`Show testimonial ${i + 1}`}
            >
              <div
                className="h-1.5 rounded-full transition-all duration-500 ease-[var(--ease-spring)]"
                style={{
                  width: i === active ? "2rem" : "0.5rem",
                  backgroundColor:
                    i === active
                      ? "var(--color-brand-green)"
                      : "var(--color-brand-lightGreen)",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
