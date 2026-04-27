"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const initial: Theme = saved === "dark" || saved === "light" ? saved : "light";
    document.documentElement.classList.toggle("dark", initial === "dark");
    setTheme(initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-slate/15 bg-white/80 px-1.5 py-1 text-[11px] font-semibold tracking-wide backdrop-blur transition-colors dark:border-slate/20 dark:bg-[#202739]/80"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
    >
      <span
        className={`rounded-full px-2 py-0.5 transition-all duration-200 ${
          !isDark
            ? "bg-brass text-white shadow-sm"
            : "text-slate"
        }`}
      >
        Light
      </span>
      <span
        className={`rounded-full px-2 py-0.5 transition-all duration-200 ${
          isDark
            ? "bg-brass text-white shadow-sm"
            : "text-slate"
        }`}
      >
        Dark
      </span>
    </button>
  );
}
