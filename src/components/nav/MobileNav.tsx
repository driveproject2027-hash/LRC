import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Search, X, Linkedin, Facebook } from "lucide-react";
import {
  DONATE_ITEM,
  PRIMARY_NAV,
  SECONDARY_NAV,
  type NavItem,
} from "@/config/navigation";
import { isNavItemActive } from "@/hooks/use-nav-active";
import { scrollPageToTop } from "@/lib/scrollRoot";
import layaLogo from "@/assets/laya-logo.png";
import { ROUTES } from "@/lib/routes";
import { SOCIAL_LINKS } from "@/content/contact";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Mobile navigation drawer.
 *
 * BEHAVIOUR
 *  - Slide-in panel with accessible scrim backdrop.
 *  - Preserves brand identity with logo and subtitle in header.
 *  - In-drawer search directing straight to publications library.
 *  - Expandable accordion groups for primary navigation.
 *  - Fast access to institutional utilities and social channels.
 *  - Escape closes it and restores focus to the trigger element.
 *  - Background scroll is locked without jumping on close.
 *  - Focus trapped inside drawer: Tab cycles within it.
 *  - Selecting any route closes the drawer cleanly.
 *  - role="dialog" + aria-modal="true" for assistive tech.
 */
export const MobileNav = ({ open, onClose }: MobileNavProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [expandedSubChild, setExpandedSubChild] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  // On open: capture trigger, move focus in, lock scroll.
  useEffect(() => {
    if (!open) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;

    const { overflow, paddingRight, position, top, width } =
      document.body.style;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "0px";

    const t = window.setTimeout(() => closeRef.current?.focus(), 40);

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      document.body.style.position = position;
      document.body.style.top = top;
      document.body.style.width = width;
      if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
        try {
          window.scrollTo(0, scrollY);
        } catch {
          // Guard against environments (e.g. JSDOM) without scrollTo
        }
      }
      window.clearTimeout(t);
    };
  }, [open]);

  // Reset expansion and restore focus when closing.
  useEffect(() => {
    if (open) return;
    setExpanded(null);
    setExpandedSubChild(null);
    setSearchQuery("");
    returnFocusRef.current?.focus?.();
  }, [open]);

  // Escape to close + Tab trap.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleNavigate = () => {
    scrollPageToTop();
    onClose();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/publications?q=${encodeURIComponent(searchQuery.trim())}`);
      handleNavigate();
    }
  };

  const renderItem = (item: NavItem) => {
    const active = isNavItemActive(pathname, item);

    if (!item.children) {
      return (
        <Link
          key={item.path}
          to={item.path}
          onClick={handleNavigate}
          aria-current={active ? "page" : undefined}
          className={`laya-drawer__link ${active ? "laya-drawer__link--active" : ""}`}
        >
          {item.label}
        </Link>
      );
    }

    const isExpanded = expanded === item.label;
    const panelId = `drawer-${item.label.replace(/\s+/g, "-").toLowerCase()}`;

    return (
      <div key={item.label} className="laya-drawer__section">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={() => setExpanded(isExpanded ? null : item.label)}
          className={`laya-drawer__trigger ${
            active ? "laya-drawer__trigger--active" : ""
          }`}
        >
          <span>{item.label}</span>
          <ChevronDown
            className={`laya-drawer__chevron transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {isExpanded && (
          <div id={panelId} className="laya-drawer__children">
            {item.children.map((child, index) => {
              const childActive = pathname === child.path;
              const hasSub = Boolean(child.subItems && child.subItems.length > 0);
              const isSubExpanded = expandedSubChild === child.label;

              if (!hasSub) {
                return (
                  <Link
                    key={`${child.path}-${index}`}
                    to={child.path}
                    onClick={handleNavigate}
                    aria-current={childActive ? "page" : undefined}
                    className={`laya-drawer__child ${
                      childActive ? "laya-drawer__child--active" : ""
                    }`}
                  >
                    {child.label}
                  </Link>
                );
              }

              return (
                <div key={`${child.path}-${index}`} className="border-b border-neutral-200 last:border-b-0 py-1">
                  <div className="flex items-center justify-between">
                    <Link
                      to={child.path}
                      onClick={handleNavigate}
                      aria-current={childActive ? "page" : undefined}
                      className={`laya-drawer__child flex-1 ${
                        childActive ? "laya-drawer__child--active" : ""
                      }`}
                    >
                      {child.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={isSubExpanded}
                      onClick={() =>
                        setExpandedSubChild(isSubExpanded ? null : child.label)
                      }
                      className="px-3 py-2 text-neutral-600 hover:text-brand-purple transition-colors"
                      aria-label={`Toggle ${child.label} divisions`}
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isSubExpanded ? "rotate-180 text-brand-purple" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {isSubExpanded && (
                    <div className="ml-4 pl-3 border-l-2 border-[#7664B5] my-1 space-y-1 bg-purple-50/50 py-2 pr-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7664B5] block py-0.5">
                        5 Divisions (2025–2026)
                      </span>
                      {child.subItems!.map((sub, sIdx) => {
                        const targetUrl = sub.hash ? `${sub.path}#${sub.hash}` : sub.path;
                        return (
                          <Link
                            key={`${sub.path}-${sIdx}`}
                            to={targetUrl}
                            onClick={handleNavigate}
                            className="block py-1.5 text-xs text-neutral-800 hover:text-brand-purple transition-colors"
                          >
                            <span className="font-semibold block text-neutral-900">{sub.label}</span>
                            {sub.description && (
                              <span className="text-[11px] text-neutral-600 block leading-tight mt-0.5">
                                {sub.description}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className="laya-drawer__scrim"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="laya-drawer"
      >
        {/* Brand identity header with close control */}
        <div className="laya-drawer__header">
          <Link
            to="/"
            onClick={handleNavigate}
            className="flex items-center gap-2.5 min-w-0"
            aria-label="LAYA Home"
          >
            <img
              src={layaLogo}
              alt="LAYA Logo"
              width={40}
              height={40}
              className="h-9 w-auto rounded-full object-contain shrink-0"
            />
            <div className="flex flex-col min-w-0" id={titleId}>
              <span className="text-lg font-bold text-brand-purple tracking-normal leading-none font-sans uppercase">
                LAYA
              </span>
              <span className="text-[10px] font-semibold text-neutral-600 tracking-normal mt-0.5 leading-none truncate">
                Resource Centre
              </span>
            </div>
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="laya-drawer__close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Search Input */}
        <div className="px-4 py-2.5 border-b border-border-subtle bg-surface-warm/60">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-neutral-400 pointer-events-none" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search publications & library…"
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-border-default rounded-none placeholder:text-neutral-400 text-neutral-900 focus:outline-none focus:border-brand-purple transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-2.5 text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* Primary Navigation Accordions */}
        <nav aria-label="Mobile Navigation" className="laya-drawer__body">
          {PRIMARY_NAV.map(renderItem)}
          {SECONDARY_NAV.map(renderItem)}

          {/* Quick Institutional Utilities Section */}
          <div className="mt-4 pt-4 border-t border-border-subtle px-4 pb-2">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-2.5">
              Institutional Links
            </span>
            <div className="grid grid-cols-1 gap-1.5 text-xs text-neutral-700">
              <a
                href="https://layagreenenergy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 hover:text-brand-purple transition-colors"
              >
                Laya Green Energy
              </a>
              <a
                href="https://lgv.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 hover:text-brand-purple transition-colors"
                title="Laya Green Ventures (lgv.co.in)"
              >
                Laya Green Ventures
              </a>
              <Link
                to={ROUTES.whatWeDoHbhc}
                onClick={handleNavigate}
                className="py-1.5 hover:text-brand-purple transition-colors"
              >
                Vanantharam
              </Link>
              <Link
                to={ROUTES.whatWeDoRla}
                onClick={handleNavigate}
                className="py-1.5 hover:text-brand-purple transition-colors"
              >
                RLA (Resource for Legal Action)
              </Link>
            </div>
          </div>

          {/* Social Channels Row */}
          <div className="mt-2 pt-3 border-t border-border-subtle px-4 pb-4">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-2.5">
              Connect With Us
            </span>
            <div className="flex items-center gap-3 text-neutral-600">
              <a
                href="https://www.youtube.com/@layaresourcecenter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2 border border-border-default hover:text-brand-purple hover:border-brand-purple transition-colors rounded-none"
              >
                <svg
                  viewBox="-1.5 -1.5 27 27"
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.547 12 3.547 12 3.547s-7.505 0-9.377.503A3.014 3.014 0 0 0 .501 6.186C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.503 9.377.503 9.377.503s7.505 0 9.377-.503a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  />
                </svg>
              </a>
              <a
                href={
                  SOCIAL_LINKS.find((s) => s.label === "LinkedIn")?.href ||
                  "https://www.linkedin.com/company/layaresourcecenter/posts/?feedView=all"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 border border-border-default hover:text-brand-purple hover:border-brand-purple transition-colors rounded-none"
              >
                <Linkedin className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 border border-border-default hover:text-brand-purple hover:border-brand-purple transition-colors rounded-none"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a
                href={
                  SOCIAL_LINKS.find((s) => s.label === "WhatsApp")?.href ||
                  "https://wa.me/919949731307"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2 border border-border-default hover:text-brand-purple hover:border-brand-purple transition-colors rounded-none"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.013 2.006c-5.498 0-9.972 4.475-9.972 9.973 0 1.764.464 3.486 1.346 5.006L2.001 22l5.142-1.348c1.479.805 3.149 1.233 4.87 1.233 5.498 0 9.973-4.475 9.973-9.973 0-5.498-4.475-9.973-9.973-9.973zm5.47 12.15c-.3-.15-1.776-.877-2.052-.977-.276-.1-.477-.15-.678.15-.201.3-.776.977-.951 1.177-.176.2-.352.226-.652.076-2.046-1.026-3.551-2.42-4.148-3.447-.128-.217.135-.205.405-.745.086-.171.043-.321-.032-.471-.075-.15-.678-1.637-.928-2.24-.243-.585-.49-.505-.678-.515-.176-.009-.377-.01-.578-.01-.2 0-.527.075-.802.375-.276.3-1.054 1.03-1.054 2.511 0 1.482 1.079 2.913 1.229 3.113.151.201 2.122 3.242 5.142 4.543 1.836.79 2.457.734 2.909.658.58-.098 1.776-.726 2.027-1.428.251-.702.251-1.303.176-1.428-.076-.126-.277-.201-.578-.351z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </nav>

        {/* Conversion Action Footer */}
        <div className="laya-drawer__footer">
          <Link
            to={DONATE_ITEM.path}
            onClick={handleNavigate}
            className="w-full bg-[#7664B5] hover:bg-[#604E9E] text-white font-bold text-xs sm:text-sm tracking-wider uppercase py-3.5 min-h-[44px] flex items-center justify-center transition-colors rounded-none shadow-none focus-visible:outline-2 focus-visible:outline-brand-purple"
          >
            SUPPORT US / DONATE
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
