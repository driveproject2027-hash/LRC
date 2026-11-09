import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, BookOpen, Clock, Compass } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import {
  STORIES_HEADING,
  getFieldNoteBySlug,
  getRelatedNotes,
  type FieldNote,
} from "@/content/stories";
import { useWebsiteContent } from "@/context/ContentContext";

/** Capability-driven section wrapper. Renders nothing when unavailable. */
const IfAvailable = ({
  when,
  children,
}: {
  when: boolean;
  children: React.ReactNode;
}) => (when ? <>{children}</> : null);

/** Formats the ISO date held in the source record into an editorial string. */
const formatDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * FIELD NOTE DETAIL — Editorial Storytelling View
 * ---------------------------------------------------------------------------
 * READABILITY & ARCHITECTURE:
 *   - Clear title and introductory excerpt with balanced line measures.
 *   - Generous reading container (max-w-3xl / 44rem) with serif body typography.
 *   - Verified categories, publication dates, and author unit attribution.
 *   - Ethical disclosure badges on illustrative photography.
 *   - Direct relationship to LAYA's core programme areas.
 *   - Continued reading grid with related field records.
 *   - Honest archival framing stating word count and Resource Centre links.
 */
const FieldNoteDetail = ({ note }: { note: FieldNote }) => {
  const relatedNotes = getRelatedNotes(note.slug, 2);

  return (
    <>
      <Helmet>
        <title>{note.title} | LAYA Field Notes</title>
        <meta name="description" content={note.excerpt} />
        <link rel="canonical" href={`https://laya.org.in/stories/${note.slug}`} />
      </Helmet>

      <MainLayout>
        {/* ---- Editorial Header & Metadata -------------------------------- */}
        <header className="arc-header">
          <div className="arc-header__inner">
            <nav className="flex flex-wrap items-center gap-2 mb-3" aria-label="Breadcrumb">
              <Link
                to={ROUTES.stories}
                className="arc-header__eyebrow type-eyebrow hover:text-primary transition-colors"
              >
                Field Notes
              </Link>
              <span className="text-muted-foreground text-xs" aria-hidden="true">/</span>
              <span className="note-tag">{note.category}</span>
            </nav>

            <h1 className="arc-header__title">{note.title}</h1>

            <div className="note-detail__reading-meta">
              <span className="font-sans text-xs font-semibold text-foreground">
                {note.author}
              </span>
              <span className="arc-meta__sep">·</span>
              <time dateTime={note.date} className="text-xs font-mono text-muted-foreground">
                {formatDate(note.date)}
              </time>
              <span className="arc-meta__sep">·</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <Clock className="h-3 w-3" aria-hidden="true" />
                1 min read · Archival record
              </span>
            </div>
          </div>
        </header>

        {/* ---- Editorial Hero Photograph ---------------------------------- */}
        <IfAvailable when={note.available.heroImage}>
          <div className="container-page" style={{ paddingTop: 0, paddingBottom: "var(--space-2xl)" }}>
            <figure className="editorial-hero-figure">
              <div className="note-detail__hero editorial-hero-media">
                <img
                  src={note.image}
                  alt={note.imageAlt || note.title}
                  decoding="async"
                  fetchpriority="high"
                />
              </div>
              {note.imageCaption && (
                <figcaption className="editorial-caption">
                  <span>{note.imageCaption}</span>
                  {note.imageDisclosure && (
                    <span className="editorial-caption__badge">
                      {note.imageDisclosure}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          </div>
        </IfAvailable>

        {/* ---- Story Reading Container (Introductory lead & body) ---------- */}
        <main className="container-page" style={{ paddingTop: 0, paddingBottom: "var(--space-lg)" }}>
          <div className="max-w-[44rem] mx-auto">
            {/* Introductory text */}
            <div className="note-detail__intro">
              <p>{note.excerpt}</p>
            </div>

            {/* Verbatim Body Record */}
            <div className="note-detail__body" style={{ paddingInline: 0 }}>
              {Array.isArray(note.body) ? (
                note.body.map((para: string, idx: number) => (
                  <p key={idx} className="note-detail__text mb-4">
                    {para}
                  </p>
                ))
              ) : typeof note.body === "string" && note.body.includes("\n") ? (
                note.body.split(/\n\s*\n/).filter(Boolean).map((para: string, idx: number) => (
                  <p key={idx} className="note-detail__text mb-4">
                    {para}
                  </p>
                ))
              ) : (
                <p className="note-detail__text">{note.body}</p>
              )}
            </div>
          </div>
        </main>

        {/* ---- Related Programme Accompaniment Card ------------------------ */}
        <IfAvailable when={note.available.relatedProgramme && Boolean(note.relatedProgramme)}>
          <div className="container-page" style={{ paddingTop: 0 }}>
            <aside
              className="note-programme-card reveal"
              aria-labelledby="related-programme-heading"
            >
              <p className="note-programme-card__eyebrow">
                <Compass className="inline-block h-3.5 w-3.5 mr-1" aria-hidden="true" />
                Related Programme Area
              </p>
              <h2 id="related-programme-heading" className="note-programme-card__title">
                {note.relatedProgramme.title}
              </h2>
              <p className="note-programme-card__desc">
                {note.relatedProgramme.description}
              </p>
              <EditorialLink to={note.relatedProgramme.to}>
                Explore {note.relatedProgramme.title}
              </EditorialLink>
            </aside>
          </div>
        </IfAvailable>

        {/* ---- Honest Archival Framing ------------------------------------ */}
        <div className="note-detail__framing">
          <div className="note-detail__framing-inner">
            <p>
              This is a field note of {note.wordCount} words — a brief record rather than a full
              article. {STORIES_HEADING.framing}
            </p>
          </div>
        </div>

        {/* ---- Related Stories Grid (Continue reading) --------------------- */}
        {relatedNotes.length > 0 && (
          <section className="note-related-section" aria-labelledby="related-stories-heading">
            <div className="container-page">
              <div className="note-related-header">
                <p className="note-related-header__eyebrow">Continue Reading</p>
                <h2 id="related-stories-heading" className="note-related-header__title">
                  More from Field Notes
                </h2>
              </div>

              <div className="note-grid">
                {relatedNotes.map((rel) => (
                  <article key={rel.id} className="note-card reveal">
                    <Link
                      to={`/stories/${rel.slug}`}
                      className="note-card__media group block"
                      aria-label={`Read field note: ${rel.title}`}
                    >
                      <img
                        src={rel.image}
                        alt={rel.imageAlt || rel.title}
                        loading="lazy"
                        decoding="async"
                      />
                      {rel.imageDisclosure && (
                        <span
                          className="editorial-caption__badge absolute bottom-2 right-2 z-10"
                          style={{ backgroundColor: "rgba(252, 251, 248, 0.95)" }}
                        >
                          {rel.imageDisclosure}
                        </span>
                      )}
                    </Link>

                    <div className="note-card__body">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="note-tag">{rel.category}</span>
                        <span className="text-xs text-muted-foreground font-mono">
                          <time dateTime={rel.date}>{formatDate(rel.date)}</time>
                        </span>
                      </div>

                      <div className="arc-meta">
                        <span className="font-sans text-xs font-medium text-foreground">
                          {rel.author}
                        </span>
                      </div>

                      <h3 className="note-card__title">
                        <Link to={`/stories/${rel.slug}`}>{rel.title}</Link>
                      </h3>

                      <p className="note-card__excerpt">{rel.excerpt}</p>

                      <div className="note-card__footer">
                        <EditorialLink to={`/stories/${rel.slug}`}>
                          Read field note
                        </EditorialLink>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---- Navigation Band -------------------------------------------- */}
        <section className="arc-band">
          <div className="arc-header__inner">
            <div className="prog-actions" style={{ marginTop: 0 }}>
              <Link to={ROUTES.stories} className="editorial-link">
                <ArrowLeft className="editorial-link__arrow" aria-hidden="true" />
                All field notes
              </Link>
              <EditorialLink to={STORIES_HEADING.resourceCta.to}>
                <BookOpen className="inline-block h-3.5 w-3.5 mr-1" aria-hidden="true" />
                {STORIES_HEADING.resourceCta.label}
              </EditorialLink>
              <EditorialLink to={ROUTES.programs}>
                Our work
              </EditorialLink>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

/**
 * Route entry: /stories/:slug
 * Falls back to a clear notice for an unknown slug rather than rendering the
 * wrong note.
 */
const StoryDetail = () => {
  useRevealOnScroll();
  const { slug } = useParams<{ slug: string }>();
  const { content } = useWebsiteContent();

  const dynamicStory = slug ? content.stories?.find((s) => s.slug === slug) : undefined;
  const defaultStory = slug ? getFieldNoteBySlug(slug) : undefined;
  const note = dynamicStory
    ? ({
        ...(defaultStory || {
          id: dynamicStory.slug,
          category: "Field Notes",
          categorySlug: "rights",
          image: "/src/assets/hero-adivasi.webp",
          imageAlt: dynamicStory.title,
          imageCaption: dynamicStory.title,
        }),
        ...dynamicStory,
      } as FieldNote)
    : defaultStory;

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

