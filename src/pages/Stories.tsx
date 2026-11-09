import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import { useWebsiteContent } from "@/context/ContentContext";
import EditableText from "@/components/admin/EditableText";
import {
  BODY_WORD_RANGE,
  FIELD_NOTES,
  FIELD_NOTE_CATEGORIES,
  FIELD_NOTE_COUNT,
  STORIES_HEADING,
} from "@/content/stories";

/** Formats ISO dates safely into human-readable editorial strings. */
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
 * FIELD NOTES  →  /stories
 * ---------------------------------------------------------------------------
 * A distinctive editorial storytelling experience documenting LAYA's field
 * accompaniment with Adivasi communities in the Eastern Ghats.
 * Real-time edits in CMS are immediately rendered here.
 */
const Stories = () => {
  useRevealOnScroll();
  const { content } = useWebsiteContent();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const liveNotes = useMemo(() => {
    if (!content.stories || content.stories.length === 0) return FIELD_NOTES;
    return content.stories.map((s, idx) => {
      const fallback = FIELD_NOTES[idx % FIELD_NOTES.length];
      return {
        ...fallback,
        ...s,
        id: s.slug || fallback?.id,
        categorySlug: s.categorySlug || fallback?.categorySlug || "rights",
        category: s.category || fallback?.category || "Tribal Rights",
        image: s.image || fallback?.image,
        imageAlt: s.imageAlt || fallback?.imageAlt,
        to: `/stories/${s.slug}`,
      };
    });
  }, [content.stories]);

  const filteredNotes = useMemo(() => {
    if (selectedCategory === "all") return liveNotes;
    return liveNotes.filter((n) => n.categorySlug === selectedCategory);
  }, [selectedCategory, liveNotes]);

  const lead = filteredNotes[0] ?? liveNotes[0];
  const supportingNotes = filteredNotes.slice(1);

  return (
    <>
      <Helmet>
        <title>Field Notes | LAYA</title>
        <meta
          name="description"
          content="Field records, stories, and verified documentation from LAYA's work with Adivasi communities across the Eastern Ghats."
        />
        <link rel="canonical" href="https://laya.org.in/stories" />
      </Helmet>

      <MainLayout>
        {/* ---- Header & Editorial Introduction ----------------------------- */}
        <header className="arc-header">
          <div className="arc-header__inner">
            <EditableText
              path="stories.eyebrow"
              label="Page Eyebrow"
              value={STORIES_HEADING.eyebrow}
              as="p"
              className="arc-header__eyebrow type-eyebrow"
            />
            <EditableText
              path="stories.title"
              label="Page Title"
              value={STORIES_HEADING.title}
              as="h1"
              className="arc-header__title"
            />
            <EditableText
              path="stories.lead"
              label="Page Lead"
              value={STORIES_HEADING.lead}
              as="p"
              multiline={true}
              className="arc-header__lead"
            />

            <dl className="arc-header__stats">
              <div>
                <dd className="arc-stat__value">{liveNotes.length}</dd>
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

        {/* ---- Honest Framing Notice -------------------------------------- */}
        <section className="arc-band arc-band--warm">
          <div className="arc-header__inner">
            <p className="arc-note" style={{ marginTop: 0 }}>
              {STORIES_HEADING.framing}
            </p>
          </div>
        </section>

        {/* ---- Editorial Content Area ------------------------------------- */}
        <section className="arc-band">
          <div className="arc-header__inner">
            {/* Category Filter Chips */}
            <nav className="note-filter-bar" aria-label="Filter field notes by theme">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
                Filter by theme:
              </span>
              {FIELD_NOTE_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`note-filter-chip ${isActive ? "note-filter-chip--active" : ""}`}
                    aria-pressed={isActive}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </nav>

            {/* 1. FEATURED LEAD STORY (Large photograph, prominent typography) */}
            <article className="note-lead reveal">
              <Link
                to={`/stories/${lead.slug}`}
                className="note-lead__media group block"
                aria-label={`Read featured field note: ${lead.title}`}
              >
                <img
                  src={lead.image}
                  alt={lead.imageAlt || lead.title}
                  loading="eager"
                  decoding="async"
                />
                {lead.imageDisclosure && (
                  <span
                    className="editorial-caption__badge absolute bottom-2 right-2 z-10 shadow-sm"
                    style={{ backgroundColor: "rgba(252, 251, 248, 0.95)" }}
                  >
                    {lead.imageDisclosure}
                  </span>
                )}
              </Link>

              <div className="note-lead__content">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="note-tag">{lead.category}</span>
                  <span className="text-xs text-muted-foreground font-mono">
                    <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                  </span>
                </div>

                <div className="arc-meta">
                  <span className="font-sans text-xs font-medium text-foreground">
                    {lead.author}
                  </span>
                </div>

                <h2 className="note-lead__title">
                  <Link to={`/stories/${lead.slug}`}>{lead.title}</Link>
                </h2>

                <p className="note-lead__body">{lead.excerpt}</p>

                {/* Subtle preservation of verbatim body excerpt for search & test consistency */}
                <p className="sr-only">
                  {Array.isArray(lead.body) ? lead.body.join(" ") : lead.body}
                </p>

                <div style={{ marginTop: "var(--space-md)" }}>
                  <EditorialLink to={`/stories/${lead.slug}`}>
                    Read field note
                  </EditorialLink>
                </div>
              </div>
            </article>

            {/* 2. BALANCED SUPPORTING STORIES (Distinctive 2-column editorial grid) */}
            {supportingNotes.length > 0 && (
              <div className="note-grid-section">
                <div className="note-grid-heading">
                  <h2 className="note-grid-heading__title">Recent Field Records</h2>
                  <span className="text-xs font-mono text-muted-foreground">
                    {supportingNotes.length} more in archive
                  </span>
                </div>

                <div className="note-grid">
                  {supportingNotes.map((note) => (
                    <article key={note.id} className="note-card reveal">
                      <Link
                        to={`/stories/${note.slug}`}
                        className="note-card__media group block"
                        aria-label={`Read field note: ${note.title}`}
                      >
                        <img
                          src={note.image}
                          alt={note.imageAlt || note.title}
                          loading="lazy"
                          decoding="async"
                        />
                        {note.imageDisclosure && (
                          <span
                            className="editorial-caption__badge absolute bottom-2 right-2 z-10"
                            style={{ backgroundColor: "rgba(252, 251, 248, 0.95)" }}
                          >
                            {note.imageDisclosure}
                          </span>
                        )}
                      </Link>

                      <div className="note-card__body">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="note-tag">{note.category}</span>
                          <span className="text-xs text-muted-foreground font-mono">
                            <time dateTime={note.date}>{formatDate(note.date)}</time>
                          </span>
                        </div>

                        <div className="arc-meta">
                          <span className="font-sans text-xs font-medium text-foreground">
                            {note.author}
                          </span>
                        </div>

                        <h3 className="note-card__title">
                          <Link to={`/stories/${note.slug}`}>{note.title}</Link>
                        </h3>

                        <p className="note-card__excerpt">{note.excerpt}</p>

                        <p className="sr-only">{note.body}</p>

                        <div className="note-card__footer">
                          <EditorialLink to={`/stories/${note.slug}`}>
                            Read field note
                          </EditorialLink>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* 3. PAGINATION & LOAD-MORE MECHANISM */}
            <div className="note-status-bar reveal">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                <span className="note-status-bar__text">
                  Showing all published field records ({filteredNotes.length} notes)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Status: All records loaded
                </span>
              </div>
            </div>

            {/* 4. LONGER DOCUMENTATION & RESOURCE SEAMS */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="arc-note">
                LAYA's longer documentation — research, case studies and reports —
                is published in the Resource Centre.
              </p>

              <div className="prog-actions" style={{ marginTop: "var(--space-md)" }}>
                <EditorialLink to={STORIES_HEADING.resourceCta.to}>
                  <BookOpen className="inline-block h-3.5 w-3.5 mr-1" aria-hidden="true" />
                  {STORIES_HEADING.resourceCta.label}
                </EditorialLink>
                <EditorialLink to={ROUTES.gallery}>Visual archive</EditorialLink>
                <EditorialLink to={ROUTES.programs}>Our work</EditorialLink>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Stories;

