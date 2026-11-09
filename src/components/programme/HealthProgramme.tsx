import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Download, ExternalLink, FileText } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import { referenceProgramImages, referencePublications } from "@/assets/referenceAssets";
import imgCommunityHealth from "@/assets/newgallary/THP General body Members in the occasion of inauguration of Community Health Center cum training hall..jpg";
import imgVaccination from "@/assets/newgallary/vaccination.jpeg";
import imgWa123018 from "@/assets/newgallary/WhatsApp Image 2026-08-02 at 12.30.18 PM.jpeg";
import { illustrationAssets } from "@/assets/illustrationAssets";
import { layaPublicationImages } from "@/assets/layaAssets";
import type { Programme } from "@/content/programmes";
import EditableText from "@/components/admin/EditableText";

interface HealthProgrammeProps {
  programme: Programme;
}

/**
 * HEALTH PROGRAMME DETAIL  →  /what-we-do/hbhc
 * ---------------------------------------------------------------------------
 * Bespoke, premium editorial layout for LAYA's Herbal Based Health Care
 * & Vanantharam initiative.
 *
 * Structure (Complies with Phase 2 requirements):
 *   1. HERO SECTION (2-column balanced layout with authentic field photography)
 *   2. HEALTH AT A GLANCE (Compact grid of verified institutional facts)
 *   3. OUR APPROACH (4 concise themes with botanical visual plate)
 *   4. COMMUNITY HEALTH IN ACTION (Editorial alternating photo-text rows)
 *   5. STORIES FROM THE FIELD (Compact image-led case studies and field notes)
 *   6. RELATED RESOURCES (Verified publications with dates and PDF downloads)
 *   7. CALL TO ACTION (Restrained institutional engagement)
 */
export const HealthProgramme = ({ programme }: HealthProgrammeProps) => {
  useRevealOnScroll();

  return (
    <>
      <Helmet>
        <title>Community Health & Traditional Medicine | LAYA</title>
        <meta
          name="description"
          content="LAYA and Vanantharam's community healthcare in the Eastern Ghats: federating traditional healers, training youth practitioners, cultivating medicinal gardens, and operating licensed herbal pharmacies."
        />
        <link rel="canonical" href={`https://laya.org.in${ROUTES.whatWeDoHbhc}`} />
      </Helmet>

      <MainLayout>
        {/* ==================================================================
            1. HERO SECTION (Balanced 2-column layout on desktop)
            ================================================================== */}
        <section className="health-hero">
          <div className="container-page">
            <div className="health-hero__grid">
              <div className="health-hero__content">
                <EditableText
                  path="programmes.1.heroEyebrow"
                  label="Hero Eyebrow"
                  value={programme.heroEyebrow || "Our Work · Community Health · Climate Crisis & Sustainable Development"}
                  as="p"
                  className="health-hero__eyebrow type-eyebrow"
                />
                <EditableText
                  path="programmes.1.heroHeading"
                  label="Programme Heading"
                  value={programme.heroHeading || programme.title || "Herbal Healthcare Rooted in Adivasi Communities"}
                  as="h1"
                  className="health-hero__title"
                />
                <EditableText
                  path="programmes.1.heroLead"
                  label="Hero Lead"
                  value={programme.heroLead || programme.summary || "For over two decades, LAYA and the Vanantharam Trust have accompanied Adivasi communities across the Eastern Ghats to revive, validate, and practice herbal-based medicine. Where mainstream healthcare is distant, we strengthen community health practitioners, cultivate medicinal plant sanctuaries, and provide reliable, affordable care rooted in indigenous knowledge."}
                  as="p"
                  multiline={true}
                  className="health-hero__lead"
                />

                <div className="health-hero__actions">
                  <Button asChild className="btn-brand">
                    <Link to={ROUTES.contact}>Get in Touch</Link>
                  </Button>
                  <EditorialLink to={ROUTES.programs}>
                    All Programmes
                  </EditorialLink>
                </div>
              </div>

              <figure className="health-hero__media-wrap editorial-figure">
                <div className="health-hero__media editorial-featured-media">
                  <img
                    src={referenceProgramImages[1]}
                    alt="Community health practitioners at a LAYA herbal health care training"
                    width={1500}
                    height={1000}
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <figcaption className="editorial-caption">
                  <span>
                    Community health practitioners at a LAYA herbal health care training · Field documentation
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. HEALTH AT A GLANCE (Verified institutional facts)
            ================================================================== */}
        <section className="health-band health-band--warm">
          <div className="container-page">
            <header className="health-heading">
              <p className="type-eyebrow">Institutional Record</p>
              <EditableText
                path="programmes.1.overviewHeading"
                label="Overview Heading"
                value={programme.overviewHeading || "Health in Numbers & Reach"}
                as="h2"
                className="health-heading__title"
              />
              <EditableText
                path="programmes.1.overviewIntro"
                label="Overview Intro"
                value={programme.overviewIntro || "Verified figures from over two decades of community healthcare and traditional medicine practice across the Eastern Ghats."}
                as="p"
                multiline={true}
                className="health-heading__intro"
              />
            </header>

            <dl className="health-glance-grid reveal">
              {(programme.stats && programme.stats.length > 0 ? programme.stats : [
                { value: "300+", label: "Communities Served", desc: "Remote Adivasi hamlets across 4 tribal districts" },
                { value: "350+", label: "Healers Federated", desc: "Traditional Health Practitioners in 4 district networks" },
                { value: "250+", label: "Medicinal Varieties", desc: "Conserved at the central Vanantharam Mother Herbal Garden" },
                { value: "2003", label: "Vanantharam Founded", desc: "Autonomous trust legitimising traditional medicine" },
                { value: "60", label: "Village Sanctuaries", desc: "Grassroots herbal gardens supporting local practitioners" },
                { value: "1-Year", label: "Practitioner Course", desc: "6-module curriculum + clinical apprenticeships" },
              ]).map((st) => (
                <div key={st.label} className="health-glance-item">
                  <dd className="health-glance-item__value">{st.value}</dd>
                  <dt className="health-glance-item__label">{st.label}</dt>
                  <p className="health-glance-item__desc">{st.desc}</p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ==================================================================
            ANNUAL REPORT 2025–2026 DISCLOSURES & FIELD HIGHLIGHTS
            ================================================================== */}
        {programme.annualReport2026 && (
          <section className="health-band health-band--warm border-y border-[#e7e4e9]">
            <div className="container-page">
              <header className="health-heading">
                <p className="type-eyebrow">
                  Annual Report {programme.annualReport2026.reportingYear}
                </p>
                <h2 className="health-heading__title">
                  {programme.annualReport2026.themeTitle}
                </h2>
                <p className="health-heading__intro">
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
            </div>
          </section>
        )}

        {/* ==================================================================
            3. OUR APPROACH (4 concise themes + botanical visual plate)
            ================================================================== */}
        <section className="health-band">
          <div className="container-page">
            <header className="health-heading">
              <p className="type-eyebrow">Our Model</p>
              <h2 className="health-heading__title">
                An Interdependent Healthcare Ecosystem
              </h2>
              <p className="health-heading__intro">
                LAYA approaches healthcare as an ecological, cultural, and
                community process. We integrate ancestral knowledge with rigorous
                hygienic standardisation to deliver dignified, accessible care.
              </p>
            </header>

            <div className="health-approach-layout reveal">
              <div className="health-pillars-grid">
                <article className="health-pillar">
                  <span className="health-pillar__num">01</span>
                  <h3 className="health-pillar__title">
                    Federating Traditional Healers (THPs)
                  </h3>
                  <p className="health-pillar__desc">
                    Organising over 350 Traditional Health Practitioners across 4
                    district networks. We standardise medicine preparation,
                    facilitate peer learning, and secure Panchayat resolution
                    testimonials to protect their legitimacy against commercial
                    exploitation.
                  </p>
                </article>

                <article className="health-pillar">
                  <span className="health-pillar__num">02</span>
                  <h3 className="health-pillar__title">
                    Training Youth as Community Practitioners (CHPs)
                  </h3>
                  <p className="health-pillar__desc">
                    Conducting a structured one-year course across 6 modules for
                    young Adivasi women and men, covering human anatomy, disease
                    diagnostics, communication, and hands-on apprenticeships with
                    senior Traditional Health Practitioners.
                  </p>
                </article>

                <article className="health-pillar">
                  <span className="health-pillar__num">03</span>
                  <h3 className="health-pillar__title">
                    Mother Herbal Gardens &amp; Local Nurseries
                  </h3>
                  <p className="health-pillar__desc">
                    Maintaining central demonstration gardens in Vanantharam (250
                    species) and Gummaripalem (185 species). An 80-variety nursery
                    propagates saplings to establish and replenish 60 village-level
                    medicinal sanctuaries.
                  </p>
                </article>

                <article className="health-pillar">
                  <span className="health-pillar__num">04</span>
                  <h3 className="health-pillar__title">
                    Standardised Pharmacy &amp; Licensed Medicines
                  </h3>
                  <p className="health-pillar__desc">
                    Operating the registered Vanantharam Pharmacy (est. 2012) to
                    manufacture certified Ayurvedic churnams, tailams, and 17
                    single-herb powders. Medicines are supplied directly to
                    village health centers and weekly market clinics.
                  </p>
                </article>
              </div>

              {/* Botanical visual plate */}
              <figure className="editorial-figure">
                <div className="editorial-featured-media editorial-aspect-4-3">
                  <img
                    src={illustrationAssets.herbalGardens.src}
                    alt={illustrationAssets.herbalGardens.alt}
                    loading="lazy"
                    width={1500}
                    height={1000}
                  />
                </div>
                <figcaption className="editorial-caption">
                  <span>{illustrationAssets.herbalGardens.caption}</span>
                  <span className="editorial-caption__badge">
                    {illustrationAssets.herbalGardens.disclosure}
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. COMMUNITY HEALTH IN ACTION (Editorial alternating photo-text rows)
            ================================================================== */}
        <section className="health-band health-band--warm">
          <div className="container-page">
            <header className="health-heading">
              <p className="type-eyebrow">Field Interventions</p>
              <h2 className="health-heading__title">
                Care Delivered Where Access is Hardest
              </h2>
              <p className="health-heading__intro">
                Photographic records of ongoing health accompaniment across
                remote forest settlements and weekly market gatherings.
              </p>
            </header>

            <div className="health-action-rows reveal">
              {/* Row 1: Village Clinics & Shandy Health Camps */}
              <article className="health-action-row">
                <figure className="health-action-row__media-wrap">
                  <div className="health-action-row__media">
                    <img
                      src={imgCommunityHealth}
                      alt="Traditional Health Practitioners General Body meeting at Community Health Center inauguration"
                      loading="lazy"
                      width={1200}
                      height={750}
                    />
                  </div>
                  <figcaption className="editorial-caption">
                    <span>
                      Community Health Center &amp; Training Hall inauguration · Traditional Health Practitioner Federation
                    </span>
                  </figcaption>
                </figure>

                <div className="health-action-row__content">
                  <span className="health-action-row__tag">
                    Primary Care &amp; Outreach
                  </span>
                  <h3 className="health-action-row__title">
                    Grassroots Village Clinics &amp; Shandy Health Camps
                  </h3>
                  <p className="health-action-row__body">
                    Community Health Practitioners operate from village-level
                    health centers located in village huts and stalls, offering
                    immediate natural treatments and dietary counsel for common
                    ailments. To reach scattered hamlets, regular health camps
                    are conducted at bustling weekly markets (shandies), bringing
                    reliable care to thousands who gather from across the hills.
                  </p>
                  <ul className="health-action-row__bullets">
                    <li className="health-action-row__bullet">
                      Nodal village clinics serving surrounding tribal hamlets
                    </li>
                    <li className="health-action-row__bullet">
                      Regular clinical consultations at weekly tribal shandies
                    </li>
                    <li className="health-action-row__bullet">
                      Seasonal epidemic response camps with the AYUSH Department
                    </li>
                  </ul>
                </div>
              </article>

              {/* Row 2: Preventive Health & Immunisation Support (Reversed) */}
              <article className="health-action-row health-action-row--reverse">
                <figure className="health-action-row__media-wrap">
                  <div className="health-action-row__media">
                    <img
                      src={imgVaccination}
                      alt="Adivasi community vaccination and preventive health camp in the Eastern Ghats"
                      loading="lazy"
                      width={1200}
                      height={750}
                    />
                  </div>
                  <figcaption className="editorial-caption">
                    <span>
                      Community vaccination and preventive health outreach · Eastern Ghats field documentation
                    </span>
                  </figcaption>
                </figure>

                <div className="health-action-row__content">
                  <span className="health-action-row__tag">
                    Public Health Collaboration
                  </span>
                  <h3 className="health-action-row__title">
                    Preventive Healthcare &amp; Disease Monitoring
                  </h3>
                  <p className="health-action-row__body">
                    Where qualified medical personnel rarely reside, LAYA works
                    alongside government health departments during high-risk
                    monsoon periods. The team supports active surveillance and
                    preventive education for malaria, tuberculosis, jaundice,
                    and water-borne epidemics, ensuring timely referrals for
                    acute cases.
                  </p>
                  <ul className="health-action-row__bullets">
                    <li className="health-action-row__bullet">
                      Active tracking for tuberculosis, malaria, and seasonal fevers
                    </li>
                    <li className="health-action-row__bullet">
                      Community immunisation mobilisation and preventive awareness
                    </li>
                    <li className="health-action-row__bullet">
                      Promoting clean drinking water and sanitation practices
                    </li>
                  </ul>
                </div>
              </article>

              {/* Row 3: Women's Nutrition & Maternal Health */}
              <article className="health-action-row">
                <figure className="health-action-row__media-wrap">
                  <div className="health-action-row__media">
                    <img
                      src={imgWa123018}
                      alt="Adivasi women participating in a community nutrition and health workshop"
                      loading="lazy"
                      width={1200}
                      height={750}
                    />
                  </div>
                  <figcaption className="editorial-caption">
                    <span>
                      Women&apos;s nutrition workshop and traditional healthcare circle · Field documentation
                    </span>
                  </figcaption>
                </figure>

                <div className="health-action-row__content">
                  <span className="health-action-row__tag">
                    Maternal &amp; Adolescent Wellbeing
                  </span>
                  <h3 className="health-action-row__title">
                    Women&apos;s Health, Nutri-Gardens &amp; Gynaecological Care
                  </h3>
                  <p className="health-action-row__body">
                    Adivasi women and adolescent girls experience high rates of
                    nutritional anaemia and reproductive health vulnerabilities.
                    Vanantharam supports village nutri-gardens for dietary
                    diversity, conducts targeted workshops on gynaecological care
                    with women Traditional Health Practitioners, and prepares
                    iron-rich herbal supplements.
                  </p>
                  <ul className="health-action-row__bullets">
                    <li className="health-action-row__bullet">
                      Backyard nutri-gardens yielding micronutrient-rich herbs and vegetables
                    </li>
                    <li className="health-action-row__bullet">
                      Specialised training for women traditional healers in gynaecological care
                    </li>
                    <li className="health-action-row__bullet">
                      Nutrition counselling addressing endemic maternal anaemia
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. STORIES FROM THE FIELD (Compact image-led links)
            ================================================================== */}
        <section className="health-band">
          <div className="container-page">
            <header className="health-heading">
              <p className="type-eyebrow">Field Evidence</p>
              <h2 className="health-heading__title">Stories from the Field</h2>
              <p className="health-heading__intro">
                Field documentation and case studies on community healthcare,
                indigenous botanical knowledge, and ecological sovereignty.
              </p>
            </header>

            <div className="health-stories-grid reveal">
              <Link
                to={ROUTES.publications}
                className="health-story-card"
                aria-label="Read Herbal Based Health Care in the Resource Centre"
              >
                <div className="health-story-card__media">
                  <img
                    src={referencePublications.hbhcPublication}
                    alt="Herbal Based Health Care publication cover"
                    loading="lazy"
                    width={400}
                    height={250}
                  />
                </div>
                <div className="health-story-card__content">
                  <span className="health-story-card__tag">Case Study</span>
                  <h3 className="health-story-card__title">
                    Documenting Ethnomedicine: The Vanantharam Experience
                  </h3>
                  <p className="health-story-card__desc">
                    How traditional healers across the Eastern Ghats organised
                    into district networks to validate ancestral herbal remedies
                    and counter exploitation.
                  </p>
                  <span className="health-story-card__link">
                    Read in Resource Centre <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>

              <Link
                to="/stories/note-1"
                className="health-story-card"
                aria-label="Read Field Note: Reclaiming the Forest"
              >
                <div className="health-story-card__media">
                  <img
                    src={illustrationAssets.forestStewardship.src}
                    alt={illustrationAssets.forestStewardship.alt}
                    loading="lazy"
                    width={400}
                    height={250}
                  />
                </div>
                <div className="health-story-card__content">
                  <span className="health-story-card__tag">Field Note</span>
                  <h3 className="health-story-card__title">
                    Reclaiming the Forest: A Community&apos;s Journey
                  </h3>
                  <p className="health-story-card__desc">
                    Gram sabha empowerment and ancestral territory rights,
                    safeguarding the natural ecosystems where wild medicinal flora
                    flourishes.
                  </p>
                  <span className="health-story-card__link">
                    Read Field Note <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>

              <Link
                to="/stories/note-2"
                className="health-story-card"
                aria-label="Read Field Note: Seeds of Change & Millet Revival"
              >
                <div className="health-story-card__media">
                  <img
                    src={illustrationAssets.milletRevival.src}
                    alt={illustrationAssets.milletRevival.alt}
                    loading="lazy"
                    width={400}
                    height={250}
                  />
                </div>
                <div className="health-story-card__content">
                  <span className="health-story-card__tag">Field Note</span>
                  <h3 className="health-story-card__title">
                    Seeds of Change: Millet Revival &amp; Nutrition
                  </h3>
                  <p className="health-story-card__desc">
                    Reviving traditional millet varieties to protect dietary
                    biodiversity, combat malnutrition, and build household
                    resilience.
                  </p>
                  <span className="health-story-card__link">
                    Read Field Note <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ==================================================================
            6. RELATED RESOURCES (Verified publications with dates & PDF links)
            ================================================================== */}
        <section className="health-band health-band--warm">
          <div className="container-page">
            <header className="health-heading">
              <p className="type-eyebrow">Publications &amp; Research</p>
              <h2 className="health-heading__title">Related Health Publications</h2>
              <p className="health-heading__intro">
                Verified monographs and field research evaluating community
                health practices and rural environmental interventions.
              </p>
            </header>

            <div className="health-resources-grid reveal">
              {/* Publication 1: Herbal Based Health Care */}
              <article className="health-resource-card">
                <div className="health-resource-card__cover">
                  <img
                    src={referencePublications.hbhcPublication}
                    alt="Cover of Herbal Based Health Care publication"
                    loading="lazy"
                    width={100}
                    height={140}
                  />
                </div>
                <div className="health-resource-card__content">
                  <div className="health-resource-card__meta">
                    <span className="health-resource-card__date">2021</span>
                    <span className="health-resource-card__badge">Report</span>
                  </div>
                  <h3 className="health-resource-card__title">
                    Herbal Based Health Care
                  </h3>
                  <p className="health-resource-card__desc">
                    Exhaustive documentation of traditional Adivasi ethnomedicine,
                    medicinal plant conservation, standardisation processes, and
                    primary healthcare integration in remote regions.
                  </p>
                  <div className="health-resource-card__actions">
                    <a
                      href="https://laya.org.in/PublicFiles/HBHC_SOC.pdf"
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

              {/* Publication 2: Clean Cookstove Projects */}
              <article className="health-resource-card">
                <div className="health-resource-card__cover">
                  <img
                    src={layaPublicationImages[21]}
                    alt="Cover of Clean Cookstove Projects report"
                    loading="lazy"
                    width={100}
                    height={140}
                  />
                </div>
                <div className="health-resource-card__content">
                  <div className="health-resource-card__meta">
                    <span className="health-resource-card__date">January 2018</span>
                    <span className="health-resource-card__badge">Study</span>
                  </div>
                  <h3 className="health-resource-card__title">
                    Clean Cookstove Projects: Social &amp; Cultural Context
                  </h3>
                  <p className="health-resource-card__desc">
                    A rigorous evaluation assessing indoor household air
                    pollution, respiratory health improvements, and socio-cultural
                    adoption challenges in tribal Andhra Pradesh.
                  </p>
                  <div className="health-resource-card__actions">
                    <a
                      href="https://laya.org.in/PublicFiles/Laya_CUDenver_Report.pdf"
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
            </div>
          </div>
        </section>

        {/* ==================================================================
            7. CALL TO ACTION (Restrained institutional invitation)
            ================================================================== */}
        <section className="health-band health-band--lavender">
          <div className="container-page">
            <div className="health-cta-box reveal">
              <p className="health-cta-box__eyebrow">Get Involved</p>
              <h2 className="health-cta-box__title">
                Support Community Health in the Eastern Ghats
              </h2>
              <p className="health-cta-box__desc">
                LAYA and Vanantharam welcome partnerships, academic research
                collaborations, and donor support to expand traditional
                practitioner training, nurture medicinal sanctuaries, and deliver
                dignified healthcare across remote Adivasi villages.
              </p>
              <div className="health-cta-box__actions">
                <Button asChild className="btn-brand">
                  <Link to={ROUTES.contact}>Contact Our Health Team</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to={ROUTES.donate}>Support LAYA&apos;s Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};
