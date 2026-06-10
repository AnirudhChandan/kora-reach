"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  { value: 98, suffix: "%", label: "Would Recommend" },
  { value: 48, suffix: "hr", label: "Average Response Time" },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  const isDecimal = target % 1 !== 0;

  useEffect(() => {
    if (!start) return;

    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (isDecimal) {
        setCount(Math.round(eased * target * 10) / 10);
      } else {
        setCount(Math.round(eased * target));
      }

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start, isDecimal]);

  return count;
}

function StatItem({ stat, start, delay }: { stat: Stat; start: boolean; delay: number }) {
  const [shouldStart, setShouldStart] = useState(false);
  const count = useCountUp(stat.value, 2000, shouldStart);

  useEffect(() => {
    if (!start) return;
    const timer = setTimeout(() => setShouldStart(true), delay);
    return () => clearTimeout(timer);
  }, [start, delay]);

  return (
    <div className="text-center">
      <div className="font-serif font-bold text-4xl md:text-5xl text-brand-green mb-2">
        {stat.value % 1 !== 0 ? count.toFixed(1) : count}
        <span className="text-brand-accent">{stat.suffix}</span>
      </div>
      <p className="font-sans text-brand-dark/50 text-sm tracking-wide">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-white border-y border-brand-lightGreen/50">
      <div className="container-custom">
        <div className="grid grid-cols-2 gap-8 md:gap-12 max-w-xl mx-auto">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} start={visible} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
