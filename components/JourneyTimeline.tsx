"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneCall, UserCheck, HeartHandshake } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    step: "01",
    title: "The First Chat",
    desc: "Submit our simple intake form or call us. We will review your goals and current funding to ensure we are the right fit.",
    icon: <PhoneCall size={24} className="text-brand-green" />,
  },
  {
    step: "02",
    title: "Meet & Greet",
    desc: "We arrange a free, no-obligation meeting (in-person or online) to introduce you to a potential support worker.",
    icon: <UserCheck size={24} className="text-brand-green" />,
  },
  {
    step: "03",
    title: "Start Support",
    desc: "Once you are comfortable, we sign a simple service agreement and begin your tailored support plan.",
    icon: <HeartHandshake size={24} className="text-brand-green" />,
  },
];

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeNodes, setActiveNodes] = useState<boolean[]>([false, false, false]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (document.documentElement.classList.contains("low-stim")) {
      setLineHeight(100);
      setActiveNodes([true, true, true]);
      return;
    }

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const scrollIntoSection = viewportHeight - sectionTop;
      const totalTravel = sectionHeight + viewportHeight * 0.3;
      const progress = Math.min(Math.max(scrollIntoSection / totalTravel, 0), 1);

      setLineHeight(progress * 100);

      const newActive = nodeRefs.current.map((node) => {
        if (!node) return false;
        const nodeRect = node.getBoundingClientRect();
        return nodeRect.top < viewportHeight * 0.65;
      });
      setActiveNodes(newActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="max-w-5xl mx-auto relative">
      <div className="hidden md:block absolute left-[50%] top-10 bottom-10 w-0.5 -translate-x-1/2">
        <div className="absolute inset-0 bg-brand-lightGreen" />
        <div
          className="absolute top-0 left-0 w-full bg-brand-green transition-[height] duration-100 ease-out rounded-full"
          style={{ height: `${lineHeight}%` }}
        />
      </div>

      <div className="space-y-16">
        {steps.map((item, index) => (
          <ScrollReveal
            key={item.step}
            delay={index * 150}
            direction={index % 2 === 0 ? "left" : "right"}
          >
            <div
              className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="md:w-1/2 flex justify-center md:justify-end">
                <div
                  className={`w-full max-w-md p-10 rounded-3xl bg-white border border-brand-lightGreen card-glow card-hover ${index % 2 !== 0 ? "md:text-left" : "md:text-right"}`}
                >
                  <span className="text-sm font-bold tracking-widest text-brand-accent uppercase mb-2 block font-sans">
                    Step {item.step}
                  </span>
                  <h3 className="mb-4">{item.title}</h3>
                  <p className="text-brand-dark/70 font-sans leading-relaxed text-lg">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div
                ref={(el) => { nodeRefs.current[index] = el; }}
                className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-white border-[6px] z-10 hidden md:flex transition-all duration-500 ease-[var(--ease-spring)]"
                style={{
                  borderColor: activeNodes[index]
                    ? "var(--color-brand-green)"
                    : "var(--color-brand-warmNeutral)",
                  transform: `translateX(-50%) scale(${activeNodes[index] ? 1.1 : 1})`,
                  boxShadow: activeNodes[index]
                    ? "0 0 0 6px rgba(27, 59, 111, 0.1)"
                    : "0 4px 6px rgba(0,0,0,0.07)",
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center transition-colors duration-500"
                  style={{
                    backgroundColor: activeNodes[index]
                      ? "var(--color-brand-lightGreen)"
                      : "#f9fafb",
                  }}
                >
                  {item.icon}
                </div>
              </div>

              <div className="md:w-1/2"></div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
