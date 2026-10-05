import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import {
  PROGRAMME_CATEGORIES,
  getRelatedProgrammes,
  type Programme,
} from "@/content/programmes";

interface ProgrammeDetailProps {
  programme: Programme;
}

/**
 * Reusable programme detail layout.
 *
 * SECTION ORDER (as specified)
 *   Hero → Overview + context → alternating narrative sections → Key outcomes
 *   → Related programmes → CTA
 *
 * PHOTOGRAPHY HONESTY
 *   Each programme has exactly ONE real photograph in the repository. Rather
 *   than repeat it in every section (which reads as a mistake) or substitute
 *   stock imagery (forbidden), the photograph is used once — large, as the
 *   hero — and the narrative sections are typographic. Sections that carry an
 *   explicit `image` in the source render it; the rest are set as reading
 *   matter with rules and whitespace. This is stated in the report.
 */
export const ProgrammeDetail = ({ programme }: ProgrammeDetailProps) => {
  useRevealOnScroll();

  const category = PROGRAMME_CATEGORIES.find((c) => c.id === programme.category);
  const related = getRelatedProgrammes(programme, 2);

  return (
    <>
      <Helmet>
        <title>{programme.title} | LAYA</title>
        <meta name="description" content={programme.summary} />
        <link rel="canonical" href={`https://laya.org.in${programme.to}`} />
      </Helmet>

      <MainLayout>
        {/* ---- Hero ------------------------------------------------------- */}
        <header className="prog-header">
          <div className="prog-header__inner">
            <p className="prog-header__eyebrow type-eyebrow">Our work</p>
            <h1 className="prog-header__title">{programme.title}</h1>
            <p className="prog-header__lead">{programme.summary}</p>
          </div>
        </header>

        <figure>
          <div className="prog-detail__hero">
            <img
              src={programme.image}
              alt={programme.imageAlt}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <figcaption className="prog-detail__hero-caption">
            {programme.imageAlt}
          </figcaption>
        </figure>

        {/* ---- Overview + context ---------------------------------------- */}
        <section className="prog-band">
          <div className="container-page">
            {/*
              These three are LABELS on a definition list, not headings. Using
              <h2> here would add three meaningless entries to the document
              outline between the page h1 and the first real section heading.
            */}
            <dl className="prog-context reveal">
              <div>
                <dt className="prog-context__label">Thematic area</dt>
                <dd className="prog-context__value">{category?.label ?? "Our work"}</dd>
              </div>
              <div>
                <dt className="prog-context__label">The challenge</dt>
                <dd className="prog-context__value">{programme.issue}</dd>
              </div>
              <div>
                <dt className="prog-context__label">Reach and context</dt>
                <dd className="prog-context__value">{programme.context}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ---- Narrative: alternating sections --------------------------- */}
        <section className="prog-band prog-band--warm">
          <div className="container-page">
            <header className="prog-heading">
              <p className="type-eyebrow">What LAYA does</p>
              <h2 className="prog-heading__title">Field practice and interventions</h2>
            </header>

            {programme.sections.map((section, i) => {
              const hasImage = Boolean(section.image);
              const reverse = i % 2 === 1;

              return (
                <div
                  key={section.heading}
                  className={`prog-section ${reverse ? "prog-section--reverse" : ""} ${
                    hasImage ? "" : "prog-section--text-only"
                  } reveal`}
                >
                  <div>
                    <h3 className="prog-section__title">{section.heading}</h3>
                    {section.paragraph && <p className="prog-section__body">{section.paragraph}</p>}
                    {section.bullets && (
                      <ul
                        className={`prog-list ${
                          section.bullets.length > 4 ? "prog-list--two" : ""
                        }`}
                      >
                        {section.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Only render a media column when the source supplies an
                      image for this section, so the grid never collapses to an
                      empty half. */}
                  {hasImage && (
                    <div className="prog-section__media">
                      <img src={section.image} alt="" loading="lazy" decoding="async" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ---- Key outcomes ---------------------------------------------- */}
        <section className="prog-band">
          <div className="container-page">
            <header className="prog-heading">
              <p className="type-eyebrow">Key outcomes</p>
              <h2 className="prog-heading__title">What this work has achieved</h2>
            </header>

            <div className="outcome-grid reveal">
              {programme.outcomes.map((outcome) => (
                <p key={outcome} className="outcome">
                  {outcome}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Related programmes ---------------------------------------- */}
        <section className="prog-band prog-band--sunken">
          <div className="container-page">
            <header className="prog-heading">
              <p className="type-eyebrow">Related work</p>
              <h2 className="prog-heading__title">Other programme areas</h2>
            </header>

            <div className="related-grid reveal">
              {related.map((r) => {
                const rCat = PROGRAMME_CATEGORIES.find((c) => c.id === r.category);
                return (
                  <Link key={r.id} to={r.to} className="related">
                    <span className="related__category">{rCat?.label}</span>
                    {/* A heading INSIDE a link is valid and gives the link a
                        concise accessible name from its own text. */}
                    <h3 className="related__title">{r.title}</h3>
                    <span className="related__summary">{r.summary}</span>
                  </Link>
                );
              })}
            </div>

            <div className="prog-actions">
              <EditorialLink to={ROUTES.programs}>All programmes</EditorialLink>
              <EditorialLink to={ROUTES.impact}>Our impact</EditorialLink>
            </div>
          </div>
        </section>

        {/* ---- CTA -------------------------------------------------------- */}
        <section className="prog-band">
          <div className="container-page">
            <header className="prog-heading">
              <p className="type-eyebrow">Support LAYA</p>
              <h2 className="prog-heading__title">Support this work</h2>
              <p className="prog-heading__intro">
                Contributions support rights work, health care, sustainable livelihoods, learning
                and climate resilience with Adivasi communities across the Eastern Ghats.
              </p>
            </header>

            <div className="prog-actions">
              <Button asChild size="lg">
                <Link to={ROUTES.donate}>
                  Donate
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to={ROUTES.contact}>Contact us</Link>
              </Button>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default ProgrammeDetail;
