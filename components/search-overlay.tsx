"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

const POPULAR_CATEGORIES = ["Blokees", "Licensed Toys", "Blind Box", "Rare Finds"];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function submit(q: string) {
    if (!q.trim()) return;
    onClose();
    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-site-bg/97 backdrop-blur-md"
        >
          <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6">
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="absolute right-6 top-6 text-site-text-muted hover:text-site-text"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.25 }}
              className="flex items-center gap-3 border-b border-site-border-strong pb-4"
            >
              <Search size={22} className="text-flame" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit(query)}
                placeholder="Search BOXA..."
                className="w-full bg-transparent font-display text-2xl font-semibold text-site-text outline-none placeholder:text-site-text-faint"
              />
            </motion.div>

            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-site-text-faint">
                Kategori Populer
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {POPULAR_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => submit(c)}
                    className="rounded-full border border-site-border px-4 py-1.5 text-sm text-site-text-muted transition-colors hover:border-flame hover:text-flame"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
