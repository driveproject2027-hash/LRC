# Phase 8 — Gallery & Storytelling Audit

STATUS: AUDIT ONLY. No build has been performed yet.

## 1. Image inventory (src/assets/newgallary/)

All 13 files are LANDSCAPE orientation. No portrait images exist.

| File | Real metadata available | Current title in code | Verdict |
|---|---|
| Training programme on Social Entitlements.jpeg | Filename only | "Training programme on Social Entitlements" | Filename-derived; ACCEPTABLE |
| SRI Paddy.jpeg | Filename only | "SRI Paddy" | Filename-derived; ACCEPTABLE |
| vaccination.jpeg | **None** | "Vaccination" | **UNSUPPORTED MEDICAL CLAIM** |
| V.Baburao, Biofarm farmer, Thadigiri.jpeg | Filename (name/role/place) | "V. Baburao, Biofarm farmer, Thadigiri" | Filename-derived; ACCEPTABLE |
| V.Baburao ... .jpeg-2.jpeg | Filename | same title as above | DUPLICATE RECORD |
| THP General body Members ... Community Health Center cum training hall..jpg | Filename | "Inauguration of Community Health Center cum training hall" | Filename-derived; ACCEPTABLE |
| IMG_6830.jpg | **In-image text: "VANTHARAM", "DATE: 17.2.2019"** | "Community gathering" | **TITLE CONTRADICTS IMAGE; real date ignored** |
| WhatsApp ...12.29.14 PM.jpeg | None | "Field visit" | **FABRICATED** |
| WhatsApp ...12.29.15 PM.jpeg | None | "Community engagement" | **FABRICATED** |
| WhatsApp ...12.29.28 PM.jpeg | None | "Programme moment" | **FABRICATED** |
| WhatsApp ...12.29.44 PM.jpeg | None | "Training session" | **FABRICATED** |
| WhatsApp ...12.30.18 PM.jpeg | None | "Community meeting" | **FABRICATED** |
| IMG_6830 / landscapes (rainbow, river valley, flower field) | None | n/a | Landscapes in a "field work" gallery |

## 2. Fabricated metadata in code

- src/pages/Gallery.tsx line 90 — every image captioned
  "Documented through LAYA's field engagement with Adivasi communities."
- src/pages/Gallery.tsx lines 188-189 — every image described as
  "From LAYA's visual archive of community practice, livelihoods, and
  ecological stewardship."
- Both are applied unconditionally to all 12 records, including landscape
  photographs that contain no people.

## 3. Structural problems

- Duplicate record: V. Baburao image imported twice with identical title.
- Counter reports 12 "plates" — overstates distinct photographs (11 unique).
- Page claims "LAYA's ongoing work" while one image is dated 2019 (in pixels).
- self-titled "LAYA Visual Archive" — not an established/approved label.

## 4. Story data audit

(recorded separately — see notes below)

## 5. RISK

Inventing plausible captions, locations, years or programme-category
relationships for photographs is the single largest integrity risk in
Phase 8. A coding agent can look at a photo and produce a confident,
false caption. This audit records only metadata that is:
  (a) present in the filename, or
  (b) legible in the image itself.
Nothing else may be asserted as fact.

## CONCLUSION

Phase 8 cannot be completed as originally specified. The brief asked for
categories (Communities, Livelihoods, Health, Education, Environment,
Renewable Energy, Events, Field Work) and per-image caption/location/year/
category. The repository does not contain that data for any image.
Per the user's own instruction, the repository determines what exists.

## 6. Story data audit (src/services/api.ts, mockStories)

Only THREE stories exist. Fields present: id, title, author, content,
excerpt, image, date.

| Field the Phase 8 brief requires | Present? |
|---|---|
| hero image | YES (one image per story) |
| title | YES |
| author | YES — but only generic team names |
| date | YES — but ISO strings of unverifiable provenance |
| body content | PARTIAL — a single sentence, 22-39 words |
| supporting images | **NO** |
| pull quotes | **NO** |
| related programme | **NO** |
| related resources | **NO** |
| body paragraphs | **NO** — one sentence is not a readable article |

### Body length check
- Story 1 content: 27 words
- Story 2 content: 21 words
- Story 3 content: 33 words

These are BLURBS, not articles. A "story page" built on one 27-word
paragraph would be a page claiming to be an article while containing a
caption. That would misrepresent the depth of LAYA's documentation.

### Attribution check
- author: "LAYA Field Team" / "LAYA NRM Unit" / "LAYA Education Team"
- No named individual authors. No interview quotes.
- No date provenance: ISO dates with no stated source.

### Images reused
Story images (referenceStoryImages) are the SAME gallery photographs used
elsewhere in the site:
  - gallery-25 "Gravity Water Flow Scheme"
  - gallery-16 "Literacy Program for Tribal Women"
  - gallery-23 "SRI Paddy Cultivation"
Story 1 ("Reclaiming the Forest") uses the Gravity Water Flow Scheme image.
Story 2 ("Millet Revival") uses the SRI Paddy image.
Story 3 ("Mother Tongue") uses the Literacy Program image.
Title/image mismatches exist here too.

## 7. Categories audit

Brief proposed: Communities, Livelihoods, Health, Education, Environment,
Renewable Energy, Events, Field Work.

Repository contains NO category field on any gallery image and NO programme
relationship. Deriving eight categories would require inventing assignments.
Only filenames hint at a theme, and only for 5 of 11 images.

## 8. Post-audit corrections (Option C build)

Re-inspection of the three remaining images changes two earlier conclusions:

### 12.29.44 PM.jpeg
Code title "Training session" — FABRICATED.
Actual: a wide landscape of terraced paddy fields with many people
transplanting, against forested hills. A strong documentary photograph,
but no verifiable caption, location, or date.

### 12.29.15 PM.jpeg
Code title "Community engagement" — FABRICATED.
Actual: four people carrying vessels across a hillside beside a bare tree,
under an overcast sky. No verifiable caption, location, or date.

### V.Baburao ...jpeg-2.jpeg
Previously recorded as a "duplicate". It is NOT a duplicate photograph.
It shows a green crop field with NO people, whereas the first Baburao image
shows a person standing in a crop plot.

Therefore: applying the title "V. Baburao, Biofarm farmer, Thadigiri" to
this second image is WRONG — it names a person who does not appear, and a
place that cannot be confirmed for this frame.

Both files are retained as distinct photographs. Only the first carries the
filename-derived attribution. The second is treated as untitled.

### Revised counts
- Files on disk: 12
- UNIQUE photographs: 12 (both Baburao frames are distinct images)
- Records currently derived from them: 12, but 2 share an identical title,
  which is the actual defect to fix.

## 9. FINAL INVENTORY (Phase 8, Option C build)

### GALLERY — /gallery

Files on disk in src/assets/newgallary: 12
UNIQUE PHOTOGRAPHS PUBLISHED: 12
DUPLICATE RECORDS: 0 (the two V. Baburao files are distinct photographs;
they previously shared one title, which was the defect)

| Plate | Title published | Source of caption | Location | Date |
|---|---|---|
| 01 | Training programme on Social Entitlements | filename | — | — |
| 02 | SRI Paddy | filename | — | — |
| 03 | Inauguration of Community Health Centre cum training hall | filename | — | — |
| 04 | V. Baburao, Biofarm farmer, Thadigiri | filename | Thadigiri | — |
| 05 | Vanantharam certificate presentation | IN-IMAGE | — | 17 Feb 2019 |
| 06 | Untitled photograph | none | — | — |
| 07 | Untitled photograph | none | — | — |
| 08 | Untitled photograph | none | — | — |
| 09 | Untitled photograph | none | — | — |
| 10 | Untitled photograph | none | — | — |
| 11 | Untitled photograph | none | — | — |
| 12 | Untitled photograph | none | — | — |

TITLED: 5 (plates 01–05)
UNTITLED / CAPTION NOT RECORDED: 7 (plates 06–12)

EXCLUDED: none. All 12 photographs are published. 12 is the true unique
count; the earlier "12 plates" figure in the old code was arrived at by
counting a duplicated record, which coincidentally matched.

METADATA AVAILABLE:   title 5, place 1, date 1
METADATA UNAVAILABLE: title 7, place 11, date 11, category 12, programme 12

CATEGORIES: none assigned. No image carries category or programme metadata.
ArchiveCategory is defined in src/content/gallery.ts as the extension seam.

### STORIES — /stories

STORY RECORDS: 3

| # | Title | Author | Date | Body words |
|---|---|---|
| 1 | Reclaiming the Forest: A Community's Journey | LAYA Field Team | 2024-03-15 | 27 |
| 2 | Seeds of Change: Millet Revival | LAYA NRM Unit | 2024-01-20 | 21 |
| 3 | Mother Tongue, Mother Earth | LAYA Education Team | 2023-11-10 | 33 |

BODY RANGE: 21–33 words per note.

AVAILABLE FIELDS:      hero image, title, author (publisher string), date,
                       body (single sentence), excerpt
MISSING FIELDS:        category, location, supporting images, pull quotes,
                       related programme, related resources, long-form body

### ROUTES ADDED

/stories/:slug   — field-note detail. One route pattern; adding a note
                   requires no router change.
Existing /gallery and /stories routes retained and rebuilt.

### CONFLICTS RECORDED (not resolved)

1. vaccination.jpeg — filename asserts vaccination; photograph does not
   corroborate. Published UNTITLED.
2. V.Baburao ...-2.jpeg — previously mis-titled with a person who does not
   appear in the frame. Published UNTITLED.
3. IMG_6830.jpg — had an invented "Community gathering" title; real event
   (Vanantharam) and date (17.2.2019) are now used instead.
4. All three story images do not illustrate the stories they accompany.
   Recorded in STORY_IMAGE_NOTES.
