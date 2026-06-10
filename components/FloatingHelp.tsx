"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function FloatingHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { isLowStim } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  if (!mounted || isLowStim) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={panelRef}>
      {isOpen && (
        <div
          className="absolute bottom-16 right-0 w-[320px] bg-white rounded-2xl border border-brand-lightGreen overflow-hidden"
          style={{
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.1)",
            animation: "helpPanelIn 0.4s var(--ease-spring) forwards",
          }}
        >
          <div className="bg-brand-green px-6 py-5">
            <h3 className="text-white text-lg font-serif font-bold">
              Need Help?
            </h3>
            <p className="text-white/70 text-sm font-sans mt-1">
              Reach us however suits you best.
            </p>
          </div>

          <div className="p-4 space-y-2">
            <a
              href="tel:0439821300"
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-brand-lightGreen/50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-brand-lightGreen flex items-center justify-center shrink-0">
                <Phone size={18} className="text-brand-green" />
              </div>
              <div>
                <p className="font-sans font-semibold text-brand-dark text-sm">
                  Call Us
                </p>
                <p className="font-sans text-brand-dark/50 text-xs">
                  0439 821 300
                </p>
              </div>
            </a>

            <a
              href="mailto:info@korareach.com.au"
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-brand-lightGreen/50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-brand-lightGreen flex items-center justify-center shrink-0">
                <Mail size={18} className="text-brand-green" />
              </div>
              <div>
                <p className="font-sans font-semibold text-brand-dark text-sm">
                  Email Us
                </p>
                <p className="font-sans text-brand-dark/50 text-xs">
                  info@korareach.com.au
                </p>
              </div>
            </a>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between gap-4 p-4 rounded-xl bg-brand-lightGreen hover:bg-brand-green/10 transition-colors group"
            >
              <div>
                <p className="font-sans font-semibold text-brand-green text-sm">
                  Intake Form
                </p>
                <p className="font-sans text-brand-dark/50 text-xs">
                  We respond within 24 hours
                </p>
              </div>
              <ArrowRight
                size={16}
                className="text-brand-green group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-brand-green text-white flex items-center justify-center transition-all duration-500 ease-[var(--ease-spring)] hover:scale-105"
        style={{
          boxShadow: "0 4px 12px rgba(27, 59, 111, 0.3), 0 8px 24px rgba(27, 59, 111, 0.15)",
        }}
        aria-label={isOpen ? "Close help panel" : "Open help panel"}
      >
        <div
          className="transition-transform duration-300 ease-[var(--ease-spring)]"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        </div>
      </button>
    </div>
  );
}
