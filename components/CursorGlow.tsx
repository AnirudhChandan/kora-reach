"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (document.documentElement.classList.contains("low-stim")) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
        glowRef.current.style.opacity = "1";
      }
    };

    const handleLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[1] opacity-0"
      style={{
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(27, 59, 111, 0.04) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.3s ease",
      }}
      aria-hidden="true"
    />
  );
}
