"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
};

export default function TextReveal({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
  stagger = 60,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (document.documentElement.classList.contains("low-stim")) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.3em" }}
        >
          <span
            className="inline-block transition-all ease-[var(--ease-smooth)]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(100%)",
              transitionDelay: `${delay + i * stagger}ms`,
              transitionDuration: "0.6s",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
