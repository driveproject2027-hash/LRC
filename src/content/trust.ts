import { FINANCIAL_REPORTS } from "@/content/resources";
import { fcraInformation, supportPartners, whereWeWork } from "@/content/about";
import { mockImpactMetrics } from "@/services/api";
import { ROUTES } from "@/lib/routes";

import misereorLogo from "@/assets/partners/Misereo.jpg";
import bfwLogo from "@/assets/partners/BFW.jpg";
import ashakiranLogo from "@/assets/partners/Ashakiran.jpg";
import aidLogo from "@/assets/partners/AID.jpg";
import ashaEducationLogo from "@/assets/partners/Asha_Education.jpg";
import ipartnerLogo from "@/assets/partners/IPartner.jpg";
import geapLogo from "@/assets/partners/geap.jpg";
import dstLogo from "@/assets/partners/dst.jpg";
import appiLogo from "@/assets/partners/appi.jpg";
import tcrtmLogo from "@/assets/partners/tcrtm.jpg";
import apmabLogo from "@/assets/partners/apmab.jpg";

/**
 * LAYA — PARTNERS, IMPACT & TRANSPARENCY CONTENT
 * ---------------------------------------------------------------------------
 * Everything here is derived from data already in the repository. Nothing is
 * invented. Three findings shaped this module and are documented in place below.
 *
 * ─────────────────────────────
 * ⚠  FINDING 1 — PARTNER LOGOS
 * ─────────────────────────────
 * Logos were retrieved from the old LAYA website and are rendered alongside the 
 * partner names in the institutional ledger.
 *
 * ─────────────────────────────
 * ⚠  FINDING 2 — TWO CONFLICTING PARTNER LISTS
 * ─────────────────────────────
 *   `mockPartners`  (src/services/api.ts) — 10 names, NO amounts, NO locations,
 *                    and NO stated source. Includes ActionAid, Ford Foundation,
 *                    UNDP India, Ministry of Tribal Affairs, NABARD, UNICEF.
 *   `supportPartners` (src/content/about.ts) — 11 organisations WITH locations
 *                    and WITH contribution amounts, taken verbatim from LAYA's
 *                    published "Support partners (2023-2024)" listing.
 *
 * These lists overlap only on Bread for the World and Ashakiran.
 *
 * The VERIFIED list is used for the directory, because it is traceable to a
 * dated, published disclosure. The unverified `mockPartners` names are NOT
 * displayed — presenting an unconfirmed partnership as fact would be worse than
 * omitting it. See `UNVERIFIED_PARTNER_NAMES` below, which is retained only so
 * the discrepancy stays visible rather than being quietly dropped.
 *
 * ACTION: confirm with LAYA which is authoritative, and whether the
 * `mockPartners` relationships are current and publishable.
 *
 * ─────────────────────────────
 * ⚠  FINDING 3 — CONTRIBUTION AMOUNTS, AND A RECONCILIATION THAT FAILS
 * ─────────────────────────────
 * The brief says show amounts "only where publicly approved". The 2023-2024
 * figures ARE already public: they are published in LAYA's own Support Partners
 * listing. They are shown, with the source and period stated on the page.
 *
 * An earlier revision of this file and of the Partners page claimed these
 * figures "reconcile" with the FCRA Rule 13(b) quarterly receipts on
 * /about/fcra-information. That claim was VERIFIED AND FOUND TO BE FALSE. The
 * wording has been removed here and on the page. The evidence:
 *
 *   Support Partners listing, 2023-2024 .......... ₹5.96 crore (11 partners)
 *   FCRA Rule 13(b) receipts, all quarters ..... ₹7.26 crore (37 receipts)
 *
 * The two do not match, and cannot be made to match, for structural reasons:
 *
 *   1. DIFFERENT SCOPE. Four partners — Azim Premji Foundation (₹1.354 cr),
 *      Department of Science & Technology (₹17.5 L), Tribal Cultural Research &
 *      Training Mission (₹9.9 L) and AP Medicinal & Aromatic Plant Board
 *      (₹3.1 L) — have no FCRA receipt record at all. They are domestic funders,
 *      so their contributions fall outside FCRA reporting by definition.
 *
 *   2. DIFFERENT PERIODS. The FCRA data held here is incomplete: FY 2024-25 has
 *      only Quarters I and II, while the Support Partners figure is a single
 *      annual "2023-2024" total.
 *
 *   3. DIFFERENT PRECISION. The published listing is rounded to two decimals of
 *      a million (e.g. Katholische "25.14 Million INR"); the FCRA receipts are
 *      exact rupee amounts (e.g. ₹25,14,352 over the year).
 *
 *   4. UNEXPLAINED GAPS. Where a partner appears in both, individual totals
 *      still differ — e.g. Association for India's Development is published as
 *      ₹13.9 L but shows ₹6.9 L in FCRA receipts for the same year.
 *
 * The correct statement, used on the page, is simply that the figures come from
 * the published listing. No reconciliation is asserted, because none can be
 * demonstrated from this repository's data.
 *
 * ACTION for LAYA: confirm the authoritative all-source figures per partner per
 * financial year if a reconciled disclosure is wanted.
 * ─────────────────────────────
 */

/* =========================================================================
   PARTNERS
   ========================================================================= */

export interface Partner {
  id: string;
  name: string;
  /** Location where the source states one. */
  location: string | null;
  /** Reported contribution for 2023-2024. Null where the source gives none. */
  amount: string | null;
  /** Parsed value in millions of INR, for sorting. Null where no amount. */
  amountMn: number | null;
  /**
   * Logo for the partner, retrieved from the old website assets.
   */
  logo: string | null;
}

const LOGOS: Record<string, string> = {
  "Katholische Zentralstelle fur Entwicklungshilfe e.V.": misereorLogo,
  "Bread for the World": bfwLogo,
  "Foerderverein e.V., Ashakiran": ashakiranLogo,
  "Association for India's Development (AID)": aidLogo,
  "Asha for Education": ashaEducationLogo,
  "i-Partner India": ipartnerLogo,
  "Human Capability Foundation": geapLogo,
  "Department of Science & Technology": dstLogo,
  "Azim Premji Foundation": appiLogo,
  "Tribal Cultural Research & Training Mission, AP": tcrtmLogo,
  "AP Medicinal & Aromatic Plant Board": apmabLogo,
};

/** Parse "25.14 Million INR" → 25.14 for ordering. */
const parseAmount = (amount: string): number | null => {
  const m = amount.match(/([\d.]+)\s*Million/i);
  return m ? Number(m[1]) : null;
};

export const PARTNERS: Partner[] = supportPartners.partners.map((p, i) => ({
  id: `partner-${i + 1}`,
  name: p.name,
  location: p.location ? p.location : null,
  amount: p.amount ? p.amount : null,
  amountMn: p.amount ? parseAmount(p.amount) : null,
  logo: LOGOS[p.name] || null,
}));

/*
  ORDERING IS DELIBERATELY NEUTRAL.

  An earlier revision sorted this list largest-contribution-first, which turned
  a partner directory into a league table — visually ranking organisations by
  how much they give. That is not the relationship being described, and it is
  not the organisation's place to rank its funders.

  The list now preserves the order of LAYA's published Support Partners
  (2023-2024) listing exactly: `.map()` with no `.sort()`.

  `amountMn` is retained ONLY because it is a faithful parse of the published
  string; nothing sorts or filters on it. The `Reported contribution` column and
  the stated 2023–2024 period are unchanged, so the financial transparency the
  brief requires is fully intact.
*/

/**
 * Names present in the unverified `mockPartners` list that do NOT appear in the
 * published 2023-2024 disclosure. Retained here as evidence of the conflict,
 * and deliberately NOT rendered on the site.
 */
export const UNVERIFIED_PARTNER_NAMES: string[] = mockPartnersNotInDisclosure();

function mockPartnersNotInDisclosure(): string[] {
  // Imported lazily inside a function to keep the source of the conflict
  // visually adjacent to the note about it.
  const mockNames = [
    "Misereor",
    "Bread for the World",
    "ActionAid",
    "Ford Foundation",
    "UNDP India",
    "Ministry of Tribal Affairs",
    "NABARD",
    "UNICEF",
    "Ashakiran e.V.",
    "Fair Climate Services",
  ];
  const verified = new Set(
    supportPartners.partners.map((p) => p.name.toLowerCase()),
  );
  // Rough affiliation check — "Bread for the World" and "Ashakiran" appear in
  // both lists under slightly different names, so match on a keyword.
  const appearsVerified = (n: string) => {
    const key = n.toLowerCase();
    if (verified.has(key)) return true;
    if (key.includes("bread for the world")) return true;
    if (key.includes("ashakiran")) return true;
    return false;
  };
  return mockNames.filter((n) => !appearsVerified(n));
}

export const PARTNERS_HEADING = {
  eyebrow: "Our partners",
  title: "Our Partners",
  lead: "LAYA's work is strengthened through long-term partnerships with organisations that share a commitment to community-led development.",
  /**
   * Stated on the page so the amounts are never read as unqualified.
   *
   * The word "reconcile" has been REMOVED. Verification showed these figures
   * cannot be tied to the FCRA Rule 13(b) receipts — four partners have no FCRA
   * record at all (domestic funders fall outside FCRA scope), the periods do not
   * align, and the published listing is rounded while the receipts are exact.
   * See FINDING 3 in this file for the full evidence. The page states only where
   * the figures come from.
   */
  note: "Contribution figures are those reported in LAYA's published Support Partners listing for 2023–2024. They are presented as reported, rounded to two decimal places of a million rupees, and cover all funding sources rather than FCRA receipts alone.",
} as const;

/* =========================================================================
   IMPACT
   ========================================================================= */

/**
 * Organisation-wide metrics, verbatim from `mockImpactMetrics`.
 * No figure is rounded, reinterpreted or added to.
 */
export const IMPACT_METRICS = mockImpactMetrics;

/**
 * Programme-level outcomes, verbatim from the existing `/impact` page's own
 * "Areas of Impact" block. Each carries the same metric string the page already
 * published, so nothing is strengthened or restated.
 */
export const IMPACT_AREAS = [
  {
    id: "rights",
    title: "Adivasi Rights Secured",
    description:
      "Strengthened socio-economic and cultural rights of Adivasi communities through legal advocacy, gram sabha empowerment, and PESA implementation.",
    metric: "500+ villages",
    to: ROUTES.whatWeDoRla,
  },
  {
    id: "food",
    title: "Food Sovereignty",
    description:
      "Revived traditional millet farming and enabled communities to improve agriculture productivity by watershed management and value added technologies.",
    metric: "10,000+ families",
    to: ROUTES.whatWeDoSrm,
  },
  {
    id: "health",
    title: "Herbal Health Systems",
    description:
      "Legitimized the practice of herbal based medicine to complement prevailing mainstream health care systems in tribal areas.",
    metric: "300+ communities",
    to: ROUTES.whatWeDoHbhc,
  },
  {
    id: "youth",
    title: "Youth & Women Empowerment",
    description:
      "Capacitated young men and women towards a life-long learning process and development of skills enabling them to play leadership roles.",
    metric: "10,000+ youth trained",
    to: ROUTES.whatWeDoLifelongLearning,
  },
] as const;

/**
 * FIELD PRESENCE
 * ---------------------------------------------------------------------------
 * NO MAP IS DRAWN. There is no geo data for the Eastern Ghats, no district
 * boundary file, and no coordinates anywhere in the repository. Plotting
 * villages would mean inventing positions.
 *
 * What IS verified: five office locations with real districts and pincodes,
 * and four named covered districts, from `whereWeWork`. These are presented as
 * a structured location record — which communicates geographic reach honestly —
 * rather than as a fabricated map.
 *
 * ACTION: if a boundary or coordinates file is supplied, a real map can be
 * built on top of this same data.
 */
export const FIELD_LOCATIONS = whereWeWork.locations;
export const COVERED_DISTRICTS = whereWeWork.coverage.districts;
export const COVERAGE_NOTE = whereWeWork.coverage.description;

/* =========================================================================
   TRANSPARENCY
   ========================================================================= */

export interface TransparencyDocument {
  id: string;
  /** What kind of document this is. */
  kind: "Financial disclosure" | "Compliance" | "Governance" | "Publication";
  title: string;
  description: string;
  /**
   * Exactly one of `href` / `to` is set, depending on whether the document is
   * an external PDF or lives on an internal page. Both are optional so an
   * internal-route entry does not have to declare an unused null href.
   */
  href?: string;
  /** Internal route where the document set lives on-site. */
  to?: string;
  meta?: string;
}

/**
 * Only documents that ACTUALLY EXIST are listed.
 *
 * There are no policy PDFs, no registration certificates, no audit reports and
 * no annual reports in the repository — so none are offered. Every entry below
 * resolves to a real PDF or a real internal page.
 */
export const TRANSPARENCY_DOCUMENTS: TransparencyDocument[] = [
  {
    id: "fcra-reg",
    kind: "Compliance",
    title: "FCRA registration",
    description:
      "LAYA is registered under the Foreign Contribution Regulation Act, with the registration number and renewal date published in full.",
    to: ROUTES.aboutFcraInformation,
    // Registration number taken from the FCRA source record, not retyped.
    meta: `Reg. No. ${fcraInformation.fcraRegistration.registrationNumber}`,
  },
  {
    id: "fcra-receipts",
    kind: "Compliance",
    title: "Quarterly foreign contribution receipts",
    description:
      "Donor-wise receipts into LAYA's FCRA account, disclosed under Rule 13(b) of the FCRA Amendment Rules, 2015.",
    to: ROUTES.aboutFcraInformation,
    meta: "Rule 13(b)",
  },
  {
    id: "financial-reports",
    kind: "Financial disclosure",
    title: "Annual foreign contribution reports",
    description:
      "Year-wise disclosure documents, one for each financial year from 2019–20 to 2024–25.",
    to: ROUTES.aboutFinancialReports,
    meta: `${FINANCIAL_REPORTS.length} reports`,
  },
  {
    id: "governance",
    kind: "Governance",
    title: "Governance structure",
    description:
      "The General Body and Board of Management, including office bearers and the meeting cadence of each.",
    to: ROUTES.aboutGovernance,
    meta: "General Body & BoM",
  },
  {
    id: "partners",
    kind: "Financial disclosure",
    title: "Support partners and contributions",
    description:
      "The organisations supporting LAYA's work, with the contributions reported for 2023–2024.",
    to: ROUTES.aboutSupportPartners,
    meta: "2023–2024",
  },
  {
    id: "publications",
    kind: "Publication",
    title: "Resource Centre",
    description:
      "Case studies, policy briefs, research and field documentation published by LAYA.",
    to: ROUTES.publications,
    meta: "Document library",
  },
];

export const TRANSPARENCY_HEADING = {
  eyebrow: "Transparency",
  title: "Transparency & accountability",
  lead: "LAYA publishes its governance structure, its FCRA compliance details and its foreign contribution disclosures. Every document below is available to read.",
} as const;
