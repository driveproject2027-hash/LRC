import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";
import { ProgrammeCard } from "@/components/programme/ProgrammeCard";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import {
  CROSS_CUTTING_APPROACHES,
  DIRECTORY_STATS,
  PROGRAMMES,
  PROGRAMME_CATEGORIES,
} from "@/content/programmes";

/**
 * OUR WORK / WHAT WE DO — programme directory
 * ---------------------------------------------------------------------------
 * Replaces the previous three-column card grid.
 *
 * Programmes are grouped under the thematic categories that genuinely exist,
 * and each group is a run of wide editorial records with the photograph
 * alternating sides — a documentary index rather than a product feature grid.
 *
 * All content comes from `src/content/programmes.ts`, sourced from LAYA's
 * existing programme pages. No programme is invented. See the scope note at the
 * top of that file for which suggested categories could not be built and why.
 */
const Programs = () => {
  useRevealOnScroll();

  return (
    <>
      <Helmet>
        <title>Our Work | LAYA</title>
        <meta
          name="description"
          content="LAYA's programme areas with Adivasi communities in the Eastern Ghats: rights and entitlements, livelihoods and natural resources, health, education, and climate."
        />
        <link rel="canonical" href="https://laya.org.in/programs" />
      </Helmet>

      <MainLayout>
        {/* ---- Directory header ------------------------------------------ */}
        <header className="prog-header">
          <div className="prog-header__inner">
            <p className="prog-header__eyebrow type-eyebrow">What we do</p>
            <h1 className="prog-header__title">Our work</h1>
            <p className="prog-header__lead">
              LAYA's work is interdependent: rights secure land, land sustains
              livelihoods, livelihoods shape health and learning, and all of it
              is bounded by the climate of the Eastern Ghats.
            </p>

            <dl className="prog-header__stats">
              <div>
                <dd className="prog-stat__value">
                  {DIRECTORY_STATS.programmeCount}
                </dd>
                <dt className="prog-stat__label">Programme areas</dt>
              </div>
              <div>
                <dd className="prog-stat__value">
                  {DIRECTORY_STATS.categoryCount}
                </dd>
                <dt className="prog-stat__label">Thematic groups</dt>
              </div>
              <div>
                <dd className="prog-stat__value">1985</dd>
                <dt className="prog-stat__label">Working since</dt>
              </div>
            </dl>
          </div>
        </header>

        {/* ---- The directory --------------------------------------------- */}
        <section className="prog-band">
          <div className="container-page">
            {PROGRAMME_CATEGORIES.map((category, ci) => {
              const programmes = PROGRAMMES.filter(
                (p) => p.category === category.id,
              );
              if (programmes.length === 0) return null;

              return (
                <section key={category.id} className="prog-category">
                  <header className="prog-category__header">
                    <span className="prog-category__index">
                      {String(ci + 1).padStart(2, "0")}
                    </span>
                    <h2 className="prog-category__name">{category.label}</h2>
                    <p className="prog-category__blurb">{category.blurb}</p>
                  </header>

                  {programmes.map((programme, pi) => (
                    <ProgrammeCard
                      key={programme.id}
                      programme={programme}
                      reverse={pi % 2 === 1}
                    />
                  ))}
                </section>
              );
            })}
          </div>
        </section>

        {/* ---- Cross-cutting approaches ----------------------------------
            Suggested as categories in the brief, but not programmes: they are
            LAYA's method, running through all five. Presented as approaches. */}
        <section className="prog-band prog-band--warm">
          <div className="container-page">
            <header className="prog-heading">
              <p className="type-eyebrow">How the work is carried</p>
              <h2 className="prog-heading__title">Cross-cutting approaches</h2>
              <p className="prog-heading__intro">
                Two themes run through every programme area rather than sitting
                as programmes of their own.
              </p>
            </header>

            <div className="approach-grid reveal">
              {CROSS_CUTTING_APPROACHES.map((approach) => (
                <div key={approach.title} className="approach">
                  <h3 className="approach__title">{approach.title}</h3>
                  <p className="approach__desc">{approach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Where this happens + onward links -------------------------- */}
        <section className="prog-band">
          <div className="container-page">
            <header className="prog-heading">
              <p className="type-eyebrow">Where we work</p>
              <h2 className="prog-heading__title">Across the Eastern Ghats</h2>
              <p className="prog-heading__intro">
                Field and resource work is centred in Andhra Pradesh, across
                tribal agency areas and district-level partnerships with Adivasi
                communities.
              </p>
            </header>

            <div className="prog-actions">
              <EditorialLink to={ROUTES.aboutWhereWeWork}>
                Where we work
              </EditorialLink>
              <EditorialLink to={ROUTES.impact}>Our impact</EditorialLink>
              <EditorialLink to={ROUTES.publications}>
                Publications
              </EditorialLink>
              <EditorialLink to={ROUTES.contact}>Get in touch</EditorialLink>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Programs;
