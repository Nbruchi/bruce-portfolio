"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Theme = "system" | "light" | "dark";

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
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem("theme");
  return stored === "light" || stored === "dark" ? stored : "system";
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
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const next = NEXT_THEME[theme];
  const Icon = ICON[theme];

  function handleClick() {
    applyTheme(next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Theme: ${theme}. Switch to ${next}.`}
      className="flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-md border border-rule text-text-secondary transition-colors duration-150 hover:border-accent hover:bg-accent-wash sm:w-28"
    >
      <span
        key={theme}
        suppressHydrationWarning
        className="animate-[theme-icon-in_150ms_var(--ease-out)] text-accent"
      >
        <Icon size={16} aria-hidden="true" />
      </span>
      <span suppressHydrationWarning className="hidden font-mono text-mono uppercase sm:inline">
        {LABEL[theme]}
      </span>
    </button>
  );
}
