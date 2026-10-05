import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { useContactForm } from "@/hooks/use-contact-form";
import {
  CONTACT_DETAILS,
  CONTACT_HEADING,
  SOCIAL_LINKS,
} from "@/content/contact";

/**
 * CONTACT  →  /contact
 * ---------------------------------------------------------------------------
 * Institutional contact page on the Phase 1 design system.
 *
 * VALIDATION
 *   Real client-side validation with per-field messages, not just HTML
 *   `required`. Each invalid field gets a visible border AND a text message —
 *   never colour alone — and `aria-invalid` plus `aria-describedby` so the
 *   error is announced, not just seen.
 *
 * STATES
 *   - idle, submitting, success, and error are all explicit.
 *   - The server error from `useContactForm` is surfaced verbatim.
 *   - On success the form is replaced by a confirmation block rather than a
 *     toast alone, so the outcome survives a page re-read.
 *
 * PRIVACY
 *   Only the office address, a general office line and a general mailbox are
 *   published. No individual staff member's direct contact details are
 *   exposed, and the form does not ask for anything beyond what is needed to
 *   reply.
 *
 * NOT INCLUDED
 *   No map (none exists in the repository) and no social links (no accounts
 *   are recorded). See docs/phase-9-audit.md.
 */
const Contact = () => {
  const { formData, updateField, submit, isSubmitting, submitError } =
    useContactForm();
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  /** Field-level validation. Returns a message, or null when valid. */
  const validate = (field: string, value: string): string | null => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Please enter your name.";
        if (value.trim().length < 2)
          return "Please enter at least 2 characters.";
        return null;
      case "email":
        if (!value.trim()) return "Please enter your email address.";
        // Deliberately permissive: reject only clearly malformed input rather
        // than imposing a narrow pattern on valid addresses.
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()))
          return "Please enter a valid email address, for example name@example.com.";
        return null;
      case "subject":
        if (!value.trim()) return "Please enter a subject.";
        return null;
      case "message":
        if (!value.trim()) return "Please enter a message.";
        if (value.trim().length < 10)
          return "Please provide a little more detail.";
        return null;
      default:
        return null;
    }
  };

  const errors: Record<string, string | null> = {
    name: validate("name", formData.name),
    email: validate("email", formData.email),
    subject: validate("subject", formData.subject),
    message: validate("message", formData.message),
  };

  const showError = (field: string) => (touched[field] ? errors[field] : null);
  const hasErrors = Object.values(errors).some((e) => e !== null);

  const handleBlur = (field: string) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Reveal every message on submit, even for untouched fields.
    setTouched({ name: true, email: true, subject: true, message: true });
    if (hasErrors) return;
    if (await submit()) setSubmitted(true);
  };

  /** Renders a field's error consistently. */
  const FieldError = ({ field }: { field: string }) => {
    const msg = showError(field);
    if (!msg) return null;
    return (
      <p className="form-field__error" id={`${field}-error`} role="alert">
        <AlertCircle className="form-field__error-icon" aria-hidden="true" />
        <span>{msg}</span>
      </p>
    );
  };

  return (
    <>
      <Helmet>
        <title>Contact | LAYA</title>
        <meta
          name="description"
          content="Contact LAYA — Resource Center for Adivasis. Address, telephone, email and enquiry form."
        />
        <link rel="canonical" href="https://laya.org.in/contact" />
      </Helmet>

      <MainLayout>
        <header className="ut-header">
          <div className="ut-header__inner">
            <p className="ut-header__eyebrow type-eyebrow">
              {CONTACT_HEADING.eyebrow}
            </p>
            <h1 className="ut-header__title">{CONTACT_HEADING.title}</h1>
            <p className="ut-header__lead">{CONTACT_HEADING.lead}</p>
          </div>
        </header>

        <section className="ut-band">
          <div className="ut-header__inner contact-grid">
            {/* ---- Details ------------------------------------------------- */}
            <div>
              <h2 className="ut-heading__title" style={{ marginTop: 0 }}>
                Office
              </h2>

              <dl className="contact-records">
                <div className="contact-record">
                  <dt className="contact-record__label">Address</dt>
                  <dd className="contact-record__value">
                    {CONTACT_DETAILS.address}
                  </dd>
                </div>

                <div className="contact-record">
                  <dt className="contact-record__label">Telephone</dt>
                  <dd className="contact-record__value">
                    <a
                      href={CONTACT_DETAILS.phoneHref}
                      className="contact-record__link"
                    >
                      {CONTACT_DETAILS.phone}
                    </a>
                  </dd>
                </div>

                <div className="contact-record">
                  <dt className="contact-record__label">Email</dt>
                  <dd className="contact-record__value">
                    <a
                      href={CONTACT_DETAILS.emailHref}
                      className="contact-record__link"
                    >
                      {CONTACT_DETAILS.email}
                    </a>
                  </dd>
                </div>

                <div className="contact-record">
                  <dt className="contact-record__label">Website</dt>
                  <dd className="contact-record__value">
                    <a
                      href={CONTACT_DETAILS.websiteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-record__link"
                    >
                      {CONTACT_DETAILS.website}
                    </a>
                  </dd>
                </div>

                {/* Social links render only if verified accounts exist. */}
                {SOCIAL_LINKS.length > 0 && (
                  <div className="contact-record">
                    <dt className="contact-record__label">Social</dt>
                    <dd className="contact-record__value">
                      {SOCIAL_LINKS.map((s) => (
                        <a
                          key={s.href}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-record__link"
                          style={{ marginRight: "1.25rem", display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}
                        >
                          {s.label === "LinkedIn" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <path fill="#0a66c2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          )}
                          {s.label === "YouTube" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <path fill="#ff0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.547 12 3.547 12 3.547s-7.505 0-9.377.503A3.014 3.014 0 0 0 .501 6.186C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.503 9.377.503 9.377.503s7.505 0 9.377-.503a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                              <path fill="#ffffff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          )}
                          {s.label === "WhatsApp" && (
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path fill="#25D366" d="M12.013 2.006c-5.498 0-9.972 4.475-9.972 9.973 0 1.764.464 3.486 1.346 5.006L2.001 22l5.142-1.348c1.479.805 3.149 1.233 4.87 1.233 5.498 0 9.973-4.475 9.973-9.973 0-5.498-4.475-9.973-9.973-9.973z"/>
                              <path fill="#FFFFFF" d="M17.483 14.156c-.3-.15-1.776-.877-2.052-.977-.276-.1-.477-.15-.678.15-.201.3-.776.977-.951 1.177-.176.2-.352.226-.652.076-2.046-1.026-3.551-2.42-4.148-3.447-.128-.217.135-.205.405-.745.086-.171.043-.321-.032-.471-.075-.15-.678-1.637-.928-2.24-.243-.585-.49-.505-.678-.515-.176-.009-.377-.01-.578-.01-.2 0-.527.075-.802.375-.276.3-1.054 1.03-1.054 2.511 0 1.482 1.079 2.913 1.229 3.113.151.201 2.122 3.242 5.142 4.543 1.836.79 2.457.734 2.909.658.58-.098 1.776-.726 2.027-1.428.251-.702.251-1.303.176-1.428-.076-.126-.277-.201-.578-.351z"/>
                            </svg>
                          )}
                          {s.label}
                        </a>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>

              <p className="statement" style={{ marginTop: "var(--space-lg)" }}>
                For enquiries about LAYA's programmes, publications or
                partnerships, write to the office address above or use the form.
                For donation queries, the{" "}
                <a href="/donate" className="contact-record__link">
                  donate page
                </a>{" "}
                lists the bank accounts and the documents a donor needs.
              </p>
            </div>

            {/* ---- Form ---------------------------------------------------- */}
            <div className="form-panel">
              <h2
                className="ut-heading__title"
                style={{ marginTop: 0, fontSize: "var(--text-h3)" }}
              >
                Send a message
              </h2>

              {submitted ? (
                <div className="form-status form-status--success" role="status">
                  <CheckCircle2
                    className="form-status__icon"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="form-status__title">Message sent</span>
                    Thank you for reaching out. The LAYA team will reply to your
                    email address.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Server-side failure reported by the contact hook. */}
                  {submitError && (
                    <div
                      className="form-status form-status--error"
                      role="alert"
                    >
                      <AlertCircle
                        className="form-status__icon"
                        aria-hidden="true"
                      />
                      <div>
                        <span className="form-status__title">
                          Message not sent
                        </span>
                        {submitError}
                      </div>
                    </div>
                  )}

                  <div className="form-field relative">
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      aria-invalid={showError("name") ? true : undefined}
                      aria-describedby={
                        showError("name") ? "name-error" : undefined
                      }
                      className={`form-field__input ${
                        showError("name") ? "form-field__input--invalid" : ""
                      }`}
                    />
                    <label htmlFor="contact-name" className="form-field__label">
                      Name
                    </label>
                    <FieldError field="name" />
                  </div>

                  <div className="form-field relative">
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder=" "
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      aria-invalid={showError("email") ? true : undefined}
                      aria-describedby={
                        showError("email") ? "email-error" : undefined
                      }
                      className={`form-field__input ${
                        showError("email") ? "form-field__input--invalid" : ""
                      }`}
                    />
                    <label
                      htmlFor="contact-email"
                      className="form-field__label"
                    >
                      Email
                    </label>
                    <FieldError field="email" />
                  </div>

                  <div className="form-field relative">
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder=" "
                      value={formData.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                      onBlur={() => handleBlur("subject")}
                      aria-invalid={showError("subject") ? true : undefined}
                      aria-describedby={
                        showError("subject") ? "subject-error" : undefined
                      }
                      className={`form-field__input ${
                        showError("subject") ? "form-field__input--invalid" : ""
                      }`}
                    />
                    <label
                      htmlFor="contact-subject"
                      className="form-field__label"
                    >
                      Subject
                    </label>
                    <FieldError field="subject" />
                  </div>

                  <div className="form-field relative">
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder=" "
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                      aria-invalid={showError("message") ? true : undefined}
                      aria-describedby={
                        showError("message") ? "message-error" : undefined
                      }
                      className={`form-field__textarea ${
                        showError("message")
                          ? "form-field__textarea--invalid"
                          : ""
                      }`}
                    />
                    <label
                      htmlFor="contact-message"
                      className="form-field__label"
                    >
                      Message
                    </label>
                    <FieldError field="message" />
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {isSubmitting ? "Sending…" : "Send message"}
                  </Button>

                  <p
                    className="form-field__hint"
                    style={{ marginTop: "var(--space-sm)" }}
                  >
                    All fields are required. LAYA uses the details you provide
                    only to reply to your enquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Contact;
