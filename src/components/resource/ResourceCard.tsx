import { Download, ExternalLink, FileText } from "lucide-react";
import { hasDocument, type Resource } from "@/content/resources";

interface ResourceCardProps {
  resource: Resource;
  /** Hide the type chip inside a group where the type is already stated. */
  showType?: boolean;
}

/**
 * A single document record in the Resource Centre.
 *
 * Displays, per the brief: type, year, title, short description, and two
 * explicit actions — View and Download.
 *
 * METADATA HONESTY
 *   `year` is `null` for most records because the source data contains no
 *   publication dates. When it is null the year is OMITTED rather than guessed.
 *   See the note in src/content/resources.ts.
 *
 * DOCUMENT AVAILABILITY
 *   3 of the 33 records have no PDF (their source link is "#"). Those render as
 *   visibly unavailable records with disabled actions — the document stays
 *   discoverable in the library without pretending it can be opened.
 *
 * ACCESSIBILITY
 *   - Actions are real <a>/<button> elements with accessible names.
 *   - The cover image is decorative (alt="") because the title is adjacent text;
 *     an aria-label on the image would duplicate the announcement.
 *   - "View" opens in a new tab; "Download" forces the browser download for
 *     hosts that support it, falling back to a normal navigation.
 */
export const ResourceCard = ({
  resource,
  showType = true,
}: ResourceCardProps) => {
  const available = hasDocument(resource);

  return (
    <article className={`res-card ${available ? "" : "res-card--unavailable"}`}>
      <div className="res-card__cover">
        <span
          className={`res-card__badge ${available ? "" : "res-card__badge--unavailable"}`}
          aria-hidden="true"
        >
          <FileText className="h-3 w-3" aria-hidden="true" />
          {resource.type}
        </span>

        {/* The cover IS the document artwork, so it is shown whole (`contain`)
            rather than cropped. Decorative — the title follows as text. */}
        <img src={resource.image} alt="" loading="lazy" decoding="async" />
      </div>

      <div className="res-card__body">
        {(showType || resource.year !== null) && (
          <div className="res-card__meta">
            {showType && (
              <span className="res-card__type">{resource.type}</span>
            )}
            {/* Year only where the source actually states one. */}
            {resource.year !== null && (
              <span className="res-card__year">{resource.year}</span>
            )}
          </div>
        )}

        <h3 className="res-card__title">
          {available ? (
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              {resource.title}
            </a>
          ) : (
            resource.title
          )}
        </h3>

        <p className="res-card__desc">{resource.description}</p>

        {resource.context && (
          <div className="res-card__context">
            <p>{resource.context}</p>
          </div>
        )}

        <div className="res-card__actions">
          {available ? (
            <>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="res-action res-action--primary"
                aria-label={`View ${resource.title} (opens PDF in a new tab)`}
              >
                <ExternalLink className="res-action__icon" aria-hidden="true" />
                View
              </a>
              <a
                href={resource.link}
                download
                className="res-action"
                aria-label={`Download ${resource.title}`}
              >
                <Download className="res-action__icon" aria-hidden="true" />
                Download
              </a>
            </>
          ) : (
            <>
              <span className="res-action" aria-disabled="true">
                <ExternalLink className="res-action__icon" aria-hidden="true" />
                View
              </span>
              <span className="res-action" aria-disabled="true">
                <Download className="res-action__icon" aria-hidden="true" />
                Download
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default ResourceCard;
