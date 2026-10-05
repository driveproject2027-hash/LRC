import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavDropdown } from "@/components/nav/NavDropdown";
import { MobileNav } from "@/components/nav/MobileNav";
import { DONATE_ITEM, PRIMARY_NAV, SECONDARY_NAV, type NavItem } from "@/config/navigation";
import { isNavItemActive } from "@/hooks/use-nav-active";
import { getScrollTop, onScrollRoot, scrollPageToTop } from "@/lib/scrollRoot";
import layaLogo from "@/assets/laya-logo.png";

/** Plain desktop link for nav items without children. */
const NavLink = ({ item, pathname }: { item: NavItem; pathname: string }) => {
  const active = isNavItemActive(pathname, item);
  return (
    <Link
      to={item.path}
      onClick={() => scrollPageToTop()}
      aria-current={active ? "page" : undefined}
      className={`laya-nav-item__trigger ${active ? "laya-nav-item__trigger--active" : ""}`}
    >
      {item.label}
    </Link>
  );
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  /*
    The id of the single open desktop dropdown, or null.
    Lifted to the header so all dropdowns share one source of truth — see the
    note on NavDropdown's openId prop for why this is not local state.
  */
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const chromeRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  // Overlay -> solid.
  useEffect(() => {
    const onScroll = () => setScrolled(getScrollTop() > 24);
    onScroll();
    return onScrollRoot(onScroll);
  }, []);

  // Close the drawer if the viewport grows into desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Publish header height for the scroll-root offset.
  useEffect(() => {
    const el = chromeRef.current;
    if (!el) return;

    const publish = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--laya-chrome-height", `${h}px`);
    };

    publish();
    const t = window.setTimeout(publish, 50);
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    window.addEventListener("resize", publish);
    return () => {
      window.clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("resize", publish);
    };
  }, [scrolled]);

  return (
    <>
      <header
        ref={chromeRef}
        className={`laya-header ${scrolled ? "laya-header--solid" : ""}`}
      >
        <div className="laya-header__inner">
          {/* Brand ------------------------------------------------------- */}
          <Link
            to="/"
            onClick={() => scrollPageToTop()}
            className="laya-header__brand"
            aria-label="LAYA, Resource Center for Adivasis, back to home"
          >
            <div className="laya-header__brand-mark-wrapper">
              <img
                src={layaLogo}
                alt=""
                className="laya-header__brand-mark"
                width={68}
                height={68}
              />
            </div>
            <span className="sm:hidden font-serif font-bold text-2xl tracking-widest text-[var(--laya-forest-800)]">LAYA</span>
            <span className="laya-header__brand-text">
              <span className="laya-header__brand-name">Laya</span>
              <span className="laya-header__brand-tagline">Resource Center for Adivasis</span>
            </span>
          </Link>

          {/* Desktop navigation ------------------------------------------ */}
          <nav aria-label="Primary" className="laya-nav">
            {PRIMARY_NAV.map((item) =>
              item.children ? (
                <NavDropdown
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  // The right-most menus align to the end so they never spill
                  // past the viewport edge at 1024px.
                  alignEnd={item.label === "Resources" || item.label === "Publications"}
                  /*
                    One shared open id across every dropdown, so switching
                    quickly between triggers can never leave two panels open at
                    once. Each dropdown used to hold its own boolean, which
                    allowed the outgoing panel's 140ms close-timer to still be
                    pending when the next one opened — two overlapping panels.
                  */
                  openId={openMenuId}
                  onOpenChange={setOpenMenuId}
                />
              ) : (
                <NavLink key={item.path} item={item} pathname={pathname} />
              ),
            )}
          </nav>

          {/* Actions ------------------------------------------------------ */}
          <div className="laya-nav__actions">
            {SECONDARY_NAV.map((item) => (
              <NavLink key={item.path} item={item} pathname={pathname} />
            ))}
            <Button
              asChild
              /*
                A clean, minimalist outline button featuring a custom 
                running blue-to-purple gradient border.
              */
              className="btn-running-border text-content-primary hover:text-content-brand transition-colors"
              variant="outline"
              size="sm"
            >
              <Link to={DONATE_ITEM.path} onClick={() => scrollPageToTop()}>
                {DONATE_ITEM.label}
              </Link>
            </Button>
          </div>

          {/* Mobile trigger ----------------------------------------------- */}
          <button
            type="button"
            className="laya-menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
          >
            <Menu className="laya-menu-button__icon" aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
