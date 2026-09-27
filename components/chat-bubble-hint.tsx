"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "boxa-chat-hint-dismissed";

/**
 * A small speech-bubble callout that appears above the Chat BOXA button
 * after a short delay, nudging people toward using it — "Tanyakan
 * sesuatu atau request mainan!" rather than leaving them to guess what
 * the button is for. Dismissible, and stays dismissed (localStorage) so
 * it doesn't nag on every visit once someone's closed it.
 */
export function ChatBubbleHint({ align = "center" }: { align?: "center" | "right" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "1");
  }

  if (!visible) return null;

  const position =
    align === "right"
      ? "-top-2 right-0 -translate-y-full"
      : "-top-2 left-1/2 -translate-x-1/2 -translate-y-full";
  const tailPosition = align === "right" ? "right-3" : "left-1/2 -translate-x-1/2";

  return (
    <div className={`absolute z-10 w-44 rounded-2xl bg-ink px-3 py-2 text-xs text-cream shadow-lg ${position}`}>
      <button
        onClick={dismiss}
        aria-label="Tutup"
        className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-cream shadow"
      >
        <X size={11} />
      </button>
      Tanyakan sesuatu atau request mainan!
      <span className={`absolute top-full border-8 border-transparent border-t-ink ${tailPosition}`} />
    </div>
  );
}
