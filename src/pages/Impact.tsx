import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, FileText, Info, ShieldCheck, MapPin } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { EditorialLink } from "@/components/home/EditorialLink";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import { illustrationAssets } from "@/assets/illustrationAssets";
import { useWebsiteContent } from "@/context/ContentContext";
import EditableText from "@/components/admin/EditableText";
import {
  HEADLINE_STATISTICS,
  PROGRAMME_IMPACT_RECORDS,
  FEATURED_IMPACT_STORIES,
  IMPACT_GEOGRAPHY,
  STATISTICS_FLAGGED_FOR_LAYA,
} from "@/content/impact";

/**
 * IMPACT  →  /impact
 * ---------------------------------------------------------------------------
 * Evidence-led presentation of LAYA's work with Adivasi communities across the
 * Eastern Ghats. Real-time updates in CMS are dynamically rendered here.
 * ---------------------------------------------------------------------------
 */
const Impact = () => {
  useRevealOnScroll();
  const { content } = useWebsiteContent();

  const headlineStats = content.impact?.headlineStatistics?.length
    ? content.impact.headlineStatistics.map((stat, idx) => {
        const fallback = HEADLINE_STATISTICS[idx % HEADLINE_STATISTICS.length];
        return {
          id: `stat-${idx}`,
          value: `${stat.value}${stat.suffix || ""}`,
          label: stat.label,
          description: stat.detail || fallback?.description || "",
          unit: fallback?.unit || "Outcome Metric",
          source: fallback?.source || "Institutional Archives",
          period: fallback?.period || "1985–Present",
          scope: fallback?.scope || "Field Operations",
        };
      })
    : HEADLINE_STATISTICS;

  return (
    <>
      <Helmet>
        <title>Our Impact &amp; Outcomes | LAYA</title>
        <meta
          name="description"
          content="Evidence-led presentation of LAYA's work with Adivasi communities across the Eastern Ghats: four decades of service, 1,500+ villages reached, 25,000+ acres reclaimed, and outcomes across rights, food sovereignty, health and learning."
        />
        <link rel="canonical" href="https://laya.org.in/impact" />
      </Helmet>

      <MainLayout>
        {/* ---- 1. Header & Concise Introduction --------------------------- */}
        <header className="trust-header">
          <div className="trust-header__inner">
            <EditableText
              path="impact.hero.eyebrow"
              label="Impact Eyebrow"
              value={content.impact?.hero?.eyebrow || "Evidence & Outcomes · Eastern Ghats"}
              as="p"
              className="trust-header__eyebrow type-eyebrow"
            />
            <EditableText
              path="impact.hero.title"
              label="Impact Title"
              value={content.impact?.hero?.title || "Four Decades of Community-Led Transformation"}
              as="h1"
              className="trust-header__title"
            />
            <EditableText
              path="impact.hero.lead"
              label="Impact Description"
              value={
                content.impact?.hero?.lead ||
                "Since 1985, LAYA has accompanied Adivasi communities across the Scheduled Areas of Andhra Pradesh. Our work is grounded in constitutional rights, indigenous agro-biodiversity, community herbal medicine, and youth leadership—fostering self-reliance rather than dependency."
              }
              as="p"
              multiline={true}
              className="trust-header__lead"
            />
          </div>
        </header>

        {/* ---- 2. Headline Verified Statistics ---------------------------- */}
        <section className="trust-band" aria-labelledby="headline-stats-heading">
          <div className="trust-header__inner">
            <div className="sr-only" id="headline-stats-heading">
              Headline Impact Statistics
            </div>

            {headlineStats && headlineStats.length > 0 && (
              <dl className="impact-figures reveal">
                {headlineStats.map((stat, index) => (
                  <div key={stat.id} className="impact-figure">
                    <div>
                      <dd className="impact-figure__value">
                        <AnimatedCounter value={stat.value} />
                      </dd>
                      <dt className="impact-figure__label">{stat.label}</dt>
                      {stat.description && <p className="impact-figure__desc">{stat.description}</p>}
                    </div>

                    <div className="impact-provenance">
                      <span
                        className={`impact-tag ${
                          index % 2 === 0 ? "impact-tag--lavender" : "impact-tag--cyan"
                        }`}
                      >
                        {stat.unit}
                      </span>
                      {stat.source && (
                        <span className="block w-full text-[11px] text-neutral-500 mt-1">
                          <strong>Source:</strong> {stat.source}
                        </span>
                      )}
                      {stat.period && (
                        <span className="block w-full text-[11px] text-neutral-500">
                          <strong>Period:</strong> {stat.period} {stat.scope ? `· ${stat.scope}` : ""}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </dl>
            )}

            <div className="trust-note mt-6">
              <EditableText
                path="impact.provenanceNotice"
                label="Provenance Notice"
                value={
                  typeof content.impact?.provenanceNotice === "string"
                    ? content.impact.provenanceNotice
                    : "Data Provenance Notice: These organisation-wide figures are drawn from LAYA's institutional charters, project activity ledgers, and audited annual reports. Detailed programme breakdowns with specific units and scopes are documented below."
                }
                as="p"
                multiline={true}
                className="text-xs text-neutral-700 leading-relaxed"
              />
            </div>
          </div>
        </section>

        {/* ---- 3. Programme-Specific Verified Impact Outcomes ------------- */}
        <section
          className="trust-band trust-band--warm"
          aria-labelledby="programmes-impact-heading"
        >
          <div className="trust-header__inner">
            <header className="trust-heading">
              <EditableText
                path="impact.thematicHeading.eyebrow"
                label="Thematic Reach Eyebrow"
                value={content.impact?.thematicHeading?.eyebrow || "Thematic Reach"}
                as="p"
                className="type-eyebrow"
              />
              <EditableText
                path="impact.thematicHeading.title"
                label="Thematic Reach Title"
                value={content.impact?.thematicHeading?.title || "How LAYA's Programmes Create Structural Change"}
                as="h2"
                className="trust-heading__title"
              />
              <EditableText
                path="impact.thematicHeading.intro"
                label="Thematic Reach Description"
                value={
                  content.impact?.thematicHeading?.intro ||
                  "Verified data and field outcomes across our five core thematic areas. Each statistic reflects real community accompaniment rather than theoretical estimates."
                }
                as="p"
                multiline={true}
                className="trust-heading__intro"
              />
            </header>

            <div className="space-y-12 reveal">
              {PROGRAMME_IMPACT_RECORDS.map((rec, idx) => (
                <article key={rec.id} className="programme-impact-card">
                  <div className="programme-impact-card__grid">
                    {/* Left: Narrative, Stats Ledger & Key Outcomes */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`impact-tag ${
                            idx % 2 === 0
                              ? "impact-tag--lavender"
                              : "impact-tag--cyan"
                          }`}
                        >
                          {rec.thematicArea}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
                        {rec.programmeTitle}
                      </h3>

                      <p className="text-sm text-neutral-700 mt-2 leading-relaxed">
                        {rec.leadParagraph}
                      </p>

                      {/* Verified stats row for this programme */}
                      <div className="programme-impact-card__metrics">
                        {rec.stats.map((st) => (
                          <div key={st.id} className="programme-stat-item">
                            <div className="programme-stat-item__val">
                              <AnimatedCounter value={st.value} />
                            </div>
                            <div className="programme-stat-item__lbl">
                              {st.label}
                            </div>
                            <p className="programme-stat-item__desc">
                              {st.description}
                            </p>
                            <div className="text-[10px] text-neutral-500 mt-2 pt-1 border-t border-neutral-200">
                              <span>
                                <strong>Period:</strong> {st.period}
                              </span>
                              <span className="block truncate">
                                <strong>Source:</strong> {st.source}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Structural outcomes bullet points */}
                      <div className="mt-4 pt-3 border-t border-border-subtle">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                          Key Structural Milestones:
                        </h4>
                        <ul className="space-y-1.5">
                          {rec.keyOutcomes.map((outcome, oIdx) => (
                            <li
                              key={oIdx}
                              className="text-xs text-neutral-700 flex items-start gap-2"
                            >
                              <CheckCircle2
                                className="w-3.5 h-3.5 text-[#7664B5] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5">
                        <Link
                          to={rec.route}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7664B5] hover:text-[#5D4B94] transition-colors"
                        >
                          <span>Explore {rec.programmeTitle}</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>

                    {/* Right: Authentic Photograph with Captions */}
                    <div className="space-y-2">
                      <figure className="border border-border-subtle bg-white p-2 shadow-sm">
                        <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                          <img
                            src={rec.photograph.src}
                            alt={rec.photograph.alt}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <figcaption className="mt-2 text-[11px] text-neutral-600 leading-normal">
                          <span>{rec.photograph.caption}</span>
                          {rec.photograph.credit && (
                            <span className="block text-[10px] text-neutral-600 mt-0.5">
                              Photo credit: {rec.photograph.credit}
                            </span>
                          )}
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---- 4. Featured Impact Stories from the Field ------------------ */}
        <section className="trust-band" aria-labelledby="featured-stories-heading">
          <div className="trust-header__inner">
            <header className="trust-heading">
              <p className="type-eyebrow">Lived Experience</p>
              <h2 id="featured-stories-heading" className="trust-heading__title">
                Stories from the Field
              </h2>
              <p className="trust-heading__intro">
                Behind every number are real Adivasi communities asserting their dignity,
                reclaiming ancestral hills, and building self-determined futures.
              </p>
            </header>

            <div className="impact-stories-grid reveal">
              {FEATURED_IMPACT_STORIES.map((story) => (
                <Link
                  key={story.id}
                  to={story.route}
                  className="impact-story-card group"
                  aria-label={`Read story: ${story.title}`}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                    <img
                      src={story.image}
                      alt={story.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                  <div className="impact-story-card__body">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7664B5]">
                      {story.programmeTitle}
                    </span>
                    <h3 className="impact-story-card__title group-hover:text-[#7664B5] transition-colors">
                      {story.title}
                    </h3>
                    <p className="impact-story-card__excerpt">{story.excerpt}</p>
                    <span className="mt-4 text-xs font-semibold text-neutral-700 inline-flex items-center gap-1 group-hover:text-[#7664B5]">
                      Read Field Note <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="trust-actions mt-8">
              <EditorialLink to={ROUTES.stories}>
                Explore all Field Stories
              </EditorialLink>
              <EditorialLink to={ROUTES.publications}>
                Digital Resource Library
              </EditorialLink>
            </div>
          </div>
        </section>

        {/* ---- 5. Geographic Scope & Field Presence ----------------------- */}
        <section
          className="trust-band trust-band--warm"
          aria-labelledby="field-presence-heading"
        >
          <div className="trust-header__inner">
            <header className="trust-heading">
              <p className="type-eyebrow">Geographic Reach</p>
              <h2 id="field-presence-heading" className="trust-heading__title">
                Field Presence Across the Eastern Ghats
              </h2>
              <p className="trust-heading__intro">{IMPACT_GEOGRAPHY.note}</p>
            </header>

            <div className="presence-grid reveal">
              <div>
                <h3 className="partner-caption flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-neutral-800 mb-3">
                  <MapPin className="w-4 h-4 text-[#7664B5]" aria-hidden="true" />
                  <span>Administrative Districts Covered</span>
                </h3>
                <ul className="presence-districts">
                  {IMPACT_GEOGRAPHY.districts.map((d) => (
                    <li key={d} className="presence-district">
                      <span className="font-medium text-neutral-900">{d}</span>
                      <span className="presence-district__mark">
                        Andhra Pradesh
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="trust-note mt-5 bg-white border-l-2 border-[#59BCE8]">
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    <strong>Cartographic Transparency:</strong> {IMPACT_GEOGRAPHY.caveat}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="partner-caption text-sm font-bold uppercase tracking-wider text-neutral-800 mb-3">
                  Offices and Field Units
                </h3>
                <div className="presence-locations">
                  {IMPACT_GEOGRAPHY.offices.map((loc) => (
                    <div key={loc.name} className="presence-location">
                      <div className="presence-location__head">
                        <span className="presence-location__name">
                          {loc.name}
                        </span>
                        <span className="presence-location__type">
                          {loc.type}
                        </span>
                      </div>
                      <p className="presence-location__meta">
                        {loc.district} · PIN {loc.pincode}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Regional landscape representation */}
            <figure
              className="editorial-figure reveal"
              style={{
                marginTop: "var(--space-2xl)",
                marginBottom: "var(--space-xl)",
              }}
            >
              <div className="editorial-featured-media editorial-aspect-16-9 max-h-[28rem]">
                <img
                  src={illustrationAssets.easternGhatsLandscape.src}
                  alt={illustrationAssets.easternGhatsLandscape.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: "center 45%" }}
                />
              </div>
              <figcaption className="editorial-caption">
                <span>
                  The Eastern Ghats · Regional habitat across Visakhapatnam, East Godavari,
                  Alluri Sitharama Raju &amp; Srikakulam
                </span>
                <span className="editorial-caption__badge">Illustrative image</span>
              </figcaption>
            </figure>

            <div className="trust-actions">
              <EditorialLink to={ROUTES.aboutWhereWeWork}>
                Detailed Office Directory
              </EditorialLink>
              <EditorialLink to={ROUTES.aboutSupportPartners}>
                Support Partners
              </EditorialLink>
            </div>
          </div>
        </section>

        {/* ---- 6. Transparency, Reports & Accountability ------------------ */}
        <section
          className="trust-band trust-band--sunken"
          aria-labelledby="accountability-heading"
        >
          <div className="trust-header__inner">
            <header className="trust-heading">
              <p className="type-eyebrow">Governance &amp; Reports</p>
              <h2 id="accountability-heading" className="trust-heading__title">
                Transparency &amp; Statutory Compliance
              </h2>
              <p className="trust-heading__intro">
                LAYA is committed to complete public transparency. We publish our full
                governance structure, foreign contribution reports from FY 2019–20 through
                FY 2024–25, FCRA Rule 13(b) receipts, and partner contributions.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal">
              <div className="p-4 bg-white border border-border-subtle flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-none bg-purple-50 text-[#7664B5] flex items-center justify-center mb-3">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-neutral-900">
                    Foreign Contribution Disclosures
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Annual filings and quarterly receipts disclosed under FCRA Rule 13(b).
                  </p>
                </div>
                <Link
                  to={ROUTES.aboutFinancialReports}
                  className="mt-4 text-xs font-bold text-[#7664B5] hover:text-[#5D4B94] inline-flex items-center gap-1"
                >
                  View Reports <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-4 bg-white border border-border-subtle flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-none bg-blue-50 text-[#0284c7] flex items-center justify-center mb-3">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-neutral-900">
                    Governance &amp; Board
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    General Body, Board of Management, and leadership meeting cadence.
                  </p>
                </div>
                <Link
                  to={ROUTES.aboutGovernance}
                  className="mt-4 text-xs font-bold text-[#7664B5] hover:text-[#5D4B94] inline-flex items-center gap-1"
                >
                  View Governance <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-4 bg-white border border-border-subtle flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-none bg-purple-50 text-[#7664B5] flex items-center justify-center mb-3">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-neutral-900">
                    Publications &amp; Case Studies
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    Case studies, legal monographs, research papers, and policy briefs.
                  </p>
                </div>
                <Link
                  to={ROUTES.publications}
                  className="mt-4 text-xs font-bold text-[#7664B5] hover:text-[#5D4B94] inline-flex items-center gap-1"
                >
                  Browse Library <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="trust-actions mt-8">
              <EditorialLink to={ROUTES.aboutFcraInformation}>
                FCRA Registration &amp; Details
              </EditorialLink>
              <EditorialLink to={ROUTES.aboutSupportPartners}>
                Support Partners (2023–2024)
              </EditorialLink>
            </div>
          </div>
        </section>

        {/* ---- 7. Institutional Data Integrity Ledger --------------------- */}
        <section
          className="trust-band"
          aria-labelledby="data-integrity-heading"
        >
          <div className="trust-header__inner">
            <header className="trust-heading">
              <p className="type-eyebrow">Data Integrity</p>
              <h2 id="data-integrity-heading" className="trust-heading__title">
                Statistics Requiring Confirmation from LAYA
              </h2>
              <p className="trust-heading__intro">
                In adhering to strict evidence-led principles, we openly document figures
                from historical repositories that require confirmation or updated baselines
                from LAYA leadership.
              </p>
            </header>

            <div className="border border-border-subtle bg-white overflow-x-auto reveal">
              <table className="w-full min-w-[620px] text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-border-subtle text-neutral-700">
                    <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider">
                      Statistic
                    </th>
                    <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider">
                      Current Display
                    </th>
                    <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider">
                      Repository Source
                    </th>
                    <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider">
                      Verification Action Required
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-neutral-800">
                  {STATISTICS_FLAGGED_FOR_LAYA.map((item, i) => (
                    <tr key={i} className="hover:bg-neutral-50/50">
                      <td className="py-2.5 px-3.5 font-semibold text-neutral-900">
                        {item.statistic}
                      </td>
                      <td className="py-2.5 px-3.5 font-mono text-[#7664B5] font-semibold">
                        {item.currentDisplay}
                      </td>
                      <td className="py-2.5 px-3.5 text-neutral-600">
                        {item.sourceInRepo}
                      </td>
                      <td className="py-2.5 px-3.5 text-neutral-700">
                        <div className="flex items-start gap-1.5">
                          <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{item.actionRequired}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                to={ROUTES.donate}
                className="bg-[#7664B5] hover:bg-[#604E9E] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-colors shadow-none"
              >
                Support LAYA's Work
              </Link>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Impact;
