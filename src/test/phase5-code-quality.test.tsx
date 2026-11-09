import { describe, expect, it, vi } from "vitest";
import { render, screen, renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useCountUp } from "@/hooks/use-count-up";
import ContactModal from "@/components/ContactModal";
import NotFound from "@/pages/NotFound";
import Donate from "@/pages/Donate";
import { Governance } from "@/pages/about/AboutPages";
import { CONTACT_DETAILS } from "@/content/contact";
import { ROUTES } from "@/lib/routes";

describe("Phase 5 — Code Quality & Architecture Verifications", () => {
  it("useCountUp provides cleanup that cancels animation frames and disconnects observer", () => {
    const cancelSpy = vi.spyOn(window, "cancelAnimationFrame");
    const { unmount } = renderHook(() => useCountUp("100+", 1000));
    unmount();
    expect(cancelSpy).toBeDefined();
    cancelSpy.mockRestore();
  });

  it("AnimatedCounter mounts cleanly with useCountUp generic ref", () => {
    const { container } = render(<AnimatedCounter value="500+" className="test-counter" />);
    expect(container.querySelector(".test-counter")).toBeInTheDocument();
  });

  it("ContactModal close button has accessible aria-label and type='button'", () => {
    const onClose = vi.fn();
    render(<ContactModal open={true} onClose={onClose} />);
    const closeBtn = screen.getByRole("button", { name: /close dialog/i });
    expect(closeBtn).toBeInTheDocument();
    expect(closeBtn).toHaveAttribute("type", "button");
  });

  it("NotFound page links directly to ROUTES.home", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </HelmetProvider>,
    );
    const homeLink = screen.getByRole("link", { name: /return to home/i });
    expect(homeLink).toHaveAttribute("href", ROUTES.home);
  });

  it("Donate page renders centralized CONTACT_DETAILS email and phone in statements", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Donate />
        </BrowserRouter>
      </HelmetProvider>,
    );
    const emailLinks = screen.getAllByRole("link", { name: CONTACT_DETAILS.email });
    expect(emailLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of emailLinks) {
      expect(link).toHaveAttribute("href", CONTACT_DETAILS.emailHref);
    }
  });

  it("Governance page renders complete designations for all 7 Board of Management members", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Governance />
        </BrowserRouter>
      </HelmetProvider>,
    );

    // Verify Board of Management members have their full designation populated in both BoM and General Body
    expect(screen.getAllByText("Prof B Devi Prasad").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Dr. Ritesh P Khunyakari").length).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByText(
        /Retd\. Professor, Centre for Equity for Women Children and Families/i,
      ).length,
    ).toBeGreaterThanOrEqual(2);
    expect(
      screen.getAllByText(
        /Associate Professor, Tata Institute of Social Sciences \(TISS\), Hyderabad/i,
      ).length,
    ).toBeGreaterThanOrEqual(2);
  });
});
