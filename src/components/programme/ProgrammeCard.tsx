import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Programme } from "@/content/programmes";
import { scrollPageToTop } from "@/lib/scrollRoot";

interface ProgrammeCardProps {
  programme: Programme;
  /** Alternate the photograph side, so a run of cards reads as a spread. */
  reverse?: boolean;
  /** Show the category label (hidden inside a category group, where it repeats). */
  showCategory?: boolean;
}

/**
 * A single editorial programme record.
 *
 * Layout is a wide horizontal spread — documentary photograph on one side, the
 * programme's name, one-sentence explanation, key issue and context on the
 * other. It is deliberately not a small uniform tile: the brief asks for a
 * directory that reads like field documentation, so each record gets room.
 *
 * The whole record is one link target, but the heading carries the accessible
 * name via aria-labelledby rather than a concatenated aria-label, so screen
 * readers announce the programme name rather than a 300-character sentence.
 */
export const ProgrammeCard = ({
  programme,
  reverse = false,
  showCategory = false,
}: ProgrammeCardProps) => {
  const headingId = `prog-${programme.id}-title`;

  return (
    <article className={`prog-card ${reverse ? "prog-card--reverse" : ""}`}>
      <div className="prog-card__media">
        <img
          src={programme.image}
          alt={programme.imageAlt}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div>
        {showCategory && (
          <span className="prog-card__category">{programme.shortTitle}</span>
        )}

        <h3 className="prog-card__title" id={headingId}>
          <Link
            to={programme.to}
            onClick={() => scrollPageToTop()}
            aria-describedby={`${headingId}-s`}
          >
            {programme.title}
          </Link>
        </h3>

        <p className="prog-card__summary" id={`${headingId}-s`}>
          {programme.summary}
        </p>

        <div className="prog-card__facts">
          <div className="prog-card__fact">
            <span className="prog-card__fact-label">Key issue</span>
            <span className="prog-card__fact-value">{programme.issue}</span>
          </div>
          <div className="prog-card__fact">
            <span className="prog-card__fact-label">Where</span>
            <span className="prog-card__fact-value">{programme.context}</span>
          </div>
        </div>

        <div className="prog-card__footer">
          <div className="prog-card__metric">
            <span className="prog-card__metric-value">
              {programme.metric.value}
            </span>
            <span className="prog-card__metric-label">
              {programme.metric.label}
            </span>
          </div>

          <Link
            to={programme.to}
            onClick={() => scrollPageToTop()}
            className="editorial-link"
            aria-hidden="true"
            tabIndex={-1}
          >
            Learn more
            <ArrowRight className="editorial-link__arrow" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProgrammeCard;
