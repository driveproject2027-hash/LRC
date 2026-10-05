import { useEffect, useRef, useState } from "react";

/**
 * Animated counter that counts up from 0 to target when element scrolls into view.
 * Supports numbers with suffixes like "39+", "1,500+", "500,000+", "₹1.23 Cr".
 */
export function useCountUp(
  target: string,
  duration: number = 2000,
): { ref: React.RefObject<HTMLElement | null>; display: string } {
  const ref = useRef<HTMLElement | null>(null);
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    // Parse the target: extract numeric part and any prefix/suffix
    const match = target.match(/^([^\d]*?)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!match) {
      setDisplay(target);
      return;
    }

    const prefix = match[1]; // e.g. "₹"
    const numStr = match[2].replace(/,/g, ""); // e.g. "1500"
    const suffix = match[3]; // e.g. "+"
    const targetNum = parseFloat(numStr);
    const hasDecimals = numStr.includes(".");
    const decimalPlaces = hasDecimals ? numStr.split(".")[1].length : 0;

    // Format number with commas
    const formatNum = (n: number): string => {
      const fixed = hasDecimals ? n.toFixed(decimalPlaces) : Math.floor(n).toString();
      // Add commas to the integer part
      const parts = fixed.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            observer.disconnect();

            // Check for reduced motion
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
              setDisplay(`${prefix}${formatNum(targetNum)}${suffix}`);
              return;
            }

            const startTime = performance.now();
            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic for a satisfying deceleration
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = eased * targetNum;

              setDisplay(`${prefix}${formatNum(current)}${suffix}`);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, display };
}
