import { referenceProgramImages } from "@/assets/referenceAssets";

/**
 * LAYA — ABOUT SECTION CONTENT
 * ---------------------------------------------------------------------------
 * Verbatim moved from `src/pages/AboutCategory.tsx`, which held all of this as
 * an inline 483-line `aboutPages` constant.
 *
 * CONTENT INTEGRITY
 *   Every string below — phase titles, year ranges, highlight bullets, board
 *   member names and roles, partner amounts, FCRA numbers, donor receipt rows,
 *   addresses and pincodes — is copied UNCHANGED from the source. Nothing has
 *   been added, softened, merged, reordered or removed.
 *
 *   The only edits are structural: the per-phase decorative `color` keys
 *   (`bg-emerald-500`, `bg-blue-500`, …) were dropped because the redesign uses
 *   a single restrained accent from the design system rather than seven
 *   arbitrary Tailwind colours. No information is lost — those keys carried no
 *   meaning beyond hue.
 *
 * NOTE ON "OUR STORY" vs "OUR JOURNEY"
 *   `/about` (About.tsx) is the organisational story: founding, vision, mission,
 *   goals.
 *   `/about/who-we-are` carries the seven-phase historical timeline.
 *   Both are preserved; the navigation labels them "Our Story" and "Our Journey"
 *   respectively.
 */

/* =========================================================================
   WHO WE ARE — organisational identity + the seven-phase journey
   ========================================================================= */

export const whoWeAre = {
  title: "Who We Are",
  subtitle: "Looking Backward... Looking Forward",
  description:
    "LAYA's journey began in 1985 in a remote Adivasi area of East Godavari. Over four decades, we have evolved through multiple phases of learning, legal engagement, unit-based decentralization, and long-term accompaniment with Adivasi communities in the Eastern Ghats.",
  intro:
    "Our involvement with Adivasi communities comprises various phases of engagement, each marked by significant learning, challenges, and growth. From initial grassroots work to establishing resource centers, from legal advocacy to climate action, LAYA has continuously adapted to meet the changing needs of the communities we serve.",
  image: referenceProgramImages[0],
} as const;

/**
 * THE JOURNEY — all seven phases, verbatim.
 * `highlights` are the exact bullets from the source, in the original order.
 */
export interface JourneyPhase {
  phase: string;
  years: string;
  title: string;
  description: string;
  highlights: string[];
}

export const journeyPhases: JourneyPhase[] = [
  {
    phase: "Phase 1",
    years: "1984–1989",
    title: "Learning from Adivasi Communities",
    description:
      "The entire LAYA team was based at Addateegala, East Godavari district. Initial learning of the worldview of Adivasi communities came from day-to-day interactions with local representatives.",
    highlights: [
      "Learning and responding to land alienation issues",
      "Access to forests and natural resources",
      "Addressing depletion of water resources",
      "Lack of access to government programs",
      "Issues related to agricultural credit",
      "Lack of access to education",
    ],
  },
  {
    phase: "Phase 2",
    years: "1989–1995",
    title: "Establishing Independence",
    description:
      "LAYA was independently registered as a society and the Resource Centre was established at Visakhapatnam. This phase marked the evolution of the youth agenda and alternative education processes.",
    highlights: [
      "Independent registration as a society",
      "Resource Centre established at Visakhapatnam",
      "Evolution of youth agenda",
      "Alternative education processes",
      "Engagement in herbal based health care",
      "Exploration of field base in remote Adivasi belt",
      "Campaign on displacement along river belt",
      "Introduction of decentralized processes",
    ],
  },
  {
    phase: "Phase 3",
    years: "1995–2000",
    title: "Strengthening Systems",
    description:
      "Post 1995, LAYA was registered under FCRA (Foreign Contribution Regulation Act). This phase strengthened management and governance systems and enabled systematic intervention strategies through unit approaches.",
    highlights: [
      "FCRA registration (1995)",
      "Strengthened management systems",
      "Unit-based approach implementation",
      "Structural backbone of LAYA Resource Centre formed",
      "Systematic intervention strategies",
    ],
  },
  {
    phase: "Phase 4",
    years: "2000–2008",
    title: "Climate Action & Health Systems",
    description:
      "LAYA expanded its work to include climate change initiatives and strengthened health systems through the Vanantharam program and various training initiatives.",
    highlights: [
      "Climate change initiatives launched",
      "Vanantharam health systems program",
      "Training and capacity building programs",
      "Networking with national and international organizations",
    ],
  },
  {
    phase: "Phase 5",
    years: "2008–2013",
    title: "Renewable Energy & Expansion",
    description:
      "LAYA expanded its climate work to include renewable energy projects and carbon credit initiatives, working towards sustainable development in Adivasi regions.",
    highlights: [
      "Renewable energy projects initiated",
      "Climate work expansion",
      "Carbon credit initiatives",
      "Sustainable development programs",
    ],
  },
  {
    phase: "Phase 6",
    years: "2013–2020",
    title: "Recognition & Learning Systems",
    description:
      "This phase saw LAYA's new office establishment, UNESCO recognition, and the development of community learning systems. The organization received several awards for its work.",
    highlights: [
      "New office establishment",
      "UNESCO recognition for education work",
      "Community learning systems developed",
      "Awards and recognition received",
      "Strengthened documentation and networking",
    ],
  },
  {
    phase: "Current Phase",
    years: "2020–Present",
    title: "Change Management & Sustainability",
    description:
      "LAYA is currently focused on change management, sustainability, and expanding programs. The organization responded effectively to the pandemic and continues to innovate in its approaches.",
    highlights: [
      "Change management initiatives",
      "Focus on long-term sustainability",
      "Pandemic response systems strengthened",
      "Program expansion and innovation",
      "Social enterprise transition",
      "Digital documentation and networking",
    ],
  },
];

/** Six programme areas as listed on Who We Are. */
export const programAreas = [
  {
    title: "Safeguarding Adivasi Rights",
    description:
      "Working for social justice and rights of Adivasi communities through legal engagement and advocacy.",
  },
  {
    title: "Herbal Based Health Care",
    description:
      "Traditional medicine systems and community health initiatives through the Vanantharam program.",
  },
  {
    title: "Sustainable Resource Management",
    description:
      "Forest conservation, water resource management, and sustainable agriculture practices.",
  },
  {
    title: "Lifelong Learning",
    description:
      "Education initiatives recognized by UNESCO, focusing on community-based learning systems.",
  },
  {
    title: "Climate & Sustainable Development",
    description:
      "Climate change initiatives, renewable energy projects, and carbon credit programs.",
  },
  {
    title: "Documentation & Networking",
    description:
      "Alternative documentation, INECC secretariat, and consultative status to UN ECOSOC.",
  },
] as const;

export const leadership = {
  title: "Leadership & Vision",
  description:
    "LAYA's Directors focus on linking local issues to global concerns through active networking and partnerships. The organization is involved in climate change initiatives at both national and international levels.",
  points: [
    "Linking local issues to global concerns",
    "Active networking and partnerships",
    "Climate change involvement at national and international levels",
    "Long-term institutional sustainability focus",
  ],
} as const;

export const futureVision = {
  title: "Future Vision",
  description:
    "LAYA envisions a future where Adivasi communities are empowered through education for sustainable development and social enterprise initiatives that ensure long-term sustainability and self-reliance.",
  points: [
    "Education for sustainable development",
    "Social enterprise initiatives",
    "Long-term sustainability and self-reliance",
    "Continued accompaniment with Adivasi communities",
  ],
} as const;

/* =========================================================================
   WAY WE WORK
   ========================================================================= */

export interface WorkSection {
  heading: string;
  paragraph: string;
  bullets?: string[];
  image?: string;
}

export const wayWeWork = {
  title: "Way We Work",
  subtitle: "Management, systems, and monitoring",
  description:
    "LAYA's management structure and organizational systems are designed to ensure decentralized functioning, transparency, and effective program implementation through unit-based approaches and collaborative partnerships with community-based organizations.",
  sections: [
    {
      heading: "Management",
      paragraph:
        "The management comprises the Executive Director, who takes overall direction and is responsible for resource generation for the organization. The Executive Director is assisted by an Associate Director, who, besides taking responsibility for project-direction-related tasks, also takes specific responsibility for Finance and Administration. The Directors are supported by a Program Policy Team comprising the unit facilitators and personnel in senior management roles.",
      bullets: [
        "Executive Director: Overall direction and resource generation",
        "Associate Director: Project direction, Finance and Administration",
        "Program Policy Team: Unit facilitators and senior management personnel",
        "Unit approach: Decentralized systems for effective functioning",
        "Field collaboration: Adivasi representatives and community-based organisations (CBOs)",
        "Small core personnel with wider outreach through CBO and NGO networks",
      ],
      image: referenceProgramImages[2],
    },
    {
      heading: "Organisational Systems",
      paragraph:
        "Our organisational systems encourage the units to function autonomously. In due time, LAYA envisages that some of these units will emerge as autonomous organisations and it will provide a co-ordinating link for a network of organisations. The system encourages transparency and maintains broad policies to facilitate management efficiency.",
      bullets: [
        "Units encouraged to function autonomously in administrative matters",
        "Organic linkages and collaboration between units on the program front",
        "Future vision: Units emerging as autonomous organisations with LAYA as the coordinating link",
        "Transparency and broad policies for management efficiency",
        "Financial standards and principles for daily functioning at main and field offices",
        "Enhanced financial control systems at main office and field offices",
        "Transparent reporting systems with quality standards and regular monitoring",
        "Financial sustainability through service cost recovery and training centre usage",
        "Voluntary contributions for periodicals and publications aiding self-financing",
      ],
    },
    {
      heading: "Monitoring and Reporting Systems",
      paragraph:
        "The LAYA team meets regularly to coordinate, report and plan strategically. Team building and linkages are maintained among staff through structured meetings and learning-sharing sessions.",
      bullets: [
        "Monthly and fortnightly staff meetings organized at the unit and Resource Center level",
        "Quarterly coordination unit meetings organized at unit levels",
        "Six-monthly strategic meetings with the representatives of each of the units",
        "Policy meetings held annually and when required",
        "Sharing of learning from workshops, seminars, training programs attended",
      ],
    },
  ] as WorkSection[],
  points: [
    "The thrust areas, goals and specific objectives, planned activities for each program and the expected outcomes form the basis of the monitoring and reporting systems.",
  ],
  image: referenceProgramImages[2],
} as const;

/* =========================================================================
   WHERE WE WORK
   ========================================================================= */

export const whereWeWork = {
  title: "Where We Work",
  subtitle: "Field and resource locations across the Eastern Ghats",
  description:
    "LAYA's field and resource work is centered in Andhra Pradesh, with a long-term regional presence across tribal agency areas and district-level partnerships with Adivasi communities.",
  locations: [
    {
      name: "LAYA Resource Centre",
      type: "Headquarters",
      district: "Visakhapatnam",
      address: "Plot No 110, D-No 5-175/1, Behind Bay Crown Apartment, Yendada",
      pincode: "530045",
    },
    {
      name: "LAYA Field Unit — Addateegala",
      type: "Field Office",
      district: "Alluri Sitharama Raju",
      address: "Addateegala, East Godavari Agency Area",
      pincode: "533428",
    },
    {
      name: "LAYA Paderu Office",
      type: "Field Office",
      district: "Alluri Sitharama Raju",
      address: "Kangaruputtu, Paderu",
      pincode: "531077",
    },
    {
      name: "LAYA Field Unit — Rampachodavaram",
      type: "Field Office",
      district: "East Godavari",
      address: "Rampachodavaram, East Godavari Agency Area",
      pincode: "533288",
    },
    {
      name: "LAYA Field Unit — Seethampeta",
      type: "Field Office",
      district: "Srikakulam",
      address: "Seethampeta, Srikakulam Agency Area",
      pincode: "532443",
    },
  ],
  coverage: {
    title: "Eastern Ghats Region",
    description:
      "Our work spans the tribal belt of the Eastern Ghats — from Visakhapatnam agency areas to East Godavari, Srikakulam, and adjoining regions — accompanying Adivasi communities through rights, livelihoods, health, and climate action.",
    districts: ["Visakhapatnam", "East Godavari", "Alluri Sitharama Raju", "Srikakulam"],
  },
  points: [
    "Field presence is linked with district-level partnerships and community institutions across the Eastern Ghats.",
  ],
  image: referenceProgramImages[0],
} as const;

/* =========================================================================
   FINANCIAL REPORTS — six annual disclosures
   ========================================================================= */

export const financialReports = {
  title: "Financial Reports",
  subtitle: "Year-wise foreign contribution disclosures",
  description:
    "LAYA publishes annual foreign contribution reports in compliance with FCRA requirements, ensuring transparency and public accountability in all financial operations.",
  intro:
    "LAYA publishes annual foreign contribution reports in compliance with FCRA requirements, ensuring transparency and public accountability in all financial operations.",
  reports: [
    { year: "2024-2025", label: "LAYA's Foreign Contribution", url: "https://laya.org.in/Finance/Laya-FC-2024-2025.pdf" },
    { year: "2023-2024", label: "LAYA's Foreign Contribution", url: "https://laya.org.in/Finance/Laya-FC-2023-24.pdf" },
    { year: "2022-2023", label: "LAYA's Foreign Contribution", url: "https://laya.org.in/Finance/Laya-FC-2022-2023.pdf" },
    { year: "2021-2022", label: "LAYA's Foreign Contribution", url: "https://laya.org.in/Finance/Laya-FC-2021-2022.pdf" },
    { year: "2020-2021", label: "LAYA's Foreign Contribution", url: "https://laya.org.in/Finance/Laya-FC-2020-2021.pdf" },
    { year: "2019-2020", label: "LAYA's Foreign Contribution", url: "https://laya.org.in/Finance/Laya-FC-2019-2020.pdf" },
  ],
  points: [
    "These disclosures align with LAYA's transparency and governance commitments under the Foreign Contribution Regulation Act (FCRA).",
  ],
} as const;

/* =========================================================================
   FCRA INFORMATION — registration, bank, quarterly receipts
   ========================================================================= */

export interface Receipt {
  donor: string;
  amount: string;
  date: string;
}
export interface ReceiptQuarter {
  name: string;
  receipts: Receipt[];
}
export interface ReceiptYear {
  year: string;
  quarters: ReceiptQuarter[];
}

export const fcraInformation = {
  title: "FCRA Information",
  subtitle: "Foreign Contribution Regulation Act (FCRA), 2010 Related Information",
  description:
    "LAYA is registered under FCRA with complete transparency in financial disclosures as per regulatory requirements.",
  fcraRegistration: {
    registrationNumber: "010350057",
    dateOfRegistration: "28 February 1995",
    renewalDate: "01 October 2022",
  },
  fcraBank: {
    name: "State Bank of India",
    address: "New Delhi Main Branch, FCRA Division, 11, Parliament Street, New Delhi - 110001",
    branchCode: "00691",
  },
  financialStatementsLink: "/about/financial-reports",
  /**
   * Every donor row verbatim — names, amounts and dates exactly as published.
   * These are FCRA Rule 13(b) disclosures; do not round or reformat amounts.
   */
  quarterlyReceipts: [
    {
      year: "F.Y 2024 - 2025",
      quarters: [
        {
          name: "Quarter - II (July - September 2024)",
          receipts: [
            { donor: "Ashakiran Forderverein Cap, Sonnebuhlweg 15, 79856 Hinterzarten, Germany", amount: "5,90,940", date: "02-Jul-2024" },
            { donor: "Katholische Zentralstelle fur Entwicklungshilfe e.V., Postfach 10 15 45, 52015, Aachen, Deutschland, Germany", amount: "51,75,743", date: "19-Jul-2024" },
            { donor: "Ashakiran Forderverein Cap, Sonnebuhlweg 15, 79856 Hinterzarten, Germany", amount: "7,28,697", date: "20-Aug-2024" },
            { donor: "Green Energy Against Poverty e.V., Kaninsberg 15, 53229 Bonn, Germany", amount: "5,62,531", date: "04-Sep-2024" },
            { donor: "Katholische Zentralstelle fur Entwicklungshilfe e.V., Postfach 10 15 45, 52015, Aachen, Deutschland, Germany", amount: "20,74,669", date: "06-Sep-2024" },
            { donor: "SAWEC - USA (Safe Water Educaton Centre), 319 Prestwick Way Edision, NJ, 08820 US", amount: "5,46,755", date: "06-Sep-2024" },
            { donor: "Bread for the World (BFW)- Protestant Development Service Protestant Agency for Diakonia and Development, P.O.Box 40164 D-10061 Berlin, Germany.", amount: "68,00,707", date: "12-Sep-2024" },
            { donor: "Association for India's Development (AID), 5011 Tecumseh St, College Park, MD 20740, USA", amount: "7,44,750", date: "20-Sep-2024" },
            { donor: "Bank Interest", amount: "26,428", date: "30-Sep-2024" },
          ],
        },
        {
          name: "Quarter - I (April - June 2024)",
          receipts: [
            { donor: "Asha for Education, 340 S Lemon Ave, Ste 2742, Walnut, CA 91789.", amount: "4,70,391", date: "04-Apr-2024" },
            { donor: "Katholische Zentralstelle fur Entwicklungshilfe e.V., Postfach 10 15 45, 52015, Aachen, Deutschland, Germany", amount: "39,85,650", date: "25-Apr-2024" },
            { donor: "Bread for the World(BFW)- Protestant Development Service Protestant Agency for Diakonia and Development,P.O.Box 40164 D-10061 Berlin, Germany.", amount: "45,38,687", date: "29-Apr-2024" },
            { donor: "Katholische Zentralstelle fur Entwicklungshilfe e.V., Postfach 10 15 45, 52015, Aachen, Deutschland, Germany", amount: "22,21,187.50", date: "02-May-2024" },
            { donor: "Global Green Grant Fund", amount: "8,27,300", date: "07-May-2024" },
          ],
        },
      ],
    },
    {
      year: "F.Y 2023 - 2024",
      quarters: [
        {
          name: "Quarter - I (April - June 2023)",
          receipts: [
            { donor: "Bread for the World(BFW)- Protestant Development Service Protestant Agency for Diakonia and Development,P.O.Box 40164 D-10061 Berlin, Germany.", amount: "23,17,490", date: "12-May-2023" },
            { donor: "HCF Capability Foundation", amount: "29,64,481", date: "24-May-2023" },
            { donor: "HCF Capability Foundation", amount: "3,01,846", date: "24-May-2023" },
            { donor: "Katholische Zentralstelle fur Entwicklungshilfe e.V., Postfach 10 15 45, 52015, Aachen, Deutschland, Germany", amount: "66,72,437.50", date: "24-May-2023" },
            { donor: "iPartner", amount: "1,12,500", date: "15-Jun-2023" },
            { donor: "Bank Interest", amount: "63,118", date: "30-Jun-2023" },
          ],
        },
        {
          name: "Quarter - II (July - September 2023)",
          receipts: [
            { donor: "Katholische Zentralstelle fur Entwicklungshilfe e.V., Postfach 10 15 45, 52015, Aachen, Deutschland, Germany", amount: "41,33,925", date: "21-Jul-2023" },
            { donor: "Association for India's Development(AID), 5011 Tecumseh St, College Park, MD 20740, USA", amount: "6,92,495", date: "31-Jul-2023" },
            { donor: "Bread for the World(BFW)- Protestant Development Service Protestant Agency for Diakonia and Development,P.O.Box 40164 D-10061 Berlin, Germany.", amount: "29,70,058", date: "04-Aug-2023" },
            { donor: "Asha for Education, 340 S Lemon Ave, Ste 2742, Walnut, CA 91789", amount: "5,20,000", date: "24-Aug-2023" },
            { donor: "Bank Interest", amount: "59,357", date: "30-Sep-2023" },
          ],
        },
        {
          name: "Quarter - III (October- December 2023)",
          receipts: [
            { donor: "Forderverein e.V.Ashakiran, Sonnebuhlweg 15, 79856 Hinterzarten ,Germany", amount: "6,29,873", date: "25-Oct-2023" },
            { donor: "Katholische Zentralstelle fur Entwicklungshilfe e.V., Postfach 10 15 45, 52015, Aachen, Deutschland, Germany", amount: "53,88,300", date: "20-Nov-2023" },
            { donor: "Bread for the World(BFW)- Protestant Development Service Protestant Agency for Diakonia and Development,P.O.Box 40164 D-10061 Berlin, Germany.", amount: "28,99,413", date: "21-Nov-2023" },
            { donor: "Katholische Zentralstelle fur Entwicklungshilfe e.V., Postfach 10 15 45, 52015, Aachen, Deutschland, Germany", amount: "36,50,900", date: "01-Dec-2023" },
            { donor: "Ashakiran Forderverein Cap, Sonnebuhlweg 15, 79856 Hinterzarten ,Germany", amount: "7,14,192", date: "21-Dec-2023" },
            { donor: "Bank Interest", amount: "72,240", date: "31-Dec-23" },
          ],
        },
        {
          name: "Quarter - IV (January-March 2024)",
          receipts: [
            { donor: "Asha for Education, 340 S Lemon Ave, Ste 2742, Walnut, CA 91789", amount: "40,000", date: "10-Jan-2024" },
            { donor: "Forderverein e.V.Ashakiran, Sonnebuhlweg 15, 79856 Hinterzarten ,Germany", amount: "7,00,315", date: "31-Jan-2024" },
            { donor: "HCF Capability Foundation", amount: "30,11,412", date: "29-Feb-2024" },
            { donor: "Katholische Zentralstelle fur Entwicklungshilfe e.V., Postfach 10 15 45, 52015, Aachen, Deutschland, Germany", amount: "21,54,960", date: "13-Mar-2024" },
            { donor: "Katholische Zentralstelle fur Entwicklungshilfe e.V., Postfach 10 15 45, 52015, Aachen, Deutschland, Germany", amount: "31,43,000", date: "13-Mar-2024" },
            { donor: "Bank Interest", amount: "46,815", date: "31-Mar-24" },
          ],
        },
      ],
    },
  ] as ReceiptYear[],
} as const;

/* =========================================================================
   GOVERNANCE
   ========================================================================= */

export const governance = {
  title: "Governance",
  subtitle: "General Body and Board of Management",
  description:
    "LAYA is governed by a General Body comprising 16 General Body Members from academic and development practice and a Board of Management (BoM) comprising 7 elected members. The BoM meets four times a year and the General Body of LAYA meets once a year.",
  governanceProcesses: [
    "The BoM meeting is preceded as a general practice by a one-day substantive workshop comprising the members of the BoM as well as senior management and coordinators of LAYA Resource Centre.",
    "One of the meetings of the BoM, in a year, includes field exposure and critical reflection on programme activities.",
  ],
  /**
   * ⚠  SOURCE INCONSISTENCY — DO NOT SILENTLY RECONCILE
   *
   * `description` above states the General Body comprises **16** members and the
   * Board of Management **7** elected members. The arrays below contain **14**
   * and **6** records respectively.
   *
   * These figures come from the existing LAYA source content and are preserved
   * as-is. The listings may simply be incomplete (e.g. members who have since
   * stepped down, or seats currently vacant), which is a plausible and normal
   * state for a governance body.
   *
   * The page header therefore reports the ORGANISATION'S STATED figures (16 and
   * 7) rather than counting the arrays, so the page never contradicts its own
   * body text. The arrays list named members only.
   *
   * ACTION: confirm with LAYA whether the General Body currently has 16 members
   * and whether the published listing is complete.
   */

  /** Stated composition, per the source description. */
  statedComposition: {
    generalBodyCount: 16,
    boardOfManagementCount: 7,
  },

  /** General Body — names and roles verbatim. */
  generalBody: [
    { name: "Ms. Nandini Narula", role: "Development Consultant, New Delhi" },
    { name: "Mr. Sanjay Khatua", role: "Director, DHARA, Bhubaneswar" },
    { name: "Dr. Lata Narayan", role: "Rtd Professor, Centre for Lifelong Learning, Tata Institute of Social Sciences, Mumbai" },
    { name: "Ms. Mani Mistry Elavia", role: "Free Lancer, Facilitator, Child Empowerment, Mumbai" },
    { name: "Dr Ritesh P Khunyakari", role: "Associate Professor, Tata Institute of Social Sciences (TISS), Hyderabad" },
    { name: "Ms. Rama Nandanavanam", role: "Senior Director, Operations, Sikshana Foundation(Bangalore), Hyderabad" },
    { name: "Dr. B. Devi Prasad", role: "Retd. Professor, Centre for Equity for Women Children and Families, School of Social Work, Tata Institute of Social Sciences, Mumbai" },
    { name: "Mr. Walter Mendoza", role: "Development Consultant, Pune" },
    { name: "Dr. D.V.R. Murthy", role: "Professor, Department of Journalism and Mass Communication, Andhra University, Visakhapatnam" },
    { name: "Ms. Maveen Soares Pereira", role: "Manager, Cotton Organisation: IDH" },
    { name: "Ms Shabnam Patel", role: "Architect, Visakhapatnam" },
    { name: "Dr. Biswaranjan Tripura", role: "Assistant Professor, Centre for Social Justice and Governance, School of Social Work, Tata Institute of Social Sciences (TISS), Mumbai" },
    { name: "Ms Pallavi Chaman", role: "Director, Finance, Climate Collective Foundation" },
    { name: "Ms Brinda Pancholi", role: "Freelancer, Bangalore" },
  ],
  /** Board of Management — names and offices verbatim. */
  boardOfManagement: [
    { name: "Ms. Nandini Narula", role: "President" },
    { name: "Prof B Devi Prasad", role: "Secretary" },
    { name: "Mr. Sanjay Khatua", role: "Treasurer" },
    { name: "Ms. Mani Mistry Elavia", role: "Member" },
    { name: "Dr. Ritesh P Khunyakari", role: "Member" },
    { name: "Ms. Rama Nandanavanam", role: "Member" },
  ],
} as const;

/* =========================================================================
   SUPPORT PARTNERS — 2023-2024, verbatim amounts
   ========================================================================= */

export const supportPartners = {
  title: "Our Support Partners",
  subtitle: "Support partners (2023-2024)",
  description:
    "LAYA's support ecosystem includes international development agencies, foundations, public institutions, and civil society partners.",
  partners: [
    { name: "Katholische Zentralstelle fur Entwicklungshilfe e.V.", location: "Aachen, Germany", amount: "25.14 Million INR" },
    { name: "Bread for the World", location: "Berlin, Germany", amount: "8.19 Million INR" },
    { name: "Foerderverein e.V., Ashakiran", location: "Hinterzarten, Germany", amount: "1.34 Million INR" },
    { name: "Association for India's Development (AID)", location: "Maryland, USA", amount: "1.39 Million INR" },
    { name: "Asha for Education", location: "", amount: "0.56 Million INR" },
    { name: "i-Partner India", location: "", amount: "0.11 Million INR" },
    { name: "Human Capability Foundation", location: "", amount: "6.28 Million INR" },
    { name: "Department of Science & Technology", location: "", amount: "1.75 Million INR" },
    { name: "Azim Premji Foundation", location: "", amount: "13.54 Million INR" },
    { name: "Tribal Cultural Research & Training Mission, AP", location: "", amount: "0.99 Million INR" },
    { name: "AP Medicinal & Aromatic Plant Board", location: "", amount: "0.31 Million INR" },
  ],
} as const;

/** Eyebrow labels used above each page title. */
export const ABOUT_HERO_LABELS: Record<string, string> = {
  "/about/who-we-are": "Resource Center for Adivasis",
  "/about/way-we-work": "How LAYA Operates",
  "/about/where-we-work": "Andhra Pradesh, India",
  "/about/financial-reports": "Transparency & Accountability",
  "/about/fcra-information": "FCRA Compliance",
  "/about/governance": "Governance",
  "/about/support-partners": "Partners & Allies",
};
