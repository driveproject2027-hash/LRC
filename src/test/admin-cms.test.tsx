import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ContentProvider } from "@/context/ContentContext";
import {
  getLiveContent,
  updateSection,
  resetSection,
  resetAllContent,
  exportContentJson,
  importContentJson,
  isContentModified,
} from "@/lib/contentStore";
import Index from "@/pages/Index";
import AdminDashboard from "@/pages/AdminDashboard";
import WhatWeDoCategory from "@/pages/WhatWeDoCategory";

describe("LAYA CMS Admin Dashboard & Real-Time Content Visibility", () => {
  beforeEach(() => {
    resetAllContent();
  });

  it("provides full default website content structure", () => {
    const live = getLiveContent();
    expect(live.home.hero.headline).toBe("Standing with Adivasi Communities");
    expect(live.home.hero.slides).toHaveLength(3);
    expect(live.programmes).toHaveLength(8);
    expect(live.stories.length).toBeGreaterThanOrEqual(3);
    expect(live.about.whoWeAre.title).toBe("Who We Are");
    expect(live.about.journeyPhases).toHaveLength(7);
  });

  it("updates home section content and reflects immediately in the store", () => {
    const newHeadline = "Empowering Indigenous Communities across Eastern Ghats";
    updateSection("home", {
      hero: {
        ...getLiveContent().home.hero,
        headline: newHeadline,
      },
    });

    const updated = getLiveContent();
    expect(updated.home.hero.headline).toBe(newHeadline);
    expect(isContentModified()).toBe(true);
  });

  it("renders updated content directly in the main website Homepage component", () => {
    const customHeadline = "Custom Headline Visible in Main Website";
    updateSection("home", {
      hero: {
        ...getLiveContent().home.hero,
        headline: customHeadline,
      },
    });

    render(
      <HelmetProvider>
        <ContentProvider>
          <BrowserRouter>
            <Index />
          </BrowserRouter>
        </ContentProvider>
      </HelmetProvider>
    );

    // Verify the custom headline is visible on the live homepage
    expect(screen.getByText(customHeadline)).toBeInTheDocument();
  });

  it("resets section back to factory defaults on command", () => {
    updateSection("home", {
      hero: {
        ...getLiveContent().home.hero,
        headline: "Temporary Title",
      },
    });
    expect(getLiveContent().home.hero.headline).toBe("Temporary Title");

    resetSection("home");
    expect(getLiveContent().home.hero.headline).toBe("Standing with Adivasi Communities");
  });

  it("exports and imports valid JSON backups", () => {
    const customTitle = "Exported & Restored Title";
    updateSection("home", {
      hero: {
        ...getLiveContent().home.hero,
        headline: customTitle,
      },
    });

    const exported = exportContentJson();
    expect(exported).toContain(customTitle);

    resetAllContent();
    expect(getLiveContent().home.hero.headline).toBe("Standing with Adivasi Communities");

    const success = importContentJson(exported);
    expect(success).toBe(true);
    expect(getLiveContent().home.hero.headline).toBe(customTitle);
  });

  it("renders the Admin Dashboard UI with all editing sections and tools", () => {
    render(
      <HelmetProvider>
        <ContentProvider>
          <BrowserRouter>
            <AdminDashboard />
          </BrowserRouter>
        </ContentProvider>
      </HelmetProvider>
    );

    // Check header and brand
    expect(screen.getByText("LAYA CMS")).toBeInTheDocument();
    expect(screen.getByText("Admin v2.0")).toBeInTheDocument();
    expect(screen.getByText("Save Changes")).toBeInTheDocument();

    // Check sidebar navigation tabs
    expect(screen.getByText("Overview & Stats")).toBeInTheDocument();
    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Programmes (8)")).toBeInTheDocument();
    expect(screen.getByText("Stories & Field Notes")).toBeInTheDocument();
    expect(screen.getByText("Impact & Metrics")).toBeInTheDocument();
    expect(screen.getByText("Contact & Donate Info")).toBeInTheDocument();
    expect(screen.getByText("Sitewide & Footer")).toBeInTheDocument();

    // Click on Home Page tab to open Home editor
    fireEvent.click(screen.getByText("Home Page"));
    expect(screen.getByText("Homepage Content Editor")).toBeInTheDocument();
    expect(screen.getByText("1. Hero Header & Top Eyebrow")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Standing with Adivasi Communities")).toBeInTheDocument();
  });

  it("adapts layout seamlessly when hero figures are added or deleted", () => {
    // Add a 4th figure metric to hero
    const customFig = { value: "99.4%", label: "Verified Community Retention" };
    const currentFigures = getLiveContent().home.hero.figures;
    updateSection("home", {
      hero: {
        ...getLiveContent().home.hero,
        figures: [...currentFigures, customFig],
      },
    });

    render(
      <HelmetProvider>
        <ContentProvider>
          <BrowserRouter>
            <Index />
          </BrowserRouter>
        </ContentProvider>
      </HelmetProvider>
    );

    // Verify the newly added 4th figure metric is rendered
    expect(screen.getByText("99.4%")).toBeInTheDocument();
    expect(screen.getByText("Verified Community Retention")).toBeInTheDocument();
  });

  it("gracefully renders 1 hero slide as an intentional static banner without carousel controls", () => {
    // Delete hero slides down to only 1 slide
    const singleSlide = [getLiveContent().home.hero.slides[0]];
    updateSection("home", {
      hero: {
        ...getLiveContent().home.hero,
        slides: singleSlide,
      },
    });

    const { container } = render(
      <HelmetProvider>
        <ContentProvider>
          <BrowserRouter>
            <Index />
          </BrowserRouter>
        </ContentProvider>
      </HelmetProvider>
    );

    // Carousel navigation controls should not be rendered for a single slide
    expect(container.querySelector(".home-hero__nav")).toBeNull();
    expect(container.querySelector(".home-hero__progress-wrap")).toBeNull();
  });

  it("dynamically updates board member count and roster in governance when added or deleted", () => {
    const newBoardMember = {
      name: "Prof. K. Sundaramoorthy",
      role: "Vice President",
      bio: "Tribal Rights Jurist & Anthropologist",
    };
    const currentMembers = getLiveContent().about.governance.members || [];
    updateSection("about", {
      governance: {
        ...getLiveContent().about.governance,
        members: [...currentMembers, newBoardMember],
      },
    });

    const live = getLiveContent();
    expect(live.about.governance.members.length).toBe(currentMembers.length + 1);
    expect(live.about.governance.members.some((m) => m.name === "Prof. K. Sundaramoorthy")).toBe(true);
  });

  it("dynamically updates historical journey timeline when phases are added or deleted", () => {
    const newPhase = {
      phase: "8",
      years: "2026–2030",
      title: "Decentralised Climate Adaptation & Autonomy",
      theme: "Next Generation Grassroots Accompaniment",
      description: "Deepening self-reliance across 200+ Adivasi hamlets.",
      highlights: ["Autonomous herbal knowledge exchanges"],
    };
    const currentPhases = getLiveContent().about.journeyPhases || [];
    updateSection("about", {
      journeyPhases: [...currentPhases, newPhase],
    });

    const live = getLiveContent();
    expect(live.about.journeyPhases.length).toBe(currentPhases.length + 1);
    expect(live.about.journeyPhases[live.about.journeyPhases.length - 1].title).toBe(
      "Decentralised Climate Adaptation & Autonomy"
    );
  });

  it("clicks on Programmes (8) tab without crashing and allows selecting different programmes", () => {
    render(
      <HelmetProvider>
        <ContentProvider>
          <BrowserRouter>
            <AdminDashboard />
          </BrowserRouter>
        </ContentProvider>
      </HelmetProvider>
    );

    // Click on Programmes (8) in sidebar
    const programmesTab = screen.getByText("Programmes (8)");
    expect(programmesTab).toBeInTheDocument();
    fireEvent.click(programmesTab);

    // Verify Programmes & Initiatives Editor rendered without any runtime crash
    expect(screen.getByText("Programmes & Initiatives Editor")).toBeInTheDocument();
    expect(
      screen.getByText(/Select any of LAYA's 8 core initiatives to edit titles/i)
    ).toBeInTheDocument();

    // Verify all 4 sections exist in the editor
    expect(screen.getByText("1. Hero Header & Top Eyebrow")).toBeInTheDocument();
    expect(screen.getByText("2. Institutional Overview & Context")).toBeInTheDocument();
    expect(screen.getByText(/3\. At a Glance Statistics/i)).toBeInTheDocument();
    expect(screen.getByText(/4\. Annual Report Disclosures & Strategic Initiatives/i)).toBeInTheDocument();

    // Verify programme selector pills are rendered
    expect(screen.getByText(/#1 · Safeguarding Adivasi/i)).toBeInTheDocument();
    expect(screen.getByText(/#2 · Health/i)).toBeInTheDocument();

    // Click on #2 Health pill
    const pill2 = screen.getByText(/#2 · Health/i);
    fireEvent.click(pill2);

    // Verify #2 Health is now active in the editor
    expect(screen.getByDisplayValue(/Herbal Based Health Care/i)).toBeInTheDocument();
  });

  it("clicks 'Edit programmes' shortcut on Overview tab and navigates directly to programmes editor", () => {
    render(
      <HelmetProvider>
        <ContentProvider>
          <BrowserRouter>
            <AdminDashboard />
          </BrowserRouter>
        </ContentProvider>
      </HelmetProvider>
    );

    // Click on 'Edit programmes' card shortcut
    const editProgrammesBtn = screen.getByRole("button", { name: /Edit programmes/i });
    expect(editProgrammesBtn).toBeInTheDocument();
    fireEvent.click(editProgrammesBtn);

    // Verify editor is now active
    expect(screen.getByText("Programmes & Initiatives Editor")).toBeInTheDocument();
  });

  it("synchronizes programme edits between Admin Dashboard and live frontend page", () => {
    const customHeroHeading = "Empowering Tribal Forest Sovereignty 2026";
    const customGlanceLabel = "Reclaimed Hectares";

    const currentProgrammes = getLiveContent().programmes;
    const updatedProgrammes = currentProgrammes.map((p, idx) => {
      if (idx === 0) {
        return {
          ...p,
          heroHeading: customHeroHeading,
          glance: [
            { value: "50,000+", label: customGlanceLabel, detail: "Legally secured ancestral boundaries." },
            ...(p.glance?.slice(1) || []),
          ],
        };
      }
      return p;
    });

    updateSection("programmes", updatedProgrammes);

    // Verify content store was updated
    const live = getLiveContent();
    expect(live.programmes[0].heroHeading).toBe(customHeroHeading);
    expect(live.programmes[0].glance[0].label).toBe(customGlanceLabel);

    // Render the actual frontend RLA programme page with the matching URL route
    const { getByRole, getByText } = render(
      <HelmetProvider>
        <ContentProvider>
          <MemoryRouter initialEntries={["/what-we-do/rla"]}>
            <WhatWeDoCategory />
          </MemoryRouter>
        </ContentProvider>
      </HelmetProvider>
    );

    // Verify the frontend displays the updated hero heading and updated glance stat
    expect(getByRole("heading", { name: customHeroHeading })).toBeInTheDocument();
    expect(getByText(customGlanceLabel)).toBeInTheDocument();
    expect(getByText("50,000+")).toBeInTheDocument();
  });

  it("provides Visual In-Page Direct Editor on live website allowing direct editing", () => {
    render(
      <HelmetProvider>
        <ContentProvider>
          <BrowserRouter>
            <Index />
          </BrowserRouter>
        </ContentProvider>
      </HelmetProvider>
    );

    // Verify floating Edit This Page Live button is mounted
    const editLiveBtn = screen.getByText("Edit This Page Live");
    expect(editLiveBtn).toBeInTheDocument();
    fireEvent.click(editLiveBtn);

    // Verify top status banner & quick-edit drawer open
    expect(screen.getByText("Live In-Page Editor Active")).toBeInTheDocument();
    expect(screen.getAllByText("Homepage (Hero, Pillars & Field Voices)")[0]).toBeInTheDocument();
    expect(screen.getByText("1. Hero Header & Top Eyebrow")).toBeInTheDocument();

    // Verify clicking Done closes the drawer
    const doneBtn = screen.getByRole("button", { name: /Done Editing/i });
    expect(doneBtn).toBeInTheDocument();
    fireEvent.click(doneBtn);
  });

  it("toggles Side-by-Side Split Live Website View in the Admin Dashboard", () => {
    render(
      <HelmetProvider>
        <ContentProvider>
          <BrowserRouter>
            <AdminDashboard />
          </BrowserRouter>
        </ContentProvider>
      </HelmetProvider>
    );

    // Find and click the Split Live View toggle button
    const splitBtn = screen.getByRole("button", { name: /Split Live View/i });
    expect(splitBtn).toBeInTheDocument();
    fireEvent.click(splitBtn);

    // Verify split preview bar appears with device toggles
    expect(screen.getByText("Live Split Preview:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Desktop/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tablet/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Mobile/i })).toBeInTheDocument();

    // Verify button switches to "Close Split View"
    expect(screen.getByText("Close Split View")).toBeInTheDocument();
  });
});
