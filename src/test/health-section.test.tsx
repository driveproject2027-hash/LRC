import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import WhatWeDoCategory from "@/pages/WhatWeDoCategory";
import { ROUTES } from "@/lib/routes";

describe("Health Section Redesign (/what-we-do/hbhc)", () => {
  const renderHealthPage = () => {
    return render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[ROUTES.whatWeDoHbhc]}>
          <WhatWeDoCategory />
        </MemoryRouter>
      </HelmetProvider>,
    );
  };

  it("renders the 1. Hero Section with strong heading, lead text, and contact CTA", () => {
    renderHealthPage();

    // Hero title & eyebrow
    expect(
      screen.getByRole("heading", {
        name: /Herbal Healthcare Rooted in Adivasi Communities/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Our Work · Community Health/i)).toBeInTheDocument();

    // Lead paragraph
    expect(
      screen.getByText(/For over two decades, LAYA and the Vanantharam Trust/i),
    ).toBeInTheDocument();

    // Actions
    const contactBtn = screen.getByRole("link", { name: /Get in Touch/i });
    expect(contactBtn).toBeInTheDocument();
    expect(contactBtn).toHaveAttribute("href", ROUTES.contact);

    const programmesLinks = screen.getAllByRole("link", { name: /All Programmes/i });
    expect(programmesLinks.length).toBeGreaterThanOrEqual(1);
    expect(programmesLinks[0]).toHaveAttribute("href", ROUTES.programs);
  });

  it("renders the 2. Health at a Glance section with verified institutional metrics", () => {
    renderHealthPage();

    expect(screen.getByText(/Institutional Record/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Health in Numbers & Reach/i }),
    ).toBeInTheDocument();

    // Verified metrics
    expect(screen.getByText("300+")).toBeInTheDocument();
    expect(screen.getByText(/Communities Served/i)).toBeInTheDocument();

    expect(screen.getByText("350+")).toBeInTheDocument();
    expect(screen.getByText(/Healers Federated/i)).toBeInTheDocument();

    expect(screen.getByText("250+")).toBeInTheDocument();
    expect(screen.getByText(/Medicinal Varieties/i)).toBeInTheDocument();

    expect(screen.getByText("2003")).toBeInTheDocument();
    expect(screen.getByText(/Vanantharam Founded/i)).toBeInTheDocument();

    expect(screen.getByText("60")).toBeInTheDocument();
    expect(screen.getByText(/Village Sanctuaries/i)).toBeInTheDocument();

    expect(screen.getByText("1-Year")).toBeInTheDocument();
    expect(screen.getByText(/Practitioner Course/i)).toBeInTheDocument();
  });

  it("renders the 3. Our Approach section with 4 concise pillars and botanical plate", () => {
    renderHealthPage();

    expect(
      screen.getByRole("heading", {
        name: /An Interdependent Healthcare Ecosystem/i,
      }),
    ).toBeInTheDocument();

    // 4 Pillars
    expect(
      screen.getByRole("heading", {
        name: /Federating Traditional Healers \(THPs\)/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Training Youth as Community Practitioners \(CHPs\)/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Mother Herbal Gardens & Local Nurseries/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Standardised Pharmacy & Licensed Medicines/i,
      }),
    ).toBeInTheDocument();

    // Botanical illustration disclosure
    expect(screen.getByText(/Illustrative image/i)).toBeInTheDocument();
  });

  it("renders the 4. Community Health in Action section with authentic documentary photos", () => {
    renderHealthPage();

    expect(
      screen.getByRole("heading", {
        name: /Care Delivered Where Access is Hardest/i,
      }),
    ).toBeInTheDocument();

    // Row 1: Village clinics & shandies
    expect(
      screen.getByRole("heading", {
        name: /Grassroots Village Clinics & Shandy Health Camps/i,
      }),
    ).toBeInTheDocument();

    // Row 2: Preventive care & vaccination
    expect(
      screen.getByRole("heading", {
        name: /Preventive Healthcare & Disease Monitoring/i,
      }),
    ).toBeInTheDocument();

    // Row 3: Women's health & nutrition
    expect(
      screen.getByRole("heading", {
        name: /Women's Health, Nutri-Gardens & Gynaecological Care/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the 5. Stories from the Field, 6. Resources, and 7. CTA sections", () => {
    renderHealthPage();

    // Stories
    expect(
      screen.getByRole("heading", { name: /Stories from the Field/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Documenting Ethnomedicine: The Vanantharam Experience/i,
      }),
    ).toBeInTheDocument();

    // Resources
    expect(
      screen.getByRole("heading", { name: /Related Health Publications/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Herbal Based Health Care" }),
    ).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Clean Cookstove Projects: Social & Cultural Context/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("January 2018")).toBeInTheDocument();

    // Working PDF Links
    const pdfLinks = screen.getAllByRole("link", { name: /Download PDF/i });
    expect(pdfLinks.length).toBeGreaterThanOrEqual(2);
    expect(pdfLinks[0]).toHaveAttribute(
      "href",
      "https://laya.org.in/PublicFiles/HBHC_SOC.pdf",
    );
    expect(pdfLinks[1]).toHaveAttribute(
      "href",
      "https://laya.org.in/PublicFiles/Laya_CUDenver_Report.pdf",
    );

    // Call to Action
    expect(
      screen.getByRole("heading", {
        name: /Support Community Health in the Eastern Ghats/i,
      }),
    ).toBeInTheDocument();
    const teamBtn = screen.getByRole("link", {
      name: /Contact Our Health Team/i,
    });
    expect(teamBtn).toHaveAttribute("href", ROUTES.contact);
    const donateBtn = screen.getByRole("link", {
      name: /Support LAYA's Work/i,
    });
    expect(donateBtn).toHaveAttribute("href", ROUTES.donate);
  });
});
