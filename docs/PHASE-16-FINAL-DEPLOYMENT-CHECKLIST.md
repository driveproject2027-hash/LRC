# PHASE 16 — FINAL TECHNICAL AUDIT & DEPLOYMENT DECISION CHECKLIST

**Project:** LAYA Resource Centre Website ("Experiment LRC")  
**Release Candidate:** v1.0.0  
**Audit Timestamp:** October 16, 2026  
**Document Classification:** Final Technical Audit & Deployment Decision Checklist  
**Deployment State:** STRICTLY AUDIT ONLY — ZERO LIVE MODIFICATIONS / ZERO LIVE DEPLOYMENT  

---

## A. Current Readiness Verdict

### **VERDICT: READY WITH BLOCKERS**

- **Local Technical Codebase Readiness: 100% COMPLETE & PASSING.**
  The application source code, UI components, static asset manifests, single-page application routing, responsive layouts, accessibility hooks, security headers, server packaging, and test suites are release-hardened, fully documented, and passing all automated checks with zero errors.
- **Why Deployment is Blocked ("Ready with Blockers"):**
  Per user mandate and production hygiene principles, domain migration, DNS record changes, SSL issuance, and live hosting deployment are explicitly deferred. The system cannot and must not be cut over to production until specific architectural choices, domain confirmations, and backend infrastructure tasks are completed by the website owner and system administrators.

---

## B. Verified Local Technical Checks

All six automated quality gates were executed locally on macOS against the current release candidate. Every gate exited with code `0`:

| Quality Gate | Tool / Command | Target / Scope | Result / Exit Code | Evidence & Diagnostics |
| :--- | :--- | :--- | :--- | :--- |
| **1. Static Typing** | `npx tsc --noEmit` | Full project (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`) | **PASSED** (Exit 0) | 0 compilation errors across 54+ TypeScript modules. |
| **2. Code Quality & Lint** | `npm run lint` | ESLint 9 (`eslint.config.js`) | **PASSED** (Exit 0) | 0 errors. 7 known Fast Refresh advisory warnings in UI components (`badge.tsx`, `button.tsx`, `form.tsx`, `navigation-menu.tsx`, `sidebar.tsx`, `sonner.tsx`, `toggle.tsx`). |
| **3. Unit & Integration Tests** | `npm test` | Vitest 2.1 (`vitest.config.ts`) | **PASSED** (Exit 0) | **81/81 tests passing** across 12 test suites in 5.47s (Navigation, Stories, Publications, Gallery, Contact, Donations, Security, Assets). |
| **4. Production Build** | `npm run build` | Vite 5.4 (`vite.config.ts`) | **PASSED** (Exit 0) | Production bundle compiled cleanly in 1.73s. Generated hashed JS/CSS chunks, static documents, and responsive images in `dist/`. |
| **5. Dependency Security** | `npm audit --omit=dev` | Production dependencies (`package.json`) | **PASSED** (Exit 0) | **0 vulnerabilities** found in production dependencies. |
| **6. End-to-End Testing** | `npm run test:e2e` | Playwright (`playwright.config.ts`) | **PASSED** (Exit 0) | **16/16 tests passing** across Desktop Chrome and Mobile Chrome viewports in 21.5s. |

### Release Package Audit

The pre-packaged deployment bundles in `~/.gemini/antigravity-ide/brain/354863ce-4f43-45c8-b472-9ae578252b07/release-candidate-v1.0.0/` were re-inspected:
1. **`profile-a-iis`**: Verified containing `index.html`, `web.config` (with URL Rewrite Module 2.0 rules, security headers, and modern MIME mappings), `robots.txt`, `sitemap.xml`, `og-image.jpg`, `placeholder.svg`, `_redirects`, `assets/`, `documents/`. Excludes Apache `.htaccess`.
2. **`profile-b-apache`**: Verified containing `index.html`, `.htaccess` (with `mod_rewrite` SPA fallback and `mod_headers` security directives), `robots.txt`, `sitemap.xml`, `og-image.jpg`, `placeholder.svg`, `_redirects`, `assets/`, `documents/`. Excludes Windows `web.config`.
3. **`profile-c-express`**: Verified containing `server.js` (Express 5 production server with security middleware, dotfile blocking, and SPA routing), `package.json`, `package-lock.json`, `.env.example`, and `dist/`. Excludes server-specific config files from static root.
4. **`wordpress-plugin`**: Verified containing `wordpress_contact_api_integration.php` companion plugin (declaring `POST /wp-json/contact/v1/send` with 5 req/hr IP rate-limiting, field sanitization, HTML email rendering, and CORS support).
5. **Secret Hygiene**: Scanned all release bundles for sensitive tokens, private keys, database passwords, and SMTP secrets. **Zero leaked secrets.**

---

## C. Remaining Technical Blockers

Before production traffic can be served, the following 6 technical dependencies must be resolved:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      REMAINING TECHNICAL BLOCKERS                      │
├────────────────────────────────┬───────────────────────────────────────┤
│ Blocker                        │ Impact                                │
├────────────────────────────────┼───────────────────────────────────────┤
│ 1. Production Domain & URL     │ Canonical tags, OG URLs, and sitemap  │
│    Unconfirmed                 │ require final confirmation of target. │
├────────────────────────────────┼───────────────────────────────────────┤
│ 2. Hosting Architecture        │ Must select Profile A (IIS),          │
│    Unselected                  │ Profile B (Apache), or C (Express).   │
├────────────────────────────────┼───────────────────────────────────────┤
│ 3. DNS & SSL Unprovisioned     │ Target server must have A/CNAME and   │
│                                │ active TLS certificate before live.   │
├────────────────────────────────┼───────────────────────────────────────┤
│ 4. WordPress Plugin Inactive   │ Contact form will fail if endpoint    │
│                                │ is not registered on live WordPress.  │
├────────────────────────────────┼───────────────────────────────────────┤
│ 5. WordPress SMTP Unconfigured │ Submissions cannot be delivered to    │
│                                │ layarc@gmail.com without mailer.      │
├────────────────────────────────┼───────────────────────────────────────┤
│ 6. Contact Routing Architecture│ Must choose between Reverse-Proxy     │
│    Unmapped                    │ (recommended) and Direct CORS.        │
└────────────────────────────────┴───────────────────────────────────────┘
```

---

## D. Decisions the User Must Make

The project owner or primary decision-maker must formally decide on the following 5 points:

### Decision 1: Confirm Production Domain & Canonical URL
- **Context:** The current code and metadata reference `https://laya.org.in`.
- **Options:**
  - Option 1A: Primary root domain `https://laya.org.in` with 301 redirect from `https://www.laya.org.in`.
  - Option 1B: Primary subdomain `https://www.laya.org.in` with 301 redirect from `https://laya.org.in`.
  - Option 1C: Alternate staging/temporary domain (e.g., `https://preview.laya.org.in` or host-provided URL).
- **Required Action:** Authorize the exact canonical production URL string so canonical tags, Open Graph meta tags, `robots.txt`, and `sitemap.xml` align.

### Decision 2: Select the Hosting Architecture
- **Context:** Three production-ready packages have been built and verified.
- **Options:**
  - Option 2A: **Windows Server / Plesk (IIS)** — Deploy `profile-a-iis`. Requires IIS URL Rewrite Module 2.0.
  - Option 2B: **Linux / cPanel / Shared Hosting (Apache/LiteSpeed)** — Deploy `profile-b-apache`. Requires `mod_rewrite` and `AllowOverride All`.
  - Option 2C: **Node.js Cloud / Container / VPS (Express)** — Deploy `profile-c-express`. Requires Node.js 18+ runtime and process manager (e.g., PM2).
- **Required Action:** Select one profile based on the organization's existing web hosting subscription.

### Decision 3: Confirm Who Administers DNS and SSL
- **Context:** DNS records (A, AAAA, CNAME) and SSL/TLS certificates cannot be issued locally.
- **Options:**
  - Option 3A: Internal organization IT administrator manages DNS via domain registrar (e.g., GoDaddy, Namecheap) and SSL via Let's Encrypt / Certbot.
  - Option 3B: External hosting provider (e.g., cPanel AutoSSL, Cloudflare CDN proxy, Plesk SSL It!).
- **Required Action:** Identify the designated administrator contact with administrative credentials to manage DNS records and install SSL certificates.

### Decision 4: Confirm Access to the Live WordPress Installation
- **Context:** The companion contact API plugin must be deployed to the WordPress server.
- **Options:**
  - Option 4A: WordPress Administrator dashboard access (upload `.zip` or install plugin via WP Admin).
  - Option 4B: SFTP / FTP access to the server filesystem (`/wp-content/plugins/`).
  - Option 4C: SSH shell access to the WordPress server (WP-CLI or Git).
- **Required Action:** Provide access credentials to the WordPress administrator or delegate plugin installation to them.

### Decision 5: Confirm the SMTP Provider and Sender Configuration
- **Context:** PHP `wp_mail()` relies on a configured mail transport agent to reliably deliver messages to `layarc@gmail.com`.
- **Options:**
  - Option 5A: Dedicated transactional SMTP service (SendGrid, Postmark, Amazon SES, Brevo) via API or authenticated SMTP.
  - Option 5B: Dedicated Google Workspace / Microsoft 365 SMTP relay for `laya.org.in`.
  - Option 5C: Local hosting server SMTP (cPanel / Exim / Postfix) with SPF, DKIM, and DMARC DNS records.
- **Required Action:** Select the mail provider and confirm the authorized sender address (e.g., `notifications@laya.org.in` or `website@laya.org.in`).

---

## E. Tasks Requiring a Hosting Administrator

Once the hosting architecture is chosen, the hosting administrator must perform the following infrastructure preparations:

### For Profile A (IIS / Windows Server)
1. Verify that **Microsoft IIS URL Rewrite Module 2.0** is installed on the IIS server (`rewrite.dll`).
2. Create or configure an IIS Website pointing its physical path to the unpacked `profile-a-iis` directory.
3. Verify that `web.config` is active and that IIS does not throw an HTTP 500.19 (configuration error).
4. Bind HTTPS (port 443) with a valid SSL/TLS certificate issued for `laya.org.in`.
5. Ensure HTTP (port 80) automatically redirects to HTTPS via the rewrite rule in `web.config`.
6. Confirm static asset caching: verify that responses for `/assets/*` return `Cache-Control: public, max-age=31536000, immutable`.

### For Profile B (Apache / Linux Server)
1. Ensure Apache has `mod_rewrite` and `mod_headers` enabled (`a2enmod rewrite headers`).
2. Ensure the virtual host configuration permits `.htaccess` overrides:
   ```apache
   <Directory "/var/www/html">
       AllowOverride All
       Require all granted
   </Directory>
   ```
3. Upload and extract `profile-b-apache` into the document root (`public_html` or `/var/www/html/`).
4. Verify file permissions: Directories `755`, Files `644`.
5. Provision and bind an SSL certificate (e.g., via Let's Encrypt / Certbot / cPanel AutoSSL).
6. Test direct deep-link navigation (e.g., `https://laya.org.in/publications`) to confirm `.htaccess` rewrites to `index.html` with HTTP 200 (not 404).

### For Profile C (Express / Node.js Runtime)
1. Verify Node.js v18 LTS or v20 LTS is installed on the server environment.
2. Upload `profile-c-express` directory to the server application directory.
3. Run `npm install --omit=dev` inside the application directory to install production dependencies (`express`, `helmet`, `cors`, `compression`).
4. Configure environment variables in `.env` (`NODE_ENV=production`, `PORT=3000`).
5. Launch the process under a process supervisor (e.g., `pm2 start server.js --name "laya-web" --time`).
6. Configure the reverse proxy (Nginx or Apache) to forward public HTTPS traffic to `http://127.0.0.1:3000`.
7. Configure `pm2 save` and `pm2 startup` for automatic recovery on server reboots.

---

## F. Tasks Requiring WordPress / API Access

The WordPress administrator must perform the following steps on the WordPress installation:

### 1. Plugin Installation & Activation
- Package the plugin file: Compress [`wordpress_contact_api_integration.php`](file:///Users/nischalmittal/Desktop/Checks/Experiment%20LRC/docs/wordpress_contact_api_integration.php) into a directory named `laya-contact-api/`.
- Upload the directory to `/wp-content/plugins/laya-contact-api/` via SFTP or WordPress Plugin Upload.
- Activate the plugin in **WP Admin > Plugins > Installed Plugins > LAYA Website Contact API Integration**.

### 2. Pretty Permalinks Verification
- Navigate to **WP Admin > Settings > Permalinks**.
- Verify that permalinks are set to **Post name** (or any structure other than "Plain").
- Save changes to ensure `.htaccess` / IIS rewrite rules for WordPress REST API (`/wp-json/`) are active.

### 3. SMTP Mailer Configuration
- Install and configure a trusted SMTP plugin (e.g., **WP Mail SMTP** or **FluentSMTP**).
- Configure authenticated SMTP using the chosen provider (SendGrid, Google Workspace, SES, or cPanel mail).
- Set "From Email" to an authorized domain email (e.g., `no-reply@laya.org.in` or `contact@laya.org.in`).
- Set "From Name" to `LAYA Resource Centre Website`.
- Send a test email from the WP Mail SMTP diagnostic tool to `layarc@gmail.com` and confirm receipt.
- Ensure SPF (`v=spf1 ... ~all`), DKIM, and DMARC (`v=DMARC1; p=quarantine;`) DNS records are published to prevent spam filtering.

### 4. REST API Health Check
- Run diagnostic curl from a terminal to verify route registration:
  ```bash
  curl -I -X GET "https://<wordpress-domain>/wp-json/contact/v1/send"
  ```
- **Expected Response:** HTTP `405 Method Not Allowed` or `400 Bad Request` with JSON error payload (confirming the endpoint exists and accepts POST requests).
- If the response is HTTP `404 Not Found`, flush WordPress rewrite rules by re-saving Permalinks.

### 5. Routing Decision: Reverse-Proxy vs. Direct CORS
- **Recommended Architecture (Reverse-Proxy):**
  - Configure the frontend web server (IIS, Apache, or Express) to proxy incoming `POST /contact` requests to `https://<wordpress-domain>/wp-json/contact/v1/send`.
  - Leave `VITE_WP_API_URL` empty (`""`) in the frontend build.
  - **Benefits:** No cross-origin preflight requests (CORS), zero exposure of the WordPress administrative domain to browser inspection, client IP is preserved for rate-limiting.
- **Alternative Architecture (Direct CORS):**
  - Set `VITE_WP_API_URL=https://<wordpress-domain>/wp-json` at build time.
  - In `wordpress_contact_api_integration.php`, verify that the `Access-Control-Allow-Origin` header allows `https://laya.org.in`.

---

## G. Final Pre-Deployment Checklist

Execute this checklist in order immediately prior to deploying assets:

- [ ] **1. Freeze Git Workspace:** Confirm no unreviewed or debug code remains in the release branch.
- [ ] **2. Confirm Environment Config:** Verify `.env.example` has placeholder values only and no sensitive credentials.
- [ ] **3. Confirm WordPress Backend:** Confirm the WordPress plugin is active, test email succeeds, and `/wp-json/contact/v1/send` is reachable.
- [ ] **4. Backup Existing Target Server:** If replacing an existing site, create a full backup of the web root and database.
- [ ] **5. Upload Selected Profile:** Deploy only the chosen package (`profile-a-iis`, `profile-b-apache`, or `profile-c-express`).
- [ ] **6. Verify File Integrity:** Check that `index.html`, all `assets/*.js`, `assets/*.css`, and `documents/*.pdf` uploaded completely without corruption or 0-byte truncation.
- [ ] **7. Verify Server Permissions:** Ensure static files are readable by the web server daemon (`www-data`, `nginx`, `IUSR`).

---

## H. Post-Deployment Verification Checklist

Execute this comprehensive battery of checks immediately after DNS cutover and server deployment:

### 1. Homepage & Key Routes
- [ ] Load `https://laya.org.in/` — Verify HTTP 200, hero image displays, typography loads without FOIT/FOUT.
- [ ] Navigate to `/about` — Verify About section renders with leadership and mission cards.
- [ ] Navigate to `/who-we-are` — Verify organizational background and values render.
- [ ] Navigate to `/programmes` — Verify 5 thematic programme pillars display with correct icons.
- [ ] Navigate to all 5 Programme detail routes:
  - `/what-we-do/tribal-empowerment`
  - `/what-we-do/natural-resource-management`
  - `/what-we-do/sustainable-agriculture`
  - `/what-we-do/climate-change-and-renewable-energy`
  - `/what-we-do/sustainable-habitats`
- [ ] Navigate to `/impact` — Verify impact metrics and counter animations.
- [ ] Navigate to `/stories` — Verify Field Notes listing renders cards with tags.
- [ ] Navigate to at least 2 Story detail pages (e.g., `/stories/empowering-tribal-women`, `/stories/biofarm-transformation`).
- [ ] Navigate to `/publications` — Verify publications library renders document cards with download links.
- [ ] Navigate to `/gallery` — Verify visual archive grid renders photo thumbnails.
- [ ] Navigate to `/donate` — Verify honest bank transfer details and pledge form render.
- [ ] Navigate to `/contact` — Verify contact details, office address, and contact form render.
- [ ] Navigate to `/timeline` — Verify history timeline renders milestones.

### 2. Direct Navigation & Server-Side Fallback (SPA Refresh)
- [ ] Manually enter URL `https://laya.org.in/programmes/tribal-empowerment` in browser address bar and press Enter.
- [ ] Verify HTTP 200 is returned (NOT HTTP 404 or server default error page).
- [ ] Manually enter URL `https://laya.org.in/publications` and refresh the page (`Cmd+R` / `F5`).
- [ ] Verify page re-renders at the exact same route with state intact.
- [ ] Navigate to a deliberately nonexistent route: `https://laya.org.in/this-route-does-not-exist`.
- [ ] Verify the custom LAYA 404 page renders with a functional "Return to Home" button.

### 3. Mobile Layout & Responsive Navigation
- [ ] Open site on a mobile device or Chrome DevTools mobile emulation (375px width).
- [ ] Verify header logo scales correctly without overflowing viewport.
- [ ] Tap the mobile hamburger button — Verify slide-out navigation drawer opens smoothly.
- [ ] Verify background page scroll is locked while drawer is open.
- [ ] Tap a navigation link in the drawer — Verify drawer closes, navigation occurs, and scroll is unlocked.
- [ ] Tap the close ("X") button or backdrop — Verify drawer closes cleanly.
- [ ] Verify all data tables, cards, and image galleries adapt to single-column layout without horizontal scrollbar.

### 4. Contact Form Validation
- [ ] Navigate to `/contact`.
- [ ] Submit an empty form — Verify client validation prevents request, highlights invalid fields, and displays accessible error messages.
- [ ] Enter an invalid email (e.g., `user@invalid`) — Verify email format validation error appears.
- [ ] Enter message shorter than required minimum — Verify length validation error appears.
- [ ] Confirm `aria-invalid="true"` attributes are set on errored fields.

### 5. Contact API Response & In-Flight Protection
- [ ] Fill out the contact form with valid test data:
  - Name: `Audit Tester`
  - Email: `audit-test@example.com`
  - Subject: `General Inquiry`
  - Phone: `+91 99999 99999`
  - Message: `This is an automated post-deployment validation message.`
- [ ] Click Submit.
- [ ] Verify button displays loading spinner and is disabled during request in-flight.
- [ ] Verify form cannot be double-submitted while pending.
- [ ] Inspect Network tab: Verify `POST /contact` returns HTTP `200 OK` with JSON `{ "success": true, "message": "..." }`.
- [ ] Verify green success alert appears on the page and form fields reset.

### 6. Actual Email Delivery Verification
- [ ] Open the official receiving inbox: `layarc@gmail.com`.
- [ ] Confirm receipt of the test contact notification email within 2 minutes.
- [ ] Verify sender name, reply-to address (`audit-test@example.com`), and subject line (`[Website Contact] General Inquiry`).
- [ ] Verify email body contains all submitted fields, formatted cleanly in HTML.
- [ ] Verify email headers pass SPF and DKIM checks (not marked as Spam/Junk).

### 7. Security Headers Verification
- [ ] Execute `curl -I https://laya.org.in/` from an external terminal.
- [ ] Verify following security headers are present with appropriate values:
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY` (or `SAMEORIGIN`)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- [ ] Verify `Server` header does not leak detailed OS/server patch versions.
- [ ] Verify hidden files (`.env`, `.git`, `.htaccess`) return HTTP `403 Forbidden` or `404 Not Found`.

### 8. Canonical URLs, Robots.txt, & Sitemap.xml
- [ ] Inspect DOM of `https://laya.org.in/`: Verify `<link rel="canonical" href="https://laya.org.in/" />`.
- [ ] Inspect DOM of `https://laya.org.in/about`: Verify `<link rel="canonical" href="https://laya.org.in/about" />`.
- [ ] Fetch `https://laya.org.in/robots.txt`:
  - Verify `User-agent: *` is present.
  - Verify `Allow: /` is present.
  - Verify `Sitemap: https://laya.org.in/sitemap.xml` is present.
- [ ] Fetch `https://laya.org.in/sitemap.xml`:
  - Verify valid XML document with `urlset` schema.
  - Verify all 20+ core routes are listed with `<loc>https://laya.org.in/...`.
  - Verify zero `localhost` or staging URLs exist in the sitemap.

### 9. Browser Console & Server Log Hygiene
- [ ] Open browser Developer Tools > Console on every audited page.
- [ ] Verify **zero uncaught JavaScript runtime exceptions**.
- [ ] Verify zero 404s for chunk assets, font files, images, or documents.
- [ ] Review server access and error logs:
  - Verify no repeating 500 Internal Server Errors.
  - Verify no recursive rewrite loops.

---

## I. Explicit GO / NO-GO Criteria

The deployment team must evaluate this binary decision matrix prior to public announcement:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        GO / NO-GO DECISION MATRIX                      │
├────────────────────────────────────────────────────────────────────────┤
│ ALL CRITERIA BELOW MUST PASS FOR A "GO" DECISION:                      │
│                                                                        │
│ [ ] GO-1: Target domain resolves to production server via HTTPS.       │
│ [ ] GO-2: SSL certificate is valid, trusted, and non-expired.          │
│ [ ] GO-3: Web server returns HTTP 200 on deep SPA routes upon refresh. │
│ [ ] GO-4: Contact form submission successfully sends email to inbox.   │
│ [ ] GO-5: Mobile navigation opens and closes smoothly on iOS/Android.  │
│ [ ] GO-6: Zero uncaught console errors on all core routes.             │
│ [ ] GO-7: Security headers verified present via external curl.         │
│ [ ] GO-8: Static asset caching active (1-year immutable headers).      │
├────────────────────────────────────────────────────────────────────────┤
│ ANY SINGLE CONDITION BELOW TRIGGERS AN IMMEDIATE "NO-GO" / ROLLBACK:   │
│                                                                        │
│ [!] NO-GO 1: Direct link navigation returns HTTP 404 (rewrite failed). │
│ [!] NO-GO 2: SSL certificate mismatch, untrusted warning, or HTTP loop.│
│ [!] NO-GO 3: Contact submissions fail with 500 error or silent drop.   │
│ [!] NO-GO 4: Contact form email is flagged as phishing/spam by Gmail.  │
│ [!] NO-GO 5: Assets (JS/CSS) return 404, causing white screen of death.│
│ [!] NO-GO 6: Sensitive files (.env, server.js) exposed over public web.│
└────────────────────────────────────────────────────────────────────────┘
```

---

## J. Distinction: Locally Verified vs. Untested Production Behavior

To maintain absolute technical honesty, the table below documents the boundary between what has been mathematically proven in local automated testing versus what requires live verification upon deployment:

| System Subsystem | Locally Verified Behavior (Proven) | Untested Live Production Behavior (Pending Live Deploy) |
| :--- | :--- | :--- |
| **Frontend UI & Layout** | Verified across all breakpoints (Desktop 1280px, Mobile 375px) in Chromium via 16 Playwright tests and 81 Vitest unit tests. Zero CSS layout breaks. | Real-world iOS WebKit (Safari), Samsung Internet, and low-end Android mobile browser font/rendering quirks under variable network conditions. |
| **Client-Side Routing** | React Router DOM v6 verified handling all 20+ routes, dynamic story slugs, and unknown route 404 fallback in MemoryRouter and real browser. | Real web-server fallback handling under Apache `mod_rewrite`, IIS URL Rewrite 2.0, or LiteSpeed under concurrent traffic. |
| **Contact Form UI** | Input validation, error message rendering, duplicate click prevention, and optimistic loading states verified in Vitest & Playwright. | Real network latency, corporate proxy interceptors, and ad-blockers blocking client POST requests. |
| **Contact API Endpoint** | Integration plugin PHP code statically verified; Express server endpoint verified with 14 automated security unit tests. | Live WordPress execution environment (PHP version, disabled PHP functions like `proc_open` or `curl`, WordPress memory limit). |
| **Email Delivery** | Form payload schema, sanitization, and HTML email template generation verified in test fixtures. | Real SMTP authentication, MTA queue delivery, SPF/DKIM/DMARC DNS alignment, and Gmail spam-filter reputation scoring. |
| **Rate Limiting** | Express rate limiter verified (5 req/hr) and WordPress transient rate limiter code verified. | Real-world client IP detection when requests pass through Cloudflare, reverse proxies, or load balancers (`X-Forwarded-For`). |
| **SSL / TLS & DNS** | XML config, `.htaccess`, and Express HSTS headers verified configured for HTTPS enforcement. | Live DNS propagation across global recursive resolvers; Let's Encrypt automated ACME HTTP-01 challenge completion. |
| **Asset Performance** | Vite build optimization verified (1.73s build, code-splitting, WebP hero images, 0 audit vulnerabilities). | Actual CDN cache hit ratio, time-to-first-byte (TTFB), and real-user Core Web Vitals over cellular mobile networks in India. |

---

## Summary Statement & Operational Sign-off

The LAYA Resource Centre Website ("Experiment LRC") Release Candidate v1.0.0 has completed all local development, hardening, and packaging phases with exceptional quality:
- **TypeScript:** 0 errors
- **ESLint:** 0 errors (7 component warnings)
- **Vitest:** 81/81 passed
- **Production Build:** Clean (1.73s)
- **Dependency Audit:** 0 vulnerabilities
- **Playwright E2E:** 16/16 passed (21.5s)

The technical assets are completely prepared in three distinct deployment profiles. Proceeding to live deployment requires executing the decisions in Section D and the checklists in Sections E, F, G, and H.
