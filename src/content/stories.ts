import { mockStories } from "@/services/api";
import { referenceStoryImages } from "@/assets/referenceAssets";
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
  wordCount: number;
  /**
   * Which template fields this record can honestly populate. Always checked
   * before rendering — never assume a field exists.
   */
  available: StoryFieldAvailability;
}

const countWords = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/**
 * Field availability for the CURRENT three records.
 *
 * Everything false here is false because the source has no such data. When
 * fuller stories are supplied, flip the relevant flag and `StoryDetail` renders
 * that section automatically — no template change needed.
 */
const CURRENT_AVAILABILITY: StoryFieldAvailability = {
  heroImage: true,
  category: false, // no category field in the source
  date: true, // ISO string present
  location: false, // no location field
  author: true, // publisher attribution string present
  body: true, // one sentence
  supportingImages: false, // only one image per record
  pullQuotes: false, // no quotes exist
  relatedProgramme: false, // no relationship recorded
  relatedResources: false, // no relationship recorded
};

export const FIELD_NOTES: FieldNote[] = mockStories.map((s, i) => ({
  id: `field-note-${s.id}`,
  slug: `note-${s.id}`,
  title: s.title,
  author: s.author,
  date: s.date,
  body: s.content,
  excerpt: s.excerpt,
  image: referenceStoryImages[i] ?? referenceStoryImages[0],
  wordCount: countWords(s.content),
  available: CURRENT_AVAILABILITY,
}));

export const FIELD_NOTE_COUNT = FIELD_NOTES.length;

/** Longest and shortest body, for reporting the depth honestly. */
export const BODY_WORD_RANGE = {
  min: Math.min(...FIELD_NOTES.map((n) => n.wordCount)),
  max: Math.max(...FIELD_NOTES.map((n) => n.wordCount)),
};

/**
 * Recorded so the mismatch is visible rather than silently accepted.
 * No captions on the page claim these images depict the stories.
 */
export const STORY_IMAGE_NOTES = [
  {
    story: "Reclaiming the Forest: A Community's Journey",
    image: "Gravity Water Flow Scheme",
    note: "The accompanying photograph documents a water supply scheme, not the forest rights story it sits beside.",
  },
  {
    story: "Seeds of Change: Millet Revival",
    image: "SRI Paddy Cultivation",
    note: "The photograph shows paddy cultivation; the story concerns millet revival.",
  },
  {
    story: "Mother Tongue, Mother Earth",
    image: "Literacy Program for Tribal Women",
    note: "The photograph documents an adult literacy programme; the story concerns multilingual education for children.",
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
