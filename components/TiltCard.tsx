"use client";

import { useRef, useState, useCallback, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
};

export default function TiltCard({
  children,
  className = "",
  maxTilt = 5,
  glareOpacity = 0.12,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isLowStim, setIsLowStim] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setIsLowStim(document.documentElement.classList.contains("low-stim"));
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isLowStim) return;
      const card = cardRef.current;
      if (!card) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * maxTilt;
        const rotateX = ((centerY - y) / centerY) * maxTilt;

        setTransform(
          `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
        );

        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlare({ x: glareX, y: glareY, opacity: glareOpacity });
      });
    },
    [maxTilt, glareOpacity, isLowStim],
  );

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  if (isLowStim) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
          transition: "opacity 0.4s ease",
          opacity: glare.opacity > 0 ? 1 : 0,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
