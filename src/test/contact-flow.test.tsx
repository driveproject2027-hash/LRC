import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Contact from "@/pages/Contact";
import { submitContactMessage } from "@/services/api";

vi.mock("@/services/api", async (importOriginal) => ({
  ...(await importOriginal()),
  submitContactMessage: vi.fn(),
}));

const renderContact = () =>
  render(
    <HelmetProvider>
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    </HelmetProvider>,
  );

describe("Contact Page User Flow & Form Resilience", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("validates empty required fields and announces errors accessibly", async () => {
    renderContact();
    const submitBtn = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitBtn);

    // Each field validation error must appear
    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email address.")).toBeInTheDocument();
    expect(screen.getByText("Please enter a subject.")).toBeInTheDocument();
    expect(screen.getByText("Please enter a message.")).toBeInTheDocument();

    // Inputs must be flagged with aria-invalid="true" and point to error alerts
    const nameInput = screen.getByLabelText(/^Name/i);
    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput).toHaveAttribute("aria-describedby", "name-error");

    const emailInput = screen.getByLabelText(/^Email/i);
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAttribute("aria-describedby", "email-error");
  });

  it("validates specific format constraints: short name, malformed email, short message", () => {
    renderContact();

    fireEvent.change(screen.getByLabelText(/^Name/i), { target: { value: "A" } });
    fireEvent.change(screen.getByLabelText(/^Email/i), { target: { value: "invalid-email" } });
    fireEvent.change(screen.getByLabelText(/^Subject/i), { target: { value: "General Enquiry" } });
    fireEvent.change(screen.getByLabelText(/^Message/i), { target: { value: "Too short" } });

    const submitBtn = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText("Please enter at least 2 characters.")).toBeInTheDocument();
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText("Please provide a little more detail.")).toBeInTheDocument();
    expect(submitContactMessage).not.toHaveBeenCalled();
  });

  it("prevents duplicate submissions while request is in flight", async () => {
    let resolveApi: () => void = () => {};
    vi.mocked(submitContactMessage).mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveApi = resolve;
        }),
    );

    renderContact();

    fireEvent.change(screen.getByLabelText(/^Name/i), { target: { value: "Aarav Sharma" } });
    fireEvent.change(screen.getByLabelText(/^Email/i), { target: { value: "aarav@example.org" } });
    fireEvent.change(screen.getByLabelText(/^Subject/i), { target: { value: "Community Forest Rights" } });
    fireEvent.change(screen.getByLabelText(/^Message/i), {
      target: { value: "We would like to connect regarding documentation on CFR titles in Visakhapatnam." },
    });

    const submitBtn = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitBtn);

    // Button should immediately show sending state and become disabled
    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveTextContent(/sending…/i);

    // Additional clicks should not trigger duplicate submissions
    fireEvent.click(submitBtn);
    expect(submitContactMessage).toHaveBeenCalledTimes(1);

    // Complete the API call
    resolveApi();
    await waitFor(() => {
      expect(screen.getByText("Message sent")).toBeInTheDocument();
    });
  });

  it("preserves filled form data and displays honest error banner upon delivery failure", async () => {
    vi.mocked(submitContactMessage).mockRejectedValueOnce(new Error("500 Internal Server Error"));

    renderContact();

    const nameInput = screen.getByLabelText(/^Name/i);
    const emailInput = screen.getByLabelText(/^Email/i);
    const subjectInput = screen.getByLabelText(/^Subject/i);
    const messageInput = screen.getByLabelText(/^Message/i);

    fireEvent.change(nameInput, { target: { value: "Priya Varma" } });
    fireEvent.change(emailInput, { target: { value: "priya@example.org" } });
    fireEvent.change(subjectInput, { target: { value: "Research on Herbal Medicine" } });
    fireEvent.change(messageInput, {
      target: { value: "Requesting access to the field documentation regarding medicinal herbs." },
    });

    const submitBtn = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitBtn);

    // Server error alert must appear
    const alertBanner = await screen.findByRole("alert");
    expect(alertBanner).toHaveTextContent(/message not sent/i);
    expect(alertBanner).toHaveTextContent(/couldn't send your message/i);

    // Form inputs must remain filled so user data is not lost
    expect(nameInput).toHaveValue("Priya Varma");
    expect(emailInput).toHaveValue("priya@example.org");
    expect(subjectInput).toHaveValue("Research on Herbal Medicine");
    expect(messageInput).toHaveValue("Requesting access to the field documentation regarding medicinal herbs.");

    // Submit button re-enables for retry
    expect(submitBtn).not.toBeDisabled();
    expect(submitBtn).toHaveTextContent(/send message/i);
  });

  it("renders honest confirmation view on successful delivery", async () => {
    vi.mocked(submitContactMessage).mockResolvedValueOnce();

    renderContact();

    fireEvent.change(screen.getByLabelText(/^Name/i), { target: { value: "Suresh Rao" } });
    fireEvent.change(screen.getByLabelText(/^Email/i), { target: { value: "suresh@example.org" } });
    fireEvent.change(screen.getByLabelText(/^Subject/i), { target: { value: "Solar Micro-Grids" } });
    fireEvent.change(messageInput(), {
      target: { value: "Inquiring about decentralized renewable energy implementation models." },
    });

    function messageInput() {
      return screen.getByLabelText(/^Message/i);
    }

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(submitContactMessage).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByText("Message sent")).toBeInTheDocument();
      expect(screen.getByText(/thank you for reaching out/i)).toBeInTheDocument();
    });

    // Form should be replaced by the confirmation status block
    expect(screen.queryByRole("button", { name: /send message/i })).toBeNull();
  });
});
