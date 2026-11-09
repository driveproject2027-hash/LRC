/**
 * LAYA Content Store & State Management
 * ---------------------------------------------------------------------------
 * Centralized, reactive content store that enables editing all written copy
 * across the entire website via the Admin Dashboard, with real-time updates
 * across all pages and persistent storage (localStorage + optional server sync).
 */

import {
  chronicle as defaultChronicle,
  fourDecades as defaultFourDecades,
  hero as defaultHero,
  impact as defaultHomeImpact,
  ourWork as defaultOurWork,
  stories as defaultHomeStories,
  support as defaultSupport,
  voices as defaultVoices,
} from "@/content/home";

import {
  executiveDirectorMessage as defaultExecutiveDirectorMessage,
  fcraInformation as defaultFcraInformation,
  financialReports as defaultFinancialReports,
  futureVision as defaultFutureVision,
  governance as defaultGovernance,
  journeyPhases as defaultJourneyPhases,
  supportPartners as defaultSupportPartners,
  wayWeWork as defaultWayWeWork,
  whereWeWork as defaultWhereWeWork,
  whoWeAre as defaultWhoWeAre,
} from "@/content/about";

import { PROGRAMMES as defaultProgrammes, type Programme } from "@/content/programmes";

import {
  BANK_DOMESTIC as defaultBankDomestic,
  BANK_FOREIGN as defaultBankForeign,
  CONTACT_DETAILS as defaultContactDetails,
  CONTACT_HEADING as defaultContactHeading,
  DONATE_STATEMENTS as defaultDonateStatements,
  FOOTER_IDENTITY as defaultFooterIdentity,
  SOCIAL_LINKS as defaultSocialLinks,
} from "@/content/contact";

import { FIELD_NOTES as defaultFieldNotes } from "@/content/stories";
import { HEADLINE_STATISTICS as defaultHeadlineStats, IMPACT_GEOGRAPHY as defaultImpactGeography } from "@/content/impact";

const STORAGE_KEY = "laya_cms_content_v2";
const EVENT_NAME = "laya-content-updated";

export interface WebsiteContentState {
  version: number;
  lastUpdated: string;
  home: {
    hero: {
      eyebrow: string;
      headline: string;
      supporting: string;
      primaryCta: { label: string; to: string };
      secondaryCta: { label: string; to: string };
      figures: Array<{ value: string; label: string }>;
      slides: Array<{
        eyebrow: string;
        headline: string;
        supporting: string;
        location?: string;
        image?: { src: string; alt: string; caption: string };
        primaryCta?: { label: string; to: string };
        secondaryCta?: { label: string; to: string };
      }>;
    };
    chronicle: {
      eyebrow: string;
      title: string;
      heading?: string;
      lead: string;
      intro?: string;
      cta?: { label: string; to: string };
      documents?: any[];
    };
    fourDecades: {
      eyebrow: string;
      title: string;
      heading?: string;
      lead: string;
      since?: string;
      cta?: { label: string; to: string };
      image?: any;
      paragraphs?: string[];
      principles?: Array<{ title: string; description: string }>;
      stats: Array<{ number: string; label: string; desc: string }>;
      values?: Array<{ title: string; desc: string }>;
    };
    ourWork: {
      eyebrow: string;
      title: string;
      heading?: string;
      lead: string;
      intro?: string;
      programmes?: any[];
    };
    stories: {
      eyebrow: string;
      title: string;
      heading?: string;
      lead: string;
      intro?: string;
      items?: any[];
    };
    impact: {
      eyebrow: string;
      title: string;
      heading?: string;
      lead: string;
      intro?: string;
      metrics?: any[];
    };
    voices: {
      eyebrow: string;
      title: string;
      heading?: string;
      lead?: string;
      items: Array<{
        quote: string;
        attribution?: string;
        name?: string;
        role: string;
        location?: string;
      }>;
    };
    support: {
      eyebrow: string;
      title: string;
      heading?: string;
      lead?: string;
      intro?: string;
      body?: string;
      primaryCta?: { label: string; to: string };
      secondaryCta?: { label: string; to: string };
      assurances?: string[];
    };
  };
  about: {
    whoWeAre: {
      eyebrow: string;
      title: string;
      subtitle: string;
      description: string;
      intro?: string;
    };
    executiveDirectorMessage: {
      eyebrow: string;
      title: string;
      heading?: string;
      quote: string;
      lead: string;
      statement?: string;
      signoff: {
        name: string;
        title: string;
        year: string;
      };
    };
    futureVision: {
      eyebrow: string;
      title: string;
      lead: string;
      description?: string;
      points: string[];
    };
    journeyPhases: Array<{
      phase: string;
      years: string;
      title: string;
      description: string;
      highlights: string[];
    }>;
    wayWeWork: {
      title: string;
      subtitle: string;
      description: string;
      points: string[];
    };
    whereWeWork: {
      title: string;
      subtitle: string;
      description: string;
      coverage?: any;
      headquarters?: any;
    };
    governance: {
      eyebrow: string;
      title: string;
      description: string;
      members: Array<{
        name: string;
        role: string;
        bio?: string;
      }>;
    };
    fcraInformation: {
      fcraRegistration: {
        registrationNumber: string;
        natureOfAssociation?: string;
        dateOfRegistration?: string;
        renewalDate?: string;
      };
      bankDetails: {
        bankName: string;
        address: string;
        branchCode?: string;
      };
    };
  };
  programmes: Array<{
    id: string | number;
    to: string;
    title: string;
    shortTitle?: string;
    subtitle?: string;
    lead?: string;
    description?: string;
    category?: string;
    heroEyebrow?: string;
    heroHeading?: string;
    heroLead?: string;
    overviewHeading?: string;
    overviewIntro?: string;
    glance?: Array<{ value: string; label: string; detail?: string }>;
    objectives?: string[];
    annualReportTheme?: string;
    fieldQuote?: { quote: string; author: string; location?: string };
    [key: string]: any;
  }>;
  stories: Array<{
    slug: string;
    title: string;
    subtitle?: string;
    author?: string;
    date?: string;
    readTime?: string;
    excerpt?: string;
    body?: string[] | string;
    [key: string]: any;
  }>;
  impact: {
    hero?: {
      eyebrow: string;
      title: string;
      lead: string;
    };
    headlineStatistics: Array<{
      value: string;
      suffix?: string;
      label: string;
      detail?: string;
    }>;
    provenanceNotice?: string;
    thematicHeading?: {
      eyebrow: string;
      title: string;
      intro: string;
    };
    geographyNarrative?: string;
  };
  donate?: {
    header?: {
      eyebrow: string;
      title: string;
      lead: string;
    };
    assurances?: string[];
  };
  publications?: {
    header?: {
      eyebrow: string;
      title: string;
      lead: string;
    };
  };
  contact: {
    details: {
      address: string;
      phone: string;
      phoneHref: string;
      email: string;
      emailHref: string;
      website: string;
      websiteHref: string;
    };
    heading: {
      eyebrow: string;
      title: string;
      lead: string;
    };
    bankDomestic: {
      accountName: string;
      accountNumber: string;
      bankName: string;
      branch: string;
      ifscCode: string;
    };
    bankForeign: {
      accountName: string;
      accountNumber: string;
      bankName: string;
      branch: string;
      swiftCode: string;
    };
  };
  footer: {
    identity: {
      name: string;
      tagline: string;
      description: string;
      meaning: string;
      founded: string;
    };
  };
}

/**
 * Build pure initial state from the codebase default content.
 */
export function getDefaultContent(): WebsiteContentState {
  return {
    version: 3,
    lastUpdated: new Date().toISOString(),
    home: {
      hero: {
        eyebrow: defaultHero.eyebrow,
        headline: defaultHero.headline,
        supporting: defaultHero.supporting,
        primaryCta: { ...defaultHero.primaryCta },
        secondaryCta: { ...defaultHero.secondaryCta },
        figures: (defaultHero.figures || []).map((f) => ({ ...f })),
        slides: (defaultHero.slides || []).map((s) => ({
          eyebrow: s.eyebrow,
          headline: s.headline,
          supporting: s.supporting,
          location: s.location,
          image: s.image ? { ...s.image } : undefined,
          primaryCta: s.primaryCta ? { ...s.primaryCta } : undefined,
          secondaryCta: s.secondaryCta ? { ...s.secondaryCta } : undefined,
        })),
      },
      chronicle: {
        eyebrow: defaultChronicle.eyebrow,
        title: defaultChronicle.heading,
        heading: defaultChronicle.heading,
        lead: defaultChronicle.intro,
        intro: defaultChronicle.intro,
        cta: { ...defaultChronicle.cta },
        documents: (defaultChronicle.documents || []).map((d) => ({ ...d })),
      },
      fourDecades: {
        eyebrow: defaultFourDecades.eyebrow,
        title: defaultFourDecades.heading,
        heading: defaultFourDecades.heading,
        lead: defaultFourDecades.paragraphs?.[0] || "",
        since: defaultFourDecades.since,
        cta: defaultFourDecades.cta ? { ...defaultFourDecades.cta } : { label: "Our Story", to: "/about" },
        image: defaultFourDecades.image ? { ...defaultFourDecades.image } : undefined,
        paragraphs: [...(defaultFourDecades.paragraphs || [])],
        principles: (defaultFourDecades.principles || []).map((p) => ({ ...p })),
        stats: [
          {
            number: "39+",
            label: "Years of Field Presence",
            desc: "Serving indigenous Adivasi communities since 1985",
          },
          {
            number: "185+",
            label: "Habitations Accompanied",
            desc: "Active community engagement across the Eastern Ghats",
          },
          {
            number: "40k+",
            label: "Community Members",
            desc: "Lives directly impacted across rights, health and ecology",
          },
        ],
      },
      ourWork: {
        eyebrow: defaultOurWork.eyebrow,
        title: defaultOurWork.heading,
        heading: defaultOurWork.heading,
        lead: defaultOurWork.intro,
        intro: defaultOurWork.intro,
        programmes: (defaultOurWork.programmes || []).map((p) => ({ ...p })),
      },
      stories: {
        eyebrow: defaultHomeStories.eyebrow,
        title: defaultHomeStories.heading,
        heading: defaultHomeStories.heading,
        lead: defaultHomeStories.intro,
        intro: defaultHomeStories.intro,
        items: (defaultHomeStories.items || []).map((i) => ({ ...i })),
      },
      impact: {
        eyebrow: defaultHomeImpact.eyebrow,
        title: defaultHomeImpact.heading,
        heading: defaultHomeImpact.heading,
        lead: defaultHomeImpact.intro,
        intro: defaultHomeImpact.intro,
        metrics: (defaultHomeImpact.metrics || []).map((m) => ({ ...m })),
      },
      voices: {
        eyebrow: defaultVoices.eyebrow,
        title: defaultVoices.heading,
        heading: defaultVoices.heading,
        items: (defaultVoices.items || []).map((v) => ({
          quote: v.quote,
          attribution: (v as any).attribution,
          name: (v as any).attribution || (v as any).name || "",
          role: v.role,
          location: v.location,
        })),
      },
      support: {
        eyebrow: defaultSupport.eyebrow,
        title: defaultSupport.heading,
        heading: defaultSupport.heading,
        lead: defaultSupport.intro || defaultSupport.body,
        intro: defaultSupport.intro,
        body: defaultSupport.body,
        primaryCta: { ...defaultSupport.primaryCta },
        secondaryCta: { ...defaultSupport.secondaryCta },
        assurances: [...defaultSupport.assurances],
      },
    },
    about: {
      whoWeAre: {
        eyebrow: "ABOUT LAYA",
        title: defaultWhoWeAre.title,
        subtitle: defaultWhoWeAre.subtitle,
        description: defaultWhoWeAre.description,
        intro: defaultWhoWeAre.intro,
      },
      executiveDirectorMessage: {
        eyebrow: "Leadership Message",
        title: defaultExecutiveDirectorMessage.heading,
        heading: defaultExecutiveDirectorMessage.heading,
        quote: defaultExecutiveDirectorMessage.perspectiveQuote?.quote || "",
        lead: defaultExecutiveDirectorMessage.statement,
        statement: defaultExecutiveDirectorMessage.statement,
        signoff: {
          name: defaultExecutiveDirectorMessage.director,
          title: defaultExecutiveDirectorMessage.title,
          year: defaultExecutiveDirectorMessage.date,
        },
      },
      futureVision: {
        eyebrow: "Looking Ahead",
        title: defaultFutureVision.title,
        lead: defaultFutureVision.description,
        description: defaultFutureVision.description,
        points: [...(defaultFutureVision.points || [])],
      },
      journeyPhases: (defaultJourneyPhases || []).map((p) => ({
        phase: p.phase,
        years: p.years,
        title: p.title,
        description: p.description,
        highlights: [...(p.highlights || [])],
      })),
      wayWeWork: {
        title: defaultWayWeWork.title,
        subtitle: defaultWayWeWork.subtitle,
        description: defaultWayWeWork.description,
        points: [...(defaultWayWeWork.points || [])],
      },
      whereWeWork: {
        title: defaultWhereWeWork.title,
        subtitle: defaultWhereWeWork.subtitle,
        description: defaultWhereWeWork.description,
        coverage: { ...defaultWhereWeWork.coverage },
        headquarters: { ...defaultWhereWeWork.headquarters },
      },
      governance: {
        eyebrow: "Governance & Board",
        title: defaultGovernance.title,
        description: defaultGovernance.description,
        members: (defaultGovernance.generalBody || []).map((m) => ({
          name: m.name,
          role: m.role,
          bio: "",
        })),
      },
      fcraInformation: {
        fcraRegistration: {
          registrationNumber:
            defaultFcraInformation.fcraRegistration.registrationNumber,
          natureOfAssociation: "Social",
          dateOfRegistration:
            defaultFcraInformation.fcraRegistration.dateOfRegistration,
          renewalDate: defaultFcraInformation.fcraRegistration.renewalDate,
        },
        bankDetails: {
          bankName: defaultFcraInformation.fcraBank.name,
          address: defaultFcraInformation.fcraBank.address,
          branchCode: defaultFcraInformation.fcraBank.branchCode,
        },
      },
    },
    programmes: (defaultProgrammes || []).map((p) => {
      const statsList = Array.isArray(p.stats)
        ? p.stats.map((s: any) => ({
            value: s.value || "",
            label: s.label || "",
            detail: s.desc || s.detail || "",
          }))
        : Array.isArray(p.glance)
        ? p.glance.map((g: any) => ({
            value: g.value || "",
            label: g.label || "",
            detail: g.detail || g.desc || "",
          }))
        : [];

      const initiatives = Array.isArray(p.annualReport2026?.keyInitiatives)
        ? [...p.annualReport2026.keyInitiatives]
        : Array.isArray(p.objectives)
        ? [...p.objectives]
        : [];

      return {
        id: p.id,
        to: p.to,
        title: p.title || "",
        shortTitle: p.shortTitle || p.title || "",
        subtitle: p.subtitle || p.shortTitle || "",
        lead: p.heroLead || p.summary || p.lead || "",
        description: p.overviewIntro || p.context || p.description || "",
        category: p.category || "",
        heroEyebrow: p.heroEyebrow || `Our Work · ${p.shortTitle || p.title}`,
        heroHeading: p.heroHeading || p.title || "",
        heroLead: p.heroLead || p.summary || "",
        overviewHeading: p.overviewHeading || `${p.shortTitle || p.title} in Numbers & Reach`,
        overviewIntro: p.overviewIntro || p.context || "",
        glance: statsList,
        objectives: initiatives,
        annualReportTheme: p.annualReport2026?.themeTitle || p.title || "",
        fieldQuote: p.annualReport2026?.fieldQuote
          ? { ...p.annualReport2026.fieldQuote }
          : undefined,
      };
    }),
    stories: (defaultFieldNotes || []).map((n) => ({
      slug: n.slug,
      title: n.title,
      subtitle: n.subtitle,
      author: n.author,
      date: n.date,
      readTime: n.readTime,
      excerpt: n.excerpt,
      body: Array.isArray(n.body)
        ? [...n.body]
        : typeof n.body === "string" && n.body
        ? [n.body]
        : [],
    })),
    impact: {
      hero: {
        eyebrow: "Evidence & Outcomes · Eastern Ghats",
        title: "Four Decades of Community-Led Transformation",
        lead: "Since 1985, LAYA has accompanied Adivasi communities across the Scheduled Areas of Andhra Pradesh. Our work is grounded in constitutional rights, indigenous agro-biodiversity, community herbal medicine, and youth leadership—fostering self-reliance rather than dependency.",
      },
      headlineStatistics: (defaultHeadlineStats || []).map((s) => ({ ...s })),
      provenanceNotice:
        "Data Provenance Notice: These organisation-wide figures are drawn from LAYA's institutional charters, project activity ledgers, and audited annual reports. Detailed programme breakdowns with specific units and scopes are documented below.",
      thematicHeading: {
        eyebrow: "Thematic Reach",
        title: "How LAYA's Programmes Create Structural Change",
        intro:
          "Verified data and field outcomes across our five core thematic areas. Each statistic reflects real community accompaniment rather than theoretical estimates.",
      },
      geographyNarrative: defaultImpactGeography.narrative,
    },
    donate: {
      header: {
        eyebrow: "Support LAYA",
        title: "Partner in Lasting Change",
        lead: "Direct contributions enable community empowerment, sustainable agriculture, and indigenous rights advocacy across the Eastern Ghats.",
      },
      assurances: [
        "Registered under FCRA (No. 010350057)",
        "Donations eligible for tax exemption under Section 80G",
        "Direct bank transfer — 100% reaches programmes",
      ],
    },
    publications: {
      header: {
        eyebrow: "Knowledge & Resources",
        title: "Publications & Field Documentation",
        lead: "Four decades of field research, policy briefs, participatory training modules, and documented community voices from the Eastern Ghats.",
      },
    },
    contact: {
      details: { ...defaultContactDetails },
      heading: { ...defaultContactHeading },
      bankDomestic: { ...defaultBankDomestic },
      bankForeign: { ...defaultBankForeign },
    },
    footer: {
      identity: { ...defaultFooterIdentity },
    },
  };
}

let cachedContent: WebsiteContentState | null = null;
const listeners = new Set<() => void>();

/**
 * Deep merge helper to layer saved overrides onto code defaults.
 */
function deepMerge(target: any, source: any): any {
  if (!source || typeof source !== "object") return target;
  if (!target || typeof target !== "object") return source;

  if (Array.isArray(source)) {
    return source.map((item) =>
      typeof item === "object" && item !== null ? { ...item } : item
    );
  }

  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      key in target &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

/**
 * Retrieve the current active content state.
 */
export function getLiveContent(): WebsiteContentState {
  if (cachedContent) return cachedContent;

  const defaults = getDefaultContent();

  if (typeof window === "undefined" || !window.localStorage) {
    return defaults;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      cachedContent = defaults;
      return defaults;
    }
    const parsed = JSON.parse(raw);
    const merged = deepMerge(defaults, parsed);

    // Merge programme defaults if user has sparse programme entries
    if (Array.isArray(merged.programmes)) {
      merged.programmes = merged.programmes.map((p: any, idx: number) => {
        const defaultProg =
          defaults.programmes[idx] ||
          defaults.programmes.find((dp) => String(dp.id) === String(p.id));
        return {
          ...defaultProg,
          ...p,
          heroHeading: p.heroHeading || defaultProg?.heroHeading || p.title || "",
          heroLead: p.heroLead || defaultProg?.heroLead || p.lead || "",
          overviewHeading: p.overviewHeading || defaultProg?.overviewHeading || "",
          overviewIntro: p.overviewIntro || defaultProg?.overviewIntro || "",
          glance:
            Array.isArray(p.glance) && p.glance.length > 0
              ? p.glance
              : defaultProg?.glance || [],
          objectives:
            Array.isArray(p.objectives) && p.objectives.length > 0
              ? p.objectives
              : defaultProg?.objectives || [],
        };
      });
    }

    // Migrate v2 or older: clear fake hero reach figures and synchronize hero headline/eyebrow with Slide 1
    if (!parsed.version || parsed.version < 3) {
      if (
        Array.isArray(merged.home?.hero?.figures) &&
        (merged.home.hero.figures.length === 3 &&
          merged.home.hero.figures.some(
            (f: any) =>
              f.label?.includes("Villages Reached") ||
              f.label?.includes("Years of Service") ||
              f.label?.includes("Lives Impacted")
          ))
      ) {
        merged.home.hero.figures = [];
      }
      if (merged.home?.hero?.eyebrow === "The LAYA Chronicle") {
        merged.home.hero.eyebrow = defaults.home.hero.eyebrow;
      }
      if (merged.home?.hero?.headline === "Standing with Adivasi Communities") {
        merged.home.hero.headline = defaults.home.hero.headline;
      }
      merged.version = 3;
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch (_) {}
    }

    cachedContent = merged;
    return cachedContent!;
  } catch (err) {
    console.error("Failed to parse cached website content, using defaults:", err);
    cachedContent = defaults;
    return defaults;
  }
}

/**
 * Persist content state to localStorage and notify listeners.
 */
function persistAndNotify(content: WebsiteContentState): void {
  content.lastUpdated = new Date().toISOString();
  cachedContent = content;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: content }));
    } catch (err) {
      console.error("Failed to write content to localStorage:", err);
    }

    // Try optional sync to server
    try {
      fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      }).catch(() => {});
    } catch {}
  }

  listeners.forEach((fn) => fn());
}

/**
 * Update a specific top-level section of the website content.
 */
export function updateSection<K extends keyof WebsiteContentState>(
  section: K,
  partialData: Partial<WebsiteContentState[K]>
): void {
  const current = getLiveContent();
  const updatedSection =
    typeof current[section] === "object" && !Array.isArray(current[section])
      ? { ...current[section], ...partialData }
      : partialData;

  const updated: WebsiteContentState = {
    ...current,
    [section]: updatedSection,
  };

  persistAndNotify(updated);
}

/**
 * Update full content state.
 */
export function updateFullContent(newContent: WebsiteContentState): void {
  persistAndNotify(newContent);
}

/**
 * Reset a single section back to code defaults.
 */
export function resetSection(section: keyof WebsiteContentState): void {
  const defaults = getDefaultContent();
  const current = getLiveContent();

  const updated: WebsiteContentState = {
    ...current,
    [section]: defaults[section],
  };

  persistAndNotify(updated);
}

/**
 * Reset all written content back to factory code defaults.
 */
export function resetAllContent(): void {
  const defaults = getDefaultContent();
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}

    fetch("/api/content/reset", { method: "POST" }).catch(() => {});
  }
  persistAndNotify(defaults);
}

/**
 * Export current content as a formatted JSON string for download/backup.
 */
export function exportContentJson(): string {
  return JSON.stringify(getLiveContent(), null, 2);
}

/**
 * Import a JSON backup into the CMS content store.
 */
export function importContentJson(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== "object") return false;
    const defaults = getDefaultContent();
    const merged = deepMerge(defaults, parsed);
    persistAndNotify(merged);
    return true;
  } catch (err) {
    console.error("Failed to import CMS content JSON:", err);
    return false;
  }
}

/**
 * Check if the content has user modifications.
 */
export function isContentModified(): boolean {
  if (typeof window === "undefined" || !window.localStorage) return false;
  try {
    return !!window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
}

/**
 * Subscribe to content changes (e.g. from React components).
 */
export function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  if (typeof window !== "undefined") {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        cachedContent = null;
        listeners.forEach((fn) => fn());
      }
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener(EVENT_NAME, listener);

    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(EVENT_NAME, listener);
    };
  }

  return () => {
    listeners.delete(listener);
  };
}
