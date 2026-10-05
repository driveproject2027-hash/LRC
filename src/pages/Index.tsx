import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Check, ExternalLink } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { EditorialLink, SectionHeader } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import {
  PROGRAMME_ROUTES,
  chronicle,
  fourDecades,
  hero,
  impact,
  ourWork,
  stories,
  support,
  voices,
} from "@/content/home";

/**
 * LAYA HOMEPAGE
 * ---------------------------------------------------------------------------
 * Editorial, documentary composition built on the Phase 1 design system and
 * Phase 2 header.
 *
 * Content is entirely from `src/content/home.ts`, which sources every value
 * from records already present in the codebase. No statistics, quotes, stories
 * or programme claims are invented here.
 *
 * The previous hero composition (blue/purple canvas, cyan circles, oversized
 * headline, glass panels, floating stat strip) has been removed.
 *
 * Photography: real LAYA field photographs only, chosen from `src/assets`.
 * See `src/content/home.ts` for the per-image rationale.
 */
const Index = () => {
  useRevealOnScroll();

  const [featureProgramme, ...railProgrammes] = ourWork.programmes;
  const [leadStory, ...otherStories] = stories.items;

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance the hero slider every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % hero.slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

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
            HERO
            ================================================================ */}
        <section id="hero-section" className="home-hero">
          {hero.slides.map((slide, index) => (
            <figure
              key={index}
              className={`home-hero__media transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ zIndex: index === currentSlide ? 0 : -1 }}
            >
              <img
                src={slide.image.src}
                alt={slide.image.alt}
                width={1500}
                height={451}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
              />
              <figcaption className="home-hero__caption">{slide.image.caption}</figcaption>
            </figure>
          ))}

          <div className="container-page home-hero__story relative z-10">
            <div className="home-hero__copy">
              <p className="home-hero__eyebrow type-eyebrow">{hero.eyebrow}</p>

              {/* Crossfade the headline and lead text using CSS Grid for natural height */}
              <div className="grid mb-4">
                {hero.slides.map((slide, index) => (
                  <div
                    key={index}
                    style={{ gridArea: "1 / 1 / 2 / 2" }}
                    className={`transition-opacity ${
                      index === currentSlide 
                        ? "opacity-100 duration-1000 delay-300" 
                        : "opacity-0 duration-500 pointer-events-none"
                    }`}
                  >
                    <h1 className="home-hero__title">{slide.headline}</h1>
                    <p className="home-hero__lead">{slide.supporting}</p>
                  </div>
                ))}
              </div>

              <div className="home-hero__actions">
                <Button asChild size="lg" id="hero-primary-cta">
                  <Link to={hero.primaryCta.to}>{hero.primaryCta.label}</Link>
                </Button>
                <EditorialLink
                  to={hero.secondaryCta.to}
                  className="home-hero__secondary-action"
                  id="hero-secondary-cta"
                >
                  {hero.secondaryCta.label}
                </EditorialLink>
              </div>

              {/* Slider Navigation Dots */}
              <div className="flex gap-2 mt-4 mb-3">
                {hero.slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "w-8 bg-laya-blue-400" : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Organisation-wide figures */}
              <dl className="home-figures">
                {hero.figures.map((figure) => (
                  <div key={figure.label}>
                    <dt className="sr-only">{figure.label}</dt>
                    <dd>
                      <AnimatedCounter value={figure.value} className="home-figure__value" />
                      <span className="home-figure__label">{figure.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ================================================================
            FOUR DECADES
            ================================================================ */}
        <section id="four-decades-section" className="home-band">
          <div className="container-page home-split home-split--media-start reveal">
            <div>
              <p className="type-eyebrow">{fourDecades.eyebrow}</p>
              <h2 className="home-section-header__heading">{fourDecades.heading}</h2>

              <div className="home-prose">
                {fourDecades.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div style={{ marginTop: "var(--space-md)" }}>
                <EditorialLink id="four-decades-cta" to={fourDecades.cta.to}>{fourDecades.cta.label}</EditorialLink>
              </div>
            </div>

            <figure className="home-media">
              <img
                src={fourDecades.image.src}
                alt={fourDecades.image.alt}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="home-media__note">
                <span className="home-media__note-label">Resource Centre</span>
                <span className="home-media__note-value">{fourDecades.since}</span>
              </figcaption>
            </figure>
          </div>

          {/* Three operating principles, set as an editorial rule-separated
              triptych rather than icon cards. */}
          <div className="container-page" style={{ marginTop: "var(--space-3xl)" }}>
            <div className="work-rail reveal">
              {fourDecades.principles.map((principle) => (
                <div key={principle.title} className="impact-metric">
                  <h3 className="type-h4">{principle.title}</h3>
                  <p className="impact-metric__desc">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            OUR WORK — documentary index
            ================================================================ */}
        <section className="home-band home-band--sunken" id="our-work">
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
            <article className="work-feature reveal group/card">
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
                
                {/* Yuva-style Hover Overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                >
                  <div className="text-center translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300 flex flex-col items-center gap-1">
                    <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                      {featureProgramme.category}
                    </span>
                    <span className="text-lg font-medium" style={{ color: "#ffffff" }}>
                      Explore this initiative &rarr;
                    </span>
                  </div>
                </div>
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

            {/* Supporting programme rail */}
            <div className="work-rail reveal">
              {railProgrammes.map((programme) => (
                <article key={programme.id} className="work-tile group/card">
                  <Link
                    to={PROGRAMME_ROUTES[programme.id] ?? ROUTES.programs}
                    className="work-tile__media relative block overflow-hidden"
                    aria-label={`${programme.title}. ${programme.description}`}
                  >
                    <img src={programme.image} alt="" loading="lazy" decoding="async" className="transition-transform duration-700 ease-out group-hover/card:scale-105" />
                    
                    {/* Yuva-style Hover Overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                    >
                      <div className="text-center translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300 flex flex-col items-center gap-1">
                        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                          {programme.category}
                        </span>
                        <span className="font-medium" style={{ color: "#ffffff" }}>
                          View details &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="work-tile__body">
                    <h3 className="work-tile__title">{programme.title}</h3>
                    <p className="work-tile__desc">{programme.description.slice(0, 140)}…</p>
                    <EditorialLink to={PROGRAMME_ROUTES[programme.id] ?? ROUTES.programs}>
                      Read more
                    </EditorialLink>
                  </div>
                </article>
              ))}
            </div>

            <div style={{ marginTop: "var(--space-xl)" }}>
              <EditorialLink to={ourWork.cta.to}>{ourWork.cta.label}</EditorialLink>
            </div>
          </div>
        </section>

        {/* ================================================================
            STORIES FROM THE FIELD
            ================================================================ */}
        <section id="stories-section" className="home-band">
          <div className="container-page">
            <div className="reveal">
              <SectionHeader
                eyebrow={stories.eyebrow}
                heading={stories.heading}
                intro={stories.intro}
              />
            </div>

            <div className="stories-grid reveal">
              {/* Lead story */}
              <Link to={leadStory.to} className="story-lead">
                <div className="story-lead__media">
                  <img
                    src={leadStory.image}
                    alt={leadStory.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="story-lead__body">
                  <p className="type-meta">
                    {leadStory.date} · {leadStory.author}
                  </p>
                  <h3 className="story-lead__title">{leadStory.title}</h3>
                  <p className="story-lead__excerpt">{leadStory.excerpt}</p>
                  <div style={{ marginTop: "var(--space-md)" }}>
                    <span className="editorial-link">
                      Read story
                      <ExternalLink className="editorial-link__arrow" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Supporting stories */}
              <div className="story-stack">
                {otherStories.map((story) => (
                  <Link key={story.id} to={story.to} className="story-item">
                    <div className="story-item__media">
                      <img src={story.image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <div>
                      <p className="type-meta">
                        {story.date} · {story.author}
                      </p>
                      <h3 className="story-item__title">{story.title}</h3>
                      <p className="story-item__excerpt">{story.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "var(--space-xl)" }}>
              <EditorialLink to={stories.cta.to}>{stories.cta.label}</EditorialLink>
            </div>
          </div>
        </section>

        {/* ================================================================
            THE LAYA CHRONICLE — knowledge identity
            ================================================================ */}
        <section id="chronicle-section" className="home-band home-band--sunken">
          <div className="container-page">
            <div className="reveal">
              <SectionHeader
                eyebrow={chronicle.eyebrow}
                heading={chronicle.heading}
                intro={chronicle.intro}
              />
            </div>

            <div className="chronicle-grid reveal">
              {chronicle.documents.map((doc) => (
                <Link key={doc.title} to={doc.to} className="document-card">
                  <div className="document-card__cover">
                    <img
                      src={doc.image}
                      alt={`${doc.title} cover`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="document-card__body">
                    <h3 className="document-card__title">{doc.title}</h3>
                    <p className="document-card__desc">{doc.description}</p>
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
              <EditorialLink to={chronicle.cta.to}>{chronicle.cta.label}</EditorialLink>
              <dl
                style={{
                  display: "flex",
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
        <section id="impact-section" className="impact-band">
          <div className="container-page">
            <div className="reveal">
              <SectionHeader
                eyebrow={impact.eyebrow}
                heading={impact.heading}
                intro={impact.intro}
                wide
              />
            </div>

            <div className="impact-grid reveal">
              {impact.metrics.map((metric) => (
                <div key={metric.id} className="impact-metric">
                  <AnimatedCounter value={metric.number} className="impact-metric__value" />
                  <span className="impact-metric__label">{metric.title}</span>
                  <p className="impact-metric__desc">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            COMMUNITY / PARTNER VOICES
            ================================================================ */}
        <section id="voices-section" className="home-band home-band--ink">
          <div className="container-page">
            <div className="reveal">
              <SectionHeader eyebrow={voices.eyebrow} heading={voices.heading} wide />
            </div>

            <div className="voices-grid reveal">
              {voices.items.map((voice) => (
                <blockquote key={voice.name} className="voice">
                  <p className="voice__quote">“{voice.quote}”</p>
                  <footer className="voice__attribution">
                    <cite className="voice__name">{voice.name}</cite>
                    <span className="voice__role">{voice.role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            SUPPORT LAYA
            ================================================================ */}
        <section id="support-section" className="support-band">
          <div className="container-page home-split reveal">
            <div>
              <p className="type-eyebrow">{support.eyebrow}</p>
              <h2 className="home-section-header__heading">{support.heading}</h2>
              <p className="home-prose">{support.body}</p>

              <div className="support-actions">
                <Button asChild size="lg">
                  <Link to={support.primaryCta.to}>{support.primaryCta.label}</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to={support.secondaryCta.to}>{support.secondaryCta.label}</Link>
                </Button>
              </div>
            </div>

            <div>
              <ul className="support-assurances" style={{ listStyle: "none", padding: 0 }}>
                {support.assurances.map((assurance) => (
                  <li key={assurance} className="support-assurance">
                    <Check className="support-assurance__mark" aria-hidden="true" />
                    <span>{assurance}</span>
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
