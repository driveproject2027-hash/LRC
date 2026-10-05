import { describe, expect, it } from "vitest";
import { ALL_ROUTE_PATHS, ROUTES } from "@/lib/routes";
import {
  ALL_NAV_PATHS,
  DONATE_ITEM,
  NAV_ROUTE_COVERAGE,
  PRIMARY_NAV,
  SECONDARY_NAV,
} from "@/config/navigation";
import { isNavItemActive } from "@/hooks/use-nav-active";

describe("route coverage", () => {
  it("gives every declared route a navigation home", () => {
    const uncovered = ALL_ROUTE_PATHS.filter((p) => !(p in NAV_ROUTE_COVERAGE));
    expect(uncovered).toEqual([]);
  });

  it("does not reference routes that do not exist", () => {
    const known = new Set<string>(ALL_ROUTE_PATHS);
    const unknown = Object.keys(NAV_ROUTE_COVERAGE).filter(
      (p) => !known.has(p),
    );
    expect(unknown).toEqual([]);
  });

  it("links only to real routes from the header config", () => {
    const known = new Set<string>(ALL_ROUTE_PATHS);
    const broken = ALL_NAV_PATHS.filter((p) => !known.has(p));
    expect(broken).toEqual([]);
  });

  it("has exactly one Donate route in the header config", () => {
    const donateLinks = ALL_NAV_PATHS.filter((p) => p === ROUTES.donate);
    expect(donateLinks).toHaveLength(1);
    expect(DONATE_ITEM.path).toBe(ROUTES.donate);
  });

  it("exposes every primary item with a menu or a direct path", () => {
    for (const item of [...PRIMARY_NAV, ...SECONDARY_NAV]) {
      expect(item.label.length).toBeGreaterThan(0);
      expect(item.path.startsWith("/")).toBe(true);
    }
  });
});

describe("isNavItemActive", () => {
  const about = PRIMARY_NAV.find((i) => i.label === "About")!;
  const ourWork = PRIMARY_NAV.find((i) => i.label === "Our Work")!;
  const impact = PRIMARY_NAV.find((i) => i.label === "Impact")!;
  const resources = PRIMARY_NAV.find((i) => i.label === "Resources")!;

  it("keeps About active across its child routes", () => {
    expect(isNavItemActive("/about", about)).toBe(true);
    expect(isNavItemActive("/about/who-we-are", about)).toBe(true);
    expect(isNavItemActive("/about/governance", about)).toBe(true);
  });

  it("keeps Our Work active under /what-we-do", () => {
    expect(isNavItemActive("/programs", ourWork)).toBe(true);
    expect(isNavItemActive("/what-we-do/rla", ourWork)).toBe(true);
    expect(
      isNavItemActive(
        "/what-we-do/climate-crisis-sustainable-development",
        ourWork,
      ),
    ).toBe(true);
  });

  it("keeps Impact active on stories", () => {
    expect(isNavItemActive("/impact", impact)).toBe(true);
    expect(isNavItemActive("/stories", impact)).toBe(true);
  });

  it("keeps Resources active on gallery and financial pages", () => {
    expect(isNavItemActive("/gallery", resources)).toBe(true);
    expect(isNavItemActive("/about/financial-reports", resources)).toBe(true);
    expect(isNavItemActive("/about/fcra-information", resources)).toBe(true);
  });

  it("does not leak across unrelated sections", () => {
    expect(isNavItemActive("/donate", about)).toBe(false);
    expect(isNavItemActive("/contact", impact)).toBe(false);
    expect(isNavItemActive("/publications", ourWork)).toBe(false);
  });

  it("treats the brand link as exact-match only", () => {
    const home = { label: "Home", path: "/" };
    expect(isNavItemActive("/", home)).toBe(true);
    expect(isNavItemActive("/about", home)).toBe(false);
  });
});
