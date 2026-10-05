import { useLocation } from "react-router-dom";
import type { NavItem } from "@/config/navigation";

/**
 * Determines whether a navigation item should render as active.
 *
 * Scoping rules, in order:
 *  1. `/` (home) is active only on an exact match — otherwise every route
 *     would light up the brand link.
 *  2. If the item declares `match` prefixes, any prefix match wins. This is
 *     how `Our Work` stays lit across `/what-we-do/*`.
 *  3. Otherwise fall back to exact match, plus a descendant check so
 *     `/about/who-we-are` keeps `About` active via the `/about/` prefix.
 *
 * The descendant check requires the trailing slash so `/about` does not
 * accidentally match a hypothetical `/about-us`.
 */
export const isNavItemActive = (pathname: string, item: NavItem): boolean => {
  // Home must be exact.
  if (item.path === "/") return pathname === "/";

  if (pathname === item.path) return true;

  if (
    item.match?.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    )
  ) {
    return true;
  }

  return pathname.startsWith(`${item.path}/`);
};

/** Convenience hook returning a predicate bound to the current location. */
export const useIsActive = () => {
  const { pathname } = useLocation();
  return (item: NavItem) => isNavItemActive(pathname, item);
};
