import { useEffect } from "react";

/**
 * Adds `.is-visible` to every `.reveal` element as it scrolls into view.
 *
 * One observer for the whole page rather than a Framer Motion `motion.div` per
 * section — the homepage has ~30 reveal targets and per-element observers were
 * the main source of scroll jank in the previous implementation.
 *
 * Respects `prefers-reduced-motion`: the `.reveal` rule is already neutralised
 * in that case by `src/index.css`, so this simply marks everything visible.
 */
export const useRevealOnScroll = () => {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (nodes.length === 0) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
};

export default useRevealOnScroll;
