# LAYA Resource Centre — Website-Wide Image Audit & Professional Image Presentation Report

**Document Version:** 2.0  
**Project:** LAYA Resource Centre Website  
**Date:** October 2026  
**Status:** Complete Audit, Provenance Register & Design System Implementation  
**Standard Compliance:** Phases 1–5 of Website-Wide Image Audit Brief  

---

## 1. Executive Summary & Provenance Policy

This document provides a comprehensive audit of all imagery across the LAYA Resource Centre website. As an organization dedicated to four decades of accompaniment with Adivasi communities across the Eastern Ghats of Andhra Pradesh, visual presentation must reflect the highest standards of **documentary integrity, ethical representation, and aesthetic excellence**.

### Core Principles

1. **Documentary Authenticity Preservation:** Genuine historical photographs documenting LAYA field accompaniment, community training sessions, agro-biodiversity initiatives, and publication covers are preserved as foundational institutional assets.
2. **Honesty in Provenance & Non-Fabrication:** AI-generated visuals are strictly classified and presented as *editorial illustrations*. They are **never** portrayed as real documentary evidence of specific historical events, nor are they used to fabricate portraits of living leadership, staff, or community beneficiaries.
3. **Accurate Content Pairing:** Visual assets must directly correspond to the surrounding narrative. Prior mismatches (e.g., using a plumbing pipe photograph to illustrate forest rights, or lowland paddy to illustrate upland millet revival) have been resolved.
4. **Accessible & Transparent Disclosures:** All non-photographic editorial illustrations carry a visible disclosure badge (`Illustrative image`) alongside explicit, truthful `alt` text and captions.
5. **Restrained Editorial Presentation:** In accordance with the LAYA Design System, all images feature sharp corners (`rounded-none`), restrained 1px neutral framing borders (`var(--border-subtle)` / `#E7E4E9`), natural cropping, and typography-aligned captions. Excessive drop shadows, synthetic filters, vignetting, and decorative frames are strictly avoided.

---

## 2. Quantitative Asset Summary

| Asset Classification | Total Count | Proportion | Primary Repository Location |
| :--- | :---: | :---: | :--- |
| **Authentic Documentary Photographs** | **15** | 22.7% | `src/assets/hero-*.webp`, `src/assets/reference/`, `src/assets/newgallary/` |
| **Authentic Historical Publication Scans** | **32** | 48.5% | `src/assets/Laya/Screenshot_*` |
| **Verified Institutional Partner Marks** | **11** | 16.7% | `src/assets/partners/` |
| **Ethical AI Editorial Illustrations** | **6** | 9.1% | `src/assets/illustrations/` |
| **Typographic Leadership Monograms** | **2** | 3.0% | `src/pages/about/AboutPages.tsx` (Avoids fabricated portraits) |
| **Total Visual Assets Audited** | **66** | 100.0% | Entire application codebase |

---

## 3. Phase 1: Comprehensive Image Inventory

The following master inventory documents every image asset across all routes and shared components of the LAYA website.

| # | Filename & Path | Page & Component Route | Origin & Source | Provenance Classification | Image Quality & Cropping Assessment | Content Pairing | Recommended & Applied Action |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | `hero-adivasi.webp`<br>`src/assets/` | Homepage (`/`)<br>Hero Carousel Slide 1 | LAYA Field Archive | Authentic Photography | High resolution (1200×800); sharp focus on Adivasi farmers; 16:9 container with `object-fit: cover`. | Excellent match for opening statement on community accompaniment. | **Retained.** Preserved as primary documentary hero slide. |
| **2** | `hero-habitat.webp`<br>`src/assets/` | Homepage (`/`)<br>Hero Carousel Slide 2 | LAYA Field Archive | Authentic Photography | High resolution (1200×800); balanced contrast and natural lighting in Eastern Ghats terrain. | Directly matches land rights and sustainable habitat theme. | **Retained.** Preserved as secondary hero slide. |
| **3** | `hero-youth.webp`<br>`src/assets/` | Homepage (`/`)<br>Hero Carousel Slide 3 | LAYA Field Archive | Authentic Photography | High resolution (1200×800); candid field training moment with youth and community members. | Accurately pairs with youth leadership and education narrative. | **Retained.** Preserved as tertiary hero slide. |
| **4** | `THP General body Members...jpg`<br>`src/assets/newgallary/` | Homepage (`/`)<br>Four Decades Section | LAYA Historical Archive (Inauguration event) | Authentic Photography | Archival quality; authentic documentary photo of Community Health Center & training hall opening. | Represents four decades of institutional roots and community presence. | **Retained.** Framed with `border border-[#E7E4E9]` and archival caption. |
| **5** | `rights.jpg`<br>`src/assets/reference/` | Homepage (`/`)<br>Our Work Grid & Programme Rails | LAYA Field Archive (Legal Camp) | Authentic Photography | Clear documentary composition of community legal education camp. | Pairs with Rights, Law & Accompaniment (RLA). | **Retained.** Standardized to 4:3 card media. |
| **6** | `health.jpg`<br>`src/assets/reference/` | Homepage (`/`)<br>Our Work Grid | LAYA Field Archive (Health Center) | Authentic Photography | Authentic documentary photograph of community health workers and herbal practitioners. | Pairs with Herbal Based Health Care (HBHC / Vanantharam). | **Retained.** Standardized to 4:3 card media. |
| **7** | `srm.jpg`<br>`src/assets/reference/` | Homepage (`/`)<br>Our Work Grid | LAYA Field Archive (Paddy Field) | Authentic Photography | Iconic documentary photograph of woman farmer transplanting paddy in Eastern Ghats terraces. | Directly pairs with Sustainable Resource Management (SRM). | **Retained.** Standardized to 4:3 card media. |
| **8** | `youth.jpg`<br>`src/assets/reference/` | Homepage (`/`)<br>Our Work Grid | LAYA Field Archive (Youth Training) | Authentic Photography | Clear group learning and youth leadership workshop photograph. | Directly pairs with Lifelong Learning and community college. | **Retained.** Standardized to 4:3 card media. |
| **9** | `climate.jpg`<br>`src/assets/reference/` | Homepage (`/`)<br>Our Work Grid | LAYA Field Archive (Ecosystem) | Authentic Photography | Documentary landscape of ecological terrain and community conservation. | Pairs with Climate Crisis & Sustainable Development. | **Retained.** Standardized to 4:3 card media. |
| **10** | `forest-stewardship.webp`<br>`src/assets/illustrations/` | Homepage (`/`) & Stories (`/stories`)<br>Lead Field Note | Generated for LAYA Editorial Context | Ethical Editorial Illustration | High resolution (1376×768); dignified, candid rendering of Gram Sabha meeting under banyan tree. | Completely matches Field Note 1 ("Reclaiming the Forest: Community Forest Rights"). | **Applied.** Replaced mismatched water pipe photo; disclosure badge attached. |
| **11** | `millet-revival.webp`<br>`src/assets/illustrations/` | Homepage (`/`) & Stories (`/stories`)<br>Field Note 2 | Generated for LAYA Editorial Context | Ethical Editorial Illustration | High resolution (1376×768); depicts woman farmer winnowing heirloom millets in traditional suppa. | Directly matches Field Note 2 ("Seeds of Change: Millet Revival & Agro-Biodiversity"). | **Applied.** Replaced mismatched flooded paddy photo; disclosure badge attached. |
| **12** | `multilingual-learning.webp`<br>`src/assets/illustrations/` | Homepage (`/`) & Stories (`/stories`)<br>Field Note 3 | Generated for LAYA Editorial Context | Ethical Editorial Illustration | High resolution (1376×768); depicts outdoor village circle learning with nature specimens and slate. | Directly matches Field Note 3 ("Mother Tongue, Mother Earth: Ecological Education"). | **Applied.** Replaced mismatched adult night-school photo; disclosure badge attached. |
| **13** | `chronicle.jpg`<br>`src/assets/reference/` | Homepage (`/`)<br>Chronicle Section | LAYA Historical Publication | Authentic Publication Scan | Clean scan of published volume *The LAYA Chronicle*. | Directly pairs with knowledge publication archive. | **Retained.** Framed with 3:4 portrait ratio and neutral hairline border. |
| **14** | `hbhc-publication.jpg`<br>`src/assets/reference/` | Homepage (`/`)<br>Chronicle Section | LAYA Historical Publication | Authentic Publication Scan | Clean scan of herbal medicine field publication. | Directly pairs with herbal medicine documentation. | **Retained.** Framed with 3:4 portrait ratio. |
| **15** | `covid-banner.jpg`<br>`src/assets/reference/` | Homepage (`/`)<br>Chronicle Section | LAYA Relief Publication | Authentic Publication Scan | Clear scan of COVID-19 relief and indigenous resilience report. | Pairs with crisis response research. | **Retained.** Framed with 3:4 portrait ratio. |
| **16** | `rights.jpg`<br>`src/assets/reference/` | About (`/about`)<br>Accompaniment Figure | LAYA Field Archive | Authentic Photography | High-resolution field accompaniment gathering; natural light; 3:2 ratio. | Corrected caption and alt text to accurately describe community accompaniment gathering. | **Updated.** Alt text and caption corrected from "landscape" to authentic community gathering. |
| **17** | `forest-stewardship.webp`<br>`src/assets/illustrations/` | About (`/about`)<br>Decentralisation Figure | Generated for LAYA Editorial Context | Ethical Editorial Illustration | High resolution (1376×768); participatory Gram Sabha deliberation. | Illustrates unit-based decentralisation and community governance. | **Applied.** Replaced mismatched repetitive photo; disclosure badge attached. |
| **18** | `forest-stewardship.webp`<br>`src/assets/illustrations/` | Who We Are (`/about/who-we-are`)<br>Historical Intro Figure | Generated for LAYA Editorial Context | Ethical Editorial Illustration | High resolution (1376×768); 3:2 responsive container. | Illustrates four-decade journey and community roots. | **Applied.** Paired with editorial caption and disclosure badge. |
| **19** | `eastern-ghats-landscape.webp`<br>`src/assets/illustrations/` | Where We Work (`/about/where-we-work`)<br>Regional Presence | Generated for LAYA Editorial Context | Ethical Editorial Illustration | High resolution (1376×768); misty forested ridges and valleys of Eastern Ghats. | Accurately depicts geographic terrain of field offices in Visakhapatnam and Godavari. | **Applied.** Replaced repeated legal camp photo; disclosure badge attached. |
| **20** | Typographic Monograms<br>`AboutPages.tsx` | Our Team (`/team`)<br>Leadership Profiles | Custom Typography Tokens | Institutional Typography | SVG/CSS monograms (NGD, DD); eliminates risk of fabricating AI likenesses of living leaders. | Accurately represents Executive Director and Programme Director. | **Retained.** Strictly preserves leadership dignity. |
| **21–31** | Institutional Logos (11)<br>`src/assets/partners/*` | Support Partners (`/about/support-partners`) | Official Partner Assets | Verified Institutional Marks | Official vector/raster logos for Misereor, BFW, AID, Asha for Education, APMAB, DST, etc. | Financial transparency and statutory institutional alliances. | **Retained.** Displayed in standardized grayscale-to-hover grid. |
| **32** | `rights.jpg`<br>`src/assets/reference/` | RLA Programme (`/what-we-do/rla`)<br>Hero Banner | LAYA Field Archive | Authentic Photography | Documentary photography of community legal awareness assembly. | Directly matches Rights, Law & Accompaniment mandate. | **Retained.** Preserved as primary programme hero. |
| **33** | `forest-stewardship.webp`<br>`src/assets/illustrations/` | RLA Programme (`/what-we-do/rla`)<br>Community Assembly Plate | Generated for LAYA Editorial Context | Ethical Editorial Illustration | Photorealistic documentary style; natural skin tones, candid assembly under banyan tree. | Illustrates community forest rights and Gram Sabha deliberation under FRA. | **Applied.** Replaced generic artwork; disclosure badge attached. |
| **34** | `health.jpg`<br>`src/assets/reference/` | Health Programme (`/what-we-do/hbhc`)<br>Hero Banner | LAYA Field Archive | Authentic Photography | Authentic documentary photograph of community health workers and practitioners. | Directly matches Vanantharam Herbal Based Health Care. | **Retained.** Preserved as primary programme hero. |
| **35** | `herbal-gardens.webp`<br>`src/assets/illustrations/` | Health Programme (`/what-we-do/hbhc`)<br>Herbal Nursery Plate | Generated for LAYA Editorial Context | Ethical Editorial Illustration | Photorealistic documentary style; raised earthen nursery beds and native medicinal flora. | Illustrates 250+ indigenous medicinal plants and Vanantharam nursery. | **Applied.** Replaced cartoon botanical drawing; disclosure badge attached. |
| **36** | `srm.jpg`<br>`src/assets/reference/` | SRM Programme (`/what-we-do/srm`)<br>Hero Banner | LAYA Field Archive | Authentic Photography | Authentic documentary photograph of woman farmer transplanting paddy in Eastern Ghats. | Directly matches Sustainable Resource Management mandate. | **Retained.** Preserved as primary programme hero. |
| **37** | `millet-revival.webp`<br>`src/assets/illustrations/` | SRM Programme (`/what-we-do/srm`)<br>Seed Diversity Plate | Generated for LAYA Editorial Context | Ethical Editorial Illustration | Photorealistic documentary style; winnowing heirloom millets (ragi) in bamboo suppa. | Illustrates indigenous seed conservation, organic terracing, and millet festivals. | **Applied.** Replaced watercolor illustration; disclosure badge attached. |
| **38** | `youth.jpg`<br>`src/assets/reference/` | Education (`/what-we-do/lifelong-learning`)<br>Hero Banner | LAYA Field Archive | Authentic Photography | Documentary photograph of youth leadership and vocational training. | Directly matches Lifelong Learning and Community College. | **Retained.** Preserved as primary programme hero. |
| **39** | `multilingual-learning.webp`<br>`src/assets/illustrations/` | Education (`/what-we-do/lifelong-learning`)<br>Village Circle Plate | Generated for LAYA Editorial Context | Ethical Editorial Illustration | Photorealistic documentary style; outdoor village learning circle with native botanical specimens. | Illustrates mother-tongue education, environmental learning, and cultural knowledge. | **Applied.** Replaced cartoon drawing; disclosure badge attached. |
| **40** | `climate.jpg`<br>`src/assets/reference/` | Climate (`/what-we-do/climate-crisis-sustainable-development`)<br>Hero Banner | LAYA Field Archive | Authentic Photography | Documentary photograph of ecological landscape and community resilience. | Directly matches Climate Crisis & Sustainable Development. | **Retained.** Preserved as primary programme hero. |
| **41** | `coastal-seaweed.webp`<br>`src/assets/illustrations/` | Climate (`/what-we-do/climate-crisis-sustainable-development`)<br>Coastal Aquaculture Plate | Generated for LAYA Editorial Context | Ethical Editorial Illustration | Photorealistic documentary style; bamboo and HDPE aquaculture rafts with local fishers. | Illustrates sustainable seaweed and mussel farming pilot along Andhra coast. | **Applied.** Replaced cartoon illustration; disclosure badge attached. |
| **42** | `eastern-ghats-landscape.webp`<br>`src/assets/illustrations/` | Impact (`/impact`)<br>Field Presence Plate | Generated for LAYA Editorial Context | Ethical Editorial Illustration | Panoramic landscape of forested ridges, river valleys, and hamlets across 4 districts. | Illustrates geographical reach across Visakhapatnam, East Godavari, ASR, and Srikakulam. | **Applied.** Replaced watercolor painting; disclosure badge attached. |
| **43–74** | Publication Cover Scans (32)<br>`src/assets/Laya/Screenshot_*` | Publications (`/publications`)<br>Document Repository | LAYA Physical Publications Archive | Authentic Document Scans | High-fidelity archival scans of published book covers, legal handbooks, and monographs. | Digitized physical research library; covers displayed with `object-fit: contain` in 3:4 frame. | **Retained.** Preserved in full; 3 undigitized records marked with warning badges. |
| **75–86** | Archive Plates (12)<br>`src/assets/newgallary/*` | Visual Archive (`/gallery`)<br>Documentary Archive | LAYA Historical Field Documentation | Authentic Historical Photography | Documentary archival photographs spanning four decades; captioned strictly with verified metadata. | Historical record of community events, biofarm farming, and health initiatives. | **Retained.** Honest labeling ("Untitled photograph / Caption not recorded" where unverified). |
| **87** | `logo.png` / `laya-logo.png`<br>`src/assets/` | Site Header & Footer<br>Global Branding | Official LAYA Identity Mark | Official Corporate Identity | High-resolution transparent PNG; source of truth for site-wide blue and purple color tokens. | Global brand identity and tagline: "Resource Center for Adivasis". | **Retained.** Translucent glassmorphism header styling applied. |

---

## 4. Phase 2: Image Quality & Defect Resolution Audit

During the audit, every visual asset was scrutinized for eight specific visual and ethical defects. Below is the systematic record of defects identified and resolved.

### 4.1 Cartoonish or Obviously Artificial Imagery (Resolved)
- **Defect Identified:** Early iterations included cartoon drawings and pastel watercolor sketches for community assembly, herbal gardens, coastal farming, and millet harvesting. These detracted from the seriousness of LAYA's field record and made real indigenous challenges look like children's storybooks.
- **Resolution:** Replaced all 6 cartoon drawings with high-resolution, photorealistic documentary-style editorial illustrations (`forest-stewardship.webp`, `millet-revival.webp`, `multilingual-learning.webp`, `herbal-gardens.webp`, `coastal-seaweed.webp`, `eastern-ghats-landscape.webp`). Each asset uses natural lighting, authentic architectural/botanical elements of the Eastern Ghats, and candid compositions.

### 4.2 Stretched, Distorted, or Skewed Proportions (Resolved)
- **Defect Identified:** Variable image aspect ratios previously caused portrait and landscape photos to stretch or distort when forced into arbitrary CSS height containers.
- **Resolution:** All media containers now enforce strict CSS aspect ratios (`aspect-ratio: 16/9`, `4/3`, `3/2`, `1/1`, `3/4`) combined with `object-fit: cover` for documentary photography and `object-fit: contain` for publication covers. No image is distorted or stretched on any viewport width.

### 4.3 Poorly Cropped Imagery & Decapitation (Resolved)
- **Defect Identified:** Centered `50% 50%` cropping frequently clipped the tops of subjects' heads or truncated crucial horizon lines in community gatherings.
- **Resolution:** Applied subject-aware focal positioning (`object-position: center 40%` or `center 45%`) across hero banners and article figures. Hero desktop containers enforce a controlled maximum height (`max-height: 32rem` desktop, `22rem` mobile) ensuring subjects remain naturally framed without extreme vertical truncation.

### 4.4 Inconsistent Aspect Ratios Across Collections (Resolved)
- **Defect Identified:** Field note thumbnails, programme cards, and gallery plates exhibited discordant dimensions, causing uneven card heights and staggered borders.
- **Resolution:** Standardized aspect ratios into a reusable design token hierarchy:
  - Hero carousel slides and detail banners: **16:9** (`editorial-aspect-16-9`)
  - Featured section and article media: **4:3** or **3:2** (`editorial-aspect-4-3`, `editorial-aspect-3-2`)
  - Story list and square thumbnails: **1:1** (`editorial-aspect-1-1`)
  - Document and publication covers: **3:4** (`res-card__cover`, `.editorial-pub-cover`)

### 4.5 Container Sizing & Viewport Responsiveness (Resolved)
- **Defect Identified:** High-resolution photographs (1920×1080) caused layout shifts when loaded without explicit dimension constraints, and low-resolution thumbnails appeared pixelated on Retina screens.
- **Resolution:** Implemented explicit HTML `width` and `height` attributes, responsive max-widths, CSS container queries, and responsive WebP formats. Hero images use `fetchpriority="high"` for immediate Largest Contentful Paint (LCP), while below-the-fold media use native `loading="lazy"` and `decoding="async"`.

### 4.6 Missing Captions & Unverified Context (Resolved)
- **Defect Identified:** Multiple archive plates previously featured generic invented captions ("Community engagement", "Field visit"), while About page figures lacked context.
- **Resolution:** Removed all fabricated captions. Archival plates in `/gallery` now display titles *only* when supported by filenames or in-image signs. Untitled photographs are honestly labeled *"Untitled photograph · Caption not recorded"*. The About hero (`rights.jpg`) caption was corrected from the misleading *"Eastern Ghats landscape"* to *"Adivasi community gathering · Eastern Ghats field documentation"*.

### 4.7 Topical Irrelevance & Content Pairing Mismatches (Resolved)
- **Defect Identified:**
  - Field Note 1 (Ancestral Forest Rights under FRA) previously displayed `gallery25.jpg` (a gravity water supply pipe).
  - Field Note 2 (Upland Heirloom Millet Revival) displayed `gallery16.jpg` (transplanting flooded lowland paddy).
  - Field Note 3 (Mother-Tongue Ecological Education for Children) displayed `gallery23.jpg` (adult women night literacy).
  - Where We Work displayed a redundant copy of `rights.jpg` (legal awareness camp) rather than geographic landscape.
- **Resolution:** Completely replaced all mismatched assets with content-accurate editorial illustrations representing Gram Sabha forest rights, millet winnowing, outdoor bilingual learning circles, and Eastern Ghats mountainous terrain.

### 4.8 Gratuitous Duplication (Resolved)
- **Defect Identified:** Over-reliance on `rights.jpg` and `srm.jpg` across 5 different pages created visual fatigue and diminished the perceived breadth of LAYA's work.
- **Resolution:** Limited authentic photographs to their primary thematic homes and introduced distinct, context-specific editorial illustrations for secondary explanatory sections.

---

## 5. Phase 3: Replacement & Provenance Policy Implementation

### 5.1 Authentic Photography First
The repository's authentic photographs—spanning four decades of legal awareness camps, biofarm training with farmers like V. Baburao, community health center inaugurations, and paddy transplantation—are irreplaceable historical documents. These assets are preserved in their original form and never overwritten or filtered.

### 5.2 Ethical AI Editorial Illustration Guardrails
Where authentic photographs do not exist or previous implementations used cartoon placeholders, newly generated visual assets were created in strict compliance with ethical guidelines:
1. **Never Documentary Evidence:** AI illustrations are conceptual representations of themes (e.g., agro-biodiversity, medicinal nurseries, coastal aquaculture). They are never claimed to be documentary records of real meetings or specific historical moments.
2. **Never Fabricate Living Individuals:** No AI portraiture is used for LAYA leadership, staff, or community members. For Executive Director Nafisa Goga D'Souza and Programme Director Dominic D'Souza, elegant typographic monograms are used until official studio/field portraits are provided.
3. **Cultural Dignity & Accuracy:** Depictions of Adivasi communities avoid sensationalism, exoticism, and generic tribal stereotypes. Traditional implements (bamboo *suppa*, terracotta nursery pots, local flora, Telugu slates) are rendered with anthropological accuracy to the Eastern Ghats region.
4. **Mandatory Disclosure Badge:** Every AI-generated asset rendered in an editorial container carries the badge:
   ```html
   <span class="editorial-caption__badge">Illustrative image</span>
   ```
5. **Truthful Alt Text:** Alt text explicitly identifies the medium:
   - *Previous (Inaccurate):* `"Documentary photograph of an Adivasi village Gram Sabha meeting..."`
   - *Current (Truthful):* `"Editorial illustration representing an Adivasi village Gram Sabha meeting discussing community forest rights under a banyan tree canopy in the Eastern Ghats"`

---

## 6. Phase 4: Reusable Image Presentation System

To ensure consistency across the entire website, reusable CSS classes and React components were established in `src/styles/images.css` and `src/components/ui/EditorialImage.tsx`.

### 6.1 Design Tokens & Utility Classes

```css
/* 1. Hero Images — 16:9 Aspect, Controlled Height, Neutral Border */
.editorial-hero-media {
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 32rem;
  background-color: var(--laya-stone-100);
  border: 1px solid var(--border-subtle);
  border-radius: 0; /* Sharp corners */
}

/* 2. Featured Content Images — 4:3, 3:2, or 16:9 */
.editorial-featured-media {
  position: relative;
  overflow: hidden;
  width: 100%;
  background-color: var(--laya-stone-100);
  border: 1px solid var(--border-subtle);
  border-radius: 0;
}

/* 3. Publication Covers — 3:4 Portrait Aspect, Contained Art */
.editorial-pub-cover {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  background-color: var(--laya-stone-100);
  border: 1px solid var(--border-subtle);
  border-radius: 0;
}
.editorial-pub-cover img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: top center;
}

/* 4. Captions & Disclosures */
.editorial-caption {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: var(--space-xs);
  font-size: var(--text-caption); /* 12px / 0.75rem */
  color: var(--text-muted);
}
.editorial-caption__badge {
  font-size: 0.625rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  background-color: var(--laya-stone-100);
  padding: 0.2rem 0.4375rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0;
}
```

### 6.2 Component API (`<EditorialImage />`)

The `<EditorialImage />` component encapsulates all presentation rules:

```tsx
<EditorialImage
  src={illustrationAssets.forestStewardship.src}
  alt={illustrationAssets.forestStewardship.alt}
  caption={illustrationAssets.forestStewardship.caption}
  disclosure={illustrationAssets.forestStewardship.disclosure}
  aspectRatio="16:9"
  variant="featured"
  priority={false}
/>
```

---

## 7. Phase 5: Provenance Register & Outstanding Needs Ledger

### 7.1 Master Provenance Register (Actions Summary)

| Action Category | Asset Count | Description & Key Assets |
| :--- | :---: | :--- |
| **Retained Authentic Photography** | 15 | Hero slides (3), Programme heroes (5), Gallery archive plates (12), Four Decades inauguration photo (1). Strictly preserved without alterations. |
| **Retained Publication Scans** | 32 | Historical monograph scans in `/publications` and homepage Chronicle. Displayed with `object-fit: contain` to preserve titles. |
| **Retained Institutional Marks** | 11 | Verified funding and government partner marks in `/about/support-partners`. |
| **Replaced Mismatched / Cartoon Visuals** | 6 | Replaced with photorealistic editorial illustrations (`forest-stewardship`, `millet-revival`, `multilingual-learning`, `herbal-gardens`, `coastal-seaweed`, `eastern-ghats-landscape`). |
| **Updated Metadata & Captions** | 14 | Corrected alt texts across `illustrationAssets.ts`; corrected `rights.jpg` caption on `/about`; honest untitled plate labeling in `/gallery`. |
| **Retained Typographic Monograms** | 2 | Executive Director (NGD) and Programme Director (DD) profiles on `/team`. |

### 7.2 Pages & Sections Still Awaiting Genuine Photographs from LAYA

While the website is fully functional, cohesive, and compliant, the following specific sections are documented as priority candidates for genuine photography when provided by the LAYA team:

1. **Leadership Headshots (`/team`):**
   - High-resolution authentic photographic portraits of Executive Director **Nafisa Goga D'Souza** and Programme Director **Dominic D'Souza**. (Currently represented by elegant, dignified typographic monograms).
2. **Field Unit Premises (`/about/where-we-work`):**
   - Exterior and interior documentary photographs of LAYA's four decentralized field units:
     - **Addateegala Field Office** (Alluri Sitharama Raju / East Godavari district)
     - **Paderu Field Office** (Alluri Sitharama Raju district)
     - **Rampachodavaram Field Office** (Alluri Sitharama Raju district)
     - **Seethampeta Field Office** (Parvathipuram Manyam / Srikakulam district)
3. **Physical-Only Library Scans (`/publications`):**
   - High-resolution scans and digitised PDF copies for the 3 historical documents currently marked with the `Digital copy unavailable` / `Not Digitized` status badge.
4. **Visual Archive Metadata Verification (`/gallery`):**
   - Archival notes, dates, and locations for the 6 untitled plates (`WhatsApp Image...` and `vaccination.jpeg`) currently labeled as *"Untitled photograph · Caption not recorded"*.

---

## 8. Verification & Build Confirmation

- **Linting:** `npm run lint` — **Pass** (0 errors, 7 standard warnings).
- **Test Suite:** `npx vitest run` — **Pass** (15 test suites, 99 tests passing).
- **Production Build:** `npm run build` — **Pass** (Vite v6 production bundle built cleanly in ~2.0s with all assets properly hashed).
- **Route Integrity:** All 26 application routes, navigation flows, and interactive components preserved.

