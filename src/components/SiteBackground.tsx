import { useEffect, useRef } from "react";
import { getScrollRoot } from "@/lib/scrollRoot";

const BLUE = "#48A9F5";
const PURPLE = "#7152D2";

/**
 * Site-wide yin-yang background.
 *
 * A giant yin-yang symbol (blue + purple) sits behind every page and rotates
 * as the visitor scrolls — driven by the app's scroll root (#laya-scroll),
 * so it animates on every route, not just the window.
 */
const SiteBackground = () => {
  const symbolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const root = getScrollRoot();
      const el = symbolRef.current;
      if (!el) return;

      const top = root ? root.scrollTop : window.scrollY || 0;
      const max = root
        ? root.scrollHeight - root.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, top / max)) : 0;

      // One full turn across the whole page scroll.
      const rotation = progress * 360;
      el.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    update();

    const opts = { passive: true, capture: true } as const;
    // Capture-phase document listener: scroll events don't bubble, but the
    // capture phase reaches them on ANY scrolling element. This survives
    // route changes, where the scroll root (#laya-scroll) is remounted.
    document.addEventListener("scroll", onScroll, opts);
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.removeEventListener("scroll", onScroll, opts);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="laya-site-bg"
      style={{ backgroundColor: BLUE }}
    >
      {/* Oversized symbol so rotation never exposes an edge */}
      <div
        className="absolute left-1/2 top-1/2 h-[190vmin] w-[190vmin] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        ref={symbolRef}
      >
        <svg
          className="h-full w-full drop-shadow-[0_0_60px_rgba(0,0,0,0.18)]"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Yang — purple full disc */}
          <circle cx="50" cy="50" r="50" fill={PURPLE} />
          {/* Yin — blue half with S-curve */}
          <path
            d="M 50 0 A 50 50 0 0 1 50 100 A 25 25 0 0 1 50 50 A 25 25 0 0 0 50 0 Z"
            fill={BLUE}
          />
          {/* Opposing dots */}
          <circle cx="50" cy="25" r="9" fill={PURPLE} />
          <circle cx="50" cy="75" r="9" fill={BLUE} />
        </svg>
      </div>
    </div>
  );
};

export default SiteBackground;
