import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { newGalleryImages } from "@/assets/newGalleryAssets";

type GalleryImage = (typeof newGalleryImages)[number];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const images = newGalleryImages;

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, images.length]);

  const openAt = (index: number) => setActiveIndex(index);
  const active: GalleryImage | null = activeIndex !== null ? images[activeIndex] ?? null : null;

  return (
    <>
      <Helmet>
        <title>Gallery | LAYA</title>
        <meta
          name="description"
          content="Photo gallery showcasing LAYA's work with Adivasi communities and the Eastern Ghats landscape."
        />
      </Helmet>

      <MainLayout>
        <section className="laya-section pt-8 lg:pt-10 pb-24 md:pb-32">
          <div className="container-narrow mx-auto">
            <div className="laya-panel-solid overflow-hidden">
              <div className="border-b border-border/80 px-6 py-8 md:px-12 md:py-10">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-xl"
                >
                  <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.22em] text-[var(--laya-purple)] mb-3">
                    Field Documentation
                  </p>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-snug">
                    Photographs from LAYA&apos;s ongoing work
                  </h2>
                </motion.div>
              </div>

              <div className="divide-y divide-border/70">
                {images.map((img, i) => {
                  const reverse = i % 2 === 1;
                  const number = String(i + 1).padStart(2, "0");

                  return (
                    <motion.article
                      key={`${img.title}-${i}`}
                      initial={{ opacity: 0, y: 48 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="group"
                    >
                      <button
                        type="button"
                        onClick={() => openAt(i)}
                        className="w-full grid lg:grid-cols-12 gap-6 lg:gap-10 items-center px-6 py-10 md:px-12 md:py-14 text-left transition-colors hover:bg-muted/40"
                        aria-label={`Open ${img.title}`}
                      >
                        <div className={`lg:col-span-5 ${reverse ? "lg:order-2" : "lg:order-1"}`}>
                          <div className="flex items-baseline gap-4 mb-4">
                            <span className="font-heading text-sm font-semibold tracking-[0.14em] text-[var(--laya-cyan)]">
                              {number}
                            </span>
                            <span className="h-px flex-1 bg-border" />
                          </div>
                          <h3 className="font-heading text-xl md:text-2xl lg:text-[1.7rem] font-bold text-foreground leading-snug mb-3 group-hover:text-[var(--laya-purple)] transition-colors">
                            {img.title}
                          </h3>
                          <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-md">
                            Documented through LAYA&apos;s field engagement with Adivasi communities.
                          </p>
                          <p className="mt-6 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-[var(--laya-purple)] opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            View photograph →
                          </p>
                        </div>

                        <div className={`lg:col-span-7 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
                          <div className="relative overflow-hidden rounded md:rounded bg-muted shadow-[0_20px_50px_-28px_rgba(30,20,60,0.45)]">
                            <motion.div
                              initial={{ scale: 1.06 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true, amount: 0.4 }}
                              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                              className="aspect-[16/10] overflow-hidden"
                            >
                              <img
                                src={img.src}
                                alt={img.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                              />
                            </motion.div>
                          </div>
                        </div>
                      </button>
                    </motion.article>
                  );
                })}
              </div>

              <div className="border-t border-border/80 px-6 py-6 md:px-12 flex items-center justify-between gap-4">
                <p className="text-xs font-heading uppercase tracking-[0.16em] text-muted-foreground">
                  {images.length} plate{images.length === 1 ? "" : "s"}
                </p>
                <p className="text-xs text-muted-foreground font-body">LAYA Visual Archive</p>
              </div>
            </div>
          </div>
        </section>

        <AnimatePresence>
          {active && activeIndex !== null && (
            <motion.div
              className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0f1220]/88 p-3 md:p-8 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIndex(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid w-full max-w-6xl overflow-hidden rounded bg-white shadow-2xl md:grid-cols-[1.4fr_0.8fr]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-[#111] min-h-[42vh] md:min-h-[70vh] flex items-center justify-center">
                  <img src={active.src} alt={active.title} className="max-h-[70vh] w-full object-contain" />
                  <button
                    type="button"
                    aria-label="Previous"
                    onClick={() =>
                      setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length))
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next"
                    onClick={() => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="relative flex flex-col justify-between p-6 md:p-8">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(null)}
                    className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div>
                    <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.2em] text-[var(--laya-purple)] mb-4">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                    </p>
                    <h3 className="font-heading text-2xl font-bold text-foreground leading-snug mb-4">
                      {active.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      From LAYA&apos;s visual archive of community practice, livelihoods, and ecological
                      stewardship.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {images.map((thumb, i) => (
                      <button
                        key={`${thumb.title}-thumb-${i}`}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        className={`h-12 w-12 overflow-hidden rounded border transition-all ${
                          i === activeIndex
                            ? "border-[var(--laya-purple)] ring-2 ring-[var(--laya-purple)]/30"
                            : "border-border opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`Show ${thumb.title}`}
                      >
                        <img src={thumb.src} alt="" className="h-full w-full object-cover" />
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
