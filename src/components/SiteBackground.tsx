/**
 * SITE BACKGROUND
 * ---------------------------------------------------------------------------
 * Ambient, subtle atmospheric tints of blue and purple inspired by the LAYA
 * brand identity (dancing figure cyan/sky-blue + LAYA purple).
 *
 * Provides a luminous, cohesive, very subtle background wash throughout the
 * entire website, echoing the header masthead gradient.
 */
export const SiteBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none bg-[#faf9fd]"
    >
      {/* 1. Base Linear Ambient Gradient — matching the header masthead angle and palette */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(
            115deg,
            rgba(224, 242, 254, 0.70) 0%,
            rgba(240, 244, 255, 0.55) 30%,
            rgba(245, 243, 255, 0.55) 70%,
            rgba(237, 233, 254, 0.70) 100%
          )`,
        }}
      />

      {/* 2. Soft Atmospheric Radial Glow Orbs — subtle blue & purple diffusion */}
      {/* Top-Left: LAYA Sky Blue luminous pool */}
      <div
        className="absolute -top-32 -left-32 w-[720px] h-[720px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(89, 188, 232, 0.18) 0%, rgba(224, 242, 254, 0.08) 50%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Top-Right: LAYA Purple luminous pool */}
      <div
        className="absolute -top-32 -right-32 w-[760px] h-[760px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(118, 100, 181, 0.16) 0%, rgba(237, 233, 254, 0.08) 50%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />

      {/* Mid-Left: Gentle Cyan/Blue counterpoint */}
      <div
        className="absolute top-[40%] -left-40 w-[680px] h-[680px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(89, 188, 232, 0.13) 0%, rgba(224, 242, 254, 0.05) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Mid-Right: Gentle Violet/Purple wash */}
      <div
        className="absolute top-[55%] -right-40 w-[720px] h-[720px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(118, 100, 181, 0.14) 0%, rgba(237, 233, 254, 0.05) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Bottom Center: Blended Soft Horizon Wash */}
      <div
        className="absolute -bottom-40 left-[10%] right-[10%] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(89, 188, 232, 0.11) 0%, rgba(118, 100, 181, 0.11) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* 3. Subtle Yin-Yang Harmonic Geometric Watermarks (Balance & Nature) */}
      <div className="absolute -top-24 -right-24 sm:-top-36 sm:-right-36 w-[360px] h-[360px] sm:w-[540px] sm:h-[540px] opacity-[0.038]">
        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="96" fill="#8B79B8" />
          <path d="M 100 4 A 96 96 0 0 1 100 196 A 48 48 0 0 1 100 100 A 48 48 0 0 0 100 4 Z" fill="#55B1EB" />
          <circle cx="100" cy="52" r="16" fill="#8B79B8" />
          <circle cx="100" cy="148" r="16" fill="#55B1EB" />
        </svg>
      </div>

      <div className="absolute top-[48%] -left-28 sm:-left-44 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] opacity-[0.032] rotate-45">
        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="96" fill="#8B79B8" />
          <path d="M 100 4 A 96 96 0 0 1 100 196 A 48 48 0 0 1 100 100 A 48 48 0 0 0 100 4 Z" fill="#55B1EB" />
          <circle cx="100" cy="52" r="16" fill="#8B79B8" />
          <circle cx="100" cy="148" r="16" fill="#55B1EB" />
        </svg>
      </div>

      <div className="absolute -bottom-24 -right-24 sm:-bottom-36 sm:-right-36 w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] opacity-[0.035] -rotate-12">
        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="96" fill="#8B79B8" />
          <path d="M 100 4 A 96 96 0 0 1 100 196 A 48 48 0 0 1 100 100 A 48 48 0 0 0 100 4 Z" fill="#55B1EB" />
          <circle cx="100" cy="52" r="16" fill="#8B79B8" />
          <circle cx="100" cy="148" r="16" fill="#55B1EB" />
        </svg>
      </div>
    </div>
  );
};

export default SiteBackground;
