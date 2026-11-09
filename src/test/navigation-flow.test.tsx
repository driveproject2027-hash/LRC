import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import Header from "@/components/Header";
import MainLayout from "@/layouts/MainLayout";
import NotFound from "@/pages/NotFound";
import { ROUTES } from "@/lib/routes";

describe("Navigation & Mobile Drawer User Flow", () => {
  it("opens mobile navigation drawer on hamburger menu click and closes on Escape", async () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </HelmetProvider>,
    );

    const menuButton = screen.getByRole("button", { name: /open menu/i });
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    // Open menu
    fireEvent.click(menuButton);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");

    // Close on Escape key
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  it("expands nested menu sections inside the mobile drawer", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </HelmetProvider>,
    );

    const menuButton = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menuButton);

    const dialog = screen.getByRole("dialog");
    const aboutSectionBtn = within(dialog).getByRole("button", { name: "About" });
    expect(aboutSectionBtn).toHaveAttribute("aria-expanded", "false");

    // Expand About section
    fireEvent.click(aboutSectionBtn);
    expect(aboutSectionBtn).toHaveAttribute("aria-expanded", "true");

    // Child links under About should now be visible
    expect(within(dialog).getByRole("link", { name: "Who We Are" })).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "How We Work" })).toBeInTheDocument();

    // Verify Organisation section also exists and expands
    const orgSectionBtn = within(dialog).getByRole("button", { name: "Organisation" });
    expect(orgSectionBtn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(orgSectionBtn);
    expect(orgSectionBtn).toHaveAttribute("aria-expanded", "true");

    // Child links under Organisation should now be visible
    expect(within(dialog).getByRole("link", { name: "Where We Work" })).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "Governance" })).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "Our Team" })).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "Support Partners" })).toBeInTheDocument();
  });

  it("renders brand identity, search, and donate button inside mobile navigation", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </HelmetProvider>,
    );

    const menuButton = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menuButton);

    const dialog = screen.getByRole("dialog");
    // Verify brand logo and name
    expect(within(dialog).getByRole("link", { name: /laya home/i })).toBeInTheDocument();
    expect(within(dialog).getByText(/resource centre/i)).toBeInTheDocument();

    // Verify in-drawer search input
    const searchInput = within(dialog).getByPlaceholderText(/search publications/i);
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: "community forest" } });
    expect(searchInput).toHaveValue("community forest");

    // Verify Donate action inside drawer
    const donateBtn = within(dialog).getByRole("link", { name: /support us \/ donate/i });
    expect(donateBtn).toBeInTheDocument();
    expect(donateBtn).toHaveAttribute("href", ROUTES.donate);
  });

  it("supports keyboard navigation on desktop dropdowns", async () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </HelmetProvider>,
    );

    // Find the desktop About dropdown trigger
    const aboutTriggers = screen.getAllByRole("button", { name: /about/i });
    const desktopAboutTrigger = aboutTriggers[0];
    expect(desktopAboutTrigger).toHaveAttribute("aria-expanded", "false");

    // Press ArrowDown to open dropdown
    fireEvent.keyDown(desktopAboutTrigger, { key: "ArrowDown" });
    expect(desktopAboutTrigger).toHaveAttribute("aria-expanded", "true");

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();

    // Verify menu items
    const menuItems = within(menu).getAllByRole("menuitem");
    expect(menuItems.length).toBe(4);
    expect(menuItems[0]).toHaveTextContent("Who We Are");

    // Escape closes the menu
    fireEvent.keyDown(menu, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByRole("menu")).toBeNull();
    });
  });

  it("displays all 5 divisions when hovering on Climate Crisis & Sustainable Development in Our Work dropdown", async () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </HelmetProvider>,
    );

    // Find and open "Our Work" desktop dropdown
    const ourWorkTrigger = screen.getAllByRole("button", { name: /our work/i })[0];
    fireEvent.mouseEnter(ourWorkTrigger.closest(".laya-nav-item")!);

    await waitFor(() => {
      expect(screen.getByRole("menu", { name: "Our Work" })).toBeInTheDocument();
    });

    const ourWorkMenu = screen.getByRole("menu", { name: "Our Work" });
    const climateItem = within(ourWorkMenu).getByRole("menuitem", {
      name: /climate crisis & sustainable development/i,
    });
    expect(climateItem).toBeInTheDocument();

    // Hover over the Climate item wrapper
    const climateWrapper = climateItem.closest(".laya-nav-menu__item-wrapper")!;
    fireEvent.mouseEnter(climateWrapper);

    // All 5 divisions should display in the secondary flyout
    await waitFor(() => {
      expect(
        screen.getByRole("menu", {
          name: /climate crisis & sustainable development divisions/i,
        }),
      ).toBeInTheDocument();
    });

    const submenu = screen.getByRole("menu", {
      name: /climate crisis & sustainable development divisions/i,
    });

    expect(
      within(submenu).getByRole("menuitem", {
        name: /sustainable agriculture and natural resource management/i,
      }),
    ).toHaveAttribute("href", ROUTES.whatWeDoSrm);

    expect(
      within(submenu).getByRole("menuitem", {
        name: /biodiversity, landuse and ecosystem restoration/i,
      }),
    ).toHaveAttribute("href", ROUTES.whatWeDoHbhc);

    expect(
      within(submenu).getByRole("menuitem", {
        name: /climate-friendly technologies and coastal ecosystems/i,
      }),
    ).toHaveAttribute("href", ROUTES.whatWeDoClimateTechCoastal);

    expect(
      within(submenu).getByRole("menuitem", {
        name: /urban and peri-urban ecosystems/i,
      }),
    ).toHaveAttribute("href", ROUTES.whatWeDoUrbanPeriUrban);

    expect(
      within(submenu).getByRole("menuitem", {
        name: /^partner engagements/i,
      }),
    ).toHaveAttribute("href", ROUTES.whatWeDoPartnerEngagements);
  });

  it("exposes Donate button on mobile header and Support Us on desktop navbar", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </HelmetProvider>,
    );

    // Mobile header Donate link
    const donateLinks = screen.getAllByRole("link", { name: /^donate$/i });
    expect(donateLinks.length).toBeGreaterThanOrEqual(1);
    expect(donateLinks[0]).toHaveAttribute("href", ROUTES.donate);

    // Desktop navbar Support Us link
    const supportUsLink = screen.getByRole("link", { name: /support us/i });
    expect(supportUsLink).toBeInTheDocument();
    expect(supportUsLink).toHaveAttribute("href", ROUTES.donate);
  });
});

describe("Unknown Route 404 Rendering", () => {
  it("renders 404 Page Not Found with link to canonical home for unmatched routes", () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/unmatched-test-route-12345"]}>
          <Routes>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
    const homeLink = screen.getByRole("link", { name: /return to home/i });
    expect(homeLink).toHaveAttribute("href", ROUTES.home);
  });

  it("renders Home text navigation link beside About and excludes Laya Resource Centre from website redirections", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </HelmetProvider>,
    );

    // Verify Home text link is present
    const homeLinks = screen.getAllByRole("link", { name: /^home$/i });
    expect(homeLinks.length).toBeGreaterThanOrEqual(1);
    expect(homeLinks[0]).toHaveAttribute("href", "/");

    // Verify website redirection links do NOT include "Laya Resource Centre"
    const redirectionLinks = screen.queryByRole("link", { name: /^laya resource centre$/i });
    expect(redirectionLinks).toBeNull();

    // Verify external redirection links like Laya Green Energy and Laya Green Ventures remain present
    expect(screen.getAllByRole("link", { name: /laya green energy/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: /laya green ventures/i }).length).toBeGreaterThanOrEqual(1);
  });
});

describe("MainLayout Floating Controls", () => {
  it("does not render the floating WhatsApp button across the site", () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <MainLayout>
            <div>Test Child Content</div>
          </MainLayout>
        </BrowserRouter>
      </HelmetProvider>,
    );

    const floatingWhatsApp = screen.queryByRole("link", { name: /chat on whatsapp/i });
    expect(floatingWhatsApp).toBeNull();
  });
});
