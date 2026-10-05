# Phase 9 — Contact, Donate, Team, Footer Audit

STATUS: audit complete. Building under the content-integrity standard
established in Phases 4–8.

## 1. CRITICAL — duplicate Team implementations

There are TWO Team components in the repository:

| File                                                   | State                                      |
| ------------------------------------------------------ | ------------------------------------------ |
| `src/pages/about/AboutPages.tsx` (`export const Team`) | **LIVE** — this is what `/team` renders    |
| `src/pages/Team.tsx`                                   | **DEAD CODE** — not imported by the router |

`src/App.tsx` line 46 records that `pages/Team.tsx` was "superseded by the
`Team` export below" during Phase 4. It was left on disk and is unreferenced.

Only the LIVE version may be redesigned. The dead file should be deleted so
it cannot be reactivated by mistake.

## 2. Team content

Live version renders 3 members from the `TEAM` constant (verbatim from
`mockTeam`):

| Name                | Role                   | Bio     |
| ------------------- | ---------------------- | ------- |
| Nafisa Goga D'Souza | Executive Director     | present |
| Dominic D'Souza     | Program Director       | present |
| Myron Mendes        | Senior Program Manager | present |

PHOTOGRAPHS: **NONE EXIST.** `mockTeam[].photo` is an empty string for all
three. No headshot files are present in `src/assets` (verified by full search).

The brief asks to "use real approved photographs" and "consistent image
ratios". This is NOT POSSIBLE — there are no team photographs. The live
implementation uses a monogram (initials), which is honest and intentional.

DECISION: retain monograms. Do NOT substitute gallery photographs (they are
landscape scenes, not portraits, and using a landscape field photo of
unidentified people as a named person's headshot would be a false claim).

## 3. Contact page

Source data available:

- Address: Plot No 110, D-No: 5-175/1, Behind Bay Crown Apartment, Yendada,
  Visakhapatnam – 530045, Andhra Pradesh, India
- Phone: +91-891-2737662
- Email: info@laya.org.in
- WhatsApp: 918912737662 (used by the floating button)

Form: name, email, subject, message — wired to `useContactForm` →
`submitContactMessage` → `POST {VITE_WP_API_URL}/contact`.

Existing states: `isSubmitting`, `submitError`, `submitted`.
Validation: relies on HTML `required` only. No format validation.

MAP: **no map exists.** No Google Maps embed, no iframe, no coordinates, no
map image anywhere in the repository. The brief says "map if currently
available" — it is not available, so none will be added. Adding a maps
provider would also introduce a third-party dependency and a privacy
consideration that has not been approved.

## 4. Social links

**NO SOCIAL MEDIA LINKS EXIST.** A full repository search for facebook,
twitter, instagram, youtube, linkedin found no account URLs.

The only social reference is `index.html`:

 <meta name="twitter:site" content="@layaorg" />
This is an unverified handle — flagged in the Phase 1 audit as potentially
broken — and it is metadata, not a link.

The brief asks the Contact page and Footer to include social links. There are
none to include. Adding guessed URLs would create broken links to accounts
that may not belong to LAYA.

DECISION: omit social links from both, and state the gap in the report.
`SOCIAL_LINKS` is defined as an empty, typed array so verified accounts can be
added later without a template change.

## 5. Donate page

Existing verified financial data:

- Domestic account: 063310011009657, IFSC ANDB0000633, Andhra Bank Waltair
  Branch, Lawsons Bay Colony, Visakhapatnam - 530017
- Foreign (FCRA) account: 063310011007529, SWIFT ANDBINBB,
  IFSC ANDB0000633, Andhra Bank Waltair Branch, Lawsons Bay, Visakhapatnam
- Account holder: LAYA
- Beneficiary address: LAYA Plot No.110, Near Senora Beach Resorts, Yendada,
  Visakhapatnam - 530045
- 80G tax exemption stated
- FCRA registration: 010350057 (from `fcraInformation`, cross-checked)
- Receipts stated as issued within 3-5 working days

CONFLICT FOUND: `heroStats` on the Donate page claims "10K+ Families
Impacted". No other page states this figure. The verified org-wide metrics
are 39+ years, 1,500+ villages, 500,000+ lives, 25+ programmes. "10K+
families" is additionally inconsistent with the Sustainable Resource
Management programme's own "10,000 farmer households" (which is a
programme figure, not an org figure).

DECISION: remove the unverifiable "10K+ Families Impacted" stat and use only
figures traceable to `mockImpactMetrics`.

Donation mechanism: there is NO payment gateway. The form is a PLEDGE
capturing name/email/phone/amount, after which staff contact the donor. Bank
transfer is the real mechanism. This must be stated plainly rather than
implied to be an online payment.

## 6. Footer

Current state: 4 columns, 8 links, `bg-[var(--laya-bg-right)] text-white`,
`animate-logo-float` on the logo, `opacity-40` on the copyright line
(contrast risk), and hardcoded colour classes that predate the Phase 1 system.

Link audit — all 8 current links resolve: /about, /programs, /stories,
/publications, /team, /impact, /gallery, /donate. Plus www.laya.org.in
external.

Brief requests columns for: identity, description, Quick links, Our Work,
Resources, Publications, Contact, Donate, social, legal/policy,
transparency, copyright.

GAPS: no legal/policy links exist (no privacy policy, terms, or cookie
notice pages). No social links exist (see §4). Transparency resources DO
exist and are linkable.
