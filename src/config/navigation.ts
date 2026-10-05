import { ROUTES } from "@/lib/routes";

/**
 * LAYA — GLOBAL NAVIGATION CONFIGURATION
 * ---------------------------------------------------------------------------
 * Single source of truth for the header, the mobile drawer, and the footer's
 * sitemap. Change navigation here, not in components.
 *
 * ROUTE MAPPING CONTRACT
 *   Every route declared in `src/App.tsx` is reachable from this config.
 *   `NAV_ROUTE_COVERAGE` at the bottom of this file is asserted by a test, so
 *   adding a route without a navigation entry fails the build rather than
 *   silently orphaning a page.
 *
 * IA DECISIONS (deliberate, not accidental):
 *   - `Our Work` is the label for programmes. The routes live under
 *     `/what-we-do/*`, and `/programs` is the index. Both remain reachable.
 *   - `Impact` groups the impact page with stories, which is where outcome
 *     narratives actually live.
 *   - `Resources` groups publications, gallery and financial/FCRA documents —
 *     everything a funder, journalist or researcher would look for.
 *   - `Publications` stays a top-level direct link (it is the single most
 *     externally referenced destination) AND appears under Resources for
 *     discoverability.
 *   - `Team` sits under About, where institutional readers expect it.
 *   - `Contact` is a top-level item: with the Donate CTA it is the primary
 *     conversion path, and it fits without crowding.
 *
 * `match` lists extra pathname prefixes that should light the item up as
 * active — used where a section's routes do not share a common prefix.
 */

export interface NavChild {
  label: string;
  path: string;
  /** Optional one-line description, shown in the desktop dropdown. */
  description?: string;
}

export interface NavItem {
  label: string;
  path: string;
  children?: NavChild[];
  /** Extra pathname prefixes that mark this item active. */
  match?: string[];
}

/** Primary navigation — order is meaningful; it reads as a narrative. */
export const PRIMARY_NAV: NavItem[] = [
  {
    label: "About",
    path: ROUTES.about,
    match: [ROUTES.about],
    children: [
      {
        label: "Who We Are",
        path: ROUTES.aboutWhoWeAre,
        description: "Vision, mission and the values behind the work",
      },
      {
        label: "Our Story",
        path: ROUTES.about,
        description: "Four decades of accompaniment in the Eastern Ghats",
      },
      {
        label: "Our Journey",
        path: ROUTES.aboutWhoWeAre,
        description: "Seven phases of learning, from 1984 to today",
      },
      {
        label: "How We Work",
        path: ROUTES.aboutWayWeWork,
        description: "Management, systems and accountability",
      },
      {
        label: "Where We Work",
        path: ROUTES.aboutWhereWeWork,
        description: "Field units across Andhra Pradesh",
      },
      {
        label: "Our Team",
        path: ROUTES.team,
        description: "The people behind the mission",
      },
      {
        label: "Governance",
        path: ROUTES.aboutGovernance,
        description: "General Body and Board of Management",
      },
      {
        label: "Support Partners",
        path: ROUTES.aboutSupportPartners,
        description: "The institutions that make this work possible",
      },
    ],
  },
  {
    label: "Our Work",
    path: ROUTES.programs,
    match: [ROUTES.programs, ROUTES.whatWeDo],
    children: [
      {
        label: "All Programmes",
        path: ROUTES.programs,
        description: "Overview of LAYA's integrated programme areas",
      },
      {
        label: "Rights & Entitlements",
        path: ROUTES.whatWeDoRla,
        description: "Land rights, self-governance and legal action",
      },
      {
        label: "Health",
        path: ROUTES.whatWeDoHbhc,
        description: "Herbal-based health care with traditional knowledge",
      },
      {
        label: "Livelihoods & Natural Resources",
        path: ROUTES.whatWeDoSrm,
        description: "Sustainable farming, water and biodiversity",
      },
      {
        label: "Education & Lifelong Learning",
        path: ROUTES.whatWeDoLifelongLearning,
        description: "Youth and women leadership pathways",
      },
      {
        label: "Climate & Environment",
        path: ROUTES.whatWeDoClimate,
        description: "Climate resilience and sustainable development",
      },
    ],
  },
  {
    label: "Impact",
    path: ROUTES.impact,
    match: [ROUTES.impact, ROUTES.stories],
    children: [
      {
        label: "Our Impact",
        path: ROUTES.impact,
        description: "Measurable outcomes across the Eastern Ghats",
      },
      {
        label: "Stories from the Field",
        path: ROUTES.stories,
        description: "Firsthand accounts of change and resilience",
      },
    ],
  },
  {
    label: "Resources",
    path: ROUTES.publications,
    match: [
      ROUTES.publications,
      ROUTES.gallery,
      ROUTES.aboutFinancialReports,
      ROUTES.aboutFcraInformation,
    ],
    children: [
      {
        label: "Publications",
        path: ROUTES.publications,
        description: "Research, policy briefs and field documentation",
      },
      {
        label: "Financial Reports",
        path: ROUTES.aboutFinancialReports,
        description: "Year-wise foreign contribution disclosures",
      },
      {
        label: "FCRA Information",
        path: ROUTES.aboutFcraInformation,
        description: "Registration details and quarterly receipts",
      },
      {
        label: "Gallery",
        path: ROUTES.gallery,
        description: "Photographs from LAYA's ongoing work",
      },
    ],
  },
  {
    label: "Publications",
    path: ROUTES.publications,
  },
];

/** Secondary items rendered on the right of the desktop nav, before Donate. */
export const SECONDARY_NAV: NavItem[] = [
  {
    label: "Contact",
    path: ROUTES.contact,
  },
];

/** The single primary call to action. There must be exactly one. */
export const DONATE_ITEM: NavItem = {
  label: "Donate",
  path: ROUTES.donate,
};

/**
 * ROUTE COVERAGE
 * Every route from `src/App.tsx` appears here, mapped to the nav entry that
 * surfaces it. `src/test/navigation.test.ts` asserts this matches ROUTES.
 */
export const NAV_ROUTE_COVERAGE: Record<string, string> = {
  [ROUTES.home]: "Logo (brand home link)",
  [ROUTES.about]: "About",
  [ROUTES.aboutWhoWeAre]: "About",
  [ROUTES.aboutWayWeWork]: "About",
  [ROUTES.aboutWhereWeWork]: "About",
  [ROUTES.aboutFinancialReports]: "Resources",
  [ROUTES.aboutFcraInformation]: "Resources",
  [ROUTES.aboutGovernance]: "About",
  [ROUTES.aboutSupportPartners]: "About",
  [ROUTES.programs]: "Our Work",
  [ROUTES.whatWeDoRla]: "Our Work",
  [ROUTES.whatWeDoHbhc]: "Our Work",
  [ROUTES.whatWeDoSrm]: "Our Work",
  [ROUTES.whatWeDoLifelongLearning]: "Our Work",
  [ROUTES.whatWeDoClimate]: "Our Work",
  [ROUTES.publications]: "Publications",
  [ROUTES.stories]: "Impact",
  [ROUTES.donate]: "Donate CTA",
  [ROUTES.impact]: "Impact",
  [ROUTES.gallery]: "Resources",
  [ROUTES.team]: "About",
  [ROUTES.contact]: "Contact",
};

/** Flat list of every link the header can render — used by tests. */
export const ALL_NAV_PATHS: string[] = [
  ...PRIMARY_NAV.flatMap((i) => [
    i.path,
    ...(i.children?.map((c) => c.path) ?? []),
  ]),
  ...SECONDARY_NAV.map((i) => i.path),
  DONATE_ITEM.path,
];
