import { useLocation, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { ProgrammeDetail } from "@/components/programme/ProgrammeDetail";
import { HealthProgramme } from "@/components/programme/HealthProgramme";
import { ROUTES } from "@/lib/routes";
import { getProgrammeByRoute } from "@/content/programmes";
import { useWebsiteContent } from "@/context/ContentContext";

/**
 * The five `/what-we-do/*` detail pages.
 *
 * Each route renders its appropriate layout with its own programme record:
 * - /what-we-do/hbhc renders the dedicated, bespoke HealthProgramme layout
 * - All other routes render the shared ProgrammeDetail layout
 * Real-time edits in /admin are immediately reflected here.
 */
const WhatWeDoCategory = () => {
  const { pathname } = useLocation();
  const { content } = useWebsiteContent();

  const defaultProg = getProgrammeByRoute(pathname);
  const dynamicProg = content.programmes?.find(
    (p) => p.to === pathname || (defaultProg && String(p.id) === String(defaultProg.id))
  );

  const programme = defaultProg
    ? {
        ...defaultProg,
        ...(dynamicProg || {}),
        title: dynamicProg?.title || defaultProg.title,
        shortTitle: dynamicProg?.shortTitle || defaultProg.shortTitle,
        heroEyebrow: dynamicProg?.heroEyebrow || defaultProg.heroEyebrow,
        heroHeading:
          dynamicProg?.heroHeading ||
          dynamicProg?.title ||
          defaultProg.heroHeading ||
          defaultProg.title,
        heroLead:
          dynamicProg?.heroLead ||
          dynamicProg?.lead ||
          defaultProg.heroLead ||
          defaultProg.summary,
        overviewHeading:
          dynamicProg?.overviewHeading || defaultProg.overviewHeading,
        overviewIntro:
          dynamicProg?.overviewIntro ||
          dynamicProg?.description ||
          defaultProg.overviewIntro,
        stats:
          dynamicProg?.glance && dynamicProg.glance.length > 0
            ? dynamicProg.glance.map((g: any) => ({
                value: g.value,
                label: g.label,
                desc: g.detail || g.desc || "",
              }))
            : defaultProg.stats,
        annualReport2026: defaultProg.annualReport2026
          ? {
              ...defaultProg.annualReport2026,
              themeTitle:
                dynamicProg?.annualReportTheme ||
                dynamicProg?.title ||
                defaultProg.annualReport2026.themeTitle,
              keyInitiatives:
                dynamicProg?.objectives && dynamicProg.objectives.length > 0
                  ? dynamicProg.objectives
                  : defaultProg.annualReport2026.keyInitiatives,
            }
          : undefined,
      }
    : dynamicProg;

  // Defensive: the router only mounts this for known slugs, but if a new
  // /what-we-do/* path is ever added without a programme record, render a
  // clear pointer to the directory instead of the wrong programme's content.
  if (!programme) {
    return (
      <MainLayout>
        <header className="prog-header">
          <div className="prog-header__inner">
            <p className="prog-header__eyebrow type-eyebrow">Our work</p>
            <h1 className="prog-header__title">Programme not found</h1>
            <p className="prog-header__lead">
              This programme page is not available. The full programme directory
              lists every area of LAYA's work.
            </p>
            <div className="prog-actions">
              <Link to={ROUTES.programs} className="editorial-link">
                All programmes
              </Link>
            </div>
          </div>
        </header>
      </MainLayout>
    );
  }

  // Bespoke editorial layout for Herbal Based Health Care (/what-we-do/hbhc)
  if (pathname === ROUTES.whatWeDoHbhc) {
    return <HealthProgramme programme={programme} />;
  }

  return <ProgrammeDetail programme={programme} />;
};

export default WhatWeDoCategory;
