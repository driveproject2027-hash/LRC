import { render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import Impact from "@/pages/Impact";
import {
  HEADLINE_STATISTICS,
  PROGRAMME_IMPACT_RECORDS,
  FEATURED_IMPACT_STORIES,
  STATISTICS_FLAGGED_FOR_LAYA,
} from "@/content/impact";
import { ROUTES } from "@/lib/routes";

describe("Impact Section Redesign", () => {
  const renderImpact = () => {
    return render(
      <HelmetProvider>
        <BrowserRouter>
          <Impact />
        </BrowserRouter>
      </HelmetProvider>,
    );
  };

  it("renders the introductory header and page title", () => {
    renderImpact();
    expect(
      screen.getByRole("heading", {
        name: /Four Decades of Community-Led Transformation/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Since 1985, LAYA has accompanied Adivasi communities/i),
    ).toBeInTheDocument();
  });

  it("renders all headline verified statistics with labels, units and provenance", () => {
    renderImpact();

    HEADLINE_STATISTICS.forEach((stat) => {
      expect(screen.getAllByText(stat.label).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(stat.unit).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(new RegExp(stat.source.slice(0, 25), "i"))).toBeInTheDocument();
    });
  });

  it("renders programme-specific impact records with verified data and key outcomes", () => {
    renderImpact();

    PROGRAMME_IMPACT_RECORDS.forEach((rec) => {
      expect(screen.getByText(rec.thematicArea)).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: rec.programmeTitle }),
      ).toBeInTheDocument();

      // Programme stats
      rec.stats.forEach((st) => {
        expect(screen.getByText(st.label)).toBeInTheDocument();
      });

      // Programme route link
      const exploreLinks = screen.getAllByRole("link", {
        name: (content) => content.includes(rec.programmeTitle),
      });
      expect(exploreLinks.length).toBeGreaterThanOrEqual(1);
      expect(exploreLinks[0]).toHaveAttribute("href", rec.route);
    });
  });

  it("renders featured impact stories connecting numbers to lived human experiences", () => {
    renderImpact();

    FEATURED_IMPACT_STORIES.forEach((story) => {
      const storyLink = screen.getByRole("link", {
        name: (content) => content.includes(story.title),
      });
      expect(storyLink).toBeInTheDocument();
      expect(storyLink).toHaveAttribute("href", story.route);
    });
  });

  it("renders field presence, covered districts, and cartographic transparency note", () => {
    renderImpact();

    expect(
      screen.getByRole("heading", {
        name: /Field Presence Across the Eastern Ghats/i,
      }),
    ).toBeInTheDocument();

    // Covered districts
    expect(screen.getByText("Visakhapatnam")).toBeInTheDocument();
    expect(screen.getByText("East Godavari")).toBeInTheDocument();

    // Transparency note regarding map
    expect(
      screen.getByText(/Cartographic Transparency:/i),
    ).toBeInTheDocument();
  });

  it("renders the institutional data integrity ledger of flagged statistics", () => {
    renderImpact();

    expect(
      screen.getByRole("heading", {
        name: /Statistics Requiring Confirmation from LAYA/i,
      }),
    ).toBeInTheDocument();

    STATISTICS_FLAGGED_FOR_LAYA.forEach((item) => {
      expect(screen.getAllByText(item.statistic).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(item.currentDisplay).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("renders links to financial disclosures, governance, and resource library", () => {
    renderImpact();

    const fcraLink = screen.getByRole("link", {
      name: /FCRA Registration & Details/i,
    });
    expect(fcraLink).toHaveAttribute("href", ROUTES.aboutFcraInformation);

    const partnersLinks = screen.getAllByRole("link", {
      name: /Support Partners/i,
    });
    expect(partnersLinks.length).toBeGreaterThanOrEqual(1);
    expect(partnersLinks.some((l) => l.getAttribute("href") === ROUTES.aboutSupportPartners)).toBe(true);

    const donateButton = screen.getByRole("link", {
      name: /Support LAYA's Work/i,
    });
    expect(donateButton).toHaveAttribute("href", ROUTES.donate);
  });
});
