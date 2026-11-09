import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import Donate from "@/pages/Donate";

const renderDonate = () =>
  render(
    <HelmetProvider>
      <BrowserRouter>
        <Donate />
      </BrowserRouter>
    </HelmetProvider>,
  );

describe("Phase 3 — Task 2: Honest Donation Pledge Flow", () => {
  it("validates required fields before processing", () => {
    renderDonate();
    const submitBtn = screen.getByRole("button", { name: /record my intention to give/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a donation amount/i)).toBeInTheDocument();
  });

  it("displays an honest pending state instead of claiming the pledge was stored/sent", () => {
    renderDonate();

    fireEvent.change(screen.getByLabelText(/^Name/i), { target: { value: "Aarav Sharma" } });
    fireEvent.change(screen.getByLabelText(/^Email/i), { target: { value: "aarav@example.org" } });
    fireEvent.change(screen.getByLabelText(/Intended amount/i), { target: { value: "5000" } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: "Supporting tribal rights." } });

    const submitBtn = screen.getByRole("button", { name: /record my intention to give/i });
    fireEvent.click(submitBtn);

    // It must NOT display the false message claiming "The LAYA team will contact you"
    expect(screen.queryByText(/the laya team will contact you at/i)).toBeNull();

    // It MUST display the honest pending integration notice
    expect(
      screen.getByText(/online pledge recording is pending backend integration/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/automated database pledge storage is not yet active on this site/i),
    ).toBeInTheDocument();

    // It MUST provide a pre-filled direct mailto link to the official LAYA mailbox
    const emailLink = screen.getByRole("link", { name: /email pledge to info@laya.org.in/i });
    expect(emailLink).toHaveAttribute("href");
    const href = emailLink.getAttribute("href")!;
    expect(href).toContain("mailto:info@laya.org.in");
    expect(href).toContain("Aarav%20Sharma");
    expect(href).toContain("5000");

    // It allows editing details
    const editBtn = screen.getByRole("button", { name: /edit pledge details/i });
    fireEvent.click(editBtn);
    expect(screen.getByLabelText(/^Name/i)).toHaveValue("Aarav Sharma");
  });
});
