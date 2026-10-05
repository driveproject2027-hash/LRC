import { ROUTES } from "@/lib/routes";
import {
  mockImpactMetrics,
  mockPrograms,
  mockStories,
  mockTestimonials,
} from "@/services/api";
import { referenceProgramImages, referencePublications } from "@/assets/referenceAssets";
import { newGalleryImages } from "@/assets/newGalleryAssets";
import heroAdivasiImage from "@/assets/hero-adivasi.webp";
import heroHabitatImage from "@/assets/hero-habitat.webp";
import heroYouthImage from "@/assets/hero-youth.webp";

/**
 * LAYA — HOMEPAGE CONTENT
 * ---------------------------------------------------------------------------
 * Every value here is drawn from content that already exists in the codebase.
 * Nothing on the homepage is invented.
 *
 * SOURCES
 *   - hero copy        — previously approved text in `src/pages/Index.tsx`
 *   - impact figures   — `mockImpactMetrics` in `src/services/api.ts`
 *   - programmes       — `mockPrograms`
 *   - stories          — `mockStories`
 *   - testimonials     — `mockTestimonials`
 *   - publications     — `src/assets/referenceAssets.ts`
 *   - photography      — `src/assets/reference/*` and `src/assets/newgallary/*`
 *
 * ─────────────────────────────
 * ⚠  UNRESOLVED SOURCE CONFLICT — REQUIRES LAYA REVIEW
 * ─────────────────────────────
 * The codebase contains two different figures for villages reached:
 *
 *   "500+ villages"   → `mockPrograms[0].impactMetrics` (Rights programme)
 *   "1,500+ villages" → `mockImpactMetrics[2]` AND the previously published
 *                        homepage hero (`heroHighlights` in Index.tsx)
 *
 * These are not necessarily contradictory — 500+ may be the villages reached
 * by the Rights programme specifically, while 1,500+ is the organisation-wide
 * total. I have NOT normalised or silently picked one.
 *
 * For the homepage I use the organisation-wide figure (1,500+) because it is
 * the value already published on the live homepage and in the organisation's
 * own impact metrics. The 500+ figure remains untouched inside the Rights
 * programme record, where it is scoped to that programme.
 *
 * ACTION: confirm with LAYA which is authoritative for org-wide totals.
 * ─────────────────────────────
 *
 * A second, softer discrepancy exists between "25+ active programmes"
 * (`mockImpactMetrics[3]`) and "50+ green projects" (`mockPrograms[4]`). These
 * describe different things (all programmes vs. climate projects only) and are
 * therefore presented in their own contexts rather than reconciled.
 */

/* -------------------------------------------------------------------------
   HERO
   ------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "The LAYA Chronicle",
  // Previously approved homepage headline, retained rather than replaced.
  headline: "Standing with Adivasi Communities",
  supporting:
    "For nearly four decades, LAYA has walked alongside indigenous communities in the Eastern Ghats — advancing rights, livelihoods, health, and lasting self-reliance.",
  primaryCta: { label: "Explore Our Work", to: ROUTES.programs },
  secondaryCta: { label: "Our Story", to: ROUTES.about },
  /**
   * Organisation-wide figures, taken verbatim from `mockImpactMetrics`.
   * No rounding, no normalising, no new numbers.
   */
  figures: mockImpactMetrics.slice(0, 3).map((m) => ({
    value: m.number,
    label: m.title,
  })),
  /**
   * HERO PHOTOGRAPH
   * `reference/srm.jpg` is the strongest authentic LAYA field image available:
   * a low-angle documentary frame of a woman transplanting paddy, water arcing
   * mid-motion, orange sari against green — livelihoods and land in one image.
   *
   * NOT to be confused with `newGalleryImages[1]`, which is also titled
   * "SRI Paddy" but is a distant wide shot of a group standing in a field.
   */
  slides: [
    {
      headline: "Standing with Adivasi Communities in the Eastern Ghats",
      supporting: "Four decades of field practice, action-research and policy advocacy to protect natural resource rights and foster sustainable livelihoods.",
      image: {
        src: heroAdivasiImage,
        alt: "An Adivasi transplanting paddy seedlings in a flooded field in the Eastern Ghats",
        caption: "Paddy transplantation, Eastern Ghats",
      },
    },
    {
      headline: "Nurturing the Land, Sustaining the Future",
      supporting: "Empowering indigenous farmers with sustainable agriculture practices to preserve the rich biodiversity of their ancestral lands.",
      image: {
        src: heroHabitatImage,
        alt: "Adivasi farmers engaged in sustainable agriculture",
        caption: "Sustainable agriculture — Eastern Ghats",
      },
    },
    {
      headline: "Empowering the Next Generation of Leaders",
      supporting: "Equipping rural youth with the knowledge, skills, and confidence to drive positive change within their communities.",
      image: {
        src: heroYouthImage,
        alt: "Youth participating in a community workshop",
        caption: "Youth empowerment workshop — Eastern Ghats",
      },
    }
  ],
} as const;

/* -------------------------------------------------------------------------
   FOUR DECADES
   ------------------------------------------------------------------------- */

export const fourDecades = {
  eyebrow: "About LAYA",
  heading: "Four decades of working alongside communities",
  // Drawn from the previously approved About preview copy.
  paragraphs: [
    "LAYA — meaning 'rhythm' — is a civil society organisation founded in 1985 in Visakhapatnam. It serves as a resource centre dedicated to Adivasi communities inhabiting the Eastern Ghats, who are increasingly marginalised despite living in resource-rich areas.",
    "For over 39 years, LAYA has worked alongside indigenous communities on land rights, governance, livelihoods, education and cultural preservation — rooted in the belief that Adivasi wisdom holds keys to sustainable development.",
  ],
  cta: { label: "Our Story", to: ROUTES.about },
  since: "Serving Adivasi communities since 1985",
  image: {
    src: newGalleryImages[5].src, // Community Health Centre inauguration
    alt: "Adivasi community members gathered at the inauguration of a Community Health Centre and training hall",
    caption: newGalleryImages[5].title,
  },
  // The three principles previously shown as feature cards on the homepage.
  principles: [
    {
      title: "Nature-centered",
      description:
        "Rooted in the wisdom of forests, land, and water systems of the Eastern Ghats.",
    },
    {
      title: "Community-led",
      description:
        "Programmes shaped by Adivasi communities through gram sabhas and local institutions.",
    },
    {
      title: "Culturally rooted",
      description:
        "Honouring indigenous knowledge, identity, and the rhythm of resilient lives.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------
   OUR WORK — documentary index
   ------------------------------------------------------------------------- */

/**
 * Programmes are taken from `mockPrograms` with their real routes and images.
 * The first programme is featured; the remainder form the supporting rail.
 */
export const ourWork = {
  eyebrow: "What we do",
  heading: "Integrated work across five programme areas",
  intro:
    "LAYA's work is interdependent: rights secure land, land sustains livelihoods, livelihoods shape health and learning, and all of it is bounded by the climate of the Eastern Ghats.",
  cta: { label: "All programmes", to: ROUTES.programs },
  programmes: mockPrograms.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    category: p.category,
    metric: p.impactMetrics[0],
  })),
} as const;

/*
  Programme routes now live with the programme records in
  `src/content/programmes.ts`, which is the canonical source. Re-exported here
  so existing homepage imports keep working without a second hand-maintained
  copy that could drift out of sync.
*/
export { PROGRAMME_ROUTES } from "@/content/programmes";

/* -------------------------------------------------------------------------
   STORIES FROM THE FIELD
   ------------------------------------------------------------------------- */

/**
 * Stories come from `mockStories`. There are currently NO individual story
 * routes in the router (see `src/App.tsx`), so every story links to the
 * `/stories` index. No route is invented here.
 */
export const stories = {
  eyebrow: "Stories from the field",
  heading: "Documented from the ground",
  intro: "Field accounts from LAYA's work with Adivasi communities.",
  cta: { label: "All stories", to: ROUTES.stories },
  items: mockStories.map((s) => ({
    id: s.id,
    title: s.title,
    excerpt: s.excerpt,
    author: s.author,
    date: s.date,
    image: s.image,
    // No story detail route exists — index is the correct destination.
    to: ROUTES.stories,
  })),
} as const;

/* -------------------------------------------------------------------------
   THE LAYA CHRONICLE — knowledge identity
   ------------------------------------------------------------------------- */

/**
 * Publication covers are the real document scans already used by the
 * Publications page. Counts come from the existing publications dataset.
 */
export const chronicle = {
  eyebrow: "Knowledge",
  heading: "The LAYA Chronicle",
  intro:
    "Four decades of field practice, research and documentation — published as policy briefs, case studies, training manuals and reports.",
  cta: { label: "Browse publications", to: ROUTES.publications },
  documents: [
    {
      title: "The LAYA Chronicle",
      description:
        "LAYA's story of change on sustainable farming, featured in Azim Premji University's compendium.",
      image: referencePublications.chronicle,
      to: ROUTES.publications,
    },
    {
      title: "Herbal Based Health Care",
      description:
        "Strengthening local and relevant herbal-based healthcare practices with Adivasi communities.",
      image: referencePublications.hbhcPublication,
      to: ROUTES.publications,
    },
    {
      title: "Response to COVID-19",
      description:
        "How local institutions and rapid grassroots action protected vulnerable families.",
      image: referencePublications.covidBanner,
      to: ROUTES.publications,
    },
  ],
  /** Real category counts from the Publications dataset. */
  facets: [
    { label: "Publications", value: "34" },
    { label: "Research areas", value: "7" },
    { label: "Earliest report", value: "2019" },
  ],
} as const;

/* -------------------------------------------------------------------------
   IMPACT
   ------------------------------------------------------------------------- */

/**
 * Organisation-wide metrics, verbatim from `mockImpactMetrics`.
 * The fourth metric is surfaced as a narrative figure rather than a card so
 * the band does not read as a generic stat grid.
 */
export const impact = {
  eyebrow: "Our impact",
  heading: "Numbers that carry four decades of trust",
  intro:
    "Across the Eastern Ghats, LAYA's work continues to strengthen community institutions, livelihoods, health systems and cultural resilience.",
  metrics: mockImpactMetrics,
} as const;

/* -------------------------------------------------------------------------
   COMMUNITY VOICES
   ------------------------------------------------------------------------- */

/**
 * Real, attributed testimonials from `mockTestimonials`. These are quotes from
 * partners and peers — NOT fabricated community testimony. Attribution is
 * always shown alongside the quote.
 *
 * No community-member quotes suitable for the homepage exist in the codebase,
 * so none are invented.
 */
export const voices = {
  eyebrow: "In their words",
  heading: "What partners and peers say",
  items: mockTestimonials.slice(0, 3).map((t) => ({
    quote: t.quote,
    name: t.name,
    role: t.role,
  })),
} as const;

/* -------------------------------------------------------------------------
   SUPPORT
   ------------------------------------------------------------------------- */

export const support = {
  eyebrow: "Support LAYA",
  heading: "Support our work",
  body: "Contributions to LAYA support rights work, herbal health care, sustainable livelihoods, lifelong learning, and climate resilience with Adivasi communities across the Eastern Ghats.",
  primaryCta: { label: "Donate", to: ROUTES.donate },
  secondaryCta: { label: "Contact us", to: ROUTES.contact },
  assurances: [
    "Registered under FCRA (No. 010350057)",
    "Donations eligible for tax exemption under Section 80G",
  ],
} as const;
