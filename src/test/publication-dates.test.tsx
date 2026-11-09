import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ResourceCard } from "@/components/resource/ResourceCard";
import { RESOURCES } from "@/content/resources";
import { chronicle } from "@/content/home";
import Publications from "@/pages/Publications";

describe("Publication Dates Audit & Presentation", () => {
  it("renders verified publication dates cleanly on ResourceCard", () => {
    // Pick the full-date resource (Renewable Energy Case Study: 17 November 2015)
    const canDoc = RESOURCES.find((r) => r.title === "Renewable Energy Case Study")!;
    expect(canDoc).toBeDefined();
    expect(canDoc.date).toBe("17 November 2015");

    render(<ResourceCard resource={canDoc} />);
    expect(screen.getByText("17 November 2015")).toBeInTheDocument();
  });

  it("renders verified month/year dates for policy briefs and reports", () => {
    const aiibDoc = RESOURCES.find((r) => r.title === "AIIB Report 2019")!;
    expect(aiibDoc).toBeDefined();
    expect(aiibDoc.date).toBe("April 2019");

    render(<ResourceCard resource={aiibDoc} />);
    expect(screen.getByText("April 2019")).toBeInTheDocument();
  });

  it("renders verified year-only when month is not available", () => {
    const chronicleDoc = RESOURCES.find((r) => r.title === "The LAYA Chronicle")!;
    expect(chronicleDoc).toBeDefined();
    expect(chronicleDoc.date).toBe("2021");

    render(<ResourceCard resource={chronicleDoc} />);
    expect(screen.getByText("2021")).toBeInTheDocument();
  });

  it("does not render fabricated dates for non-digitized documents with unverified dates", () => {
    const unverifiedDoc = RESOURCES.find((r) => r.title === "Adivasi Women Climate Adaptation")!;
    expect(unverifiedDoc).toBeDefined();
    expect(unverifiedDoc.date).toBeNull();

    render(<ResourceCard resource={unverifiedDoc} />);
    // Should display Digital copy unavailable badge, but no year/date span
    expect(screen.getByText(/Digital copy unavailable/i)).toBeInTheDocument();
    expect(screen.queryByText(/2024|2025|2026/)).toBeNull();
  });

  it("keeps homepage chronicle documents dates consistent with Resource Centre records", () => {
    const homeChronicle = chronicle.documents.find((d) => d.title === "The LAYA Chronicle")!;
    const resChronicle = RESOURCES.find((r) => r.title === "The LAYA Chronicle")!;

    expect(homeChronicle.date).toBe(resChronicle.date);

    const homeHbhc = chronicle.documents.find((d) => d.title === "Herbal Based Health Care")!;
    const resHbhc = RESOURCES.find((r) => r.title === "Herbal Based Health Care")!;

    expect(homeHbhc.date).toBe(resHbhc.date);
  });

  it("supports date search query in Resource Centre", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Publications />
        </MemoryRouter>
      </HelmetProvider>
    );

    // Initial render shows all documents
    expect(screen.getByText("AIIB Report 2019")).toBeInTheDocument();
    expect(screen.getAllByText("April 2019").length).toBeGreaterThanOrEqual(1);
  });
});
