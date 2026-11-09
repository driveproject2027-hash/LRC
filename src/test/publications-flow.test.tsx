import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import Publications from "@/pages/Publications";
import { RESOURCES } from "@/content/resources";

const renderPublications = () =>
  render(
    <HelmetProvider>
      <BrowserRouter>
        <Publications />
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

describe("Publications Search, Filtering, and Reset User Flow", () => {
  it("renders all library documents by default", () => {
    renderPublications();
    expect(getShowingCount()).toHaveTextContent(
      `Showing ${RESOURCES.length} of ${RESOURCES.length} documents`,
    );
  });

  it("filters documents dynamically by search keyword", () => {
    renderPublications();
    const searchInput = screen.getByPlaceholderText(/search by title, topic or type/i);

    fireEvent.change(searchInput, { target: { value: "mussel" } });

    expect(getShowingCount()).toHaveTextContent(/Showing 1 of \d+ documents/i);
    expect(
      screen.getByRole("heading", { level: 3, name: "Training in Integrated Mussel Farming" }),
    ).toBeInTheDocument();
  });

  it("filters documents by category chip", () => {
    renderPublications();
    const categoryBtn = screen.getByRole("button", { name: /^Reports/i });
    fireEvent.click(categoryBtn);

    expect(categoryBtn).toHaveAttribute("aria-pressed", "true");
    expect(getShowingCount()).toBeInTheDocument();
  });

  it("displays honest empty state when no documents match filters", () => {
    renderPublications();
    const searchInput = screen.getByPlaceholderText(/search by title, topic or type/i);

    fireEvent.change(searchInput, { target: { value: "xyznonexistentstring123" } });

    expect(screen.getByText("No documents match your filters")).toBeInTheDocument();
    expect(
      screen.getByText(/try a different search term, or clear the filters to see the whole library/i),
    ).toBeInTheDocument();

    const clearBtn = screen.getByRole("button", { name: /clear all filters/i });
    expect(clearBtn).toBeInTheDocument();
  });

  it("resets all filters when clicking 'Clear all filters'", () => {
    renderPublications();
    const searchInput = screen.getByPlaceholderText(/search by title, topic or type/i);

    fireEvent.change(searchInput, { target: { value: "xyznonexistentstring123" } });
    expect(screen.getByText("No documents match your filters")).toBeInTheDocument();

    const clearBtn = screen.getByRole("button", { name: /clear all filters/i });
    fireEvent.click(clearBtn);

    // Search input should be cleared
    expect(searchInput).toHaveValue("");
    // All documents should be shown again
    expect(getShowingCount()).toHaveTextContent(
      `Showing ${RESOURCES.length} of ${RESOURCES.length} documents`,
    );
  });

  it("toggles the mobile filter options panel when clicking the filter toggle button", () => {
    renderPublications();
    const toggleBtn = screen.getByRole("button", { name: /filter by category, type & year/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute("aria-expanded", "false");
  });
});


