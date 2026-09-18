import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Mountain, Navigation, Trees, BookOpen, Globe, Heart, Leaf, ShieldCheck, Sun, Check, Sparkles, Target, Users, Settings, ClipboardList, Layers, Eye, FileText, Download, ExternalLink, Landmark } from "lucide-react";
import { referenceHero, referenceProgramImages, referenceGalleryImages } from "@/assets/referenceAssets";

interface ContentSection {
  heading?: string;
  paragraph?: string;
  bullets?: string[];
  image?: string;
}

const aboutPages = {
  "/about/who-we-are": {
    title: "Who We Are",
    subtitle: "Looking Backward... Looking Forward",
    description:
      "LAYA's journey began in 1985 in a remote Adivasi area of East Godavari. Over four decades, we have evolved through multiple phases of learning, legal engagement, unit-based decentralization, and long-term accompaniment with Adivasi communities in the Eastern Ghats.",
    intro: "Our involvement with Adivasi communities comprises various phases of engagement, each marked by significant learning, challenges, and growth. From initial grassroots work to establishing resource centers, from legal advocacy to climate action, LAYA has continuously adapted to meet the changing needs of the communities we serve.",
    timeline: [
      {
        phase: "Phase 1",
        years: "1984–1989",
        title: "Learning from Adivasi Communities",
        description: "The entire LAYA team was based at Addateegala, East Godavari district. Initial learning of the worldview of Adivasi communities came from day-to-day interactions with local representatives.",
        highlights: [
          "Learning and responding to land alienation issues",
          "Access to forests and natural resources",
          "Addressing depletion of water resources",
          "Lack of access to government programs",
          "Issues related to agricultural credit",
          "Lack of access to education",
        ],
        color: "bg-emerald-500",
      },
      {
        phase: "Phase 2",
        years: "1989–1995",
        title: "Establishing Independence",
        description: "LAYA was independently registered as a society and the Resource Centre was established at Visakhapatnam. This phase marked the evolution of the youth agenda and alternative education processes.",
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
        color: "bg-blue-500",
      },
      {
        phase: "Phase 3",
        years: "1995–2000",
        title: "Strengthening Systems",
        description: "Post 1995, LAYA was registered under FCRA (Foreign Contribution Regulation Act). This phase strengthened management and governance systems and enabled systematic intervention strategies through unit approaches.",
        highlights: [
          "FCRA registration (1995)",
          "Strengthened management systems",
          "Unit-based approach implementation",
          "Structural backbone of LAYA Resource Centre formed",
          "Systematic intervention strategies",
        ],
        color: "bg-purple-500",
      },
      {
        phase: "Phase 4",
        years: "2000–2008",
        title: "Climate Action & Health Systems",
        description: "LAYA expanded its work to include climate change initiatives and strengthened health systems through the Vanantharam program and various training initiatives.",
        highlights: [
          "Climate change initiatives launched",
          "Vanantharam health systems program",
          "Training and capacity building programs",
          "Networking with national and international organizations",
        ],
        color: "bg-orange-500",
      },
      {
        phase: "Phase 5",
        years: "2008–2013",
        title: "Renewable Energy & Expansion",
        description: "LAYA expanded its climate work to include renewable energy projects and carbon credit initiatives, working towards sustainable development in Adivasi regions.",
        highlights: [
          "Renewable energy projects initiated",
          "Climate work expansion",
          "Carbon credit initiatives",
          "Sustainable development programs",
        ],
        color: "bg-rose-500",
      },
      {
        phase: "Phase 6",
        years: "2013–2020",
        title: "Recognition & Learning Systems",
        description: "This phase saw LAYA's new office establishment, UNESCO recognition, and the development of community learning systems. The organization received several awards for its work.",
        highlights: [
          "New office establishment",
          "UNESCO recognition for education work",
          "Community learning systems developed",
          "Awards and recognition received",
          "Strengthened documentation and networking",
        ],
        color: "bg-indigo-500",
      },
      {
        phase: "Current Phase",
        years: "2020–Present",
        title: "Change Management & Sustainability",
        description: "LAYA is currently focused on change management, sustainability, and expanding programs. The organization responded effectively to the pandemic and continues to innovate in its approaches.",
        highlights: [
          "Change management initiatives",
          "Focus on long-term sustainability",
          "Pandemic response systems strengthened",
          "Program expansion and innovation",
          "Social enterprise transition",
          "Digital documentation and networking",
        ],
        color: "bg-cyan-500",
      },
    ],
    programAreas: [
      {
        title: "Safeguarding Adivasi Rights",
        description: "Working for social justice and rights of Adivasi communities through legal engagement and advocacy.",
        icon: "shield",
      },
      {
        title: "Herbal Based Health Care",
        description: "Traditional medicine systems and community health initiatives through the Vanantharam program.",
        icon: "heart",
      },
      {
        title: "Sustainable Resource Management",
        description: "Forest conservation, water resource management, and sustainable agriculture practices.",
        icon: "leaf",
      },
      {
        title: "Lifelong Learning",
        description: "Education initiatives recognized by UNESCO, focusing on community-based learning systems.",
        icon: "book",
      },
      {
        title: "Climate & Sustainable Development",
        description: "Climate change initiatives, renewable energy projects, and carbon credit programs.",
        icon: "sun",
      },
      {
        title: "Documentation & Networking",
        description: "Alternative documentation, INECC secretariat, and consultative status to UN ECOSOC.",
        icon: "globe",
      },
    ],
    leadership: {
      title: "Leadership & Vision",
      description: "LAYA's Directors focus on linking local issues to global concerns through active networking and partnerships. The organization is involved in climate change initiatives at both national and international levels.",
      points: [
        "Linking local issues to global concerns",
        "Active networking and partnerships",
        "Climate change involvement at national and international levels",
        "Long-term institutional sustainability focus",
      ],
    },
    futureVision: {
      title: "Future Vision",
      description: "LAYA envisions a future where Adivasi communities are empowered through education for sustainable development and social enterprise initiatives that ensure long-term sustainability and self-reliance.",
      points: [
        "Education for sustainable development",
        "Social enterprise initiatives",
        "Long-term sustainability and self-reliance",
        "Continued accompaniment with Adivasi communities",
      ],
    },
    image: referenceHero,
  },
  "/about/way-we-work": {
    title: "Way We Work",
    subtitle: "Management, systems, and monitoring",
    description:
      "LAYA's management structure and organizational systems are designed to ensure decentralized functioning, transparency, and effective program implementation through unit-based approaches and collaborative partnerships with community-based organizations.",
    sections: [
      {
        heading: "Management",
        paragraph:
          "The management comprises of the Executive Director, who takes overall direction and is responsible for resource generation for the organization. The Executive Director is assisted by an Associate Director, who besides taking responsibility for project direction related tasks also takes specific responsibility for Finance and Administration. The Directors are supported by a Program Policy Team comprising of the unit facilitators and personnel in senior management roles.",
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
          "Organic linkages and collaboration between units on program front",
          "Future vision: Units emerging as autonomous organisations with LAYA as coordinating link",
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
          "The LAYA team meets regularly to coordinate, report and plan strategically. The team building and linkages are maintained among staff through structured meetings and learning sharing sessions.",
        bullets: [
          "Monthly and fortnightly staff meetings organized at the unit and Resource Center level",
          "Quarterly coordination unit meetings organized at unit levels",
          "Six monthly strategic meetings with the representatives of each of the units",
          "Policy meetings held annually and when required",
          "Sharing of learning from workshops, seminars, training programs attended",
        ],
      },
    ],
    points: [
      "The thrust areas, goals and specific objectives, planned activities for each program and the expected outcome are the basis for the monitoring and reporting systems.",
    ],
    image: referenceProgramImages[2],
  },
  "/about/where-we-work": {
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
  },
  "/about/financial-reports": {
    title: "Financial Reports",
    subtitle: "Year-wise foreign contribution disclosures",
    description:
      "LAYA publishes annual foreign contribution reports in compliance with FCRA requirements, ensuring transparency and public accountability in all financial operations.",
    reports: [
      {
        year: "2024-2025",
        label: "LAYA's Foreign Contribution",
        url: "https://laya.org.in/Finance/Laya-FC-2024-2025.pdf",
      },
      {
        year: "2023-2024",
        label: "LAYA's Foreign Contribution",
        url: "https://laya.org.in/Finance/Laya-FC-2023-24.pdf",
      },
      {
        year: "2022-2023",
        label: "LAYA's Foreign Contribution",
        url: "https://laya.org.in/Finance/Laya-FC-2022-2023.pdf",
      },
      {
        year: "2021-2022",
        label: "LAYA's Foreign Contribution",
        url: "https://laya.org.in/Finance/Laya-FC-2021-2022.pdf",
      },
      {
        year: "2020-2021",
        label: "LAYA's Foreign Contribution",
        url: "https://laya.org.in/Finance/Laya-FC-2020-2021.pdf",
      },
      {
        year: "2019-2020",
        label: "LAYA's Foreign Contribution",
        url: "https://laya.org.in/Finance/Laya-FC-2019-2020.pdf",
      },
    ],
    points: [
      "These disclosures align with LAYA's transparency and governance commitments under the Foreign Contribution Regulation Act (FCRA).",
    ],
    image: referenceProgramImages[4],
  },
  "/about/fcra-information": {
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
    ],
    image: referenceProgramImages[1],
  },
  "/about/governance": {
    title: "Governance",
    subtitle: "General Body and Board of Management",
    description:
      "LAYA is governed by a General Body comprising 16 General Body Members from academic and development practice and a Board of Management (BoM) comprising 7 elected members. The BoM meets four times a year and the General Body of LAYA meets once a year.",
    governanceProcesses: [
      "The BoM meeting is preceded as a general practice by a one-day substantive workshop comprising the members of the BoM as well as senior management and coordinators of LAYA Resource Centre.",
      "One of the meetings of the BoM, in a year, includes field exposure and critical reflection on programme activities.",
    ],
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
    boardOfManagement: [
      { name: "Ms. Nandini Narula", role: "President" },
      { name: "Prof B Devi Prasad", role: "Secretary" },
      { name: "Mr. Sanjay Khatua", role: "Treasurer" },
      { name: "Ms. Mani Mistry Elavia", role: "Member" },
      { name: "Dr. Ritesh P Khunyakari", role: "Member" },
      { name: "Ms. Rama Nandanavanam", role: "Member" },
    ],
    image: referenceProgramImages[2],
  },
  "/about/support-partners": {
    title: "Our Support Partners",
    subtitle: "Support partners (2023-2024)",
    description:
      "LAYA's support ecosystem includes international development agencies, foundations, public institutions, and civil society partners.",
    supportPartners: [
      { name: "Katholische Zentralstelle fur Entwicklungshilfe e.V.", location: "Aachen, Germany", amount: "25.14 Million INR" },
      { name: "Bread for the World", location: "Berlin, Germany", amount: "8.19 Million INR" },
      { name: "Foerderverein e.V., Ashakiran", location: "Hinterzarten, Germany", amount: "1.34 Million INR" },
      { name: "Association for India's Development (AID)", location: "Maryland, USA", amount: "1.39 Million INR" },
      { name: "Asha for Education", location: "", amount: "0.56 Million INR" },
      { name: "I-Partner India", location: "", amount: "0.11 Million INR" },
      { name: "Human Capability Foundation", location: "", amount: "6.28 Million INR" },
      { name: "Department of Science & Technology", location: "", amount: "1.75 Million INR" },
      { name: "Azim Premji Foundation", location: "", amount: "13.54 Million INR" },
      { name: "Tribal Cultural Research & Training Mission, AP", location: "", amount: "0.99 Million INR" },
      { name: "AP Medicinal & Aromatic Plant Board", location: "", amount: "0.31 Million INR" },
    ],
    image: referenceProgramImages[3],
  },
} as const;

const programAreaIcons = {
  shield: ShieldCheck,
  heart: Heart,
  leaf: Leaf,
  book: BookOpen,
  sun: Sun,
  globe: Globe,
} as const;

const timelineAccents = [
  "border-emerald-500",
  "border-primary",
  "border-violet-500",
  "border-orange-500",
  "border-rose-500",
  "border-indigo-500",
  "border-cyan-500",
];

const wayWeWorkIcons = [Users, Settings, ClipboardList] as const;

const heroLabels: Record<string, string> = {
  "/about/who-we-are": "Resource Center for Adivasis",
  "/about/way-we-work": "How LAYA Operates",
  "/about/where-we-work": "Andhra Pradesh, India",
  "/about/financial-reports": "Transparency & Accountability",
  "/about/fcra-information": "FCRA Compliance",
  "/about/governance": "Governance",
  "/about/support-partners": "Partners & Allies",
};

const AboutCategory = () => {
  const location = useLocation();
  const page = aboutPages[location.pathname as keyof typeof aboutPages] ?? aboutPages["/about/who-we-are"];

  const isWhoWeAre = location.pathname === "/about/who-we-are";
  const isWayWeWork = location.pathname === "/about/way-we-work";
  const isWhereWeWork = location.pathname === "/about/where-we-work";
  const isFinancialReports = location.pathname === "/about/financial-reports";
  const isFcraInformation = location.pathname === "/about/fcra-information";
  const isGovernance = location.pathname === "/about/governance";
  const isSupportPartners = location.pathname === "/about/support-partners";

  const useSplitHero =
    isWhoWeAre || isWayWeWork || isWhereWeWork || isFinancialReports || isFcraInformation;
  const showHeroDescription =
    isWhoWeAre || isWayWeWork || isFinancialReports || isFcraInformation;

  return (
    <>
      <Helmet>
        <title>{page.title} | LAYA</title>
        <meta name="description" content={page.description} />
      </Helmet>
      <MainLayout>
        <PageHero
          label={heroLabels[location.pathname]}
          title={page.title}
          subtitle={page.subtitle}
          description={showHeroDescription ? page.description : undefined}
          image={useSplitHero ? page.image : undefined}
          imageAlt={page.title}
          centered={isGovernance || isSupportPartners}
        />

        {/* Who We Are - Premium Timeline Layout */}
        {isWhoWeAre ? (
          <div>
            <section className="section-padding bg-section-alt border-b border-border">
              <div className="container-narrow mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-3xl mx-auto text-center mb-10"
                >
                  <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed">
                    {"intro" in page ? page.intro : page.description}
                  </p>
                </motion.div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {[
                    { value: "1985", label: "Founded", icon: Sparkles },
                    { value: "7", label: "Journey Phases", icon: Target },
                    { value: "6", label: "Program Areas", icon: Leaf },
                    { value: "37+", label: "Years of Service", icon: Trees },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="rounded border border-border bg-card p-4 md:p-5 text-center shadow-sm hover:shadow-md hover:border-primary/25 transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <stat.icon className="h-4 w-4 text-primary" />
                      </div>
                      <p className="font-heading text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs md:text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section className="section-padding">
              <div className="container-narrow mx-auto">
                <SectionHeading
                  title="Our Journey"
                  subtitle="Four decades of accompaniment with Adivasi communities in the Eastern Ghats"
                />
                <div className="relative max-w-4xl mx-auto">
                  <div className="absolute left-[11px] md:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30 md:-translate-x-px" />

                  {"timeline" in page &&
                    page.timeline?.map((item, index) => (
                      <motion.div
                        key={item.phase}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.06 }}
                        className={`relative flex flex-col md:flex-row gap-6 mb-10 last:mb-0 ${
                          index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                      >
                        <div
                          className={`absolute left-0 md:left-1/2 w-[23px] h-[23px] rounded-full border-[3px] border-background bg-primary shadow-md md:-translate-x-1/2 z-10`}
                        />

                        <div
                          className={`ml-9 md:ml-0 md:w-[calc(50%-2rem)] ${
                            index % 2 === 0 ? "md:pr-0 md:mr-auto" : "md:pl-0 md:ml-auto"
                          }`}
                        >
                          <article
                            className={`rounded border border-border bg-card p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 ${timelineAccents[index % timelineAccents.length]}`}
                          >
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="px-3 py-1 rounded-full text-xs font-semibold font-body bg-primary text-primary-foreground">
                                {item.years}
                              </span>
                              <span className="text-xs font-medium text-muted-foreground font-body">
                                {item.phase}
                              </span>
                            </div>
                            <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                              {item.description}
                            </p>
                            <ul className="space-y-2">
                              {item.highlights.map((highlight) => (
                                <li
                                  key={highlight}
                                  className="flex items-start gap-2 text-sm text-foreground/85 font-body"
                                >
                                  <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </article>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </section>

            <section className="section-padding bg-section-alt">
              <div className="container-narrow mx-auto">
                <SectionHeading
                  title="Our Program Areas"
                  subtitle="Six key focus areas driving our work with Adivasi communities"
                />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {"programAreas" in page &&
                    page.programAreas?.map((area, index) => {
                      const Icon = programAreaIcons[area.icon as keyof typeof programAreaIcons] ?? Leaf;
                      return (
                        <motion.article
                          key={area.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.07 }}
                          className="group rounded border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                        >
                          <div className="w-11 h-11 rounded bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="font-heading text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {area.title}
                          </h3>
                          <p className="text-sm text-muted-foreground font-body leading-relaxed">
                            {area.description}
                          </p>
                        </motion.article>
                      );
                    })}
                </div>
              </div>
            </section>

            <section className="section-padding">
              <div className="container-narrow mx-auto grid md:grid-cols-2 gap-6">
                {"leadership" in page && page.leadership && (
                  <motion.article
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded border border-border bg-card p-7 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-11 h-11 rounded bg-primary/10 flex items-center justify-center mb-5">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                      {page.leadership.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5">
                      {page.leadership.description}
                    </p>
                    <ul className="space-y-2.5">
                      {page.leadership.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-foreground font-body">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                )}

                {"futureVision" in page && page.futureVision && (
                  <motion.article
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded border border-primary/25 bg-primary/5 p-7 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-11 h-11 rounded bg-primary/15 flex items-center justify-center mb-5">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                      {page.futureVision.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5">
                      {page.futureVision.description}
                    </p>
                    <ul className="space-y-2.5">
                      {page.futureVision.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-foreground font-body">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                )}
              </div>
            </section>

            <section className="section-padding bg-primary">
              <div className="container-narrow mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                    Explore Our Work
                  </h2>
                  <p className="text-primary-foreground/80 font-body max-w-xl mx-auto mb-6">
                    Learn about our programs, field presence, and impact across the Eastern Ghats.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      asChild
                    >
                      <Link to="/programs">What We Do</Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                      asChild
                    >
                      <Link to="/about/where-we-work">Where We Work</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>
        ) : isWayWeWork ? (
          <div>
            <section className="section-padding bg-section-alt border-b border-border">
              <div className="container-narrow mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {[
                    { value: "3", label: "Core Pillars", icon: Layers },
                    { value: "Unit", label: "Based Approach", icon: Users },
                    { value: "100%", label: "Transparency", icon: Eye },
                    { value: "CBO", label: "Partnership Model", icon: Globe },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="rounded border border-border bg-card p-4 md:p-5 text-center shadow-sm hover:shadow-md hover:border-primary/25 transition-all duration-300"
                    >
                      <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <stat.icon className="h-4 w-4 text-primary" />
                      </div>
                      <p className="font-heading text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs md:text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section className="section-padding">
              <div className="container-narrow mx-auto space-y-10">
                {"sections" in page &&
                  page.sections?.map((section, sectionIndex) => {
                    const Icon = wayWeWorkIcons[sectionIndex] ?? Layers;
                    const isMonitoring = sectionIndex === 2;

                    return (
                      <motion.article
                        key={section.heading}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: sectionIndex * 0.08 }}
                        className="rounded border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="bg-primary px-6 py-5 md:px-8">
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded bg-primary-foreground/15 flex items-center justify-center shrink-0">
                              <Icon className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div>
                              <p className="text-xs font-body font-medium text-primary-foreground/70 uppercase tracking-wider">
                                Pillar {sectionIndex + 1}
                              </p>
                              <h2 className="font-heading text-xl md:text-2xl font-bold text-primary-foreground">
                                {section.heading}
                              </h2>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 md:p-8">
                          <p className="text-muted-foreground font-body leading-relaxed mb-6 max-w-3xl">
                            {section.paragraph}
                          </p>

                          {isMonitoring ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {section.bullets?.map((bullet, i) => (
                                <div
                                  key={bullet}
                                  className="flex items-start gap-3 p-4 rounded border border-border bg-muted/40 hover:bg-muted/70 transition-colors"
                                >
                                  <div className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center shrink-0 text-sm font-bold font-heading">
                                    {i + 1}
                                  </div>
                                  <p className="text-sm text-foreground font-body leading-relaxed">{bullet}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ul className="grid sm:grid-cols-2 gap-3">
                              {section.bullets?.map((bullet) => (
                                <li
                                  key={bullet}
                                  className="flex items-start gap-2.5 p-3 rounded border border-border bg-background"
                                >
                                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                  <span className="text-sm text-foreground font-body leading-relaxed">{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.article>
                    );
                  })}
              </div>
            </section>

            <section className="section-padding bg-section-alt">
              <div className="container-narrow mx-auto">
                {"points" in page &&
                  page.points?.map((point) => (
                    <motion.div
                      key={point}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 rounded border border-primary/20 bg-primary/5 p-6 md:p-8"
                    >
                      <div className="w-11 h-11 rounded bg-primary/15 flex items-center justify-center shrink-0">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                          Monitoring Foundation
                        </h3>
                        <p className="text-sm text-muted-foreground font-body leading-relaxed">{point}</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </section>

            <section className="section-padding bg-primary">
              <div className="container-narrow mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                    Governance & Accountability
                  </h2>
                  <p className="text-primary-foreground/80 font-body max-w-xl mx-auto mb-6">
                    Learn about LAYA&apos;s governance structure, board, and financial transparency.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      asChild
                    >
                      <Link to="/about/governance">Our Governance</Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                      asChild
                    >
                      <Link to="/about/financial-reports">Financial Reports</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>
        ) : isFinancialReports ? (
          <div>
            <section className="section-padding bg-section-alt border-b border-border">
              <div className="container-narrow mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
                  {[
                    { value: "6", label: "Annual Reports", icon: FileText },
                    { value: "2019", label: "Earliest Report", icon: Target },
                    { value: "FCRA", label: "Compliant", icon: ShieldCheck },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="rounded border border-border bg-card p-4 md:p-5 text-center shadow-sm"
                    >
                      <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <stat.icon className="h-4 w-4 text-primary" />
                      </div>
                      <p className="font-heading text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs md:text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section className="section-padding">
              <div className="container-narrow mx-auto">
                <SectionHeading
                  title="Foreign Contribution Reports"
                  subtitle="Download year-wise annual disclosure documents (2019–2025)"
                />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {"reports" in page &&
                    page.reports?.map((report, index) => (
                      <motion.a
                        key={report.year}
                        href={report.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.06 }}
                        className="group flex flex-col rounded border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold font-body mb-4">
                          FY {report.year}
                        </span>
                        <div className="w-12 h-12 rounded bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-heading text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {report.label}
                        </h3>
                        <p className="text-sm text-muted-foreground font-body mb-4 flex-1">
                          Annual financial disclosure document
                        </p>
                        <div className="flex items-center gap-2 text-sm font-semibold text-primary font-body pt-3 border-t border-border">
                          <Download className="h-4 w-4" />
                          <span className="group-hover:underline">View PDF</span>
                          <ExternalLink className="h-3.5 w-3.5 ml-auto opacity-60" />
                        </div>
                      </motion.a>
                    ))}
                </div>
              </div>
            </section>

            <section className="section-padding bg-section-alt">
              <div className="container-narrow mx-auto">
                {"points" in page &&
                  page.points?.map((point) => (
                    <motion.div
                      key={point}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 rounded border border-primary/20 bg-primary/5 p-6 md:p-8"
                    >
                      <div className="w-11 h-11 rounded bg-primary/15 flex items-center justify-center shrink-0">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                          Transparency Commitment
                        </h3>
                        <p className="text-sm text-muted-foreground font-body leading-relaxed">{point}</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </section>

            <section className="section-padding bg-primary">
              <div className="container-narrow mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                    FCRA Quarterly Receipts
                  </h2>
                  <p className="text-primary-foreground/80 font-body max-w-xl mx-auto mb-6">
                    View quarter-wise foreign contribution receipts as per Rule 13(b) of FCRA Amendment Rules, 2015.
                  </p>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    asChild
                  >
                    <Link to="/about/fcra-information">View FCRA Information</Link>
                  </Button>
                </motion.div>
              </div>
            </section>
          </div>
        ) : isFcraInformation ? (
          <div>
            <section className="section-padding">
              <div className="container-narrow mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded border border-border bg-card p-6 md:p-8 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded bg-primary/10 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-heading text-xl font-bold text-foreground">FCRA Registration</h2>
                  </div>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">
                        Registration Number
                      </dt>
                      <dd className="text-lg font-semibold text-foreground font-heading mt-1">
                        {"fcraRegistration" in page ? page.fcraRegistration.registrationNumber : "010350057"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">
                        Date of Registration
                      </dt>
                      <dd className="text-base text-foreground font-body mt-1">
                        {"fcraRegistration" in page ? page.fcraRegistration.dateOfRegistration : "28 February 1995"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">
                        Renewed for 5 years w.e.f.
                      </dt>
                      <dd className="text-base text-foreground font-body mt-1">
                        {"fcraRegistration" in page ? page.fcraRegistration.renewalDate : "01 October 2022"}
                      </dd>
                    </div>
                  </dl>
                </motion.article>

                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 }}
                  className="rounded border border-border bg-card p-6 md:p-8 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded bg-primary/10 flex items-center justify-center">
                      <Landmark className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-heading text-xl font-bold text-foreground">FCRA Bank</h2>
                  </div>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">
                        Name of the Bank
                      </dt>
                      <dd className="text-base font-semibold text-foreground font-body mt-1">
                        {"fcraBank" in page ? page.fcraBank.name : "State Bank of India"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">
                        Address
                      </dt>
                      <dd className="text-sm text-foreground font-body leading-relaxed mt-1">
                        {"fcraBank" in page
                          ? page.fcraBank.address
                          : "New Delhi Main Branch, FCRA Division, 11, Parliament Street, New Delhi - 110001"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">
                        Branch Code
                      </dt>
                      <dd className="text-base font-semibold text-foreground font-heading mt-1">
                        {"fcraBank" in page ? page.fcraBank.branchCode : "00691"}
                      </dd>
                    </div>
                  </dl>
                </motion.article>
                </div>

                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 }}
                className="mt-6"
              >
                <Link
                  to="/about/financial-reports"
                  className="group flex items-center justify-between gap-4 rounded border border-primary/25 bg-primary p-5 md:p-6 hover:bg-primary/90 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded bg-primary-foreground/15 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base md:text-lg font-bold text-primary-foreground">
                        Financial Statements
                      </h3>
                      <p className="text-sm text-primary-foreground/80 font-body">
                        Under Rule 13(a) of FCRA Amendment Rules, 2015
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-primary-foreground shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
              </div>
            </section>

            <section className="section-padding bg-section-alt">
              <div className="container-narrow mx-auto">
                <SectionHeading
                  title="Quarter-wise Receipts"
                  subtitle="Information on receipts into LAYA's FCRA Account as per Rule 13(b) of FCRA Amendment Rules, 2015"
                />

                {"quarterlyReceipts" in page &&
                  page.quarterlyReceipts?.map((yearData, yearIndex) => (
                    <motion.div
                      key={yearData.year}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: yearIndex * 0.08 }}
                      className="mb-8 last:mb-0"
                    >
                      <h3 className="font-heading text-xl font-bold text-foreground mb-4 px-1">
                        {yearData.year}
                      </h3>
                      <div className="space-y-3">
                        {yearData.quarters.map((quarter) => (
                          <details
                            key={quarter.name}
                            className="group rounded border border-border bg-card overflow-hidden shadow-sm"
                          >
                            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 bg-muted/40 hover:bg-muted/70 transition-colors [&::-webkit-details-marker]:hidden">
                              <div>
                                <p className="font-heading text-sm md:text-base font-semibold text-foreground">
                                  {quarter.name}
                                </p>
                                <p className="text-xs text-muted-foreground font-body mt-0.5">
                                  {quarter.receipts.length} receipt{quarter.receipts.length !== 1 ? "s" : ""}
                                </p>
                              </div>
                              <span className="text-xs font-body font-medium text-primary group-open:rotate-180 transition-transform">
                                ▼
                              </span>
                            </summary>
                            <div className="overflow-x-auto">
                              <table className="w-full min-w-[640px] text-sm">
                                <thead>
                                  <tr className="border-b border-border bg-background">
                                    <th className="text-left px-5 py-3 font-heading font-semibold text-foreground">
                                      Received From
                                    </th>
                                    <th className="text-right px-5 py-3 font-heading font-semibold text-foreground whitespace-nowrap">
                                      Amount (₹)
                                    </th>
                                    <th className="text-right px-5 py-3 font-heading font-semibold text-foreground whitespace-nowrap">
                                      Date of Receipt
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {quarter.receipts.map((receipt, receiptIndex) => (
                                    <tr
                                      key={`${receipt.donor}-${receipt.date}-${receiptIndex}`}
                                      className="border-b border-border last:border-0 hover:bg-muted/30"
                                    >
                                      <td className="px-5 py-3 text-foreground font-body leading-relaxed">
                                        {receipt.donor}
                                      </td>
                                      <td className="px-5 py-3 text-right font-semibold text-foreground font-body whitespace-nowrap">
                                        {receipt.amount}
                                      </td>
                                      <td className="px-5 py-3 text-right text-muted-foreground font-body whitespace-nowrap">
                                        {receipt.date}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </details>
                        ))}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </section>
          </div>
        ) : isGovernance ? (
          /* Governance - Premium Professional Layout */
          <div>
            {/* Governance Structure */}
            <section className="py-16 px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-slate-50 border border-slate-200 rounded p-8 md:p-10"
                >
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mb-4">Governance Structure</h2>
                  <p className="text-base text-gray-700 font-body leading-relaxed">
                    {page.description}
                  </p>
                </motion.div>
              </div>
            </section>

            {/* General Body */}
            <section className="py-16 px-4">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-10"
                >
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mb-3">General Body</h2>
                  <p className="text-gray-600 font-body">16 members from academic and development practice backgrounds</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {"generalBody" in page && page.generalBody?.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white border border-gray-200 rounded p-5 hover:shadow-md transition-shadow text-center"
                    >
                      {/* Profile Image Placeholder */}
                      <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="font-heading text-sm font-bold text-slate-900 mb-2">{member.name}</h3>
                      <p className="text-xs text-gray-600 font-body leading-relaxed">{member.role}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : isSupportPartners ? (
          /* Support Partners - Premium Professional Layout */
          <div>
            {/* Partners Grid */}
            <section className="py-16 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {"supportPartners" in page && page.supportPartners?.map((partner, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="bg-white rounded shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
                    >
                      {/* Logo Placeholder */}
                      <div className="h-32 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-b border-gray-100">
                        <div className="w-20 h-20 bg-white rounded shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-2xl font-bold text-blue-600">
                            {partner.name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h4 className="font-heading text-base font-bold text-slate-900 mb-2">{partner.name}</h4>
                        {partner.location && (
                          <p className="text-sm text-gray-500 font-body mb-4 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {partner.location}
                          </p>
                        )}
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 font-body">Contribution</span>
                            <span className="text-lg font-bold text-blue-600">{partner.amount}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : isWhereWeWork ? (
          <div>
            <section className="section-padding bg-earth-gradient border-b border-border">
              <div className="container-narrow mx-auto">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed text-center max-w-3xl mx-auto"
                >
                  {page.description}
                </motion.p>
                <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {[
                    { value: "5", label: "Field Locations", icon: MapPin },
                    { value: "4", label: "Districts Covered", icon: Navigation },
                    { value: "37+", label: "Years in Region", icon: Trees },
                    { value: "500+", label: "Villages Reached", icon: Mountain },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="rounded border border-border bg-card p-4 md:p-5 text-center shadow-sm"
                    >
                      <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <stat.icon className="h-4 w-4 text-primary" />
                      </div>
                      <p className="font-heading text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs md:text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section className="section-padding bg-section-alt">
              <div className="container-narrow mx-auto">
                <SectionHeading
                  title="Our Locations"
                  subtitle="Headquarters and field offices across Andhra Pradesh's tribal agency areas"
                />
                <div className="grid md:grid-cols-2 gap-5">
                  {"locations" in page &&
                    page.locations?.map((loc, index) => (
                      <motion.article
                        key={loc.name}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                        className={`group relative rounded border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                          loc.type === "Headquarters"
                            ? "border-primary/30 md:col-span-2"
                            : "border-border hover:border-primary/25"
                        }`}
                      >
                        {loc.type === "Headquarters" && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-nature-gradient" />
                        )}
                        <div className="p-6 md:p-7">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex items-start gap-4">
                              <div
                                className={`w-12 h-12 rounded flex items-center justify-center shrink-0 ${
                                  loc.type === "Headquarters" ? "bg-primary/15" : "bg-muted"
                                }`}
                              >
                                {loc.type === "Headquarters" ? (
                                  <Building2 className="h-5 w-5 text-primary" />
                                ) : (
                                  <MapPin className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              <div>
                                <span
                                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold font-body mb-2 ${
                                    loc.type === "Headquarters"
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-primary/10 text-primary"
                                  }`}
                                >
                                  {loc.type}
                                </span>
                                <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                  {loc.name}
                                </h3>
                              </div>
                            </div>
                            <span className="shrink-0 px-2.5 py-1 rounded bg-muted text-xs font-mono font-medium text-muted-foreground border border-border">
                              {loc.pincode}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3 pl-16">
                            {loc.address}
                          </p>
                          <div className="flex items-center gap-2 pl-16 text-sm font-body text-foreground/80">
                            <Navigation className="h-3.5 w-3.5 text-accent shrink-0" />
                            <span>{loc.district}, Andhra Pradesh</span>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                </div>
              </div>
            </section>

            <section className="section-padding">
              <div className="container-narrow mx-auto">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-sm font-body font-semibold tracking-widest uppercase text-primary mb-3">
                      Geographic Focus
                    </p>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {"coverage" in page ? page.coverage.title : "Eastern Ghats Region"}
                    </h2>
                    <p className="text-muted-foreground font-body leading-relaxed mb-6">
                      {"coverage" in page ? page.coverage.description : page.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {"coverage" in page &&
                        page.coverage.districts.map((district) => (
                          <span
                            key={district}
                            className="px-3 py-1.5 rounded-full text-sm font-body font-medium bg-card border border-border text-foreground"
                          >
                            {district}
                          </span>
                        ))}
                    </div>
                    {"points" in page &&
                      page.points?.map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-3 rounded border border-primary/20 bg-primary/5 p-4"
                        >
                          <Mountain className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <p className="text-sm text-foreground font-body leading-relaxed">{point}</p>
                        </div>
                      ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="rounded overflow-hidden shadow-xl border border-border aspect-[4/3]">
                      <img
                        src={referenceGalleryImages[4].src}
                        alt="Eastern Ghats landscape where LAYA works"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="font-heading text-lg font-semibold text-primary-foreground">
                          Eastern Ghats, Andhra Pradesh
                        </p>
                        <p className="text-sm text-primary-foreground/80 font-body mt-1">
                          Home to diverse Adivasi communities and ecosystems
                        </p>
                      </div>
                    </div>
                    <div className="absolute -z-10 -bottom-4 -right-4 w-2/3 h-2/3 rounded bg-primary/10" />
                  </motion.div>
                </div>
              </div>
            </section>

            <section className="section-padding bg-primary">
              <div className="container-narrow mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                    Visit or Connect With Us
                  </h2>
                  <p className="text-primary-foreground/80 font-body max-w-xl mx-auto mb-6">
                    Reach out to our Visakhapatnam resource centre for partnerships, field visits, or
                    general enquiries.
                  </p>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    asChild
                  >
                    <Link to="/contact">Contact LAYA</Link>
                  </Button>
                </motion.div>
              </div>
            </section>
          </div>
        ) : (
          /* Default Layout for Other Pages */
          <section className="section-padding">
            <div className="container-narrow mx-auto max-w-4xl">
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed">
                {page.description}
              </motion.p>
              <div className="mt-8 space-y-6">
                {"sections" in page && page.sections?.map((section) => (
                  <article key={`${page.title}-${section.heading ?? section.paragraph ?? "section"}`} className="rounded border border-border bg-card p-6">
                    {section.heading && <h2 className="font-heading text-xl md:text-2xl text-foreground mb-3">{section.heading}</h2>}
                    {section.image && (
                      <img
                        src={section.image}
                        alt={section.heading ?? page.title}
                        loading="lazy"
                        className="mb-4 h-48 w-full rounded object-cover"
                      />
                    )}
                    {section.paragraph && <p className="text-foreground/90 font-body text-base md:text-lg leading-relaxed">{section.paragraph}</p>}
                    {section.bullets && (
                      <ul className="mt-4 space-y-2">
                        {section.bullets.map((item) => (
                          <li key={item} className="flex gap-2 text-foreground font-body text-base md:text-lg leading-relaxed break-words">
                            <span className="text-accent">★</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
              <div className="mt-8 grid gap-4">
                {"points" in page && page.points?.map((point) => (
                  <article key={point} className="rounded border border-border bg-card p-5">
                    <p className="text-foreground font-body text-base md:text-lg leading-relaxed break-words">{point}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </MainLayout>
    </>
  );
};

export default AboutCategory;
