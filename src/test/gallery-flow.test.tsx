import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import Gallery from "@/pages/Gallery";

const renderGallery = () =>
  render(
    <HelmetProvider>
      <BrowserRouter>
        <Gallery />
      </BrowserRouter>
    </HelmetProvider>,
  );

describe("Visual Archive / Gallery Lightbox & Keyboard Navigation Flow", () => {
  it("opens lightbox dialog when an archive photo plate is clicked", () => {
    renderGallery();

    const plateButtons = screen.getAllByRole("button", { name: /^Open .*, plate \d+/i });
    expect(plateButtons.length).toBeGreaterThan(0);

    fireEvent.click(plateButtons[0]);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");

    expect(within(dialog).getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("navigates photographs with keyboard ArrowRight and ArrowLeft", () => {
    renderGallery();

    const plateButtons = screen.getAllByRole("button", { name: /^Open .*, plate \d+/i });
    fireEvent.click(plateButtons[0]);

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText(/Plate 01 \//i)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(within(dialog).getByText(/Plate 02 \//i)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(within(dialog).getByText(/Plate 01 \//i)).toBeInTheDocument();
  });

  it("closes the lightbox dialog when Escape key is pressed", async () => {
    renderGallery();

    const plateButtons = screen.getAllByRole("button", { name: /^Open .*, plate \d+/i });
    fireEvent.click(plateButtons[0]);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  it("closes the lightbox dialog when clicking the close button", async () => {
    renderGallery();

    const plateButtons = screen.getAllByRole("button", { name: /^Open .*, plate \d+/i });
    fireEvent.click(plateButtons[0]);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const closeBtn = within(dialog).getByRole("button", { name: "Close" });
    fireEvent.click(closeBtn);
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });
});
