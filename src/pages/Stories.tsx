import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import {
  BODY_WORD_RANGE,
  FIELD_NOTES,
  FIELD_NOTE_COUNT,
  STORIES_HEADING,
} from "@/content/stories";

/**
 * FIELD NOTES  →  /stories
 * ---------------------------------------------------------------------------
 * Replaces the previous generic three-up card grid.
 *
 * HONEST FRAMING
 *   The three records held in the repository have bodies of 21–33 words. They
 *   are presented as FIELD NOTES and labelled as such, with an explicit
 *   statement of what they are and where fuller documentation lives. They are
 *   NOT dressed up as long-form articles, and no content was invented to fill
 *   the designed layout.
 *
 * LAYOUT
 *   A lead note, then a ruled sequence — editorial and archival, not blog cards.
 *   Each note shows only fields that exist: title, publisher attribution and
 *   date. No category, location, author identity, programme or resource links
 *   are shown, because the source has none.
 */
const Stories = () => {
  useRevealOnScroll();

  const [lead, ...rest] = FIELD_NOTES;

  return (
    <>
      <Helmet>
        <title>Field Notes | LAYA</title>
        <meta
          name="description"
          content="Short field notes from LAYA's work with Adivasi communities in the Eastern Ghats."
        />
        <link rel="canonical" href="https://laya.org.in/stories" />
      </Helmet>

      <MainLayout>
        {/* ---- Header ---------------------------------------------------- */}
        <header className="arc-header">
          <div className="arc-header__inner">
            <p className="arc-header__eyebrow type-eyebrow">
              {STORIES_HEADING.eyebrow}
            </p>
            <h1 className="arc-header__title">{STORIES_HEADING.title}</h1>
            <p className="arc-header__lead">{STORIES_HEADING.lead}</p>

            <dl className="arc-header__stats">
              <div>
                <dd className="arc-stat__value">{FIELD_NOTE_COUNT}</dd>
                <dt className="arc-stat__label">Field notes</dt>
              </div>
              <div>
                <dd className="arc-stat__value">
                  {BODY_WORD_RANGE.min}–{BODY_WORD_RANGE.max}
                </dd>
                <dt className="arc-stat__label">Words per note</dt>
              </div>
            </dl>
          </div>
        </header>

        {/* ---- What these are ------------------------------------------- */}
        <section className="arc-band arc-band--warm">
          <div className="arc-header__inner">
            <p className="arc-note" style={{ marginTop: 0 }}>
              {STORIES_HEADING.framing}
            </p>
          </div>
        </section>

        {/* ---- Lead note ------------------------------------------------- */}
        <section className="arc-band">
          <div className="arc-header__inner">
            <article className="note-lead reveal">
              <Link
                to={`/stories/${lead.slug}`}
                className="note-lead__media"
                aria-label={`Read field note: ${lead.title}`}
              >
                <img src={lead.image} alt="" loading="eager" decoding="async" />
              </Link>

              <div>
                <div className="arc-meta">
                  <span>{lead.author}</span>
                  <span className="arc-meta__sep">·</span>
                  <time dateTime={lead.date}>
                    {new Date(lead.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>

                <h2 className="note-lead__title">
                  <Link to={`/stories/${lead.slug}`}>{lead.title}</Link>
                </h2>

                <p className="note-lead__body">{lead.body}</p>

                <div className="prog-actions">
                  <EditorialLink to={`/stories/${lead.slug}`}>
                    Read note
                  </EditorialLink>
                </div>
              </div>
            </article>

            {/* ---- Remaining notes --------------------------------------- */}
            {rest.length > 0 && (
              <div className="note-list">
                {rest.map((note) => (
                  <article key={note.id} className="note-item reveal">
                    <Link
                      to={`/stories/${note.slug}`}
                      className="note-item__media"
                      aria-label={`Read field note: ${note.title}`}
                    >
                      <img
                        src={note.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>

                    <div>
                      <div className="arc-meta">
                        <span>{note.author}</span>
                        <span className="arc-meta__sep">·</span>
                        <time dateTime={note.date}>
                          {new Date(note.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
                      </div>

                      <h2 className="note-item__title">
                        <Link to={`/stories/${note.slug}`}>{note.title}</Link>
                      </h2>

                      <p className="note-item__body">{note.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* ---- Where fuller documentation lives ---------------------- */}
            <p className="arc-note">
              LAYA's longer documentation — research, case studies and reports —
              is published in the Resource Centre.
            </p>

            <div className="prog-actions">
              <EditorialLink to={STORIES_HEADING.resourceCta.to}>
                {STORIES_HEADING.resourceCta.label}
              </EditorialLink>
              <EditorialLink to={ROUTES.gallery}>Visual archive</EditorialLink>
              <EditorialLink to={ROUTES.programs}>Our work</EditorialLink>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Stories;
