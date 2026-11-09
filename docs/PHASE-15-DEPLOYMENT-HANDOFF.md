# PHASE 15 — DEPLOYMENT ARCHITECTURE & HANDOFF READINESS REPORT

**Project:** LAYA Resource Centre Website ("Experiment LRC")  
**Release Candidate:** v1.0.0  
**Audit Date:** October 16, 2026  
**Mode:** Local-only Audit & Packaging (Strictly Read-Only / Zero Live Deployment)

---

## 1. Executive Verdict

### **VERDICT: READY WITH BLOCKERS**

- **Code & Test Readiness: 100% COMPLETE & VERIFIED LOCALLY.**  
  The application source code, UI components, content registries, asset bundles, web-server profiles, and test suites are release-hardened and passing all automated quality checks with zero errors.
- **Why "Ready with Blockers":**  
  Per user instruction, domain connection and live WordPress deployment are explicitly deferred. The code cannot and should not be deployed until the external infrastructure prerequisites (DNS delegation, SSL certification, hosting platform selection, and WordPress backend activation) are confirmed by external administrators.

---

## 2. Release Package Inventory & Validation Results

The Release Candidate v1.0.0 packages were inspected and verified in the artifact staging repository:
`~/.gemini/antigravity-ide/brain/354863ce-4f43-45c8-b472-9ae578252b07/release-candidate-v1.0.0/`

| Package | Intended Platform | Contents Included | Contents Excluded | Validation Status |
| :--- | :--- | :--- | :--- | :--- |
| **`profile-a-iis`** | Windows Server / Plesk (IIS) | `index.html`, `web.config`, `robots.txt`, `sitemap.xml`, `og-image.jpg`, `placeholder.svg`, `_redirects`, `assets/`, `documents/` | `.htaccess` (excluded to avoid Apache conflict) | **VERIFIED** — Valid IIS URL rewrite and custom header XML schema. |
| **`profile-b-apache`** | Linux / cPanel (Apache / LiteSpeed) | `index.html`, `.htaccess`, `robots.txt`, `sitemap.xml`, `og-image.jpg`, `placeholder.svg`, `_redirects`, `assets/`, `documents/` | `web.config` (excluded to avoid Windows IIS conflict) | **VERIFIED** — Valid `mod_rewrite` SPA routing and `mod_headers`. |
| **`profile-c-express`** | Node.js (Hostinger / Docker / VPS) | `server.js`, `package.json`, `package-lock.json`, `.env.example`, `dist/` (`index.html`, `assets/`, `documents/`, etc.) | `web.config`, `.htaccess` (excluded from static `dist/`) | **VERIFIED** — Standalone Express 5 server; dotfile traversal denied; safe method restrictions. |
| **`wordpress-plugin`** | WordPress CMS (Backend) | `wordpress_contact_api_integration.php` | Frontend application assets | **VERIFIED** — Secure REST route `contact/v1/send` with rate-limiting, boundary checks, and CORS filter. |

---

## 3. Environment-Variable Checklist

| Variable | Scope | Required At | Default / Placeholder | Production Requirement |
| :--- | :--- | :--- | :--- | :--- |
| `VITE_WP_API_URL` | Frontend client bundle | Build time (Vite) | `""` (Blank / empty string) | **Reverse-Proxy (Recommended):** Leave blank so submissions target same-origin `/contact`.<br>**Direct CORS:** Set to `https://<cms-domain>/wp-json`. |
| `PORT` | Node.js runtime only | Runtime (`server.js`) | `3000` | Optional. Managed hosts (Hostinger/Heroku/cPanel) inject this automatically. |
| `NODE_ENV` | Build & Runtime | Build & Runtime | `production` | Set to `production` for optimized minification and suppressing debug server logs. |

### Security & Exposure Rules
- Vite exposes **only** variables prefixed with `VITE_` to client JavaScript bundles.
- `VITE_WP_API_URL` contains zero secrets and is purely a public API base URL.
- No database passwords, private keys, SMTP credentials, or secret tokens exist in `.env.example` or are bundled into client code.

---

## 4. Contact Integration Request-Flow Assessment

### Full Request Path
```
[User Browser]
       │
       ▼
1. Form submission on /contact (validated in Contact.tsx & use-contact-form.ts)
       │
       ▼
2. Axios client POST request to /contact (src/services/api.ts)
       │
       ▼
3. Web Server Reverse Proxy (IIS / Apache / Express)
   Maps: /contact ──► https://cms.laya.org.in/wp-json/contact/v1/send
       │
       ▼
4. WordPress REST Endpoint (docs/wordpress_contact_api_integration.php)
   - Size check: Max 10 KB payload
   - Rate limit: 5 requests per IP per hour (transients)
   - Input sanitization & field length validation
   - Header injection stripping (CRLF / null bytes)
       │
       ▼
5. wp_mail() notification dispatch to info@laya.org.in
       │
       ▼
6. HTTP 200 { success: true } returned to frontend
       │
       ▼
[User Browser renders persistent accessible confirmation message]
```

### Flow Verification Status
- **Client-Side Form & Validation:** Verified locally via Vitest (`contact-flow.test.tsx`) and Playwright E2E.
- **In-Flight Lock & Double Submit Prevention:** Verified locally.
- **Server Error Presentation:** Verified locally (surfaces server rejection cleanly without fake success).
- **Reverse-Proxy Configuration:** Architecture documented; requires hosting administrator setup on production host.
- **WordPress Endpoint & Mail Delivery:** Requires real WordPress CMS and SMTP server verification.

---

## 5. Deployment Profiles: Architecture & Prerequisites

### Profile A: Windows Server / Plesk (IIS)
- **Architecture:** Static SPA served via IIS web server.
- **Prerequisites:**
  1. **Microsoft IIS URL Rewrite Module 2.0** must be installed and active on the Windows Server instance. If missing, IIS returns HTTP 500.19.
  2. IIS Application Pool running in Integrated Pipeline mode.
- **Deployment Action:** Deploy contents of `profile-a-iis/` to `httpdocs/`.

### Profile B: Linux / cPanel (Apache / LiteSpeed)
- **Architecture:** Static SPA served via Apache or LiteSpeed HTTP server.
- **Prerequisites:**
  1. Apache `mod_rewrite` enabled.
  2. Apache `mod_headers` enabled.
  3. `AllowOverride All` (or `FileInfo Limit Options`) allowed in directory configuration.
- **Deployment Action:** Deploy contents of `profile-b-apache/` to `public_html/`.

### Profile C: Node.js Express Server
- **Architecture:** Node.js application process serving Vite static build with Express reverse-proxy middleware.
- **Prerequisites:**
  1. Node.js 18+ (Node 20+ LTS recommended).
  2. Process manager (e.g., PM2, systemd, or Hostinger Node.js Application Manager).
- **Deployment Action:**
  1. Deploy `profile-c-express/` to application root.
  2. Run `npm install --omit=dev`.
  3. Start service with `npm run start` (`node server.js`).

---

## 6. External Dependencies and Decisions Required

1. **Domain Confirmation & DNS Delegation:**
   - Confirmation of official apex domain (`laya.org.in`) and subdomain (`www.laya.org.in`).
   - DNS A/CNAME record assignment pointing to production server IP.
   - Active SSL/TLS certificate provisioning.
2. **Hosting Platform Selection:**
   - Decision by stakeholders to deploy Profile A (IIS), Profile B (Apache), or Profile C (Node.js).
3. **WordPress CMS Configuration:**
   - Upload and activation of `wordpress_contact_api_integration.php` in `wp-content/plugins/`.
   - Setup of SMTP plugin (e.g. WP Mail SMTP) on WordPress host to ensure emails are dispatched reliably.

---

## 7. Security and Secrets Audit

- **Secret Key Scan:** Automated ripgrep scans for API keys, passwords, database credentials, and private tokens returned zero results across all code, configurations, and packages.
- **Dotfile Protection:** Express (`server.js`) explicitly denies path traversal and requests to dotfiles (`.env`, `.git`, etc.) with HTTP 404.
- **HTTP Method Restrictions:** Non-GET/HEAD mutations against the SPA fallback route return HTTP 405 Method Not Allowed.
- **Security Headers Enforced Across All Profiles:**
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
  - `Strict-Transport-Security: max-age=86400`
  - Content Security Policy (CSP) restricting script, style, font, connect, and image origins.

---

## 8. Exact Local Validation Results

All 6 validation gates executed cleanly in the local environment:

| Gate | Command | Exit Code | Result Summary |
| :--- | :--- | :---: | :--- |
| **TypeScript** | `npx tsc --noEmit` | `0` | **PASS** — Zero compilation errors. |
| **ESLint** | `npm run lint` | `0` | **PASS** — 0 errors, 7 Fast Refresh advisories on UI primitives. |
| **Vitest** | `npm test` | `0` | **PASS** — **81 passed across 12 test suites** (5.75s). |
| **Build** | `npm run build` | `0` | **PASS** — Compiled clean production bundle in 1.68s. |
| **Audit** | `npm audit --omit=dev` | `0` | **PASS** — **0 production vulnerabilities**. |
| **Playwright** | `npm run test:e2e` | `0` | **PASS** — **16 passed in Desktop & Mobile Chromium** (21.9s). |

---

## 9. Deployment Readiness Checklist

### A. Verified Locally
- [x] TypeScript compilation passes with zero errors.
- [x] ESLint passes with zero syntax or rule errors.
- [x] 81 unit & integration tests pass (100% pass rate).
- [x] 16 Playwright end-to-end tests pass on Desktop and Mobile viewports.
- [x] Production build compiles cleanly into `dist/`.
- [x] Zero production dependencies have known security vulnerabilities.
- [x] Security headers and MIME types configured for IIS, Apache, and Express.
- [x] Package directories cleanly separated for IIS, Apache, and Express.
- [x] Zero secrets or private keys bundled in frontend or repository.

### B. Requires Administrator Configuration
- [ ] Confirm target server platform (IIS vs Apache vs Node.js).
- [ ] For IIS: Verify Microsoft IIS URL Rewrite Module 2.0 is active.
- [ ] For Apache: Verify `mod_rewrite` and `mod_headers` are enabled.
- [ ] For Node.js: Ensure Node.js 18+ is installed and configure reverse-proxy port.
- [ ] Set up web server reverse-proxy rule: `/contact` -> `/wp-json/contact/v1/send`.
- [ ] Install `wordpress_contact_api_integration.php` in WordPress CMS plugins.
- [ ] Configure and verify SMTP mail routing (`wp_mail`) on WordPress host.

### C. Requires User Decision
- [ ] Approve DNS cutover schedule for `https://laya.org.in`.
- [ ] Select final hosting architecture profile (A, B, or C).

### D. Requires Real-Environment Verification
- [ ] Perform live SSL certificate verification.
- [ ] Submit a live test message through the `/contact` form on the production domain.
- [ ] Confirm receipt of enquiry email in `info@laya.org.in` inbox.
- [ ] Run Playwright smoke test against live production URL.

---

## 10. Recommended Sequence for Eventual Deployment

1. **Step 1: Host Selection & Server Preparation**
   - Confirm hosting provider and architecture (Profile A, B, or C).
   - Verify server prerequisites (URL Rewrite 2.0 on IIS, `mod_rewrite` on Apache, or Node.js runtime).
2. **Step 2: WordPress Backend Setup**
   - Place `wordpress_contact_api_integration.php` into `wp-content/plugins/laya-contact-api/`.
   - Activate the plugin in WordPress Admin.
   - Configure WP Mail SMTP with verified institutional mailbox credentials.
3. **Step 3: Web Server & Reverse Proxy Configuration**
   - Deploy the chosen profile package (`profile-a-iis`, `profile-b-apache`, or `profile-c-express`).
   - Configure `/contact` proxy rule to forward POST requests to the WordPress endpoint.
4. **Step 4: DNS Cutover & SSL Activation**
   - Point DNS A/CNAME records to the server IP.
   - Issue Let's Encrypt or commercial SSL certificate.
5. **Step 5: Post-Deployment Smoke Verification**
   - Access `https://laya.org.in` and verify HTTPS redirection and HSTS headers.
   - Test primary navigation, visual archive lightbox, and publications search.
   - Submit a test contact form enquiry and confirm email delivery.

---

## 11. Safety & State Confirmation

- **No deployments or publishing actions were performed.**
- **No domain, DNS, SSL, canonical URL, robots.txt, or sitemap.xml changes were made.**
- **No Git commits, pushes, tags, merges, branch switches, or remote modifications were made.**
- **No real `.env` secrets were read, printed, or exposed.**
- **All existing uncommitted and untracked work in the workspace was preserved intact.**
