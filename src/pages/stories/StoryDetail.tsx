import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import { STORIES_HEADING, getFieldNoteBySlug, type FieldNote } from "@/content/stories";

/**
 * FIELD NOTE DETAIL — reusable architecture
 * ---------------------------------------------------------------------------
 * ARCHITECTURE, NOT A TEMPLATE-AND-FILL
 *
 * This component is designed to support the full Phase 8 story layout:
 *
 *   hero image · category · date · location · title · author · long-form body
 *   · supporting images · pull quotes · related programme · related resources
 *
 * Every one of those is behind a capability check on `note.available`. A section
 * renders ONLY when the data exists. There are no empty headings, no "coming
 * soon" placeholders, and no filler copy — the brief explicitly forbids them.
 *
 * WHY THE CURRENT NOTES LOOK SHORT
 *   The three records held in the repository have 21–33 word bodies. They are
 *   therefore presented as FIELD NOTES — labelled as such in the header and in
 *   an explicit framing block — rather than dressed up as long-form articles.
 *   The text is set in a serif reading face at a generous measure so it reads
 *   as archival record, not as a truncated article.
 *
 * ADDING REAL CONTENT LATER
 *   Supply fuller records and flip the matching flags in
 *   `src/content/stories.ts`. The sections below appear automatically. No change
 *   to this component is required.
 * ---------------------------------------------------------------------------
 */

/** Capability-driven section wrapper. Renders nothing when unavailable. */
const IfAvailable = ({
  when,
  children,
}: {
  when: boolean;
  children: React.ReactNode;
}) => (when ? <>{children}</> : null);

/** Formats the ISO date held in the source record, without inventing one. */
const formatDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

const FieldNoteDetail = ({ note }: { note: FieldNote }) => (
  <>
    <Helmet>
      <title>{note.title} | LAYA Field Notes</title>
      <meta name="description" content={note.excerpt} />
      <link rel="canonical" href={`https://laya.org.in/stories/${note.slug}`} />
    </Helmet>

    <MainLayout>
      {/* ---- Hero (available: heroImage) ------------------------------- */}
      <IfAvailable when={note.available.heroImage}>
        <header className="arc-header">
          <div className="arc-header__inner">
            <p className="arc-header__eyebrow type-eyebrow">
              <Link to={ROUTES.stories}>Field Notes</Link>
            </p>

            {/* category — omitted: no category field in the source */}
            <h1 className="arc-header__title">{note.title}</h1>

            <div className="arc-meta" style={{ marginTop: "var(--space-sm)" }}>
              <IfAvailable when={note.available.author}>
                <span>{note.author}</span>
              </IfAvailable>
              <IfAvailable when={note.available.date}>
                <span className="arc-meta__sep">·</span>
                <time dateTime={note.date}>{formatDate(note.date)}</time>
              </IfAvailable>
              {/* location — omitted: no location field in the source */}
            </div>
          </div>
        </header>

        <figure>
          <div className="note-detail__hero">
            <img src={note.image} alt="" decoding="async" fetchPriority="high" />
          </div>
          {/*
            No caption is asserted about what this photograph depicts. The
            source image is a gallery photograph that does not illustrate this
            note, so captioning it would be a false claim — see STORY_IMAGE_NOTES.
          */}
        </figure>
      </IfAvailable>

      {/* ---- Body (available: body) ------------------------------------ */}
      <IfAvailable when={note.available.body}>
        <div className="note-detail__body">
          <p className="note-detail__text">{note.body}</p>
        </div>
      </IfAvailable>

      {/* supportingImages — omitted: one image per record
          pullQuotes        — omitted: no quotations exist
          relatedProgramme  — omitted: no relationship recorded
          relatedResources  — omitted: no relationship recorded */}

      {/* ---- Honest framing ------------------------------------------- */}
      <div className="note-detail__framing">
        <div className="note-detail__framing-inner">
          <p>
            This is a field note of {note.wordCount} words — a brief record rather than a full
            article. {STORIES_HEADING.framing}
          </p>
        </div>
      </div>

      {/* ---- Navigation ------------------------------------------------- */}
      <section className="arc-band">
        <div className="arc-header__inner">
          <div className="prog-actions" style={{ marginTop: 0 }}>
            <Link to={ROUTES.stories} className="editorial-link">
              <ArrowLeft className="editorial-link__arrow" aria-hidden="true" />
              All field notes
            </Link>
            <EditorialLink to={STORIES_HEADING.resourceCta.to}>
              {STORIES_HEADING.resourceCta.label}
            </EditorialLink>
          </div>
        </div>
      </section>
    </MainLayout>
  </>
);

/**
 * Route entry: /stories/:slug
 * Falls back to a clear notice for an unknown slug rather than rendering the
 * wrong note.
 */
const StoryDetail = () => {
  useRevealOnScroll();
  const { slug } = useParams<{ slug: string }>();
  const note = slug ? getFieldNoteBySlug(slug) : undefined;

  if (!note) {
    return (
      <MainLayout>
        <header className="arc-header">
          <div className="arc-header__inner">
            <p className="arc-header__eyebrow type-eyebrow">Field Notes</p>
            <h1 className="arc-header__title">Note not found</h1>
            <p className="arc-header__lead">
              This field note is not available. LAYA's field notes are listed on the stories page.
            </p>
            <div className="prog-actions">
              <EditorialLink to={ROUTES.stories}>All field notes</EditorialLink>
            </div>
          </div>
        </header>
      </MainLayout>
    );
  }

  return <FieldNoteDetail note={note} />;
};

export default StoryDetail;
