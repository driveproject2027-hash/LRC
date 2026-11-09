import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Lock } from "lucide-react";
import { referenceLogo } from "@/assets/referenceAssets";
import { scrollPageToTop } from "@/lib/scrollRoot";
import { fcraInformation as defaultFcraInformation } from "@/content/about";
import { useWebsiteContent } from "@/context/ContentContext";
import { ROUTES } from "@/lib/routes";
import {
  CONTACT_DETAILS as defaultContactDetails,
  FOOTER_COLUMNS,
  FOOTER_IDENTITY as defaultFooterIdentity,
  LEGAL_LINKS,
  SOCIAL_LINKS,
} from "@/content/contact";
import EditableText from "@/components/admin/EditableText";

/**
 * SITE FOOTER
 * ---------------------------------------------------------------------------
 * Rebuilt on the Phase 1 semantic system.
 * Real-time edits in /admin are immediately reflected here.
 */
const Footer = () => {
  const year = new Date().getFullYear();
  const { content } = useWebsiteContent();

  const footerIdentity = content.footer?.identity || defaultFooterIdentity;
  const contactDetails = content.contact?.details || defaultContactDetails;
  const fcraRegNumber =
    content.about?.fcraInformation?.registrationNumber ||
    (content.about?.fcraInformation as any)?.fcraRegistration?.registrationNumber ||
    defaultFcraInformation.fcraRegistration.registrationNumber;

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          {/* ---- Identity ------------------------------------------------ */}
          <div className="site-footer__identity">
            <span className="site-footer__brand">
              <img
                src={referenceLogo}
                alt="LAYA Logo"
                className="site-footer__mark rounded-full"
                width={48}
                height={48}
                loading="lazy"
              />
              <span>
                <EditableText
                  path="footer.identity.name"
                  label="Footer Brand Name"
                  value={footerIdentity.name}
                  as="span"
                  className="site-footer__name"
                />
                <EditableText
                  path="footer.identity.tagline"
                  label="Footer Tagline"
                  value={footerIdentity.tagline}
                  as="span"
                  className="site-footer__tagline"
                />
              </span>
            </span>

            <EditableText
              path="footer.identity.description"
              label="Footer Description"
              value={footerIdentity.description}
              as="p"
              multiline={true}
              className="site-footer__description"
            />
            <EditableText
              path="footer.identity.meaning"
              label="Footer Meaning"
              value={footerIdentity.meaning}
              as="p"
              className="site-footer__meaning"
            />
            <EditableText
              path="footer.identity.founded"
              label="Footer Founded"
              value={footerIdentity.founded}
              as="p"
              className="site-footer__founded"
            />
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
                <span>{contactDetails.address}</span>
              </li>
              <li className="site-footer__contact-row">
                <Phone
                  className="site-footer__contact-icon"
                  aria-hidden="true"
                />
                <a
                  href={contactDetails.phoneHref || `tel:${contactDetails.phone.replace(/[^0-9+]/g, '')}`}
                  className="site-footer__link"
                >
                  {contactDetails.phone}
                </a>
              </li>
              <li className="site-footer__contact-row">
                <Mail
                  className="site-footer__contact-icon"
                  aria-hidden="true"
                />
                <a
                  href={contactDetails.emailHref || `mailto:${contactDetails.email}`}
                  className="site-footer__link"
                >
                  {contactDetails.email}
                </a>
              </li>
            </ul>

            {/* Social column renders only when verified accounts exist. */}
            {SOCIAL_LINKS.filter((s) => s.href && s.href !== "#").length > 0 && (
              <>
                <h2
                  className="site-footer__col-title"
                  style={{ marginTop: "var(--space-md)" }}
                >
                  Follow
                </h2>
                <ul className="site-footer__links" style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xs)' }}>
                  {SOCIAL_LINKS.filter((s) => s.href && s.href !== "#").map((s) => (
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#0a66c2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        )}
                        {s.label === "YouTube" && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#ff0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.547 12 3.547 12 3.547s-7.505 0-9.377.503A3.014 3.014 0 0 0 .501 6.186C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.503 9.377.503 9.377.503s7.505 0 9.377-.503a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                            <path fill="#ffffff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        )}
                        {s.label === "WhatsApp" && (
                          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#25D366" d="M12.013 2.006c-5.498 0-9.972 4.475-9.972 9.973 0 1.764.464 3.486 1.346 5.006L2.001 22l5.142-1.348c1.479.805 3.149 1.233 4.87 1.233 5.498 0 9.973-4.475 9.973-9.973 0-5.498-4.475-9.973-9.973-9.973z"/>
                            <path fill="#FFFFFF" d="M17.483 14.156c-.3-.15-1.776-.877-2.052-.977-.276-.1-.477-.15-.678.15-.201.3-.776.977-.951 1.177-.176.2-.352.226-.652.076-2.046-1.026-3.551-2.42-4.148-3.447-.128-.217.135-.205.405-.745.086-.171.043-.321-.032-.471-.075-.15-.678-1.637-.928-2.24-.243-.585-.49-.505-.678-.515-.176-.009-.377-.01-.578-.01-.2 0-.527.075-.802.375-.276.3-1.054 1.03-1.054 2.511 0 1.482 1.079 2.913 1.229 3.113.151.201 2.122 3.242 5.142 4.543 1.836.79 2.457.734 2.909.658.58-.098 1.776-.726 2.027-1.428.251-.702.251-1.303.176-1.428-.076-.126-.277-.201-.578-.351z"/>
                          </svg>
                        )}
                        <span style={{ fontSize: '0.875rem' }}>{s.label}</span>
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
            © {year} LAYA · Resource Centre. All rights reserved.
          </p>

          <div className="site-footer__legal">
            <p className="site-footer__reg">
              FCRA Reg. No. {fcraRegNumber}
            </p>

            {/* Discreet Admin link for editorial staff */}
            <Link
              to={ROUTES.admin}
              className="site-footer__link opacity-50 hover:opacity-100 transition-opacity"
              title="Open LAYA CMS Admin Dashboard"
            >
              CMS Admin
            </Link>

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
