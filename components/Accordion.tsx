"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type AccordionItem = {
  question: string;
  answer: string;
};

type Props = {
  items: AccordionItem[];
};

export default function Accordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-2xl border border-brand-lightGreen bg-white overflow-hidden card-glow transition-all duration-300"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left group hitbox-expand"
              aria-expanded={isOpen}
            >
              <span className="font-serif font-bold text-lg md:text-xl text-brand-dark group-hover:text-brand-green transition-colors">
                {item.question}
              </span>
              <ChevronDown
                size={20}
                className="shrink-0 text-brand-dark/40 transition-transform duration-500 ease-[var(--ease-spring)]"
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            <div
              className="transition-all duration-500 ease-[var(--ease-spring)] overflow-hidden"
              style={{
                maxHeight: isOpen ? "300px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <p className="text-brand-dark/70 font-sans leading-relaxed text-lg">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
