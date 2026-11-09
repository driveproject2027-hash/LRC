import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { ProgrammeCard } from "@/components/programme/ProgrammeCard";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import {
  CORE_PILLARS,
  CROSS_CUTTING_APPROACHES,
  DIRECTORY_STATS,
  PROGRAMMES,
} from "@/content/programmes";
import EditableText from "@/components/admin/EditableText";
import { useWebsiteContent } from "@/context/ContentContext";

/**
 * OUR WORK / WHAT WE DO — 3 Core Pillars Directory
 * ---------------------------------------------------------------------------
 * LAYA organizes its initiatives across 3 Core Pillars:
 * 1. SAFEGUARDING ADIVASI RIGHTS FOR SOCIAL JUSTICE
 * 2. LIFELONG LEARNING
 * 3. CLIMATE CRISIS & SUSTAINABLE DEVELOPMENT (encompassing Livelihoods & Natural Resources and Health)
 *
 * Each pillar presents wide editorial records with authentic field documentation.
 */
const Programs = () => {
  useRevealOnScroll();
  const { content } = useWebsiteContent();

  const eyebrow = content.home?.ourWork?.eyebrow || "What we do";
  const title = content.home?.ourWork?.heading || content.home?.ourWork?.title || "Our work";
  const lead =
    content.home?.ourWork?.lead ||
    "LAYA organizes its work across three interdependent core pillars: Safeguarding Adivasi Rights for Social Justice, Lifelong Learning, and Climate Crisis & Sustainable Development (integrating sustainable livelihoods, natural resources, and community health across the Eastern Ghats).";

  return (
    <>
      <Helmet>
        <title>Our Work | 3 Core Pillars | LAYA</title>
        <meta
          name="description"
          content="LAYA's work across 3 Core Pillars with Adivasi communities in the Eastern Ghats: Safeguarding Adivasi Rights for Social Justice, Lifelong Learning, and Climate Crisis & Sustainable Development (including Livelihoods, Natural Resources, and Health)."
        />
        <link rel="canonical" href="https://laya.org.in/programs" />
      </Helmet>

      <MainLayout>
        {/* ---- Directory header ------------------------------------------ */}
        <header className="prog-header">
          <div className="prog-header__inner">
            <EditableText
              path="programs.eyebrow"
              label="Page Eyebrow"
              value="What we do"
              as="p"
              className="prog-header__eyebrow type-eyebrow"
            />
            <EditableText
              path="programs.title"
              label="Page Heading"
              value="Our work"
              as="h1"
              className="prog-header__title"
            />
            <EditableText
              path="programs.lead"
              label="Page Lead"
              value="LAYA organizes its work across three interdependent core pillars: Safeguarding Adivasi Rights for Social Justice, Lifelong Learning, and Climate Crisis & Sustainable Development (integrating sustainable livelihoods, natural resources, and community health across the Eastern Ghats)."
              as="p"
              multiline={true}
              className="prog-header__lead"
            />

            <dl className="prog-header__stats">
              <div>
                <dd className="prog-stat__value">
                  {DIRECTORY_STATS.pillarCount}
                </dd>
                <dt className="prog-stat__label">Core Pillars</dt>
              </div>
              <div>
                <dd className="prog-stat__value">
                  {DIRECTORY_STATS.programmeCount}
                </dd>
                <dt className="prog-stat__label">Integrated Initiatives</dt>
              </div>
              <div>
                <dd className="prog-stat__value">1985</dd>
                <dt className="prog-stat__label">Working since</dt>
              </div>
            </dl>
          </div>
        </header>

        {/* ---- The 3 Core Pillars Directory ------------------------------- */}
        <section className="prog-band">
          <div className="container-page">
            {CORE_PILLARS.map((pillar) => {
              const pillarProgrammes = pillar.programmeIds
                .map((id) => PROGRAMMES.find((p) => p.id === id))
                .filter((p): p is typeof PROGRAMMES[0] => Boolean(p));

              if (pillarProgrammes.length === 0) return null;

              return (
                <section key={pillar.id} className="prog-category">
                  <header className="prog-category__header">
                    <span className="prog-category__index">
                      PILLAR {pillar.number}
                    </span>
                    <h2 className="prog-category__name">{pillar.title}</h2>
                    <div className="prog-category__blurb">
                      <p>{pillar.blurb}</p>
                      {pillar.id === "pillar-climate" && (
                        <div className="mt-4 pt-4 border-t border-[#dcd7e3]">
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7664B5] font-sans">
                              5 Divisions (Annual Report 2025–2026)
                            </span>
                            <Link
                              to={ROUTES.whatWeDoClimate}
                              className="text-[11px] font-semibold text-[#1e3a5f] hover:text-[#7664B5] underline font-sans"
                            >
                              Explore Division Details &rarr;
                            </Link>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                            <Link
                              to={ROUTES.whatWeDoSrm}
                              className="group bg-[#f7f5fa] hover:bg-[#ede8f5] border border-[#e8e4ee] hover:border-[#7664B5] p-2.5 transition-colors flex flex-col justify-between"
                            >
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#554388] block">
                                  Division 01
                                </span>
                                <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-brand-purple mt-0.5 transition-colors">
                                  Sustainable Agriculture and Natural Resource Management
                                </h4>
                                <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">
                                  10 Natural Farming Package of Practices, Gulli Ragi, seed centres &amp; gravity irrigation.
                                </p>
                              </div>
                              <span className="text-[10px] font-semibold text-[#7664B5] mt-2 block">
                                Dedicated Page &rarr;
                              </span>
                            </Link>

                            <Link
                              to={ROUTES.whatWeDoHbhc}
                              className="group bg-[#f7f5fa] hover:bg-[#ede8f5] border border-[#e8e4ee] hover:border-[#7664B5] p-2.5 transition-colors flex flex-col justify-between"
                            >
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#554388] block">
                                  Division 02
                                </span>
                                <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-brand-purple mt-0.5 transition-colors">
                                  Biodiversity, Landuse and Ecosystem Restoration
                                </h4>
                                <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">
                                  75 Traditional Health Practitioners, 26 Vanantharam herbal medicines &amp; boiled drinking water.
                                </p>
                              </div>
                              <span className="text-[10px] font-semibold text-[#7664B5] mt-2 block">
                                Dedicated Page &rarr;
                              </span>
                            </Link>

                            <Link
                              to={ROUTES.whatWeDoClimateTechCoastal}
                              className="group bg-[#f7f5fa] hover:bg-[#ede8f5] border border-[#e8e4ee] hover:border-[#7664B5] p-2.5 transition-colors flex flex-col justify-between"
                            >
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#554388] block">
                                  Division 03
                                </span>
                                <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-brand-purple mt-0.5 transition-colors">
                                  Climate-Friendly Technologies and Coastal Ecosystems
                                </h4>
                                <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">
                                  22,714+ clean cookstoves, ceramic pot filters, cool roofing &amp; IMTA seaweed/mussel farming.
                                </p>
                              </div>
                              <span className="text-[10px] font-semibold text-[#7664B5] mt-2 block">
                                Dedicated Page &rarr;
                              </span>
                            </Link>

                            <Link
                              to={ROUTES.whatWeDoUrbanPeriUrban}
                              className="group bg-[#f7f5fa] hover:bg-[#ede8f5] border border-[#e8e4ee] hover:border-[#7664B5] p-2.5 transition-colors flex flex-col justify-between"
                            >
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#554388] block">
                                  Division 04
                                </span>
                                <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-brand-purple mt-0.5 transition-colors">
                                  Urban and Peri-Urban Ecosystems
                                </h4>
                                <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">
                                  Citizen-Centric Climate Action Plans in Visakhapatnam &amp; Yeleswaram with Andhra University.
                                </p>
                              </div>
                              <span className="text-[10px] font-semibold text-[#7664B5] mt-2 block">
                                Dedicated Page &rarr;
                              </span>
                            </Link>

                            <Link
                              to={ROUTES.whatWeDoPartnerEngagements}
                              className="group bg-[#f7f5fa] hover:bg-[#ede8f5] border border-[#e8e4ee] hover:border-[#7664B5] p-2.5 sm:col-span-2 md:col-span-2 transition-colors flex flex-col justify-between"
                            >
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#554388] block">
                                  Division 05
                                </span>
                                <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-brand-purple mt-0.5 transition-colors">
                                  Partner Engagements
                                </h4>
                                <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">
                                  RECAP Northeast India (18 leaders trained in Manipur), UTP Project Fund Administrator &amp; India DONATES.
                                </p>
                              </div>
                              <span className="text-[10px] font-semibold text-[#7664B5] mt-2 block">
                                Dedicated Page &rarr;
                              </span>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </header>

                  {pillarProgrammes.map((programme, pi) => (
                    <ProgrammeCard
                      key={programme.id}
                      programme={programme}
                      reverse={pi % 2 === 1}
                    />
                  ))}
                </section>
              );
            })}
          </div>
        </section>

        {/* ---- Cross-cutting approaches ----------------------------------
            Suggested as categories in the brief, but not programmes: they are
            LAYA's method, running through all five. Presented as approaches. */}
        <section className="prog-band prog-band--warm">
          <div className="container-page">
            <header className="prog-heading">
              <p className="type-eyebrow">How the work is carried</p>
              <h2 className="prog-heading__title">Cross-cutting approaches</h2>
              <p className="prog-heading__intro">
                Two themes run through every programme area rather than sitting
                as programmes of their own.
              </p>
            </header>

            <div className="approach-grid reveal">
              {CROSS_CUTTING_APPROACHES.map((approach) => (
                <div key={approach.title} className="approach">
                  <h3 className="approach__title">{approach.title}</h3>
                  <p className="approach__desc">{approach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Where this happens + onward links -------------------------- */}
        <section className="prog-band">
          <div className="container-page">
            <header className="prog-heading">
              <p className="type-eyebrow">Where we work</p>
              <h2 className="prog-heading__title">Across the Eastern Ghats</h2>
              <p className="prog-heading__intro">
                Field and resource work is centred in Andhra Pradesh, across
                tribal agency areas and district-level partnerships with Adivasi
                communities.
              </p>
            </header>

            <div className="prog-actions">
              <EditorialLink to={ROUTES.aboutWhereWeWork}>
                Where we work
              </EditorialLink>
              <EditorialLink to={ROUTES.impact}>Our impact</EditorialLink>
              <EditorialLink to={ROUTES.publications}>
                Publications
              </EditorialLink>
              <EditorialLink to={ROUTES.contact}>Get in touch</EditorialLink>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Programs;
