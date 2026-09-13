import { act, fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ContactModal from "@/components/ContactModal";
import { useContactForm } from "@/hooks/use-contact-form";
import { submitContactMessage } from "@/services/api";

vi.mock("@/services/api", () => ({
  submitContactMessage: vi.fn(),
}));

describe("useContactForm", () => {
  beforeEach(() => vi.clearAllMocks());

  it("clears submitted values only after a successful request", async () => {
    vi.mocked(submitContactMessage).mockResolvedValueOnce();
    const { result } = renderHook(() => useContactForm());

    act(() => result.current.updateField("name", "Asha"));
    act(() => result.current.updateField("message", "Hello"));
    await act(async () => {
      await result.current.submit();
    });

    expect(submitContactMessage).toHaveBeenCalledWith({
      name: "Asha",
      email: "",
      subject: "",
      message: "Hello",
    });
    expect(result.current.formData.name).toBe("");
    expect(result.current.formData.message).toBe("");
    expect(result.current.submitError).toBeNull();
  });

  it("preserves entered values and exposes an error when delivery fails", async () => {
    vi.mocked(submitContactMessage).mockRejectedValueOnce(new Error("network"));
    const { result } = renderHook(() => useContactForm());

    act(() => result.current.updateField("email", "asha@example.com"));
    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.formData.email).toBe("asha@example.com");
    expect(result.current.submitError).toMatch(/couldn't send/i);
  });
});

describe("ContactModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => undefined);
  });

  it("submits the entered message and closes after success", async () => {
    vi.mocked(submitContactMessage).mockResolvedValueOnce();
    const onClose = vi.fn();
    render(<ContactModal open onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText("Your name"), { target: { value: "Asha" } });
    fireEvent.change(screen.getByPlaceholderText("your@email.com"), { target: { value: "asha@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Subject"), { target: { value: "Hello" } });
    fireEvent.change(screen.getByPlaceholderText("Your message..."), { target: { value: "Message" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    expect(submitContactMessage).toHaveBeenCalled();
  });

  it("keeps the modal open and shows an error after failure", async () => {
    vi.mocked(submitContactMessage).mockRejectedValueOnce(new Error("network"));
    const onClose = vi.fn();
    render(<ContactModal open onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText("Your name"), { target: { value: "Asha" } });
    fireEvent.change(screen.getByPlaceholderText("your@email.com"), { target: { value: "asha@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Subject"), { target: { value: "Hello" } });
    fireEvent.change(screen.getByPlaceholderText("Your message..."), { target: { value: "Message" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't send/i);
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByDisplayValue("Asha")).toBeInTheDocument();
  });
});
