import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import { WhereWeWorkMap } from "@/components/map/WhereWeWorkMap";
import { WhereWeWork } from "@/pages/about/AboutPages";
import {
  VERIFIED_LOCATIONS,
  VERIFIED_DISTRICTS,
  GEOGRAPHICAL_DATA_AUDIT,
} from "@/content/whereWeWorkData";

describe("Where We Work Map & Geographical Audit", () => {
  const renderMap = () => {
    return render(
      <HelmetProvider>
        <BrowserRouter>
          <WhereWeWorkMap />
        </BrowserRouter>
      </HelmetProvider>,
    );
  };

  it("renders the interactive SVG map with all 5 verified location pins", () => {
    renderMap();

    const mapRegion = screen.getByRole("region", {
      name: /Interactive map of LAYA field hubs/i,
    });
    expect(mapRegion).toBeInTheDocument();

    VERIFIED_LOCATIONS.forEach((loc) => {
      const pinButton = screen.getByRole("button", {
        name: (content) => content.includes(loc.shortName),
      });
      expect(pinButton).toBeInTheDocument();
    });
  });

  it("displays verified address, postal code, and linked programmes when a location is active", () => {
    renderMap();

    // Default selected location is Visakhapatnam HQ
    const hq = VERIFIED_LOCATIONS[0];
    expect(
      screen.getByRole("heading", { name: hq.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(hq.pincode, "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(hq.operationalRole, "i"))).toBeInTheDocument();

    // Click on Addateegala (Vanantharam) pin
    const addateegalaPin = screen.getByRole("button", {
      name: /Addateegala/i,
    });
    fireEvent.click(addateegalaPin);

    const addateegalaLoc = VERIFIED_LOCATIONS.find((l) =>
      l.name.includes("Addateegala"),
    )!;
    expect(
      screen.getByRole("heading", { name: addateegalaLoc.name }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(addateegalaLoc.pincode, "i")),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Herbal Based Health Care/i),
    ).toBeInTheDocument();
  });

  it("supports district filtering tabs", () => {
    renderMap();

    const asrTab = screen.getByRole("tab", {
      name: /Alluri Sitharama Raju/i,
    });
    expect(asrTab).toBeInTheDocument();

    fireEvent.click(asrTab);
    expect(asrTab).toHaveAttribute("aria-selected", "true");

    // Alluri Sitharama Raju has 3 offices (Addateegala, Paderu, Rampachodavaram)
    const allTab = screen.getByRole("tab", {
      name: /All Districts/i,
    });
    expect(allTab).toHaveAttribute("aria-selected", "false");
  });

  it("switches to the non-map structured directory fallback view", () => {
    renderMap();

    const directoryBtn = screen.getByRole("button", {
      name: /Detailed Directory/i,
    });
    fireEvent.click(directoryBtn);

    expect(
      screen.getByText(/Verified Institutional Directory/i),
    ).toBeInTheDocument();

    VERIFIED_LOCATIONS.forEach((loc) => {
      expect(
        screen.getByRole("heading", { name: loc.name }),
      ).toBeInTheDocument();
    });
  });

  it("renders cartographic transparency and data privacy notice", () => {
    renderMap();

    expect(
      screen.getByText(/Data Scope & Privacy Notice:/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(GEOGRAPHICAL_DATA_AUDIT.regionalScope, "i")),
    ).toBeInTheDocument();
  });

  it("integrates into the /about/where-we-work page seamlessly", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <WhereWeWork />
        </BrowserRouter>
      </HelmetProvider>,
    );

    expect(
      screen.getByRole("heading", {
        name: /Where We Work/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Interactive Regional Map & Field Hubs/i,
      }),
    ).toBeInTheDocument();

    // Verify covered districts
    VERIFIED_DISTRICTS.forEach((d) => {
      expect(screen.getAllByText(d.name).length).toBeGreaterThanOrEqual(1);
    });
  });
});
