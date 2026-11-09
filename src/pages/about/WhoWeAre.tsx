import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import { useWebsiteContent } from "@/context/ContentContext";
import EditableText from "@/components/admin/EditableText";
import {
  ABOUT_HERO_LABELS,
  executiveDirectorMessage as defaultExecutiveDirectorMessage,
  futureVision as defaultFutureVision,
  journeyPhases as defaultJourneyPhases,
  leadership,
  programAreas,
  whoWeAre as defaultWhoWeAre,
} from "@/content/about";

const SectionHeading = ({
  eyebrow,
  title,
  intro,
  fieldPrefix,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  fieldPrefix?: string;
}) => (
 <header className="about-heading">
    <p className="type-eyebrow">{eyebrow}</p>
    {fieldPrefix ? (
      <EditableText
        path={`${fieldPrefix}.title`}
        label="Section Title"
        value={title}
        as="h2"
        className="about-heading__title"
      />
    ) : (
      <h2 className="about-heading__title">{title}</h2>
    )}
    {intro && (
      fieldPrefix ? (
        <EditableText
          path={`${fieldPrefix}.intro`}
          label="Section Intro"
          value={intro}
          as="p"
          multiline={true}
          className="about-heading__intro"
        />
      ) : (
        <p className="about-heading__intro">{intro}</p>
      )
    )}
 </header>
);

/**
 * /about/who-we-are — "Our Journey"
 * ---------------------------------------------------------------------------
 * Organisational identity plus the full seven-phase historical timeline.
 * Real-time edits in /admin are immediately rendered here.
 */
const WhoWeAre = () => {
  useRevealOnScroll();
  const { pathname } = useLocation();
  const { content } = useWebsiteContent();

  const whoWeAre = content.about?.whoWeAre || defaultWhoWeAre;
  const executiveDirectorMessage =
    content.about?.executiveDirectorMessage || defaultExecutiveDirectorMessage;
  const futureVision = content.about?.futureVision || defaultFutureVision;
  const journeyPhases = content.about?.journeyPhases || defaultJourneyPhases;

  return (
    <>
      <Helmet>
        <title>Our Journey | LAYA</title>
        <meta name="description" content={whoWeAre.description} />
        <link rel="canonical" href="https://laya.org.in/about/who-we-are" />
      </Helmet>

      <MainLayout>
        <header className="about-header">
          <div className="about-header__inner">
            <p className="about-header__eyebrow type-eyebrow">
              {ABOUT_HERO_LABELS[pathname]}
            </p>
            <h1 className="about-header__title">Our Journey</h1>
            <EditableText
              path="about.whoWeAre.subtitle"
              label="Page Subtitle"
              value={whoWeAre.subtitle}
              as="p"
              multiline={true}
              className="about-header__subtitle"
            />

            <dl className="about-header__meta">
              <div>
                <dt className="type-label">Founded</dt>
                <dd className="type-meta" style={{ margin: 0 }}>
                  1985 — East Godavari
                </dd>
              </div>
              <div>
                <dt className="type-label">Phases</dt>
                <dd className="type-meta" style={{ margin: 0 }}>
                  {journeyPhases.length} documented
                </dd>
              </div>
              <div>
                <dt className="type-label">Region</dt>
                <dd className="type-meta" style={{ margin: 0 }}>
                  Eastern Ghats, Andhra Pradesh
                </dd>
              </div>
            </dl>
          </div>
        </header>

        {/* ---- Identity ------------------------------------------------- */}
        <section className="about-band about-band--warm">
          <div className="container-page about-split">
            <div>
              <SectionHeading eyebrow="Who we are" title={whoWeAre.title} fieldPrefix="about.whoWeAre" />
              <div className="about-prose">
                <EditableText
                  path="about.whoWeAre.description"
                  label="Description"
                  value={whoWeAre.description}
                  as="p"
                  multiline={true}
                />
                <EditableText
                  path="about.whoWeAre.intro"
                  label="Intro"
                  value={whoWeAre.intro}
                  as="p"
                  multiline={true}
                />
              </div>
              <div className="about-actions">
                <EditorialLink to={ROUTES.about}>Our Story</EditorialLink>
              </div>
            </div>

            <figure className="editorial-figure">
              <div className="about-media">
                <img
                  src={whoWeAre.image}
                  alt={whoWeAre.imageAlt ?? "Adivasi community members in the Eastern Ghats"}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="editorial-caption">
                <span>{whoWeAre.imageCaption ?? "LAYA has accompanied Adivasi communities across the Eastern Ghats since 1985."}</span>
                {whoWeAre.imageDisclosure && (
                  <span className="editorial-caption__badge">
                    {whoWeAre.imageDisclosure}
                  </span>
                )}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---- The journey ---------------------------------------------- */}
        <section className="about-band" id="timeline">
          <div className="container-page">
            <SectionHeading
              eyebrow="Four decades"
              title="Our journey, phase by phase"
              intro="Four decades of accompaniment with Adivasi communities in the Eastern Ghats."
            />

            {journeyPhases && journeyPhases.length > 0 ? (
              <ol className="journey reveal" style={{ listStyle: "none", margin: 0 }}>
                {journeyPhases.map((phase) => (
                  <li key={phase.phase} className="journey__phase">
                    <span className="journey__marker" aria-hidden="true" />

                    <time className="journey__years">{phase.years}</time>
                    <span className="journey__phase-label">Phase {phase.phase}</span>

                    <h3 className="journey__title">{phase.title}</h3>
                    <p className="journey__description">{phase.description}</p>

                    {phase.highlights && phase.highlights.length > 0 && (
                      <div className="journey__developments">
                        <span className="journey__developments-label">Key developments</span>
                        <ul>
                          {phase.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        </section>

        {/* ---- Core Fields of Work -------------------------------------- */}
        <section className="about-band about-band--sunken">
          <div className="container-page">
            <SectionHeading
              eyebrow="Strategic Architecture"
              title="Three Core Fields"
              intro="LAYA organizes its strategic interventions across three interdependent core fields of accompaniment with Adivasi communities:"
            />
            <div className="about-points reveal" style={{ maxWidth: "none" }}>
              {programAreas.map((area) => (
                <div key={area.title} className="about-points__item py-4 sm:py-5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-brand-purple bg-[#F0ECF8] px-2 py-0.5 border border-[#E7E4E9]">
                        {area.number}
                      </span>
                      <h3 className="about-points__title text-lg sm:text-xl font-bold text-neutral-900 mb-0">
                        {area.title}
                      </h3>
                    </div>
                    {area.badge && (
                      <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider shrink-0 bg-neutral-100 px-2 py-0.5 border border-neutral-200">
                        {area.badge}
                      </span>
                    )}
                  </div>
                  <p className="about-points__desc text-neutral-700 leading-relaxed text-sm sm:text-base mt-2">
                    {area.description}
                  </p>
                  <div className="mt-3">
                    <EditorialLink to={area.to}>Explore this field</EditorialLink>
                  </div>
                </div>
              ))}
            </div>
            <div className="about-actions mt-8">
              <EditorialLink to={ROUTES.programs}>Explore All 3 Core Pillars &amp; Programmes</EditorialLink>
            </div>
          </div>
        </section>

        {/* ---- Annual Report 2025–2026: Perspective & Strategic Transition */}
        <section className="about-band about-band--warm">
          <div className="container-page">
            <div className="reveal max-w-4xl mx-auto">
              <header className="about-heading mb-6">
                <p className="type-eyebrow">Annual Report 2025–2026</p>
                <h2 className="about-heading__title">{executiveDirectorMessage.heading}</h2>
              </header>

              <blockquote className="border-l-4 border-[#7664B5] pl-6 my-6 text-lg italic text-neutral-800 font-serif">
                "{executiveDirectorMessage.perspectiveQuote.quote}"
                <footer className="text-sm font-sans font-medium text-neutral-500 mt-2 not-italic">
                  — {executiveDirectorMessage.perspectiveQuote.author}
                </footer>
              </blockquote>

              <div className="bg-white p-6 sm:p-8 border border-[#e7e4e9] shadow-sm my-6">
                <p className="about-prose text-neutral-700 leading-relaxed text-base">
                  "{executiveDirectorMessage.statement}"
                </p>
                <div className="mt-5 pt-4 border-t border-[#f0edf7] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                  <span className="font-semibold text-neutral-900">
                    {executiveDirectorMessage.director},{" "}
                    <span className="text-[#604E9E] font-medium">{executiveDirectorMessage.title}</span>
                  </span>
                  <span className="text-neutral-500 font-mono text-xs">
                    {executiveDirectorMessage.date}
                  </span>
                </div>
              </div>

              <div className="bg-[#f7f5fa] border-l-2 border-[#7664B5] p-4 text-xs sm:text-sm font-medium text-neutral-700 font-sans">
                <strong>Organisational Strength:</strong> {executiveDirectorMessage.teamSummary}
              </div>
            </div>
          </div>
        </section>

        {/* ---- Leadership & future vision -------------------------------- */}
        <section className="about-band">
          <div className="container-page about-split reveal">
            <div>
              <SectionHeading eyebrow="Leadership" title={leadership.title} />
              <p className="about-prose">{leadership.description}</p>
              <div className="about-points" style={{ marginTop: "var(--space-md)" }}>
                {leadership.points.map((point) => (
                  <div key={point} className="about-points__item">
                    <p className="about-points__desc">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Looking forward" title={futureVision.title} />
              <p className="about-prose">{futureVision.description}</p>
              <div className="about-points" style={{ marginTop: "var(--space-md)" }}>
                {futureVision.points.map((point) => (
                  <div key={point} className="about-points__item">
                    <p className="about-points__desc">{point}</p>
                  </div>
                ))}
              </div>
              <div className="about-actions">
                <EditorialLink to={ROUTES.aboutGovernance}>Governance</EditorialLink>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default WhoWeAre;
