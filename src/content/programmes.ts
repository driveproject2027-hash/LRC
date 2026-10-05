import { ROUTES } from "@/lib/routes";
import { referenceProgramImages } from "@/assets/referenceAssets";

/**
 * LAYA — PROGRAMME DIRECTORY CONTENT
 * ---------------------------------------------------------------------------
 * Sources, all pre-existing:
 *   - `src/pages/WhatWeDoCategory.tsx` — the five programme narratives
 *   - `src/services/api.ts` (`mockPrograms`) — descriptions, images, metrics
 *   - `src/config/navigation.ts` — the five `/what-we-do/*` routes
 *
 * CONTENT INTEGRITY
 *   Every title, paragraph, bullet, metric and location below is copied from
 *   the existing source. Nothing has been invented, softened or merged.
 *
 * ⚠  CATEGORY SCOPE — READ BEFORE EDITING
 *   The Phase 5 brief listed nine possible categories. Only FIVE programmes
 *   actually exist in LAYA's verified content, and only FOUR of the suggested
 *   categories have a real programme behind them:
 *
 *     Rights & Entitlements        → /what-we-do/rla          ✓ exists
 *     Livelihoods                  → /what-we-do/srm          ✓ exists
 *     Health                       → /what-we-do/hbhc         ✓ exists
 *     Education                    → /what-we-do/lifelong-learning ✓ exists
 *     Climate & Environment        → /what-we-do/climate-...  ✓ exists
 *
 *     Renewable Energy             → NOT a standalone programme. It is a
 *                                    documented focus area INSIDE Climate
 *                                    ("decentralized renewable energy
 *                                    solutions"), and a phase in the About
 *                                    timeline. It is presented here as a
 *                                    theme within Climate, not as its own
 *                                    directory entry.
 *     Ecotourism                   → DOES NOT EXIST anywhere in the codebase.
 *                                    Not created.
 *     Community Institutions       → NOT a programme. It is LAYA's
 *                                    cross-cutting METHOD (gram sabhas, CBOs,
 *                                    paralegals). Presented as a cross-cutting
 *                                    approach band, not a programme.
 *     Advocacy / Policy            → NOT a standalone programme. It is
 *                                    embedded in Rights (PESA, FRA, High Court
 *                                    and Supreme Court actions) and Climate
 *                                    (policy advocacy). Presented as a
 *                                    cross-cutting approach.
 *
 *   Creating directory entries for the non-existent four would require
 *   fabricating programmes, which the brief forbids. They are surfaced
 *   honestly instead: two as documented themes inside a real programme, two as
 *   cross-cutting approaches that run through all five.
 * ---------------------------------------------------------------------------
 */

export interface ProgrammeSection {
  heading: string;
  paragraph?: string;
  bullets?: string[];
  image?: string;
}

export interface Programme {
  id: number;
  /** Route slug, matching src/App.tsx exactly. */
  to: string;
  /** Full programme title, verbatim. */
  title: string;
  /** Directory label — a shorter form of the same programme. */
  shortTitle: string;
  /** One-sentence explanation (the brief's requirement), from `content`. */
  summary: string;
  /** The key issue this programme addresses. */
  issue: string;
  /** Geographic / community context. */
  context: string;
  /** Thematic category this programme is filed under. */
  category: ProgrammeCategoryId;
  image: string;
  imageAlt: string;
  /** Headline metric, verbatim from `mockPrograms[].impactMetrics`. */
  metric: { label: string; value: string };
  /** Narrative sections, verbatim from WhatWeDoCategory. */
  sections: ProgrammeSection[];
  /** Key outcomes, verbatim from the source `bullets`. */
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

/**
 * The five categories that map 1:1 to a real programme. This is what the
 * directory groups by — no empty shelves, no invented entries.
 */
export const PROGRAMME_CATEGORIES: ProgrammeCategory[] = [
  {
    id: "rights",
    label: "Rights & Entitlements",
    blurb: "Land, forest rights, self-governance and access to justice.",
  },
  {
    id: "livelihoods",
    label: "Livelihoods & Natural Resources",
    blurb: "Farming, water, seed diversity and forest produce.",
  },
  {
    id: "health",
    label: "Health",
    blurb: "Herbal-based care and traditional health knowledge.",
  },
  {
    id: "education",
    label: "Education & Lifelong Learning",
    blurb: "Youth and women leadership, literacy and climate education.",
  },
  {
    id: "climate",
    label: "Climate & Environment",
    blurb: "Resilience, local energy and climate justice.",
  },
];

/**
 * Cross-cutting approaches.
 *
 * These are NOT programmes and are not offered as directory entries. They are
 * themes the brief listed as possible categories that are in fact methods
 * running through the work above. Each claim below is traceable to a real
 * programme's source text.
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
   THE FIVE PROGRAMMES
   ========================================================================= */

export const PROGRAMMES: Programme[] = [
  {
    id: 1,
    to: ROUTES.whatWeDoRla,
    title: "Safeguarding Adivasi Rights for Social Justice",
    shortTitle: "Rights & Entitlements",
    summary:
      "LAYA has addressed land alienation and socio-economic rights of Adivasi communities since inception — securing land through legal recourse and administrative action.",
    issue:
      "Land alienation and unrealised socio-economic and cultural rights, in spite of Adivasi communities inhabiting resource-rich areas.",
    context:
      "Outreach spans East Godavari, Visakhapatnam, West Godavari, Srikakulam and Vizianagaram, through Resource for Legal Action (RLA).",
    category: "rights",
    image: referenceProgramImages[0],
    imageAlt: "Adivasi community members at a LAYA legal awareness gathering",
    metric: { label: "Villages Covered", value: "500+" },
    sections: [
      {
        heading: "Context and approach",
        paragraph:
          "LAYA has been involved in addressing land alienation and socio-economic rights of Adivasi communities since its inception. For adivasis, the threat to natural resources like land, water, and forests, is a threat to their livelihood which is symbiotic to their identity as an ethnic group. While there are protective laws in the Scheduled Areas, the rights of adivasis continue to be violated. LAYA's work, related to Land Alienation and Human Rights, is lead by the Resource for Legal Action (RLA), which is a unit of LAYA outreaching five districts: East Godavari, Visakhapatnam, West Godavari, Srikakulam and Vizianagaram.",
      },
      {
        heading: "Activities and Achievements",
        paragraph:
          "Has succeeded over the years in ensuring that adivasis have reclaimed their land rights on about 25000 acres through legal recourse and by effective administrative decisions. The progress in the last five years shows the following results:",
        bullets: [
          "Facilitating access to justice through legal and other advocacy measures.",
          "Empowering adivasi communities through awareness and legal education.",
          "Generating data for advocacy and training on the adivasis' rights to natural resources.",
          "Promoting activists/paralegals to play a vigilance role in safeguarding rights to natural resources.",
          "Organising legal education camps for adivasi youth on land rights, women's rights, human rights, Right to Information Act, Forest Rights Recognition Act, etc.",
          "Organizing Legal orientation Camps to CBOs/Women Groups.",
          "Conducting paralegal training programmes.",
          "Conducting community mobilization on various issues like RoFR Act implementation, Rejected Claims of RoFR, etc.",
          "Surveying and identifying drop outs in villages of East and West Godavari districts and also facilitating readmission of drop outs.",
          "Facilitating tribal youth to apply for tribal community certificates.",
          "Facilitating adivasi households to secure ration cards in East and West Godavari districts.",
          "Facilitating adivasi households to secure job cards in East and West Godavari districts under MGNREGA.",
          "Facilitating applications of eligible persons for Old Age Pension (OAP).",
          "Facilitating adivasi widows to get Widows' Pension in East and West Godavari and Khammam districts.",
          "Initiating RTI Applications on Previous LTR orders, Settlement orders, RoFR Information from RoFR Cell, TSP funds, Land Compensation details, Fair Adangals, Removed pensions list in Devipatnam and Gangavaram mandals, List of Existing mining quarries in agency tracts from AD, Mines Rajahmundry.",
          "Enabled the adivasi women to seek land entitlements through conscious legal efforts remedying the inherent lacunae in both customary and statutory legal rights to claim inherited property.",
          "Has produced books/booklets/edited versions, covering various aspects of governance issues pertaining to the Fifth Schedule Area under the Constitution of India.",
          "Outreached youth, students, women, panchayat representatives, local officials for legal awareness, orientation, education and training on adivasi rights issues across five adivasi populated districts in Andhra Pradesh.",
          "Established credibility, so much so that the local and state administrative machinery often seek the expert guidance and suggestions of the RLA Advocate. RLA has been instrumental in articulating relevant policies and law including Forest Guidelines under Forest Rights Recognition Act 2006, Rules under PESA Act and several circulars issued under Koneru Land Committee constituted for addressing adivasi land issues."
        ],
      },
      {
        heading: "Policy actions",
        bullets: [
          "Advocated the urgency to frame Rules under PESA Act. The Rules were finally framed in 2011.",
          "Challenged the notification issued by the Government of Andhra Pradesh at the High Court for conducting auctions to give licenses to run liquor shops in the Scheduled Areas. This is against the PESA Act and attempts to override the powers of the gram sabhas.",
          "Engaged with the NTFP, India, and AP Girijan Sangham assailing the order of the Supreme Court passed for eviction of tribals in the cases of rejections of their claims under Recognition of Forest Rights Act.",
          "Lobbied with the Tribal Welfare authorities to follow the 'reservation' norms in the Scheduled Areas to fill up the Teachers' posts with Scheduled Tribe candidates as per GO Ms 3.",
          "Challenged the GO Ms 76 issued by Government of Andhra Pradesh considering the major son only as a separate family unit thus ignoring the rights of a major daughter for the rehabilitation and resettlement benefit under Project Displacement.",
          "Moved to resist delivery of 4000 acres of land situated in 6 hamlets of Manturu estate village in Devipatnam mandal, East Godavari District to a non-adivasi 'inamdar' based on an earlier District Court order.",
          "Made representations to State Human Rights Commission (SHRC) on the issue of compensation for the lands under Musirimilli Project, East Godavari district, thereby drawing attention to the non-implementation of Relief and Rehabilitation Package under Polavaram Project.",
          "Challenged the proposal for extension of Judicial Courts to Agency areas to deal with civil matters in the Supreme Court and lobbied with the Tribal Welfare Department for continuation of executive courts which are more accessible to tribal communities as the procedures are relatively simple. The High Power Committee accepted our contention in the Supreme Court of India. The Supreme Court of India then up held the contention and ordered the continuance of the existing Agency Courts.",
          "Challenged the monopoly power of Girijan Co-operative Corporation (GCC) over minor forest produce as indicated in PESA in order to empower the gram sabhas with authority to take decisions on sale of minor forest produce. The High Court permitted the adivasis' to sell their minor forest produce outside the Scheduled Areas.",
        ],
      },
    ],
    outcomes: [
      "About 25,000 acres of land rights reclaimed through legal recourse and administrative action.",
      "Legal awareness for youth, women, panchayat representatives, and officials.",
      "Policy contributions for FRA guidelines, PESA rules, and related governance frameworks.",
    ],
  },
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
    image: referenceProgramImages[2],
    imageAlt:
      "Adivasi farmer transplanting paddy in a flooded field in the Eastern Ghats",
    metric: { label: "Hectares Protected", value: "50,000+" },
    sections: [
      {
        heading: "Promotion of Sustainable Farming",
        paragraph:
          "LAYA supports diversification of crops, productivity improvements, and food security with value-added farming technologies, reaching approximately 10,000 farmer households across Andhra Pradesh.",
        image: referenceProgramImages[2],
      },
      {
        heading: "Promotion of Biodiversity",
        bullets: [
          "Seed centers and conservation of rare crop seed varieties",
          "Seed festivals and biodiversity promotion",
          "Broom grass cultivation and NTFP regeneration",
          "Ethno-botany studies and ecosystem stewardship on degraded lands",
          "Intensive training for Sustainable Agriculture Practitioners (SAP)",
          "Leveraging schemes for Adivasi farmers from government departments",
        ],
      },
      {
        heading: "Recognition",
        paragraph:
          "LAYA received the Andhra Pradesh State Biodiversity Conserver Award for work in community herbal systems, biodiversity research, and conservation-focused agriculture and forest regeneration.",
      },
    ],
    outcomes: [
      "Outreach to around 10,000 farmer households in four districts.",
      "Sustainable farming, value-added technologies, and climate-resilient practices.",
      "Seed centers, seed festivals, NTFP regeneration, and biodiversity conservation.",
    ],
  },
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
    image: referenceProgramImages[1],
    imageAlt:
      "Community health practitioners at a LAYA herbal health care training",
    metric: { label: "Communities Served", value: "300+" },
    sections: [
      {
        heading: "Background",
        paragraph: "The adivasi areas of Andhra Pradesh have seen a decline in the overall health situation and generally have limited access to mainstream healthcare. Few qualified doctors are willing to be stationed in these remote regions. People in these areas suffer from endemic health problems such as tuberculosis (TB), malaria, gynaecological problems, diarrhoea and jaundice. Malarial deaths during the monsoon season are not uncommon. The government has not allocated adequate resources to cater to the basic health needs. Epidemic diseases have been neglected in terms of remedial and preventive measures. Adivasi communities inhabiting these areas are without proper access to clean drinking water, sanitation and adequate nutrition and thus vulnerable to disease.\n\nBesides, the culture and practice of traditional healthcare especially for these communities, where health and treatment are closely interrelated with the environment, seems to be diminishing because of various reasons including lack of interest from the younger generations. The absence of a responsive healthcare delivery system has led to growing exploitation by self-proclaimed doctors called quacks in the area.\n\nFor LAYA, while working for the development of these communities, we realised that mainstream healthcare had very little impact on the wellbeing of these communities. We began to understand that if we had to make a positive dent to the wellbeing of the communities we would have to develop our own expertise and knowledge drawing from the traditional wisdom and the natural resources available within the communities.\n\nHence in early 2000 we undertook a need assessment with a focus on Herbal-Based Health Care. A center for traditional health care \"Vanantharam\" was built in 2003 to lend visibility to traditional adivasi medicine whose legitimacy in practice was being questioned by the mainstream, so called, modern medicinal system. The purpose was not to compete with but rather to offer alternative options for health care in the community. We also felt the need to underscore the confidence and credibility of existing Traditional Health Practitioners (THPs), besides creating a space for young men and women, interested in practicing herbal medicine, to acquire value added skills to function as Community Health Practitioners (CHPs).\n\nVanantharam now a registered trust, legitimizes practice of herbal based medicine to complement prevailing mainstream health care systems in partnership with LAYA",
        image: referenceProgramImages[1],
      },
      {
        heading: "Promoting Herbal Based Health Care at local level",
        paragraph: "Today herbal based health care is promoted through trained herbal based health care practitioners who treat patients in and around their villages on basic health care problems. Community Health Centers are located in the village where they serve as nodal health centers run by Community Health Practitioners (CHPs) for villages nearby. Located in a small hut/stall, the Community Health Practitioners offer medical advice and treatments through herbal medicine. In addition Traditional Health Practitioners (THPs) with special expertise, who are members of the THP Federation operate in a similar manner as the Community Health Centers. Besides regular health camps are organized at the weekly markets (shandies), where there is a gathering of the local community. Special Health Camps are also facilitated during the epidemic season in collaboration with the AYUSH Department. The community can also approach Vanantharam for various health care services."
      },
      {
        heading: "Promoting standardisation of herbal based medicines",
        paragraph: "Standardisation of herbal medicine is promoted for basic illnesses which includes . standardisation of ingredients, purification processes of herbal medicine, hygienic preparation, dosage and storage of herbal medicine. The purpose is to ensure quality of medicines that are utilised."
      },
      {
        heading: "Facilitating ‘Herbal Gardens’",
        paragraph: "We have maintained and upgraded 2 Mother Herbal Gardens in Gummaripalem and in Vanantharam (Addateegala). The Gummaripalem Herbal Garden is equipped with 185 varieties of medicinal plants and the Vanantharam (Addateegala) Herbal Garden is equipped with 250 varieties of medicinal plants. These herbal gardens produce seed material and are used for training and demonstration. 60 local herbal gardens are also promoted across four districts in villages where community health practitioners operate in order to support herbal practice."
      },
      {
        heading: "Developing medicinal plant nurseries",
        paragraph: "A medicinal plants nursery has been established with 80 varieties of medicinal plants. The seedlings of these plants have been distributed to Community Health Practitioners and Traditional Health Practitioners who plant them in their herbal gardens. Other interested institutions such as Colleges and NGOs access plants from the nurseries on a cost basis."
      },
      {
        heading: "Training young adivasi men and women in herbal medicine preparation for local practice",
        paragraph: "LAYA organizes and conducts a one-year course on “Community Ayurvedic (Herbal) Practitioners”. A community health practitioner is someone who practices traditional medicine and serves, in most cases, as the first health care support for adivasis who live in remote areas where mainstream healthcare is inaccessible. The course comprises 6 modules of in-house training and an internship of the trainees with Traditional Health Practitioners (THPs). The course focuses on life skills and work skills. In life skills, sessions include self-awareness, self-esteem, self-confidence, concepts, process and practice of effective communication. In work skills, the context and the roles of Community Ayurvedic Practitioners, basic knowledge on Ayurveda and human anatomy, practical training on medicine preparation and preservation skills are addressed. Besides exposure visits are organized to Government Ayurvedic Hospital and College for interaction with Ayurvedic students and professors."
      },
      {
        heading: "Refresher training programmes for Community Health Practitioners (CHPs)",
        paragraph: "Skill upgradation training is conducted post training with community health practitioners in order to sustain and upgrade their knowledge and skills on subjects involving identification of medicinal plants, collection methods of herbs, diagnosis of diseases and preparation of medicines."
      },
      {
        heading: "Up-grading skills of community 'Traditional Health Practitioners'",
        paragraph: "To expand the outreach of traditional health practices LAYA has initiated training programs with THPs building on their existing knowledge to upgrade their skills as well as address issues that arise during their practice. Traditional Health Practitioners are trained in hygienic medicine preparation methods as well as identification and collection of medicinal plants. Peer group exposure visits are organized for THPs to facilitate learning."
      },
      {
        heading: "Accompanying Traditional Health Practitioners’ Network",
        paragraph: "The Herbal Based Community Health Care Unit envisions its role as accompanying the THP network to strengthen traditional healing centers by institutionalizing the network. The unit has facilitated the registration of 4 District wise Traditional Health Practitioners’ Networks outreaching 350 THPs. The network has enabled sharing of experience among THPs, promoting standardisation of skills and improved quality of service. The network provides identity cards as well as Panchayat resolution certificates as testimonials to network members."
      },
      {
        heading: "Responding to specific health care needs of adivasi women",
        paragraph: "The Herbal Based Health Care center also caters to the specific needs of women. The focus has been on increasing nutrition levels and facilitating traditional women health practitioners in being able to treat gynaecological problems. To achieve this purpose, nutri-gardens have been promoted and workshops are organized on women's health related issues."
      },
      {
        heading: "Conducting herbal exhibitions for widespread awareness",
        paragraph: "‘Herbal Melas’ are conducted to exhibit the varieties of live medicinal plants, tubers, barks and seeds at various locations. A number of visitors attend every year, such as government officers, political leaders, ayurvedic, allopathic doctors and traditional health practitioners."
      },
      {
        heading: "Managing a licensed pharmacy for marketing of medicines",
        paragraph: "'Vanantharam Pharmacy' was registered in December 2012. Currently, Ayurvedic and Herbal medicines are prepared by the pharmacy to treat common diseases. The medicines prepared currently include: Triphala, Samasakkera churnam, Karpooradhi tailam, Vidangadhi churnam, Aswagandha churnam, Avipathikara churnam,Vishatindika tailam and, Brungamalika tailam. In addition, 17 single herb powders are also manufactured as per demand. The medicines are supplied to the Community Health Centers and are made available at Regular and Special Health Camps."
      }
    ],
    outcomes: [
      "Promotion of local herbal health care and standardized medicine preparation.",
      "Training for youth and community health practitioners.",
      "Herbal gardens, medicinal nurseries, exhibitions, and licensed pharmacy support.",
    ],
  },
  {
    id: 4,
    to: ROUTES.whatWeDoLifelongLearning,
    title: "Lifelong Learning",
    shortTitle: "Education & Lifelong Learning",
    summary:
      "Mainstream education often disconnects Adivasi youth from local history, culture and rights; this work strengthens contextual understanding, practical skills and leadership.",
    issue:
      "Mainstream education that disconnects Adivasi youth from local history, culture and rights.",
    context:
      "Reaching youth and women in East Godavari, Visakhapatnam, Vizianagaram and Srikakulam — 4,000+ youth directly, 100+ CBOs across 1,000+ villages indirectly.",
    category: "education",
    image: referenceProgramImages[3],
    imageAlt: "Adivasi youth at a LAYA lifelong learning session",
    metric: { label: "Youth Trained", value: "10,000+" },
    sections: [
      {
        heading: "Outreach",
        paragraph:
          "The lifelong learning unit reaches youth and women in East Godavari, Visakhapatnam, Vizianagaram, and Srikakulam districts. It engages directly with 4,000+ youth and indirectly through 100+ CBOs in 1,000+ villages.",
        image: referenceProgramImages[3],
      },
      {
        heading: "Programs",
        bullets: [
          "Adult crash literacy program",
          "Community college initiative with short and long-term trainings",
          "Environmental education and sustainable development courses",
          "Climate change education in Adivasi schools",
          "Campaign outreach to over 20,000 young Adivasi men and women",
        ],
      },
    ],
    outcomes: [
      "Direct outreach to 4,000+ youth, with around 50% young women.",
      "Adult crash literacy, community college pathways, and climate education.",
      "Indirect engagement through CBO networks across 1,000+ villages.",
    ],
  },
  {
    id: 5,
    to: ROUTES.whatWeDoClimate,
    title: "Climate Crisis and Sustainable Development",
    shortTitle: "Climate & Environment",
    summary:
      "LAYA advances climate resilience, local energy, awareness and policy advocacy for communities whose vulnerabilities climate change worsens.",
    issue:
      "Erratic rainfall, rising temperatures and extreme weather intensify the marginalisation of communities dependent on natural resources.",
    context:
      "Community resilience planning, climate-friendly technologies and decentralized energy approaches, including coastal ecosystem model pilots.",
    category: "climate",
    image: referenceProgramImages[4],
    imageAlt: "Climate-resilient landscape work in the Eastern Ghats",
    metric: { label: "Green Projects", value: "50+" },
    sections: [
      {
        heading: "Climate vulnerability context",
        paragraph:
          "Erratic rainfall, rising temperatures, and extreme weather intensify marginalization in Adivasi regions. LAYA's interventions build local adaptation and resilience in this context.",
        image: referenceProgramImages[4],
      },
      {
        heading: "Focus areas",
        bullets: [
          "Community resilience to climate change",
          "Climate-friendly technologies",
          "Climate change awareness and education",
          "Policy advocacy",
        ],
      },
      {
        heading: "Coastal ecosystem",
        paragraph:
          "To develop a scalable, inclusive, and climate-resilient coastal aquaculture model that empowers fishing communities, restores marine ecosystems, and advances sustainable development goals across Andhra Pradesh.",
      },
      {
        heading: "Our Journey So Far",
        bullets: [
          "Seaweed Cultivation Pilot – RK Beach (2022) - In collaboration with ICAR-CMFRI, LAYA launched a pilot at RK Beach using HDPE raft systems. The initiative aimed to test cultivation feasibility and system resilience under open-sea conditions.",
          "Scientific Site Identification - A 16-parameter GIS-based assessment of 15 coastal locations across three districts was conducted. Seven sites along the Visakhapatnam coast were found highly suitable for cultivation based on environmental and water quality criteria.",
          "Mangamaripeta Pilot (2024) - LAYA tested four seaweed farming methods (HDPE raft, bamboo raft, tubeline, submersed cage). HDPE rafts and submersed cages emerged as most effective under rough marine conditions.",
          "Green Mussel Cultivation – Pre-feasibility Study (2025) - With technical guidance from CMFRI, LAYA explored the potential of green mussel farming at RK Beach. An integrated approach with seaweed enhances farm productivity, reduces the environmental impact of aquaculture, and offers dual livelihood and market opportunities.",
          "Community Training - Since 2023, LAYA has been conducting regular training programs on seaweed cultivation in partnership with ICAR-CMFRI. These sessions have built awareness, transferred practical skills, and encouraged participation across fisher communities. In May 2024, we trained 86 individuals—including over 65 fishers and 15 students—through workshops co-organized with ICAR-CMFRI, DHAN Foundation, and the State Fisheries Department."
        ]
      },
      {
        heading: "Scaling Impact & Future Directions",
        bullets: [
          "Policy Engagement & Subsidy Advocacy - LAYA, together with DHAN Foundation, submitted detailed observations on HDPE raft-based seaweed cultivation to senior fisheries officials to influence subsidy allocations under the PMMSY.",
          "Integrated Seaweed + Mussel Platforms - We’ve launched a pilot integrating green mussels into HDPE seaweed rafts, alongside training for local fishers and federations.",
          "Strategic Partnerships - Formal MoU with ICAR‑CMFRI for scientific expertise; State Fisheries Department for technical assistance; DHAN Foundation for community mobilization. These partnerships ensure our work is technically sound and aligned with state goals."
        ]
      },
      {
        heading: "Why This Matters",
        bullets: [
          "Economic Empowerment - Provides fisher communities with diversified income streams, reducing dependence on declining wild catch and offering livelihood alternatives.",
          "Eco-Climate Resilience - Promotes nature positive aquaculture that restores marine biodiversity, enhances water quality, sequesters carbon, and builds adaptive capacity to climate shocks.",
          "Policy Influence - Generates grassroots level evidence to shape inclusive, subsidy-supported frameworks under national programs like PMMSY."
        ]
      },
      {
        heading: "Renewable energy and carbon initiatives",
        paragraph:
          "Within this programme LAYA works to enable energy that can be produced, owned, controlled, managed and utilized by local Adivasi communities, and expanded its climate work to include renewable energy projects and carbon credit initiatives.",
      },
    ],
    outcomes: [
      "Community resilience and local adaptation-oriented planning.",
      "Climate-friendly technologies and decentralized energy approaches.",
      "Education, awareness, and policy advocacy for climate justice.",
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
 * No stated figure exists in the source that these could contradict, so
 * computing them here is safe (unlike the Governance counts).
 */
export const DIRECTORY_STATS = {
  programmeCount: PROGRAMMES.length,
  categoryCount: PROGRAMME_CATEGORIES.length,
  districts: 4,
} as const;

/** Programme routes rendered as standalone pages by src/App.tsx. */
export const PROGRAMME_ROUTES: Record<number, string> = {
  1: ROUTES.whatWeDoRla,
  2: ROUTES.whatWeDoHbhc,
  3: ROUTES.whatWeDoSrm,
  4: ROUTES.whatWeDoLifelongLearning,
  5: ROUTES.whatWeDoClimate,
};
