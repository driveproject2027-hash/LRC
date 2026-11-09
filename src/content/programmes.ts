import { ROUTES } from "@/lib/routes";
import {
  referenceProgramImages,
  rights,
  health,
  srm,
  youth,
  climate,
  gallery16,
  gallery22,
  gallery25,
  referencePublications,
} from "@/assets/referenceAssets";
import {
  imgTrainingEntitlements,
  imgSriPaddy,
  imgBaburao1,
  imgCommunityHealth,
  imgVaccination,
  imgWa123018,
  imgWa122914,
  imgWa122915,
  imgWa122928,
  imgImg6830,
} from "@/assets/newGalleryAssets";
import { illustrationAssets } from "@/assets/illustrationAssets";
import { layaPublicationImages } from "@/assets/layaAssets";

/**
 * LAYA — PROGRAMME DIRECTORY & EDITORIAL CONTENT
 * ---------------------------------------------------------------------------
 * Verified institutional data across all five programmes of LAYA:
 *   1. Rights, Law & Accompaniment (RLA)              → /what-we-do/rla
 *   2. Herbal Based Health Care (HBHC / Vanantharam)   → /what-we-do/hbhc
 *   3. Sustainable Resource Management (SRM)          → /what-we-do/srm
 *   4. Lifelong Learning                              → /what-we-do/lifelong-learning
 *   5. Climate Crisis & Sustainable Development       → /what-we-do/climate-crisis-sustainable-development
 *
 * CONTENT INTEGRITY
 *   Every metric, location, activity, and publication reference below is
 *   derived from LAYA's verified archival records and published reports.
 *   No community experiences, statistics, or outcomes are fabricated.
 * ---------------------------------------------------------------------------
 */

export interface ProgrammeSection {
  heading: string;
  paragraph?: string;
  bullets?: string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageDisclosure?: string;
}

export interface ProgrammeGlanceStat {
  value: string;
  label: string;
  desc: string;
}

export interface ProgrammePillar {
  num: string;
  title: string;
  desc: string;
}

export interface ProgrammeActionRow {
  tag: string;
  title: string;
  body: string;
  bullets?: string[];
  image: string;
  imageAlt: string;
  imageCaption: string;
  imageDisclosure?: string;
}

export interface ProgrammeStoryLink {
  tag: string;
  title: string;
  desc: string;
  to: string;
  image: string;
  imageAlt: string;
  imageDisclosure?: string;
  linkText?: string;
}

export interface ProgrammePublicationLink {
  title: string;
  date: string;
  type: string;
  desc: string;
  pdfUrl: string;
  coverImage: string;
}

export interface ProgrammeMetricItem {
  value: string;
  label: string;
  sublabel?: string;
}

export interface ProgrammeSubTheme {
  id: string;
  tag: string;
  title: string;
  shortTitle?: string;
  subtitle: string;
  description: string;
  keyInitiatives: string[];
  fieldQuote?: {
    quote: string;
    author: string;
    location: string;
  };
  metrics: ProgrammeMetricItem[];
}

export interface ProgrammeAnnualReport {
  reportingYear: string;
  themeTitle: string;
  keyInitiatives: string[];
  fieldQuote?: {
    quote: string;
    author: string;
    location: string;
  };
  metrics: ProgrammeMetricItem[];
  subThemes?: ProgrammeSubTheme[];
}

export interface ProgrammeCTA {
  eyebrow: string;
  title: string;
  desc: string;
  primaryBtn: { label: string; to: string };
  secondaryBtn: { label: string; to: string };
}

export interface Programme {
  id: number;
  /** Route slug, matching src/App.tsx exactly. */
  to: string;
  /** Full programme title. */
  title: string;
  /** Directory label — shorter thematic title. */
  shortTitle: string;
  /** One-sentence explanation from source content. */
  summary: string;
  /** The key issue this programme addresses. */
  issue: string;
  /** Geographic / community context. */
  context: string;
  /** Thematic category this programme is filed under. */
  category: ProgrammeCategoryId;
  /** Authentic hero photograph. */
  image: string;
  imageAlt: string;
  imageCaption?: string;
  imageDisclosure?: string;
  /** Headline metric for directory listings. */
  metric: { label: string; value: string };

  // Rich Editorial 7-Section layout fields
  heroEyebrow: string;
  heroHeading: string;
  heroLead: string;

  overviewHeading: string;
  overviewIntro: string;
  stats: ProgrammeGlanceStat[];

  // Official Annual Report 2025–2026 disclosures & highlights
  annualReport2026?: ProgrammeAnnualReport;

  approachHeading: string;
  approachIntro: string;
  pillars: ProgrammePillar[];
  approachVisual: {
    image: string;
    alt: string;
    caption: string;
    disclosure?: string;
  };

  actionsHeading: string;
  actionsIntro: string;
  actionRows: ProgrammeActionRow[];

  storiesHeading: string;
  storiesIntro: string;
  stories: ProgrammeStoryLink[];

  publicationsHeading: string;
  publicationsIntro: string;
  publications: ProgrammePublicationLink[];

  cta: ProgrammeCTA;

  // Backward-compatibility fields
  sections: ProgrammeSection[];
  outcomes: string[];
}

export type ProgrammeCategoryId =
  | "rights"
  | "livelihoods"
  | "health"
  | "education"
  | "climate";

export interface ProgrammeCategory {
  id: ProgrammeCategoryId;
  label: string;
  /** One-line description of what unites the programmes in this group. */
  blurb: string;
}

export interface CorePillar {
  id: string;
  number: string;
  title: string;
  blurb: string;
  badge?: string;
  programmeIds: number[];
}

/**
  * The Three Core Pillars defining LAYA's strategic interventions:
  * 1. Safeguarding Adivasi Rights for Social Justice
  * 2. Lifelong Learning
  * 3. Climate Crisis & Sustainable Development (including Livelihoods & Natural Resources and Health)
  */
export const CORE_PILLARS: CorePillar[] = [
  {
    id: "pillar-rights",
    number: "01",
    title: "Safeguarding Adivasi Rights for Social Justice",
    blurb: "Securing ancestral land tenure, asserting community forest rights under the Forest Rights Act (FRA), empowering Gram Sabhas for self-governance, and providing constitutional legal accompaniment across five Scheduled Area districts in Andhra Pradesh.",
    programmeIds: [1],
  },
  {
    id: "pillar-learning",
    number: "02",
    title: "Lifelong Learning",
    blurb: "Equipping young Adivasi women and men through contextual education, adult literacy circles, leadership formation, and the vital revitalization of indigenous language, knowledge systems, and cultural dignity.",
    programmeIds: [4],
  },
  {
    id: "pillar-climate",
    number: "03",
    title: "Climate Crisis & Sustainable Development",
    blurb: "An integrated framework addressing ecological vulnerabilities and building community sovereignty through decentralized clean energy, participatory climate adaptation, sustainable agriculture, biodiversity conservation, and herbal-based community healthcare.",
    programmeIds: [5, 3, 2],
  },
];

/**
 * The categories that map to programme areas.
 */
export const PROGRAMME_CATEGORIES: ProgrammeCategory[] = [
  {
    id: "rights",
    label: "Safeguarding Adivasi Rights for Social Justice",
    blurb: "Land, forest rights, self-governance and access to constitutional justice.",
  },
  {
    id: "education",
    label: "Lifelong Learning",
    blurb: "Youth and women leadership, adult literacy and contextual learning.",
  },
  {
    id: "climate",
    label: "Climate Crisis & Sustainable Development",
    blurb: "Resilience, local renewable energy, livelihoods and climate justice.",
  },
  {
    id: "livelihoods",
    label: "Livelihoods & Natural Resources",
    blurb: "Farming, water, seed diversity and agroforestry (under Climate Crisis & Sustainable Development).",
  },
  {
    id: "health",
    label: "Health",
    blurb: "Herbal-based care and traditional health knowledge (under Climate Crisis & Sustainable Development).",
  },
];

/**
 * Cross-cutting approaches that run through all five programmes.
 */
export const CROSS_CUTTING_APPROACHES = [
  {
    title: "Community Institutions",
    description:
      "Gram sabhas, community-based organisations, women's groups and paralegal activists carry the work forward. LAYA's own systems anticipate units emerging as autonomous organisations.",
  },
  {
    title: "Advocacy & Policy",
    description:
      "PESA Rules framed in 2011, High Court and Supreme Court action on forest rights and agency courts, NTFP sale rights outside Scheduled Areas, and climate policy engagement at national and international levels.",
  },
] as const;

/* =========================================================================
   THE PROGRAMMES
   ========================================================================= */

export const PROGRAMMES: Programme[] = [
  /* -----------------------------------------------------------------------
     1. RIGHTS, LAW & ACCOMPANIMENT (RLA)
     ----------------------------------------------------------------------- */
  {
    id: 1,
    to: ROUTES.whatWeDoRla,
    title: "Safeguarding Adivasi Rights for Social Justice",
    shortTitle: "Safeguarding Adivasi Rights for Social Justice",
    summary:
      "LAYA has addressed land alienation and socio-economic rights of Adivasi communities since inception — securing land through legal recourse and administrative action.",
    issue:
      "Land alienation and unrealised socio-economic and cultural rights, in spite of Adivasi communities inhabiting resource-rich areas.",
    context:
      "Outreach spans East Godavari, Visakhapatnam, West Godavari, Srikakulam and Vizianagaram, through Resource for Legal Action (RLA).",
    category: "rights",
    image: rights,
    imageAlt: "Adivasi community legal awareness assembly in the Eastern Ghats",
    imageCaption: "Adivasi community legal awareness assembly · RLA field documentation",
    metric: { label: "Villages Covered", value: "500+" },

    heroEyebrow: "Our Work · Safeguarding Adivasi Rights for Social Justice",
    heroHeading: "Safeguarding Land, Forest Rights & Adivasi Self-Governance",
    heroLead:
      "For four decades, LAYA's Resource for Legal Action (RLA) has accompanied Adivasi communities across five Scheduled districts in Andhra Pradesh. We empower Gram Sabhas, train youth paralegals, challenge land alienation under LTR 1 of 70, and secure community forest rights under the Forest Rights Act.",

    overviewHeading: "Land, Governance & Justice in Numbers",
    overviewIntro:
      "Verified records from four decades of legal accompaniment, grassroots advocacy, and constitutional defense across the Scheduled Areas of Andhra Pradesh.",
    stats: [
      {
        value: "25,000+",
        label: "Acres Reclaimed",
        desc: "Tribal land rights restored through legal recourse and administrative decisions",
      },
      {
        value: "500+",
        label: "Villages Covered",
        desc: "Remote tribal hamlets actively supported with legal aid and advocacy",
      },
      {
        value: "5",
        label: "Scheduled Districts",
        desc: "East Godavari, Visakhapatnam, West Godavari, Srikakulam, Vizianagaram",
      },
      {
        value: "2011",
        label: "PESA Rules Framed",
        desc: "Instrumental in articulating and notifying statutory self-governance rules",
      },
      {
        value: "4,000",
        label: "Acres Protected",
        desc: "Resisted delivery of tribal estate lands in Manturu to non-tribal inamdars",
      },
      {
        value: "100s",
        label: "Paralegals Trained",
        desc: "Adivasi youth and women's collectives leading community vigilance",
      },
    ],

    annualReport2026: {
      reportingYear: "2025–2026",
      themeTitle: "Safeguarding Adivasi Rights for Social Justice",
      keyInitiatives: [
        "Land & Forest Entitlement Facilitation",
        "Legal Sensitisation & Paralegal Training",
        "Socio-Economic Entitlement Facilitation",
        "Constitutional Values Fellowship",
        "Policy & Advocacy on Provisions of the Panchayats Extension to Scheduled Areas (PESA), Forest Rights Act (FRA) & Land Transfer Rights (LTR)",
      ],
      fieldQuote: {
        quote:
          "Five years ago, a non-tribal person forcibly took over my land because he knew how to manipulate the legal system. I had almost lost hope of getting it back. But LAYA- Resource for Legal Action and their legal team stood by me and, after a long and difficult legal battle, helped me reclaim my land last year. I am deeply grateful for their support. This land is not just my source of livelihood—it is my home, my identity.",
        author: "Adivasi Farmer",
        location: "West Godavari Dist",
      },
      metrics: [
        {
          value: "369 (25%)",
          label: "Legal cases/issues successful",
          sublabel: "Out of 1,479 taken up across Scheduled Areas",
        },
        {
          value: "1,588",
          label: "Acres area restored",
          sublabel: "Through successful judicial and agency court cases",
        },
        {
          value: "3,536 (65%)",
          label: "Socio-economic entitlements sanctioned",
          sublabel: "Out of 5,416 facilitated by field teams",
        },
        {
          value: "18,517 (83%)",
          label: "Constitutional values issues resolved",
          sublabel: "Out of issues taken up by grassroots fellows",
        },
        {
          value: "434 / 2,885",
          label: "Land transfer orders & acres",
          sublabel: "434 orders securing 2,885 acres of ancestral land",
        },
        {
          value: "2,498",
          label: "Workshop participants",
          sublabel: "Government and community delegates on tribal rights & PESA",
        },
        {
          value: "6 / 186",
          label: "Legal education & training programs",
          sublabel: "186 participants including 87 women paralegals",
        },
        {
          value: "Policy",
          label: "Advancing Tribal Rights & Policy",
          sublabel: "CFR Rights, PESA/FRA/LTR, ST reservations, FRA Atlas & Tribal Climate Plan",
        },
      ],
    },

    approachHeading: "An Empowered Grassroots Legal Architecture",
    approachIntro:
      "LAYA approaches justice not as isolated courtroom litigation, but as community legal competence. We strengthen Gram Sabhas and train village paralegals so Adivasi communities defend their own constitutional safeguards.",
    pillars: [
      {
        num: "01",
        title: "Reclaiming Ancestral Land Rights",
        desc: "Facilitating legal action against land alienation under the Land Transfer Regulation (LTR 1 of 70). Over 25,000 acres reclaimed, while supporting Adivasi women to assert inherited property rights.",
      },
      {
        num: "02",
        title: "Gram Sabha & Forest Rights (RoFR)",
        desc: "Mobilizing communities to document and assert Community Forest Rights (CFR) under the Forest Rights Act 2006, resolving rejected claims, and securing collective title deeds.",
      },
      {
        num: "03",
        title: "Grassroots Paralegals & Entitlements",
        desc: "Training young Adivasi women and men as village paralegals who facilitate tribal community certificates, ration cards, MGNREGA job cards, and old-age and widow pensions.",
      },
      {
        num: "04",
        title: "Landmark Policy Advocacy & Precedents",
        desc: "Advocating the framing of the 2011 PESA Rules, defending accessible Executive Agency Courts in the Supreme Court, and securing High Court orders permitting open-market NTFP sales.",
      },
    ],
    approachVisual: {
      image: illustrationAssets.forestStewardship.src,
      alt: illustrationAssets.forestStewardship.alt,
      caption: illustrationAssets.forestStewardship.caption,
      disclosure: illustrationAssets.forestStewardship.disclosure,
    },

    actionsHeading: "Justice Delivered Where Rights are Contested",
    actionsIntro:
      "Photographic records of ongoing legal accompaniment across remote forest settlements and tribal panchayats.",
    actionRows: [
      {
        tag: "Grassroots Capacity & Rights Awareness",
        title: "Legal Education Camps & Paralegal Mobilization",
        body: "Conducting structured legal education camps for Adivasi youth, women's groups, and Panchayat representatives across Scheduled Areas, covering PESA self-governance, FRA provisions, RTI procedures, and human rights defense.",
        bullets: [
          "Regular paralegal training programmes for tribal youth activists",
          "Legal orientation camps for CBOs and women's self-help collectives",
          "Surveying out-of-school children and facilitating formal readmissions",
        ],
        image: imgTrainingEntitlements,
        imageAlt: "Training programme on social entitlements and legal rights",
        imageCaption:
          "Training programme on social entitlements and legal rights · Eastern Ghats field documentation",
      },
      {
        tag: "Tenure Security & Land Restitution",
        title: "Restoring Alienated Land & Forest Titles",
        body: "Working with village Gram Sabhas to resist illegal land transfers, monitor TSP tribal funds, and demand fair rehabilitation under major irrigation projects like Polavaram and Musirimilli.",
        bullets: [
          "Reclaiming ~25,000 acres through sustained legal recourse and administrative decisions",
          "Filing targeted RTI inquiries on land settlement records and mining quarry leases",
          "Challenging discriminatory rehabilitation norms to protect daughters' entitlement rights",
        ],
        image: rights,
        imageAlt: "Adivasi community legal awareness assembly in the Eastern Ghats",
        imageCaption:
          "Community legal assembly on forest rights and land restitution · Field documentation",
      },
      {
        tag: "Strategic Litigation & Policy Precedents",
        title: "Constitutional Defense in Higher Courts",
        body: "Challenging state notifications that override tribal self-governance, including illegal liquor licenses in Scheduled Areas and the monopoly of corporations over Minor Forest Produce (NTFP).",
        bullets: [
          "Supreme Court victory upholding accessible Executive Agency Courts for tribal communities",
          "High Court ruling affirming tribal rights to sell Minor Forest Produce outside Scheduled Areas",
          "Advocacy securing the official notification of Andhra Pradesh PESA Rules in 2011",
        ],
        image: illustrationAssets.forestStewardship.src,
        imageAlt: "Editorial illustration of Gram Sabha assembly under banyan tree",
        imageCaption:
          "Gram Sabha community self-governance · Forest Rights Act defense",
        imageDisclosure: "Illustrative image",
      },
    ],

    storiesHeading: "Stories from the Field",
    storiesIntro:
      "Field documentation and legal case studies on Adivasi land rights, Gram Sabha governance, and constitutional advocacy.",
    stories: [
      {
        tag: "Field Note",
        title: "Reclaiming the Forest: A Community's Journey",
        desc: "Gram sabha empowerment and ancestral territory rights under the Forest Rights Act in the Eastern Ghats.",
        to: "/stories/note-1",
        image: illustrationAssets.forestStewardship.src,
        imageAlt: "Gram Sabha forest rights meeting",
        imageDisclosure: "Illustrative image",
        linkText: "Read Field Note",
      },
      {
        tag: "Case Study",
        title: "Defending Agency Courts in the Supreme Court",
        desc: "How LAYA's legal advocacy preserved accessible executive courts for tribal communities in Andhra Pradesh.",
        to: ROUTES.publications,
        image: layaPublicationImages[11],
        imageAlt: "Forest Governance publication cover",
        linkText: "Read in Resource Centre",
      },
      {
        tag: "Field Note",
        title: "Seeds of Change: Millet Revival & Food Sovereignty",
        desc: "Reviving traditional dryland crops to secure nutritional resilience alongside territorial rights.",
        to: "/stories/note-2",
        image: illustrationAssets.milletRevival.src,
        imageAlt: "Millet winnowing illustration",
        imageDisclosure: "Illustrative image",
        linkText: "Read Field Note",
      },
    ],

    publicationsHeading: "Related Legal & Governance Publications",
    publicationsIntro:
      "Verified research monographs, legal handbooks, and policy evaluations published by LAYA and partner networks.",
    publications: [
      {
        title: "Towards A Resilient Forest EcoSystem",
        date: "April 2019",
        type: "Report",
        desc: "A detailed exploration of forest governance under the Forest Rights Act (FRA), demonstrating that empowered communities achieve higher biodiversity.",
        pdfUrl: "https://laya.org.in/PublicFiles/Laya_Eco_System.pdf",
        coverImage: layaPublicationImages[11],
      },
      {
        title: "Criteria to Align AIIB with PA Climate resilience Goal",
        date: "August 2020",
        type: "Policy Brief",
        desc: "A rigorous framework assessing the socio-environmental safeguards of multilateral infrastructure investments on marginalized communities.",
        pdfUrl:
          "https://laya.org.in/PublicFiles/Criteria to Align AIIB with PA Climate resilience Goal.pdf",
        coverImage: layaPublicationImages[5],
      },
    ],

    cta: {
      eyebrow: "Get Involved",
      title: "Support Adivasi Rights & Legal Accompaniment",
      desc: "LAYA welcomes partnerships with legal researchers, advocacy groups, and solidarity partners to expand paralegal training, defend land rights, and strengthen Gram Sabha self-rule.",
      primaryBtn: { label: "Contact Our Rights Team", to: ROUTES.contact },
      secondaryBtn: { label: "Support LAYA's Work", to: ROUTES.donate },
    },

    sections: [
      {
        heading: "Context and approach",
        paragraph:
          "LAYA has been involved in addressing land alienation and socio-economic rights of Adivasi communities since its inception. For adivasis, the threat to natural resources like land, water, and forests, is a threat to their livelihood which is symbiotic to their identity as an ethnic group. While there are protective laws in the Scheduled Areas, the rights of adivasis continue to be violated. LAYA's work, related to Land Alienation and Human Rights, is led by the Resource for Legal Action (RLA), which is a unit of LAYA outreaching five districts: East Godavari, Visakhapatnam, West Godavari, Srikakulam and Vizianagaram.",
      },
    ],
    outcomes: [
      "About 25,000 acres of land rights reclaimed through legal recourse and administrative action.",
      "Legal awareness for youth, women, panchayat representatives, and officials.",
      "Policy contributions for FRA guidelines, PESA rules, and related governance frameworks.",
    ],
  },

  /* -----------------------------------------------------------------------
     2. HERBAL BASED HEALTH CARE (HBHC / VANANTHARAM)
     ----------------------------------------------------------------------- */
  {
    id: 2,
    to: ROUTES.whatWeDoHbhc,
    title: "Herbal Based Health Care",
    shortTitle: "Health",
    summary:
      "In remote Adivasi regions with limited mainstream healthcare, Vanantharam supports the legitimisation of herbal-based medicine alongside existing systems.",
    issue:
      "Limited mainstream healthcare access in remote Adivasi regions, and traditional health knowledge that is not documented or validated.",
    context:
      "Herbal gardens, medicinal nurseries and licensed pharmacy support, with training for Adivasi youth and community health practitioners.",
    category: "health",
    image: health,
    imageAlt: "Community health practitioners at a LAYA herbal health care training",
    imageCaption:
      "Community health practitioners at a LAYA herbal health care training · Field documentation",
    metric: { label: "Communities Served", value: "300+" },

    heroEyebrow: "Our Work · Community Health · Climate Crisis & Sustainable Development",
    heroHeading: "Herbal Healthcare Rooted in Adivasi Communities",
    heroLead:
      "For over two decades, LAYA and the Vanantharam Trust have accompanied Adivasi communities across the Eastern Ghats to revive, validate, and practice herbal-based medicine. Where mainstream healthcare is distant, we strengthen community health practitioners, cultivate medicinal plant sanctuaries, and provide reliable, affordable care rooted in indigenous knowledge.",

    overviewHeading: "Health in Numbers & Reach",
    overviewIntro:
      "Verified figures from over two decades of community healthcare and traditional medicine practice across the Eastern Ghats.",
    stats: [
      {
        value: "300+",
        label: "Communities Served",
        desc: "Remote Adivasi hamlets across 4 tribal districts",
      },
      {
        value: "350+",
        label: "Healers Federated",
        desc: "Traditional Health Practitioners in 4 district networks",
      },
      {
        value: "250+",
        label: "Medicinal Varieties",
        desc: "Conserved at the central Vanantharam Mother Herbal Garden",
      },
      {
        value: "2003",
        label: "Vanantharam Founded",
        desc: "Autonomous trust legitimising traditional medicine",
      },
      {
        value: "60",
        label: "Village Sanctuaries",
        desc: "Grassroots herbal gardens supporting local practitioners",
      },
      {
        value: "1-Year",
        label: "Practitioner Course",
        desc: "6-module curriculum + clinical apprenticeships",
      },
    ],

    annualReport2026: {
      reportingYear: "2025–2026",
      themeTitle: "Biodiversity, Landuse and Ecosystem Restoration",
      keyInitiatives: [
        "Traditional Health Practitioner Training",
        "Traditional Health Practitioner Network Strengthening",
        "Community Ayurvedic Practitioners Training",
        "Herbal/Ayurvedic Healthcare Provision in Adivasi Communities",
        "Safe Drinking Water",
        "Community Health Centres Management",
      ],
      fieldQuote: {
        quote:
          "When my family or I fell ill, we would go to the Primary Health Centre, but the doctors were often absent, and the treatment or medicines did not help. The staff were also rude and dismissive, so we started visiting mobile dispensaries at the weekly market, which were expensive and often unable to help us. LAYA–Vanantharam and their team restored our faith in traditional healers and encouraged us to visit Community-based Ayurvedic Practitioners. They have helped my family with many of our health problems and, when they cannot help, they refer us to qualified doctors.",
        author: "Adivasi Villager",
        location: "Polavaram Dist",
      },
      metrics: [
        {
          value: "16,848",
          label: "Patients monitored by THPs",
          sublabel: "Monitored by traditional health practitioners (47% women)",
        },
        {
          value: "17,313",
          label: "Special health camps",
          sublabel: "Patients examined across community health camps",
        },
        {
          value: "26",
          label: "Medicine types prepared",
          sublabel: "Standardized herbal formulations prepared at Vanantharam",
        },
        {
          value: "200+ / 24",
          label: "Medicinal plants in gardens",
          sublabel: "Over 200 species conserved across 24 herbal gardens",
        },
        {
          value: "75 THPs",
          label: "Network members strengthened",
          sublabel: "6 meetings of THPs and Community Ayurvedic Practitioners",
        },
        {
          value: "2,262",
          label: "Boiled drinking water adopters",
          sublabel: "Out of 5,258 surveyed households in disease prevention campaign",
        },
        {
          value: "276",
          label: "Youth in orientation & trainings",
          sublabel: "Youth trained on traditional health & medicinal plant identification",
        },
      ],
    },

    approachHeading: "An Interdependent Healthcare Ecosystem",
    approachIntro:
      "LAYA approaches healthcare as an ecological, cultural, and community process. We integrate ancestral knowledge with rigorous hygienic standardisation to deliver dignified, accessible care.",
    pillars: [
      {
        num: "01",
        title: "Federating Traditional Healers (THPs)",
        desc: "Organising over 350 Traditional Health Practitioners across 4 district networks. We standardise medicine preparation, facilitate peer learning, and secure Panchayat resolution testimonials.",
      },
      {
        num: "02",
        title: "Training Youth as Community Practitioners (CHPs)",
        desc: "Conducting a structured one-year course across 6 modules for young Adivasi women and men, covering human anatomy, disease diagnostics, and hands-on apprenticeships.",
      },
      {
        num: "03",
        title: "Mother Herbal Gardens & Local Nurseries",
        desc: "Maintaining central demonstration gardens in Vanantharam (250 species) and Gummaripalem (185 species). An 80-variety nursery propagates saplings for 60 village-level sanctuaries.",
      },
      {
        num: "04",
        title: "Standardised Pharmacy & Licensed Medicines",
        desc: "Operating the registered Vanantharam Pharmacy (est. 2012) to manufacture certified Ayurvedic churnams, tailams, and 17 single-herb powders supplied directly to village centers.",
      },
    ],
    approachVisual: {
      image: illustrationAssets.herbalGardens.src,
      alt: illustrationAssets.herbalGardens.alt,
      caption: illustrationAssets.herbalGardens.caption,
      disclosure: illustrationAssets.herbalGardens.disclosure,
    },

    actionsHeading: "Care Delivered Where Access is Hardest",
    actionsIntro:
      "Photographic records of ongoing health accompaniment across remote forest settlements and weekly market gatherings.",
    actionRows: [
      {
        tag: "Primary Care & Outreach",
        title: "Grassroots Village Clinics & Shandy Health Camps",
        body: "Community Health Practitioners operate from village-level health centers, offering immediate natural treatments for common ailments, and conduct regular clinics at bustling weekly tribal shandies.",
        bullets: [
          "Nodal village clinics serving surrounding tribal hamlets",
          "Regular clinical consultations at weekly tribal shandies",
          "Seasonal epidemic response camps with the AYUSH Department",
        ],
        image: imgCommunityHealth,
        imageAlt: "Traditional Health Practitioners General Body meeting at Community Health Center inauguration",
        imageCaption:
          "Community Health Center & Training Hall inauguration · Traditional Health Practitioner Federation",
      },
      {
        tag: "Public Health Collaboration",
        title: "Preventive Healthcare & Disease Monitoring",
        body: "LAYA works alongside government health departments during high-risk monsoon periods, supporting active surveillance and preventive education for malaria, tuberculosis, and seasonal fevers.",
        bullets: [
          "Active tracking for tuberculosis, malaria, and seasonal fevers",
          "Community immunisation mobilisation and preventive awareness",
          "Promoting clean drinking water and sanitation practices",
        ],
        image: imgVaccination,
        imageAlt: "Adivasi community vaccination and preventive health camp in the Eastern Ghats",
        imageCaption:
          "Community vaccination and preventive health outreach · Eastern Ghats field documentation",
      },
      {
        tag: "Maternal & Adolescent Wellbeing",
        title: "Women's Health, Nutri-Gardens & Gynaecological Care",
        body: "Vanantharam supports village nutri-gardens for dietary diversity, conducts targeted workshops on gynaecological care with women Traditional Health Practitioners, and prepares iron-rich herbal supplements.",
        bullets: [
          "Backyard nutri-gardens yielding micronutrient-rich herbs and vegetables",
          "Specialised training for women traditional healers in gynaecological care",
          "Nutrition counselling addressing endemic maternal anaemia",
        ],
        image: imgWa123018,
        imageAlt: "Adivasi women participating in a community nutrition and health workshop",
        imageCaption:
          "Women's nutrition workshop and traditional healthcare circle · Field documentation",
      },
    ],

    storiesHeading: "Stories from the Field",
    storiesIntro:
      "Field documentation and case studies on community healthcare, indigenous botanical knowledge, and ecological sovereignty.",
    stories: [
      {
        tag: "Case Study",
        title: "Documenting Ethnomedicine: The Vanantharam Experience",
        desc: "How traditional healers across the Eastern Ghats organised into district networks to validate ancestral herbal remedies.",
        to: ROUTES.publications,
        image: referencePublications.hbhcPublication,
        imageAlt: "Herbal Based Health Care publication cover",
        linkText: "Read in Resource Centre",
      },
      {
        tag: "Field Note",
        title: "Reclaiming the Forest: A Community's Journey",
        desc: "Gram sabha empowerment safeguarding the natural forest ecosystems where wild medicinal flora flourishes.",
        to: "/stories/note-1",
        image: illustrationAssets.forestStewardship.src,
        imageAlt: "Forest rights meeting",
        imageDisclosure: "Illustrative image",
        linkText: "Read Field Note",
      },
      {
        tag: "Field Note",
        title: "Seeds of Change: Millet Revival & Nutrition",
        desc: "Reviving traditional millet varieties to protect dietary biodiversity, combat malnutrition, and build household resilience.",
        to: "/stories/note-2",
        image: illustrationAssets.milletRevival.src,
        imageAlt: "Millet winnowing",
        imageDisclosure: "Illustrative image",
        linkText: "Read Field Note",
      },
    ],

    publicationsHeading: "Related Health Publications",
    publicationsIntro:
      "Verified monographs and field research evaluating community health practices and rural environmental interventions.",
    publications: [
      {
        title: "Herbal Based Health Care",
        date: "2021",
        type: "Report",
        desc: "Exhaustive documentation of traditional Adivasi ethnomedicine, medicinal plant conservation, standardisation processes, and primary healthcare integration.",
        pdfUrl: "https://laya.org.in/PublicFiles/HBHC_SOC.pdf",
        coverImage: referencePublications.hbhcPublication,
      },
      {
        title: "Clean Cookstove Projects: Social & Cultural Context",
        date: "January 2018",
        type: "Study",
        desc: "A rigorous evaluation assessing indoor household air pollution, respiratory health improvements, and socio-cultural adoption challenges in tribal Andhra Pradesh.",
        pdfUrl: "https://laya.org.in/PublicFiles/Laya_CUDenver_Report.pdf",
        coverImage: layaPublicationImages[21],
      },
    ],

    cta: {
      eyebrow: "Get Involved",
      title: "Support Community Health in the Eastern Ghats",
      desc: "LAYA and Vanantharam welcome partnerships, academic research collaborations, and donor support to expand traditional practitioner training, nurture medicinal sanctuaries, and deliver dignified healthcare across remote Adivasi villages.",
      primaryBtn: { label: "Contact Our Health Team", to: ROUTES.contact },
      secondaryBtn: { label: "Support LAYA's Work", to: ROUTES.donate },
    },

    sections: [],
    outcomes: [
      "Promotion of local herbal health care and standardized medicine preparation.",
      "Training for youth and community health practitioners.",
      "Herbal gardens, medicinal nurseries, exhibitions, and licensed pharmacy support.",
    ],
  },

  /* -----------------------------------------------------------------------
     3. SUSTAINABLE RESOURCE MANAGEMENT (SRM)
     ----------------------------------------------------------------------- */
  {
    id: 3,
    to: ROUTES.whatWeDoSrm,
    title: "Sustainable Resource Management",
    shortTitle: "Livelihoods & Natural Resources",
    summary:
      "LAYA promotes resilient farming and biodiversity restoration so that communities in a high-rainfall region are not left cash-poor and ecologically vulnerable.",
    issue:
      "Exploitative conditions keep communities cash-poor and ecologically vulnerable, despite the region receiving significant rainfall.",
    context:
      "Reaching approximately 10,000 farmer households across Andhra Pradesh, with seed centres, seed festivals and NTFP regeneration work.",
    category: "livelihoods",
    image: srm,
    imageAlt: "Adivasi woman farmer transplanting paddy in the Eastern Ghats",
    imageCaption: "Sustainable paddy cultivation in Eastern Ghats terraces · SRM field documentation",
    metric: { label: "Hectares Protected", value: "50,000+" },

    heroEyebrow: "Our Work · Livelihoods & Natural Resources · Climate Crisis & Sustainable Development",
    heroHeading: "Regenerative Agriculture, Seed Sovereignty & Biofarms",
    heroLead:
      "In the high-rainfall agency tracts of Andhra Pradesh, Adivasi farming families often remain economically vulnerable. LAYA's Sustainable Resource Management (SRM) programme partners with over 10,000 farmer households to restore soil fertility, revive heirloom millets, and establish community seed banks.",

    overviewHeading: "Agro-Ecology in Numbers & Reach",
    overviewIntro:
      "Verified records from four decades of organic biofarm stewardship, indigenous seed conservation, and watershed regeneration across the Eastern Ghats.",
    stats: [
      {
        value: "10,000+",
        label: "Farmer Households",
        desc: "Smallholder Adivasi families transitioning to sustainable agriculture",
      },
      {
        value: "50,000+",
        label: "Hectares Protected",
        desc: "Watersheds and sloping hill terrain conserved through agroforestry",
      },
      {
        value: "4",
        label: "Tribal Districts",
        desc: "Active agricultural accompaniment in Andhra Pradesh",
      },
      {
        value: "AP State",
        label: "Biodiversity Award",
        desc: "Honoured as Biodiversity Conserver for community seed stewardship",
      },
      {
        value: "100s",
        label: "SAPs Trained",
        desc: "Sustainable Agriculture Practitioners leading organic biofarm practices",
      },
      {
        value: "1985",
        label: "Four Decades",
        desc: "Documenting and validating traditional agro-ecological systems",
      },
    ],

    annualReport2026: {
      reportingYear: "2025–2026",
      themeTitle: "Sustainable Agriculture and Natural Resource Management",
      keyInitiatives: [
        "Climate-Resilient Agriculture Promotion (10 Natural Farming Package of Practices)",
        "Seed Centres & Home Seed Banks",
        "Skills and Entrepreneurship Development",
        "Water Security Strengthening",
        "Poultry, Aquaculture & Horticulture",
      ],
      fieldQuote: {
        quote:
          "Three years ago, I mainly grew ragi using traditional farming methods, but the yield was low, and my food stocks often ran out, forcing my family to depend on the PDS and NREGS for support. Then a LAYA Community Resource Person introduced me to Gulli Ragi, an improved method that has nearly doubled the yield. Today, my food stocks last throughout the year, and I can sell or save the surplus as seed. I no longer need to depend on NREGS or moneylenders when I need money, and I feel much more economically secure and resilient.",
        author: "Adivasi Farmer",
        location: "Alluri Seetharama Raju Dist",
      },
      metrics: [
        {
          value: "15,551",
          label: "Households in agro-diversity & nutrition",
          sublabel: "Millet yield optimization, turmeric, ginger, bio-farm plots & nutri-kitchen gardens",
        },
        {
          value: "2,872",
          label: "Households in natural farming",
          sublabel: "Climate resilient natural farming adhering to 10 package practices",
        },
        {
          value: "920 / 2,800",
          label: "Households & acres with jeevamruthams",
          sublabel: "Soil nutrient management using ghana and drava jeevamruthams",
        },
        {
          value: "1,668",
          label: "Farmers in exposure & biodiversity events",
          sublabel: "Benefitted through practical trainings, exposure visits and seed biodiversity events",
        },
        {
          value: "175",
          label: "Households with gravity irrigation",
          sublabel: "Water from new gravity irrigation system and renovated checkdams",
        },
        {
          value: "32 Sites",
          label: "Water bodies identified",
          sublabel: "Comprehensive feasibility study for watershed and checkdam restoration",
        },
        {
          value: "1,081",
          label: "Farmers in community meetings",
          sublabel: "Participatory decision-making and natural farming planning sessions",
        },
        {
          value: "52",
          label: "Farmers in enterprise & digital skills",
          sublabel: "Benefitted through entrepreneurship, business and digital skills development",
        },
      ],
    },

    approachHeading: "An Integrated Agro-Ecological Model",
    approachIntro:
      "LAYA links ancestral agricultural wisdom with proven organic techniques to ensure food security, soil regeneration, and economic dignity without debt-inducing chemical inputs.",
    pillars: [
      {
        num: "01",
        title: "Heirloom Seed Conservation & Seed Banks",
        desc: "Establishing village-level seed centres and organizing regional seed festivals to conserve rare varieties of millets, pulses, and dryland grains.",
      },
      {
        num: "02",
        title: "System of Rice Intensification (SRI) & Biofarms",
        desc: "Promoting high-yielding, water-saving SRI methods and supporting model biofarms that demonstrate liquid composting, vermicomposting, and natural pest repellents.",
      },
      {
        num: "03",
        title: "Broom Grass & NTFP Regeneration",
        desc: "Restoring degraded hill slopes through broom grass cultivation and agroforestry, revitalizing Non-Timber Forest Produce for sustainable household incomes.",
      },
      {
        num: "04",
        title: "Ethno-Botany & Government Scheme Linkages",
        desc: "Conducting ethno-botanical studies on degraded lands while leveraging public horticultural and tribal welfare schemes for smallholder farmers.",
      },
    ],
    approachVisual: {
      image: illustrationAssets.milletRevival.src,
      alt: illustrationAssets.milletRevival.alt,
      caption: illustrationAssets.milletRevival.caption,
      disclosure: illustrationAssets.milletRevival.disclosure,
    },

    actionsHeading: "Agro-Ecology Delivered in the Hills",
    actionsIntro:
      "Photographic records of sustainable agriculture, model biofarms, and water-conserving paddy cultivation in the Eastern Ghats.",
    actionRows: [
      {
        tag: "Model Biofarms & Soil Health",
        title: "Farmer-Led Biofarms & Organic Soil Restoration",
        body: "Supporting pioneer Adivasi biofarm farmers like V. Baburao at Thadigiri to demonstrate chemical-free polyculture, multi-tier horticulture, and indigenous crop resilience.",
        bullets: [
          "Intensive training for Sustainable Agriculture Practitioners (SAPs)",
          "Production of jeevamrutham, bio-pest decoctions, and enriched vermicompost",
          "Eliminating predatory input debt from commercial chemical distributors",
        ],
        image: imgBaburao1,
        imageAlt: "V. Baburao, Biofarm farmer, Thadigiri",
        imageCaption: "V. Baburao, Biofarm farmer at Thadigiri · Eastern Ghats field documentation",
      },
      {
        tag: "Water Conservation & Productivity",
        title: "System of Rice Intensification (SRI) Paddy",
        body: "Promoting water-saving SRI cultivation on terraced hill slopes, increasing paddy yields significantly while cutting seed and irrigation requirements by half.",
        bullets: [
          "Controlled water management utilizing gravity hill springs",
          "Wider spacing and mechanical weeders boosting root aeration and tillering",
          "Documented yield improvements on small tribal landholdings",
        ],
        image: imgSriPaddy,
        imageAlt: "SRI Paddy cultivation in the Eastern Ghats",
        imageCaption: "SRI Paddy field demonstration · Eastern Ghats field documentation",
      },
      {
        tag: "Genetic Diversity & Food Sovereignty",
        title: "Heirloom Seed Banks & Millet Revival",
        body: "Reviving drought-tolerant traditional millets (ragi, kora, sama) that provide critical micronutrients and withstand shifting monsoon cycles.",
        bullets: [
          "Decentralized village seed centres safeguarding heirloom genetic stock",
          "Annual seed exchange festivals bringing together hundreds of tribal farmers",
          "Regeneration of degraded slopes through broom grass and native forest species",
        ],
        image: illustrationAssets.milletRevival.src,
        imageAlt: "Heirloom millet diversity and seed winnowing",
        imageCaption: "Indigenous seed diversity and traditional grain winnowing · Illustrative plate",
        imageDisclosure: "Illustrative image",
      },
    ],

    storiesHeading: "Stories from the Field",
    storiesIntro:
      "Field documentation and stories of change on sustainable farming, seed sovereignty, and soil regeneration.",
    stories: [
      {
        tag: "Field Note",
        title: "Seeds of Change: Millet Revival & Nutrition",
        desc: "Reviving traditional millet varieties to protect dietary biodiversity, combat malnutrition, and build household resilience.",
        to: "/stories/note-2",
        image: illustrationAssets.milletRevival.src,
        imageAlt: "Millet revival illustration",
        imageDisclosure: "Illustrative image",
        linkText: "Read Field Note",
      },
      {
        tag: "Case Study",
        title: "The LAYA Chronicle: Stories of Change on Sustainable Farming",
        desc: "Documenting the transition of Adivasi farmers back to traditional farming, featured in Azim Premji University's compendium.",
        to: ROUTES.publications,
        image: layaPublicationImages[2],
        imageAlt: "The LAYA Chronicle cover",
        linkText: "Read in Resource Centre",
      },
      {
        tag: "Field Note",
        title: "Reclaiming the Forest: A Community's Journey",
        desc: "Gram sabha empowerment and ancestral territory rights safeguarding upland agro-ecosystems.",
        to: "/stories/note-1",
        image: illustrationAssets.forestStewardship.src,
        imageAlt: "Forest rights meeting illustration",
        imageDisclosure: "Illustrative image",
        linkText: "Read Field Note",
      },
    ],

    publicationsHeading: "Related Livelihoods & Agro-Ecology Publications",
    publicationsIntro:
      "Verified monographs and field research documenting sustainable farming systems and community resource governance.",
    publications: [
      {
        title: "The LAYA Chronicle",
        date: "2021",
        type: "Report",
        desc: "Meticulous documentation of Adivasi farmers transitioning to sustainable agriculture, featured in Azim Premji University compendium.",
        pdfUrl: "https://laya.org.in/PublicFiles/The_Laya_Chronicle.pdf",
        coverImage: layaPublicationImages[2],
      },
      {
        title: "Towards Strengthening Blue Economy for Fishing Communities",
        date: "September 2020",
        type: "Report",
        desc: "Places equity and small-scale community rights at the center of coastal and riverine livelihood management.",
        pdfUrl:
          "https://laya.org.in/PublicFiles/Towards-Strengthening-Blue-Economy-for-Fishing-Communities.pdf",
        coverImage: layaPublicationImages[6],
      },
    ],

    cta: {
      eyebrow: "Get Involved",
      title: "Support Sustainable Agriculture in the Eastern Ghats",
      desc: "LAYA welcomes partnerships with agro-ecologists, seed banks, and funding institutions to expand organic biofarms, establish seed sanctuaries, and secure food sovereignty for smallholder farmers.",
      primaryBtn: { label: "Contact Our Livelihoods Team", to: ROUTES.contact },
      secondaryBtn: { label: "Support LAYA's Work", to: ROUTES.donate },
    },

    sections: [
      {
        heading: "Promotion of Sustainable Farming",
        paragraph:
          "LAYA supports diversification of crops, productivity improvements, and food security with value-added farming technologies, reaching approximately 10,000 farmer households across Andhra Pradesh.",
        image: srm,
        imageAlt: "Adivasi farmer transplanting paddy in the Eastern Ghats",
        imageCaption: "Sustainable paddy cultivation · Eastern Ghats",
      },
    ],
    outcomes: [
      "Outreach to around 10,000 farmer households in four districts.",
      "Sustainable farming, value-added technologies, and climate-resilient practices.",
      "Seed centers, seed festivals, NTFP regeneration, and biodiversity conservation.",
    ],
  },

  /* -----------------------------------------------------------------------
     4. LIFELONG LEARNING (EDUCATION)
     ----------------------------------------------------------------------- */
  {
    id: 4,
    to: ROUTES.whatWeDoLifelongLearning,
    title: "Lifelong Learning",
    shortTitle: "Lifelong Learning",
    summary:
      "Mainstream education often disconnects Adivasi youth from local history, culture and rights; this work strengthens contextual understanding, practical skills and leadership.",
    issue:
      "Mainstream education that disconnects Adivasi youth from local history, culture and rights.",
    context:
      "Reaching youth and women in East Godavari, Visakhapatnam, Vizianagaram and Srikakulam — 4,000+ youth directly, 100+ CBOs across 1,000+ villages indirectly.",
    category: "education",
    image: youth,
    imageAlt: "Adivasi youth at a LAYA lifelong learning session",
    imageCaption: "Youth leadership and capacity building workshop · Field documentation",
    metric: { label: "Youth Trained", value: "10,000+" },

    heroEyebrow: "Our Work · Lifelong Learning",
    heroHeading: "Contextual Learning, Youth Leadership & Cultural Dignity",
    heroLead:
      "Mainstream education frequently alienates Adivasi youth from their ancestral languages, ecosystems, and constitutional protections. LAYA's Lifelong Learning unit delivers rooted adult literacy, experiential climate curricula, and community college vocational pathways across 1,000+ tribal villages.",

    overviewHeading: "Education & Youth Outreach in Numbers",
    overviewIntro:
      "Verified outreach records from intensive community learning cohorts, women's adult literacy circles, and youth leadership training.",
    stats: [
      {
        value: "10,000+",
        label: "Youth Trained",
        desc: "Young Adivasi women and men equipped with practical vocational skills",
      },
      {
        value: "4,000+",
        label: "Direct Cohorts",
        desc: "Intensive training participants, with around 50% young women",
      },
      {
        value: "1,000+",
        label: "Villages Reached",
        desc: "Engaged indirectly through 100+ community-based organizations",
      },
      {
        value: "20,000+",
        label: "Campaign Outreach",
        desc: "Youth mobilized through regional environmental campaigns",
      },
      {
        value: "4",
        label: "Tribal Districts",
        desc: "East Godavari, Visakhapatnam, Vizianagaram, and Srikakulam",
      },
      {
        value: "100+",
        label: "CBO Alliances",
        desc: "Local community organizations carrying learning initiatives forward",
      },
    ],

    annualReport2026: {
      reportingYear: "2025–2026",
      themeTitle: "Lifelong Learning",
      keyInitiatives: [
        "Youth & Panchayat Orientations",
        "Constitutional Values & Rights Education",
        "Indigenous Peoples’ Day & Women’s Day Observances",
        "Vocational & Livelihood Skills",
        "Literacy & Life Skills",
        "School Education & Awareness",
        "Tuition & Play Centres",
        "Community-Based Organisations (CBO) Capacity Building",
      ],
      fieldQuote: {
        quote:
          "Last year, I completed my 10th class at an Ashram School but wasn’t sure what to do next. Although my family has always been involved in farming, I wanted to do something different without needing to migrate to the city. LAYA’s Lifelong Learning team invited me to an orientation workshop on plumbing and electrical work, and I was later selected for the programme. Today, I am working as an apprentice with an electrician. Soon, I hope to work independently, earn a living and support my family while continuing to live in my community.",
        author: "Adivasi Youth",
        location: "Parvathipuram Manyam Dist",
      },
      metrics: [
        {
          value: "198 / 3,888",
          label: "Village & panchayat meetings",
          sublabel: "198 meetings conducted reaching 3,888 participants (56% women)",
        },
        {
          value: "24 / 3,603",
          label: "Special events outreach",
          sublabel: "24 events (Women's, Children's & Indigenous Day) with 3,603 participants (60% women)",
        },
        {
          value: "431",
          label: "Skill-building participants",
          sublabel: "Electric, plumbing, computers, tailoring, bike mechanic, pickle making (65% women)",
        },
        {
          value: "1,244",
          label: "School students engaged",
          sublabel: "Sessions on social, environmental, climate change and Adivasi culture",
        },
        {
          value: "630",
          label: "Employability programme youth",
          sublabel: "Career guidance and capacity building for active community involvement",
        },
        {
          value: "255",
          label: "Tuition & play centre children",
          sublabel: "Primary school children supported in tuition centers & play schools (50% girls)",
        },
        {
          value: "21",
          label: "CBO network meetings",
          sublabel: "Community-Based Organisation network capacity building assemblies",
        },
        {
          value: "16 Teams",
          label: "Volleyball sports competition",
          sublabel: "Youth outreach through regional volleyball tournaments",
        },
      ],
    },

    approachHeading: "A Rooted Educational Ecosystem",
    approachIntro:
      "LAYA develops pedagogical models that validate indigenous ecological wisdom while imparting practical technical skills for rural autonomy.",
    pillars: [
      {
        num: "01",
        title: "Adult Crash Literacy for Women",
        desc: "Functional literacy programmes designed for adult Adivasi women, strengthening their confidence to read government notices, land records, and market receipts.",
      },
      {
        num: "02",
        title: "Community College Vocational Pathways",
        desc: "Modular vocational courses in solar technician training, herbal medicine, and sustainable farming, creating dignified livelihoods within the tribal agency areas.",
      },
      {
        num: "03",
        title: "Experiential Climate & Eco-Curricula",
        desc: "Introducing interactive, activity-based environmental education in tribal residential schools, based on LAYA's published Trainers' Manual on SDGs.",
      },
      {
        num: "04",
        title: "Youth Leadership & CBO Accompaniment",
        desc: "Building local youth collectives and community-based organizations to serve as vigilant leaders on rights, environmental stewardship, and local self-rule.",
      },
    ],
    approachVisual: {
      image: illustrationAssets.multilingualLearning.src,
      alt: illustrationAssets.multilingualLearning.alt,
      caption: illustrationAssets.multilingualLearning.caption,
      disclosure: illustrationAssets.multilingualLearning.disclosure,
    },

    actionsHeading: "Learning in Action Across the Hills",
    actionsIntro:
      "Photographic records of women's literacy groups, youth workshops, and environmental learning in tribal communities.",
    actionRows: [
      {
        tag: "Adult Literacy & Empowerment",
        title: "Crash Literacy Programmes for Tribal Women",
        body: "Organizing evening literacy circles adapted to women's agricultural routines, fostering numeracy, basic Telugu literacy, and knowledge of statutory entitlements.",
        bullets: [
          "Practical numeracy for fair trade in weekly tribal markets (shandies)",
          "Over 50% participation by young women across all cohorts",
          "Reading village council resolutions and government welfare guidelines",
        ],
        image: gallery16,
        imageAlt: "Literacy Program for Tribal Women in the Eastern Ghats",
        imageCaption:
          "Literacy Program for Tribal Women · Eastern Ghats field documentation",
      },
      {
        tag: "Vocational Skills & Employment",
        title: "Community College & Vocational Pathways",
        body: "Short and long-term technical trainings connecting rural school-leavers with green employment in renewable energy installation, organic farming, and community health.",
        bullets: [
          "Applied technical apprenticeships anchored to local village needs",
          "Building youth leadership for natural resource governance",
          "Collaborations with state vocational bodies and tribal development agencies",
        ],
        image: youth,
        imageAlt: "Adivasi youth at a LAYA lifelong learning session",
        imageCaption:
          "Youth vocational and leadership training session · Field documentation",
      },
      {
        tag: "Environmental Pedagogy",
        title: "Bilingual Ecological Education & School Modules",
        body: "Rolling out contextualized environmental science curricula in Adivasi schools, linking classroom concepts with ancestral forest knowledge and mother-tongue storytelling.",
        bullets: [
          "Game-based learning on the UN Sustainable Development Goals (SDGs)",
          "Nature walks documenting local medicinal flora and seasonal stream flows",
          "Mobilizing over 20,000 youth through environmental awareness campaigns",
        ],
        image: illustrationAssets.multilingualLearning.src,
        imageAlt: "Outdoor village circle learning in the Eastern Ghats",
        imageCaption:
          "Mother-tongue environmental learning circle · Illustrative plate",
        imageDisclosure: "Illustrative image",
      },
    ],

    storiesHeading: "Stories from the Field",
    storiesIntro:
      "Field documentation and stories of change on education, mother-tongue learning, and youth leadership.",
    stories: [
      {
        tag: "Field Note",
        title: "Mother Tongue, Mother Earth: Ecological Education",
        desc: "Fostering mother-tongue education, traditional ecological knowledge transmission, and youth community accompaniment.",
        to: "/stories/note-3",
        image: illustrationAssets.multilingualLearning.src,
        imageAlt: "Mother tongue learning illustration",
        imageDisclosure: "Illustrative image",
        linkText: "Read Field Note",
      },
      {
        tag: "Case Study",
        title: "The Rhythm Behind Stories of Change: Youth Pathways",
        desc: "Personal and communal narratives capturing the slow, complex process of youth empowerment in the Eastern Ghats.",
        to: ROUTES.publications,
        image: layaPublicationImages[13],
        imageAlt: "The Rhythm Behind Stories of Change cover",
        linkText: "Read in Resource Centre",
      },
      {
        tag: "Field Note",
        title: "Reclaiming the Forest: A Community's Journey",
        desc: "Gram sabha empowerment and youth leadership defending ancestral forest rights under FRA.",
        to: "/stories/note-1",
        image: illustrationAssets.forestStewardship.src,
        imageAlt: "Forest rights meeting illustration",
        imageDisclosure: "Illustrative image",
        linkText: "Read Field Note",
      },
    ],

    publicationsHeading: "Related Education & Youth Publications",
    publicationsIntro:
      "Verified curriculum manuals and pedagogical documentation developed for educators and youth mobilizers.",
    publications: [
      {
        title: "Trainers' Manual on SDGs",
        date: "2019",
        type: "Training Manual",
        desc: "Games and interactive activities for Sustainable Development Goals and climate change education with children and youth.",
        pdfUrl:
          "https://laya.org.in/PublicFiles/Trainers-Manual-on-Games-and-Activities-SDG-CC.pdf",
        coverImage: layaPublicationImages[9],
      },
      {
        title: "The Rhythm Behind Stories of Change",
        date: "February 2019",
        type: "Story Collection",
        desc: "Captures the qualitative spirit, cultural resilience, and rhythmic cycles driving community empowerment in the Eastern Ghats.",
        pdfUrl:
          "https://laya.org.in/PublicFiles/THE_RHYTHM_BEHIND_STORIES_OF_CHANGE.pdf",
        coverImage: layaPublicationImages[13],
      },
    ],

    cta: {
      eyebrow: "Get Involved",
      title: "Support Adivasi Youth Education & Leadership",
      desc: "LAYA welcomes partnerships with educators, pedagogical researchers, and foundations to expand community college courses, adult women's literacy, and eco-schools across the Eastern Ghats.",
      primaryBtn: { label: "Contact Our Education Team", to: ROUTES.contact },
      secondaryBtn: { label: "Support LAYA's Work", to: ROUTES.donate },
    },

    sections: [
      {
        heading: "Outreach",
        paragraph:
          "The lifelong learning unit reaches youth and women in East Godavari, Visakhapatnam, Vizianagaram, and Srikakulam districts. It engages directly with 4,000+ youth and indirectly through 100+ CBOs in 1,000+ villages.",
        image: youth,
        imageAlt: "Adivasi youth at a LAYA lifelong learning session",
        imageCaption: "Youth leadership and capacity building workshop · Field documentation",
      },
    ],
    outcomes: [
      "Direct outreach to 4,000+ youth, with around 50% young women.",
      "Adult crash literacy, community college pathways, and climate education.",
      "Indirect engagement through CBO networks across 1,000+ villages.",
    ],
  },

  /* -----------------------------------------------------------------------
     5. CLIMATE CRISIS & SUSTAINABLE DEVELOPMENT
     ----------------------------------------------------------------------- */
  {
    id: 5,
    to: ROUTES.whatWeDoClimate,
    title: "Climate Crisis & Sustainable Development",
    shortTitle: "Climate Crisis & Sustainable Development",
    summary:
      "LAYA advances climate resilience, local energy, awareness and policy advocacy for communities whose vulnerabilities climate change worsens.",
    issue:
      "Erratic rainfall, rising temperatures and extreme weather intensify the marginalisation of communities dependent on natural resources.",
    context:
      "Community resilience planning, climate-friendly technologies and decentralized energy approaches, including coastal ecosystem model pilots.",
    category: "climate",
    image: climate,
    imageAlt: "Climate-resilient landscape work in the Eastern Ghats",
    imageCaption:
      "Community environmental resilience and energy installations · Field documentation",
    metric: { label: "Green Projects", value: "50+" },

    heroEyebrow: "Our Work · Climate Crisis & Sustainable Development",
    heroHeading: "Climate Resilience, Clean Energy & Coastal Ecosystems",
    heroLead:
      "Erratic rainfall, warming temperatures, and extreme weather disproportionately hit Adivasi and coastal fishing communities. LAYA advances grassroots climate adaptation through decentralized renewable energy, community water schemes, fuel-efficient cookstoves, and restorative coastal aquaculture.",

    overviewHeading: "Climate Action in Numbers & Field Scope",
    overviewIntro:
      "Verified records from two decades of decentralized clean energy, participatory climate adaptation, and open-sea aquaculture pilots in Andhra Pradesh.",
    stats: [
      {
        value: "50+",
        label: "Green Projects",
        desc: "Decentralized solar, water, micro-hydro, and clean cookstoves installed",
      },
      {
        value: "16",
        label: "GIS Parameters",
        desc: "Scientific assessment of 15 coastal sites identifying 7 prime cultivation zones",
      },
      {
        value: "86+",
        label: "Fishers Trained",
        desc: "Trained in restorative seaweed farming with ICAR-CMFRI and DHAN Foundation",
      },
      {
        value: "4",
        label: "Farming Systems",
        desc: "Tested HDPE rafts, bamboo rafts, tubelines, and submersed cages",
      },
      {
        value: "2022–25",
        label: "Coastal Pilots",
        desc: "Active sea trials at RK Beach and Mangamaripeta with green mussels",
      },
      {
        value: "100%",
        label: "Community Owned",
        desc: "Decentralized energy systems managed autonomously by village Gram Sabhas",
      },
    ],

    annualReport2026: {
      reportingYear: "2025–2026",
      themeTitle: "Climate Crisis and Sustainable Development",
      keyInitiatives: [
        "Community-based Carbon Projects (Gold Standard VER & PRAGATHI)",
        "Improved Cookstove Design & Construction",
        "Demonstrative Aquaponics & Hydroponics Units",
        "Safe Drinking Water Technologies & 530 Ceramic Pot Filters",
        "Gravity-Fed Community Water Systems (270 Households)",
        "Cool Roofing Pilot Initiatives (8–10°C temperature reduction)",
        "Coastal Integrated Multi-Trophic Aquaculture (IMTA) — Seaweed & Mussel Farming",
        "Urban & Peri-Urban Climate Action Plans (Visakhapatnam & Yeleswaram)",
        "Regional Climate Adaptation Partnerships (RECAP Manipur & Northeast India)",
      ],
      fieldQuote: {
        quote:
          "The village borewell stopped working, so I had to walk to the nearby stream to collect water for drinking and bathing. The stream water was often contaminated and caused waterborne illnesses in my family. LAYA helped us access a water filter, which now provides us with clean drinking water. They also helped our village install a gravity water system, so water now reaches the village and we no longer have to walk long distances carrying heavy vessels of water.",
        author: "Adivasi Woman",
        location: "Polavaram Dist",
      },
      metrics: [
        {
          value: "22,714+",
          label: "Clean cookstoves monitored",
          sublabel: "Gold Standard Paderu (4,600), Surakshana (9,114) & PRAGATHI (9,000)",
        },
        {
          value: "4,000",
          label: "New cookstoves constructed",
          sublabel: "Constructed during 2025–2026 under the LAYA PRAGATHI project",
        },
        {
          value: "530",
          label: "Ceramic water filters distributed",
          sublabel: "Provided to tribal households for pathogen-free drinking water",
        },
        {
          value: "270",
          label: "Households served by gravity water",
          sublabel: "Perennial spring gravity water systems delivering zero-emission water",
        },
        {
          value: "8–10°C",
          label: "Roof surface heat reduction",
          sublabel: "Observed in cool roofing pilot across 15 heat-stressed tribal households",
        },
        {
          value: "50 / 25",
          label: "Fishers & students in mariculture",
          sublabel: "Integrated mariculture training, biostimulant trials & published bilingual mussel manual",
        },
        {
          value: "2 Cities",
          label: "Citizen climate action plans",
          sublabel: "Visakhapatnam & Yeleswaram: remote sensing vulnerability mapping & student surveys",
        },
        {
          value: "RECAP",
          label: "Regional Northeast India partnership",
          sublabel: "18 climate leaders in Manipur trained on participatory disaster resilience",
        },
      ],
      subThemes: [
        {
          id: "sustainable-agriculture",
          tag: "Division 1 · Annual Report 2025–2026",
          title: "Sustainable Agriculture and Natural Resource Management",
          shortTitle: "Sustainable Agriculture & NRM",
          subtitle: "Climate-Resilient Agriculture Promotion, 10 Natural Farming POPs & Water Security",
          description:
            "Promoting climate-resilient agriculture, consolidating 10 natural farming package of practices across 2,872 households, Gulli Ragi millet expansion, seed centres and home seed banks, gravity irrigation systems, and soil nutrient management using ghana and drava jeevamruthams.",
          keyInitiatives: [
            "Climate-Resilient Agriculture Promotion",
            "10 Natural Farming Package of Practices consolidated across 2,872 tribal farm households",
            "Seed Centres & Home Seed Banks conserving native climate-resilient pulses, tubers, and millets",
            "Skills and Entrepreneurship Development (52 farmers benefitted in business and digital skills)",
            "Water Security Strengthening: gravity irrigation & renovated checkdams serving 175 households; 32 water body feasibility sites identified",
            "Poultry, Aquaculture & Horticulture: millet yield optimization, turmeric and ginger cultivation, homesteads, bio-farm model plots, nutri-kitchen gardens across 15,551 households",
          ],
          fieldQuote: {
            quote:
              "Three years ago, I mainly grew ragi using traditional farming methods, but the yield was low, and my food stocks often ran out, forcing my family to depend on the PDS and NREGS for support. Then a LAYA Community Resource Person introduced me to Gulli Ragi, an improved method that has nearly doubled the yield. Today, my food stocks last throughout the year, and I can sell or save the surplus as seed. I no longer need to depend on NREGS or moneylenders when I need money, and I feel much more economically secure and resilient.",
            author: "Adivasi Farmer",
            location: "Alluri Seetharama Raju Dist",
          },
          metrics: [
            {
              value: "2,872 HH",
              label: "Natural farming households",
              sublabel: "Practicing 10 validated agroecological package of practices",
            },
            {
              value: "15,551 HH",
              label: "Millet & nutri-gardens",
              sublabel: "Yield optimization, homesteads, bio-farm plots & mixed cropping",
            },
            {
              value: "920 HH / 2,800 Ac",
              label: "Soil nutrient management",
              sublabel: "Utilizing ghana and drava jeevamruthams for soil health",
            },
            {
              value: "175 HH / 32 Sites",
              label: "Gravity water & feasibility",
              sublabel: "Water from new gravity irrigation & 32 water body feasibility sites",
            },
          ],
        },
        {
          id: "biodiversity-health",
          tag: "Division 2 · Annual Report 2025–2026",
          title: "Biodiversity, Landuse and Ecosystem Restoration",
          shortTitle: "Biodiversity & Ecosystems",
          subtitle: "Traditional Health Practitioner Network, Medicinal Plants Conservation & Safe Drinking Water",
          description:
            "Strengthening traditional healthcare and herbal medicine systems, conserving over 200 medicinal flora species in 24 gardens, preparing 26 standardized herbal medicine types, and ensuring safe drinking water by mobilizing 2,262 households to adopt boiled water practices.",
          keyInitiatives: [
            "Traditional Health Practitioner Training & Network Strengthening (6 regional meetings; 75 THPs and Community Ayurvedic Practitioners)",
            "Community Ayurvedic Practitioners Training & Orientation for 276 youth",
            "Herbal/Ayurvedic Healthcare Provision in Adivasi Communities (16,848 patients monitored, 47% women; 17,313 reached in special health camps)",
            "Medicine Types Prepared: 26 standardized herbal formulations prepared in-house by Vanantharam",
            "Medicinal Plants Conservation: over 200 species conserved across 24 herbal conservation gardens",
            "Safe Drinking Water: 2,262 of 5,258 households adopted daily boiled drinking water",
          ],
          fieldQuote: {
            quote:
              "When my family or I fell ill, we would go to the Primary Health Centre, but the doctors were often absent, and the treatment or medicines did not help. The staff were also rude and dismissive, so we started visiting mobile dispensaries at the weekly market, which were expensive and often unable to help us. LAYA–Vanantharam and their team restored our faith in traditional healers and encouraged us to visit Community-based Ayurvedic Practitioners. They have helped my family with many of our health problems and, when they cannot help, they refer us to qualified doctors.",
            author: "Adivasi villager",
            location: "Polavaram Dist",
          },
          metrics: [
            {
              value: "26 Types",
              label: "Medicine types prepared",
              sublabel: "Formulated in-house by Vanantharam community pharmacy",
            },
            {
              value: "200+ Species",
              label: "Medicinal plants conserved",
              sublabel: "Across 24 herbal conservation and demonstration gardens",
            },
            {
              value: "34,161",
              label: "Total patient consultations",
              sublabel: "16,848 monitored clinic visits (47% women) + 17,313 health camp beneficiaries",
            },
            {
              value: "2,262 HH",
              label: "Boiled drinking water adopted",
              sublabel: "2,262 of 5,258 households adopting safe boiled drinking water",
            },
          ],
        },
        {
          id: "climate-tech-coastal",
          tag: "Division 3 · Annual Report 2025–2026",
          title: "Climate-Friendly Technologies and Coastal Ecosystems",
          shortTitle: "Climate-Friendly Tech & Coast",
          subtitle: "Community-Based Carbon Projects, Cookstoves, Safe Drinking Water & Coastal Mariculture",
          description:
            "Operating verified carbon projects across 22,714+ improved cookstoves, constructing 4,000 new stoves, deploying 530 ceramic water filters and gravity water systems, testing 8–10°C cool roofing paint, and pioneering open-sea seaweed and mussel mariculture.",
          keyInitiatives: [
            "Community-based Carbon Projects: LAYA Paderu Gold Standard (4,600), Surakshana Gold Standard (9,114), and PRAGATHI (9,000) — monitored 22,714+ stoves",
            "Cookstoves: 4,000 new improved cookstoves constructed under LAYA PRAGATHI project; design improvements ongoing",
            "Demonstrative Aquaponic and hydroponic units for decentralized nutrition",
            "Safe Drinking Water Technology: 530 ceramic water filters made and distributed",
            "Gravity-Fed Community Water Systems: delivering water to 270 households",
            "Cool Roofing Pilot Initiatives: 15 houses coated with cool roofing paint, achieving 8–10°C reduction in roof surface temperature",
            "Coastal Integrated Multi-Trophic Aquaculture (IMTA) using seaweed & mussel farming; published bilingual manual & trained 50 fishers and 25 students",
            "Exploring funding opportunities to pilot artificial reefs and biostimulant field trials",
          ],
          fieldQuote: {
            quote:
              "The village borewell stopped working, so I had to walk to the nearby stream to collect water for drinking and bathing. The stream water was often contaminated and caused waterborne illnesses in my family. LAYA helped us access a water filter, which now provides us with clean drinking water. They also helped our village install a gravity water system, so water now reaches the village and we no longer have to walk long distances carrying heavy vessels of water.",
            author: "Adivasi Woman",
            location: "Polavaram Dist",
          },
          metrics: [
            {
              value: "22,714+",
              label: "Clean cookstoves monitored",
              sublabel: "Gold Standard Paderu (4,600), Surakshana (9,114) & PRAGATHI (9,000)",
            },
            {
              value: "4,000",
              label: "New cookstoves built",
              sublabel: "Fabricated and installed in 2025–2026 under LAYA PRAGATHI",
            },
            {
              value: "8–10°C",
              label: "Roof temperature reduction",
              sublabel: "Observed in cool roofing paint pilot across 15 heat-stressed houses",
            },
            {
              value: "530 / 270",
              label: "Water filters & gravity HH",
              sublabel: "530 ceramic filters distributed & 270 households served by gravity water",
            },
          ],
        },
        {
          id: "urban-peri-urban",
          tag: "Division 4 · Annual Report 2025–2026",
          title: "Urban and Peri-Urban Ecosystems",
          shortTitle: "Urban & Peri-Urban",
          subtitle: "Citizen-Centric Climate Action Plans, Satellite Remote Sensing & Summer Youth Camps",
          description:
            "Formulating Citizen-Centric Climate Action Plans for the City of Visakhapatnam and the peri-urban town of Yeleswaram through student volunteer surveys, satellite remote sensing of heat islands and drainage vulnerabilities, community FGDs, and summer camps bridging urban youth with Adivasi communities.",
          keyInitiatives: [
            "Building Climate Perspective Amongst Youth and Women",
            "Academic Partnerships: Andhra University, Anil Neerukonda Institute of Technology and Sciences (ANITS), Yeleswaram Government Degree College, SSB Degree College & MUN delegates",
            "Preparation of Citizen-Centric Climate Action Plan for the City of Visakhapatnam and peri-urban town of Yeleswaram",
            "Student Volunteers Field Data Collection for city climate and drainage vulnerability mapping",
            "Remote Sensing Thermal & Spatial Data to identify urban heat islands and water stagnation clusters",
            "Focus Group Discussions (FGDs) with local self-help, youth groups, government officials & municipal stakeholders",
            "Organised a Summer Camp for high-schoolers to bridge urban and Adivasi worlds",
          ],
          fieldQuote: {
            quote:
              "I visited some houses. What we observed in this survey is that due to the lack of proper drainage, stagnant water accumulates. We understand that people are suffering from typhoid, dengue, and malaria fevers, the survey was collected from different age groups. This survey has taught us how to interact with people. We know what problems there are in Yeleswaram.",
            author: "Ms. Supriya Pendyala, Student Volunteer",
            location: "Visakhapatnam & Yeleswaram",
          },
          metrics: [
            {
              value: "2 Cities",
              label: "Citizen climate action plans",
              sublabel: "City of Visakhapatnam and peri-urban town of Yeleswaram",
            },
            {
              value: "4 Colleges",
              label: "Academic institution partners",
              sublabel: "Andhra University, ANITS, Yeleswaram Govt College & SSB Degree College",
            },
            {
              value: "FGDs",
              label: "Focus group discussions",
              sublabel: "Conducted with self-help groups, youth, sanitation workers & officials",
            },
            {
              value: "Summer Camp",
              label: "Bridging urban & Adivasi youth",
              sublabel: "Experiential immersion program connecting high-schoolers with tribal conservation",
            },
          ],
        },
        {
          id: "partner-engagements",
          tag: "Division 5 · Annual Report 2025–2026",
          title: "Partner Engagements",
          shortTitle: "Partner Engagements",
          subtitle: "RECAP Northeast India, Urban Transformation Platform (UTP) & India DONATES",
          description:
            "Strengthening regional climate adaptation and urban resilience architecture through the RECAP coalition in Northeast India, serving as Project Fund Administrator for the national Urban Transformation Platform (UTP), and crowdsourcing safe drinking water filters via India DONATES.",
          keyInitiatives: [
            "Regional Enhancement for Climate Adaptation and Partnership (RECAP): inaugural engagement in Manipur for 18 leaders and practitioners across Northeast India",
            "Participatory Risk Assessments for Climate and Disaster Resilience, shifting from activity-based tasks to strategic Theory of Change pathways",
            "Urban Transformation Platform (UTP): Project Fund Administrator, contributing to monthly online partner convenings",
            "Fundraising Support from India DONATES: crowdsourced funds for ceramic pot drinking water filters",
            "Advocating for community-led climate adaptation, resilient urban infrastructure, and grassroots carbon justice",
          ],
          fieldQuote: {
            quote:
              "India's urban population expected to almost double by 2050 to 951 million, more than 144 million new homes will be needed by 2070. India has a critical opportunity to drive resilient urban development.",
            author: "2025 World Bank Report",
            location: "Partner Engagements / Urban Transformation",
          },
          metrics: [
            {
              value: "18 Leaders",
              label: "RECAP Northeast India delegates",
              sublabel: "Climate practitioners from 6 Northeast states trained in Manipur",
            },
            {
              value: "UTP Admin",
              label: "Project Fund Administrator",
              sublabel: "Administering fund for national Urban Transformation Platform",
            },
            {
              value: "India DONATES",
              label: "Safe water crowdsourcing",
              sublabel: "Mobilized resources for ceramic pot water filters in vulnerable hamlets",
            },
            {
              value: "Multi-State",
              label: "Coalition reach",
              sublabel: "Active policy engagement across Andhra Pradesh, Manipur & national networks",
            },
          ],
        },
      ],
    },

    approachHeading: "An Integrated Climate Justice Framework",
    approachIntro:
      "LAYA operates across ridge-to-reef ecosystems, developing mitigation and adaptation models that enhance community sovereignty while restoring biodiversity.",
    pillars: [
      {
        num: "01",
        title: "Participatory Climate Adaptation Planning",
        desc: "Working with upland communities to adjust crop sowing calendars, build rainwater catchment infrastructure, and counter severe rainfall variability.",
      },
      {
        num: "02",
        title: "Decentralized Renewable Energy & Clean Cooking",
        desc: "Enabling local communities to produce, manage, and maintain off-grid solar, micro-hydro, and energy-efficient cookstoves that cut fuelwood demand by half.",
      },
      {
        num: "03",
        title: "Restorative Coastal Aquaculture",
        desc: "Developing scalable, nature-positive seaweed and green mussel raft aquaculture with fisherfolk, sequestering carbon and restoring coastal marine biodiversity.",
      },
      {
        num: "04",
        title: "Policy Advocacy for Just Transition",
        desc: "Generating grassroots field evidence to advocate for PMMSY seaweed subsidies and evaluating the socio-environmental safeguards of multilateral infrastructure financing.",
      },
    ],
    approachVisual: {
      image: illustrationAssets.coastalSeaweed.src,
      alt: illustrationAssets.coastalSeaweed.alt,
      caption: illustrationAssets.coastalSeaweed.caption,
      disclosure: illustrationAssets.coastalSeaweed.disclosure,
    },

    actionsHeading: "Climate Action from Ridges to Reefs",
    actionsIntro:
      "Photographic records of community energy installations, fuel-efficient stoves, and open-water aquaculture trials.",
    actionRows: [
      {
        tag: "Household Energy & Health",
        title: "Energy Efficient Cookstoves & Indoor Air Quality",
        body: "Disseminating fuel-efficient wood cookstoves across tribal hamlets to reduce respiratory illness among women and children while cutting household firewood gathering burdens.",
        bullets: [
          "Over 50% reduction in household firewood consumption",
          "Evaluated in research with the University of Colorado Denver on socio-cultural adoption",
          "Trained women artisans in stove fabrication and ongoing maintenance",
        ],
        image: gallery22,
        imageAlt: "Community energy efficient wood stove installation",
        imageCaption:
          "Energy efficient wood stove in an Adivasi household · Field documentation",
      },
      {
        tag: "Blue Economy & Marine Restoration",
        title: "Coastal Seaweed & Green Mussel Aquaculture",
        body: "Piloting HDPE raft and submersed cage seaweed cultivation along the Visakhapatnam coast with ICAR-CMFRI, providing alternative incomes and sequestering marine carbon.",
        bullets: [
          "Tested four farming methods under rough sea conditions at RK Beach and Mangamaripeta",
          "Trained 86 fishers and students in seaweed vegetative propagation and raft assembly",
          "Integrating green mussels on seaweed rafts for enhanced productivity and biodiversity",
        ],
        image: illustrationAssets.coastalSeaweed.src,
        imageAlt: "HDPE seaweed and mussel aquaculture rafts",
        imageCaption:
          "Restorative seaweed raft farming pilot along the Andhra coast · Illustrative plate",
        imageDisclosure: "Illustrative image",
      },
      {
        tag: "Water Security & Gravity Flow",
        title: "Gravity Water Schemes & Watershed Protection",
        body: "Installing gravitational spring-fed water pipelines from perennial upland springs, delivering clean water to remote hilltop hamlets without electricity or fuel pumps.",
        bullets: [
          "100% community-managed water infrastructure serving off-grid villages",
          "Zero operational emissions through purely gravitational gradient flow",
          "Protecting native catchment forests around sacred hill water springs",
        ],
        image: gallery25,
        imageAlt: "Community gravity water flow scheme installation",
        imageCaption:
          "Gravity water flow scheme installation · Eastern Ghats field documentation",
      },
      {
        tag: "Urban Resilience & Heat Mitigation",
        title: "Citizen-Centric Urban Climate Action Plans",
        body: "Partnering with Andhra University, municipal colleges, and community fellows in Visakhapatnam and Yeleswaram to map heat islands, mitigate waterlogging, and institutionalize community-led adaptation.",
        bullets: [
          "Satellite remote sensing identifying urban heat islands and water stagnation clusters",
          "Participatory focus group discussions across 40+ municipal wards with informal workers and slum residents",
          "Intergenerational youth climate camps connecting urban high schoolers with indigenous ecological stewards",
        ],
        image: imgWa122915,
        imageAlt: "Urban citizen climate survey and youth fellowship workshop",
        imageCaption:
          "Citizen-Centric Climate Action field workshop · Urban adaptation documentation",
      },
      {
        tag: "Regional Coalitions & Multi-State Action",
        title: "Regional Enhancement for Climate Adaptation & Partnerships (RECAP)",
        body: "Translating three decades of Eastern Ghats community adaptation into a national cross-learning bridge, training grassroots leaders across Northeast India and administering the national Urban Transformation Platform (UTP) fund.",
        bullets: [
          "18 grassroots leaders from 6 Northeast states trained in participatory disaster resilience in Manipur",
          "Serving as Project Fund Administrator for the national Urban Transformation Platform (UTP)",
          "Advancing grassroots carbon justice and loss-and-damage accountability through CANSA and national networks",
        ],
        image: imgImg6830,
        imageAlt: "Regional climate adaptation and civil society fellowship assembly",
        imageCaption:
          "Regional climate adaptation fellowship assembly · Multi-state network convening",
      },
    ],

    storiesHeading: "Stories from the Field",
    storiesIntro:
      "Field documentation and research case studies on community resilience, renewable energy, and coastal aquaculture.",
    stories: [
      {
        tag: "Case Study",
        title: "Building Community Resilience in a Climate Changing Environment",
        desc: "Ground-level view of how climate change alters Adivasi realities and the decentralized adaptation strategies deployed.",
        to: ROUTES.publications,
        image: layaPublicationImages[4],
        imageAlt: "Building Community Resilience cover",
        linkText: "Read in Resource Centre",
      },
      {
        tag: "Case Study",
        title: "Renewable Energy Case Study: Decentralized Energy Access",
        desc: "Operational challenges and successes of implementing solar and micro-hydro systems where state grids fail to reach.",
        to: ROUTES.publications,
        image: layaPublicationImages[1],
        imageAlt: "Renewable Energy Case Study cover",
        linkText: "Read in Resource Centre",
      },
      {
        tag: "Field Note",
        title: "Seeds of Change: Millet Revival & Climate Resilience",
        desc: "Reviving drought-resistant crops to secure community nutrition during prolonged dry spells.",
        to: "/stories/note-2",
        image: illustrationAssets.milletRevival.src,
        imageAlt: "Millet winnowing illustration",
        imageDisclosure: "Illustrative image",
        linkText: "Read Field Note",
      },
    ],

    publicationsHeading: "Related Climate & Energy Publications",
    publicationsIntro:
      "Verified research monographs and policy studies evaluating climate adaptation, energy access, and coastal biodiversity.",
    publications: [
      {
        title: "Building Community Resilience",
        date: "August 2020",
        type: "Report",
        desc: "Details specific adaptive strategies deployed in remote Adivasi regions to withstand erratic rainfall and temperature spikes.",
        pdfUrl:
          "https://laya.org.in/PublicFiles/Laya-The change story2021.pdf",
        coverImage: layaPublicationImages[4],
      },
      {
        title: "Policy Brief on Coastal Ecosystem",
        date: "2019",
        type: "Policy Brief",
        desc: "Outlines threats to coastal biodiversity and wetlands, advocating for community-driven stewardship of marine resources.",
        pdfUrl:
          "https://laya.org.in/PublicFiles/Policy-Brief-Coastal-Ecosystem.pdf",
        coverImage: layaPublicationImages[10],
      },
      {
        title: "Training in Integrated Mussel Farming",
        date: "March 2026",
        type: "Training Manual",
        desc: "Practical guide detailing the integration of sea cage aquaculture with seaweed farming for coastal communities.",
        pdfUrl: "https://laya.org.in/PublicFiles/Mussel_Seaweed_Book.pdf",
        coverImage: layaPublicationImages[0],
      },
    ],

    cta: {
      eyebrow: "Get Involved",
      title: "Collaborate on Climate Resilience & Clean Energy",
      desc: "LAYA welcomes partnerships with climate scientists, marine researchers, clean technology innovators, and donors to scale decentralized clean energy and restorative coastal ecosystems.",
      primaryBtn: { label: "Contact Our Climate Team", to: ROUTES.contact },
      secondaryBtn: { label: "Support LAYA's Work", to: ROUTES.donate },
    },

    sections: [
      {
        heading: "Climate vulnerability context",
        paragraph:
          "Erratic rainfall, rising temperatures, and extreme weather intensify marginalization in Adivasi regions. LAYA's interventions build local adaptation and resilience in this context.",
        image: climate,
        imageAlt: "Climate-resilient landscape work in the Eastern Ghats",
        imageCaption: "Community environmental resilience · Eastern Ghats field work",
      },
    ],
    outcomes: [
      "Community resilience and local adaptation-oriented planning.",
      "Climate-friendly technologies and decentralized energy approaches.",
      "Education, awareness, and policy advocacy for climate justice.",
    ],
  },

  /* -----------------------------------------------------------------------
     6. CLIMATE-FRIENDLY TECHNOLOGIES AND COASTAL ECOSYSTEMS (DIVISION 03)
     ----------------------------------------------------------------------- */
  {
    id: 6,
    to: ROUTES.whatWeDoClimateTechCoastal,
    title: "Climate-Friendly Technologies and Coastal Ecosystems",
    shortTitle: "Climate-Friendly Tech & Coast",
    summary:
      "Operating verified carbon projects across 22,714+ improved cookstoves, constructing 4,000 new stoves, deploying 530 ceramic water filters and gravity water systems, testing 8–10°C cool roofing paint, and pioneering open-sea seaweed and mussel mariculture.",
    issue:
      "Indoor air pollution from traditional biomass hearths, severe waterborne pathogens in remote off-grid tribal hamlets, extreme seasonal heat stress, and dwindling marine fishery stocks along vulnerable coastal belts.",
    context:
      "Tribal agency settlements in Paderu and Rampachodavaram alongside artisanal fishing villages along the Visakhapatnam coastline (RK Beach, Mangamaripeta).",
    category: "climate",
    image: gallery22,
    imageAlt: "Energy efficient wood stove in an Adivasi household · LAYA Energy Programme",
    imageCaption:
      "Community energy efficient wood stove installation in an Adivasi household · Field documentation",
    metric: { label: "Clean Stoves Monitored", value: "22,714+" },

    heroEyebrow: "Our Work · Climate Crisis & Sustainable Development · Division 03",
    heroHeading: "Climate-Friendly Technologies & Coastal Ecosystems",
    heroLead:
      "Deploying grassroots carbon projects, decentralized clean energy, zero-emission gravity drinking water systems, solar-reflective cool roofing, and open-sea restorative aquaculture across tribal hill tracts and coastal communities.",

    overviewHeading: "Clean Energy, Water & Coastal Action in Numbers",
    overviewIntro:
      "Verified records from the Gold Standard carbon portfolio, drinking water technology distribution, cool roofing thermal trials, and integrated multi-trophic aquaculture pilots.",
    stats: [
      {
        value: "22,714+",
        label: "Clean Cookstoves",
        desc: "Gold Standard Paderu (4,600), Surakshana (9,114) & PRAGATHI (9,000)",
      },
      {
        value: "4,000",
        label: "New Cookstoves",
        desc: "Constructed during 2025–2026 under the LAYA PRAGATHI project",
      },
      {
        value: "530",
        label: "Water Filters",
        desc: "Ceramic pot water filters distributed for pathogen-free drinking water",
      },
      {
        value: "270 HH",
        label: "Gravity Water",
        desc: "Households supplied by perennial spring gravity water systems",
      },
      {
        value: "8–10°C",
        label: "Roof Cooling",
        desc: "Surface temperature reduction in cool roofing paint pilot across 15 houses",
      },
      {
        value: "50 / 25",
        label: "Fishers & Students",
        desc: "Trained in open-sea seaweed & mussel mariculture with ICAR-CMFRI",
      },
    ],

    annualReport2026: {
      reportingYear: "2025–2026",
      themeTitle: "Climate-Friendly Technologies and Coastal Ecosystems",
      keyInitiatives: [
        "Community-based Carbon Projects: LAYA Paderu Gold Standard (4,600), Surakshana Gold Standard (9,114), and PRAGATHI (9,000) — monitored 22,714+ stoves",
        "Cookstoves: 4,000 new improved cookstoves constructed under LAYA PRAGATHI project; design improvements ongoing",
        "Demonstrative Aquaponic and hydroponic units for decentralized nutrition",
        "Safe Drinking Water Technology: 530 ceramic water filters made and distributed",
        "Gravity-Fed Community Water Systems: delivering water to 270 households with zero emissions",
        "Cool Roofing Pilot Initiatives: 15 houses coated with cool roofing paint, achieving 8–10°C reduction in roof surface temperature",
        "Coastal Integrated Multi-Trophic Aquaculture (IMTA) using seaweed & mussel farming; published bilingual manual & trained 50 fishers and 25 students",
        "Exploring funding opportunities to pilot artificial reefs and biostimulant field trials",
      ],
      fieldQuote: {
        quote:
          "The village borewell stopped working, so I had to walk to the nearby stream to collect water for drinking and bathing. The stream water was often contaminated and caused waterborne illnesses in my family. LAYA helped us access a water filter, which now provides us with clean drinking water. They also helped our village install a gravity water system, so water now reaches the village and we no longer have to walk long distances carrying heavy vessels of water.",
        author: "Adivasi Woman",
        location: "Polavaram Dist",
      },
      metrics: [
        {
          value: "22,714+",
          label: "Clean cookstoves monitored",
          sublabel: "Gold Standard Paderu (4,600), Surakshana (9,114) & PRAGATHI (9,000)",
        },
        {
          value: "4,000",
          label: "New cookstoves built",
          sublabel: "Fabricated and installed in 2025–2026 under LAYA PRAGATHI",
        },
        {
          value: "8–10°C",
          label: "Roof temperature reduction",
          sublabel: "Observed in cool roofing paint pilot across 15 heat-stressed houses",
        },
        {
          value: "530 / 270",
          label: "Water filters & gravity HH",
          sublabel: "530 ceramic filters distributed & 270 households served by gravity water",
        },
      ],
    },

    approachHeading: "A Community-Owned Technological & Marine Framework",
    approachIntro:
      "Combining verified emission-reduction technologies with grassroots community ownership, local material fabrication, and nature-positive open-sea mariculture.",
    pillars: [
      {
        num: "01",
        title: "Community-Based Carbon & Clean Cookstoves",
        desc: "Monitoring 22,714+ fuel-efficient cookstoves across Paderu, Surakshana, and PRAGATHI under Gold Standard VER certification, reducing fuelwood consumption by half and eliminating hazardous smoke.",
      },
      {
        num: "02",
        title: "Safe Drinking Water Technologies",
        desc: "Deploying 530 locally manufactured ceramic pot filters and constructing gravity-fed pipeline networks from mountain springs to serve 270 households with zero pumping emissions.",
      },
      {
        num: "03",
        title: "Cool Roofing Thermal Adaptation",
        desc: "Applying solar-reflective cool roofing coatings across heat-stressed households, reducing indoor and roof surface temperatures by 8–10°C during peak summer months.",
      },
      {
        num: "04",
        title: "Restorative Coastal Aquaculture (IMTA)",
        desc: "Developing nature-positive seaweed (Kappaphycus, Gracilaria) and green mussel raft aquaculture with artisanal fishers along the Visakhapatnam coast in partnership with ICAR-CMFRI.",
      },
    ],
    approachVisual: {
      image: gallery22,
      alt: "Energy-efficient clean cookstove in a tribal household",
      caption: "Fuel-efficient cookstove installation in an Adivasi household · LAYA Energy Programme",
    },

    actionsHeading: "Key Clean Tech & Coastal Interventions",
    actionsIntro:
      "Photographic documentation of community energy installations, gravity water networks, and open-sea aquaculture trials.",
    actionRows: [
      {
        tag: "Household Energy & Carbon Mitigation",
        title: "Improved Cookstove Construction & Carbon Crediting",
        body: "Constructing and monitoring over 22,714 clean cookstoves across Paderu and surrounding agency valleys, cutting firewood consumption, lowering indoor air particulate matter, and generating Gold Standard certified voluntary emission reductions.",
        bullets: [
          "4,000 new improved cookstoves built under LAYA PRAGATHI project in 2025–2026",
          "Comprehensive digital and field monitoring across 22,714+ total installations",
          "Trained women masons and village energy committees in routine maintenance",
        ],
        image: gallery22,
        imageAlt: "Improved wood cookstove in an Adivasi household",
        imageCaption: "Fuel-efficient cookstove installation · Field documentation",
      },
      {
        tag: "Zero-Emission Water Security",
        title: "Gravity Water Systems & Ceramic Pot Filters",
        body: "Harnessing perennial upland gravity springs to channel fresh drinking water directly to remote hilltop settlements without electric motors or fossil fuel pumps, supplemented by 530 ceramic pot filters for microbiological safety.",
        bullets: [
          "Zero operational carbon emissions through natural gravitational head pressure",
          "270 households equipped with continuous, dependable drinking water connections",
          "530 ceramic pot filters fabricated and deployed to eliminate waterborne pathogens",
        ],
        image: gallery25,
        imageAlt: "Gravity water flow scheme installation",
        imageCaption: "Gravity-fed water supply scheme serving hilltop settlements · Field documentation",
      },
      {
        tag: "Restorative Mariculture",
        title: "Open-Sea Seaweed & Green Mussel Raft Farming",
        body: "Pioneering integrated multi-trophic aquaculture (IMTA) along the Visakhapatnam coastline with ICAR-CMFRI, cultivating Kappaphycus alvarezii seaweed alongside green mussels to provide climate-resilient alternative incomes.",
        bullets: [
          "Sea trials tested bamboo rafts, HDPE frames, tubelines, and submersed cages at RK Beach & Mangamaripeta",
          "50 artisanal fishers and 25 university students trained in vegetative propagation and harvesting",
          "Published comprehensive bilingual training manual on integrated sea cage and seaweed farming",
        ],
        image: illustrationAssets.coastalSeaweed.src,
        imageAlt: "Coastal seaweed and mussel mariculture rafts",
        imageCaption: "Restorative open-sea seaweed and mussel aquaculture pilot · Andhra Pradesh coast",
        imageDisclosure: "Illustrative plate",
      },
      {
        tag: "Thermal Adaptation",
        title: "Cool Roofing Coatings in Heat-Stressed Settlements",
        body: "Coating 15 tribal residences with high-albedo solar reflective cool roof paint, generating documented 8–10°C reductions in roof surface temperatures and shielding families from extreme heat waves.",
        bullets: [
          "8–10°C reduction in roof surface temperatures measured through infrared thermometers",
          "Substantially improved indoor livability and night-time heat relief during hot seasons",
          "Evaluating scaling potential across agency valley settlements prone to severe insolation",
        ],
        image: imgWa122915,
        imageAlt: "Cool roofing and village community adaptation",
        imageCaption: "Community adaptation and thermal resilience initiatives · Field documentation",
      },
    ],

    storiesHeading: "Voices from the Field",
    storiesIntro:
      "Direct reflections from village leaders and women whose daily labor, health, and dignity are supported by clean technologies.",
    stories: [
      {
        tag: "Clean Water Security",
        title: "Relief from Waterborne Illness & Daily Drudgery",
        desc: "How a perennial spring gravity water system and ceramic pot filter brought clean, dependable water to an Adivasi hamlet in Polavaram.",
        to: ROUTES.stories,
        image: gallery25,
        imageAlt: "Clean drinking water access in rural hamlet",
        linkText: "Read Community Story",
      },
      {
        tag: "Clean Cooking",
        title: "Smoke-Free Kitchens & Forest Protection",
        desc: "Women in Paderu share how improved fuel-efficient cookstoves cut firewood gathering time in half and protected mountain forests.",
        to: ROUTES.stories,
        image: gallery22,
        imageAlt: "Woman cooking on energy efficient stove",
        linkText: "Read Energy Story",
      },
    ],

    publicationsHeading: "Technical Manuals & Policy Briefs",
    publicationsIntro:
      "Scientific publications, field training manuals, and policy briefs produced by LAYA's clean energy and marine teams.",
    publications: [
      {
        title: "Integrated Mussel Farming with Sea Cage and Seaweed",
        date: "2024",
        type: "Training Manual",
        desc: "Comprehensive bilingual technical training manual on integrated mariculture published in collaboration with ICAR-CMFRI.",
        pdfUrl: "https://laya.org.in/PublicFiles/Training-Manual-Mussel-Seaweed.pdf",
        coverImage: layaPublicationImages[0],
      },
      {
        title: "Policy Brief on Coastal Ecosystem",
        date: "2023",
        type: "Policy Brief",
        desc: "Urgent policy recommendations for small-scale fisher rights, coastal wetland preservation, and marine ecosystem protection.",
        pdfUrl: "https://laya.org.in/PublicFiles/Policy-Brief-Coastal-Ecosystem.pdf",
        coverImage: layaPublicationImages[1],
      },
    ],

    cta: {
      eyebrow: "Partner With Us",
      title: "Scale Grassroots Clean Tech & Coastal Resilience",
      desc: "LAYA welcomes partnerships with renewable energy developers, carbon standards, marine scientists, and philanthropic foundations to expand clean cooking, gravity water, and coastal mariculture.",
      primaryBtn: { label: "Contact Our Climate Team", to: ROUTES.contact },
      secondaryBtn: { label: "Support LAYA's Work", to: ROUTES.donate },
    },

    sections: [
      {
        heading: "Technological & Marine Innovation",
        paragraph:
          "From fuel-efficient cookstoves across 22,714+ households to open-sea mariculture pilots along the Bay of Bengal, LAYA demonstrates that climate-friendly technologies succeed best when community-owned and ecologically attuned.",
        image: gallery22,
        imageAlt: "Clean cookstove installation",
        imageCaption: "Decentralized energy and clean technology deployment · LAYA field documentation",
      },
    ],
    outcomes: [
      "Over 22,714 fuel-efficient cookstoves monitored under verified carbon standards.",
      "Gravity drinking water systems serving 270 households with zero carbon emissions.",
      "530 ceramic pot filters deployed for microbiological drinking water safety.",
      "Coastal open-sea seaweed and mussel raft aquaculture piloted with ICAR-CMFRI.",
    ],
  },

  /* -----------------------------------------------------------------------
     7. URBAN AND PERI-URBAN ECOSYSTEMS (DIVISION 04)
     ----------------------------------------------------------------------- */
  {
    id: 7,
    to: ROUTES.whatWeDoUrbanPeriUrban,
    title: "Urban and Peri-Urban Ecosystems",
    shortTitle: "Urban & Peri-Urban",
    summary:
      "Formulating Citizen-Centric Climate Action Plans for the City of Visakhapatnam and the peri-urban town of Yeleswaram through student volunteer surveys, satellite remote sensing of heat islands and drainage vulnerabilities, community FGDs, and summer camps bridging urban youth with Adivasi communities.",
    issue:
      "Rapid unregulated urban expansion, urban heat island intensity, critical drainage bottlenecks causing chronic water stagnation and fevers (dengue, malaria, typhoid), and the detachment of urban youth from ecological realities.",
    context:
      "Metropolitan Visakhapatnam and peri-urban Yeleswaram in active academic partnership with Andhra University, ANITS, and regional degree colleges.",
    category: "climate",
    image: youth,
    imageAlt: "Urban and peri-urban youth climate perspective and survey initiative",
    imageCaption:
      "Student volunteers and community members collaborating on climate vulnerability mapping · Visakhapatnam and Yeleswaram",
    metric: { label: "Action Plans", value: "2 Cities" },

    heroEyebrow: "Our Work · Climate Crisis & Sustainable Development · Division 04",
    heroHeading: "Urban & Peri-Urban Ecosystems",
    heroLead:
      "Bridging scientific remote sensing with citizen-led action. LAYA partners with universities, youth volunteers, and local municipal stakeholders to map climate vulnerabilities, drainage bottlenecks, and heat stress in Visakhapatnam and Yeleswaram.",

    overviewHeading: "Urban Climate Action in Numbers & Scope",
    overviewIntro:
      "Verified records from citizen-centric climate action planning, university partnerships, spatial GIS vulnerability overlays, and youth immersion programmes.",
    stats: [
      {
        value: "2 Cities",
        label: "Climate Action Plans",
        desc: "City of Visakhapatnam and peri-urban town of Yeleswaram",
      },
      {
        value: "4 Colleges",
        label: "Academic Partners",
        desc: "Andhra University, ANITS, Yeleswaram Govt College & SSB Degree College",
      },
      {
        value: "100s",
        label: "Student Volunteers",
        desc: "Trained in field data collection, drainage audits & citizen surveying",
      },
      {
        value: "Thermal GIS",
        label: "Remote Sensing",
        desc: "Satellite data used to identify heat islands and water stagnation clusters",
      },
      {
        value: "FGDs",
        label: "Stakeholder Dialogues",
        desc: "Focus group discussions with self-help groups, sanitation workers & officials",
      },
      {
        value: "Summer Camp",
        label: "Youth Immersion",
        desc: "High-school camp bridging urban youth with Adivasi community conservation",
      },
    ],

    annualReport2026: {
      reportingYear: "2025–2026",
      themeTitle: "Urban and Peri-Urban Ecosystems",
      keyInitiatives: [
        "Building Climate Perspective Amongst Youth and Women",
        "Academic Partnerships: Andhra University, Anil Neerukonda Institute of Technology and Sciences (ANITS), Yeleswaram Government Degree College, SSB Degree College & MUN delegates",
        "Preparation of Citizen-Centric Climate Action Plan for the City of Visakhapatnam and peri-urban town of Yeleswaram",
        "Student Volunteers Field Data Collection for city climate and drainage vulnerability mapping",
        "Remote Sensing Thermal & Spatial Data to identify urban heat islands and water stagnation clusters",
        "Focus Group Discussions (FGDs) with local self-help, youth groups, government officials & municipal stakeholders",
        "Organised a Summer Camp for high-schoolers to bridge urban and Adivasi worlds",
      ],
      fieldQuote: {
        quote:
          "I visited some houses. What we observed in this survey is that due to the lack of proper drainage, stagnant water accumulates. We understand that people are suffering from typhoid, dengue, and malaria fevers, the survey was collected from different age groups. This survey has taught us how to interact with people. We know what problems there are in Yeleswaram.",
        author: "Ms. Supriya Pendyala, Student Volunteer",
        location: "Visakhapatnam & Yeleswaram",
      },
      metrics: [
        {
          value: "2 Cities",
          label: "Citizen climate action plans",
          sublabel: "City of Visakhapatnam and peri-urban town of Yeleswaram",
        },
        {
          value: "4 Colleges",
          label: "Academic institution partners",
          sublabel: "Andhra University, ANITS, Yeleswaram Govt College & SSB Degree College",
        },
        {
          value: "FGDs",
          label: "Focus group discussions",
          sublabel: "Conducted with self-help groups, youth, sanitation workers & officials",
        },
        {
          value: "Summer Camp",
          label: "Bridging urban & Adivasi youth",
          sublabel: "Experiential immersion program connecting high-schoolers with tribal conservation",
        },
      ],
    },

    approachHeading: "A Citizen-Centric Urban Resilience Framework",
    approachIntro:
      "Combining empirical student surveys, satellite thermal imaging, municipal dialogue, and experiential youth immersion.",
    pillars: [
      {
        num: "01",
        title: "Citizen-Centric Climate Action Plans",
        desc: "Co-creating localized climate adaptation blueprints for municipal corporations based on grassroots household surveys and drainage vulnerability audits.",
      },
      {
        num: "02",
        title: "Academic & University Collaborations",
        desc: "Partnering with Andhra University, ANITS, and degree colleges to mobilize youth researchers and embed climate vulnerability assessments into academic curricula.",
      },
      {
        num: "03",
        title: "Remote Sensing & Satellite Thermal Overlays",
        desc: "Utilizing GIS spatial and thermal satellite data to detect localized urban heat islands, impermeable surfaces, and recurring stormwater inundation clusters.",
      },
      {
        num: "04",
        title: "Urban–Tribal Youth Summer Camps",
        desc: "Organizing experiential immersion camps for urban high-schoolers in Adivasi forest settlements, nurturing ecological empathy and cross-cultural solidarity.",
      },
    ],
    approachVisual: {
      image: youth,
      alt: "Youth climate perspective workshop and field dialogue",
      caption: "Youth leadership and climate perspective formation · LAYA urban and agency initiatives",
    },

    actionsHeading: "Urban & Peri-Urban Interventions in Action",
    actionsIntro:
      "Collaborative field surveying, municipal stakeholder consultations, and youth experiential learning.",
    actionRows: [
      {
        tag: "Municipal Climate Planning",
        title: "Citizen Climate Action Plans for Visakhapatnam & Yeleswaram",
        body: "Formulating comprehensive adaptation roadmaps for the coastal metropolis of Visakhapatnam and the agricultural peri-urban hub of Yeleswaram, prioritizing informal settlements, low-income wards, and drainage bottlenecks.",
        bullets: [
          "Field surveys conducted across multiple municipal wards capturing household vulnerabilities",
          "Documented health impacts of drainage stagnation including dengue, malaria, and typhoid",
          "Presented empirical findings to municipal authorities, ward councillors, and sanitation departments",
        ],
        image: youth,
        imageAlt: "Student survey volunteers engaging with community members",
        imageCaption: "Student volunteers conducting citizen climate interviews · Visakhapatnam & Yeleswaram",
      },
      {
        tag: "Spatial Analysis",
        title: "Satellite Remote Sensing of Urban Heat & Drainage",
        body: "Integrating satellite thermal imagery with GIS elevation and drainage modeling to identify severe micro-climate heat islands and stormwater overflow corridors across urban settlements.",
        bullets: [
          "Thermal GIS mapping identifying critical heat stress zones in dense residential clusters",
          "Spatial overlays correlating unlined open drains with disease outbreak records",
          "Actionable recommendations for permeable pavements, urban tree cover, and drainage desilting",
        ],
        image: imgWa122914,
        imageAlt: "Field survey and spatial verification visit",
        imageCaption: "Urban ward drainage and vulnerability assessment visit · Field documentation",
      },
      {
        tag: "Stakeholder Dialogue",
        title: "Focus Group Discussions with Self-Help Groups & Workers",
        body: "Convening multi-stakeholder consultations with women's self-help groups (SHGs), youth associations, sanitation workers, and municipal engineers to validate survey data and formulate consensus action points.",
        bullets: [
          "Special focus on women's domestic burdens exacerbated by water scarcity and heat waves",
          "Sanitation workers' occupational safety and extreme heat exposure documented",
          "Collaborative dialogue between citizen delegates and local government officials",
        ],
        image: imgWa123018,
        imageAlt: "Community focus group consultation",
        imageCaption: "Stakeholder consultation with local community representatives · Field documentation",
      },
      {
        tag: "Experiential Education",
        title: "Urban–Adivasi Youth Summer Immersion Camps",
        body: "Organizing structured summer camps that take urban high-school students out of concrete cities into Adivasi mountain settlements to learn directly from tribal elders about biodiversity conservation and sustainable living.",
        bullets: [
          "Hands-on immersion in organic farming, herbal healthcare, and forest stewardship",
          "Dialogue on consumerism, waste footprints, and indigenous ecological worldviews",
          "Empowering young urban citizens as lifelong advocates for environmental justice",
        ],
        image: imgImg6830,
        imageAlt: "Youth summer immersion camp gathering",
        imageCaption: "Youth experiential summer camp bridging urban and tribal realities · Field documentation",
      },
    ],

    storiesHeading: "Voices of Youth & Researchers",
    storiesIntro:
      "Reflections from university student volunteers and citizen participants engaged in urban climate research.",
    stories: [
      {
        tag: "Student Researcher",
        title: "Surveying Yeleswaram: Learning Through Direct Dialogue",
        desc: "Ms. Supriya Pendyala reflects on uncovering drainage bottlenecks, waterborne illness patterns, and the power of listening to citizens.",
        to: ROUTES.stories,
        image: youth,
        imageAlt: "Student volunteer interviewing community members",
        linkText: "Read Student Reflection",
      },
      {
        tag: "Youth Leadership",
        title: "Bridging Two Worlds at the Adivasi Summer Camp",
        desc: "High-schoolers from Visakhapatnam reflect on their transformative journey into the Eastern Ghats and indigenous ecological stewardship.",
        to: ROUTES.stories,
        image: imgImg6830,
        imageAlt: "High-school students learning from Adivasi elders",
        linkText: "Read Summer Camp Story",
      },
    ],

    publicationsHeading: "Urban Resilience Publications",
    publicationsIntro:
      "Policy briefs and research papers published by LAYA on urban youth climate perspectives and citizen adaptation.",
    publications: [
      {
        title: "Building Climate Perspective Among Youth and Women",
        date: "2024",
        type: "Action Research",
        desc: "Framework paper on mobilizing student volunteers, collegiate networks, and women's collectives for urban climate action.",
        pdfUrl: "https://laya.org.in/PublicFiles/Policy-Brief-Coastal-Ecosystem.pdf",
        coverImage: layaPublicationImages[2],
      },
      {
        title: "Four Decades of Action & Reflection: The LAYA Chronicle",
        date: "2024",
        type: "Monograph",
        desc: "Comprehensive retrospective detailing LAYA's evolution from rural tribal accompaniment to integrated urban and coastal climate resilience.",
        pdfUrl: "https://laya.org.in/PublicFiles/LAYA-Chronicle-Four-Decades.pdf",
        coverImage: layaPublicationImages[0],
      },
    ],

    cta: {
      eyebrow: "Get Involved",
      title: "Partner on Urban Climate Resilience",
      desc: "LAYA welcomes collaborations with urban local bodies, academic institutions, engineering colleges, and student volunteer networks to expand citizen-centric climate action planning.",
      primaryBtn: { label: "Contact Our Urban Team", to: ROUTES.contact },
      secondaryBtn: { label: "Support LAYA's Work", to: ROUTES.donate },
    },

    sections: [
      {
        heading: "Urban Vulnerability & Youth Leadership",
        paragraph:
          "Cities and peri-urban hubs face compound climate risks from heat islands and clogged drainage. By uniting university researchers, remote sensing data, and youth volunteerism, LAYA develops actionable blueprints for resilient urban living.",
        image: youth,
        imageAlt: "Youth climate perspective workshop",
        imageCaption: "Urban climate resilience and youth volunteer initiatives · LAYA field documentation",
      },
    ],
    outcomes: [
      "Citizen-Centric Climate Action Plans for Visakhapatnam and Yeleswaram.",
      "Academic research partnerships with Andhra University, ANITS, and degree colleges.",
      "Satellite thermal remote sensing mapping heat islands and drainage vulnerabilities.",
      "Experiential summer camps bridging urban youth with Adivasi ecological knowledge.",
    ],
  },

  /* -----------------------------------------------------------------------
     8. PARTNER ENGAGEMENTS (DIVISION 05)
     ----------------------------------------------------------------------- */
  {
    id: 8,
    to: ROUTES.whatWeDoPartnerEngagements,
    title: "Partner Engagements",
    shortTitle: "Partner Engagements",
    summary:
      "Strengthening regional climate adaptation and urban resilience architecture through the RECAP coalition in Northeast India, serving as Project Fund Administrator for the national Urban Transformation Platform (UTP), and crowdsourcing safe drinking water filters via India DONATES.",
    issue:
      "Fragmented civil society responses to compounding climate emergencies, institutional barriers to scaling grassroots resilience pathways, and lack of safe drinking water access in marginalized communities.",
    context:
      "Multi-state coalitions spanning Andhra Pradesh, Northeast India (Manipur), and national urban networks.",
    category: "climate",
    image: imgCommunityHealth,
    imageAlt: "Partner consultations and regional climate leadership network",
    imageCaption:
      "Regional climate adaptation convening and institutional collaboration · LAYA and partner networks",
    metric: { label: "Regional Leaders", value: "18 Manipur" },

    heroEyebrow: "Our Work · Climate Crisis & Sustainable Development · Division 05",
    heroHeading: "Partner Engagements & Regional Coalitions",
    heroLead:
      "Amplifying grassroots impact through strategic regional partnerships. LAYA coordinates climate resilience with RECAP in Northeast India, administers funds for the national Urban Transformation Platform (UTP), and delivers clean drinking water filters through India DONATES.",

    overviewHeading: "Partnership Scope & Coalition Reach",
    overviewIntro:
      "Verified records from regional climate adaptation coalitions, national urban transformation consortia, and grassroots crowdsourced clean water campaigns.",
    stats: [
      {
        value: "18 Leaders",
        label: "RECAP Manipur",
        desc: "Climate practitioners from 6 Northeast states trained in participatory resilience",
      },
      {
        value: "UTP Admin",
        label: "National Platform",
        desc: "Serving as Project Fund Administrator for Urban Transformation Platform",
      },
      {
        value: "India DONATES",
        label: "Water Campaign",
        desc: "Crowdsourcing safe ceramic pot drinking water filters for tribal households",
      },
      {
        value: "Multi-State",
        label: "Coalition Reach",
        desc: "Active policy engagement across Andhra Pradesh, Manipur & national networks",
      },
      {
        value: "Theory of Change",
        label: "Strategic Pathways",
        desc: "Shifting partner initiatives from activity tasks to systemic resilience pathways",
      },
      {
        value: "40 Years",
        label: "Institutional Trust",
        desc: "Four decades of ethical stewardship, governance rigor, and solidarity",
      },
    ],

    annualReport2026: {
      reportingYear: "2025–2026",
      themeTitle: "Partner Engagements",
      keyInitiatives: [
        "Regional Enhancement for Climate Adaptation and Partnership (RECAP): inaugural engagement in Manipur for 18 leaders and practitioners across Northeast India",
        "Participatory Risk Assessments for Climate and Disaster Resilience, shifting from activity-based tasks to strategic Theory of Change pathways",
        "Urban Transformation Platform (UTP): Project Fund Administrator, contributing to monthly online partner convenings",
        "Fundraising Support from India DONATES: crowdsourced funds for ceramic pot drinking water filters",
        "Advocating for community-led climate adaptation, resilient urban infrastructure, and grassroots carbon justice",
      ],
      fieldQuote: {
        quote:
          "India's urban population expected to almost double by 2050 to 951 million, more than 144 million new homes will be needed by 2070. India has a critical opportunity to drive resilient urban development.",
        author: "2025 World Bank Report",
        location: "Partner Engagements / Urban Transformation",
      },
      metrics: [
        {
          value: "18 Leaders",
          label: "RECAP Northeast India delegates",
          sublabel: "Climate practitioners from 6 Northeast states trained in Manipur",
        },
        {
          value: "UTP Admin",
          label: "Project Fund Administrator",
          sublabel: "Administering fund for national Urban Transformation Platform",
        },
        {
          value: "India DONATES",
          label: "Safe water crowdsourcing",
          sublabel: "Mobilized resources for ceramic pot water filters in vulnerable hamlets",
        },
        {
          value: "Multi-State",
          label: "Coalition reach",
          sublabel: "Active policy engagement across Andhra Pradesh, Manipur & national networks",
        },
      ],
    },

    approachHeading: "A Strategic Coalition & Fiduciary Architecture",
    approachIntro:
      "Fostering cross-regional solidarity, programmatic alignment, and transparent fund stewardship to scale climate solutions.",
    pillars: [
      {
        num: "01",
        title: "Regional Climate Resilience (RECAP)",
        desc: "Convening 18 civil society leaders across Northeast India in Manipur to implement participatory climate vulnerability assessments and strategic Theory of Change frameworks.",
      },
      {
        num: "02",
        title: "Urban Transformation Platform (UTP)",
        desc: "Serving as trusted Project Fund Administrator for the national Urban Transformation Platform, stewarding donor funds and coordinating monthly collaborative convenings.",
      },
      {
        num: "03",
        title: "Grassroots Crowdsourcing (India DONATES)",
        desc: "Leveraging transparent public giving campaigns to supply ceramic pot drinking water filters to marginalized Adivasi households lacking potable water.",
      },
      {
        num: "04",
        title: "Cross-Regional Knowledge Exchange",
        desc: "Connecting grassroots lessons from the Eastern Ghats with climate challenges in the Himalayas and coastal zones through policy briefs and joint convenings.",
      },
    ],
    approachVisual: {
      image: imgCommunityHealth,
      alt: "Partner convening and institutional consultation",
      caption: "Convening partner organisations and institutional stakeholders · LAYA and partner networks",
    },

    actionsHeading: "Collaborative Initiatives & Network Actions",
    actionsIntro:
      "Documentation of multi-state partnerships, fiduciary administration, and community fundraising.",
    actionRows: [
      {
        tag: "Northeast India Resilience",
        title: "RECAP Manipur Climate Adaptation Leadership",
        body: "Convening the inaugural cohort of 18 civil society practitioners from six Northeast Indian states in Manipur for intensive workshops on participatory risk assessment and community disaster preparedness.",
        bullets: [
          "18 leaders trained on shifting from reactive tasks to strategic Theory of Change models",
          "Developing customized climate adaptation toolkits for hilly and conflict-vulnerable contexts",
          "Building an enduring interstate network for peer learning and mutual emergency aid",
        ],
        image: imgTrainingEntitlements,
        imageAlt: "RECAP workshop training session in progress",
        imageCaption: "Regional climate adaptation leadership convening · Manipur initiative",
      },
      {
        tag: "National Platform Governance",
        title: "Urban Transformation Platform (UTP) Administration",
        body: "Acting as Project Fund Administrator for the national Urban Transformation Platform, managing financial accountability, compliance, and monthly online strategy convenings.",
        bullets: [
          "Fiduciary oversight ensuring compliance with statutory and donor standards",
          "Monthly virtual convenings coordinating urban resilience strategies across cities",
          "Bridging civil society practitioners with urban municipal planning bodies",
        ],
        image: imgWa122928,
        imageAlt: "Partner consultation and platform coordination",
        imageCaption: "Urban Transformation Platform partner coordination · Institutional documentation",
      },
      {
        tag: "Crowdsourced Giving",
        title: "Safe Drinking Water via India DONATES",
        body: "Partnering with India DONATES to mobilize individual citizen contributions, directly financing the manufacture and distribution of ceramic pot water filters in vulnerable tribal hamlets.",
        bullets: [
          "Direct citizen funding channeled to grassroots water filter fabrication",
          "Transparent outcome reporting back to individual micro-donors",
          "Eliminating microbial contamination in off-grid rural households",
        ],
        image: gallery25,
        imageAlt: "Water filter delivery and community demonstration",
        imageCaption: "Safe drinking water filter distribution and community orientation · Field documentation",
      },
    ],

    storiesHeading: "Voices from the Coalition",
    storiesIntro:
      "Perspectives from regional partners and network leaders collaborating with LAYA.",
    stories: [
      {
        tag: "Regional Leadership",
        title: "The Manipur Conclave: Building Resilience in Changing Climates",
        desc: "Practitioners across Northeast India share the impact of the RECAP training in developing proactive climate adaptation pathways.",
        to: ROUTES.stories,
        image: imgTrainingEntitlements,
        imageAlt: "RECAP Manipur workshop participants",
        linkText: "Read Partner Story",
      },
      {
        tag: "Urban Alliance",
        title: "A Shared Blueprint for India's Growing Towns",
        desc: "How the Urban Transformation Platform is shaping resilient, inclusive infrastructure for small towns and peri-urban hubs.",
        to: ROUTES.stories,
        image: imgWa122928,
        imageAlt: "Urban transformation convening",
        linkText: "Read Platform Overview",
      },
    ],

    publicationsHeading: "Network Publications & Retrospectives",
    publicationsIntro:
      "Retrospectives and publications highlighting four decades of collaborative civil society partnerships.",
    publications: [
      {
        title: "Four Decades of Action & Reflection: The LAYA Chronicle",
        date: "2024",
        type: "Monograph",
        desc: "Four decades of building alliances, nurturing community leadership, and advancing social and ecological justice across India.",
        pdfUrl: "https://laya.org.in/PublicFiles/LAYA-Chronicle-Four-Decades.pdf",
        coverImage: layaPublicationImages[0],
      },
      {
        title: "Policy Brief on Coastal Ecosystem",
        date: "2023",
        type: "Policy Brief",
        desc: "Collaborative policy paper advocating for small-scale fisher rights and decentralized marine governance.",
        pdfUrl: "https://laya.org.in/PublicFiles/Policy-Brief-Coastal-Ecosystem.pdf",
        coverImage: layaPublicationImages[1],
      },
    ],

    cta: {
      eyebrow: "Join Our Network",
      title: "Partner with LAYA on Climate & Social Justice",
      desc: "LAYA welcomes partnerships with civil society networks, academic institutions, and funding partners to scale community-owned climate adaptation and just transitions.",
      primaryBtn: { label: "Contact Our Partnerships Team", to: ROUTES.contact },
      secondaryBtn: { label: "Support LAYA's Work", to: ROUTES.donate },
    },

    sections: [
      {
        heading: "Partnership for Climate Justice",
        paragraph:
          "No single organisation can solve the compounding climate emergency alone. LAYA's partner engagements foster regional solidarity, mutual learning, and ethical fund administration across India.",
        image: imgCommunityHealth,
        imageAlt: "Partner network consultation",
        imageCaption: "Strategic partner collaboration and regional solidarity · LAYA field documentation",
      },
    ],
    outcomes: [
      "18 climate practitioners across 6 Northeast states trained in participatory adaptation.",
      "Project Fund Administrator for the national Urban Transformation Platform (UTP).",
      "Crowdsourced safe ceramic pot water filters through India DONATES.",
      "Multi-state policy engagement spanning Andhra Pradesh, Manipur, and national networks.",
    ],
  },
];

/* -------------------------------------------------------------------------
   LOOKUPS + DERIVED VALUES
   ------------------------------------------------------------------------- */

export const getProgrammeByRoute = (pathname: string): Programme | undefined =>
  PROGRAMMES.find((p) => p.to === pathname);

/** Related programmes — everything except the current one. */
export const getRelatedProgrammes = (
  current: Programme,
  take = 2,
): Programme[] =>
  PROGRAMMES.filter((p) => p.id !== current.id)
    .sort((a, b) => {
      // Same category first, then the rest in declaration order.
      const aSame = a.category === current.category ? 0 : 1;
      const bSame = b.category === current.category ? 0 : 1;
      return aSame - bSame;
    })
    .slice(0, take);

/**
 * Directory stats, computed from the real programme array.
 */
export const DIRECTORY_STATS = {
  pillarCount: 3,
  programmeCount: PROGRAMMES.length,
  categoryCount: 3,
  districts: 4,
} as const;

/** Programme routes rendered as standalone pages by src/App.tsx. */
export const PROGRAMME_ROUTES: Record<number, string> = {
  1: ROUTES.whatWeDoRla,
  2: ROUTES.whatWeDoHbhc,
  3: ROUTES.whatWeDoSrm,
  4: ROUTES.whatWeDoLifelongLearning,
  5: ROUTES.whatWeDoClimate,
  6: ROUTES.whatWeDoClimateTechCoastal,
  7: ROUTES.whatWeDoUrbanPeriUrban,
  8: ROUTES.whatWeDoPartnerEngagements,
};
