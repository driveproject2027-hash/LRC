import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { ResourceCard } from "@/components/resource/ResourceCard";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import {
  AVAILABLE_COUNT,
  RESOURCES,
  RESOURCE_CATEGORIES,
  RESOURCE_TYPES,
  UNAVAILABLE_COUNT,
  categoryOf,
} from "@/content/resources";

/**
 * RESOURCE CENTRE  →  /publications
 * ---------------------------------------------------------------------------
 * Replaces the previous card grid that floated on the purple/blue background.
 *
 * Provides the three filters the brief asked for:
 *   - search          (title, description, type)
 *   - category filter (only categories with real documents)
 *   - type filter     (derived document types actually present)
 *
 * A YEAR filter is deliberately NOT offered, because the source data contains
 * no publication dates — only 2 of 33 records mention a year anywhere. A year
 * filter with two populated buckets would be misleading. See the metadata note
 * in `src/content/resources.ts`.
 *
 * All 33 documents and their working PDF links are preserved. The 3 records
 * without a PDF remain listed and are visibly marked unavailable.
 */
const Publications = () => {
  useRevealOnScroll();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [type, setType] = useState<string>("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: RESOURCES.length };
    RESOURCE_CATEGORIES.forEach((c) => {
      if (c.id === "all") return;
      map[c.id] = RESOURCES.filter((r) => categoryOf(r) === c.id).length;
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return RESOURCES.filter((r) => {
      const matchesCategory = category === "all" || categoryOf(r) === category;
      const matchesType = type === "all" || r.type === type;
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q);
      return matchesCategory && matchesType && matchesSearch;
    });
  }, [search, category, type]);

  const isFiltered = search.trim() !== "" || category !== "all" || type !== "all";

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setType("all");
  };

  return (
    <>
      <Helmet>
        <title>Resource Centre | LAYA</title>
        <meta
          name="description"
          content="LAYA's knowledge library: publications, reports, policy briefs and research from four decades of work with Adivasi communities in the Eastern Ghats."
        />
        <link rel="canonical" href="https://laya.org.in/publications" />
      </Helmet>

      <MainLayout>
        {/* ---- Header ---------------------------------------------------- */}
        <header className="res-header">
          <div className="res-header__inner">
            <p className="res-header__eyebrow type-eyebrow">Knowledge</p>
            <h1 className="res-header__title">Resource Centre</h1>
            <p className="res-header__lead">
              Four decades of field practice, research and documentation — published as case
              studies, policy briefs, training material and reports.
            </p>

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
            </dl>
          </div>
        </header>

        {/* ---- Filters --------------------------------------------------- */}
        <div className="res-filters">
          <div className="res-filters__inner">
            <div>
              <div className="res-filters__row" style={{ marginBottom: "0.5rem" }}>
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
                      <span className="res-chip__count">{counts[c.id] ?? 0}</span>
                    </button>
                  ))}
                </div>
              </div>

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
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
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
            <p className="res-filters__result">
              Showing <strong>{filtered.length}</strong> of {RESOURCES.length} documents
              {UNAVAILABLE_COUNT > 0 && (
                <> · {UNAVAILABLE_COUNT} without an available PDF</>
              )}
            </p>
          </div>

          <div className="res-header__inner">
            {filtered.length === 0 ? (
              <div className="res-empty">
                <p className="res-empty__title">No documents match your filters</p>
                <p className="res-empty__body">
                  Try a different search term, or clear the filters to see the whole library.
                </p>
                <button type="button" onClick={resetFilters} className="res-chip res-chip--active">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="res-grid">
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
                Filters active — <button
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
