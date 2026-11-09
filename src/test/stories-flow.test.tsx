import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import Stories from "@/pages/Stories";
import StoryDetail from "@/pages/stories/StoryDetail";
import { FIELD_NOTES, FIELD_NOTE_COUNT } from "@/content/stories";

const renderWithRouter = (initialRoute: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:slug" element={<StoryDetail />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );

describe("Field Notes / Stories Flow", () => {
  it("renders the field notes index with honest stats and note listing", () => {
    renderWithRouter("/stories");

    // Heading and honest stats
    expect(screen.getByRole("heading", { level: 1, name: "Field Notes" })).toBeInTheDocument();
    expect(screen.getByText(String(FIELD_NOTE_COUNT))).toBeInTheDocument();

    // Verify lead note and other notes appear
    const firstNote = FIELD_NOTES[0];
    expect(screen.getByText(firstNote.title)).toBeInTheDocument();
    expect(screen.getByText(firstNote.author)).toBeInTheDocument();

    // Verify honest framing text
    expect(screen.getByText(/LAYA's longer documentation/i)).toBeInTheDocument();
  });

  it("renders a valid field note detail page with honest framing and metadata", () => {
    const note = FIELD_NOTES[0];
    renderWithRouter(`/stories/${note.slug}`);

    // Heading should be note title
    expect(screen.getByRole("heading", { level: 1, name: note.title })).toBeInTheDocument();
    // Author attribution
    expect(screen.getByText(note.author)).toBeInTheDocument();
    // Body text
    expect(screen.getByText(note.body)).toBeInTheDocument();
    // Honest framing indicating word count
    expect(
      screen.getByText(new RegExp(`field note of ${note.wordCount} words`, "i")),
    ).toBeInTheDocument();
    // Return link
    expect(screen.getByRole("link", { name: /all field notes/i })).toBeInTheDocument();
  });

  it("renders an honest 'Note not found' fallback when given an invalid slug", () => {
    renderWithRouter("/stories/unknown-non-existent-note-slug-999");

    expect(screen.getByRole("heading", { level: 1, name: "Note not found" })).toBeInTheDocument();
    expect(
      screen.getByText(/this field note is not available/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /all field notes/i })).toBeInTheDocument();
  });

  it("renders verified categories, human-readable dates, filter chips, and read-story links on listing", () => {
    renderWithRouter("/stories");

    // Category filter chips
    expect(screen.getByRole("button", { name: "All Notes" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Forest Rights" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Agro-Biodiversity" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Multilingual Learning" })).toBeInTheDocument();

    // Verified category badges and human-readable dates
    expect(screen.getByText("Forest Rights & Governance")).toBeInTheDocument();
    expect(screen.getByText("15 March 2024")).toBeInTheDocument();

    // Read field note links
    const readLinks = screen.getAllByRole("link", { name: /read field note/i });
    expect(readLinks.length).toBeGreaterThanOrEqual(3);
  });

  it("renders related programme card and continued reading related notes on detail view", () => {
    const note = FIELD_NOTES[0];
    renderWithRouter(`/stories/${note.slug}`);

    // Category badge & human-readable date
    expect(screen.getByText(note.category)).toBeInTheDocument();
    expect(screen.getByText("15 March 2024")).toBeInTheDocument();

    // Introductory excerpt
    expect(screen.getByText(note.excerpt)).toBeInTheDocument();

    // Related programme accompaniment card
    expect(
      screen.getByRole("heading", { level: 2, name: note.relatedProgramme.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(note.relatedProgramme.description)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /explore rights, law & accompaniment/i }),
    ).toBeInTheDocument();

    // Related field notes section
    expect(
      screen.getByRole("heading", { level: 2, name: /more from field notes/i }),
    ).toBeInTheDocument();
    // The other two notes should appear in the related section
    expect(screen.getByText(FIELD_NOTES[1].title)).toBeInTheDocument();
    expect(screen.getByText(FIELD_NOTES[2].title)).toBeInTheDocument();
  });
});
