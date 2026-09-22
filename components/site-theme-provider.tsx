"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const STORAGE_KEY = "boxa-theme";

/**
 * Wraps the public (site) layout only — the `dark` class this applies
 * lives on this wrapper <div>, not on <html>, so it can never bleed into
 * /admin (a completely separate layout tree that never renders this
 * provider). That's a deliberate choice: the dashboard should always
 * look the same regardless of what a shopper picked on the storefront.
 */
export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  // Always starts "light" so server and client render the same markup on
  // first paint (no hydration mismatch) — the real preference is applied
  // right after mount, which can cause one brief flash but keeps things
  // simple and safe.
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* bg-cream/text-ink here (not just the `dark` class) is the fix —
          without its own background, sections that don't set one of their
          own were falling through to <body>, which always stays light
          since it reads the un-scoped root token, not this wrapper's
          dark-scoped override. */}
      <div className={`site-root ${theme} min-h-screen bg-cream text-ink`}>{children}</div>
    </ThemeContext.Provider>
  );
}
