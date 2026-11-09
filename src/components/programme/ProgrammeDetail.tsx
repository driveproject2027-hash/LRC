import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Download, FileText } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import {
  PROGRAMME_CATEGORIES,
  getRelatedProgrammes,
  type Programme,
} from "@/content/programmes";
import { useWebsiteContent } from "@/context/ContentContext";
import EditableText from "@/components/admin/EditableText";
import EditableImage from "@/components/admin/EditableImage";

interface ProgrammeDetailProps {
  programme: Programme;
}

/**
 * PROGRAMME DETAIL  →  /what-we-do/*
 * ---------------------------------------------------------------------------
 * Consistent editorial layout for LAYA's core programmes.
 *
 * Structure (7 Sections aligned with LAYA Design System & Health Benchmark):
 *   1. HERO: Eyebrow, concise heading, short lead, authentic photo, existing CTA
 *   2. PROGRAMME OVERVIEW: Purpose statement + verified institutional numbers
 *   3. OUR APPROACH: 4 concise grouped themes + context-specific visual plate
 *   4. WORK IN ACTION: Editorial alternating photo-and-text rows
 *   5. STORIES OR CASE STUDIES: Verified Field Notes and published case studies
 *   6. RELATED PUBLICATIONS: Compact cards with dates & direct PDF links
 *   7. RELATED PROGRAMMES & CONTACT: Cross-programme navigation & engagement CTA
 * ---------------------------------------------------------------------------
 */
export const ProgrammeDetail = ({ programme }: ProgrammeDetailProps) => {
  useRevealOnScroll();
  const { content } = useWebsiteContent();
  const [selectedSubThemeId, setSelectedSubThemeId] = useState<string>("all");

  const category = PROGRAMME_CATEGORIES.find((c) => c.id === programme.category);
  const related = getRelatedProgrammes(programme, 2);

  const progIndex = (content.programmes || []).findIndex(
    (p) => p.to === programme.to || String(p.id) === String(programme.id) || p.shortTitle === programme.shortTitle
  );
  const liveProg = progIndex >= 0 ? content.programmes[progIndex] : programme;
  const pPath = progIndex >= 0 ? `programmes.${progIndex}` : "";

  const heroEyebrow =
    liveProg.heroEyebrow || programme.heroEyebrow || `Our Work · ${category?.label ?? "Programme Area"}`;
  const heroHeading = liveProg.heroHeading || liveProg.title || programme.heroHeading || programme.title;
  const heroLead = liveProg.heroLead || liveProg.summary || programme.heroLead || programme.summary;

  return (
    <>
      <Helmet>
        <title>{liveProg.title || programme.title} | LAYA</title>
        <meta name="description" content={liveProg.summary || programme.summary} />
        <link rel="canonical" href={`https://laya.org.in${programme.to}`} />
      </Helmet>

      <MainLayout>
        {/* ==================================================================
            1. HERO SECTION (Balanced 2-column editorial layout)
            ================================================================== */}
        <section className="health-hero prog-hero">
          <div className="container-page">
            <div className="health-hero__grid prog-hero__grid">
              <div className="health-hero__content prog-hero__content">
                <EditableText
                  path={pPath ? `${pPath}.heroEyebrow` : "programme.heroEyebrow"}
                  label="Hero Eyebrow"
                  value={heroEyebrow}
                  as="p"
                  className="health-hero__eyebrow prog-hero__eyebrow type-eyebrow"
                />
                <EditableText
                  path={pPath ? `${pPath}.heroHeading` : "programme.heroHeading"}
                  label="Programme Heading"
                  value={heroHeading}
                  as="h1"
                  className="health-hero__title prog-hero__title"
                />
                <EditableText
                  path={pPath ? `${pPath}.heroLead` : "programme.heroLead"}
                  label="Hero Lead"
                  value={heroLead}
                  as="p"
                  multiline={true}
                  className="health-hero__lead prog-hero__lead"
                />

                <div className="health-hero__actions prog-hero__actions">
                  <Button asChild className="btn-brand">
                    <Link to={ROUTES.contact}>Get in Touch</Link>
                  </Button>
                  <EditorialLink to={ROUTES.programs}>
                    All Programmes
                  </EditorialLink>
                </div>
              </div>

              <figure className="health-hero__media-wrap prog-hero__media-wrap editorial-figure">
                <EditableImage
                  path={pPath ? `${pPath}.image` : "programme.image"}
                  label="Programme Hero Image"
                  src={liveProg.image || programme.image}
                  alt={liveProg.imageAlt || programme.imageAlt}
                  width={1500}
                  height={1000}
                  className="health-hero__media prog-hero__media editorial-featured-media"
                />
                <figcaption className="editorial-caption">
                  <span>
                    {programme.imageCaption || programme.imageAlt}
                  </span>
                  {programme.imageDisclosure && (
                    <span className="editorial-caption__badge">
                      {programme.imageDisclosure}
                    </span>
                  )}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. PROGRAMME OVERVIEW (Verified institutional record & reach)
            ================================================================== */}
        {programme.stats && programme.stats.length > 0 && (
          <section className="health-band health-band--warm prog-band prog-band--warm">
            <div className="container-page">
              <header className="health-heading prog-heading">
                <p className="type-eyebrow">Institutional Record</p>
                <EditableText
                  path={pPath ? `${pPath}.overviewHeading` : "programme.overviewHeading"}
                  label="Overview Heading"
                  value={liveProg.overviewHeading || `${liveProg.shortTitle || programme.shortTitle} in Numbers & Reach`}
                  as="h2"
                  className="health-heading__title prog-heading__title"
                />
                <EditableText
                  path={pPath ? `${pPath}.overviewIntro` : "programme.overviewIntro"}
                  label="Overview Intro"
                  value={liveProg.overviewIntro || liveProg.context || programme.context}
                  as="p"
                  multiline={true}
                  className="health-heading__intro prog-heading__intro"
                />
              </header>

              <dl className="health-glance-grid prog-glance-grid reveal">
                {programme.stats.map((stat, sIdx) => (
                  <div key={stat.label} className="health-glance-item prog-glance-item">
                    <EditableText
                      path={pPath ? `${pPath}.glance.${sIdx}.value` : `programme.stat.${sIdx}.value`}
                      label="Statistic Value"
                      value={stat.value}
                      as="dd"
                      className="health-glance-item__value prog-glance-item__value"
                    />
                    <EditableText
                      path={pPath ? `${pPath}.glance.${sIdx}.label` : `programme.stat.${sIdx}.label`}
                      label="Statistic Label"
                      value={stat.label}
                      as="dt"
                      className="health-glance-item__label prog-glance-item__label"
                    />
                    <EditableText
                      path={pPath ? `${pPath}.glance.${sIdx}.detail` : `programme.stat.${sIdx}.desc`}
                      label="Statistic Description"
                      value={stat.desc}
                      as="p"
                      className="health-glance-item__desc prog-glance-item__desc"
                    />
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* ==================================================================
            ANNUAL REPORT 2025–2026 DISCLOSURES & FIELD HIGHLIGHTS
            ================================================================== */}
        {programme.annualReport2026 && (
          <section className="health-band health-band--warm prog-band prog-band--warm border-y border-[#e7e4e9]">
            <div className="container-page">
              <header className="health-heading prog-heading">
                <p className="type-eyebrow">
                  Annual Report {programme.annualReport2026.reportingYear}
                </p>
                <h2 className="health-heading__title prog-heading__title">
                  {programme.annualReport2026.themeTitle}
                </h2>
                <p className="health-heading__intro prog-heading__intro">
                  Key initiatives, verified field outcomes, and community testimonies published in LAYA's official {programme.annualReport2026.reportingYear} Annual Report.
                </p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-stretch reveal">
                <div className="lg:col-span-6 bg-white p-6 sm:p-8 border border-[#e7e4e9] shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#7664B5] mb-4 font-sans">
                      Key Strategic Initiatives
                    </h3>
                    <ul className="space-y-3 text-sm text-neutral-800">
                      {programme.annualReport2026.keyInitiatives.map((init) => (
                        <li key={init} className="flex items-start gap-2.5 leading-snug">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-[#59BCE8] mt-2 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{init}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-500 font-sans italic">
                    Source: LAYA Annual Report {programme.annualReport2026.reportingYear}
                  </div>
                </div>

                {programme.annualReport2026.fieldQuote && (
                  <div className="lg:col-span-6 bg-[#f7f5fa] p-6 sm:p-8 border-l-4 border-[#7664B5] shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4 font-sans">
                        Voice from the Community
                      </h3>
                      <blockquote className="text-base sm:text-lg italic font-serif text-neutral-900 leading-relaxed">
                        &ldquo;{programme.annualReport2026.fieldQuote.quote}&rdquo;
                      </blockquote>
                    </div>
                    <footer className="mt-6 pt-4 border-t border-[#e2dcec] text-xs font-medium text-neutral-700 font-sans">
                      — {programme.annualReport2026.fieldQuote.author},{" "}
                      <span className="text-neutral-500">
                        {programme.annualReport2026.fieldQuote.location}
                      </span>
                    </footer>
                  </div>
                )}
              </div>

              {programme.annualReport2026.metrics &&
                programme.annualReport2026.metrics.length > 0 && (
                  <div className="mt-8 reveal">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-4 font-sans">
                      Annual Highlights ({programme.annualReport2026.reportingYear})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {programme.annualReport2026.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="bg-white p-4 sm:p-5 border border-[#e7e4e9] shadow-xs flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#1e3a5f] block mb-1">
                              {metric.value}
                            </span>
                            <h4 className="text-xs font-semibold text-neutral-900 font-sans leading-snug">
                              {metric.label}
                            </h4>
                          </div>
                          {metric.sublabel && (
                            <p className="text-[11px] text-neutral-600 font-sans mt-2 pt-2 border-t border-neutral-100 leading-relaxed">
                              {metric.sublabel}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Detailed Sub-Themes Exploration */}
              {programme.annualReport2026.subThemes &&
                programme.annualReport2026.subThemes.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-[#e2dcec] reveal">
                    <div className="mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#7664B5] font-sans block mb-1">
                        5 Divisions · Annual Report 2025–2026
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900">
                        5 Divisions Under Climate Crisis and Sustainable Development
                      </h3>
                      <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                        Explore the dedicated field interventions, key initiatives, community voices, and verified metrics documented across all five divisions in LAYA&apos;s official Annual Report.
                      </p>
                    </div>

                    {/* Filter / Selector Tabs */}
                    <div
                      className="flex flex-wrap gap-2 mb-8"
                      role="tablist"
                      aria-label="Divisions under Climate Crisis and Sustainable Development"
                    >
                      <button
                        type="button"
                        role="tab"
                        aria-selected={selectedSubThemeId === "all"}
                        onClick={() => setSelectedSubThemeId("all")}
                        className={`px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                          selectedSubThemeId === "all"
                            ? "bg-[#1e3a5f] text-white shadow-xs"
                            : "bg-white text-neutral-700 hover:bg-neutral-100 border border-[#e7e4e9]"
                        }`}
                      >
                        All 5 Divisions
                      </button>
                      {programme.annualReport2026.subThemes.map((st, idx) => (
                        <button
                          key={st.id}
                          type="button"
                          role="tab"
                          aria-selected={selectedSubThemeId === st.id}
                          onClick={() => setSelectedSubThemeId(st.id)}
                          className={`px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                            selectedSubThemeId === st.id
                              ? "bg-[#7664B5] text-white shadow-xs"
                              : "bg-white text-neutral-700 hover:bg-neutral-100 border border-[#e7e4e9]"
                          }`}
                        >
                          {idx + 1}. {st.shortTitle || st.title}
                        </button>
                      ))}
                    </div>

                    {/* Cards for each subtheme */}
                    <div className="space-y-8">
                      {programme.annualReport2026.subThemes
                        .filter(
                          (st) =>
                            selectedSubThemeId === "all" ||
                            selectedSubThemeId === st.id,
                        )
                        .map((st) => (
                          <article
                            key={st.id}
                            id={`subtheme-${st.id}`}
                            className="bg-white border border-[#e7e4e9] p-6 sm:p-8 shadow-xs"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-neutral-100">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7664B5] bg-[#f4f2f8] px-2.5 py-1 font-sans">
                                {st.tag}
                              </span>
                              <span className="text-xs text-neutral-500 font-sans">
                                Annual Report Stream #
                                {(programme.annualReport2026?.subThemes?.findIndex(
                                  (s) => s.id === st.id,
                                ) ?? 0) + 1}{" "}
                                of 5
                              </span>
                            </div>

                            <h4 className="text-lg sm:text-xl font-serif font-bold text-neutral-900 mb-1">
                              {st.title}
                            </h4>
                            <p className="text-xs font-semibold text-[#554388] mb-3 font-sans">
                              {st.subtitle}
                            </p>
                            <p className="text-sm text-neutral-700 leading-relaxed mb-6">
                              {st.description}
                            </p>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
                              {/* Key Initiatives */}
                              <div className="lg:col-span-7 bg-[#faf9fc] p-5 border border-[#ede9f2]">
                                <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#554388] mb-3 font-sans">
                                  Field Interventions &amp; Initiatives
                                </h5>
                                <ul className="space-y-2.5 text-xs text-neutral-800 leading-relaxed">
                                  {st.keyInitiatives.map((init) => (
                                    <li
                                      key={init}
                                      className="flex items-start gap-2"
                                    >
                                      <span
                                        className="w-1.5 h-1.5 rounded-full bg-[#59BCE8] mt-1.5 shrink-0"
                                        aria-hidden="true"
                                      />
                                      <span>{init}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Field Quote */}
                              {st.fieldQuote && (
                                <div className="lg:col-span-5 bg-[#fbfbf8] p-5 border-l-4 border-[#c29b38] flex flex-col justify-between">
                                  <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-2 font-sans">
                                      Voice from the Field
                                    </span>
                                    <blockquote className="text-xs sm:text-sm italic font-serif text-neutral-800 leading-relaxed">
                                      &ldquo;{st.fieldQuote.quote}&rdquo;
                                    </blockquote>
                                  </div>
                                  <footer className="mt-4 pt-3 border-t border-neutral-200 text-[11px] font-medium text-neutral-700 font-sans">
                                    — {st.fieldQuote.author},{" "}
                                    <span className="text-neutral-500">
                                      {st.fieldQuote.location}
                                    </span>
                                  </footer>
                                </div>
                              )}
                            </div>

                            {/* Metrics */}
                            {st.metrics && st.metrics.length > 0 && (
                              <div>
                                <h5 className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-3 font-sans">
                                  Verified Sub-Theme Metrics
                                </h5>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                  {st.metrics.map((m) => (
                                    <div
                                      key={m.label}
                                      className="p-3 bg-[#f7f5fa] border border-[#e8e4ee]"
                                    >
                                      <span className="text-lg sm:text-xl font-serif font-bold text-[#1e3a5f] block">
                                        {m.value}
                                      </span>
                                      <h6 className="text-[11px] font-semibold text-neutral-900 font-sans mt-0.5 leading-snug">
                                        {m.label}
                                      </h6>
                                      {m.sublabel && (
                                        <p className="text-[10px] text-neutral-600 font-sans mt-1 leading-snug">
                                          {m.sublabel}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Direct link to dedicated division page */}
                            <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[11px] text-neutral-500 font-sans">
                                Complete Portfolio, Verified Case Studies &amp; Technical Manuals
                              </span>
                              <Link
                                to={
                                  st.id === "sustainable-agriculture"
                                    ? ROUTES.whatWeDoSrm
                                    : st.id === "biodiversity-health"
                                    ? ROUTES.whatWeDoHbhc
                                    : st.id === "climate-tech-coastal"
                                    ? ROUTES.whatWeDoClimateTechCoastal
                                    : st.id === "urban-peri-urban"
                                    ? ROUTES.whatWeDoUrbanPeriUrban
                                    : ROUTES.whatWeDoPartnerEngagements
                                }
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-purple hover:text-brand-purple/80 transition-colors font-sans"
                              >
                                View Dedicated Page
                                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                              </Link>
                            </div>
                          </article>
                        ))}
                    </div>
                  </div>
                )}
            </div>
          </section>
        )}

        {/* ==================================================================
            3. OUR APPROACH (Grouped themes + visual plate)
            ================================================================== */}
        {programme.pillars && programme.pillars.length > 0 && (
          <section className="health-band prog-band">
            <div className="container-page">
              <header className="health-heading prog-heading">
                <p className="type-eyebrow">Our Model</p>
                <h2 className="health-heading__title prog-heading__title">
                  {programme.approachHeading || "An Empowered Grassroots Architecture"}
                </h2>
                <p className="health-heading__intro prog-heading__intro">
                  {programme.approachIntro || programme.summary}
                </p>
              </header>

              <div className="health-approach-layout prog-approach-layout reveal">
                <div className="health-pillars-grid prog-pillars-grid">
                  {programme.pillars.map((pillar) => (
                    <article key={pillar.num} className="health-pillar prog-pillar">
                      <span className="health-pillar__num prog-pillar__num">
                        {pillar.num}
                      </span>
                      <h3 className="health-pillar__title prog-pillar__title">
                        {pillar.title}
                      </h3>
                      <p className="health-pillar__desc prog-pillar__desc">
                        {pillar.desc}
                      </p>
                    </article>
                  ))}
                </div>

                {programme.approachVisual && (
                  <figure className="editorial-figure">
                    <div className="editorial-featured-media editorial-aspect-4-3">
                      <img
                        src={programme.approachVisual.image}
                        alt={programme.approachVisual.alt}
                        loading="lazy"
                        width={1500}
                        height={1000}
                      />
                    </div>
                    <figcaption className="editorial-caption">
                      <span>{programme.approachVisual.caption}</span>
                      {programme.approachVisual.disclosure && (
                        <span className="editorial-caption__badge">
                          {programme.approachVisual.disclosure}
                        </span>
                      )}
                    </figcaption>
                  </figure>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ==================================================================
            4. WORK IN ACTION (Editorial alternating photo-text rows)
            ================================================================== */}
        {programme.actionRows && programme.actionRows.length > 0 && (
          <section className="health-band health-band--warm prog-band prog-band--warm">
            <div className="container-page">
              <header className="health-heading prog-heading">
                <p className="type-eyebrow">Field Interventions</p>
                <h2 className="health-heading__title prog-heading__title">
                  {programme.actionsHeading || "Field Practice & Interventions"}
                </h2>
                <p className="health-heading__intro prog-heading__intro">
                  {programme.actionsIntro ||
                    "Photographic records of ongoing accompaniment across remote forest settlements and tribal communities."}
                </p>
              </header>

              <div className="health-action-rows prog-action-rows reveal">
                {programme.actionRows.map((row, i) => {
                  const reverse = i % 2 === 1;

                  return (
                    <article
                      key={row.title}
                      className={`health-action-row prog-action-row ${
                        reverse ? "health-action-row--reverse prog-action-row--reverse" : ""
                      }`}
                    >
                      <figure className="health-action-row__media-wrap prog-action-row__media-wrap">
                        <div className="health-action-row__media prog-action-row__media">
                          <img
                            src={row.image}
                            alt={row.imageAlt}
                            loading="lazy"
                            width={1200}
                            height={750}
                          />
                        </div>
                        <figcaption className="editorial-caption">
                          <span>{row.imageCaption}</span>
                          {row.imageDisclosure && (
                            <span className="editorial-caption__badge">
                              {row.imageDisclosure}
                            </span>
                          )}
                        </figcaption>
                      </figure>

                      <div className="health-action-row__content prog-action-row__content">
                        <span className="health-action-row__tag prog-action-row__tag">
                          {row.tag}
                        </span>
                        <h3 className="health-action-row__title prog-action-row__title">
                          {row.title}
                        </h3>
                        <p className="health-action-row__body prog-action-row__body">
                          {row.body}
                        </p>
                        {row.bullets && row.bullets.length > 0 && (
                          <ul className="health-action-row__bullets prog-action-row__bullets">
                            {row.bullets.map((b) => (
                              <li
                                key={b}
                                className="health-action-row__bullet prog-action-row__bullet"
                              >
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ==================================================================
            5. STORIES OR CASE STUDIES (Verified field evidence)
            ================================================================== */}
        {programme.stories && programme.stories.length > 0 && (
          <section className="health-band prog-band">
            <div className="container-page">
              <header className="health-heading prog-heading">
                <p className="type-eyebrow">Field Evidence</p>
                <h2 className="health-heading__title prog-heading__title">
                  {programme.storiesHeading || "Stories from the Field"}
                </h2>
                <p className="health-heading__intro prog-heading__intro">
                  {programme.storiesIntro ||
                    "Field documentation, case studies, and stories of change from the Eastern Ghats."}
                </p>
              </header>

              <div className="health-stories-grid prog-stories-grid reveal">
                {programme.stories.map((story) => (
                  <Link
                    key={story.title}
                    to={story.to}
                    className="health-story-card prog-story-card"
                    aria-label={`Read story: ${story.title}`}
                  >
                    <div className="health-story-card__media prog-story-card__media">
                      <img
                        src={story.image}
                        alt={story.imageAlt}
                        loading="lazy"
                        width={400}
                        height={250}
                      />
                    </div>
                    <div className="health-story-card__content prog-story-card__content">
                      <span className="health-story-card__tag prog-story-card__tag">
                        {story.tag}
                      </span>
                      <h3 className="health-story-card__title prog-story-card__title">
                        {story.title}
                      </h3>
                      <p className="health-story-card__desc prog-story-card__desc">
                        {story.desc}
                      </p>
                      <span className="health-story-card__link prog-story-card__link">
                        {story.linkText || "Read Story"}{" "}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ==================================================================
            6. RELATED PUBLICATIONS (Compact publication cards with PDF links)
            ================================================================== */}
        {programme.publications && programme.publications.length > 0 && (
          <section className="health-band health-band--warm prog-band prog-band--warm">
            <div className="container-page">
              <header className="health-heading prog-heading">
                <p className="type-eyebrow">Publications &amp; Research</p>
                <h2 className="health-heading__title prog-heading__title">
                  {programme.publicationsHeading || "Related Publications"}
                </h2>
                <p className="health-heading__intro prog-heading__intro">
                  {programme.publicationsIntro ||
                    "Verified monographs and research publications documenting LAYA's field practice."}
                </p>
              </header>

              <div className="health-resources-grid prog-resources-grid reveal">
                {programme.publications.map((pub) => (
                  <article
                    key={pub.title}
                    className="health-resource-card prog-resource-card"
                  >
                    <div className="health-resource-card__cover prog-resource-card__cover">
                      <img
                        src={pub.coverImage}
                        alt={`Cover of ${pub.title}`}
                        loading="lazy"
                        width={100}
                        height={140}
                      />
                    </div>
                    <div className="health-resource-card__content prog-resource-card__content">
                      <div className="health-resource-card__meta prog-resource-card__meta">
                        <span className="health-resource-card__date prog-resource-card__date">
                          {pub.date}
                        </span>
                        <span className="health-resource-card__badge prog-resource-card__badge">
                          {pub.type}
                        </span>
                      </div>
                      <h3 className="health-resource-card__title prog-resource-card__title">
                        {pub.title}
                      </h3>
                      <p className="health-resource-card__desc prog-resource-card__desc">
                        {pub.desc}
                      </p>
                      <div className="health-resource-card__actions prog-resource-card__actions">
                        <a
                          href={pub.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline-brand inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold"
                        >
                          <Download className="w-3.5 h-3.5" /> Download PDF
                        </a>
                        <Link
                          to={ROUTES.publications}
                          className="text-xs font-semibold text-secondary hover:text-brand inline-flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" /> View in Library
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ==================================================================
            7. RELATED PROGRAMMES & CALL TO ACTION
            ================================================================== */}
        {/* Other Core Pillars & Programmes */}
        <section className="health-band health-band--sunken prog-band prog-band--sunken">
          <div className="container-page">
            <header className="health-heading prog-heading">
              <p className="type-eyebrow">Related Work</p>
              <h2 className="health-heading__title prog-heading__title">
                Other Core Pillars &amp; Programmes
              </h2>
              <p className="health-heading__intro prog-heading__intro">
                LAYA's approach is organized across 3 Core Pillars: safeguarding land and forest rights,
                lifelong learning, and addressing the climate crisis &amp; sustainable development in unison.
              </p>
            </header>

            <div className="related-grid reveal">
              {related.map((r) => {
                const rCat = PROGRAMME_CATEGORIES.find((c) => c.id === r.category);
                return (
                  <Link key={r.id} to={r.to} className="related">
                    <span className="related__category">{rCat?.label}</span>
                    <h3 className="related__title">{r.title}</h3>
                    <span className="related__summary">{r.summary}</span>
                  </Link>
                );
              })}
            </div>

            <div className="prog-actions" style={{ marginTop: "var(--space-xl)" }}>
              <EditorialLink to={ROUTES.programs}>All Programmes</EditorialLink>
              <EditorialLink to={ROUTES.impact}>Our Impact</EditorialLink>
            </div>
          </div>
        </section>

        {/* Call to Action Box */}
        {programme.cta && (
          <section className="health-band health-band--lavender prog-band prog-band--lavender">
            <div className="container-page">
              <div className="health-cta-box prog-cta-box reveal">
                <p className="health-cta-box__eyebrow prog-cta-box__eyebrow">
                  {programme.cta.eyebrow}
                </p>
                <h2 className="health-cta-box__title prog-cta-box__title">
                  {programme.cta.title}
                </h2>
                <p className="health-cta-box__desc prog-cta-box__desc">
                  {programme.cta.desc}
                </p>
                <div className="health-cta-box__actions prog-cta-box__actions">
                  <Button asChild className="btn-brand">
                    <Link to={programme.cta.primaryBtn.to}>
                      {programme.cta.primaryBtn.label}
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to={programme.cta.secondaryBtn.to}>
                      {programme.cta.secondaryBtn.label}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}
      </MainLayout>
    </>
  );
};

export default ProgrammeDetail;
