import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
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
  const subMenuTimer = useRef<number | undefined>(undefined);
  const menuId = useId();

  const [activeSubMenuIndex, setActiveSubMenuIndex] = useState<number | null>(null);

  const isActive = isNavItemActive(pathname, item);

  // Derived, not stored: this panel is open exactly when it owns the shared id.
  const open = openId === menuId;

  // Close on route change.
  useEffect(() => {
    onOpenChange(null);
    setActiveSubMenuIndex(null);
    window.clearTimeout(subMenuTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Reset submenu if parent dropdown closes
  useEffect(() => {
    if (!open) {
      setActiveSubMenuIndex(null);
      window.clearTimeout(subMenuTimer.current);
    }
  }, [open]);

  // Close on Escape (returning focus) and on outside pointer down.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onOpenChange(null);
        setActiveSubMenuIndex(null);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        onOpenChange(null);
        setActiveSubMenuIndex(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, onOpenChange]);

  // Clear any pending timers on unmount.
  useEffect(() => () => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(subMenuTimer.current);
  }, []);

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
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            if (!open) {
              e.preventDefault();
              onOpenChange(menuId);
              window.setTimeout(() => {
                const el = document.getElementById(menuId);
                const first = el?.querySelector<HTMLAnchorElement>("a");
                first?.focus();
              }, 40);
            }
          } else if (e.key === "ArrowUp") {
            if (!open) {
              e.preventDefault();
              onOpenChange(menuId);
              window.setTimeout(() => {
                const el = document.getElementById(menuId);
                const links = el?.querySelectorAll<HTMLAnchorElement>("a");
                if (links && links.length > 0) links[links.length - 1].focus();
              }, 40);
            }
          }
        }}
      >
        {item.label}
        <ChevronDown className="laya-nav-item__chevron" aria-hidden="true" />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={item.label}
          className={`laya-nav-menu ${alignEnd ? "laya-nav-menu--end" : ""} ${
            item.children && item.children.length > 6 ? "laya-nav-menu--wide" : ""
          }`}
        >
          {item.children?.map((child, index) => {
            const childActive = pathname === child.path;
            const hasSub = Boolean(child.subItems && child.subItems.length > 0);
            const isSubOpen = activeSubMenuIndex === index;

            return (
              <div
                key={`${child.path}-${index}`}
                role="none"
                className="laya-nav-menu__item-wrapper"
                onMouseEnter={() => {
                  window.clearTimeout(subMenuTimer.current);
                  if (hasSub) {
                    setActiveSubMenuIndex(index);
                  } else {
                    subMenuTimer.current = window.setTimeout(() => {
                      setActiveSubMenuIndex(null);
                    }, 160);
                  }
                }}
                onMouseLeave={() => {
                  if (hasSub) {
                    window.clearTimeout(subMenuTimer.current);
                    subMenuTimer.current = window.setTimeout(() => {
                      setActiveSubMenuIndex(null);
                    }, 220);
                  }
                }}
              >
                {index > 0 && <div className="laya-nav-menu__divider" role="separator" />}
                <Link
                  to={child.path}
                  role="menuitem"
                  aria-current={childActive ? "page" : undefined}
                  aria-haspopup={hasSub ? "true" : undefined}
                  aria-expanded={hasSub ? isSubOpen : undefined}
                  className={`laya-nav-menu__item ${
                    childActive ? "laya-nav-menu__item--active" : ""
                  } ${hasSub && isSubOpen ? "laya-nav-menu__item--sub-open" : ""}`}
                  onClick={() => {
                    scrollPageToTop();
                    onOpenChange(null);
                    setActiveSubMenuIndex(null);
                  }}
                  onKeyDown={(e) => {
                    const el = document.getElementById(menuId);
                    const links = el?.querySelectorAll<HTMLAnchorElement>("a");
                    if (!links || links.length === 0) return;

                    if (e.key === "ArrowRight" && hasSub) {
                      e.preventDefault();
                      setActiveSubMenuIndex(index);
                      window.setTimeout(() => {
                        const subEl = document.getElementById(`${menuId}-sub-${index}`);
                        const firstSubLink = subEl?.querySelector<HTMLAnchorElement>("a");
                        firstSubLink?.focus();
                      }, 50);
                    } else if (e.key === "ArrowDown") {
                      e.preventDefault();
                      const next = (index + 1) % links.length;
                      links[next].focus();
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      const prev = (index - 1 + links.length) % links.length;
                      links[prev].focus();
                    } else if (e.key === "Home") {
                      e.preventDefault();
                      links[0].focus();
                    } else if (e.key === "End") {
                      e.preventDefault();
                      links[links.length - 1].focus();
                    } else if (e.key === "Escape") {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenChange(null);
                      setActiveSubMenuIndex(null);
                      triggerRef.current?.focus();
                    }
                  }}
                >
                  <div className="laya-nav-menu__item-row">
                    <span className="laya-nav-menu__label">{child.label}</span>
                    {hasSub && (
                      <span className="laya-nav-menu__badge">
                        5 Divisions
                        <ChevronRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                  {child.description && (
                    <span className="laya-nav-menu__description">{child.description}</span>
                  )}
                </Link>

                {/* Secondary Flyout Submenu: displays all 5 divisions on hover */}
                {hasSub && isSubOpen && (
                  <div
                    id={`${menuId}-sub-${index}`}
                    role="menu"
                    aria-label={`${child.label} Divisions`}
                    className="laya-nav-submenu"
                    onMouseEnter={() => {
                      window.clearTimeout(subMenuTimer.current);
                    }}
                    onMouseLeave={() => {
                      window.clearTimeout(subMenuTimer.current);
                      subMenuTimer.current = window.setTimeout(() => {
                        setActiveSubMenuIndex(null);
                      }, 220);
                    }}
                  >
                    <div className="laya-nav-submenu__header">
                      <span className="laya-nav-submenu__eyebrow">
                        5 Divisions · Annual Report 2025–2026
                      </span>
                      <span className="laya-nav-submenu__title">
                        {child.label}
                      </span>
                    </div>

                    <div className="laya-nav-submenu__list">
                      {child.subItems!.map((sub, sIdx) => {
                        const targetUrl = sub.hash ? `${sub.path}#${sub.hash}` : sub.path;
                        return (
                          <Link
                            key={`${sub.path}-${sIdx}`}
                            to={targetUrl}
                            role="menuitem"
                            className="laya-nav-submenu__item"
                            onClick={() => {
                              scrollPageToTop();
                              onOpenChange(null);
                              setActiveSubMenuIndex(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "ArrowLeft" || e.key === "Escape") {
                                e.preventDefault();
                                e.stopPropagation();
                                setActiveSubMenuIndex(null);
                                const el = document.getElementById(menuId);
                                const links = el?.querySelectorAll<HTMLAnchorElement>("a");
                                links?.[index]?.focus();
                              }
                            }}
                          >
                            <div className="laya-nav-submenu__item-top">
                              <span className="laya-nav-submenu__item-label">
                                {sub.label}
                              </span>
                              {sub.tag && (
                                <span className="laya-nav-submenu__item-tag">
                                  {sub.tag}
                                </span>
                              )}
                            </div>
                            {sub.description && (
                              <span className="laya-nav-submenu__item-desc">
                                {sub.description}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
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

export default NavDropdown;
