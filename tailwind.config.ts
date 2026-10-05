import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * LAYA — Tailwind theme
 *
 * Every value here resolves to a CSS custom property declared in
 * `src/styles/tokens.css`. Nothing in this file introduces a new raw colour,
 * so the whole design system can be retuned from one place.
 *
 * Naming convention:
 *  - `ink / ivory / stone / forest / moss / violet / clay / ochre` — raw palette
 *  - `surface / content / border`                                 — semantic roles
 *
 * Prefer semantic roles in application code (`bg-surface-raised`,
 * `text-content-secondary`). Reach for the raw palette only when you
 * deliberately need a specific step.
 */
export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "var(--gutter)",
      screens: {
        "2xl": "var(--container-wide)",
      },
    },
    extend: {
      /* ----------------------------------------------------------------
         FONTS — wired to tokens so one edit retypes the whole site
         ---------------------------------------------------------------- */
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
        /* Legacy aliases.
           `font-heading` was used by existing markup on EVERY heading — card
           titles, sidebar headings, list headings and form legends included.
           Aliasing it to the serif would force editorial type across the whole
           site, so it maps to SANS instead. Editorial serif is opt-in via the
           `.type-display` / `.type-editorial` utilities or `font-serif`. */
        heading: ["var(--font-sans)"],
        body: ["var(--font-sans)"],
      },

      fontSize: {
        /* Fluid editorial scale — replaces the 4-breakpoint override habit. */
        display: ["var(--text-display)", { lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)" }],
        h1: ["var(--text-h1)", { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-display)" }],
        h2: ["var(--text-h2)", { lineHeight: "var(--leading-snug)", letterSpacing: "var(--tracking-tight)" }],
        h3: ["var(--text-h3)", { lineHeight: "var(--leading-snug)" }],
        h4: ["var(--text-h4)", { lineHeight: "var(--leading-snug)" }],
        "body-lg": ["var(--text-body-lg)", { lineHeight: "var(--leading-relaxed)" }],
        body: ["var(--text-body)", { lineHeight: "var(--leading-normal)" }],
        small: ["var(--text-sm)", { lineHeight: "var(--leading-normal)" }],
        caption: ["var(--text-caption)", { lineHeight: "var(--leading-snug)" }],
        label: ["var(--text-label)", { lineHeight: "1.2" }],
      },

      tracking: {
        display: "var(--tracking-display)",
        label: "var(--tracking-label)",
        eyebrow: "var(--tracking-eyebrow)",
      },

      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        /* ---- Raw palette ---- */
        /*
          Logo blue, sampled from src/assets/logo.png rather than estimated.
          Exposed as a Tailwind colour so controls can set it with a utility
          (which wins in the utilities layer) instead of a component-layer rule
          that Tailwind would correctly override per the cascade contract.

          `logo-blue-foreground` is the readable label colour ON that blue.
          It is dark because white on #55b1eb measures 2.37:1 (fails AA) while
          ink measures 7.73:1.
        */
        "logo-blue": {
          DEFAULT: "var(--laya-logo-blue)",
          foreground: "var(--laya-logo-blue-foreground)",
          /*
            Hover is a distinct solid token, not an alpha modifier.

            `hover:bg-logo-blue/85` was tried first and silently produced no
            style: Tailwind's `/85` modifier needs a colour value it can split
            into channels, and these tokens are opaque hex references, so the
            generated rule was empty. A second solid token is the honest fix
            and also guarantees the hover contrast rather than deriving it.
          */
          hover: "var(--laya-blue-600)",
        },
        ink: {
          900: "var(--laya-ink-900)",
          800: "var(--laya-ink-800)",
          700: "var(--laya-ink-700)",
          600: "var(--laya-ink-600)",
          500: "var(--laya-ink-500)",
          400: "var(--laya-ink-400)",
          300: "var(--laya-ink-300)",
          200: "var(--laya-ink-200)",
          100: "var(--laya-ink-100)",
        },
        ivory: {
          50: "var(--laya-ivory-50)",
          100: "var(--laya-ivory-100)",
          200: "var(--laya-ivory-200)",
          300: "var(--laya-ivory-300)",
        },
        stone: {
          50: "var(--laya-stone-50)",
          100: "var(--laya-stone-100)",
          200: "var(--laya-stone-200)",
          300: "var(--laya-stone-300)",
          400: "var(--laya-stone-400)",
        },
        forest: {
          950: "var(--laya-forest-950)",
          900: "var(--laya-forest-900)",
          800: "var(--laya-forest-800)",
          700: "var(--laya-forest-700)",
          600: "var(--laya-forest-600)",
          500: "var(--laya-forest-500)",
          400: "var(--laya-forest-400)",
          300: "var(--laya-forest-300)",
          200: "var(--laya-forest-200)",
          100: "var(--laya-forest-100)",
          50: "var(--laya-forest-50)",
        },
        moss: {
          700: "var(--laya-moss-700)",
          600: "var(--laya-moss-600)",
          500: "var(--laya-moss-500)",
          400: "var(--laya-moss-400)",
          300: "var(--laya-moss-300)",
          200: "var(--laya-moss-200)",
        },
        violet: {
          800: "var(--laya-violet-800)",
          700: "var(--laya-violet-700)",
          600: "var(--laya-violet-600)",
          500: "var(--laya-violet-500)",
          400: "var(--laya-violet-400)",
          300: "var(--laya-violet-300)",
          200: "var(--laya-violet-200)",
          100: "var(--laya-violet-100)",
        },
        clay: {
          800: "var(--laya-clay-800)",
          700: "var(--laya-clay-700)",
          600: "var(--laya-clay-600)",
          500: "var(--laya-clay-500)",
          400: "var(--laya-clay-400)",
          300: "var(--laya-clay-300)",
          200: "var(--laya-clay-200)",
        },
        ochre: {
          700: "var(--laya-ochre-700)",
          600: "var(--laya-ochre-600)",
          500: "var(--laya-ochre-500)",
          200: "var(--laya-ochre-200)",
        },

        /* ---- Semantic surfaces ---- */
        surface: {
          canvas: "var(--surface-canvas)",
          raised: "var(--surface-raised)",
          sunken: "var(--surface-sunken)",
          tinted: "var(--surface-tinted)",
          warm: "var(--surface-warm)",
          ink: "var(--surface-ink)",
          forest: "var(--surface-forest)",
          violet: "var(--surface-violet)",
        },

        /* ---- Semantic text ---- */
        content: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          muted: "var(--text-muted)",
          brand: "var(--text-brand)",
          accent: "var(--text-accent)",
          warm: "var(--text-warm)",
          inverse: "var(--text-inverse)",
        },

        /* ---- Semantic borders ---- */
        "border-subtle": "var(--border-subtle)",
        "border-default": "var(--border-default)",
        "border-strong": "var(--border-strong)",
        "border-brand": "var(--border-brand)",
        "border-inverse": "var(--border-inverse)",
      },

      /* ----------------------------------------------------------------
         RADIUS — restrained. No 2rem pill cards.
         ---------------------------------------------------------------- */
      borderRadius: {
        none: "var(--radius-none)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        card: "var(--radius-card)",
        media: "var(--radius-media)",
        DEFAULT: "var(--radius-sm)",
        full: "9999px",
      },

      /* ----------------------------------------------------------------
         SPACING & SIZING
         ---------------------------------------------------------------- */
      spacing: {
        gutter: "var(--gutter)",
        "section-x": "var(--gutter)",
        "section-y": "var(--section-y)",
        "section-y-tight": "var(--section-y-tight)",
        "section-gap": "var(--section-gap)",
        "3xs": "var(--space-3xs)",
        "2xs": "var(--space-2xs)",
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
        "4xl": "var(--space-4xl)",
      },

      maxWidth: {
        content: "var(--container-content)",
        prose: "var(--container-prose)",
        wide: "var(--container-wide)",
      },

      /* ----------------------------------------------------------------
         ELEVATION — three levels only
         ---------------------------------------------------------------- */
      boxShadow: {
        flat: "var(--shadow-flat)",
        raised: "var(--shadow-raised)",
        overlay: "var(--shadow-overlay)",
        /* Legacy aliases so existing markup keeps compiling. */
        DEFAULT: "var(--shadow-raised)",
        lg: "var(--shadow-raised)",
        xl: "var(--shadow-raised)",
        "2xl": "var(--shadow-overlay)",
      },

      /* ----------------------------------------------------------------
         MOTION
         ---------------------------------------------------------------- */
      transitionTimingFunction: {
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
      },

      transitionDuration: {
        instant: "var(--duration-instant)",
        fast: "var(--duration-fast)",
        base: "var(--duration-base)",
        slow: "var(--duration-slow)",
        editorial: "var(--duration-editorial)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        /* Kept for the shadcn skeleton primitive. */
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "count-up": "count-up 0.5s ease-out forwards",
        shimmer: "shimmer 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
