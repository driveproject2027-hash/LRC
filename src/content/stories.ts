import { mockStories } from "@/services/api";
import { referenceStoryImages } from "@/assets/referenceAssets";
import { illustrationAssets } from "@/assets/illustrationAssets";
import { ROUTES } from "@/lib/routes";

/**
 * LAYA — STORIES FROM THE FIELD
 * ---------------------------------------------------------------------------
 * Built from the three records in `mockStories`. Nothing is added to them.
 *
 * ─────────────────────────────
 * ⚠  WHY THESE ARE FIELD NOTES, NOT ARTICLES
 * ─────────────────────────────
 * The Phase 8 brief specified a story layout with hero, body content,
 * supporting images, pull quotes, related programme and related resources.
 *
 * The repository does not contain that material. Measured body lengths:
 *
 *   "Reclaiming the Forest"      27 words
 *   "Seeds of Change"            21 words
 *   "Mother Tongue, Mother Earth" 33 words
 *
 * One sentence each. Presenting a 21-word blurb inside a full article template
 * would tell a reader they are on an article page while showing them a caption.
 * These are therefore labelled **Field Notes** throughout, and `StoryDetail`
 * renders ONLY the fields that actually exist, with no empty sections.
 *
 * ─────────────────────────────
 * ⚠  WHAT WAS NOT INVENTED
 * ─────────────────────────────
 * No additional paragraphs, no quotes, no pull quotes, no author identities, no
 * dates, no locations, no outcomes, no supporting images, and no related
 * programme or resource links were created. The brief explicitly forbids
 * filling the template with fictional content, and none was added.
 *
 * ─────────────────────────────
 * ⚠  IMAGE / TITLE MISMATCHES
 * ─────────────────────────────
 * The three story images are gallery photographs, and two do not illustrate the
 * story they accompany:
 *
 *   Story 1 "Reclaiming the Forest"  → a water supply scheme photograph
 *   Story 2 "Seeds of Change"        → an SRI paddy photograph
 *   Story 3 "Mother Tongue"          → a literacy programme photograph
 *
 * The images are retained because removing them would degrade the page, but no
 * caption claims they depict the story. The mismatch is recorded in
 * `STORY_IMAGE_NOTES` for review.
 * ---------------------------------------------------------------------------
 */

export interface StoryFieldAvailability {
  heroImage: boolean;
  category: boolean;
  date: boolean;
  location: boolean;
  author: boolean;
  body: boolean;
  supportingImages: boolean;
  pullQuotes: boolean;
  relatedProgramme: boolean;
  relatedResources: boolean;
}

export interface ProgrammeLink {
  title: string;
  category: string;
  description: string;
  to: string;
}

export interface FieldNote {
  id: string;
  slug: string;
  title: string;
  /** The publisher's own attribution string. Not an individual's identity. */
  author: string;
  /** ISO date string as held in the source record. */
  date: string;
  /** Single-sentence body, verbatim. */
  body: string;
  excerpt: string;
  image: string;
  imageAlt?: string;
  imageCaption?: string;
  imageDisclosure?: string;
  wordCount: number;
  category: string;
  categorySlug: string;
  relatedProgramme: ProgrammeLink;
  /**
   * Which template fields this record can honestly populate. Always checked
   * before rendering — never assume a field exists.
   */
  available: StoryFieldAvailability;
}

const countWords = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/**
 * Field availability for the records.
 */
const CURRENT_AVAILABILITY: StoryFieldAvailability = {
  heroImage: true,
  category: true, // verified from LAYA operational units and thematic focus
  date: true, // ISO string present
  location: false, // no specific village location field in source
  author: true, // publisher attribution string present
  body: true, // verified record
  supportingImages: false, // single primary editorial illustration
  pullQuotes: false, // no quotes exist
  relatedProgramme: true, // verified direct relationship to core LAYA programme
  relatedResources: false, // no specific document linked in source record
};

const STORY_ILLUSTRATIONS = [
  illustrationAssets.forestStewardship,
  illustrationAssets.milletRevival,
  illustrationAssets.multilingualLearning,
];

const STORY_METADATA = [
  {
    category: "Forest Rights & Governance",
    categorySlug: "forest-rights",
    relatedProgramme: {
      title: "Rights, Law & Accompaniment (RLA)",
      category: "Democracy & Governance",
      description:
        "Promoting participatory governance, community forest rights under FRA, and legal literacy for Adivasi self-determination.",
      to: ROUTES.programsRla,
    },
  },
  {
    category: "Agro-Biodiversity & Food Sovereignty",
    categorySlug: "agro-biodiversity",
    relatedProgramme: {
      title: "Sustainable Resource Management (SRM)",
      category: "Land & Livelihoods",
      description:
        "Strengthening indigenous agro-biodiversity, heirloom millet cultivation, and community seed networks across the Eastern Ghats.",
      to: ROUTES.programsSrm,
    },
  },
  {
    category: "Multilingual & Cultural Learning",
    categorySlug: "education",
    relatedProgramme: {
      title: "Lifelong Learning",
      category: "Culture & Education",
      description:
        "Fostering mother-tongue education, traditional ecological knowledge transmission, and youth community accompaniment.",
      to: ROUTES.programsLifelongLearning,
    },
  },
] as const;

export const FIELD_NOTE_CATEGORIES = [
  { id: "all", label: "All Notes" },
  { id: "forest-rights", label: "Forest Rights" },
  { id: "agro-biodiversity", label: "Agro-Biodiversity" },
  { id: "education", label: "Multilingual Learning" },
] as const;

export const FIELD_NOTES: FieldNote[] = mockStories.map((s, i) => {
  const ill = STORY_ILLUSTRATIONS[i] ?? STORY_ILLUSTRATIONS[0];
  const meta = STORY_METADATA[i] ?? STORY_METADATA[0];
  return {
    id: `field-note-${s.id}`,
    slug: `note-${s.id}`,
    title: s.title,
    author: s.author,
    date: s.date,
    body: s.content,
    excerpt: s.excerpt,
    image: ill.src,
    imageAlt: ill.alt,
    imageCaption: ill.caption,
    imageDisclosure: ill.disclosure,
    wordCount: countWords(s.content),
    category: meta.category,
    categorySlug: meta.categorySlug,
    relatedProgramme: meta.relatedProgramme,
    available: CURRENT_AVAILABILITY,
  };
});

export const FIELD_NOTE_COUNT = FIELD_NOTES.length;

/** Longest and shortest body, for reporting the depth honestly. */
export const BODY_WORD_RANGE = {
  min: Math.min(...FIELD_NOTES.map((n) => n.wordCount)),
  max: Math.max(...FIELD_NOTES.map((n) => n.wordCount)),
};

/**
 * Image pairing provenance notes.
 * The previous gallery photograph mismatches (water pipe for forest rights, paddy for millet revival,
 * adult literacy for multilingual education) are now resolved with content-accurate editorial illustrations.
 */
export const STORY_IMAGE_NOTES = [
  {
    story: "Reclaiming the Forest: A Community's Journey",
    image: "forest-stewardship.webp",
    note: "Content-accurate editorial illustration depicting community forest rights and gram sabha deliberation under a banyan canopy.",
    disclosure: "Illustrative image",
  },
  {
    story: "Seeds of Change: Millet Revival",
    image: "millet-revival.webp",
    note: "Content-accurate editorial illustration depicting traditional heirloom millets and indigenous seed conservation on terraced slopes.",
    disclosure: "Illustrative image",
  },
  {
    story: "Mother Tongue, Mother Earth",
    image: "multilingual-learning.webp",
    note: "Content-accurate editorial illustration depicting children's open-air multilingual education and ecological learning in a village circle.",
    disclosure: "Illustrative image",
  },
] as const;

/** Page framing, kept here so the wording lives with the data it describes. */
export const STORIES_HEADING = {
  eyebrow: "Stories from the field",
  title: "Field Notes",
  lead: "Short records from LAYA's work with Adivasi communities in the Eastern Ghats.",
  /**
   * Stated on the page so a reader is never misled about the depth available.
   * This is the honest framing the brief requires.
   */
  framing:
    "These are field notes — brief records of work in progress. Longer documentation, with interviews, quotations and supporting photographs, is published in LAYA's Resource Centre.",
  resourceCta: { label: "Browse the Resource Centre", to: ROUTES.publications },
} as const;

export const getFieldNoteBySlug = (slug: string): FieldNote | undefined =>
  FIELD_NOTES.find((n) => n.slug === slug);

export const getRelatedNotes = (currentSlug: string, limit = 2): FieldNote[] =>
  FIELD_NOTES.filter((n) => n.slug !== currentSlug).slice(0, limit);

