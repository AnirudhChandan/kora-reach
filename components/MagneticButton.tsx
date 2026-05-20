"use client";

import { useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
} & React.ComponentPropsWithoutRef<"div">;

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate(0, 0)");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    if (document.documentElement.classList.contains("low-stim")) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setTransform(`translate(${x * strength}px, ${y * strength}px)`);
  };

  const handleMouseLeave = () => {
    setTransform("translate(0, 0)");
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.4s var(--ease-spring)",
        display: "inline-block",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
