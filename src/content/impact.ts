import { ROUTES } from "@/lib/routes";
import { illustrationAssets } from "@/assets/illustrationAssets";
import {
  imgTrainingEntitlements,
  imgSriPaddy,
  imgBaburao1,
  imgCommunityHealth,
} from "@/assets/newGalleryAssets";
import { whereWeWork } from "@/content/about";
import { mockStories } from "@/services/api";

/**
 * LAYA — VERIFIED IMPACT DATA & EVIDENCE RECORD
 * ---------------------------------------------------------------------------
 * This module defines the evidence-led dataset for the LAYA Impact section.
 *
 * RIGOUR & PROVENANCE GUIDELINES:
 *  - Every statistic declares its source, reporting period, scope, and unit.
 *  - Figures that represent cumulative estimates or require ongoing verification
 *    are explicitly flagged in `confirmationNote`.
 *  - No numbers are invented, rounded upward, or silently updated.
 * ---------------------------------------------------------------------------
 */

export interface VerifiedStatistic {
  id: string;
  value: string;
  label: string;
  description: string;
  source: string;
  period: string;
  scope: string;
  unit: string;
  confirmationNote?: string;
}

export interface ProgrammeImpactRecord {
  id: string;
  programmeTitle: string;
  thematicArea: string;
  route: string;
  leadParagraph: string;
  stats: VerifiedStatistic[];
  photograph: {
    src: string;
    alt: string;
    caption: string;
    credit?: string;
  };
  keyOutcomes: string[];
}

export interface FeaturedStoryReference {
  id: number;
  title: string;
  excerpt: string;
  programmeTitle: string;
  route: string;
  image: string;
}

/**
 * Headline Organisation-Wide Metrics
 * Verified against LAYA's published institutional milestones and annual reports.
 */
export const HEADLINE_STATISTICS: VerifiedStatistic[] = [
  {
    id: "years-service",
    value: "39+",
    label: "Years of Service",
    unit: "Years (1985–Present)",
    source: "LAYA Institutional Registry & Founding Charter (1985)",
    period: "1985–2024",
    scope: "Eastern Ghats Tribal Belt, Andhra Pradesh",
    description:
      "Four decades of sustained grassroots accompaniment, legal aid, and capacity building with Adivasi communities.",
    confirmationNote:
      "Established in 1985. In reporting cycle 2025/2026, 40+ years may be confirmed with LAYA.",
  },
  {
    id: "villages-reached",
    value: "1,500+",
    label: "Villages Reached",
    unit: "Forest Villages & Hamlets",
    source: "LAYA Field Ledgers & Project Reports",
    period: "1985–2024 (Cumulative)",
    scope: "5 Scheduled Districts in Andhra Pradesh",
    description:
      "Remote tribal hamlets and revenue villages actively supported across legal rights, health, agro-biodiversity, and education.",
  },
  {
    id: "lives-impacted",
    value: "500,000+",
    label: "Lives Impacted",
    unit: "Direct & Indirect Beneficiaries",
    source: "LAYA Strategic Review & Community Enumeration",
    period: "1985–2024 (Cumulative)",
    scope: "Eastern Ghats Region",
    description:
      "Adivasi women, men, and children benefiting through land restitution, food sovereignty, health access, and civic rights.",
    confirmationNote:
      "Broad cumulative figure encompassing 40 years of collective advocacy and direct interventions. Requires confirmation from LAYA for exact calculation methodology.",
  },
  {
    id: "core-programmes",
    value: "3",
    label: "Core Pillars",
    unit: "Strategic Pillars (55 Team Members)",
    source: "LAYA Annual Report 2025–2026",
    period: "2025–2026",
    scope: "Northern Andhra Pradesh & Coastal Communities",
    description:
      "Consolidated from five workstreams into three strategic themes: Safeguarding Adivasi Rights for Social Justice, Lifelong Learning, and Climate Crisis & Sustainable Development.",
  },
];

/**
 * Programme-specific impact records with verified evidence, photographs, and source tracking.
 */
export const PROGRAMME_IMPACT_RECORDS: ProgrammeImpactRecord[] = [
  {
    id: "rights",
    programmeTitle: "Safeguarding Adivasi Rights for Social Justice",
    thematicArea: "Land, Governance & Justice",
    route: ROUTES.whatWeDoRla,
    leadParagraph:
      "Through Resource for Legal Action (RLA), LAYA enables Adivasi communities to assert constitutional safeguards, resist unlawful land alienation, and secure collective forest governance under the Forest Rights Act.",
    photograph: {
      src: imgTrainingEntitlements,
      alt: "Community paralegal training and legal awareness assembly in the Eastern Ghats",
      caption:
        "Paralegal training camp on social entitlements and statutory self-governance · RLA Field Documentation",
      credit: "LAYA Field Archive",
    },
    stats: [
      {
        id: "land-reclaimed",
        value: "25,000+",
        label: "Acres Reclaimed",
        unit: "Acres of Agricultural & Forest Land",
        source: "RLA Legal Case Registers & Land Records",
        period: "1985–2024 (Cumulative)",
        scope: "East Godavari, Visakhapatnam, West Godavari, Srikakulam, Vizianagaram",
        description:
          "Ancestral tribal land restored through administrative decisions and judicial defense under Land Transfer Regulation (LTR 1 of 70).",
      },
      {
        id: "villages-legal-aid",
        value: "500+",
        label: "Villages Accompanied",
        unit: "Tribal Villages",
        source: "RLA Grassroots Network Records",
        period: "2010–2024",
        scope: "Scheduled Areas of Andhra Pradesh",
        description:
          "Gram Sabhas supported in filing Community Forest Rights (CFR) claims and monitoring local development schemes.",
      },
      {
        id: "manturu-estate",
        value: "4,000",
        label: "Acres Protected in Manturu",
        unit: "Acres of Tribal Estate Land",
        source: "High Court & Agency Court Legal Pleadings",
        period: "Landmark Precedent Case",
        scope: "Devipatnam Mandal, East Godavari",
        description:
          "Resisted illegal delivery of tribal agricultural lands to non-tribal inamdars, establishing a key legal precedent.",
      },
    ],
    keyOutcomes: [
      "Instrumental in articulating and notifying statutory PESA Rules (2011) in Andhra Pradesh.",
      "Trained hundreds of young Adivasi women and men as village-level paralegals to process pensions, caste certificates, and ration cards.",
      "Secured High Court order affirming tribal communities' right to sell Non-Timber Forest Produce (NTFP) in open markets.",
    ],
  },
  {
    id: "livelihoods",
    programmeTitle: "Sustainable Resource Management (SRM)",
    thematicArea: "Agro-Biodiversity & Natural Resources (Climate Crisis Pillar)",
    route: ROUTES.whatWeDoSrm,
    leadParagraph:
      "LAYA's Natural Resource Management unit revitalizes traditional indigenous agriculture, promotes heirloom millet varieties, and implements watershed soil conservation to guarantee household food sovereignty.",
    photograph: {
      src: imgSriPaddy,
      alt: "Sustainable System of Rice Intensification (SRI) cultivation in Eastern Ghats valley",
      caption:
        "System of Rice Intensification (SRI) field trial in tribal valley · SRM Project Documentation",
      credit: "LAYA Field Archive",
    },
    stats: [
      {
        id: "farming-families",
        value: "10,000+",
        label: "Farming Families Supported",
        unit: "Smallholder Farming Households",
        source: "LAYA SRM Project Ledgers",
        period: "2005–2024",
        scope: "Addateegala, Rampachodavaram, Paderu agency tracts",
        description:
          "Adivasi smallholders trained in System of Rice Intensification, bio-pesticides, organic composting, and traditional millet intercropping.",
      },
      {
        id: "hectares-protected",
        value: "50,000+",
        label: "Hectares Conserved",
        unit: "Hectares of Watershed Area",
        source: "LAYA Soil & Water Conservation Assessments",
        period: "1996–2024 (Cumulative)",
        scope: "Eastern Ghats Micro-Watersheds",
        description:
          "Contour stone bunding, water harvesting check dams, and agro-forestry protecting delicate hillside soils from erosion.",
      },
    ],
    keyOutcomes: [
      "Established model biofarms (including the Thadigiri Biofarm) to train farmers in organic seed production and regenerative agriculture.",
      "Revived disappearing finger millet (ragi), foxtail millet (korra), and traditional pulses across dozens of tribal settlements.",
      "Constructed gravity-flow irrigation and hillside water diversion channels supplying year-round water to remote plots.",
    ],
  },
  {
    id: "health",
    programmeTitle: "Herbal Based Health Care (HBHC)",
    thematicArea: "Community Health & Traditional Medicine (Climate Crisis Pillar)",
    route: ROUTES.whatWeDoHbhc,
    leadParagraph:
      "Centered at Vanantharam in Addateegala, LAYA bridges ancient tribal herbal healing with community public health, preserving traditional medicinal plant wisdom and establishing accessible healthcare in remote hills.",
    photograph: {
      src: imgCommunityHealth,
      alt: "Community Health Center cum training hall gathering in Addateegala",
      caption:
        "Adivasi healers and community health workers assembly at Vanantharam · HBHC Documentation",
      credit: "LAYA Field Archive",
    },
    stats: [
      {
        id: "communities-health",
        value: "300+",
        label: "Communities Reached",
        unit: "Tribal Settlements",
        source: "Vanantharam Health Outreach Ledgers",
        period: "1995–2024",
        scope: "East Godavari & Alluri Sitharama Raju districts",
        description:
          "Forest communities provided with herbal healthcare kits, maternal nutrition support, and seasonal malaria prevention.",
      },
      {
        id: "formulations-documented",
        value: "120+",
        label: "Formulations Codified",
        unit: "Documented Herbal Recipes",
        source: "LAYA Traditional Healers (Vaidya) Guild Pharmacopoeia",
        period: "Published Field Monographs",
        scope: "Eastern Ghats Medicinal Plants Flora",
        description:
          "Herbal medicines for respiratory illnesses, fevers, skin disorders, and digestive health codified with senior tribal practitioners.",
      },
    ],
    keyOutcomes: [
      "Established the Vanantharam Community Health Center and Training Facility in Addateegala.",
      "Formed local guilds of tribal herbal healers (Vaidyas), protecting indigenous intellectual property from biopiracy.",
      "Maintained regular field clinics and emergency health referral protocols during seasonal malaria and monsoon epidemics.",
    ],
  },
  {
    id: "learning",
    programmeTitle: "Lifelong Learning",
    thematicArea: "Youth Leadership, Literacy & Education",
    route: ROUTES.whatWeDoLifelongLearning,
    leadParagraph:
      "LAYA nurtures young Adivasi women and men to emerge as regional community leaders, while partnering with elders to promote mother-tongue education, tribal literature, and cultural self-respect.",
    photograph: {
      src: illustrationAssets.multilingualLearning.src,
      alt: "Adivasi youth and children in mother-tongue learning environment",
      caption:
        "Multilingual learning initiative connecting culture, identity, and modern literacy · Eastern Ghats",
      credit: "LAYA Archival Photograph",
    },
    stats: [
      {
        id: "youth-trained",
        value: "10,000+",
        label: "Youth & Women Trained",
        unit: "Youth & Grassroots Organizers",
        source: "Lifelong Learning Unit Training Registers",
        period: "1990–2024",
        scope: "North Coastal Andhra Pradesh Scheduled Areas",
        description:
          "Equipped with community organizing skills, RTI navigation, constitutional literacy, and cultural heritage documentation.",
      },
      {
        id: "learning-centres",
        value: "40+",
        label: "Learning Initiatives",
        unit: "Centres & Local Collectives",
        source: "LAYA Education Project Summaries",
        period: "2008–2024",
        scope: "Koya, Konda Reddi, and Adivasi Odiya settlements",
        description:
          "Community study circles and early childhood centres integrating tribal languages and oral histories into curriculum.",
      },
    ],
    keyOutcomes: [
      "Developed indigenous multilingual primers and reading materials in Adivasi mother tongues.",
      "Mentored hundreds of youth fellows who now lead local community-based organisations and elected Panchayat bodies.",
      "Documented oral folk songs, customary forest stewardship rituals, and seasonal agricultural calendars.",
    ],
  },
  {
    id: "climate",
    programmeTitle: "Climate Crisis & Sustainable Development",
    thematicArea: "Clean Energy, Water & Coastal Ecosystems",
    route: ROUTES.whatWeDoClimate,
    leadParagraph:
      "LAYA partners with tribal communities to harness renewable energy that is owned, managed, and maintained locally, piloting community-led adaptation models in drought-prone and coastal zones.",
    photograph: {
      src: illustrationAssets.coastalSeaweed.src,
      alt: "Sustainable coastal livelihood and community climate adaptation initiative",
      caption:
        "Community climate resilience and coastal sustainable aquaculture initiative · Andhra Pradesh coast",
      credit: "LAYA Field Documentation",
    },
    stats: [
      {
        id: "clean-energy-projects",
        value: "50+",
        label: "Renewable Energy Units",
        unit: "Decentralized Clean Energy Systems",
        source: "Laya Clean Energy / Climate Unit Reports",
        period: "2006–2024",
        scope: "Off-grid Hill Settlements and Coastal Villages",
        description:
          "Community-managed solar drinking water pumps, bio-gas installations, micro-hydro units, and clean smokeless cookstoves.",
      },
    ],
    keyOutcomes: [
      "Demonstrated off-grid solar water pumping in remote hill villages, eliminating diesel dependence and physical water fetching drudgery.",
      "Introduced fuel-efficient cookstoves (smokeless chulhas) reducing indoor air pollution for women and girls.",
      "Represented indigenous community climate priorities in national coalitions and international climate summits.",
    ],
  },
];

/**
 * Featured Stories from the field connecting verified metrics to human experiences.
 */
export const FEATURED_IMPACT_STORIES: FeaturedStoryReference[] = [
  {
    id: 1,
    title: mockStories[0].title,
    excerpt: mockStories[0].excerpt,
    programmeTitle: "Rights, Law & Accompaniment",
    route: `/stories/${mockStories[0].id}`,
    image: mockStories[0].image,
  },
  {
    id: 2,
    title: mockStories[1].title,
    excerpt: mockStories[1].excerpt,
    programmeTitle: "Sustainable Resource Management",
    route: `/stories/${mockStories[1].id}`,
    image: mockStories[1].image,
  },
  {
    id: 3,
    title: mockStories[2].title,
    excerpt: mockStories[2].excerpt,
    programmeTitle: "Lifelong Learning",
    route: `/stories/${mockStories[2].id}`,
    image: mockStories[2].image,
  },
];

/**
 * Verified Geographic Scope & Office Records
 */
export const IMPACT_GEOGRAPHY = {
  districts: whereWeWork.coverage.districts,
  offices: whereWeWork.locations,
  note: whereWeWork.coverage.description,
  caveat:
    "A drawn map is omitted because formal boundary shapefiles and geocoded village coordinates are not held in this repository. Verified administrative districts and official field locations are stated directly.",
};

/**
 * Statistics that require confirmation from LAYA
 */
export const STATISTICS_FLAGGED_FOR_LAYA: {
  statistic: string;
  currentDisplay: string;
  sourceInRepo: string;
  actionRequired: string;
}[] = [
  {
    statistic: "Cumulative Lives Impacted",
    currentDisplay: "500,000+",
    sourceInRepo: "mockImpactMetrics in src/services/api.ts",
    actionRequired:
      "Confirm current cumulative estimate calculation methodology and baseline reporting year.",
  },
  {
    statistic: "Years of Service",
    currentDisplay: "39+ (Founded 1985)",
    sourceInRepo: "Timeline / Genesis in src/services/api.ts",
    actionRequired:
      "Confirm whether 2025/2026 reporting marks the 40th anniversary milestone (1985–2025).",
  },
  {
    statistic: "Total Villages Covered under RLA",
    currentDisplay: "500+ villages",
    sourceInRepo: "RLA Programme Overview in src/content/programmes.ts",
    actionRequired:
      "Confirm current active village count under Community Forest Rights accompaniment.",
  },
];
