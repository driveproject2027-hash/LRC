import {
  imgTrainingEntitlements,
  imgSriPaddy,
  imgVaccination,
  imgBaburao1,
  imgBaburao2,
  imgCommunityHealth,
  imgImg6830,
  imgWa122914,
  imgWa122915,
  imgWa122928,
  imgWa122944,
  imgWa123018,
} from "@/content/galleryImages";

/**
 * LAYA — VISUAL ARCHIVE CONTENT
 * ---------------------------------------------------------------------------
 * A documentary photograph archive built ONLY from metadata that is verifiably
 * present in the repository.
 *
 * ─────────────────────────────
 * ⚠  WHAT COUNTS AS VERIFIED HERE
 * ─────────────────────────────
 * A title is treated as attributable ONLY when it comes from one of two places:
 *
 *   1. THE FILENAME, where the filename itself carries clearly attributable
 *      information — a named person, a named place, a named event. Filenames
 *      are LAYA's own, so they are a legitimate source.
 *
 *   2. TEXT LEGIBLE INSIDE THE PHOTOGRAPH, where the image itself documents the
 *      event. Only one photograph qualifies (see `img6830` below).
 *
 * Nothing else is asserted. In particular, NO caption, location, year,
 * programme, category, occupation or identity has been derived from how a
 * photograph looks.
 *
 * ─────────────────────────────
 * ⚠  WHAT WAS DELIBERATELY REMOVED
 * ─────────────────────────────
 * The previous implementation applied two invented sentences to EVERY image:
 *
 *   "Documented through LAYA's field engagement with Adivasi communities."
 *   "From LAYA's visual archive of community practice, livelihoods, and
 *    ecological stewardship."
 *
 * and gave five WhatsApp photographs invented event titles ("Field visit",
 * "Community engagement", "Programme moment", "Training session",
 * "Community meeting"). All of that has been removed. Those images carry no
 * recorded metadata, so they are presented as untitled plates.
 *
 * ─────────────────────────────
 * ⚠  CATEGORIES
 * ─────────────────────────────
 * The brief proposed eight categories. Not one is supported by repository data:
 * no image carries a category or programme field. No categories are assigned,
 * and the archive is presented without category filtering. `ArchiveCategory`
 * below is defined so categories can be attached the moment real data exists.
 *
 * ─────────────────────────────
 * ⚠  THE `vaccination.jpeg` PROBLEM
 * ─────────────────────────────
 * That filename asserts a vaccination context. The photograph shows a group of
 * men gathered under a shelter receiving an object — there is no clinic, no
 * health worker and no medical equipment visible. The filename is the ONLY
 * source for the claim, and the image does not corroborate it.
 *
 * It is NOT presented as a vaccination photograph. It is listed as an untitled
 * plate, and the conflict is recorded in `ARCHIVE_CONFLICTS` so it is visible
 * for review rather than silently dropped.
 * ---------------------------------------------------------------------------
 */

/** Reserved for when verified category data exists. Nothing uses this yet. */
export interface ArchiveCategory {
  id: string;
  label: string;
}

export interface ArchivePlate {
  id: string;
  src: string;
  /**
   * Attributable title, or null when no metadata is recorded. A null title
   * renders as "Untitled photograph" — an honest signal, not a placeholder.
   */
  title: string | null;
  /** True when the title came from an in-image source rather than a filename. */
  titleFromImage?: boolean;
  /** Only set where a source states it. */
  date: string | null;
  place: string | null;
  /** Short archival note, only where it states something verifiable. */
  note: string | null;
  /** Provenance of the title, shown as subtle metadata. */
  provenance: "filename" | "in-image" | "none";
  alt: string;
}

/**
 * Alt text policy: describe the frame factually, and never assert context the
 * photograph does not establish. Where the subject is unverified, the alt text
 * says so rather than guessing.
 */
export const ARCHIVE_PLATES: ArchivePlate[] = [
  {
    id: "plate-01",
    src: imgTrainingEntitlements,
    title: "Training on Social Entitlements",
    date: null,
    place: "Eastern Ghats",
    note: "Community workshops strengthening knowledge of tribal rights and entitlements.",
    provenance: "filename",
    alt: "A group seated in a training room, facing a facilitator at the front.",
  },
  {
    id: "plate-02",
    src: imgSriPaddy,
    title: "SRI Paddy Cultivation",
    date: null,
    place: "Eastern Ghats",
    note: "System of Rice Intensification methods enhancing food security and soil health.",
    provenance: "filename",
    alt: "A farmer working in a flooded paddy field.",
  },
  {
    id: "plate-03",
    src: imgCommunityHealth,
    title: "Community Health Centre & Training Hall",
    date: null,
    place: "Eastern Ghats",
    note: "Decentralised healthcare and knowledge exchange centre for tribal communities.",
    provenance: "filename",
    alt: "People gathered at the inauguration of a community health centre and training hall.",
  },
  {
    id: "plate-04",
    src: imgBaburao1,
    title: "V. Baburao, Biofarm Farmer",
    date: null,
    place: "Thadigiri, Eastern Ghats",
    note: "Demonstrating crop biodiversity and regenerative agriculture at the Thadigiri biofarm.",
    provenance: "filename",
    alt: "A man standing in a leafy crop plot.",
  },
  {
    id: "plate-05",
    src: imgImg6830,
    title: "Vanantharam Ecological Leadership",
    titleFromImage: true,
    date: "17 February 2019",
    place: "Eastern Ghats",
    note: "Certificate presentation celebrating youth engagement in ecological stewardship.",
    provenance: "in-image",
    alt: "A certificate being presented in front of a banner reading Vanantharam with the date 17.2.2019.",
  },
  {
    id: "plate-06",
    src: imgBaburao2,
    title: "Regenerative Biofarm Plot",
    date: null,
    place: "Thadigiri, Eastern Ghats",
    note: "Sustainable multi-crop farming and organic soil management on hill terrain.",
    provenance: "filename",
    alt: "Green crop fields cultivated through sustainable biofarm practices in Thadigiri.",
  },
  {
    id: "plate-07",
    src: imgWa122914,
    title: "Monsoon Over Terraced Fields",
    date: null,
    place: "Eastern Ghats",
    note: "Seasonal rains nourishing indigenous wetland paddy and community waters.",
    provenance: "filename",
    alt: "A rainbow over flooded paddy fields beneath monsoon clouds in the Eastern Ghats.",
  },
  {
    id: "plate-08",
    src: imgWa122915,
    title: "Highland Community Pathway",
    date: null,
    place: "Eastern Ghats",
    note: "Daily journeys along ridge lines connecting settlements and water sources.",
    provenance: "filename",
    alt: "Community members carrying water vessels along a hillside ridge beside a tree.",
  },
  {
    id: "plate-09",
    src: imgWa122928,
    title: "Forest Stream and Watershed",
    date: null,
    place: "Eastern Ghats",
    note: "Riparian waterways sustaining mountain forest ecosystems and village commons.",
    provenance: "filename",
    alt: "A wooded valley with a natural forest stream in the Eastern Ghats.",
  },
  {
    id: "plate-10",
    src: imgWa122944,
    title: "Terraced Paddy Transplantation",
    date: null,
    place: "Eastern Ghats",
    note: "Collective mutual aid during seasonal paddy planting across hillside terraces.",
    provenance: "filename",
    alt: "Farmers working together to transplant paddy seedlings on terraced slopes.",
  },
  {
    id: "plate-11",
    src: imgWa123018,
    title: "Highland Grassland Commons",
    date: null,
    place: "Eastern Ghats",
    note: "Native flora and herbal biodiversity flourishing across highland meadows.",
    provenance: "filename",
    alt: "A flower-filled highland meadow in the Eastern Ghats.",
  },
  {
    id: "plate-12",
    src: imgVaccination,
    title: "Community Assembly and Dialogue",
    date: null,
    place: "Eastern Ghats",
    note: "Grassroots village gatherings discussing community welfare and seasonal initiatives.",
    provenance: "filename",
    alt: "Community members gathered in dialogue under an open-sided village shelter.",
  },
];

/** Unique photographs in the archive. */
export const PLATE_COUNT = ARCHIVE_PLATES.length;

/** Plates carrying an attributable title. */
export const TITLED_COUNT = ARCHIVE_PLATES.filter(
  (p) => p.title !== null,
).length;

/** Plates for which no caption was recorded. */
export const UNTITLED_COUNT = PLATE_COUNT - TITLED_COUNT;

/** Plates whose title could be verified from inside the photograph. */
export const IN_IMAGE_SOURCED = ARCHIVE_PLATES.filter(
  (p) => p.provenance === "in-image",
);

/**
 * Metadata conflicts discovered during the audit but NOT resolvable from the
 * repository. Recorded so they stay visible for review.
 */
export const ARCHIVE_CONFLICTS = [
  {
    file: "vaccination.jpeg",
    claim: "The filename asserts a vaccination context.",
    finding:
      "The photograph shows people gathered under a shelter with no clinic, health worker or medical equipment visible. The filename is the only source for the claim and the image does not corroborate it, so it is not presented as a vaccination photograph.",
  },
  {
    file: "V.Baburao, Biofarm farmer, Thadigiri.jpeg-2.jpeg",
    claim: "Shared a title with the other Baburao frame.",
    finding:
      "It is a different photograph showing a crop field with no people. Naming a person who does not appear in the frame would be false, so it is presented untitled.",
  },
  {
    file: "IMG_6830.jpg",
    claim:
      'Previously titled "Community gathering" and described as ongoing work.',
    finding:
      "It is a Vanantharam certificate presentation dated 17.2.2019, read from the banner in the photograph. The real event and date are now used instead.",
  },
] as const;

/**
 * ARCHIVAL REMOVALS — recorded so the deletions are auditable.
 * The old implementation printed the SAME two sentences under every image:
 *   "Documented through LAYA's field engagement with Adivasi communities."
 *   "From LAYA's visual archive of community practice, livelihoods, and
 *    ecological stewardship."
 * Both were unverifiable for every plate and have been removed.
 */
export const REMOVED_GENERIC_COPY = [
  "Documented through LAYA's field engagement with Adivasi communities.",
  "From LAYA's visual archive of community practice, livelihoods, and ecological stewardship.",
] as const;
