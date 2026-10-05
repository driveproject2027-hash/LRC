/**
 * LAYA — ROUTE CONSTANTS
 * ---------------------------------------------------------------------------
 * Canonical path strings for every route declared in `src/App.tsx`.
 *
 * Why this exists: navigation, the footer, in-page links and tests all need to
 * agree on exact paths. String literals scattered across the codebase drift
 * silently — a typo produces a 404 rather than a build error.
 *
 * These values mirror `src/App.tsx` exactly. If a route is added there, add it
 * here too; `src/test/navigation.test.ts` asserts the two stay in sync.
 */

export const ROUTES = {
  home: "/",

  // About
  about: "/about",
  aboutWhoWeAre: "/about/who-we-are",
  aboutWayWeWork: "/about/way-we-work",
  aboutWhereWeWork: "/about/where-we-work",
  aboutFinancialReports: "/about/financial-reports",
  aboutFcraInformation: "/about/fcra-information",
  aboutGovernance: "/about/governance",
  aboutSupportPartners: "/about/support-partners",

  // Programmes
  programs: "/programs",
  whatWeDo: "/what-we-do",
  whatWeDoRla: "/what-we-do/rla",
  whatWeDoHbhc: "/what-we-do/hbhc",
  whatWeDoSrm: "/what-we-do/srm",
  whatWeDoLifelongLearning: "/what-we-do/lifelong-learning",
  whatWeDoClimate: "/what-we-do/climate-crisis-sustainable-development",

  // Content
  publications: "/publications",
  stories: "/stories",
  impact: "/impact",
  gallery: "/gallery",
  team: "/team",

  // Conversion
  donate: "/donate",
  contact: "/contact",
} as const;

export type RouteKey = keyof typeof ROUTES;

/**
 * Every concrete, navigable route path.
 * Excludes `whatWeDo`, which is a prefix namespace rather than a page.
 * `src/App.tsx` renders `Programs` at /programs and the five
 * `WhatWeDoCategory` routes individually.
 */
export const ALL_ROUTE_PATHS: string[] = [
  ROUTES.home,
  ROUTES.about,
  ROUTES.aboutWhoWeAre,
  ROUTES.aboutWayWeWork,
  ROUTES.aboutWhereWeWork,
  ROUTES.aboutFinancialReports,
  ROUTES.aboutFcraInformation,
  ROUTES.aboutGovernance,
  ROUTES.aboutSupportPartners,
  ROUTES.programs,
  ROUTES.whatWeDoRla,
  ROUTES.whatWeDoHbhc,
  ROUTES.whatWeDoSrm,
  ROUTES.whatWeDoLifelongLearning,
  ROUTES.whatWeDoClimate,
  ROUTES.publications,
  ROUTES.stories,
  ROUTES.impact,
  ROUTES.gallery,
  ROUTES.team,
  ROUTES.donate,
  ROUTES.contact,
];
