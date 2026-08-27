"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/site";

/**
 * The narrow-screen navigation: a menu button in the masthead and a
 * full-height ink panel behind it.
 *
 * The panel sets the section names in the display face at display size,
 * which is the one place on the site the headline voice is used for
 * navigation rather than for a heading. On a phone the menu is the whole
 * screen, so it may as well read like the cover of the thing.
 *
 * Everything a dialog owes the keyboard is here: focus moves in on open
 * and back to the button on close, Tab cycles inside the panel, Escape
 * closes it, and the page behind cannot be scrolled while it is up.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  /*
   * A tap on a section is a navigation, so the panel should be gone by the
   * time the new page paints. Keyed on the pathname rather than on the
   * click, so that browser back out of a section closes it too.
   *
   * Adjusted during render rather than in an effect: React re-runs this
   * component immediately with the corrected state, so the panel never
   * paints open on the new route.
   */
  const [routeAtOpen, setRouteAtOpen] = useState(pathname);
  if (routeAtOpen !== pathname) {
    setRouteAtOpen(pathname);
    setOpen(false);
  }

  /*
   * The panel is hidden from the large step up, where the sections sit in
   * the masthead instead. Widening the window past that point would
   * otherwise take the panel off screen while leaving the page behind it
   * locked, so the state follows the breakpoint.
   */
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 64rem)");
    const sync = () => {
      if (wide.matches) setOpen(false);
    };
    sync();
    /* Both signals: the media query is the precise one, and resize covers
       the environments where a programmatic viewport change does not
       dispatch a media-query event. */
    wide.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      wide.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    /* Captured now so the cleanup closes over the node rather than reading
       a ref that may have moved on by the time it runs. */
    const trigger = buttonRef.current;

    /* Hold the page still behind the panel. Compensating for the vanished
       scrollbar keeps the masthead from jumping sideways on desktop. */
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    const focusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );

    focusable()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center text-paper lg:hidden"
      >
        <span aria-hidden="true" className="relative block h-4 w-6">
          {/* Two rules that cross into a close mark. The bars are the only
              thing that moves, so the control reads as one object. */}
          <span
            className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300 ${
              open ? "top-[7px] rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300 ${
              open ? "top-[7px] -rotate-45" : "top-[14px]"
            }`}
          />
        </span>
      </button>

      {/*
        Kept in the tree at all times so the button's aria-controls always
        resolves; `hidden` takes it out of the accessibility tree and out
        of the tab order when closed.
      */}
      <div
        ref={panelRef}
        id="site-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-14 z-50 flex flex-col overflow-y-auto bg-ink px-5 pb-10 pt-6 sm:px-8 lg:hidden"
      >
        <nav aria-label="Sections">
          <ul className="flex flex-col">
            {navigation
              .filter((item) => item.href !== "/suggest")
              .map((item) => {
                const current = pathname === item.href;
                return (
                  <li key={item.href} className="border-b border-paper/15">
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={`headline block py-4 text-[2rem] transition-colors duration-300 sm:text-[2.5rem] ${
                        current ? "text-butter" : "text-paper hover:text-butter"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>

        <Link
          href="/suggest"
          className="eyebrow mt-8 self-start rounded-full bg-butter px-6 py-4 text-ink transition-colors duration-300 hover:bg-paper"
        >
          Suggest a resource
        </Link>

        <p className="mt-auto pt-10 text-sm leading-relaxed text-paper/60">
          Chosen by a person, never by an algorithm.
        </p>
      </div>
    </>
  );
}
