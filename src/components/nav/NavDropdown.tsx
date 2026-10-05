import { useEffect, useId, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/config/navigation";
import { isNavItemActive } from "@/hooks/use-nav-active";
import { scrollPageToTop } from "@/lib/scrollRoot";

interface NavDropdownProps {
  item: NavItem;
  pathname: string;
  /** Right-align the panel to avoid overflowing the viewport edge. */
  alignEnd?: boolean;
  /**
   * Which dropdown is currently open, shared across all nav items.
   *
   * This is lifted rather than kept local because each dropdown previously
   * owned private `open` state. Moving the pointer quickly from one trigger to
   * another let two panels be open at once: the outgoing item's 140ms
   * close-timer had not fired yet when the incoming item opened, and neither
   * instance knew about the other. The panels are anchored to their own
   * triggers and overlap horizontally (About spans 638-1054, Our Work 717-1069,
   * Impact 817-1169 at 1440px), so "two open" means two panels stacked on top
   * of each other. Sharing the id makes "exactly one open" structural instead
   * of a race the timers have to win.
   */
  openId: string | null;
  /**
   * Request that this dropdown becomes the open one, or null to close.
   * Accepts an updater so a delayed close can check it still owns the id
   * before closing — otherwise a late timer would close a panel the pointer
   * has already moved into.
   */
  onOpenChange: (id: string | null | ((current: string | null) => string | null)) => void;
}

/**
 * A desktop navigation item that owns a dropdown.
 *
 * ACCESSIBILITY / INTERACTION CONTRACT
 *  - The trigger is a real <button> with aria-expanded / aria-controls, so it
 *    is reachable by Tab and operable with Enter or Space.
 *  - Hover alone never opens it: pointer users get hover-intent, keyboard
 *    users get click/Enter, and touch users get tap. All three paths work.
 *  - Escape closes and returns focus to the trigger.
 *  - Clicking outside closes it.
 *  - Focus leaving the whole item (trigger + panel) closes it, so tabbing past
 *    the last link does not leave an orphaned panel open.
 *  - The parent label is itself a link (`/about`, `/programs`), so the section
 *    index stays directly reachable — the chevron is decorative.
 *  - At most ONE dropdown is open at any moment (see openId above).
 */
export const NavDropdown = ({ item, pathname, alignEnd = false, openId, onOpenChange }: NavDropdownProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const menuId = useId();

  const isActive = isNavItemActive(pathname, item);

  // Derived, not stored: this panel is open exactly when it owns the shared id.
  const open = openId === menuId;

  // Close on route change.
  useEffect(() => {
    onOpenChange(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close on Escape (returning focus) and on outside pointer down.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onOpenChange(null);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) onOpenChange(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, onOpenChange]);

  // Clear any pending close timer on unmount.
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Idempotent: hovering an already-open menu must not toggle it closed.
  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    onOpenChange(menuId);
  };

  /*
    Small delay so the pointer can travel from trigger to panel across the gap.

    The guard is what actually fixes the overlap. `onOpenChange(null)` closes
    whatever is open — including a DIFFERENT dropdown that the pointer has since
    moved into. Without checking ownership first, this timer firing late would
    close the newly-opened panel, or (before the shared id existed) leave the
    stale one open alongside it. Only the dropdown that still owns the id may
    close it.
  */
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      onOpenChange((current) => (current === menuId ? null : current));
    }, 140);
  };

  return (
    <div
      ref={containerRef}
      className="laya-nav-item"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      // Tabbing out of the whole item closes the panel.
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) closeSoon();
      }}
    >
      {/* A <button> may not be nested inside an <a>, so the trigger is a plain
          button and the section index is exposed as the first menu entry
          ("All Programmes" etc.), keeping the index reachable. */}
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-current={isActive ? "true" : undefined}
        className={`laya-nav-item__trigger ${
          isActive ? "laya-nav-item__trigger--active" : ""
        }`}
        onClick={() => onOpenChange(open ? null : menuId)}
      >
        {item.label}
        <ChevronDown className="laya-nav-item__chevron" aria-hidden="true" />
      </button>

      {open && (
        <div
          id={menuId}
          className={`laya-nav-menu ${alignEnd ? "laya-nav-menu--end" : ""} ${
            item.children && item.children.length > 6 ? "laya-nav-menu--wide" : ""
          }`}
        >
          {item.children?.map((child, index) => {
            const childActive = pathname === child.path;
            return (
              <div key={`${child.path}-${index}`}>
                {index > 0 && <div className="laya-nav-menu__divider" />}
                <Link
                  to={child.path}
                  aria-current={childActive ? "page" : undefined}
                  className={`laya-nav-menu__item ${
                    childActive ? "laya-nav-menu__item--active" : ""
                  }`}
                  onClick={() => {
                    scrollPageToTop();
                    onOpenChange(null);
                  }}
                >
                  <span className="laya-nav-menu__label">{child.label}</span>
                  {child.description && (
                    <span className="laya-nav-menu__description">{child.description}</span>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
