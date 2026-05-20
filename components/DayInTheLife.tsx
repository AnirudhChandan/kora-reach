"use client";

import { useEffect, useRef, useState } from "react";

type Story = {
  step: string;
  heading: string;
  text: string;
  accent: string;
};

const stories: Story[] = [
  {
    step: "The Starting Point",
    heading: "Sarah wanted to join a painting class",
    text: "After years of staying mostly at home, Sarah told her support coordinator she missed being creative. She'd seen a community art class at her local library but felt too anxious to go alone.",
    accent: "var(--color-brand-accent)",
  },
  {
    step: "Making Contact",
    heading: "She reached out to Kora Reach",
    text: "Sarah's plan manager submitted an enquiry on a Tuesday. By Wednesday afternoon, our intake team had called her back, listened to what she wanted, and started looking for the right support worker.",
    accent: "var(--color-brand-green)",
  },
  {
    step: "The Right Match",
    heading: "We paired her with someone who gets it",
    text: "We matched Sarah with Priya — someone patient, calm, and genuinely interested in art herself. They met for a coffee first, no pressure. Sarah felt comfortable straight away.",
    accent: "var(--color-brand-accent)",
  },
  {
    step: "Building Confidence",
    heading: "First class, first brushstroke",
    text: "Priya drove Sarah to the library, helped her settle in, and stayed nearby without hovering. By the second session, Sarah was chatting with the person next to her about watercolours.",
    accent: "var(--color-brand-green)",
  },
  {
    step: "Today",
    heading: "Now she goes every Thursday",
    text: "Three months later, Sarah attends painting class independently — Priya just provides the transport. She's also joined the library's reading group. Her family says it's the most connected she's been in years.",
    accent: "var(--color-brand-accent)",
  },
];

export default function DayInTheLife() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i);
          }
        },
        { threshold: 0.6, rootMargin: "-20% 0px -20% 0px" },
      );
      observer.observe(card);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-brand-dark/40 mb-4">
            A Real Story
          </p>
          <h2 className="mb-4">A Day in the Life</h2>
          <p className="text-lg text-brand-dark/60 font-sans leading-relaxed">
            This is what support actually looks like — not a brochure, but a real journey
            from first contact to lasting change.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          {/* Sticky left panel */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <div className="relative bg-brand-lightGreen rounded-[2rem] p-8 md:p-10 overflow-hidden">
                {/* Decorative SVG illustration */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-auto mb-6 opacity-80"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* palette */}
                  <ellipse cx="100" cy="130" rx="60" ry="35" stroke="var(--color-brand-green)" strokeWidth="1.5" opacity="0.3" />
                  <ellipse cx="100" cy="130" rx="40" ry="22" stroke="var(--color-brand-green)" strokeWidth="1.5" opacity="0.2" />
                  {/* person silhouette */}
                  <circle cx="100" cy="60" r="16" stroke="var(--color-brand-green)" strokeWidth="2" />
                  <path d="M100 76 C80 76 72 92 72 108 H128 C128 92 120 76 100 76" stroke="var(--color-brand-green)" strokeWidth="2" />
                  {/* paintbrush */}
                  <line x1="135" y1="50" x2="160" y2="25" stroke="var(--color-brand-accent)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M160 25 L168 17 L172 21 L164 29 Z" fill="var(--color-brand-accent)" opacity="0.5" />
                  {/* stars/sparkles */}
                  <circle cx="50" cy="40" r="3" fill="var(--color-brand-accent)" opacity="0.4" />
                  <circle cx="155" cy="80" r="2.5" fill="var(--color-brand-accent)" opacity="0.3" />
                  <circle cx="40" cy="100" r="2" fill="var(--color-brand-green)" opacity="0.3" />
                  {/* easel legs */}
                  <line x1="60" y1="108" x2="45" y2="160" stroke="var(--color-brand-green)" strokeWidth="1.5" opacity="0.3" />
                  <line x1="140" y1="108" x2="155" y2="160" stroke="var(--color-brand-green)" strokeWidth="1.5" opacity="0.3" />
                </svg>

                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-4">
                  {stories.map((_, i) => (
                    <div
                      key={i}
                      className="h-1.5 rounded-full transition-all duration-500 ease-[var(--ease-spring)]"
                      style={{
                        width: i === activeIndex ? "2rem" : "0.5rem",
                        backgroundColor:
                          i <= activeIndex
                            ? "var(--color-brand-green)"
                            : "var(--color-brand-green)",
                        opacity: i <= activeIndex ? 1 : 0.2,
                      }}
                    />
                  ))}
                </div>

                <p className="text-xs font-sans font-semibold tracking-wider uppercase mb-2" style={{ color: stories[activeIndex].accent }}>
                  {stories[activeIndex].step}
                </p>
                <h3 className="text-xl md:text-2xl font-serif leading-snug transition-all duration-300">
                  {stories[activeIndex].heading}
                </h3>
              </div>
            </div>
          </div>

          {/* Scrolling right panel */}
          <div className="md:col-span-7 space-y-6">
            {stories.map((story, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="p-8 md:p-10 rounded-2xl border-2 transition-all duration-500 ease-[var(--ease-spring)]"
                style={{
                  borderColor:
                    i === activeIndex
                      ? "var(--color-brand-green)"
                      : "var(--color-brand-lightGreen)",
                  backgroundColor:
                    i === activeIndex
                      ? "var(--color-brand-lightGreen)"
                      : "transparent",
                  opacity: i === activeIndex ? 1 : 0.6,
                  transform: i === activeIndex ? "scale(1)" : "scale(0.98)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-sans font-bold text-white shrink-0"
                    style={{ backgroundColor: story.accent }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-xs font-sans font-semibold tracking-wider uppercase"
                    style={{ color: story.accent }}
                  >
                    {story.step}
                  </span>
                </div>
                <h4 className="text-xl font-serif mb-3">{story.heading}</h4>
                <p className="text-brand-dark/70 font-sans leading-relaxed">
                  {story.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
