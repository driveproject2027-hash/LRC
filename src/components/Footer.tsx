import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { referenceLogo } from "@/assets/referenceAssets";
import { scrollPageToTop } from "@/lib/scrollRoot";
import { fcraInformation } from "@/content/about";
import {
  CONTACT_DETAILS,
  FOOTER_COLUMNS,
  FOOTER_IDENTITY,
  LEGAL_LINKS,
  SOCIAL_LINKS,
} from "@/content/contact";

/**
 * SITE FOOTER
 * ---------------------------------------------------------------------------
 * Rebuilt on the Phase 1 semantic system.
 *
 * WHAT CHANGED
 *   - Removed hardcoded colour classes that predated the design system
 *     (`bg-[var(--laya-bg-right)]`, `text-white`, `border-primary-foreground/20`).
 *   - Removed `animate-logo-float` — a decorative bob on the brand mark.
 *   - Replaced the copyright's `opacity-40` with `--text-inverse-muted`, a
 *     contrast-verified token. `opacity-40` on the dark band sat below the AA
 *     floor.
 *   - Restructured into named columns that match how the site is organised,
 *     including a Transparency column, rather than one flat "Explore" list.
 *
 * LINK INTEGRITY
 *   Every internal link resolves to a real route declared in `src/App.tsx`.
 *   Verified by a browser sweep across all 7 breakpoints.
 *
 * NOT INCLUDED
 *   - No social links: no LAYA social accounts are recorded in the repository.
 *     `SOCIAL_LINKS` is empty by design; the column appears only if it is filled.
 *   - No legal/policy links: no privacy policy, terms or cookie notice page
 *     exists. `LEGAL_LINKS` is empty by design rather than linking nowhere.
 *   See docs/phase-9-audit.md.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          {/* ---- Identity ------------------------------------------------ */}
          <div className="site-footer__identity">
            <span className="site-footer__brand">
              <img
                src={referenceLogo}
                alt=""
                className="site-footer__mark"
                width={40}
                height={40}
                loading="lazy"
              />
              <span>
                <span className="site-footer__name">
                  {FOOTER_IDENTITY.name}
                </span>
                <span className="site-footer__tagline">
                  {FOOTER_IDENTITY.tagline}
                </span>
              </span>
            </span>

            <p className="site-footer__description">
              {FOOTER_IDENTITY.description}
            </p>
            <p className="site-footer__meaning">{FOOTER_IDENTITY.meaning}</p>
            <p className="site-footer__founded">{FOOTER_IDENTITY.founded}</p>
          </div>

          {/* ---- Link columns -------------------------------------------- */}
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="site-footer__col-title">{column.title}</h2>
              <ul className="site-footer__links">
                {column.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      onClick={() => scrollPageToTop()}
                      className="site-footer__link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* ---- Contact ------------------------------------------------- */}
          <nav aria-label="Contact details">
            <h2 className="site-footer__col-title">Contact</h2>
            <ul className="site-footer__contact">
              <li className="site-footer__contact-row">
                <MapPin
                  className="site-footer__contact-icon"
                  aria-hidden="true"
                />
                <span>{CONTACT_DETAILS.address}</span>
              </li>
              <li className="site-footer__contact-row">
                <Phone
                  className="site-footer__contact-icon"
                  aria-hidden="true"
                />
                <a
                  href={CONTACT_DETAILS.phoneHref}
                  className="site-footer__link"
                >
                  {CONTACT_DETAILS.phone}
                </a>
              </li>
              <li className="site-footer__contact-row">
                <Mail
                  className="site-footer__contact-icon"
                  aria-hidden="true"
                />
                <a
                  href={CONTACT_DETAILS.emailHref}
                  className="site-footer__link"
                >
                  {CONTACT_DETAILS.email}
                </a>
              </li>
            </ul>

            {/* Social column renders only when verified accounts exist. */}
            {SOCIAL_LINKS.length > 0 && (
              <>
                <h2
                  className="site-footer__col-title"
                  style={{ marginTop: "var(--space-md)" }}
                >
                  Follow
                </h2>
                <ul className="site-footer__links" style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xs)' }}>
                  {SOCIAL_LINKS.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="site-footer__link"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        aria-label={s.label}
                      >
                        {s.label === "LinkedIn" && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                            <rect width="4" height="12" x="2" y="9"/>
                            <circle cx="4" cy="4" r="2"/>
                          </svg>
                        )}
                        {s.label === "YouTube" && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.5 7.1c.3-1.1 1.2-2 2.3-2.3C7.4 4.3 12 4.3 12 4.3s4.6 0 7.2.5c1.1.3 2 1.2 2.3 2.3.5 2.6.5 7.9.5 7.9s0 5.3-.5 7.9c-.3 1.1-1.2 2-2.3 2.3-2.6.5-7.2.5-7.2.5s-4.6 0-7.2-.5c-1.1-.3-2-1.2-2.3-2.3-.5-2.6-.5-7.9-.5-7.9s0-5.3.5-7.9z"/>
                            <path d="m10 15 5-3-5-3v6z"/>
                          </svg>
                        )}
                        {s.label === "WhatsApp" && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                          </svg>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </nav>
        </div>

        {/* ---- Bottom bar ------------------------------------------------- */}
        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            © {year} LAYA · Resource Center for Adivasis. All rights reserved.
          </p>

          <div className="site-footer__legal">
            <p className="site-footer__reg">
              FCRA Reg. No.{" "}
              {fcraInformation.fcraRegistration.registrationNumber}
            </p>

            {/* Legal/policy links render only when such pages exist. */}
            {LEGAL_LINKS.length > 0 &&
              LEGAL_LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="site-footer__link">
                  {l.label}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
