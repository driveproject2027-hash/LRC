import { ROUTES } from "@/lib/routes";

/**
 * LAYA — WHERE WE WORK: GEOGRAPHICAL AUDIT & LOCATION RECORD
 * ---------------------------------------------------------------------------
 * PHASE 1 DATA AUDIT RESULTS
 *
 * This dataset records all explicitly documented geographical locations in LAYA's
 * published reports, official registrations, and project archives.
 *
 * DATA INTEGRITY RULES:
 *  - Only administrative offices, institutional centers, and formal field hubs are
 *    plotted with pin markers.
 *  - Individual village hamlets and sacred grove GPS points are deliberately withheld
 *    to safeguard vulnerable Adivasi community privacy and prevent biopiracy.
 *  - No locations, districts, or coordinates have been fabricated.
 * ---------------------------------------------------------------------------
 */

export interface LocationProgrammeRef {
  title: string;
  category: string;
  route: string;
}

export interface VerifiedLocation {
  id: string;
  name: string;
  shortName: string;
  type: "Headquarters" | "Field Office" | "Health & Training Center";
  district: string;
  state: string;
  address: string;
  pincode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  svgCoordinates: {
    x: number;
    y: number;
  };
  primaryProgrammes: LocationProgrammeRef[];
  operationalRole: string;
  description: string;
  source: string;
  publicSafetyStatus: "Safe to display publicly" | "Aggregated view only";
}

export interface DistrictCoverage {
  id: string;
  name: string;
  regionalCategory: "Coastal Headquarters" | "Highland Agency" | "Godavari Agency" | "Northern Tribal Agency";
  leadMandals: string[];
  focusAreas: string[];
  description: string;
  svgHighlightPath?: string;
}

/**
 * Verified Location Nodes (5 Institutional Hubs)
 */
export const VERIFIED_LOCATIONS: VerifiedLocation[] = [
  {
    id: "hq-visakhapatnam",
    name: "LAYA Resource Centre (Headquarters)",
    shortName: "Visakhapatnam HQ",
    type: "Headquarters",
    district: "Visakhapatnam",
    state: "Andhra Pradesh",
    address: "Plot No 110, D-No 5-175/1, Behind Bay Crown Apartment, Yendada, Visakhapatnam",
    pincode: "530045",
    coordinates: {
      lat: 17.7788,
      lng: 83.3541,
    },
    svgCoordinates: {
      x: 563,
      y: 385,
    },
    primaryProgrammes: [
      {
        title: "Policy Advocacy & Networking",
        category: "Governance",
        route: ROUTES.aboutWhoWeAre,
      },
      {
        title: "Digital Resource Library",
        category: "Publications",
        route: ROUTES.publications,
      },
    ],
    operationalRole: "Central administrative coordination, research publication, state-level policy advocacy, and training facility.",
    description:
      "Established in 1985 on the coast of Visakhapatnam. Acts as the institutional nerve centre supporting field units across the Eastern Ghats.",
    source: "FCRA Registration & Official Contact Directory",
    publicSafetyStatus: "Safe to display publicly",
  },
  {
    id: "field-addateegala",
    name: "LAYA Field Unit — Addateegala (Vanantharam)",
    shortName: "Addateegala (Vanantharam)",
    type: "Health & Training Center",
    district: "Alluri Sitharama Raju",
    state: "Andhra Pradesh",
    address: "Addateegala, Agency Area (formerly East Godavari Agency)",
    pincode: "533428",
    coordinates: {
      lat: 17.4851,
      lng: 82.0253,
    },
    svgCoordinates: {
      x: 204,
      y: 465,
    },
    primaryProgrammes: [
      {
        title: "Herbal Based Health Care (HBHC)",
        category: "Traditional Health",
        route: ROUTES.whatWeDoHbhc,
      },
      {
        title: "Natural Resource Governance",
        category: "Rights & Forest",
        route: ROUTES.whatWeDoRla,
      },
    ],
    operationalRole: "Community health demonstration, herbal medicine garden, tribal healer (Vaidya) training guild, and residential capacity center.",
    description:
      "Vanantharam is LAYA's dedicated field training campus, codifying over 120 herbal preparations and training community barefoot health workers.",
    source: "HBHC Project Ledgers & Where We Work registry",
    publicSafetyStatus: "Safe to display publicly",
  },
  {
    id: "field-paderu",
    name: "LAYA Paderu Agency Office",
    shortName: "Paderu Field Office",
    type: "Field Office",
    district: "Alluri Sitharama Raju",
    state: "Andhra Pradesh",
    address: "Kangaruputtu, Paderu Agency Area",
    pincode: "531077",
    coordinates: {
      lat: 18.0833,
      lng: 82.6667,
    },
    svgCoordinates: {
      x: 378,
      y: 305,
    },
    primaryProgrammes: [
      {
        title: "Resource for Legal Action (RLA)",
        category: "Land & Rights",
        route: ROUTES.whatWeDoRla,
      },
      {
        title: "Sustainable Resource Management",
        category: "Agro-Biodiversity",
        route: ROUTES.whatWeDoSrm,
      },
    ],
    operationalRole: "Grassroots paralegal coordination, Community Forest Rights (CFR) claim documentation, and high-altitude watershed trials.",
    description:
      "Located at ~1,000m elevation in the highland agency tract. Coordinates legal accompaniment for Adivasi Gram Sabhas and indigenous seed banks.",
    source: "RLA Project Records & Administrative Directory",
    publicSafetyStatus: "Safe to display publicly",
  },
  {
    id: "field-rampochodavaram",
    name: "LAYA Rampachodavaram Office",
    shortName: "Rampachodavaram Field Office",
    type: "Field Office",
    district: "Alluri Sitharama Raju",
    state: "Andhra Pradesh",
    address: "Rampachodavaram Agency Area",
    pincode: "533288",
    coordinates: {
      lat: 17.4475,
      lng: 81.7761,
    },
    svgCoordinates: {
      x: 136,
      y: 473,
    },
    primaryProgrammes: [
      {
        title: "Safeguarding Adivasi Rights (RLA)",
        category: "Land Defense",
        route: ROUTES.whatWeDoRla,
      },
      {
        title: "Climate & Decentralized Energy",
        category: "Renewable Energy",
        route: ROUTES.whatWeDoClimate,
      },
    ],
    operationalRole: "Defense against land alienation under LTR 1 of 70, PESA Gram Sabha mobilization, and solar water adaptation projects.",
    description:
      "Anchors LAYA's long-standing legal interventions in the Godavari agency valley, protecting community land tenure and forest entitlements.",
    source: "Where We Work official record",
    publicSafetyStatus: "Safe to display publicly",
  },
  {
    id: "field-veeraghattam",
    name: "LAYA Field Unit — Veeraghattam",
    shortName: "Veeraghattam Field Office",
    type: "Field Office",
    district: "Parvathipuram Manyam",
    state: "Andhra Pradesh",
    address: "Veeraghattam Agency Area, Parvathipuram Manyam District",
    pincode: "532460",
    coordinates: {
      lat: 18.6667,
      lng: 83.6000,
    },
    svgCoordinates: {
      x: 672,
      y: 148,
    },
    primaryProgrammes: [
      {
        title: "Lifelong Learning & Indigenous Culture",
        category: "Education",
        route: ROUTES.whatWeDoLifelongLearning,
      },
      {
        title: "Safeguarding Adivasi Rights & CFR",
        category: "Rights & Governance",
        route: ROUTES.whatWeDoRla,
      },
    ],
    operationalRole: "Youth orientations, mother-tongue education for Savara and Jatapu communities, vocational apprenticeships, and tribal land rights.",
    description:
      "Field office in Parvathipuram Manyam District, actively supporting tribal youth through vocational skills, lifelong learning, and community forest rights.",
    source: "LAYA Annual Report 2025–2026 Directory",
    publicSafetyStatus: "Safe to display publicly",
  },
];

/**
 * Verified District Operational Coverage
 */
export const VERIFIED_DISTRICTS: DistrictCoverage[] = [
  {
    id: "dist-asr",
    name: "Alluri Sitharama Raju (ASR)",
    regionalCategory: "Highland Agency",
    leadMandals: ["Paderu", "Addateegala", "Rampachodavaram", "Araku Valley", "Chintapalli", "Maredumilli"],
    focusAreas: [
      "Community Forest Rights (FRA 2006)",
      "Traditional Herbal Healthcare & Vaidya Guilds",
      "Heirloom Millet Farming & Biofarm Trials",
      "Decentralized Solar Water Pumps",
    ],
    description:
      "The primary agency homeland for Koya, Konda Reddi, Bagata, and Valmiki communities. LAYA maintains three physical offices across this rugged forested highland.",
  },
  {
    id: "dist-visakhapatnam",
    name: "Visakhapatnam",
    regionalCategory: "Coastal Headquarters",
    leadMandals: ["Yendada", "Anandapuram", "Bheemunipatnam", "Urban Resource Network"],
    focusAreas: [
      "Institutional Policy Research & Publications",
      "State & National Level Advocacy",
      "Youth Fellowships & Documentation",
      "Foreign Contribution & Compliance Governance",
    ],
    description:
      "The institutional headquarters and urban coordination bridge connecting grassroots Adivasi challenges with policy dialogue, academic networks, and donor partners.",
  },
  {
    id: "dist-east-godavari",
    name: "East Godavari",
    regionalCategory: "Godavari Agency",
    leadMandals: ["Devipatnam", "Korukonda", "Riverine Agency Belt"],
    focusAreas: [
      "Land Alienation Defense (LTR 1 of 70)",
      "Major Irrigation Resettlement Monitoring (Polavaram)",
      "PESA Statutory Self-Governance",
    ],
    description:
      "Riverine borderlands where LAYA has historically fought landmark land alienation cases—including the protection of 4,000 acres of tribal estate land in Manturu.",
  },
  {
    id: "dist-srikakulam",
    name: "Srikakulam",
    regionalCategory: "Northern Tribal Agency",
    leadMandals: ["Seethampeta", "Palakonda", "Mandasa Agency"],
    focusAreas: [
      "Mother-Tongue Education (Savara & Jatapu)",
      "Youth Paralegal Training",
      "Open Market NTFP Marketing Rights",
    ],
    description:
      "Bordering southern Odisha, this northernmost tribal agency focus fosters indigenous multilingual literacy, women's collectives, and forest livelihood autonomy.",
  },
];

/**
 * Data Audit & Cartographic Scope Notes
 */
export const GEOGRAPHICAL_DATA_AUDIT = {
  regionalScope: "Northern Coastal Andhra Pradesh & Eastern Ghats Tribal Belt",
  statesCovered: ["Andhra Pradesh"],
  districtsVerified: 4,
  fieldHubsVerified: 5,
  privacyNotice:
    "In accordance with community safety guidelines, this map displays verified administrative field offices, institutional training centers, and district-level operational boundaries. Individual village hamlets (covering over 1,500 settlements) are purposefully presented as aggregated district-level reach to protect tribal community privacy.",
  methodologyNote:
    "Map coordinates are verified from official government postal codes, registered addresses in LAYA's statutory FCRA filings, and published institutional directories.",
};
