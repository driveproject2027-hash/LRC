import { AlertCircle, Download, ExternalLink, FileText } from "lucide-react";
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

  const displayDate = resource.date ?? (resource.year !== null ? String(resource.year) : null);

  return (
    <article className={`res-card ${available ? "" : "res-card--unavailable"}`}>
      <div className="res-card__cover">
        <span
          className={`res-card__badge ${available ? "" : "res-card__badge--unavailable"}`}
          aria-hidden="true"
        >
          <FileText className="h-3 w-3" aria-hidden="true" />
          {available ? resource.type : `${resource.type} · Not Digitized`}
        </span>

        {/* The cover IS the document artwork, so it is shown whole (`contain`)
            rather than cropped, preserving natural portrait proportions. */}
        <img src={resource.image} alt="" loading="lazy" decoding="async" />
      </div>

      <div className="res-card__body">
        {(showType || resource.sourceCategory || displayDate || !available) && (
          <div className="res-card__meta">
            {showType && (
              <span className="res-card__type">{resource.type}</span>
            )}
            {/* Concise category label */}
            {resource.sourceCategory && (
              <span className="res-card__category">{resource.sourceCategory}</span>
            )}
            {/* Verified publication date or year where available */}
            {displayDate && (
              <span className="res-card__year res-card__date">{displayDate}</span>
            )}
            {!available && (
              <span
                className="inline-flex items-center gap-1 text-[0.6875rem] font-medium text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-none border border-amber-300"
                role="status"
              >
                <AlertCircle className="h-3 w-3 text-amber-700 flex-shrink-0" aria-hidden="true" />
                Digital copy unavailable
              </span>
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
                <span className="hidden sm:inline">View publication</span>
                <span className="sm:hidden">View</span>
              </a>
              <a
                href={resource.link}
                download
                className="res-action"
                aria-label={`Download ${resource.title}`}
              >
                <Download className="res-action__icon" aria-hidden="true" />
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </a>
            </>
          ) : (
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2.5 py-0.5 sm:py-1">
              <div
                className="flex items-center gap-1.5 text-[0.6875rem] sm:text-xs text-amber-900 bg-amber-50/90 border border-amber-200 rounded-none px-2 py-1 font-medium leading-tight"
                role="status"
              >
                <AlertCircle className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" aria-hidden="true" />
                <span>Physical archive only — digital PDF not yet available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="res-action"
                  aria-disabled="true"
                  title="Digital copy not yet digitized"
                >
                  <ExternalLink className="res-action__icon" aria-hidden="true" />
                  <span className="hidden sm:inline">View publication</span>
                  <span className="sm:hidden">View</span>
                </span>
                <span
                  className="res-action"
                  aria-disabled="true"
                  title="Digital copy not yet digitized"
                >
                  <Download className="res-action__icon" aria-hidden="true" />
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ResourceCard;
