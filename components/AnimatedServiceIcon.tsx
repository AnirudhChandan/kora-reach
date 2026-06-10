"use client";

import { useEffect, useRef, useState } from "react";

type ServiceType =
  | "community"
  | "daily"
  | "capacity"
  | "transport"
  | "coordination";

const paths: Record<ServiceType, { viewBox: string; elements: { d: string; stroke?: boolean; fill?: boolean }[] }> = {
  community: {
    viewBox: "0 0 120 120",
    elements: [
      // center person
      { d: "M60 38 a8 8 0 1 0 0-16 a8 8 0 1 0 0 16", stroke: true },
      { d: "M60 40 c-12 0-18 10-18 22 h36 c0-12-6-22-18-22", stroke: true },
      // left person
      { d: "M28 48 a7 7 0 1 0 0-14 a7 7 0 1 0 0 14", stroke: true },
      { d: "M28 50 c-10 0-15 8-15 18 h30 c0-10-5-18-15-18", stroke: true },
      // right person
      { d: "M92 48 a7 7 0 1 0 0-14 a7 7 0 1 0 0 14", stroke: true },
      { d: "M92 50 c-10 0-15 8-15 18 h30 c0-10-5-18-15-18", stroke: true },
      // connection arcs
      { d: "M42 55 Q50 45 55 42", stroke: true },
      { d: "M78 55 Q70 45 65 42", stroke: true },
      // ground circle
      { d: "M20 85 Q60 100 100 85", stroke: true },
      // small dots for community
      { d: "M35 80 a2 2 0 1 0 0-4 a2 2 0 1 0 0 4", stroke: true },
      { d: "M60 88 a2 2 0 1 0 0-4 a2 2 0 1 0 0 4", stroke: true },
      { d: "M85 80 a2 2 0 1 0 0-4 a2 2 0 1 0 0 4", stroke: true },
    ],
  },
  daily: {
    viewBox: "0 0 120 120",
    elements: [
      // house outline
      { d: "M60 15 L15 55 H25 V100 H95 V55 H105 Z", stroke: true },
      // door
      { d: "M50 100 V72 H70 V100", stroke: true },
      // window left
      { d: "M32 62 H46 V78 H32 Z", stroke: true },
      { d: "M39 62 V78", stroke: true },
      { d: "M32 70 H46", stroke: true },
      // window right
      { d: "M74 62 H88 V78 H74 Z", stroke: true },
      { d: "M81 62 V78", stroke: true },
      { d: "M74 70 H88", stroke: true },
      // chimney
      { d: "M78 25 V42", stroke: true },
      { d: "M78 25 H88 V45", stroke: true },
      // heart above house
      { d: "M55 8 C55 2 63 2 63 8 C63 2 71 2 71 8 C71 16 63 20 63 20 C63 20 55 16 55 8", stroke: true },
    ],
  },
  capacity: {
    viewBox: "0 0 120 120",
    elements: [
      // pot
      { d: "M35 95 H85 L80 110 H40 Z", stroke: true },
      { d: "M35 95 H85", stroke: true },
      // stem
      { d: "M60 95 V50", stroke: true },
      // main branch left
      { d: "M60 70 C45 68 38 55 40 45", stroke: true },
      // leaf left
      { d: "M40 45 C35 35 42 28 50 32 C45 38 40 45 40 45", stroke: true },
      // main branch right
      { d: "M60 60 C75 58 82 45 80 35", stroke: true },
      // leaf right
      { d: "M80 35 C85 25 78 18 70 22 C75 28 80 35 80 35", stroke: true },
      // top sprout
      { d: "M60 50 C58 38 55 28 52 20", stroke: true },
      { d: "M52 20 C48 12 55 8 60 15 C56 18 52 20 52 20", stroke: true },
      // small leaf top right
      { d: "M60 50 C62 40 68 32 72 28", stroke: true },
      { d: "M72 28 C78 22 75 15 68 20 C70 24 72 28 72 28", stroke: true },
      // soil dots
      { d: "M45 93 a1.5 1.5 0 1 0 0-3 a1.5 1.5 0 1 0 0 3", stroke: true },
      { d: "M55 91 a1.5 1.5 0 1 0 0-3 a1.5 1.5 0 1 0 0 3", stroke: true },
      { d: "M65 93 a1.5 1.5 0 1 0 0-3 a1.5 1.5 0 1 0 0 3", stroke: true },
      { d: "M75 91 a1.5 1.5 0 1 0 0-3 a1.5 1.5 0 1 0 0 3", stroke: true },
    ],
  },
  transport: {
    viewBox: "0 0 120 120",
    elements: [
      // car body
      { d: "M20 72 H100 V90 H20 Z", stroke: true },
      // roof
      { d: "M35 72 L45 50 H80 L90 72", stroke: true },
      // windshield
      { d: "M47 70 L55 54 H75 L82 70", stroke: true },
      // divider in windshield
      { d: "M65 54 V70", stroke: true },
      // front wheel
      { d: "M38 90 a10 10 0 1 0 0-1", stroke: true },
      { d: "M38 85 a5 5 0 1 0 0-1", stroke: true },
      // rear wheel
      { d: "M82 90 a10 10 0 1 0 0-1", stroke: true },
      { d: "M82 85 a5 5 0 1 0 0-1", stroke: true },
      // road
      { d: "M5 100 H115", stroke: true },
      // dashes on road
      { d: "M20 106 H40", stroke: true },
      { d: "M55 106 H75", stroke: true },
      { d: "M90 106 H110", stroke: true },
      // headlight
      { d: "M100 78 H105 V86 H100", stroke: true },
      // speed lines
      { d: "M5 75 H15", stroke: true },
      { d: "M8 82 H18", stroke: true },
    ],
  },
  coordination: {
    viewBox: "0 0 120 120",
    elements: [
      // central hub
      { d: "M60 68 a10 10 0 1 0 0-20 a10 10 0 1 0 0 20", stroke: true },
      // checkmark inside hub
      { d: "M55 58 l3.5 3.5 l6 -7", stroke: true },
      // outer nodes
      { d: "M30 39 a6 6 0 1 0 0-12 a6 6 0 1 0 0 12", stroke: true },
      { d: "M90 39 a6 6 0 1 0 0-12 a6 6 0 1 0 0 12", stroke: true },
      { d: "M30 94 a6 6 0 1 0 0-12 a6 6 0 1 0 0 12", stroke: true },
      { d: "M90 94 a6 6 0 1 0 0-12 a6 6 0 1 0 0 12", stroke: true },
      // connecting spokes
      { d: "M53 52 L35 39", stroke: true },
      { d: "M67 52 L85 39", stroke: true },
      { d: "M53 64 L35 83", stroke: true },
      { d: "M67 64 L85 83", stroke: true },
    ],
  },
};

export default function AnimatedServiceIcon({
  type,
  className = "",
  size = 80,
}: {
  type: ServiceType;
  className?: string;
  size?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = svgRef.current;
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
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const service = paths[type];

  return (
    <svg
      ref={svgRef}
      viewBox={service.viewBox}
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {service.elements.map((el, i) => (
        <path
          key={i}
          d={el.d}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: isVisible ? 0 : 300,
            transition: `stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.08}s`,
            opacity: isVisible ? 1 : 0,
          }}
        />
      ))}
    </svg>
  );
}
