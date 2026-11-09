import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import Index from "@/pages/Index";
import { ResourceCard } from "@/components/resource/ResourceCard";
import { TestimonialsStrip } from "@/components/home/TestimonialsStrip";
import { SiteBackground } from "@/components/SiteBackground";
import { mockTestimonials } from "@/services/api";
import { PRIMARY_NAV, type NavItem, type NavChild } from "@/config/navigation";
import { hero } from "@/content/home";
import type { Resource } from "@/content/resources";

describe("Design Refinement & Feature Restoration", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders SiteBackground with subtle Yin-Yang harmonic geometry", () => {
    const { container } = render(<SiteBackground />);
    const motifContainer = container.querySelector("[aria-hidden='true']");
    expect(motifContainer).toBeInTheDocument();
    expect(motifContainer).toHaveClass("pointer-events-none");
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(3);
  });

  it("renders the TestimonialsStrip with authentic quotes and accessible controls", () => {
    render(<TestimonialsStrip />);

    // Renders the first testimonial
    expect(screen.getByText(mockTestimonials[0].name)).toBeInTheDocument();

    // Has accessible prev/next and pause controls
    const nextBtn = screen.getByRole("button", { name: /next reflection/i });
    const prevBtn = screen.getByRole("button", { name: /previous reflection/i });
    const pauseBtn = screen.getByRole("button", { name: /pause reflection rotation/i });

    expect(nextBtn).toBeInTheDocument();
    expect(prevBtn).toBeInTheDocument();
    expect(pauseBtn).toBeInTheDocument();

    // Clicking next advances to the next reflection
    fireEvent.click(nextBtn);
    expect(screen.getByText(mockTestimonials[1].name)).toBeInTheDocument();

    // Clicking prev goes back
    fireEvent.click(prevBtn);
    expect(screen.getByText(mockTestimonials[0].name)).toBeInTheDocument();
  });

  it("synchronises all slide content: text, images, captions, CTAs, indicators, and controls", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      </HelmetProvider>,
    );

    const carousel = screen.getByRole("region", { name: /LAYA Field Photography Carousel/i });
    expect(carousel).toBeInTheDocument();

    const nextSlideBtn = screen.getByRole("button", { name: /next photograph/i });
    const prevSlideBtn = screen.getByRole("button", { name: /previous photograph/i });
    const pauseBtn = screen.getByRole("button", { name: /pause slideshow/i });

    // === SLIDE 1 INITIAL STATE ===
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(hero.slides[0].headline);
    expect(screen.getByText(hero.slides[0].eyebrow)).toBeInTheDocument();
    expect(screen.getByText(hero.slides[0].supporting)).toBeInTheDocument();
    expect(screen.getByText(hero.slides[0].image.caption)).toBeInTheDocument();
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: new RegExp(hero.slides[0].primaryCta.label, "i") })[0]).toHaveAttribute(
      "href",
      hero.slides[0].primaryCta.to,
    );

    // === NEXT -> SLIDE 2 ===
    fireEvent.click(nextSlideBtn);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(hero.slides[1].headline);
    expect(screen.queryByRole("heading", { level: 1, name: hero.slides[0].headline })).toBeNull();
    expect(screen.getByText(hero.slides[1].eyebrow)).toBeInTheDocument();
    expect(screen.getByText(hero.slides[1].supporting)).toBeInTheDocument();
    expect(screen.getByText(hero.slides[1].image.caption)).toBeInTheDocument();
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: new RegExp(hero.slides[1].primaryCta.label, "i") })[0]).toHaveAttribute(
      "href",
      hero.slides[1].primaryCta.to,
    );

    // === NEXT -> SLIDE 3 ===
    fireEvent.click(nextSlideBtn);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(hero.slides[2].headline);
    expect(screen.queryByRole("heading", { level: 1, name: hero.slides[1].headline })).toBeNull();
    expect(screen.getByText(hero.slides[2].eyebrow)).toBeInTheDocument();
    expect(screen.getByText(hero.slides[2].supporting)).toBeInTheDocument();
    expect(screen.getByText(hero.slides[2].image.caption)).toBeInTheDocument();
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: new RegExp(hero.slides[2].primaryCta.label, "i") })[0]).toHaveAttribute(
      "href",
      hero.slides[2].primaryCta.to,
    );

    // === NEXT -> WRAPS BACK TO SLIDE 1 ===
    fireEvent.click(nextSlideBtn);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(hero.slides[0].headline);
    expect(screen.getByText("1 / 3")).toBeInTheDocument();

    // === PREV -> WRAPS TO SLIDE 3 ===
    fireEvent.click(prevSlideBtn);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(hero.slides[2].headline);
    expect(screen.getByText("3 / 3")).toBeInTheDocument();

    // === INDICATOR CLICK -> JUMPS DIRECTLY TO SLIDE 2 ===
    const indicator2 = screen.getByRole("button", { name: /go to slide 2/i });
    fireEvent.click(indicator2);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(hero.slides[1].headline);
    expect(screen.getByText("2 / 3")).toBeInTheDocument();

    // === KEYBOARD ARROW KEYS ===
    fireEvent.keyDown(carousel, { key: "ArrowLeft" });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(hero.slides[0].headline);
    expect(screen.getByText("1 / 3")).toBeInTheDocument();

    fireEvent.keyDown(carousel, { key: "ArrowRight" });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(hero.slides[1].headline);
    expect(screen.getByText("2 / 3")).toBeInTheDocument();

    // === PAUSE AND AUTO-ROTATION ===
    // Pause button toggles
    fireEvent.click(pauseBtn);
    expect(screen.getByRole("button", { name: /resume slideshow/i })).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(7000);
    });
    // Still on slide 2 because it is paused
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(hero.slides[1].headline);

    // Resume slideshow
    const resumeBtn = screen.getByRole("button", { name: /resume slideshow/i });
    fireEvent.click(resumeBtn);
    expect(screen.getByRole("button", { name: /pause slideshow/i })).toBeInTheDocument();

    // Advance timer -> rotates to slide 3
    act(() => {
      vi.advanceTimersByTime(6500);
    });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(hero.slides[2].headline);
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  it("simplifies ResourceCard by omitting description and context summaries", () => {
    const testDoc: Resource = {
      id: "test-resource",
      title: "Test Publication for Verification",
      description: "This is a detailed summary description that must not appear in the card.",
      context: "This is contextual information that must not appear in the card.",
      link: "https://laya.org.in/PublicFiles/Test.pdf",
      image: "https://laya.org.in/covers/test.jpg",
      type: "Research Paper",
      year: "2023",
    };

    render(<ResourceCard resource={testDoc} />);

    // Title is present
    expect(screen.getByRole("link", { name: testDoc.title })).toBeInTheDocument();
    // Type and Year metadata are present
    expect(screen.getAllByText("Research Paper").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("2023")).toBeInTheDocument();
    // Action links are present
    expect(screen.getByRole("link", { name: /View Test Publication/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Download Test Publication/i })).toBeInTheDocument();

    // Summaries MUST be removed
    expect(screen.queryByText(testDoc.description)).toBeNull();
    expect(screen.queryByText(testDoc.context!)).toBeNull();
  });

  it("splits About into two balanced 4-item dropdowns: About and Organisation", () => {
    const about = PRIMARY_NAV.find((i: NavItem) => i.label === "About");
    const org = PRIMARY_NAV.find((i: NavItem) => i.label === "Organisation");

    expect(about).toBeDefined();
    expect(about?.children).toHaveLength(4);
    expect(about?.children?.map((c: NavChild) => c.label)).toEqual([
      "Who We Are",
      "Our Story",
      "Our Journey",
      "How We Work",
    ]);

    expect(org).toBeDefined();
    expect(org?.children).toHaveLength(4);
    expect(org?.children?.map((c: NavChild) => c.label)).toEqual([
      "Where We Work",
      "Our Team",
      "Governance",
      "Support Partners",
    ]);
  });
});
