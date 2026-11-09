import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Linkedin,
  Facebook,
  X,
} from "lucide-react";
import { NavDropdown } from "@/components/nav/NavDropdown";
import { MobileNav } from "@/components/nav/MobileNav";
import {
  DONATE_ITEM,
  PRIMARY_NAV,
  type NavItem,
} from "@/config/navigation";
import { isNavItemActive } from "@/hooks/use-nav-active";
import { getScrollTop, onScrollRoot, scrollPageToTop } from "@/lib/scrollRoot";
import layaLogo from "@/assets/laya-logo.png";
import { ROUTES } from "@/lib/routes";
import { SOCIAL_LINKS } from "@/content/contact";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  /*
    The id of the single open desktop dropdown, or null.
    Lifted to the header so all dropdowns share one source of truth.
  */
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const chromeRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

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
        {/* Tier 1: Masthead — logo, identity, social actions & utility links */}
        <div className="w-full laya-masthead">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-5 flex items-center justify-between gap-2 sm:gap-6">
            {/* Left: LAYA Logo + Organisation Identity */}
            <Link
              to="/"
              onClick={() => scrollPageToTop()}
              className="flex items-center gap-2 sm:gap-3.5 md:gap-5 group focus:outline-none min-w-0 py-0.5"
              aria-label="LAYA, Resource Centre, back to home"
            >
              <img
                src={layaLogo}
                alt="LAYA Logo"
                width={160}
                height={160}
                className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-[84px] w-auto object-contain shrink-0 rounded-full"
              />
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-xl sm:text-2xl md:text-[34px] lg:text-[38px] font-bold text-brand-purple tracking-tight leading-none font-sans uppercase">
                  LAYA
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm lg:text-[15px] font-semibold text-neutral-600 tracking-normal mt-0.5 sm:mt-1.5 leading-none whitespace-nowrap">
                  Resource Centre
                </span>
              </div>
            </Link>

            {/* Right: Actions, Social Icons & Utility Links */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Desktop: Utility Navigation & Social Links */}
              <div className="hidden lg:flex flex-col items-end gap-2">
                {/* Top Row: Social Channels & Contact Quick-Link */}
                <div className="flex items-center gap-3.5">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <a
                      href="https://www.youtube.com/@layaresourcecenter"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="text-neutral-600 hover:text-brand-purple p-1 transition-colors flex items-center justify-center focus-visible:outline-2 focus-visible:outline-brand-purple"
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
                      href={SOCIAL_LINKS.find((s) => s.label === "LinkedIn")?.href || "https://www.linkedin.com/company/layaresourcecenter/posts/?feedView=all"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="text-neutral-600 hover:text-brand-purple p-1 transition-colors flex items-center justify-center focus-visible:outline-2 focus-visible:outline-brand-purple"
                    >
                      <Linkedin className="w-4 h-4 fill-current" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="text-neutral-600 hover:text-brand-purple p-1 transition-colors flex items-center justify-center focus-visible:outline-2 focus-visible:outline-brand-purple"
                    >
                      <Facebook className="w-4 h-4 fill-current" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.find((s) => s.label === "WhatsApp")?.href || "https://wa.me/919949731307"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="text-neutral-600 hover:text-brand-purple p-1 transition-colors flex items-center justify-center focus-visible:outline-2 focus-visible:outline-brand-purple"
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

                  <span className="text-neutral-400 select-none text-xs" aria-hidden="true">·</span>

                  <Link
                    to={ROUTES.contact}
                    onClick={() => scrollPageToTop()}
                    className="text-xs sm:text-[13px] font-semibold text-neutral-700 hover:text-brand-purple transition-colors focus-visible:outline-2 focus-visible:outline-brand-purple"
                  >
                    Contact Us
                  </Link>
                </div>

                {/* Bottom Row: Key institutional utility destinations */}
                <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-neutral-700">
                  <a
                    href="https://layagreenenergy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-purple transition-colors focus-visible:outline-2 focus-visible:outline-brand-purple"
                  >
                    Laya Green Energy
                  </a>
                  <span className="text-neutral-400 select-none text-[10px]" aria-hidden="true">·</span>
                  <a
                    href="https://lgv.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-purple transition-colors focus-visible:outline-2 focus-visible:outline-brand-purple"
                    title="Laya Green Ventures (lgv.co.in)"
                  >
                    Laya Green Ventures
                  </a>
                  <span className="text-neutral-400 select-none text-[10px]" aria-hidden="true">·</span>
                  <Link to={ROUTES.whatWeDoHbhc} onClick={() => scrollPageToTop()} className="hover:text-brand-purple transition-colors focus-visible:outline-2 focus-visible:outline-brand-purple">
                    Vanantharam
                  </Link>
                  <span className="text-neutral-400 select-none text-[10px]" aria-hidden="true">·</span>
                  <Link to={ROUTES.whatWeDoRla} onClick={() => scrollPageToTop()} className="hover:text-brand-purple transition-colors focus-visible:outline-2 focus-visible:outline-brand-purple">
                    RLA (Resource for Legal Action)
                  </Link>
                  <span className="text-neutral-400 select-none text-[10px]" aria-hidden="true">·</span>

                  {searchOpen ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (searchQuery.trim()) {
                          navigate(`/publications?q=${encodeURIComponent(searchQuery.trim())}`);
                          setSearchOpen(false);
                          setSearchQuery("");
                          scrollPageToTop();
                        }
                      }}
                      className="flex items-center gap-1.5 bg-white/95 border border-brand-purple/40 px-2 py-0.5 rounded-none shadow-sm"
                    >
                      <Search className="w-3.5 h-3.5 text-neutral-500 shrink-0" aria-hidden="true" />
                      <input
                        ref={searchInputRef}
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            setSearchOpen(false);
                          }
                        }}
                        placeholder="Search publications…"
                        className="text-xs bg-transparent text-neutral-800 placeholder-neutral-400 focus:outline-none w-36 sm:w-44"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        aria-label="Close search"
                        className="text-neutral-400 hover:text-neutral-700 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSearchOpen(true)}
                      aria-label="Search Publications"
                      className="text-neutral-600 hover:text-brand-purple p-0.5 transition-colors flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-brand-purple"
                    >
                      <Search className="w-3.5 h-3.5 stroke-[2]" />
                      <span className="text-[11px] font-sans">Search</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile/Tablet: Donate Button + Hamburger */}
              <div className="flex lg:hidden items-center gap-1.5 sm:gap-2.5 shrink-0">
                <Link
                  to={DONATE_ITEM.path}
                  onClick={() => scrollPageToTop()}
                  className="inline-flex items-center bg-[#7664B5] hover:bg-[#604E9E] text-white font-bold text-[11px] sm:text-xs md:text-sm tracking-wider px-2.5 sm:px-4 py-1.5 sm:py-2 uppercase transition-colors shadow-none rounded-none focus-visible:outline-2 focus-visible:outline-brand-purple"
                >
                  {DONATE_ITEM.label}
                </Link>
                <button
                  type="button"
                  className="laya-menu-button p-1.5 sm:p-2 text-neutral-800 hover:text-neutral-950 focus:outline-none focus-visible:outline-2 focus-visible:outline-brand-purple shrink-0"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                  aria-haspopup="dialog"
                >
                  <Menu className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2: Refined charcoal horizontal navigation bar */}
        <div className="laya-black-navbar hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Left: Navigation Items */}
            <nav aria-label="Primary" className="flex items-center">
              <div className="flex items-center">
                {PRIMARY_NAV.map((item) =>
                  item.children ? (
                    <NavDropdown
                      key={item.label}
                      item={item}
                      pathname={pathname}
                      alignEnd={item.label === "Resources"}
                      openId={openMenuId}
                      onOpenChange={setOpenMenuId}
                    />
                  ) : (
                    <NavLink key={item.path} item={item} pathname={pathname} />
                  )
                )}
              </div>
            </nav>

            {/* Right: Primary Conversion Action (SUPPORT US) */}
            <div className="flex items-center h-full">
              <Link
                to={ROUTES.donate}
                onClick={() => scrollPageToTop()}
                className="bg-[#7664B5] hover:bg-[#604E9E] text-white font-bold text-xs tracking-wider uppercase px-5 py-3 h-full flex items-center transition-colors shadow-none"
              >
                SUPPORT US
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
