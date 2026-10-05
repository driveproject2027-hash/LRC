import { ROUTES } from "@/lib/routes";
import { fcraInformation } from "@/content/about";
import { mockImpactMetrics } from "@/services/api";

/**
 * LAYA — CONTACT, DONATE & FOOTER CONTENT
 * ---------------------------------------------------------------------------
 * All values come from data already in the repository. Gaps are documented
 * rather than filled. See docs/phase-9-audit.md for the full audit.
 */

/* =========================================================================
   CONTACT
   ========================================================================= */

/**
 * Contact details, all of which already appear on the live Contact page,
 * Donate page or ContactModal.
 */
export const CONTACT_DETAILS = {
  address:
    "Plot No 110, D-No: 5-175/1, Behind Bay Crown Apartment, Yendada, Visakhapatnam – 530045, Andhra Pradesh, India",
  phone: "+91-891-2737662",
  phoneHref: "tel:+918912737662",
  email: "info@laya.org.in",
  emailHref: "mailto:info@laya.org.in",
  website: "www.laya.org.in",
  websiteHref: "https://www.laya.org.in",
  whatsapp: "918912737662",
} as const;

export const CONTACT_HEADING = {
  eyebrow: "Get in touch",
  title: "Contact",
  lead: "LAYA welcomes enquiries from communities, partners, researchers and anyone interested in the work.",
} as const;

/**
 * ⚠  SOCIAL LINKS — INTENTIONALLY EMPTY
 *
 * A full repository search found NO social media account URLs for LAYA. The
 * only related reference is an unverified `twitter:site` meta tag in
 * index.html (@layaorg), flagged as possibly broken in the Phase 1 audit.
 *
 * Adding guessed profile URLs would create broken links to accounts that may
 * not belong to LAYA. None are rendered.
 *
 * This typed array is the seam: add verified accounts here and both the
 * Contact page and the Footer will render them without a template change.
 */
export interface SocialLink {
  label: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/layaresourcecenter/posts/?feedView=all" },
  { label: "YouTube", href: "#" },
  { label: "WhatsApp", href: "https://wa.me/918912737662" },
];

/**
 * ⚠  NO MAP IS PROVIDED
 *
 * The repository contains no map embed, iframe, coordinates or map image.
 * The brief said "map if currently available" — it is not, so none is added.
 * Adding a maps provider would introduce an unapproved third-party dependency
 * and a privacy consideration.
 */

/* =========================================================================
   DONATE
   ========================================================================= */

/**
 * Organisation-wide figures, verbatim from `mockImpactMetrics`.
 *
 * NOTE: the previous Donate page showed a "10K+ Families Impacted" stat that
 * appears nowhere else in the repository and conflicts with the Sustainable
 * Resource Management programme's own "10,000 farmer households" figure. It
 * has been removed. Only traceable org-wide metrics are shown.
 */
export const DONATE_METRICS = mockImpactMetrics.map((m) => ({
  value: m.number,
  label: m.title,
}));

/** What contributions support. Each maps to a real programme route. */
export const DONATION_PURPOSES = [
  {
    title: "Rights and entitlements",
    description:
      "Legal advocacy, gram sabha empowerment and Forest Rights Act implementation with Adivasi communities.",
    to: ROUTES.whatWeDoRla,
  },
  {
    title: "Livelihoods and natural resources",
    description:
      "Sustainable farming, millet revival, watershed management and biodiversity conservation.",
    to: ROUTES.whatWeDoSrm,
  },
  {
    title: "Herbal-based health care",
    description:
      "Community herbal medicine systems, herbal gardens and training for health practitioners.",
    to: ROUTES.whatWeDoHbhc,
  },
  {
    title: "Lifelong learning",
    description:
      "Youth and women's leadership, adult literacy and climate education in Adivasi schools.",
    to: ROUTES.whatWeDoLifelongLearning,
  },
] as const;

/**
 * Bank details, verbatim from the existing Donate page. These are the actual
 * donation mechanism — there is no payment gateway.
 */
export const BANK_DOMESTIC = {
  "Account Holder": "LAYA",
  "Account Number": "063310011009657",
  "IFSC Code": "ANDB0000633",
  "Bank Name": "Andhra Bank, Waltair Branch",
  "Bank Address": "Lawsons Bay Colony, Visakhapatnam - 530017",
  "Beneficiary Address":
    "LAYA Plot No.110, Near Senora Beach Resorts, Yendada, Visakhapatnam - 530045",
} as const;

export const BANK_FOREIGN = {
  "Account Holder": "LAYA",
  "Account Number": "063310011007529",
  "Swift Code": "ANDBINBB",
  "IFSC Code": "ANDB0000633",
  "Bank Name": "Andhra Bank, Waltair Branch",
  "Bank Address": "Lawsons Bay, Visakhapatnam",
  "Beneficiary Address":
    "LAYA Plot No.110, Near Senora Beach Resorts, Yendada, Visakhapatnam - 530045",
} as const;

export const DONATE_STATEMENTS = {
  legal:
    "All donations to LAYA are eligible for tax exemption under Section 80G of the Income Tax Act, 1961. You will receive a receipt via email within 3–5 working days. For foreign contributions, please ensure compliance with FCRA regulations.",
  /** States plainly that this page is not an online payment flow. */
  mechanism:
    "LAYA does not currently accept card or online payments. Contributions are made by bank transfer to the accounts below, or by contacting the office. The form on this page records your intent to give so the team can follow up with payment details.",
  fcra: `Registered under the Foreign Contribution Regulation Act. Registration number ${fcraInformation.fcraRegistration.registrationNumber}, dated ${fcraInformation.fcraRegistration.dateOfRegistration}, renewed w.e.f. ${fcraInformation.fcraRegistration.renewalDate}.`,
} as const;

/* =========================================================================
   FOOTER
   ========================================================================= */

export interface FooterColumn {
  title: string;
  links: { label: string; to: string }[];
}

/**
 * Every link below resolves to a real route in src/App.tsx.
 * Verified by `src/test/navigation.test.ts`-style route coverage checks and by
 * a browser link sweep.
 */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "About LAYA", to: ROUTES.about },
      { label: "Our Journey", to: ROUTES.aboutWhoWeAre },
      { label: "Why We Work", to: ROUTES.aboutWayWeWork },
      { label: "Where We Work", to: ROUTES.aboutWhereWeWork },
      { label: "Governance", to: ROUTES.aboutGovernance },
      { label: "Our Team", to: ROUTES.team },
    ],
  },
  {
    title: "Our Work",
    links: [
      { label: "All Programmes", to: ROUTES.programs },
      { label: "Rights & Entitlements", to: ROUTES.whatWeDoRla },
      { label: "Livelihoods & Natural Resources", to: ROUTES.whatWeDoSrm },
      { label: "Health", to: ROUTES.whatWeDoHbhc },
      {
        label: "Education & Lifelong Learning",
        to: ROUTES.whatWeDoLifelongLearning,
      },
      { label: "Climate & Environment", to: ROUTES.whatWeDoClimate },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resource Centre", to: ROUTES.publications },
      { label: "Field Notes", to: ROUTES.stories },
      { label: "Visual Archive", to: ROUTES.gallery },
      { label: "Our Impact", to: ROUTES.impact },
    ],
  },
  {
    title: "Transparency",
    links: [
      {
        label: "Foreign Contribution Reports",
        to: ROUTES.aboutFinancialReports,
      },
      { label: "FCRA Information", to: ROUTES.aboutFcraInformation },
      { label: "Governance", to: ROUTES.aboutGovernance },
      { label: "Support Partners", to: ROUTES.aboutSupportPartners },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", to: ROUTES.contact },
      { label: "Donate", to: ROUTES.donate },
    ],
  },
];

export const FOOTER_IDENTITY = {
  name: "LAYA",
  tagline: "Resource Center for Adivasis",
  description:
    "Working with Adivasi communities of the Eastern Ghats since 1985 — rights, livelihoods, health, learning and climate resilience.",
  /** The organisation's own explanation of its name, already on the About page. */
  meaning: "'Laya' means rhythm — the cosmic balance of creation.",
  founded: "Founded in 1985 · Visakhapatnam, India",
} as const;

/**
 * ⚠  NO LEGAL / POLICY PAGES EXIST
 *
 * The brief asks for legal and policy links. The repository contains no
 * privacy policy, terms of use, or cookie notice page — and no route for any
 * of them. Fabricating links to non-existent pages would produce broken
 * destinations, which the brief explicitly forbids.
 *
 * This typed array is the seam for verified policy documents.
 */
export const LEGAL_LINKS: { label: string; to: string }[] = [];
