import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import Publications from "@/pages/Publications";
import { ResourceCard } from "@/components/resource/ResourceCard";
import { RESOURCES, RESOURCE_YEARS } from "@/content/resources";

const renderPublications = (props = {}) =>
  render(
    <HelmetProvider>
      <BrowserRouter>
        <Publications {...props} />
      </BrowserRouter>
    </HelmetProvider>,
  );

const getShowingCount = () =>
  screen.getByText(
    (_, element) =>
      element?.tagName.toLowerCase() === "p" &&
      element.classList.contains("res-filters__result") &&
      (element.textContent?.includes("Showing") ?? false),
  );

describe("Digital Resource Library & Publications Upgrade", () => {
  it("renders verified year chips with document counts", () => {
    renderPublications();
    // Verify that the Year filter group exists
    expect(screen.getByRole("group", { name: /^Year/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^All years/i })).toBeInTheDocument();

    // Verify first verified year exists
    expect(RESOURCE_YEARS.length).toBeGreaterThan(5);
    const year2020Btn = screen.getByRole("button", { name: /^2020/i });
    expect(year2020Btn).toBeInTheDocument();
  });

  it("filters library documents when clicking a verified year chip", () => {
    renderPublications();
    const count2020 = RESOURCES.filter((r) => r.year === 2020).length;
    const year2020Btn = screen.getByRole("button", { name: /^2020/i });

    fireEvent.click(year2020Btn);
    expect(year2020Btn).toHaveAttribute("aria-pressed", "true");
    expect(getShowingCount()).toHaveTextContent(`Showing ${count2020} of ${RESOURCES.length} documents`);
  });

  it("renders concise category labels on publication cards", () => {
    const musselDoc = RESOURCES.find((r) => r.title === "Training in Integrated Mussel Farming")!;
    render(<ResourceCard resource={musselDoc} />);

    // Verify card shows document type, verified date, and concise category label
    expect(screen.getAllByText("Publication").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("March 2026")).toBeInTheDocument();
    expect(screen.getByText("Livelihoods")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View Training in Integrated Mussel Farming/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Download Training in Integrated Mussel Farming/i })).toBeInTheDocument();
  });

  it("toggles between Grid and List layouts smoothly", () => {
    renderPublications();
    const gridBtn = screen.getByRole("button", { name: /^Grid view/i });
    const listBtn = screen.getByRole("button", { name: /^List view/i });

    expect(gridBtn).toHaveAttribute("aria-pressed", "true");
    expect(listBtn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(listBtn);
    expect(listBtn).toHaveAttribute("aria-pressed", "true");
    expect(gridBtn).toHaveAttribute("aria-pressed", "false");
  });

  it("supports clearing search with the clear (X) button", () => {
    renderPublications();
    const searchInput = screen.getByPlaceholderText(/search by title, topic or type/i);
    fireEvent.change(searchInput, { target: { value: "mussel" } });

    const clearInputBtn = screen.getByRole("button", { name: /clear search input/i });
    expect(clearInputBtn).toBeInTheDocument();

    fireEvent.click(clearInputBtn);
    expect(searchInput).toHaveValue("");
    expect(getShowingCount()).toHaveTextContent(`Showing ${RESOURCES.length} of ${RESOURCES.length} documents`);
  });

  it("renders loading state when isLoading prop is true", () => {
    renderPublications({ isLoading: true });
    expect(screen.getByRole("status", { name: /loading library documents/i })).toBeInTheDocument();
    expect(screen.getByText(/loading digital library/i)).toBeInTheDocument();
  });

  it("renders error state when error prop is provided", () => {
    renderPublications({ error: "Failed to connect to publication index" });
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Unable to load publications")).toBeInTheDocument();
    expect(screen.getByText("Failed to connect to publication index")).toBeInTheDocument();
  });
});
