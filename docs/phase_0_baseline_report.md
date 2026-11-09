# Phase 0 — Baseline & Website Mapping Report

**Project:** The LAYA Chronicle (Resource Center for Adivasis)  
**Date:** October 15, 2026  
**Status:** Baseline Completed & Verified (No Application Code Modified)  
**Location:** `docs/phase_0_baseline_report.md`

---

## 1. Executive Summary & Baseline Objectives

This document establishes the official Phase 0 baseline for the LAYA website repository. Before introducing any code or design changes in subsequent phases, every existing page, route, shared layout, external integration, dependency, and configuration was inspected and verified.

### Core Baseline Findings
- **Application Verification Suite:**
  - **TypeScript:** 0 errors (`npx tsc --noEmit` exited code 0).
  - **ESLint:** 0 errors, 7 warnings (`npm run lint` exited code 0; all 7 warnings are Fast-Refresh component exports in `src/components/ui/*.tsx`).
  - **Vitest Unit & Integration Tests:** 15/15 passing (100% pass across `navigation.test.ts` and `example.test.tsx`).
  - **Vite Production Build:** Successfully built in 1.78s (`npm run build` exited code 0, emitting static assets in `dist/`).
  - **Local Development Server:** Successfully running on port 8080 (`http://localhost:8080`), responding with `HTTP 200 OK`.
- **Code Preservation Confirmation:**
  - **Zero application source code files have been modified.**
  - **Zero packages have been installed, upgraded, or deleted.**
  - **Existing tests, build scripts, dependencies, and runtime behavior remain 100% intact.**

---

## 2. Complete Route & Page Inventory

The application is built with React 18, React Router 7, and Vite. All public pages are routed in `src/App.tsx`, wrapped in `src/layouts/MainLayout.tsx`, and animated using Framer Motion (`PageTransition`).

| Route Path | Page Component | Layout | Page Title (`<Helmet>`) | Navigation Mapping | Features & Integrations |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `src/pages/Index.tsx` | `MainLayout` | The LAYA Chronicle \| Resource Center for Adivasis | Brand Logo (Header) | Hero crossfade slider (3 slides), 40-year milestone narrative, programmes preview, impact counter statistics, voices of accompaniment, latest stories. |
| `/about` | `src/pages/About.tsx` | `MainLayout` | About Us \| LAYA | Header "About" > "Our Story" & Footer "Explore" | Foundational narrative of accompaniment in the Eastern Ghats; sub-navigation links to all 7 about sub-sections. |
| `/about/who-we-are` | `src/pages/about/WhoWeAre.tsx` | `MainLayout` | Who We Are \| LAYA | Header "About" > "Who We Are", "Our Journey" | Vision, mission, values, and 7 historical phases (1984–present). |
| `/about/way-we-work` | `src/pages/about/AboutPages.tsx` | `MainLayout` | The Way We Work \| LAYA | Header "About" > "How We Work" & Footer "Explore" | Field methodology, community accompaniment, decentralized accountability systems. |
| `/about/where-we-work` | `src/pages/about/AboutPages.tsx` | `MainLayout` | Where We Work \| LAYA | Header "About" > "Where We Work" & Footer "Explore" | Geographic coverage across Andhra Pradesh (Alluri Sitharama Raju, Parvathipuram Manyam, Eluru, East Godavari). |
| `/about/financial-reports` | `src/pages/about/AboutPages.tsx` | `MainLayout` | Financial Reports \| LAYA | Header "Resources" & Footer "Transparency" | Annual foreign contribution returns (FC-4 disclosures) spanning 2019-2020 through 2024-2025 with 6 live external PDF download links. |
| `/about/fcra-information` | `src/pages/about/AboutPages.tsx` | `MainLayout` | FCRA Information \| LAYA | Header "Resources" & Footer "Transparency" | FCRA Registration No. 010170104, registration dates, renewal validity (2024-2029), SBI New Delhi account details, quarterly receipts list. |
| `/about/governance` | `src/pages/about/AboutPages.tsx` | `MainLayout` | Governance \| LAYA | Header "About" & Footer "Transparency" | General Body roster and Board of Management members with designations and professions. |
| `/about/support-partners` | `src/pages/about/AboutPages.tsx` | `MainLayout` | Support Partners \| LAYA | Header "About" & Footer "Transparency" | Partner logos (Bread for the World, Misereor, DST, APPI, Asha, etc.) and institutional partnership records. |
| `/programs` | `src/pages/Programs.tsx` | `MainLayout` | Programmes \| LAYA | Header "Our Work" > "All Programmes" & Footer "Our Work" | Directory overview of all 5 thematic programme areas. |
| `/what-we-do/rla` | `src/pages/WhatWeDoCategory.tsx` | `MainLayout` | Rights & Entitlements \| Programmes \| LAYA | Header "Our Work" > "Rights & Entitlements" | Land rights, Forest Rights Act (FRA), Gram Sabhas, legal awareness. |
| `/what-we-do/hbhc` | `src/pages/WhatWeDoCategory.tsx` | `MainLayout` | Herbal-Based Health Care \| Programmes \| LAYA | Header "Our Work" > "Health" | Community herbal medicine, medicinal plant conservation, traditional healers. |
| `/what-we-do/srm` | `src/pages/WhatWeDoCategory.tsx` | `MainLayout` | Sustainable Resource Management \| Programmes \| LAYA | Header "Our Work" > "Livelihoods & Natural Resources" | Agro-ecological farming, indigenous seeds, watershed management, biofarms. |
| `/what-we-do/lifelong-learning` | `src/pages/WhatWeDoCategory.tsx` | `MainLayout` | Lifelong Learning \| Programmes \| LAYA | Header "Our Work" > "Education & Lifelong Learning" | Youth leadership, Adivasi Academy, women leadership, tribal curriculum. |
| `/what-we-do/climate-crisis-sustainable-development` | `src/pages/WhatWeDoCategory.tsx` | `MainLayout` | Climate & Environment \| Programmes \| LAYA | Header "Our Work" > "Climate & Environment" | Renewable energy (biogas, clean cooking), community resilience, climate advocacy. |
| `/what-we-do/coastal_ecosystem` | Client Redirect | — | — | Legacy URL | 301 client redirect to `/what-we-do/climate-crisis-sustainable-development`. |
| `/what-we-do/coastal_ecosystem.html` | Client Redirect | — | — | Legacy URL | 301 client redirect to `/what-we-do/climate-crisis-sustainable-development`. |
| `/publications` | `src/pages/Publications.tsx` | `MainLayout` | Resource Centre \| LAYA | Header top-level "Publications", dropdown under "Resources", and Footer | 33 documents: full-text search, category filter, document type filter, View/Download actions (30 live PDFs, 3 marked unavailable). |
| `/publications.html` | Client Redirect | — | — | Legacy URL | 301 client redirect to `/publications`. |
| `/stories` | `src/pages/Stories.tsx` | `MainLayout` | Stories from the Field \| LAYA | Header "Impact" > "Stories from the Field" & Footer "Resources" | 4 documentary field stories with cards linking to slug details. |
| `/stories/:slug` | `src/pages/stories/StoryDetail.tsx` | `MainLayout` | Story Detail View \| LAYA | Dynamic Child Route | Long-form reading layout, pull quotes, back navigation. |
| `/impact` | `src/pages/Impact.tsx` | `MainLayout` | Our Impact \| LAYA | Header "Impact" > "Our Impact" & Footer "Resources" | Quantified impact numbers, historical milestones, stakeholder testimonials. |
| `/gallery` | `src/pages/Gallery.tsx` | `MainLayout` | Visual Archive \| LAYA | Header "Resources" > "Gallery" & Footer "Resources" | 12 documentary photograph plates, archival metadata, full-screen lightbox modal with keyboard controls (Esc, Left, Right). |
| `/team` | `src/pages/about/AboutPages.tsx` | `MainLayout` | Our Team \| LAYA | Header "About" > "Our Team" & Footer "Explore" | Organization team profiles, designations, and background bios. |
| `/donate` | `src/pages/Donate.tsx` | `MainLayout` | Donate \| LAYA | Header Action CTA Button & Footer "Connect" | 80G tax exemption info, Domestic & Foreign bank transfer coordinates with copy-to-clipboard buttons, pledge intent form. |
| `/contact` | `src/pages/Contact.tsx` | `MainLayout` | Contact \| LAYA | Header Secondary Action & Footer "Connect" | Official postal address, telephone, email, interactive contact form with field validation and submission handling. |
| `*` | `src/pages/NotFound.tsx` | `MainLayout` | Page Not Found \| LAYA | Catch-all | 404 error page with navigation to Home. |

---

## 3. Existing Build, Test, Lint, and Type-Check Results

### 3.1 Type Checking (`npx tsc --noEmit`)
- **Result:** PASSED (Exit Code: 0)
- **Output:** Clean, zero type errors.

### 3.2 Linting (`npm run lint` via ESLint 9.32.0)
- **Result:** PASSED (Exit Code: 0)
- **Errors:** 0 errors
- **Warnings:** 7 warnings (all in `src/components/ui/*.tsx` for Fast-Refresh `react-refresh/only-export-components` due to standard shadcn/ui multi-export patterns: `badge.tsx`, `button.tsx`, `form.tsx`, `navigation-menu.tsx`, `sidebar.tsx`, `sonner.tsx`, `toggle.tsx`).

### 3.3 Test Suite (`npm test` via Vitest 3.2.4)
- **Result:** PASSED (Exit Code: 0, Duration: ~1.62s)
- **Files Executed:**
  - `src/test/navigation.test.ts`: 11 tests passed (tests complete route coverage contract, header items, active states, brand matching).
  - `src/test/example.test.tsx`: 4 tests passed (tests `useContactForm` and `ContactModal` under resolved and rejected promises).
- **Totals:** 2 test files passed, 15 tests passed, 0 failures.

### 3.4 Production Build (`npm run build` via Vite 8.3.3)
- **Result:** PASSED (Exit Code: 0, Duration: 1.78s)
- **Generated Bundles:**
  - `dist/index.html`: 7.35 kB (2.96 kB gzipped)
  - `dist/assets/index-*.css`: 166.76 kB (25.10 kB gzipped)
  - `dist/assets/MainLayout-*.js`: 223.95 kB (75.33 kB gzipped)
  - `dist/assets/index-*.js`: 323.04 kB (105.27 kB gzipped)
  - 20+ lazily loaded route chunks.
- **Pre-existing Build Warnings:**
  - `vite.config.ts:19:25`: `__dirname` is deprecated in Vite 8 native configuration loading.
  - `@vitejs/plugin-react-swc` note regarding OXC.
  - Browserslist database notification.

### 3.5 Local Dev Server
- Dev server running on `http://localhost:8080`.
- Verified connectivity via `curl -sI http://localhost:8080`: `HTTP/1.1 200 OK`.

---

## 4. Dependency Security Audit Results

The dependency tree was audited via npm audit data recorded in `audit_report.json`.

### 4.1 Severity Summary
- **Total Dependencies Audited:** 715 (230 production/runtime, 486 development, 117 optional)
- **Total Vulnerabilities:** 34
- **Severity Breakdown:**
  - **Critical:** 2
  - **High:** 25
  - **Moderate:** 6
  - **Low:** 1

### 4.2 Detailed Breakdown of Affected Packages

| Package Name | Severity | Type | Range Affected | Fix Available | Production Bundle Affected? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `vitest` | **CRITICAL** | Direct (dev) | `<=4.1.10` | Yes | No (Test runner only) |
| `tinypool` | **CRITICAL** | Transitive | `<=2.1.1` | Yes | No (Test worker thread pool) |
| `axios` | **HIGH** | Direct (prod) | `1.0.0 - 1.19.0` | Yes | **Yes (Client runtime)** |
| `react-router-dom` | **HIGH** | Direct (prod) | `6.0.0-alpha.0 - 6.30.2` | Yes | **Yes (Client runtime)** |
| `react-router` | **HIGH** | Transitive | `6.0.0 - 7.17.0` | Yes | **Yes (Client runtime)** |
| `@remix-run/router` | **HIGH** | Transitive | `<=1.23.2` | Yes | **Yes (Client runtime)** |
| `tailwindcss` | **HIGH** | Direct (dev) | `<=3.4.19` | Yes (v4) | No (Build-time CSS compiler) |
| `typescript-eslint` | **HIGH** | Direct (dev) | `8.2.1-alpha.0 - 8.47.1` | Yes | No (Linter only) |
| `@typescript-eslint/*` (5 pkgs) | **HIGH** | Transitive | `8.2.1-alpha.0 - 8.47.1` | Yes | No (Linter only) |
| `lovable-tagger` | **HIGH** | Direct (dev) | `>=1.1.1` | Yes | No (Dev-only plugin) |
| `browserslist` | **HIGH** | Transitive | `<=4.28.6` | Yes | No (Build-time only) |
| `chokidar` | **HIGH** | Transitive | `2.0.0 - 3.6.0` | Yes | No (File watcher) |
| `micromatch` / `braces` / `picomatch` / `glob` / `fast-glob` / `minimatch` | **HIGH** | Transitive | Various | Yes | No (Build-time globbing) |
| `lodash` | **HIGH** | Transitive | `<=4.17.23` | Yes | No (Build tooling) |
| `form-data` | **HIGH** | Transitive | `4.0.0 - 4.0.5` | Yes | No (Dev tooling) |
| `flatted` / `js-yaml` | **HIGH** | Transitive | Various | Yes | No (Dev tooling) |
| `@tailwindcss/typography` | **MODERATE** | Direct (dev) | `<=0.0.0` or `>=0.5.5` | Yes | No (Build-time CSS plugin) |
| `@humanfs/node` | **MODERATE** | Transitive | `<0.16.8` | Yes | No (ESLint tooling) |
| `@vitest/mocker` | **MODERATE** | Transitive | `2.1.0 - 4.1.10` | Yes | No (Test tooling) |
| `ajv` | **MODERATE** | Transitive | `<6.14.0` | Yes | No (Schema validation) |
| `postcss-selector-parser` | **MODERATE** | Transitive | `<=7.1.5` | Yes | No (PostCSS build plugin) |
| `yaml` | **MODERATE** | Transitive | `2.0.0 - 2.8.2` | Yes | No (Dev tooling) |
| `@tootallnate/once` | **LOW** | Transitive | `<2.0.1` | Yes | No (Dev tooling) |

*Note: Per Phase 0 guidelines, dependencies are recorded as a baseline and are NOT updated or modified at this time.*

---

## 5. Git & Environment File Inspection

### 5.1 `.env` Tracking & Git History Audit
- **Git Tracking Status:** `git ls-files .env` returns empty. `.env` is **NOT tracked by Git**.
- **`.gitignore` Rules:**
  ```text
  .env
  .env.*
  !.env.example
  *.local
  ```
  `.env` is explicitly ignored. `git status --ignored -- .env` confirms it is classified as `Ignored`.
- **Git History Secret Audit:**
  - `git log --all --full-history --stat -- .env*`: **0 commits found**. Neither `.env` nor any variant has ever been committed into the Git repository history.
  - `git log -p -S "VITE_WP_API_URL"`: The only occurrences in commit history are code references (`const WP_API_BASE = import.meta.env.VITE_WP_API_URL || "";`) and documentation examples (`https://example.com/wp-json`). No secret credentials exist in the Git log.

### 5.2 Build Configuration & Browser-Exposed Environment Variables
- **Vite Variable Exposure Rule:** Vite exposes only variables prefixed with `VITE_` via `import.meta.env.*`. Non-prefixed variables are stripped at build time.
- **Variables Identified in Build:**
  - `VITE_WP_API_URL`: Defined in `.env` (redacted in report). It is consumed in `src/services/api.ts` to configure Axios base URL (`import.meta.env.VITE_WP_API_URL || ""`). Because of the `VITE_` prefix, its string value is statically compiled into the client production bundle.
- **Server-Only Variables:**
  - `PORT`: Consumed exclusively in `server.js` (`process.env.PORT || 3000`) by the Hostinger Node.js Express server. It is executed in the server process only and is never exposed to browser bundles.
- **Secret Values:** No API keys, database credentials, passwords, or private access tokens are exposed or committed.

---

## 6. Known Configuration Discrepancies & Unresolved Items

### 6.1 Production Domain Discrepancy (Unresolved Verification Item)
- **Finding:**
  1. `<Helmet>` canonical link tags across all page components in `src/pages/` point to `https://laya.org.in/`.
  2. `index.html` Open Graph image and Schema.org structured data point to `https://laya.org.in/`.
  3. `public/robots.txt` points to `Sitemap: https://springgreen-squid-138681.hostingersite.com/sitemap.xml`.
  4. `public/sitemap.xml` specifies `<loc>https://springgreen-squid-138681.hostingersite.com/...</loc>`.
- **Status:** **UNRESOLVED VERIFICATION ITEM**.
- **Action Required:** Do not modify canonical URLs or sitemap configurations without explicit stakeholder confirmation regarding the official live production domain vs. Hostinger deployment alias.

### 6.2 WhatsApp Contact Number Discrepancy (Confirmed Bug)
- **Finding:**
  1. Floating button in `src/components/WhatsAppButton.tsx` hardcodes:
     ```ts
     const WHATSAPP_NUMBER = "918912737662";
     ```
     This number corresponds to the Visakhapatnam landline digits (telephone: `+91-891-2737662` in `index.html`), which cannot receive WhatsApp messages.
  2. The official mobile WhatsApp number in `src/content/contact.ts` is:
     ```ts
     whatsapp: "919949731307" // (+91 99497 31307)
     ```
- **Status:** **CONFIRMED DEFECT** (queued for Phase 1 fix).

### 6.3 Dead Social Media Links (Confirmed Defect)
- **Finding:**
  - `src/content/contact.ts` contains `{ label: "YouTube", href: "#" }`. Clicking the YouTube icon in the footer navigates to `#` (dead link).
- **Status:** **CONFIRMED DEFECT** (queued for Phase 1 fix).

---

## 7. Visual Inspection Status & Alternative Testing Strategies

### 7.1 Visual Inspection Status
- **Status:** **Browser-based visual inspection was unsuccessful.**
- **Note:** It is explicitly recorded that not every page has been visually verified in an active browser session.

### 7.2 Alternative Testing Strategies
To thoroughly validate visual layout, page responsiveness, and client-side behavior without relying on ad-hoc interactive browsing:
1. **Automated Playwright / Puppeteer Headless Suite:**
   - The repository already has `@playwright/test` (v1.57.0), `puppeteer` (v25.12.0), `playwright.config.ts`, and `playwright-fixture.ts` configured.
   - Run an automated script to visit every route at `http://localhost:8080`, capture full-page PNG screenshots across mobile (375px), tablet (768px), and desktop (1280px), and assert 0 uncaught browser console errors (`page.on('console')`, `page.on('pageerror')`).
2. **DOM Smoke Tests via Vitest & React Testing Library:**
   - Mount each route component in memory with React Router and verify that critical headings, navigation triggers, and interactive elements render without unhandled exceptions.
3. **HTTP Route Crawler:**
   - Run an automated crawler against the local preview/production server to verify all routes return `HTTP 200` and all linked asset URLs (JS, CSS, images, PDFs) return valid status codes without 404s.
4. **Manual Staging Review:**
   - Visual verification by QA or stakeholders on mobile and desktop viewports once deployed to the staging environment.

---

## 8. Current Git Status & Remotes

### 8.1 Git Working Tree
- **Branch:** `main` (ahead of `origin/main` by 2 commits: `4a736d9`, `85eba19`).
- **Tracked Files:** Clean working tree. No tracked files modified.
- **Untracked Diagnostic/Audit Files (Preserved on Disk):**
  - `audit_report.json`
  - `audit_summary.md`
  - `build-log.txt`
  - `generate_audit_report.cjs`
  - `laya-website-build.zip`
  - `optimize_hero.py`
  - `prod_audit.json`
  - `test-click.js`
  - `test-logos.ts`

### 8.2 Remotes
- `origin`: `https://github.com/driveproject2027-hash/LRC.git` (fetch & push)
- `new-origin`: `https://github.com/driveproject2027-hash/laya-website-new.git` (fetch & push)
- **Constraint Compliance:** Per user requirements, no code has been pushed and remotes remain untouched.

---

## 9. Comprehensive Issue Register

### Category A: Confirmed Findings (Defects / Code Issues)
1. **`[CONFIRMED-C1]` Wrong WhatsApp Number:** `WhatsAppButton.tsx` points to landline `918912737662` instead of mobile `919949731307`.
2. **`[CONFIRMED-C2]` Dead YouTube Link:** `contact.ts` has `{ label: "YouTube", href: "#" }`.
3. **`[CONFIRMED-C3]` Missing Digitized Documents:** 3 of 33 publications in `resources.ts` have `link: "#"` without explanatory user messaging.
4. **`[CONFIRMED-C4]` Vite Deprecation Warning:** `vite.config.ts:19` uses deprecated `__dirname` instead of `import.meta.dirname`.
5. **`[CONFIRMED-C5]` ESLint Component Warnings:** 7 Fast-Refresh warnings in `src/components/ui/*.tsx`.
6. **`[CONFIRMED-C6]` Dependency Vulnerabilities:** 34 vulnerabilities recorded in npm audit (including direct runtime dependencies `axios` and `react-router-dom`).
7. **`[CONFIRMED-C7]` Dead / Unrouted Code:** `src/pages/Timeline.tsx` re-exports Donate and is unreferenced by the router; `src/components/ContactModal.tsx` is only referenced in Vitest tests and never mounted on any route.

### Category B: Suspected Issues (UX & Behavioral)
1. **`[SUSPECTED-S1]` Donate Form Persistence:** Pledge intent form in `Donate.tsx` only updates local React state without network dispatch or persistence.
2. **`[SUSPECTED-S2]` Contact Form Endpoint Seam:** Contact form depends on external `VITE_WP_API_URL` availability for POST `/contact`.
3. **`[SUSPECTED-S3]` Publications Search Debounce:** Document search in `Publications.tsx` filters on every keystroke without debouncing.
4. **`[SUSPECTED-S4]` Hero Slider Autoplay UX:** Auto-advances every 6 seconds without pausing on hover.
5. **`[SUSPECTED-S5]` Gallery Lightbox Focus Trap:** Modal dialog lacks an accessibility focus trap.
6. **`[SUSPECTED-S6]` Footer Text Contrast:** Copyright text opacity on dark footer background may fail WCAG AA contrast.

### Category C: Items Requiring Manual / Stakeholder Verification
1. **`[VERIFY-M1]` Production Canonical Domain:** Align canonical URLs (`https://laya.org.in/`) vs. sitemap/robots.txt (`https://springgreen-squid-138681.hostingersite.com/`).
2. **`[VERIFY-M2]` Responsive Layout Verification:** Perform full-viewport visual inspection across breakpoints using Playwright screenshots or manual review.
3. **`[VERIFY-M3]` External PDF Health:** Verify that all 30 external PDF links on `https://laya.org.in/...` remain accessible.
4. **`[VERIFY-M4]` Bank Account Details:** Confirm domestic and foreign bank account coordinates with organization finance officials.

---

## 10. Phase 0 Completion Sign-off

- [x] Complete route & page inventory documented.
- [x] Existing build, test, lint, and type-check results verified with evidence.
- [x] Complete dependency security audit recorded.
- [x] Git tracking and `.env` audit completed with zero secret exposure.
- [x] Build configuration and browser environment variables inspected.
- [x] Production domain discrepancy recorded as unresolved verification item.
- [x] Browser visual inspection status honestly recorded; alternative testing strategies identified.
- [x] Git status and remotes preserved without pushes or remote modifications.
- [x] Issue register classified into Confirmed, Suspected, and Manual Verification items.
- [x] **Confirmation:** Zero application code, dependencies, or tests modified during Phase 0.
