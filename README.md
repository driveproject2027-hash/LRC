# The LAYA Chronicle
The LAYA Chronicle is the public-facing website and resource center for **LAYA**, an organization working with Adivasi communities in the Eastern Ghats of India. The site brings together LAYA's programs, impact, stories, publications, gallery, team information, and ways to get involved.

## Highlights
- Responsive React website with animated page transitions
- Program pages covering rights, health, sustainable resource management, lifelong learning, and climate action
- Impact metrics, organizational timeline, stories, publications, gallery, and team pages
- Contact and donation journeys
- Reusable UI components built with Radix UI and Tailwind CSS
- Lazy-loaded routes for faster initial page loads
- Optional WordPress API configuration for contact submissions
## Tech stack
- [React](https://react.dev/) 18
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) 7
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://motion.dev/)
- [Vitest](https://vitest.dev/) and Testing Library
- [Playwright](https://playwright.dev/) for real-browser end-to-end testing
- [Express](https://expressjs.com/) for Node.js production hosting

## Requirements
- Node.js 18 or newer (Node.js 20+ LTS recommended)
- npm 9+ (or Bun)

## Getting started
1. Clone the repository and navigate into the project directory:

   ```sh
   git clone <repository-url>
   cd "Experiment LRC"
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Configure your local environment (optional):

   ```sh
   cp .env.example .env
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

   Vite serves the application locally (typically at `http://localhost:8080` or `http://localhost:5173`).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite local development server |
| `npm run build` | Create an optimized production bundle in `dist/` |
| `npm run build:dev` | Create a development-mode build |
| `npm run preview` | Preview the production build locally via Vite preview server |
| `npm test` | Run Vitest unit and integration test suites (81 tests across 12 suites) |
| `npm run test:watch` | Run Vitest in interactive watch mode |
| `npm run test:e2e` | Run Playwright real-browser end-to-end smoke tests (Desktop & Mobile) |
| `npm run lint` | Run ESLint across all source and test files |
| `npx tsc --noEmit` | Validate TypeScript types across the entire project |
| `npm audit --omit=dev` | Verify zero vulnerabilities in production dependencies |
| `npm run start` | Launch the production Node.js Express server (`server.js`) |

Before submitting changes or preparing a release, run the full validation suite:

```sh
npx tsc --noEmit
npm run lint
npm test
npm run build
npm audit --omit=dev
npm run test:e2e
```

## Environment configuration

The application is fully operational in standalone mode using verified local datasets in `src/content/`.

To connect external services such as the WordPress contact endpoint:

1. Copy `.env.example` to `.env`:
   ```sh
   cp .env.example .env
   ```

2. Environment variables:
   - `VITE_WP_API_URL`: Configures Axios `baseURL` for contact submissions (`src/services/api.ts`).
     - **Default (blank):** Submits to relative path `/contact` (ideal when reverse-proxying through Apache/IIS/Express).
     - **Direct API:** Set to WordPress REST API base path (e.g., `https://cms.laya.org.in/wp-json`).
   - `PORT`: Sets the listening port for `server.js` when running the Express production server (defaults to 3000).

> **Security Rule:** Vite statically embeds variables prefixed with `VITE_` into client-side JavaScript bundles. **Never store database passwords, private encryption keys, or secret tokens in `.env`.**

## Supported deployment architectures

The LAYA Chronicle supports three production hosting profiles:

### Profile A: Static Windows Server / Plesk (IIS)
- **Deployment files:** Copy the contents of `dist/` to the IIS web root.
- **Configuration:** `dist/web.config` is automatically provided from `public/web.config`.
- **Prerequisite:** Microsoft **IIS URL Rewrite Module 2.0** must be installed and enabled on the server. Without it, IIS returns an HTTP 500.19 error.
- **Features:** Rewrites all client-side routes to `/index.html`, registers MIME types for modern formats (`.webp`, `.woff2`, `.json`), and applies HTTP security headers (`nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`, CSP, Permissions-Policy).

### Profile B: Static Linux / cPanel (Apache or LiteSpeed)
- **Deployment files:** Copy the contents of `dist/` to `public_html` or the domain document root.
- **Configuration:** `dist/.htaccess` is automatically provided from `public/.htaccess`.
- **Features:** Enables `mod_rewrite` to route virtual SPA paths to `/index.html` and uses `mod_headers` to enforce institutional security headers and Content Security Policy.

### Profile C: Node.js Express Server (Hostinger / Docker / VPS)
- **Deployment files:** Deploy `dist/`, `server.js`, and `package.json`.
- **Installation & start:**
  ```sh
  npm install --omit=dev
  npm run start
  ```
- **Features:** Hardened Express 5 server with `disable('x-powered-by')`, security headers, dotfile/path-traversal protection (`deny`), safe HTTP method restriction (405 for mutations on SPA routes), 404 handler for missing assets, and a `/health` endpoint for monitoring.

## Outstanding production prerequisites

Before public release to `https://laya.org.in`, the following external milestones must be completed:

1. **Production Domain & DNS:**
   - Point DNS A/CNAME records to the selected hosting environment.
   - Provision SSL certificates (HTTPS is required for HSTS and secure contact delivery).
2. **WordPress Contact API Integration:**
   - Install and activate the server integration plugin from `docs/wordpress_contact_api_integration.php` on the WordPress CMS.
   - Configure a reverse proxy on the web server from `/contact` to `/wp-json/contact/v1/send` (or configure CORS for direct browser-to-WordPress calls).
   - Verify SMTP mail routing (`wp_mail`) on the WordPress server.
3. **Hosting Target Selection:**
   - Choose Profile A (IIS), Profile B (Apache), or Profile C (Node.js) and follow the respective deployment steps above.

## Project structure
```text
src/
├── assets/       Images, logos, and gallery content
├── components/   Shared layout, UI, and navigation components
├── config/       Centralized navigation routes and menu hierarchies
├── content/      Verified organizational datasets (About, Contact, Stories, Resources, Impact)
├── hooks/        Reusable React hooks (contact form, scroll reveal, nav active states)
├── layouts/      MainLayout with institutional header, footer, and navigation
├── lib/          Shared routes and utilities
├── pages/        Route-level page components (About, Programs, Publications, Stories, Gallery, Donate, Contact)
├── services/     API client and mock data interfaces
└── test/         Vitest unit and integration test suites
```

## Contributing and hygiene guidelines
1. Create a focused branch for your changes.
2. Maintain documentation and test coverage: add tests for any modified user flows.
3. Verify all validation gates pass before committing:
   ```sh
   npx tsc --noEmit && npm run lint && npm test && npm run build && npm run test:e2e
   ```
4. Do not commit `.env`, test results, or generated build output (`dist/`).
