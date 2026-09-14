"use client";

import { useSyncExternalStore } from "react";
import { themeStorageKey } from "@/lib/theme";

/**
 * Light and dark, switched from the masthead.
 *
 * The attribute on <html> is the single source of truth. The inline script
 * in the root layout sets it before first paint, so this control only reads
 * it and writes it; nothing here decides the starting theme. Both icons are
 * always rendered and the stylesheet shows the right one, so the server
 * markup matches whatever the script chose.
 */

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function isDark() {
  return document.documentElement.dataset.theme === "dark";
}

export function ThemeToggle() {
  /* Server snapshot is light; React swaps in the real value after hydrating. */
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  function toggle() {
    const next = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(themeStorageKey, next);
    } catch {
      /* Private windows can refuse storage. The switch still holds for the visit. */
    }
    listeners.forEach((listener) => listener());
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label="Dark mode"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-cream/70 transition-colors duration-300 hover:text-highlight"
    >
      {/* Sun, shown in light mode. */}
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
        className="h-5 w-5 dark:hidden"
      >
        <circle cx="10" cy="10" r="3.5" />
        <path d="M10 1.75v2M10 16.25v2M1.75 10h2M16.25 10h2M4.17 4.17l1.41 1.41M14.42 14.42l1.41 1.41M4.17 15.83l1.41-1.41M14.42 5.58l1.41-1.41" />
      </svg>
      {/* Moon, shown in dark mode. */}
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className="hidden h-5 w-5 dark:block"
      >
        <path d="M16.5 12.6A7 7 0 0 1 7.4 3.5a7 7 0 1 0 9.1 9.1Z" />
      </svg>
    </button>
  );
}
