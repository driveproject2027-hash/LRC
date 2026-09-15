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
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://motion.dev/)
- [Vitest](https://vitest.dev/) and Testing Library
## Requirements
- Node.js 18 or newer
- [Bun](https://bun.sh/) (recommended; the repository includes `bun.lock`)

## Getting started
1. Clone the repository and move into the project directory:

   ```sh
   git clone <repository-url>
   cd laya-connect-main
   ```

2. Install dependencies:

   ```sh
   bun install
   ```

3. Start the development server:

   ```sh
   bun run dev
   ```

   Vite serves the app at [http://localhost:8080](http://localhost:8080).

## Available scripts
| Command | Description |
| --- | --- |
| `bun run dev` | Start the Vite development server |
| `bun run build` | Create a production build |
| `bun run build:dev` | Create a development-mode build |
| `bun run preview` | Preview the production build locally |
| `bun run test` | Run the test suite once |
| `bun run test:watch` | Run Vitest in watch mode |
| `bun run lint` | Run ESLint across the project |

Before opening a pull request, run:

```sh
bun run test
bun run lint
bun run build
```

## Environment variables
The application works without environment variables by using the local content in `src/services/api.ts`. To configure a WordPress-compatible API for contact submissions, create a `.env` file in the project root:

```sh
VITE_WP_API_URL=https://example.com/wp-json
```

Vite exposes only variables prefixed with `VITE_` to browser code. Do not put passwords, private tokens, or other secrets in this file.

## Project structure
```text
src/
├── assets/       Images, logos, and gallery content
├── components/   Shared layout and UI components
├── hooks/        Reusable React hooks, including the contact form
├── layouts/      Site-wide page layouts
├── lib/          Small shared utilities
├── pages/        Route-level page components
├── services/     API client, types, and local content
└── test/         Vitest and Testing Library tests
```

The `@` import alias points to `src`, so imports can use paths such as `@/components/Header`.

## Main routes
- `/` — Home
- `/about` — About LAYA and organizational information
- `/programs` — Programs overview
- `/what-we-do/...` — Individual program areas
- `/impact` — Impact metrics
- `/stories` — Community stories
- `/publications` — Publications and resources
- `/gallery` — Photo gallery
- `/team` — Team
- `/donate` — Donation information
- `/contact` — Contact
## Content and API notes
Most page content is currently provided by typed mock data in `src/services/api.ts`, making the site usable during development without a backend. The API module is the intended integration point for replacing local content with a CMS or other service. Contact submissions are sent to `POST /contact` relative to `VITE_WP_API_URL` when that variable is configured.

## Deployment
Build the site with `bun run build`, then serve the generated `dist/` directory from a static host. Because the app uses client-side routing, configure the host to serve `index.html` as a fallback for application routes.

## Contributing
1. Create a focused branch for your change.
2. Keep content, components, and service changes scoped to the relevant area.
3. Add or update tests when behavior changes.
4. Run `bun run test`, `bun run lint`, and `bun run build` before submitting a pull request.
5. Include a concise description of the user-facing impact in the pull request.
