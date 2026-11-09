import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import { mockTestimonials } from "@/services/api";
import { useWebsiteContent } from "@/context/ContentContext";

/**
 * TESTIMONIALS STRIP
 * ---------------------------------------------------------------------------
 * Slim, elegant horizontal quote strip directly below the main navigation
 * and above the homepage hero.
 *
 * Real-time edits in CMS (home.voices) are immediately reflected here.
 */
export const TestimonialsStrip = () => {
  const { content } = useWebsiteContent();
  const rawItems = content.home?.voices?.items;
  const items = rawItems && rawItems.length > 0 ? rawItems : mockTestimonials;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = items.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsPaused(true);
    }
  }, []);

  // Auto-advance slowly (every 8.5 seconds) unless paused
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 8500);

    return () => clearInterval(interval);
  }, [isPaused, total, handleNext]);

  const activeTestimonial = items[currentIndex % total] || items[0];

  if (!activeTestimonial) return null;

  return (
    <aside
      aria-label="Partner Reflections"
      className="bg-white/60 backdrop-blur-sm border-b border-[#E7E4E9] text-[#24232A] relative z-20 py-2 sm:py-2.5 transition-colors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row: Editorial Section Label & Accessible Controls */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 mb-2 pb-1.5 border-b border-[#E7E4E9]/80">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#6B57A5] font-sans select-none">
              <Quote className="w-3.5 h-3.5 text-[#59BCE8]" aria-hidden="true" />
              Community &amp; Partner Reflections
            </span>
          </div>

          {/* Accessible Carousel Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-neutral-600 bg-white px-2.5 py-1 border border-[#E7E4E9] shrink-0">
            <span className="text-[11px] font-mono text-neutral-600 tabular-nums font-semibold mr-1">
              {currentIndex + 1} <span className="text-neutral-400">/</span> {total}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous reflection"
                className="p-1 hover:bg-[#F0ECF8] text-neutral-700 hover:text-[#6B57A5] transition-colors focus:outline-none focus:ring-1 focus:ring-[#6B57A5]"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                aria-label={isPaused ? "Resume reflection rotation" : "Pause reflection rotation"}
                className="p-1 hover:bg-[#F0ECF8] text-neutral-700 hover:text-[#6B57A5] transition-colors focus:outline-none focus:ring-1 focus:ring-[#6B57A5]"
              >
                {isPaused ? (
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6B57A5]" aria-hidden="true" />
                ) : (
                  <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-600" aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next reflection"
                className="p-1 hover:bg-[#F0ECF8] text-neutral-700 hover:text-[#6B57A5] transition-colors focus:outline-none focus:ring-1 focus:ring-[#6B57A5]"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Quote Content and Attribution */}
        <div
          key={currentIndex}
          className="min-w-0 animate-testimonial-text motion-reduce:animate-none"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Full Line Quote Body */}
          <blockquote className="m-0 p-0">
            <p className="text-sm sm:text-base md:text-[16px] leading-relaxed font-serif text-[#24232A]">
              <span className="text-[#6B57A5] font-sans font-bold text-base sm:text-lg select-none mr-1">&ldquo;</span>
              {activeTestimonial.quote}
              <span className="text-[#6B57A5] font-sans font-bold text-base sm:text-lg select-none ml-0.5">&rdquo;</span>
            </p>
          </blockquote>

          {/* Attribution: Author & Role */}
          <div className="mt-1.5 flex items-center flex-wrap gap-x-2.5 gap-y-0.5 text-xs sm:text-sm font-sans text-neutral-700">
            <span className="text-[#6B57A5] font-bold select-none">—</span>
            <strong className="font-bold text-[#24232A] tracking-tight">
              {activeTestimonial.name || (activeTestimonial as any).attribution}
            </strong>
            {activeTestimonial.role && (
              <span className="text-neutral-500 font-medium text-xs sm:text-[13px]">
                ({activeTestimonial.role})
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default TestimonialsStrip;
