import { fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ResourceCard } from "@/components/resource/ResourceCard";
import { CONTACT_DETAILS, SOCIAL_LINKS } from "@/content/contact";
import { useContactForm } from "@/hooks/use-contact-form";
import { submitContactMessage, type ContactSubmission } from "@/services/api";
import type { Resource } from "@/content/resources";

vi.mock("@/services/api", async (importOriginal) => ({
  ...(await importOriginal()),
  submitContactMessage: vi.fn(),
}));

describe("Phase 1 — Task A: WhatsApp Contact Fix", () => {
  it("uses the authoritative mobile WhatsApp number and not the landline", () => {
    expect(CONTACT_DETAILS.whatsapp).toBe("919949731307");
    expect(CONTACT_DETAILS.whatsapp).not.toBe("918912737662");
  });

  it("renders WhatsApp button link with the correct mobile WhatsApp URL", () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole("link", { name: /chat on whatsapp/i });
    expect(link).toHaveAttribute("href");
    const href = link.getAttribute("href")!;
    expect(href).toContain("https://wa.me/919949731307");
    expect(href).not.toContain("918912737662");
  });
});

describe("Phase 1 — Task B: Social Links & Dead YouTube Link Removal", () => {
  it("does not contain YouTube or any dead '#' links in SOCIAL_LINKS", () => {
    const youtube = SOCIAL_LINKS.find((s) => s.label.toLowerCase() === "youtube");
    expect(youtube).toBeUndefined();

    const deadLinks = SOCIAL_LINKS.filter((s) => s.href === "#" || s.href.trim() === "");
    expect(deadLinks).toHaveLength(0);
  });

  it("ensures every social link is a valid external URL", () => {
    expect(SOCIAL_LINKS.length).toBeGreaterThan(0);
    for (const link of SOCIAL_LINKS) {
      expect(link.href.startsWith("https://")).toBe(true);
    }
  });
});

describe("Phase 1 — Task C: Unavailable Publications Status Handling", () => {
  const availableDoc: Resource = {
    id: "test-available",
    title: "Available Research Paper",
    description: "A digitized report available for download.",
    image: "/test.jpg",
    context: "Context note.",
    link: "https://laya.org.in/PublicFiles/Test_Doc.pdf",
    sourceCategory: "Climate & Environment",
    type: "Report",
    year: 2024,
  };

  const unavailableDoc: Resource = {
    id: "test-unavailable",
    title: "Non-Digitized Archive Document",
    description: "Historical document currently only in print.",
    image: "/test2.jpg",
    context: "Context note.",
    link: "#",
    sourceCategory: "Policy & Advocacy",
    type: "Policy Brief",
    year: null,
  };

  it("renders working PDF links for available documents", () => {
    render(<ResourceCard resource={availableDoc} />);
    const titleLink = screen.getByRole("link", { name: "Available Research Paper" });
    expect(titleLink).toHaveAttribute("href", "https://laya.org.in/PublicFiles/Test_Doc.pdf");
    expect(titleLink).toHaveAttribute("target", "_blank");

    const viewLink = screen.getByRole("link", { name: /^View Available Research Paper/i });
    expect(viewLink).toHaveAttribute("href", "https://laya.org.in/PublicFiles/Test_Doc.pdf");
  });

  it("renders clear unavailable status and disables actions for documents with link '#'", () => {
    render(<ResourceCard resource={unavailableDoc} />);

    // Title must NOT be an <a> link with href="#"
    expect(screen.queryByRole("link", { name: /non-digitized archive document/i })).toBeNull();
    expect(screen.getByText("Non-Digitized Archive Document")).toBeInTheDocument();

    // Must show explicit not digitized notice
    expect(screen.getByText(/digital copy unavailable/i)).toBeInTheDocument();
    expect(screen.getByText(/physical archive only — digital pdf not yet available/i)).toBeInTheDocument();

    // Actions must be disabled and not be working <a> links
    const disabledButtons = screen.getAllByTitle(/digital copy not yet digitized/i);
    expect(disabledButtons.length).toBeGreaterThan(0);
    for (const el of disabledButtons) {
      expect(el).toHaveAttribute("aria-disabled", "true");
      expect(el.tagName.toLowerCase()).not.toBe("a");
    }
  });
});

describe("Phase 1 — Task E: Contact Form Request & Error Handling", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("validates form submission on empty or malformed inputs", async () => {
    const { result } = renderHook(() => useContactForm());

    // Initially empty
    expect(result.current.formData.name).toBe("");
    expect(result.current.formData.email).toBe("");

    // Update with valid data
    act(() => {
      result.current.updateField("name", "Anita");
      result.current.updateField("email", "anita@example.com");
      result.current.updateField("subject", "Enquiry");
      result.current.updateField("message", "This is an enquiry with sufficient length.");
    });

    expect(result.current.formData.name).toBe("Anita");
    expect(result.current.formData.email).toBe("anita@example.com");
  });

  it("handles server 500 error gracefully and sets submitError", async () => {
    vi.mocked(submitContactMessage).mockRejectedValueOnce(new Error("500 Internal Server Error"));
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.updateField("name", "Anita");
      result.current.updateField("email", "anita@example.com");
      result.current.updateField("subject", "Enquiry");
      result.current.updateField("message", "Test message for error handling.");
    });

    let success = false;
    await act(async () => {
      success = await result.current.submit();
    });

    expect(success).toBe(false);
    expect(result.current.submitError).toMatch(/couldn't send your message/i);
    expect(result.current.isSubmitting).toBe(false);
    // Values preserved so user does not lose input
    expect(result.current.formData.name).toBe("Anita");
  });

  it("handles network failure gracefully", async () => {
    vi.mocked(submitContactMessage).mockRejectedValueOnce(new Error("Network Error"));
    const { result } = renderHook(() => useContactForm());

    let success = false;
    await act(async () => {
      success = await result.current.submit();
    });

    expect(success).toBe(false);
    expect(result.current.submitError).toBeTruthy();
  });

  it("handles successful response cleanly", async () => {
    vi.mocked(submitContactMessage).mockResolvedValueOnce();
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.updateField("name", "Ramu");
      result.current.updateField("email", "ramu@example.com");
      result.current.updateField("subject", "Volunteering");
      result.current.updateField("message", "I want to volunteer for LAYA programmes.");
    });

    let success = false;
    await act(async () => {
      success = await result.current.submit();
    });

    expect(success).toBe(true);
    expect(result.current.submitError).toBeNull();
    // Form cleared on success
    expect(result.current.formData.name).toBe("");
  });

  it("prevents duplicate submissions while a request is in flight", async () => {
    let resolveApi!: () => void;
    const pendingPromise = new Promise<void>((resolve) => {
      resolveApi = resolve;
    });
    vi.mocked(submitContactMessage).mockReturnValueOnce(pendingPromise);

    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.updateField("name", "Test In Flight");
      result.current.updateField("email", "inflight@example.com");
      result.current.updateField("subject", "In Flight");
      result.current.updateField("message", "Testing duplicate submission prevention.");
    });

    let firstSubmitPromise: Promise<boolean>;
    act(() => {
      firstSubmitPromise = result.current.submit();
    });

    expect(result.current.isSubmitting).toBe(true);

    // Attempt second submission while first is still in flight
    let secondResult = true;
    await act(async () => {
      secondResult = await result.current.submit();
    });

    expect(secondResult).toBe(false);
    expect(submitContactMessage).toHaveBeenCalledTimes(1);

    // Resolve first
    await act(async () => {
      resolveApi();
      await firstSubmitPromise;
    });

    expect(result.current.isSubmitting).toBe(false);
  });
});

