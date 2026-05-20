"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { Menu, X, Eye, EyeOff } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "NDIS Information", href: "/ndis-info" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLowStim, toggleLowStim, fontScale, cycleFontScale } = useTheme();

  const fontLabel = fontScale === "default" ? "A" : fontScale === "large" ? "A+" : "A++";
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      setScrolled(currentY > 20);

      if (currentY < 80) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true);
        setIsOpen(false);
      } else if (delta < -5) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="border-b sticky top-0 z-50 transition-all duration-500 ease-[var(--ease-spring)]"
      style={{
        backgroundColor: "var(--bg-color)",
        borderColor: "var(--border-light)",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        boxShadow: scrolled
          ? "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)"
          : "none",
      }}
    >
      <div className="container-custom py-4 flex justify-between items-center">
        <Link
          href="/"
          className="relative block hitbox-expand shrink-0"
        >
          <Image
            src="/logo-full.png"
            alt="Kora Reach Support Services"
            width={180}
            height={60}
            className="h-10 md:h-12 w-auto transition-opacity duration-300"
            style={{
              filter: isLowStim ? "brightness(0) invert(1)" : "none",
            }}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition-colors font-medium hover:opacity-70 hitbox-expand"
              style={{ color: "var(--text-color)" }}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={cycleFontScale}
            className="px-3 py-2 rounded-full text-sm font-bold border transition-colors hover:opacity-80 hitbox-expand"
            style={{
              borderColor: "var(--border-light)",
              color: "var(--text-color)",
              backgroundColor: "var(--bg-light)",
              minWidth: "2.5rem",
            }}
            aria-label={`Font size: ${fontScale}. Click to increase.`}
            title="Change font size"
          >
            {fontLabel}
          </button>
          <button
            onClick={toggleLowStim}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors hover:opacity-80 hitbox-expand"
            style={{
              borderColor: "var(--border-light)",
              color: "var(--text-color)",
              backgroundColor: "var(--bg-light)",
            }}
            aria-label="Toggle Low Stimulation Mode"
          >
            {isLowStim ? <EyeOff size={16} /> : <Eye size={16} />}
            {isLowStim ? "Low Stim: On" : "Low Stim: Off"}
          </button>
        </div>

        <button
          className="md:hidden hitbox-expand"
          style={{ color: "var(--text-color)" }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className="md:hidden border-t overflow-hidden transition-all duration-500 ease-[var(--ease-spring)]"
        style={{
          maxHeight: isOpen ? "400px" : "0px",
          opacity: isOpen ? 1 : 0,
          backgroundColor: "var(--bg-color)",
          borderColor: isOpen ? "var(--border-light)" : "transparent",
        }}
      >
        <div className="p-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-lg font-medium hitbox-expand"
              style={{ color: "var(--text-color)" }}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleLowStim();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-3 rounded-xl text-lg font-medium border mt-4 hitbox-expand"
            style={{
              borderColor: "var(--border-light)",
              color: "var(--text-color)",
              backgroundColor: "var(--bg-light)",
            }}
          >
            {isLowStim ? <EyeOff size={20} /> : <Eye size={20} />}
            {isLowStim ? "Low Stim Mode: On" : "Low Stim Mode: Off"}
          </button>
        </div>
      </div>
    </nav>
  );
}
