"use client";

import { useState, useEffect } from "react";
import { Play, Square, Volume2 } from "lucide-react";

export default function TextToSpeech({ targetId }: { targetId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const handleEnd = () => setIsPlaying(false);
      window.speechSynthesis.addEventListener("end", handleEnd);

      return () => {
        window.speechSynthesis.removeEventListener("end", handleEnd);
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  const toggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const element = document.getElementById(targetId);
      if (!element) return;

      const text = element.innerText;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onend = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (
    !mounted ||
    typeof window === "undefined" ||
    !("speechSynthesis" in window)
  ) {
    return null;
  }

  return (
    <button
      onClick={toggleSpeech}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hitbox-expand ${
        isPlaying
          ? "bg-brand-accent text-white shadow-md animate-pulse"
          : "bg-brand-lightGreen text-brand-dark hover:bg-brand-green/20"
      }`}
      aria-label={isPlaying ? "Stop reading" : "Listen to this page"}
    >
      {isPlaying ? (
        <Square size={16} fill="currentColor" />
      ) : (
        <Play size={16} fill="currentColor" />
      )}
      <Volume2 size={16} />
      {isPlaying ? "Stop Listening" : "Listen to Page"}
    </button>
  );
}
