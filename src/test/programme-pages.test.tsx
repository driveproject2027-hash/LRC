import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import WhatWeDoCategory from "@/pages/WhatWeDoCategory";
import Programs from "@/pages/Programs";
import { ROUTES } from "@/lib/routes";

describe("Our Work & Programme Pages Editorial Design", () => {
  const renderRoute = (route: string) => {
    return render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[route]}>
          <WhatWeDoCategory />
        </MemoryRouter>
      </HelmetProvider>,
    );
  };

  /* -----------------------------------------------------------------------
     1. Rights, Law & Accompaniment (/what-we-do/rla)
     ----------------------------------------------------------------------- */
  describe("RLA Programme (/what-we-do/rla)", () => {
    it("renders the 7 editorial sections with verified data and authentic imagery", () => {
      renderRoute(ROUTES.whatWeDoRla);

      // 1. Hero
      expect(
        screen.getByRole("heading", {
          name: /Safeguarding Land, Forest Rights & Adivasi Self-Governance/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Our Work · Safeguarding Adivasi Rights for Social Justice/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/For four decades, LAYA's Resource for Legal Action/i),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Get in Touch/i })).toHaveAttribute(
        "href",
        ROUTES.contact,
      );

      // 2. Overview & Institutional Record
      expect(screen.getByText(/Institutional Record/i)).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /Land, Governance & Justice in Numbers/i }),
      ).toBeInTheDocument();
      expect(screen.getByText("25,000+")).toBeInTheDocument();
      expect(screen.getByText("Acres Reclaimed")).toBeInTheDocument();
      expect(screen.getByText("500+")).toBeInTheDocument();
      expect(screen.getByText("Villages Covered")).toBeInTheDocument();
      expect(screen.getByText("2011")).toBeInTheDocument();
      expect(screen.getByText("PESA Rules Framed")).toBeInTheDocument();

      // 3. Our Approach
      expect(
        screen.getByRole("heading", {
          name: /An Empowered Grassroots Legal Architecture/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Reclaiming Ancestral Land Rights/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Gram Sabha & Forest Rights \(RoFR\)/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Grassroots Paralegals & Entitlements/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Landmark Policy Advocacy & Precedents/i,
        }),
      ).toBeInTheDocument();

      // 4. Work in Action
      expect(
        screen.getByRole("heading", {
          name: /Justice Delivered Where Rights are Contested/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Legal Education Camps & Paralegal Mobilization/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Restoring Alienated Land & Forest Titles/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Constitutional Defense in Higher Courts/i,
        }),
      ).toBeInTheDocument();

      // 5. Stories from the Field
      expect(
        screen.getByRole("heading", {
          name: /Reclaiming the Forest: A Community's Journey/i,
        }),
      ).toBeInTheDocument();

      // 6. Related Publications
      expect(
        screen.getByRole("heading", {
          name: /Towards A Resilient Forest EcoSystem/i,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText("April 2019")).toBeInTheDocument();
      const pdfLinks = screen.getAllByRole("link", { name: /Download PDF/i });
      expect(pdfLinks[0]).toHaveAttribute(
        "href",
        "https://laya.org.in/PublicFiles/Laya_Eco_System.pdf",
      );

      // 7. CTA
      expect(
        screen.getByRole("heading", {
          name: /Support Adivasi Rights & Legal Accompaniment/i,
        }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Contact Our Rights Team/i })).toHaveAttribute(
        "href",
        ROUTES.contact,
      );
    });
  });

  /* -----------------------------------------------------------------------
     2. Sustainable Resource Management (/what-we-do/srm)
     ----------------------------------------------------------------------- */
  describe("SRM Programme (/what-we-do/srm)", () => {
    it("renders the 7 editorial sections with verified metrics and regenerative biofarm data", () => {
      renderRoute(ROUTES.whatWeDoSrm);

      // 1. Hero
      expect(
        screen.getByRole("heading", {
          name: /Regenerative Agriculture, Seed Sovereignty & Biofarms/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Our Work · Livelihoods & Natural Resources/i),
      ).toBeInTheDocument();

      // 2. Overview
      expect(
        screen.getByRole("heading", { name: /Agro-Ecology in Numbers & Reach/i }),
      ).toBeInTheDocument();
      expect(screen.getByText("10,000+")).toBeInTheDocument();
      expect(screen.getByText("Farmer Households")).toBeInTheDocument();
      expect(screen.getByText("50,000+")).toBeInTheDocument();
      expect(screen.getByText("Hectares Protected")).toBeInTheDocument();
      expect(screen.getByText(/Biodiversity Award/i)).toBeInTheDocument();

      // 3. Approach
      expect(
        screen.getByRole("heading", {
          name: /An Integrated Agro-Ecological Model/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Heirloom Seed Conservation & Seed Banks/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /System of Rice Intensification \(SRI\) & Biofarms/i,
        }),
      ).toBeInTheDocument();

      // 4. Work in Action
      expect(
        screen.getByRole("heading", {
          name: /Farmer-Led Biofarms & Organic Soil Restoration/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /System of Rice Intensification \(SRI\) Paddy/i,
        }),
      ).toBeInTheDocument();

      // 5. Stories
      expect(
        screen.getByRole("heading", {
          name: /Seeds of Change: Millet Revival & Nutrition/i,
        }),
      ).toBeInTheDocument();

      // 6. Publications
      expect(
        screen.getByRole("heading", { name: "The LAYA Chronicle", exact: true }),
      ).toBeInTheDocument();
      expect(screen.getByText("2021")).toBeInTheDocument();

      // 7. CTA
      expect(
        screen.getByRole("heading", {
          name: /Support Sustainable Agriculture in the Eastern Ghats/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Contact Our Livelihoods Team/i }),
      ).toHaveAttribute("href", ROUTES.contact);
    });
  });

  /* -----------------------------------------------------------------------
     3. Lifelong Learning (/what-we-do/lifelong-learning)
     ----------------------------------------------------------------------- */
  describe("Lifelong Learning Programme (/what-we-do/lifelong-learning)", () => {
    it("renders the 7 editorial sections with educational outreach metrics", () => {
      renderRoute(ROUTES.whatWeDoLifelongLearning);

      // 1. Hero
      expect(
        screen.getByRole("heading", {
          name: /Contextual Learning, Youth Leadership & Cultural Dignity/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Our Work · Lifelong Learning/i),
      ).toBeInTheDocument();

      // 2. Overview
      expect(
        screen.getByRole("heading", {
          name: /Education & Youth Outreach in Numbers/i,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText("10,000+")).toBeInTheDocument();
      expect(screen.getByText(/Youth Trained/i)).toBeInTheDocument();
      expect(screen.getByText("4,000+")).toBeInTheDocument();
      expect(screen.getByText(/Direct Cohorts/i)).toBeInTheDocument();
      expect(screen.getByText("1,000+")).toBeInTheDocument();
      expect(screen.getByText(/Villages Reached/i)).toBeInTheDocument();

      // 3. Approach
      expect(
        screen.getByRole("heading", {
          name: /Adult Crash Literacy for Women/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Community College Vocational Pathways/i,
        }),
      ).toBeInTheDocument();

      // 4. Action
      expect(
        screen.getByRole("heading", {
          name: /Crash Literacy Programmes for Tribal Women/i,
        }),
      ).toBeInTheDocument();

      // 5. Stories
      expect(
        screen.getByRole("heading", {
          name: /Mother Tongue, Mother Earth: Ecological Education/i,
        }),
      ).toBeInTheDocument();

      // 6. Publications
      expect(
        screen.getByRole("heading", { name: /Trainers' Manual on SDGs/i }),
      ).toBeInTheDocument();
      expect(screen.getByText("2019")).toBeInTheDocument();

      // 7. CTA
      expect(
        screen.getByRole("heading", {
          name: /Support Adivasi Youth Education & Leadership/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Contact Our Education Team/i }),
      ).toHaveAttribute("href", ROUTES.contact);
    });
  });

  /* -----------------------------------------------------------------------
     4. Climate Crisis (/what-we-do/climate-crisis-sustainable-development)
     ----------------------------------------------------------------------- */
  describe("Climate Crisis Programme (/what-we-do/climate-crisis-sustainable-development)", () => {
    it("renders the 7 editorial sections with renewable energy and coastal aquaculture data", () => {
      renderRoute(ROUTES.whatWeDoClimate);

      // 1. Hero
      expect(
        screen.getByRole("heading", {
          name: /Climate Resilience, Clean Energy & Coastal Ecosystems/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Our Work · Climate Crisis & Sustainable Development/i),
      ).toBeInTheDocument();

      // 2. Overview
      expect(
        screen.getByRole("heading", {
          name: /Climate Action in Numbers & Field Scope/i,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText("50+")).toBeInTheDocument();
      expect(screen.getByText(/Green Projects/i)).toBeInTheDocument();
      expect(screen.getByText("16")).toBeInTheDocument();
      expect(screen.getByText(/GIS Parameters/i)).toBeInTheDocument();
      expect(screen.getByText("86+")).toBeInTheDocument();
      expect(screen.getByText(/Fishers Trained/i)).toBeInTheDocument();

      // 3. Approach
      expect(
        screen.getByRole("heading", {
          name: /Participatory Climate Adaptation Planning/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Decentralized Renewable Energy & Clean Cooking/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Restorative Coastal Aquaculture/i,
        }),
      ).toBeInTheDocument();

      // 4. Action
      expect(
        screen.getByRole("heading", {
          name: /Energy Efficient Cookstoves & Indoor Air Quality/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Coastal Seaweed & Green Mussel Aquaculture/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: /Gravity Water Schemes & Watershed Protection/i,
        }),
      ).toBeInTheDocument();

      // 5. Stories
      expect(
        screen.getByRole("heading", {
          name: /Building Community Resilience in a Climate Changing Environment/i,
        }),
      ).toBeInTheDocument();

      // 6. Publications
      expect(
        screen.getByRole("heading", { name: "Building Community Resilience" }),
      ).toBeInTheDocument();
      expect(screen.getByText("August 2020")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Training in Integrated Mussel Farming" }),
      ).toBeInTheDocument();
      expect(screen.getByText("March 2026")).toBeInTheDocument();

      // 7. CTA
      expect(
        screen.getByRole("heading", {
          name: /Collaborate on Climate Resilience & Clean Energy/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Contact Our Climate Team/i }),
      ).toHaveAttribute("href", ROUTES.contact);
    });
  });

  /* -----------------------------------------------------------------------
     5. Climate-Friendly Technologies & Coastal Ecosystems
     ----------------------------------------------------------------------- */
  describe("Climate-Friendly Technologies & Coastal Ecosystems Dedicated Page", () => {
    it("renders the 7 editorial sections with clean cookstove, gravity water and coastal IMTA data", () => {
      renderRoute(ROUTES.whatWeDoClimateTechCoastal);

      expect(
        screen.getByRole("heading", {
          name: /Climate-Friendly Technologies & Coastal Ecosystems/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Division 03/i),
      ).toBeInTheDocument();
      expect(screen.getAllByText("22,714+").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("4,000").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("530").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("270 HH").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("8–10°C").length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/Deploying grassroots carbon projects/i)).toBeInTheDocument();
    });
  });

  /* -----------------------------------------------------------------------
     6. Urban and Peri-Urban Ecosystems
     ----------------------------------------------------------------------- */
  describe("Urban and Peri-Urban Ecosystems Dedicated Page", () => {
    it("renders the 7 editorial sections with city climate action plan and university data", () => {
      renderRoute(ROUTES.whatWeDoUrbanPeriUrban);

      expect(
        screen.getByRole("heading", {
          name: /Urban & Peri-Urban Ecosystems/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Division 04/i),
      ).toBeInTheDocument();
      expect(screen.getAllByText("2 Cities").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("4 Colleges").length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText("Thermal GIS")).toBeInTheDocument();
      expect(screen.getByText(/Bridging scientific remote sensing with citizen-led action/i)).toBeInTheDocument();
    });
  });

  /* -----------------------------------------------------------------------
     7. Partner Engagements
     ----------------------------------------------------------------------- */
  describe("Partner Engagements Dedicated Page", () => {
    it("renders the 7 editorial sections with RECAP Manipur, UTP and India DONATES data", () => {
      renderRoute(ROUTES.whatWeDoPartnerEngagements);

      expect(
        screen.getByRole("heading", {
          name: /Partner Engagements & Regional Coalitions/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Division 05/i),
      ).toBeInTheDocument();
      expect(screen.getAllByText("18 Leaders").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("UTP Admin").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("India DONATES").length).toBeGreaterThanOrEqual(1);
    });
  });

  /* -----------------------------------------------------------------------
     8. Our Work Directory (/programs)
     ----------------------------------------------------------------------- */
  describe("Our Work Directory (/programs)", () => {
    it("renders all 3 core pillars and 5 integrated initiatives with authentic imagery and verified routes", () => {
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={[ROUTES.programs]}>
            <Programs />
          </MemoryRouter>
        </HelmetProvider>,
      );

      expect(
        screen.getByRole("heading", { name: "Our work", level: 1 }),
      ).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
      expect(screen.getAllByText(/Core Pillars/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText("1985")).toBeInTheDocument();
      expect(screen.getByText(/Working since/i)).toBeInTheDocument();

      // Check all 5 programmes exist in directory
      expect(
        screen.getAllByRole("link", {
          name: /Safeguarding Adivasi Rights for Social Justice/i,
        })[0],
      ).toHaveAttribute("href", ROUTES.whatWeDoRla);
      expect(
        screen.getAllByRole("link", {
          name: /Herbal Based Health Care/i,
        })[0],
      ).toHaveAttribute("href", ROUTES.whatWeDoHbhc);
      expect(
        screen.getAllByRole("link", {
          name: /Sustainable Resource Management/i,
        })[0],
      ).toHaveAttribute("href", ROUTES.whatWeDoSrm);
      expect(
        screen.getAllByRole("link", {
          name: /Lifelong Learning/i,
        })[0],
      ).toHaveAttribute("href", ROUTES.whatWeDoLifelongLearning);
      expect(
        screen.getAllByRole("link", {
          name: /Climate Crisis & Sustainable Development/i,
        })[0],
      ).toHaveAttribute("href", ROUTES.whatWeDoClimate);
    });
  });
});
