import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { AlertCircle, ChevronDown, Filter, LayoutGrid, List, Search, X } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { ResourceCard } from "@/components/resource/ResourceCard";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import { useWebsiteContent } from "@/context/ContentContext";
import EditableText from "@/components/admin/EditableText";
import {
  AVAILABLE_COUNT,
  RESOURCES,
  RESOURCE_CATEGORIES,
  RESOURCE_TYPES,
  RESOURCE_YEARS,
  UNAVAILABLE_COUNT,
  categoryOf,
} from "@/content/resources";

interface PublicationsProps {
  isLoading?: boolean;
  error?: string | null;
}

/**
 * RESOURCE CENTRE  →  /publications
 * ---------------------------------------------------------------------------
 * Editorial digital resource library for LAYA's research, reports, case studies,
 * and training manuals.
 *
 * Provides:
 *   - Search by publication title, subject category, or year (supports ?q= query param)
 *   - Category filters based on existing publication data
 *   - Document type filters
 *   - Verified Year filters (2008–2026) where dates are verified
 *   - Grid / List layout toggle
 *   - Clean loading, empty, and error states
 *
 * All 33 documents and their working PDF links are preserved. The 3 physical
 * archive records remain listed and are visibly marked unavailable.
 */
const Publications = ({ isLoading = false, error = null }: PublicationsProps) => {
  useRevealOnScroll();
  const { content } = useWebsiteContent();

  const pubHeader = content.publications?.header || {
    eyebrow: "Knowledge",
    title: "Resource Centre",
    lead: "Four decades of field practice, research and documentation — published as case studies, policy briefs, training material and reports.",
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? searchParams.get("search") ?? "";

  const [search, setSearch] = useState(initialQuery);
  const [category, setCategory] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [year, setYear] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Keep search state in sync if URL query parameter changes
  useEffect(() => {
    const q = searchParams.get("q") ?? searchParams.get("search");
    if (q !== null) {
      setSearch(q);
    }
  }, [searchParams]);

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = { all: RESOURCES.length };
    RESOURCE_CATEGORIES.forEach((c) => {
      if (c.id === "all") return;
      map[c.id] = RESOURCES.filter((r) => categoryOf(r) === c.id).length;
    });
    return map;
  }, []);

  const typeCounts = useMemo(() => {
    const map: Record<string, number> = { all: RESOURCES.length };
    RESOURCE_TYPES.forEach((t) => {
      map[t] = RESOURCES.filter((r) => r.type === t).length;
    });
    return map;
  }, []);

  const yearCounts = useMemo(() => {
    const map: Record<string, number> = { all: RESOURCES.length };
    RESOURCE_YEARS.forEach((y) => {
      map[String(y)] = RESOURCES.filter((r) => r.year === y).length;
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return RESOURCES.filter((r) => {
      const matchesCategory = category === "all" || categoryOf(r) === category;
      const matchesType = type === "all" || r.type === type;
      const matchesYear = year === "all" || (r.year !== null && String(r.year) === year);
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.sourceCategory.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        (r.date ? r.date.toLowerCase().includes(q) : false) ||
        (r.year !== null ? String(r.year).includes(q) : false);
      return matchesCategory && matchesType && matchesYear && matchesSearch;
    });
  }, [search, category, type, year]);

  const isFiltered =
    search.trim() !== "" || category !== "all" || type !== "all" || year !== "all";

  const activeFilterCount =
    (category !== "all" ? 1 : 0) + (type !== "all" ? 1 : 0) + (year !== "all" ? 1 : 0);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setType("all");
    setYear("all");
    setMobileFiltersOpen(false);
    if (searchParams.has("q") || searchParams.has("search")) {
      setSearchParams({});
    }
  };

  return (
    <>
      <Helmet>
        <title>{pubHeader.title} | LAYA</title>
        <meta
          name="description"
          content={pubHeader.lead}
        />
        <link rel="canonical" href="https://laya.org.in/publications" />
      </Helmet>

      <MainLayout>
        {/* ---- Header ---------------------------------------------------- */}
        <header className="res-header">
          <div className="res-header__inner">
            <EditableText
              path="publications.header.eyebrow"
              label="Publications Eyebrow"
              value={pubHeader.eyebrow}
              as="p"
              className="res-header__eyebrow type-eyebrow"
            />
            <EditableText
              path="publications.header.title"
              label="Publications Title"
              value={pubHeader.title}
              as="h1"
              className="res-header__title"
            />
            <EditableText
              path="publications.header.lead"
              label="Publications Description"
              value={pubHeader.lead}
              as="p"
              multiline={true}
              className="res-header__lead"
            />

            <dl className="res-header__stats">
              <div>
                <dd className="res-stat__value">{RESOURCES.length}</dd>
                <dt className="res-stat__label">Documents</dt>
              </div>
              <div>
                <dd className="res-stat__value">{AVAILABLE_COUNT}</dd>
                <dt className="res-stat__label">Available as PDF</dt>
              </div>
              <div>
                <dd className="res-stat__value">{RESOURCE_TYPES.length}</dd>
                <dt className="res-stat__label">Document types</dt>
              </div>
              <div>
                <dd className="res-stat__value">{RESOURCE_YEARS.length}</dd>
                <dt className="res-stat__label">Publication years</dt>
              </div>
            </dl>
          </div>
        </header>

        {/* ---- Filters --------------------------------------------------- */}
        <div className="res-filters">
          <div className="res-filters__inner">
            {/* Filter Chips Container */}
            <div
              id="res-filter-chips"
              className={`res-filters__chips ${mobileFiltersOpen ? "is-expanded" : "is-collapsed"} space-y-3`}
            >
              {/* Category Filter */}
              <div className="res-filters__row">
                <span className="res-filters__label" id="filter-category-label">
                  Category
                </span>
                <div
                  role="group"
                  aria-labelledby="filter-category-label"
                  className="res-filters__group"
                >
                  {RESOURCE_CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      aria-pressed={category === c.id}
                      className={`res-chip ${category === c.id ? "res-chip--active" : ""}`}
                    >
                      {c.label}
                      <span className="res-chip__count">{categoryCounts[c.id] ?? 0}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Document Type Filter */}
              <div className="res-filters__row">
                <span className="res-filters__label" id="filter-type-label">
                  Type
                </span>
                <div
                  role="group"
                  aria-labelledby="filter-type-label"
                  className="res-filters__group"
                >
                  <button
                    type="button"
                    onClick={() => setType("all")}
                    aria-pressed={type === "all"}
                    className={`res-chip ${type === "all" ? "res-chip--active" : ""}`}
                  >
                    All types
                    <span className="res-chip__count">{typeCounts.all}</span>
                  </button>
                  {RESOURCE_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      aria-pressed={type === t}
                      className={`res-chip ${type === t ? "res-chip--active" : ""}`}
                    >
                      {t}
                      <span className="res-chip__count">{typeCounts[t] ?? 0}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified Year Filter */}
              <div className="res-filters__row">
                <span className="res-filters__label" id="filter-year-label">
                  Year
                </span>
                <div
                  role="group"
                  aria-labelledby="filter-year-label"
                  className="res-filters__group"
                >
                  <button
                    type="button"
                    onClick={() => setYear("all")}
                    aria-pressed={year === "all"}
                    className={`res-chip ${year === "all" ? "res-chip--active" : ""}`}
                  >
                    All years
                  </button>
                  {RESOURCE_YEARS.map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setYear(String(y))}
                      aria-pressed={year === String(y)}
                      className={`res-chip ${year === String(y) ? "res-chip--active" : ""}`}
                    >
                      {y}
                      <span className="res-chip__count">{yearCounts[String(y)] ?? 0}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Input & Mobile Filter Toggle */}
            <div className="res-filters__search-col">
              <label htmlFor="resource-search" className="sr-only">
                Search resources
              </label>
              <div className="res-search">
                <Search className="res-search__icon" aria-hidden="true" />
                <input
                  id="resource-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, topic or type…"
                  className="res-search__input"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="res-search__clear"
                    aria-label="Clear search input"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Mobile Filter Toggle */}
              <div className="res-filters__mobile-bar">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen((prev) => !prev)}
                  className={`res-filters__toggle-btn ${activeFilterCount > 0 ? "res-filters__toggle-btn--active" : ""}`}
                  aria-expanded={mobileFiltersOpen}
                  aria-controls="res-filter-chips"
                >
                  <Filter className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>
                    {activeFilterCount > 0
                      ? `Filter options (${activeFilterCount} active)`
                      : "Filter by Category, Type & Year"}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileFiltersOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {isFiltered && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="res-filters__clear-link"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ---- Results ---------------------------------------------------
            The <h2> is visually hidden but structurally required: each card's
            title is an <h3>, and without an intervening h2 every one of the 33
            cards would be an h1→h3 skip. */}
        <section className="res-band" aria-live="polite" aria-labelledby="results-heading">
          <h2 id="results-heading" className="sr-only">
            Documents
          </h2>
          <div className="res-header__inner" style={{ marginBottom: "var(--space-md)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="res-filters__result">
                Showing <strong>{filtered.length}</strong> of {RESOURCES.length} documents
                {UNAVAILABLE_COUNT > 0 && (
                  <> · {UNAVAILABLE_COUNT} without an available PDF</>
                )}
              </p>

              <div
                className="flex items-center gap-2 self-start sm:self-auto"
                role="group"
                aria-label="Layout view"
              >
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-pressed={viewMode === "grid"}
                  className={`res-view-toggle ${viewMode === "grid" ? "res-view-toggle--active" : ""}`}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only sm:not-sr-only sm:text-xs">Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-pressed={viewMode === "list"}
                  className={`res-view-toggle ${viewMode === "list" ? "res-view-toggle--active" : ""}`}
                  aria-label="List view"
                  title="List view"
                >
                  <List className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only sm:not-sr-only sm:text-xs">List</span>
                </button>
              </div>
            </div>
          </div>

          <div className="res-header__inner">
            {isLoading ? (
              <div className="res-loading" role="status" aria-label="Loading library documents">
                <div className="res-loading__spinner" aria-hidden="true" />
                <p className="res-loading__text">Loading digital library…</p>
              </div>
            ) : error ? (
              <div className="res-error" role="alert">
                <AlertCircle className="h-6 w-6 text-amber-700" aria-hidden="true" />
                <p className="res-error__title">Unable to load publications</p>
                <p className="res-error__body">{error}</p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="res-chip res-chip--active"
                >
                  Reset library view
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="res-empty" role="status">
                <p className="res-empty__title">No documents match your filters</p>
                <p className="res-empty__body">
                  Try a different search term, or clear the filters to see the whole library.
                </p>
                <button type="button" onClick={resetFilters} className="res-chip res-chip--active">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div
                className={`res-grid ${viewMode === "grid" ? "res-grid--grid" : "res-grid--list"}`}
              >
                {filtered.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ---- Related knowledge ----------------------------------------- */}
        <section className="res-band res-band--warm">
          <div className="res-header__inner">
            <p className="type-eyebrow">Also in the knowledge library</p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--text-h3)",
                color: "var(--text-primary)",
                marginBlock: "var(--space-2xs) var(--space-md)",
              }}
            >
              Financial transparency and field stories
            </p>
            <div className="prog-actions" style={{ marginTop: 0 }}>
              <EditorialLink to={ROUTES.aboutFinancialReports}>
                Foreign contribution reports
              </EditorialLink>
              <EditorialLink to={ROUTES.aboutFcraInformation}>FCRA information</EditorialLink>
              <EditorialLink to={ROUTES.stories}>Stories from the field</EditorialLink>
              <EditorialLink to={ROUTES.gallery}>Photo gallery</EditorialLink>
            </div>
            {isFiltered && (
              <p className="res-filters__result" style={{ marginTop: "var(--space-md)" }}>
                Filters active —{" "}
                <button
                  type="button"
                  onClick={resetFilters}
                  className="laya-link"
                  style={{ background: "none", border: 0, cursor: "pointer", padding: 0 }}
                >
                  clear all
                </button>
              </p>
            )}
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Publications;
