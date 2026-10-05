import { useLocation, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { ProgrammeDetail } from "@/components/programme/ProgrammeDetail";
import { ROUTES } from "@/lib/routes";
import { getProgrammeByRoute } from "@/content/programmes";

/**
 * The five `/what-we-do/*` detail pages.
 *
 * Each route renders the shared `ProgrammeDetail` layout with its own
 * programme record. Previously all five were served by a single 433-line
 * component with three near-duplicate rendering branches and hardcoded
 * Tailwind cyan gradients; the content now lives in `src/content/programmes.ts`
 * and there is one layout.
 *
 * All five slugs are unchanged, so existing links and search results keep
 * working:
 *   /what-we-do/rla
 *   /what-we-do/hbhc
 *   /what-we-do/srm
 *   /what-we-do/lifelong-learning
 *   /what-we-do/climate-crisis-sustainable-development
 */
const WhatWeDoCategory = () => {
  const { pathname } = useLocation();
  const programme = getProgrammeByRoute(pathname);

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

  return <ProgrammeDetail programme={programme} />;
};

export default WhatWeDoCategory;
