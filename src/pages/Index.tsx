import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Check, ChevronLeft, ChevronRight, ExternalLink, Pause, Play } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { EditorialLink, SectionHeader } from "@/components/home/EditorialLink";
import { TestimonialsStrip } from "@/components/home/TestimonialsStrip";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import { useWebsiteContent } from "@/context/ContentContext";
import { useDirectEdit } from "@/context/DirectEditContext";
import EditableText from "@/components/admin/EditableText";
import EditableImage from "@/components/admin/EditableImage";
import {
  PROGRAMME_ROUTES,
  chronicle as defaultChronicle,
  fourDecades as defaultFourDecades,
  hero as defaultHero,
  impact as defaultImpact,
  ourWork as defaultOurWork,
  stories as defaultStories,
  support as defaultSupport,
  voices as defaultVoices,
} from "@/content/home";

/**
 * LAYA HOMEPAGE
 * ---------------------------------------------------------------------------
 * Editorial, documentary composition built on the Phase 1 design system and
 * Phase 2 header.
 *
 * Content is reactive from the centralized content store (with fallback to
 * src/content/home.ts defaults). Real-time edits in /admin are immediately
 * rendered here.
 *
 * Photography: real LAYA field photographs only, chosen from `src/assets`.
 * Restored 3-image carousel features authentic photographs of paddy transplantation,
 * sustainable agriculture, and community youth leadership.
 */
const Index = () => {
  useRevealOnScroll();
  const { content } = useWebsiteContent();

  const rawHero = content.home.hero || defaultHero;
  const heroSlidesList = rawHero.slides && rawHero.slides.length > 0 ? rawHero.slides : defaultHero.slides;
  const hero = {
    ...rawHero,
    figures: rawHero.figures && rawHero.figures.length > 0 ? rawHero.figures : defaultHero.figures,
    slides: heroSlidesList.map((s, idx) => {
      const fallbackSlide = defaultHero.slides[idx % defaultHero.slides.length] || defaultHero.slides[0];
      const isCustomSlideHeadline = s.headline && s.headline !== fallbackSlide?.headline;
      const effectiveHeadline = isCustomSlideHeadline
        ? s.headline
        : rawHero.headline && rawHero.headline !== defaultHero.headline
        ? rawHero.headline
        : s.headline || rawHero.headline || fallbackSlide?.headline;

      const isCustomSlideEyebrow = s.eyebrow && s.eyebrow !== fallbackSlide?.eyebrow;
      const effectiveEyebrow = isCustomSlideEyebrow
        ? s.eyebrow
        : rawHero.eyebrow && rawHero.eyebrow !== defaultHero.eyebrow
        ? rawHero.eyebrow
        : s.eyebrow || rawHero.eyebrow || fallbackSlide?.eyebrow;

      const isCustomSupporting = s.supporting && s.supporting !== fallbackSlide?.supporting;
      const effectiveSupporting = isCustomSupporting
        ? s.supporting
        : rawHero.supporting && rawHero.supporting !== defaultHero.supporting
        ? rawHero.supporting
        : s.supporting || rawHero.supporting || fallbackSlide?.supporting;

      return {
        ...fallbackSlide,
        ...s,
        eyebrow: effectiveEyebrow,
        headline: effectiveHeadline,
        supporting: effectiveSupporting,
        image: s.image || fallbackSlide?.image,
        primaryCta: s.primaryCta || (idx === 0 && rawHero.primaryCta ? rawHero.primaryCta : fallbackSlide?.primaryCta),
        secondaryCta: s.secondaryCta || (idx === 0 && rawHero.secondaryCta ? rawHero.secondaryCta : fallbackSlide?.secondaryCta),
      };
    }),
  };
  const rawChronicle = content.home.chronicle || defaultChronicle;
  const chronicle = {
    ...defaultChronicle,
    ...rawChronicle,
    cta: rawChronicle.cta || defaultChronicle.cta,
    documents: defaultChronicle.documents,
  };
  const rawFourDecades = content.home.fourDecades || defaultFourDecades;
  const fourDecades = {
    ...defaultFourDecades,
    ...rawFourDecades,
    heading: rawFourDecades.title || rawFourDecades.heading || defaultFourDecades.heading,
    cta: rawFourDecades.cta || defaultFourDecades.cta,
    image: rawFourDecades.image || defaultFourDecades.image,
    paragraphs: rawFourDecades.paragraphs || defaultFourDecades.paragraphs,
    principles: rawFourDecades.principles || defaultFourDecades.principles,
  };
  const ourWork = {
    ...defaultOurWork,
    ...content.home.ourWork,
    programmes: defaultOurWork.programmes,
  };
  const stories = {
    ...defaultStories,
    ...content.home.stories,
    items: defaultStories.items,
  };
  const impact = { ...defaultImpact, ...content.home.impact };
  const rawSupport = content.home.support || defaultSupport;
  const support = {
    ...defaultSupport,
    ...rawSupport,
    heading: rawSupport.heading || rawSupport.title || defaultSupport.heading,
    body: rawSupport.body || rawSupport.lead || rawSupport.intro || defaultSupport.body,
    primaryCta: rawSupport.primaryCta || defaultSupport.primaryCta,
    secondaryCta: rawSupport.secondaryCta || defaultSupport.secondaryCta,
    assurances:
      rawSupport.assurances && rawSupport.assurances.length > 0
        ? rawSupport.assurances
        : defaultSupport.assurances,
  };
  const voices = { ...defaultVoices, ...content.home.voices };

  const allProgs = ourWork.programmes && ourWork.programmes.length > 0 ? ourWork.programmes : defaultOurWork.programmes;
  const featureProgramme = allProgs[0];
  const railProgrammes = allProgs.slice(1);

  const allStories = stories.items && stories.items.length > 0 ? stories.items : defaultStories.items;
  const leadStory = allStories[0];
  const otherStories = allStories.slice(1);

  // Hero Carousel State
  const { isDirectEdit, selectedHeroSlide, setSelectedHeroSlide } = useDirectEdit();
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const totalHeroSlides = Math.max(hero.slides.length, 1);
  const safeHeroSlide = heroSlide % totalHeroSlides;
  const currentSlide = hero.slides[safeHeroSlide] || hero.slides[0];

  // Sync heroSlide when slide is clicked in live editor dock (only when direct edit is active)
  useEffect(() => {
    if (isDirectEdit && selectedHeroSlide !== undefined && selectedHeroSlide !== heroSlide) {
      setHeroSlide(selectedHeroSlide % totalHeroSlides);
    }
  }, [isDirectEdit, selectedHeroSlide, totalHeroSlides, heroSlide]);

  const handleNextSlide = useCallback(() => {
    setHeroSlide((prev) => {
      const next = (prev + 1) % totalHeroSlides;
      if (isDirectEdit && setSelectedHeroSlide) {
        setSelectedHeroSlide(next);
      }
      return next;
    });
  }, [totalHeroSlides, isDirectEdit, setSelectedHeroSlide]);

  const handlePrevSlide = useCallback(() => {
    setHeroSlide((prev) => {
      const prevIdx = (prev - 1 + totalHeroSlides) % totalHeroSlides;
      if (isDirectEdit && setSelectedHeroSlide) {
        setSelectedHeroSlide(prevIdx);
      }
      return prevIdx;
    });
  }, [totalHeroSlides, isDirectEdit, setSelectedHeroSlide]);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsHeroPaused(true);
    }
  }, []);

  // Auto-advance hero slides every 6.5 seconds unless paused or hovered (only if > 1 slide)
  useEffect(() => {
    if (totalHeroSlides <= 1 || isHeroPaused || isHeroHovered) return;
    const timer = setInterval(() => {
      handleNextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [totalHeroSlides, isHeroPaused, isHeroHovered, handleNextSlide]);

  return (
    <>
      <Helmet>
        <title>The LAYA Chronicle | Resource Center for Adivasis</title>
        <meta
          name="description"
          content="LAYA – Resource Center for Adivasis. 39+ years of working with indigenous communities in the Eastern Ghats. Discover programmes, stories, and impact."
        />
        <link rel="canonical" href="https://laya.org.in/" />
        <meta property="og:title" content="The LAYA Chronicle | Resource Center for Adivasis" />
        <meta
          property="og:description"
          content="Rhythms of Nature and Resilient Lives — LAYA's journey with Adivasi communities."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <MainLayout>
        {/* ================================================================
            TESTIMONIALS STRIP — Below Main Navigation, Above Hero (Desktop/Tablet)
            ================================================================ */}
        <div className="hidden md:block">
          <TestimonialsStrip />
        </div>

        {/* ================================================================
            EDITORIAL HERO — Asymmetric Editorial Composition with Adaptive Carousel
            ================================================================ */}
        <section
          id="hero-section"
          className="relative bg-transparent pt-3 pb-6 sm:pt-4 sm:pb-8 lg:pt-5 lg:pb-10 xl:pt-6 xl:pb-12 border-b border-[#E7E4E9] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 xl:gap-14 items-center">
              {/* Left Column: Synchronized Mission & Narrative (5 columns on desktop) */}
              <div className="order-1 lg:col-span-5 flex flex-col justify-center sm:min-h-[260px] lg:min-h-[300px]">
                <div
                  key={safeHeroSlide}
                  className="flex flex-col justify-center animate-hero-text motion-reduce:animate-none"
                >
                  {currentSlide.eyebrow && (
                    <div className="flex items-center gap-2 mb-2 sm:mb-3.5">
                      <span className="w-6 h-[2px] bg-[#59BCE8]" aria-hidden="true" />
                      <EditableText
                        path={`home.hero.slides.${safeHeroSlide}.eyebrow`}
                        label="Hero Eyebrow"
                        value={currentSlide.eyebrow}
                        as="span"
                        className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#7664B5] font-sans"
                      />
                    </div>
                  )}

                  <EditableText
                    path={`home.hero.slides.${safeHeroSlide}.headline`}
                    label="Hero Headline"
                    value={currentSlide.headline}
                    as="h1"
                    className="text-2xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-bold text-[#24232A] font-serif tracking-tight leading-[1.15] mb-2 sm:mb-3 text-balance"
                  />

                  {currentSlide.supporting && (
                    <EditableText
                      path={`home.hero.slides.${safeHeroSlide}.supporting`}
                      label="Hero Supporting Text"
                      value={currentSlide.supporting}
                      as="p"
                      multiline={true}
                      className="text-[13px] sm:text-[17px] text-[#4E4C58] leading-normal sm:leading-relaxed font-normal max-w-xl mb-3 sm:mb-5 line-clamp-3 sm:line-clamp-none"
                    />
                  )}

                  {/* Action Buttons: Primary Button & Secondary Text Link */}
                  {(currentSlide.primaryCta?.label || currentSlide.secondaryCta?.label) && (
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                      {currentSlide.primaryCta?.label && (
                        <Link
                          to={currentSlide.primaryCta.to || ROUTES.programs}
                          id="hero-primary-cta"
                          className="inline-flex items-center justify-center gap-2 bg-[#7664B5] hover:bg-[#604E9E] text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-5 sm:px-7 py-2.5 sm:py-3.5 transition-colors shadow-none rounded-none"
                        >
                          <EditableText
                            path={`home.hero.slides.${safeHeroSlide}.primaryCta.label`}
                            label="Hero Primary Button"
                            value={currentSlide.primaryCta.label}
                            as="span"
                          />
                          <span>&rarr;</span>
                        </Link>
                      )}
                      {currentSlide.secondaryCta?.label && (
                        <Link
                          to={currentSlide.secondaryCta.to || ROUTES.about}
                          id="hero-secondary-cta"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#24232A] hover:text-[#7664B5] transition-colors py-2.5 sm:py-3.5 px-2 group border-b-2 border-transparent hover:border-[#7664B5]"
                        >
                          <EditableText
                            path={`home.hero.slides.${safeHeroSlide}.secondaryCta.label`}
                            label="Hero Secondary Button"
                            value={currentSlide.secondaryCta.label}
                            as="span"
                          />
                          <span className="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Hero Key Figures / Metrics (Dynamic Auto-Fit Grid) */}
                  {hero.figures && hero.figures.length > 0 && (
                    <div className="home-figures" style={{ marginTop: "1.25rem" }}>
                      {hero.figures.map((fig, idx) => (
                        <div key={idx}>
                          <EditableText
                            path={`home.hero.figures.${idx}.value`}
                            label={`Hero Metric ${idx + 1} Number`}
                            value={fig.value}
                            as="span"
                            className="home-figure__value"
                          />
                          <EditableText
                            path={`home.hero.figures.${idx}.label`}
                            label={`Hero Metric ${idx + 1} Label`}
                            value={fig.label}
                            as="span"
                            className="home-figure__label"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Hero Carousel (7 columns on desktop) */}
              <div
                className="order-2 lg:col-span-7 flex flex-col justify-start lg:-mt-2"
                onMouseEnter={() => setIsHeroHovered(true)}
                onMouseLeave={() => setIsHeroHovered(false)}
              >
                <div
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="LAYA Field Photography Carousel"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (totalHeroSlides <= 1) return;
                    if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      handlePrevSlide();
                    } else if (e.key === "ArrowRight") {
                      e.preventDefault();
                      handleNextSlide();
                    }
                  }}
                  className="relative m-0 overflow-hidden bg-white border border-[#E7E4E9] shadow-[0_8px_30px_-6px_rgba(36,35,42,0.07)] focus:outline-none focus:ring-2 focus:ring-[#7664B5]"
                >
                  {/* Subtle Continuous Progress Track (Only when > 1 slide) */}
                  {totalHeroSlides > 1 && (
                    <div
                      className="h-[3px] w-full bg-neutral-100 overflow-hidden"
                      role="progressbar"
                      aria-valuenow={safeHeroSlide + 1}
                      aria-valuemin={1}
                      aria-valuemax={totalHeroSlides}
                      aria-label={`Slide ${safeHeroSlide + 1} of ${totalHeroSlides}`}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-[#59BCE8] to-[#7664B5] transition-all duration-500 ease-out"
                        style={{ width: `${((safeHeroSlide + 1) / totalHeroSlides) * 100}%` }}
                      />
                    </div>
                  )}

                  {/* Slides Viewport Container */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9.6] max-h-[350px] sm:max-h-[375px] lg:max-h-[390px] xl:max-h-[415px] overflow-hidden bg-neutral-100">
                    {hero.slides.map((slide, index) => {
                      const isActive = index === safeHeroSlide;
                      const slideImage = slide.image || defaultHero.slides[0]?.image;
                      return (
                        <div
                          key={index}
                          role="group"
                          aria-roledescription="slide"
                          aria-label={`Slide ${index + 1} of ${totalHeroSlides}: ${slideImage?.caption || slide.headline}`}
                          aria-hidden={!isActive}
                          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
                            isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                          }`}
                        >
                          <EditableImage
                            path={`home.hero.slides.${index}.image.src`}
                            label={`Hero Slide ${index + 1} Photo`}
                            src={slideImage?.src}
                            alt={slideImage?.alt || slide.headline}
                            width={1200}
                            height={800}
                            className="w-full h-full object-cover block"
                            loading={index === 0 ? "eager" : "lazy"}
                          />
                        </div>
                      );
                    })}

                    {/* Carousel Overlay Navigation Controls (Prev / Next) - Only when > 1 slide */}
                    {totalHeroSlides > 1 && (
                      <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between p-3 sm:p-4 pointer-events-none">
                        <button
                          type="button"
                          onClick={handlePrevSlide}
                          aria-label="Previous photograph"
                          className="pointer-events-auto p-2 sm:p-2.5 bg-[#24232A]/70 hover:bg-[#7664B5] text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white shadow-sm backdrop-blur-sm"
                        >
                          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextSlide}
                          aria-label="Next photograph"
                          className="pointer-events-auto p-2 sm:p-2.5 bg-[#24232A]/70 hover:bg-[#7664B5] text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white shadow-sm backdrop-blur-sm"
                        >
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                        </button>
                      </div>
                    )}

                    {/* Slide Indicators & Pause Toggle Bar - Only when > 1 slide */}
                    {totalHeroSlides > 1 && (
                      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2 bg-[#24232A]/85 px-3 py-1.5 backdrop-blur-md border border-white/15">
                        <button
                          type="button"
                          onClick={() => setIsHeroPaused((prev) => !prev)}
                          aria-label={isHeroPaused ? "Resume slideshow" : "Pause slideshow"}
                          className="text-white hover:text-[#59BCE8] p-0.5 transition-colors focus:outline-none focus:ring-1 focus:ring-[#59BCE8]"
                        >
                          {isHeroPaused ? (
                            <Play className="w-3.5 h-3.5 text-[#59BCE8]" aria-hidden="true" />
                          ) : (
                            <Pause className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                          )}
                        </button>
                        <div className="w-[1px] h-3 bg-white/20" aria-hidden="true" />
                        <div className="flex items-center gap-1.5">
                          {hero.slides.map((_, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setHeroSlide(index)}
                              aria-label={`Go to slide ${index + 1}`}
                              aria-current={index === safeHeroSlide ? "true" : undefined}
                              className={`h-1.5 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white ${
                                index === safeHeroSlide
                                  ? "w-6 bg-[#59BCE8]"
                                  : "w-2 bg-white/40 hover:bg-white"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Figcaption with live caption & metadata */}
                  <div className="px-4 sm:px-5 py-2.5 bg-white/95 backdrop-blur-sm border-t border-[#E7E4E9] flex flex-wrap items-center justify-between gap-2.5 text-xs text-[#24232A] font-sans">
                    <div className="flex items-center gap-2 min-w-0 mr-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#59BCE8] shrink-0" aria-hidden="true" />
                      <span className="truncate font-medium text-[#24232A]">
                        {currentSlide.image?.caption || currentSlide.headline}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-auto">
                      {totalHeroSlides > 1 && (
                        <span className="text-xs font-mono text-[#656372] font-semibold">
                          {safeHeroSlide + 1} / {totalHeroSlides}
                        </span>
                      )}
                      {currentSlide.location && (
                        <span className="text-[#7664B5] font-bold uppercase tracking-wider text-[10px] bg-[#F0ECF8] px-2.5 py-0.5 border border-[#E7E4E9]">
                          {currentSlide.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Sub-Hero Curated On-Page Guide (Desktop/Tablet) */}
            <nav aria-label="Page Guide" className="hidden sm:flex mt-3 sm:mt-6 py-2 px-3 sm:px-6 bg-white border border-[#E7E4E9] items-center justify-between gap-3 text-xs font-medium text-neutral-600 overflow-x-auto scrollbar-none whitespace-nowrap">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#59BCE8]" aria-hidden="true" />
                Explore
              </span>
              <div className="flex items-center gap-x-3.5 sm:gap-x-5 shrink-0">
                <Link
                  to={ROUTES.about}
                  onClick={() => scrollPageToTop()}
                  className="text-[#24232A] hover:text-[#7664B5] transition-colors"
                >
                  About LAYA
                </Link>
                <span className="text-neutral-300 select-none" aria-hidden="true">·</span>
                <Link
                  to={ROUTES.programs}
                  onClick={() => scrollPageToTop()}
                  className="text-[#24232A] hover:text-[#7664B5] transition-colors"
                >
                  Our Work
                </Link>
                <span className="text-neutral-300 select-none" aria-hidden="true">·</span>
                <Link
                  to={ROUTES.impact}
                  onClick={() => scrollPageToTop()}
                  className="text-[#24232A] hover:text-[#7664B5] transition-colors"
                >
                  Impact
                </Link>
                <span className="text-neutral-300 select-none" aria-hidden="true">·</span>
                <Link
                  to={ROUTES.stories}
                  onClick={() => scrollPageToTop()}
                  className="text-[#24232A] hover:text-[#7664B5] transition-colors"
                >
                  Field Notes
                </Link>
                <span className="text-neutral-300 select-none" aria-hidden="true">·</span>
                <Link
                  to={ROUTES.publications}
                  onClick={() => scrollPageToTop()}
                  className="text-[#24232A] hover:text-[#7664B5] transition-colors"
                >
                  Publications
                </Link>
              </div>
              <Link
                to={ROUTES.donate}
                className="text-[#7664B5] hover:text-[#604E9E] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1 transition-colors ml-auto sm:ml-0"
              >
                Support Our Mission &rarr;
              </Link>
            </nav>
          </div>
        </section>

        {/* ================================================================
            FOUR DECADES — About LAYA
            ================================================================ */}
        <section id="four-decades-section" className="home-band border-b border-[#E7E4E9]">
          <div className="container-page home-split home-split--media-start reveal">
            <div>
              <p className="type-eyebrow text-[#755EB9] font-sans tracking-wider uppercase mb-2">
                <span className="font-normal">ABOUT </span>
                <span className="font-bold">LAYA</span>
              </p>
              <EditableText
                path="home.fourDecades.heading"
                label="Four Decades Title"
                value={fourDecades.heading}
                as="h2"
                className="home-section-header__heading"
              />

              {fourDecades.paragraphs && fourDecades.paragraphs.length > 0 && (
                <div className="home-prose">
                  {fourDecades.paragraphs.map((paragraph, idx) => (
                    <EditableText
                      key={idx}
                      path={`home.fourDecades.paragraphs.${idx}`}
                      label={`Four Decades Paragraph ${idx + 1}`}
                      value={paragraph}
                      as="p"
                      multiline={true}
                      className={idx > 0 ? "hidden sm:block" : ""}
                    />
                  ))}
                </div>
              )}

              {fourDecades.cta?.label && (
                <div style={{ marginTop: "var(--space-md)" }}>
                  <EditorialLink
                    id="four-decades-cta"
                    to={fourDecades.cta.to}
                    fieldPath="home.fourDecades.cta.label"
                    fieldLabel="Four Decades Button Label"
                  >
                    {fourDecades.cta.label}
                  </EditorialLink>
                </div>
              )}
            </div>

            <figure className="home-media border border-[#E7E4E9]">
              <EditableImage
                path="home.fourDecades.image.src"
                label="Four Decades Photo"
                src={fourDecades.image.src}
                alt={fourDecades.image.alt}
                loading="lazy"
              />
              <figcaption className="home-media__note">
                <span className="home-media__note-label">Resource Centre</span>
                <span className="home-media__note-value">{fourDecades.since}</span>
              </figcaption>
            </figure>
          </div>

          {/* Operating principles, set as an editorial rule-separated
              triptych rather than icon cards. */}
          {fourDecades.principles && fourDecades.principles.length > 0 && (
            <div className="container-page" style={{ marginTop: "var(--space-3xl)" }}>
              <div className="work-rail reveal">
                {fourDecades.principles.map((principle, idx) => (
                  <div key={principle.title || idx} className="impact-metric">
                    <h3 className="type-h4">{principle.title}</h3>
                    <p className="impact-metric__desc">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ================================================================
            OUR WORK — documentary index
            ================================================================ */}
        <section className="home-band home-band--sunken border-b border-[#E7E4E9]" id="our-work">
          <div className="container-page">
            <div className="reveal">
              <SectionHeader
                eyebrow={ourWork.eyebrow}
                heading={ourWork.heading}
                intro={ourWork.intro}
                wide
              />
            </div>

            {/* Featured programme — deliberately asymmetric against the rail. */}
            {featureProgramme && (
              <article className="work-feature reveal group/card border border-[#E7E4E9]">
                <Link
                  to={PROGRAMME_ROUTES[featureProgramme.id] ?? ROUTES.programs}
                  className="work-feature__media block relative overflow-hidden"
                >
                  <img
                    src={featureProgramme.image}
                    alt={`${featureProgramme.title} — LAYA programme work`}
                    loading="lazy"
                    decoding="async"
                    className="transition-transform duration-700 ease-out group-hover/card:scale-105"
                  />
                </Link>
                <div className="work-feature__body">
                  <p className="type-eyebrow">{featureProgramme.category}</p>
                  <h3 className="work-feature__title">{featureProgramme.title}</h3>
                  <p className="work-feature__desc">{featureProgramme.description}</p>

                  {featureProgramme.metric && (
                    <div className="work-feature__metric">
                      <span className="home-figure__value" style={{ color: "var(--text-primary)" }}>{featureProgramme.metric.value}</span>
                      <span className="home-figure__label" style={{ color: "var(--text-secondary)" }}>{featureProgramme.metric.label}</span>
                    </div>
                  )}

                  <div style={{ marginTop: "var(--space-md)" }}>
                    <EditorialLink to={PROGRAMME_ROUTES[featureProgramme.id] ?? ROUTES.programs}>
                      Read more
                    </EditorialLink>
                  </div>
                </div>
              </article>
            )}

            {/* Supporting programme rail (only when supporting programmes exist) */}
            {railProgrammes.length > 0 && (
              <div className="work-rail reveal">
                {railProgrammes.map((programme) => (
                  <article key={programme.id} className="work-tile group/card border border-[#E7E4E9]">
                    <Link
                      to={PROGRAMME_ROUTES[programme.id] ?? ROUTES.programs}
                      className="work-tile__media relative block overflow-hidden"
                      aria-label={`${programme.title}. ${programme.description}`}
                    >
                      <img src={programme.image} alt="" loading="lazy" decoding="async" className="transition-transform duration-700 ease-out group-hover/card:scale-105" />
                    </Link>
                    <div className="work-tile__body">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7664B5] mb-1 font-sans">{programme.category}</span>
                      <h3 className="work-tile__title">{programme.title}</h3>
                      <p className="work-tile__desc">{programme.description.slice(0, 140)}…</p>
                      <EditorialLink to={PROGRAMME_ROUTES[programme.id] ?? ROUTES.programs}>
                        Read more
                      </EditorialLink>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {ourWork.cta?.label && (
              <div style={{ marginTop: "var(--space-xl)" }}>
                <EditorialLink to={ourWork.cta.to}>{ourWork.cta.label}</EditorialLink>
              </div>
            )}
          </div>
        </section>

        {/* ================================================================
            STORIES FROM THE FIELD
            ================================================================ */}
        <section id="stories-section" className="home-band border-b border-[#E7E4E9]">
          <div className="container-page">
            <div className="reveal">
              <SectionHeader
                eyebrow={stories.eyebrow}
                heading={stories.heading}
                intro={stories.intro}
                fieldPrefix="home.stories"
              />
            </div>

            <div className={`stories-grid reveal ${otherStories.length === 0 ? "stories-grid--single" : ""}`}>
              {/* Lead story */}
              {leadStory && (
                <Link to={leadStory.to} className="story-lead border border-[#E7E4E9]">
                  <div className="story-lead__media">
                    <img
                      src={leadStory.image}
                      alt={leadStory.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="story-lead__body">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="note-tag">{leadStory.category}</span>
                      <span className="text-xs font-mono text-muted-foreground">
                        <time dateTime={leadStory.date}>
                          {new Date(leadStory.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
                      </span>
                    </div>
                    <p className="type-meta">
                      {leadStory.author}
                    </p>
                    <h3 className="story-lead__title">{leadStory.title}</h3>
                    <p className="story-lead__excerpt">{leadStory.excerpt}</p>
                    <div style={{ marginTop: "var(--space-md)" }}>
                      <span className="editorial-link">
                        Read field note
                        <ExternalLink className="editorial-link__arrow" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Supporting stories (only when > 0) */}
              {otherStories.length > 0 && (
                <div className="story-stack">
                  {otherStories.map((story) => (
                    <Link key={story.id} to={story.to} className="story-item">
                      <div className="story-item__media border border-[#E7E4E9]">
                        <img src={story.image} alt={story.title} loading="lazy" decoding="async" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="note-tag">{story.category}</span>
                          <span className="text-xs font-mono text-muted-foreground">
                            <time dateTime={story.date}>
                              {new Date(story.date).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </time>
                          </span>
                        </div>
                        <p className="type-meta">
                          {story.author}
                        </p>
                        <h3 className="story-item__title">{story.title}</h3>
                        <p className="story-item__excerpt">{story.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {stories.cta?.label && (
              <div style={{ marginTop: "var(--space-xl)" }}>
                <EditorialLink
                  to={stories.cta.to}
                  fieldPath="home.stories.cta.label"
                  fieldLabel="Stories Button Label"
                >
                  {stories.cta.label}
                </EditorialLink>
              </div>
            )}
          </div>
        </section>

        {/* ================================================================
            THE LAYA CHRONICLE — knowledge identity
            ================================================================ */}
        <section id="chronicle-section" className="home-band home-band--sunken border-b border-[#E7E4E9]">
          <div className="container-page">
            <div className="reveal">
              <SectionHeader
                eyebrow={chronicle.eyebrow}
                heading={chronicle.heading}
                intro={chronicle.intro}
                fieldPrefix="home.chronicle"
              />
            </div>

            <div className="chronicle-grid reveal">
              {chronicle.documents.map((doc) => (
                <Link key={doc.title} to={doc.to} className="document-card border border-[#E7E4E9]">
                  <div className="document-card__cover border-b border-[#E7E4E9]">
                    <img
                      src={doc.image}
                      alt={`${doc.title} cover`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="document-card__body">
                    {(doc.type || doc.date) && (
                      <div className="document-card__meta">
                        {doc.type && <span className="document-card__type">{doc.type}</span>}
                        {doc.date && <span className="document-card__date">{doc.date}</span>}
                      </div>
                    )}
                    <h3 className="document-card__title">{doc.title}</h3>
                  </div>
                </Link>
              ))}
            </div>

            <div
              style={{
                marginTop: "var(--space-xl)",
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-xl)",
                alignItems: "baseline",
              }}
            >
              {chronicle.cta?.label && (
                <EditorialLink
                  to={chronicle.cta.to}
                  fieldPath="home.chronicle.cta.label"
                  fieldLabel="Chronicle Button Label"
                >
                  {chronicle.cta.label}
                </EditorialLink>
              )}
              <dl
                className="hidden sm:flex"
                style={{
                  flexWrap: "wrap",
                  gap: "var(--space-lg)",
                  margin: 0,
                }}
              >
                {chronicle.facets.map((facet) => (
                  <div key={facet.label}>
                    <dt className="home-figure__label" style={{ color: "var(--text-secondary)" }}>{facet.label}</dt>
                    <dd className="type-meta" style={{ margin: 0, color: "var(--text-primary)" }}>
                      {facet.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ================================================================
            IMPACT — typographic band
            ================================================================ */}
        <section id="impact-section" className="impact-band border-b border-[#E7E4E9]">
          <div className="container-page">
            <div className="reveal">
              <SectionHeader
                eyebrow={impact.eyebrow}
                heading={impact.heading}
                intro={impact.intro}
                fieldPrefix="home.impact"
                wide
              />
            </div>

            {impact.metrics && impact.metrics.length > 0 && (
              <div className="impact-grid reveal">
                {impact.metrics.map((metric, mIdx) => (
                  <div key={metric.id || metric.title} className="impact-metric">
                    <EditableText
                      path={`home.impact.metrics.${mIdx}.number`}
                      label={`Impact Metric ${mIdx + 1} Number`}
                      value={metric.number}
                      as="span"
                      className="impact-metric__value"
                    />
                    <EditableText
                      path={`home.impact.metrics.${mIdx}.title`}
                      label={`Impact Metric ${mIdx + 1} Title`}
                      value={metric.title}
                      as="span"
                      className="impact-metric__label"
                    />
                    <EditableText
                      path={`home.impact.metrics.${mIdx}.description`}
                      label={`Impact Metric ${mIdx + 1} Description`}
                      value={metric.description}
                      as="p"
                      multiline={true}
                      className="impact-metric__desc"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ================================================================
            COMMUNITY / PARTNER VOICES
            ================================================================ */}
        {voices.items && voices.items.length > 0 && (
          <section id="voices-section" className="home-band home-band--ink border-b border-[#363440]">
            <div className="container-page">
              <div className="reveal">
                <SectionHeader
                  eyebrow={voices.eyebrow}
                  heading={voices.heading}
                  fieldPrefix="home.voices"
                  wide
                />
              </div>

              <div className="voices-grid reveal">
                {voices.items.map((voice, idx) => (
                  <blockquote key={idx} className="voice">
                    <EditableText
                      path={`home.voices.items.${idx}.quote`}
                      label={`Voice ${idx + 1} Quote`}
                      value={voice.quote}
                      as="p"
                      multiline={true}
                      className="voice__quote"
                    />
                    <footer className="voice__attribution">
                      <EditableText
                        path={`home.voices.items.${idx}.attribution`}
                        label={`Voice ${idx + 1} Attribution`}
                        value={voice.attribution || voice.name}
                        as="span"
                        className="voice__name"
                      />
                      <EditableText
                        path={`home.voices.items.${idx}.role`}
                        label={`Voice ${idx + 1} Role`}
                        value={voice.role}
                        as="span"
                        className="voice__role"
                      />
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================================================================
            SUPPORT LAYA
            ================================================================ */}
        <section id="support-section" className="support-band">
          <div className="container-page home-split reveal">
            <div>
              <p className="type-eyebrow text-[#755EB9] font-sans tracking-wider uppercase mb-2">
                <span className="font-normal">SUPPORT </span>
                <span className="font-bold">LAYA</span>
              </p>
              <EditableText
                path="home.support.heading"
                label="Support Section Title"
                value={support.heading}
                as="h2"
                className="home-section-header__heading"
              />
              <EditableText
                path="home.support.body"
                label="Support Description"
                value={support.body}
                as="p"
                multiline={true}
                className="home-prose"
              />

              <div className="support-actions">
                <Link
                  to={support.primaryCta.to}
                  className="inline-flex items-center justify-center gap-2 bg-[#7664B5] hover:bg-[#604E9E] text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-3.5 transition-colors shadow-none"
                >
                  <EditableText
                    path="home.support.primaryCta.label"
                    label="Support Primary Button"
                    value={support.primaryCta.label}
                    as="span"
                  />
                </Link>
                <Link
                  to={support.secondaryCta.to}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F9F8F5] text-[#24232A] hover:text-[#7664B5] border border-[#E7E4E9] font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-3.5 transition-colors"
                >
                  <EditableText
                    path="home.support.secondaryCta.label"
                    label="Support Secondary Button"
                    value={support.secondaryCta.label}
                    as="span"
                  />
                </Link>
              </div>
            </div>

            <div>
              <ul className="support-assurances" style={{ listStyle: "none", padding: 0 }}>
                {support.assurances.map((assurance, aIdx) => (
                  <li key={assurance} className="support-assurance">
                    <Check className="support-assurance__mark" aria-hidden="true" />
                    <EditableText
                      path={`home.support.assurances.${aIdx}`}
                      label={`Assurance ${aIdx + 1}`}
                      value={assurance}
                      as="span"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Index;
