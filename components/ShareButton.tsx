"use client";

import { useState } from "react";
import { Share2, Check, Link2, Mail } from "lucide-react";
import { useToast } from "./Toast";

export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard", "success");
      setIsOpen(false);
    } catch {
      toast("Could not copy link", "error");
    }
  };

  const shareEmail = () => {
    const subject = encodeURIComponent(document.title);
    const body = encodeURIComponent(
      `I thought you might find this useful: ${window.location.href}`,
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
    setIsOpen(false);
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        setIsOpen(false);
      } catch {
        // user cancelled
      }
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => {
          if ("share" in navigator) {
            shareNative();
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-medium bg-brand-lightGreen text-brand-dark/70 hover:bg-brand-green/10 hover:text-brand-green transition-all hitbox-expand"
        aria-label="Share this page"
      >
        <Share2 size={14} />
        Share
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 bg-white rounded-xl border border-brand-lightGreen shadow-elevated-lg overflow-hidden z-50 min-w-[180px]"
          style={{ animation: "helpPanelIn 0.3s var(--ease-spring) forwards" }}
        >
          <button
            onClick={copyLink}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-sans text-brand-dark/70 hover:bg-brand-lightGreen/50 transition-colors text-left"
          >
            <Link2 size={14} /> Copy link
          </button>
          <button
            onClick={shareEmail}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-sans text-brand-dark/70 hover:bg-brand-lightGreen/50 transition-colors text-left border-t border-brand-lightGreen/50"
          >
            <Mail size={14} /> Email this page
          </button>
        </div>
      )}
    </div>
  );
}
