import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import {
  ABOUT_HERO_LABELS,
  futureVision,
  journeyPhases,
  leadership,
  programAreas,
  whoWeAre,
} from "@/content/about";

const SectionHeading = ({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) => (
 <header className="about-heading">
    <p className="type-eyebrow">{eyebrow}</p>
    <h2 className="about-heading__title">{title}</h2>
    {intro && <p className="about-heading__intro">{intro}</p>}
 </header>
);

/**
 * /about/who-we-are — "Our Journey"
 * ---------------------------------------------------------------------------
 * Organisational identity plus the full seven-phase historical timeline.
 *
 * The previous design coded each phase with a different Tailwind colour
 * (emerald / blue / purple / orange / rose / indigo / cyan) and rendered each
 * as a white card. That is replaced with a single continuous vertical rule,
 * small square markers, and typography-led phases — an archive reading rather
 * than a dashboard.
 *
 * EVERY phase, year range, description and highlight bullet from the source is
 * rendered. Nothing was dropped.
 */
const WhoWeAre = () => {
  useRevealOnScroll();
  const { pathname } = useLocation();

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
            <p className="about-header__subtitle">{whoWeAre.subtitle}</p>

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
              <SectionHeading eyebrow="Who we are" title={whoWeAre.title} />
              <div className="about-prose">
                <p>{whoWeAre.description}</p>
                <p>{whoWeAre.intro}</p>
              </div>
              <div className="about-actions">
                <EditorialLink to={ROUTES.about}>Our Story</EditorialLink>
              </div>
            </div>

            <figure>
              <div className="about-media">
                <img
                  src={whoWeAre.image}
                  alt="Adivasi community members in the Eastern Ghats"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="about-media__caption">
                LAYA has accompanied Adivasi communities across the Eastern Ghats since 1985.
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

            <ol className="journey reveal" style={{ listStyle: "none", margin: 0 }}>
              {journeyPhases.map((phase) => (
                <li key={phase.phase} className="journey__phase">
                  <span className="journey__marker" aria-hidden="true" />

                  <time className="journey__years">{phase.years}</time>
                  <span className="journey__phase-label">{phase.phase}</span>

                  <h3 className="journey__title">{phase.title}</h3>
                  <p className="journey__description">{phase.description}</p>

                  <div className="journey__developments">
                    <span className="journey__developments-label">Key developments</span>
                    <ul>
                      {phase.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---- Programme areas ------------------------------------------ */}
        <section className="about-band about-band--sunken">
          <div className="container-page">
            <SectionHeading
              eyebrow="Programme areas"
              title="Six areas of work"
              intro="The programme areas LAYA has developed through these phases."
            />
            <div className="about-points reveal" style={{ maxWidth: "none" }}>
              {programAreas.map((area) => (
                <div key={area.title} className="about-points__item">
                  <h3 className="about-points__title">{area.title}</h3>
                  <p className="about-points__desc">{area.description}</p>
                </div>
              ))}
            </div>
            <div className="about-actions">
              <EditorialLink to={ROUTES.programs}>All programmes</EditorialLink>
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
