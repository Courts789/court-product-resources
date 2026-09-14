"use client";

import { useEffect, useRef } from "react";

/**
 * The job titles people get squeezed into. They drift apart as you scroll
 * past, which is the whole argument of the page in one gesture.
 */
const titles = [
  { label: "Product Manager", top: "14%", left: "58%", speed: -0.45, tilt: -4, wide: false },
  { label: "PMM", top: "30%", left: "84%", speed: -0.8, tilt: 6, wide: false },
  { label: "Product Designer", top: "62%", left: "70%", speed: -0.3, tilt: 3, wide: false },
  { label: "Business Analyst", top: "80%", left: "52%", speed: -0.65, tilt: -6, wide: true },
  { label: "AI PM", top: "46%", left: "92%", speed: -1.05, tilt: -2, wide: true },
  { label: "Growth PM", top: "8%", left: "86%", speed: -0.2, tilt: 5, wide: true },
] as const;

const walkthrough = [
  {
    number: "01",
    title: "Five questions",
    body: "About your real work, not an invented scenario. What you do, how you got here, and what you want more of.",
    stock: "var(--color-sage)",
  },
  {
    number: "02",
    title: "Your strengths name your type",
    body: "Pick the three you could give an example of. The pattern across them says what kind of product person you are.",
    stock: "var(--color-butter)",
  },
  {
    number: "03",
    title: "A pitch in thirty seconds",
    body: "Something you can say in an interview, a development plan, or at a barbecue. Then change the words until it sounds like you.",
    stock: "var(--color-blush)",
  },
] as const;

/**
 * Writes how far the section has scrolled into a CSS variable, once per
 * frame. Children read it in their own transforms, so scrolling never
 * re-renders React.
 */
function useScrollVar(
  ref: React.RefObject<HTMLElement | null>,
  /* "top": pixels scrolled past the top. "centre": signed distance from
     the middle of the viewport, zero when the element sits dead centre. */
  anchor: "top" | "centre" = "top",
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const offset =
        anchor === "top"
          ? Math.max(0, -rect.top)
          : rect.top + rect.height / 2 - window.innerHeight / 2;
      element.style.setProperty("--scroll", `${Math.round(offset)}`);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref, anchor]);
}

/** Marks the element with data-shown the first time it comes into view. */
function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-shown", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );

    for (const child of element.querySelectorAll("[data-reveal]")) {
      observer.observe(child);
    }
    return () => observer.disconnect();
  }, [ref]);
}

/** A section-stock plate whose numeral slides against it as you scroll. */
function Plate({ number, stock }: { number: string; stock: string }) {
  const plate = useRef<HTMLDivElement>(null);
  useScrollVar(plate, "centre");

  return (
    <div
      ref={plate}
      style={{ backgroundColor: stock }}
      className="reveal relative grid aspect-[5/3] max-w-full place-items-center overflow-hidden rounded-card"
    >
      <span
        aria-hidden="true"
        style={{
          transform:
            "translate3d(0, calc(clamp(-300, var(--scroll, 0), 300) * 0.14px), 0)",
        }}
        className="numeral block text-[clamp(5rem,4rem+6vw,9rem)] leading-none text-ink/80 will-change-transform"
      >
        {number}
      </span>
    </div>
  );
}

export function PitchIntro() {
  const hero = useRef<HTMLElement>(null);
  const steps = useRef<HTMLElement>(null);

  useScrollVar(hero);
  useReveal(steps);

  return (
    <>
      <section
        ref={hero}
        aria-labelledby="pitch-title"
        className="relative overflow-hidden bg-sky"
      >
        {/* Decorative: the titles drift off at different speeds. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {titles.map((title) => (
            <span
              key={title.label}
              style={{
                top: title.top,
                left: title.left,
                transform: `translate3d(-50%, calc(var(--scroll, 0) * ${title.speed}px), 0) rotate(${title.tilt}deg)`,
              }}
              className={`headline absolute whitespace-nowrap border border-rule-strong bg-paper px-4 py-2.5 text-lg text-ink-muted will-change-transform ${
                title.wide ? "hidden xl:block" : "hidden lg:block"
              }`}
            >
              {title.label}
            </span>
          ))}
        </div>

        <div
          style={{
            transform: "translate3d(0, calc(var(--scroll, 0) * 0.25px), 0)",
            opacity: "calc(1 - var(--scroll, 0) / 1100)",
          }}
          className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-[84rem] flex-col justify-center px-5 py-20 sm:px-8 lg:px-12"
        >
          <p className="eyebrow rise text-slate">Your Pitch</p>
          <h1
            id="pitch-title"
            style={{ "--delay": "80ms" } as React.CSSProperties}
            className="rise mt-6 max-w-[14ch] text-[length:var(--text-display)] text-ink"
          >
            Stop explaining yourself in someone else&rsquo;s bucket.
          </h1>
          <p
            style={{ "--delay": "180ms" } as React.CSSProperties}
            className="rise mt-8 max-w-[40ch] text-[length:var(--text-lede)] leading-[1.5] text-ink-soft"
          >
            Product roles are splitting faster than the titles can keep up.
            So write your own instead.
          </p>
          <div
            style={{ "--delay": "280ms" } as React.CSSProperties}
            className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <a
              href="#quiz"
              className="eyebrow rounded-full bg-forest px-7 py-4 text-cream transition-colors duration-300 hover:bg-night"
            >
              Start the quiz
            </a>
            <a href="#how" className="eyebrow rule-link text-ink-muted">
              How it works
            </a>
          </div>
        </div>
      </section>

      <section
        ref={steps}
        id="how"
        aria-labelledby="how-title"
        className="relative overflow-hidden border-b border-rule"
      >
        <div className="mx-auto max-w-[84rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div data-reveal>
            <p className="eyebrow reveal text-pine">How it works</p>
            <h2
              id="how-title"
              className="reveal mt-5 max-w-[16ch] text-[length:var(--text-section)] text-ink"
            >
              Three minutes, one pitch.
            </h2>
          </div>

          <ol className="mt-14">
            {walkthrough.map((item, index) => (
              <li
                key={item.number}
                data-reveal
                className="grid items-center gap-6 border-t border-rule py-10 sm:grid-cols-12 sm:gap-10 sm:py-14"
              >
                <div className="sm:col-span-4">
                  <Plate number={item.number} stock={item.stock} />
                </div>
                <div
                  style={{ "--delay": "120ms" } as React.CSSProperties}
                  className="reveal sm:col-span-7 sm:col-start-6"
                >
                  <h3 className="text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] text-ink">
                    <span className="sr-only">Step {index + 1}: </span>
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-[length:var(--text-lede)] leading-[1.5] text-ink-soft">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p
            data-reveal
            className="border-t border-rule pt-8 text-sm leading-relaxed text-ink-muted"
          >
            <span className="reveal block max-w-[60ch]">
              It borrows Penny Locaso&rsquo;s brag-a-log idea, because nobody
              describes their own value well from memory.
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
