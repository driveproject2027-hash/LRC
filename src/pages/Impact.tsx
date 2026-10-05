import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import {
  COVERAGE_NOTE,
  COVERED_DISTRICTS,
  FIELD_LOCATIONS,
  IMPACT_AREAS,
  IMPACT_METRICS,
} from "@/content/trust";

/**
 * IMPACT  →  /impact
 * ---------------------------------------------------------------------------
 * Rebuilt as an editorial impact section against the Phase 1 design system.
 * The previous version was a panel sitting on the purple/blue background and
 * measured 1.65:1 contrast — a WCAG AA failure. It is now on the ivory canvas.
 *
 * METRICS
 *   The four large figures are `mockImpactMetrics` verbatim — the same numbers
 *   already published on the homepage. The programme outcomes below reuse the
 *   metric strings the previous /impact page already published, so no figure is
 *   strengthened, rounded or invented.
 *
 * GEOGRAPHY
 *   NO MAP IS DRAWN. The repository contains no boundary file and no
 *   coordinates, so plotting villages would mean inventing geography. Verified
 *   districts, offices and pincodes are presented as a structured location
 *   record instead — see the note in src/content/trust.ts.
 */
const Impact = () => {
  useRevealOnScroll();

  return (
    <>
      <Helmet>
        <title>Our Impact | LAYA</title>
        <meta
          name="description"
          content="LAYA's work with Adivasi communities across the Eastern Ghats: four decades of service, 1,500+ villages reached, and outcomes across rights, livelihoods, health and learning."
        />
        <link rel="canonical" href="https://laya.org.in/impact" />
      </Helmet>

      <MainLayout>
        {/* ---- Header ---------------------------------------------------- */}
        <header className="trust-header">
          <div className="trust-header__inner">
            <p className="trust-header__eyebrow type-eyebrow">Our impact</p>
            <h1 className="trust-header__title">Impact &amp; outcomes</h1>
            <p className="trust-header__lead">
              Measuring transformation across communities. LAYA's work continues
              to strengthen community institutions, livelihoods, health systems
              and cultural resilience across the Eastern Ghats.
            </p>
          </div>
        </header>

        {/* ---- Headline figures ------------------------------------------ */}
        <section className="trust-band">
          <div className="trust-header__inner">
            <dl className="impact-figures reveal">
              {IMPACT_METRICS.map((metric) => (
                <div key={metric.id} className="impact-figure">
                  <dd className="impact-figure__value">{metric.number}</dd>
                  <dt className="impact-figure__label">{metric.title}</dt>
                  <p className="impact-figure__desc">{metric.description}</p>
                </div>
              ))}
            </dl>

            <p className="trust-note">
              These organisation-wide figures are the same ones published on the
              LAYA homepage. Programme-level reach is shown below.
            </p>
          </div>
        </section>

        {/* ---- Programme outcomes ---------------------------------------- */}
        <section className="trust-band trust-band--warm">
          <div className="trust-header__inner">
            <header className="trust-heading">
              <p className="type-eyebrow">Areas of impact</p>
              <h2 className="trust-heading__title">
                How the programmes create change
              </h2>
              <p className="trust-heading__intro">
                Outcomes across the four programme areas, each linked to the
                work that produces it.
              </p>
            </header>

            <div className="reveal">
              {IMPACT_AREAS.map((area) => (
                <div key={area.id} className="outcome-record">
                  <h3 className="outcome-record__title">
                    <Link to={area.to} className="laya-link--quiet">
                      {area.title}
                    </Link>
                  </h3>
                  <p className="outcome-record__desc">{area.description}</p>
                  <p className="outcome-record__metric">{area.metric}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Field presence -------------------------------------------- */}
        <section className="trust-band">
          <div className="trust-header__inner">
            <header className="trust-heading">
              <p className="type-eyebrow">Where this happens</p>
              <h2 className="trust-heading__title">
                Field presence across the Eastern Ghats
              </h2>
              <p className="trust-heading__intro">{COVERAGE_NOTE}</p>
            </header>

            <div className="presence-grid reveal">
              <div>
                <h3 className="partner-caption">Districts covered</h3>
                <ul className="presence-districts">
                  {COVERED_DISTRICTS.map((d) => (
                    <li key={d} className="presence-district">
                      <span>{d}</span>
                      <span className="presence-district__mark">
                        Andhra Pradesh
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="trust-note">
                  A map is not shown because verified boundary or coordinate
                  data is not held in this repository. The districts and offices
                  above are the verified geography.
                </p>
              </div>

              <div>
                <h3 className="partner-caption">Offices and field units</h3>
                <div className="presence-locations">
                  {FIELD_LOCATIONS.map((loc) => (
                    <div key={loc.name} className="presence-location">
                      {/*
                        The name and its type label are stacked rows, not two
                        inline spans in a bare <div>. As inline elements they
                        sat on one line and collided — "LAYA Resource
                        CentreHEADQUARTERS" — because the source newline
                        between them collapses to nothing at render time.
                      */}
                      <div className="presence-location__head">
                        <span className="presence-location__name">
                          {loc.name}
                        </span>
                        <span className="presence-location__type">
                          {loc.type}
                        </span>
                      </div>
                      <p className="presence-location__meta">
                        {loc.district} · {loc.pincode}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="trust-actions">
              <EditorialLink to={ROUTES.aboutWhereWeWork}>
                Where we work
              </EditorialLink>
              <EditorialLink to={ROUTES.stories}>
                Stories from the field
              </EditorialLink>
            </div>
          </div>
        </section>

        {/* ---- Transparency pointer -------------------------------------- */}
        <section className="trust-band trust-band--sunken">
          <div className="trust-header__inner">
            <header className="trust-heading">
              <p className="type-eyebrow">Accountability</p>
              <h2 className="trust-heading__title">
                How these figures are reported
              </h2>
              <p className="trust-heading__intro">
                LAYA publishes its governance structure, FCRA compliance details
                and foreign contribution disclosures in full.
              </p>
            </header>

            <div className="trust-actions">
              <EditorialLink to={ROUTES.aboutGovernance}>
                Governance
              </EditorialLink>
              <EditorialLink to={ROUTES.aboutFinancialReports}>
                Foreign contribution reports
              </EditorialLink>
              <EditorialLink to={ROUTES.aboutFcraInformation}>
                FCRA information
              </EditorialLink>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Impact;
