import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import {
  ARCHIVE_PLATES,
  IN_IMAGE_SOURCED,
  PLATE_COUNT,
  TITLED_COUNT,
  UNTITLED_COUNT,
  type ArchivePlate,
} from "@/content/gallery";

/**
 * VISUAL ARCHIVE  →  /gallery
 * ---------------------------------------------------------------------------
 * A documentary photograph archive, not a masonry grid.
 *
 * CONTENT INTEGRITY
 *   Only verified metadata is displayed. A plate shows a title ONLY where the
 *   source supports one — from the filename, or from text legible inside the
 *   photograph. Plates with no recorded metadata are presented as
 *   "Untitled photograph / Caption not recorded", which is an honest signal
 *   rather than a placeholder.
 *
 *   The previous implementation applied two invented sentences to all twelve
 *   records and gave five photographs fabricated event titles. All removed.
 *   See `REMOVED_GENERIC_COPY` in src/content/gallery.ts.
 *
 * CATEGORIES
 *   None are offered. No repository data supports a category for any plate, so
 *   filtering is absent rather than fabricated. `ArchiveCategory` in the content
 *   module is the seam for adding them later.
 *
 * NO PHOTOGRAPH IS DESCRIBED AS A VACCINATION. See ARCHIVE_CONFLICTS.
 */
const Gallery = () => {
  useRevealOnScroll();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const plates = ARCHIVE_PLATES;

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i === null ? i : (i + 1) % plates.length));
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i === null ? i : (i - 1 + plates.length) % plates.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, plates.length]);

  const active: ArchivePlate | null = activeIndex !== null ? plates[activeIndex] ?? null : null;

  return (
    <>
      <Helmet>
        <title>Visual Archive | LAYA</title>
        <meta
          name="description"
          content="A documentary photograph archive from LAYA's work with Adivasi communities in the Eastern Ghats."
        />
        <link rel="canonical" href="https://laya.org.in/gallery" />
      </Helmet>

      <MainLayout>
        {/* ---- Header ---------------------------------------------------- */}
        <header className="arc-header">
          <div className="arc-header__inner">
            <p className="arc-header__eyebrow type-eyebrow">Field documentation</p>
            <h1 className="arc-header__title">Visual Archive</h1>
            <p className="arc-header__lead">
              Photographs from LAYA's work with Adivasi communities in the Eastern Ghats. Each
              plate is captioned only with metadata that has been recorded.
            </p>

            <dl className="arc-header__stats">
              <div>
                <dd className="arc-stat__value">{PLATE_COUNT}</dd>
                <dt className="arc-stat__label">Photographs</dt>
              </div>
              <div>
                <dd className="arc-stat__value">{TITLED_COUNT}</dd>
                <dt className="arc-stat__label">With a recorded caption</dt>
              </div>
              <div>
                <dd className="arc-stat__value">{UNTITLED_COUNT}</dd>
                <dt className="arc-stat__label">Caption not recorded</dt>
              </div>
            </dl>
          </div>
        </header>

        {/* ---- Archival note --------------------------------------------- */}
        <section className="arc-band arc-band--warm">
          <div className="arc-header__inner">
            <p className="arc-note" style={{ marginTop: 0 }}>
              Captions in this archive come only from two sources: LAYA's own image filenames, and
              text visible within the photograph itself. Where neither exists, the plate is marked
              <strong> caption not recorded</strong> rather than described. No location, year,
              programme or activity has been inferred from appearance.
            </p>
          </div>
        </section>

        {/* ---- The sequence ---------------------------------------------- */}
        <section className="arc-band">
          <div className="arc-header__inner">
            {plates.map((plate, i) => {
              const number = String(i + 1).padStart(2, "0");
              const reverse = i % 2 === 1;
              const isUntitled = plate.title === null;

              return (
                <article
                  key={plate.id}
                  className={`plate ${reverse ? "plate--reverse" : ""} ${
                    isUntitled ? "plate--untitled" : ""
                  } reveal`}
                >
                  <button
                    type="button"
                    className="plate__media"
                    onClick={() => setActiveIndex(i)}
                    aria-label={
                      isUntitled
                        ? `Open untitled photograph, plate ${number}`
                        : `Open ${plate.title}, plate ${number}`
                    }
                  >
                    <img src={plate.src} alt={plate.alt} loading={i < 2 ? "eager" : "lazy"} decoding="async" />
                  </button>

                  <div className="plate__body">
                    <span className="plate__index">Plate {number}</span>

                    {isUntitled ? (
                      <>
                        <h2 className="plate__title plate__title--untitled">
                          Untitled photograph
                        </h2>
                        <p className="plate__note">Caption not recorded.</p>
                      </>
                    ) : (
                      <>
                        <h2 className="plate__title">{plate.title}</h2>

                        {(plate.date || plate.place) && (
                          <div className="plate__meta">
                            {plate.date && (
                              <span className="plate__meta-item">{plate.date}</span>
                            )}
                            {plate.place && (
                              <span className="plate__meta-item">{plate.place}</span>
                            )}
                          </div>
                        )}

                        {plate.note && <p className="plate__note">{plate.note}</p>}

                        <span className="plate__provenance">
                          {plate.provenance === "in-image"
                            ? "Caption read from the photograph"
                            : "Caption from image filename"}
                        </span>
                      </>
                    )}
                  </div>
                </article>
              );
            })}

            <p className="arc-note">
              {PLATE_COUNT} plates. {IN_IMAGE_SOURCED.length} caption was read directly from a
              photograph; the remainder are filenames supplied by LAYA.
            </p>
          </div>
        </section>

        {/* ---- Continue ------------------------------------------------ */}
        <section className="arc-band arc-band--warm">
          <div className="arc-header__inner">
            <div className="prog-actions" style={{ marginTop: 0 }}>
              <EditorialLink to={ROUTES.stories}>Field notes</EditorialLink>
              <EditorialLink to={ROUTES.programs}>Our work</EditorialLink>
              <EditorialLink to={ROUTES.publications}>Resource Centre</EditorialLink>
            </div>
          </div>
        </section>

        {/* ---- Lightbox -------------------------------------------------- */}
        <AnimatePresence>
          {active && activeIndex !== null && (
            <motion.div
              className="arc-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIndex(null)}
              role="dialog"
              aria-modal="true"
              aria-label={active.title ?? "Untitled photograph"}
            >
              <motion.div
                className="arc-lightbox__panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="arc-lightbox__stage">
                  <img src={active.src} alt={active.alt} />

                  <button
                    type="button"
                    className="arc-lightbox__nav arc-lightbox__nav--prev"
                    aria-label="Previous photograph"
                    onClick={() =>
                      setActiveIndex((i) => (i === null ? i : (i - 1 + plates.length) % plates.length))
                    }
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="arc-lightbox__nav arc-lightbox__nav--next"
                    aria-label="Next photograph"
                    onClick={() => setActiveIndex((i) => (i === null ? i : (i + 1) % plates.length))}
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="arc-lightbox__caption">
                  <button
                    type="button"
                    className="arc-lightbox__close"
                    aria-label="Close"
                    onClick={() => setActiveIndex(null)}
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>

                  <span className="plate__index">
                    Plate {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(plates.length).padStart(2, "0")}
                  </span>

                  {active.title ? (
                    <>
                      <h2 className="plate__title">{active.title}</h2>
                      {(active.date || active.place) && (
                        <div className="plate__meta">
                          {active.date && <span className="plate__meta-item">{active.date}</span>}
                          {active.place && <span className="plate__meta-item">{active.place}</span>}
                        </div>
                      )}
                      {active.note && <p className="plate__note">{active.note}</p>}
                      <span className="plate__provenance">
                        {active.provenance === "in-image"
                          ? "Caption read from the photograph"
                          : "Caption from image filename"}
                      </span>
                    </>
                  ) : (
                    <>
                      <h2 className="plate__title plate__title--untitled">Untitled photograph</h2>
                      <p className="plate__note">
                        Caption, location and date were not recorded for this photograph.
                      </p>
                    </>
                  )}

                  <div className="arc-lightbox__thumbs">
                    {plates.map((thumb, i) => (
                      <button
                        key={`${thumb.id}-thumb`}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        className={`arc-lightbox__thumb ${
                          i === activeIndex ? "arc-lightbox__thumb--active" : ""
                        }`}
                        aria-label={`Show plate ${String(i + 1).padStart(2, "0")}`}
                      >
                        <img src={thumb.src} alt="" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </MainLayout>
    </>
  );
};

export default Gallery;
