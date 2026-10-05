import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";
import {
  DONATE_ITEM,
  PRIMARY_NAV,
  SECONDARY_NAV,
  type NavItem,
} from "@/config/navigation";
import { isNavItemActive } from "@/hooks/use-nav-active";
import { scrollPageToTop } from "@/lib/scrollRoot";
import { Button } from "@/components/ui/button";

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
 *  - Opens from the right; sections expand inline.
 *  - Escape closes it and restores focus to the element that opened it.
 *  - Background scroll is locked while open (body position preserved so the
 *    page does not jump on close).
 *  - Focus is trapped inside the drawer: Tab cycles within it.
 *  - Selecting any route closes the drawer.
 *  - `role="dialog"` + `aria-modal` so assistive tech treats it as a layer.
 */
export const MobileNav = ({ open, onClose }: MobileNavProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Remember what had focus so we can restore it on close.
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  // On open: capture the trigger, move focus in, lock scroll.
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

    // Focus the close button once the panel has mounted.
    const t = window.setTimeout(() => closeRef.current?.focus(), 40);

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      document.body.style.position = position;
      document.body.style.top = top;
      document.body.style.width = width;
      window.scrollTo(0, scrollY);
      window.clearTimeout(t);
    };
  }, [open]);

  // Reset expansion and restore focus when closing.
  useEffect(() => {
    if (open) return;
    setExpanded(null);
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
          {item.label}
          <ChevronDown className="laya-drawer__chevron" aria-hidden="true" />
        </button>

        {isExpanded && (
          <div id={panelId} className="laya-drawer__children">
            {item.children.map((child, index) => {
              const childActive = pathname === child.path;
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
        <div className="laya-drawer__header">
          <span
            id={titleId}
            className="font-sans text-label font-semibold uppercase tracking-label text-content-muted"
          >
            Menu
          </span>
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

        <nav aria-label="Mobile" className="laya-drawer__body">
          {PRIMARY_NAV.map(renderItem)}
          {SECONDARY_NAV.map(renderItem)}
        </nav>

        <div className="laya-drawer__footer">
          <Button asChild size="lg" className="w-full">
            <Link to={DONATE_ITEM.path} onClick={handleNavigate}>
              {DONATE_ITEM.label}
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
