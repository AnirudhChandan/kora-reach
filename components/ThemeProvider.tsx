"use client";

import { createContext, useContext, useEffect, useState } from "react";

type FontScale = "default" | "large" | "xl";

type ThemeContextType = {
  isLowStim: boolean;
  toggleLowStim: () => void;
  fontScale: FontScale;
  cycleFontScale: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isLowStim: false,
  toggleLowStim: () => {},
  fontScale: "default",
  cycleFontScale: () => {},
});

const scaleOrder: FontScale[] = ["default", "large", "xl"];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLowStim, setIsLowStim] = useState(false);
  const [fontScale, setFontScale] = useState<FontScale>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedStim = localStorage.getItem("low-stim");
    if (savedStim === "true") {
      setIsLowStim(true);
      document.documentElement.classList.add("low-stim");
    }
    const savedScale = localStorage.getItem("font-scale") as FontScale | null;
    if (savedScale && scaleOrder.includes(savedScale)) {
      setFontScale(savedScale);
      document.documentElement.classList.add(`font-scale-${savedScale}`);
    }
  }, []);

  const toggleLowStim = () => {
    setIsLowStim((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("low-stim");
        localStorage.setItem("low-stim", "true");
      } else {
        document.documentElement.classList.remove("low-stim");
        localStorage.setItem("low-stim", "false");
      }
      return next;
    });
  };

  const cycleFontScale = () => {
    setFontScale((prev) => {
      const currentIdx = scaleOrder.indexOf(prev);
      const nextIdx = (currentIdx + 1) % scaleOrder.length;
      const next = scaleOrder[nextIdx];

      document.documentElement.classList.remove(`font-scale-${prev}`);
      document.documentElement.classList.add(`font-scale-${next}`);
      localStorage.setItem("font-scale", next);

      return next;
    });
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{ isLowStim, toggleLowStim, fontScale, cycleFontScale }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
