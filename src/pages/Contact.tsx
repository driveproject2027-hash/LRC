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
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                              <rect width="4" height="12" x="2" y="9"/>
                              <circle cx="4" cy="4" r="2"/>
                            </svg>
                          )}
                          {s.label === "YouTube" && (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2.5 7.1c.3-1.1 1.2-2 2.3-2.3C7.4 4.3 12 4.3 12 4.3s4.6 0 7.2.5c1.1.3 2 1.2 2.3 2.3.5 2.6.5 7.9.5 7.9s0 5.3-.5 7.9c-.3 1.1-1.2 2-2.3 2.3-2.6.5-7.2.5-7.2.5s-4.6 0-7.2-.5c-1.1-.3-2-1.2-2.3-2.3-.5-2.6-.5-7.9-.5-7.9s0-5.3.5-7.9z"/>
                              <path d="m10 15 5-3-5-3v6z"/>
                            </svg>
                          )}
                          {s.label === "WhatsApp" && (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
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
