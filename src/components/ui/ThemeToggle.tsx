"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Theme = "system" | "light" | "dark";

const THEME_EVENT = "themechange";

const NEXT_THEME: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};

const LABEL: Record<Theme, string> = {
  system: "SYSTEM",
  light: "LIGHT",
  dark: "DARK",
};

const ICON: Record<Theme, typeof Monitor> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

function getStoredTheme(): Theme {
  const stored = window.localStorage.getItem("theme");
  return stored === "light" || stored === "dark" ? stored : "system";
}

// The server can't know localStorage, so it always renders "system" — the
// correct default for a fresh visitor anyway. useSyncExternalStore is the
// React-sanctioned way to reconcile that with a real client-only value
// without a hydration mismatch (unlike a lazy useState initializer, which
// would crash hydration the moment the stored value disagreed).
function getServerSnapshot(): Theme {
  return "system";
}

function subscribeTheme(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  if (theme === "system") {
    window.localStorage.removeItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.add(prefersDark ? "dark" : "light");
  } else {
    window.localStorage.setItem("theme", theme);
    root.classList.add(theme);
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getStoredTheme, getServerSnapshot);

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const next = NEXT_THEME[theme];
  const Icon = ICON[theme];

  return (
    <button
      type="button"
      onClick={() => applyTheme(next)}
      aria-label={`Theme: ${theme}. Switch to ${next}.`}
      className="flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-md border border-rule text-text-secondary transition-colors duration-150 hover:border-accent hover:bg-accent-wash sm:w-28"
    >
      <span key={theme} className="animate-[theme-icon-in_150ms_var(--ease-out)] text-accent">
        <Icon size={16} aria-hidden="true" />
      </span>
      <span className="hidden font-mono text-mono uppercase sm:inline">{LABEL[theme]}</span>
    </button>
  );
}
