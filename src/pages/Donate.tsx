import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AlertCircle, Check, Copy } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { EditorialLink } from "@/components/home/EditorialLink";
import { CONTACT_DETAILS } from "@/content/contact";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import {
  BANK_DOMESTIC,
  BANK_FOREIGN,
  DONATE_METRICS,
  DONATE_STATEMENTS,
  DONATION_PURPOSES,
} from "@/content/contact";

import { useWebsiteContent } from "@/context/ContentContext";
import EditableText from "@/components/admin/EditableText";

type BankTab = "domestic" | "foreign";

const Donate = () => {
  useRevealOnScroll();
  const { content } = useWebsiteContent();

  const [bankTab, setBankTab] = useState<BankTab>("domestic");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [pledge, setPledge] = useState({ name: "", email: "", amount: "", message: "" });
  const [pledgeErrors, setPledgeErrors] = useState<Record<string, string | null>>({});
  const [pledgeNoticeVisible, setPledgeNoticeVisible] = useState(false);

  const details =
    bankTab === "foreign"
      ? content.contact?.bankForeign || BANK_FOREIGN
      : content.contact?.bankDomestic || BANK_DOMESTIC;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string | null> = {
      name: !pledge.name.trim() ? "Please enter your name." : null,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(pledge.email.trim())
        ? "Please enter a valid email address."
        : null,
      amount:
        !pledge.amount || Number(pledge.amount) <= 0
          ? "Please enter a donation amount."
          : null,
    };
    setPledgeErrors(errs);
    if (Object.values(errs).some((v) => v !== null)) return;
    setPledgeNoticeVisible(true);
  };

  return (
    <>
      <Helmet>
        <title>Donate | LAYA</title>
        <meta
          name="description"
          content="Support LAYA's work with Adivasi communities in the Eastern Ghats. Bank transfer details, FCRA registration and 80G tax exemption information."
        />
        <link rel="canonical" href="https://laya.org.in/donate" />
      </Helmet>

      <MainLayout>
        <header className="ut-header">
          <div className="ut-header__inner">
            <p className="ut-header__eyebrow type-eyebrow text-[#755EB9] font-sans tracking-wider uppercase mb-2">
              <span className="font-normal">SUPPORT </span>
              <span className="font-bold">LAYA</span>
            </p>
            <EditableText
              path="donate.header.title"
              label="Donate Title"
              value={content.donate?.header?.title || "Support our work"}
              as="h1"
              className="ut-header__title"
            />
            <EditableText
              path="donate.header.lead"
              label="Donate Description"
              value={
                content.donate?.header?.lead ||
                "Contributions support rights work, herbal health care, sustainable livelihoods, lifelong learning and climate resilience with Adivasi communities across the Eastern Ghats."
              }
              as="p"
              multiline={true}
              className="ut-header__lead"
            />
          </div>
        </header>

        {/* ---- Verified figures ------------------------------------------ */}
        <section className="ut-band">
          <div className="ut-header__inner">
            <dl className="donate-metrics reveal">
              {DONATE_METRICS.map((m) => (
                <div key={m.label} className="donate-metric">
                  <dd className="donate-metric__value">{m.value}</dd>
                  <dt className="donate-metric__label">{m.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---- What contributions support --------------------------------- */}
        <section className="ut-band ut-band--warm">
          <div className="ut-header__inner">
            <header className="ut-heading">
              <p className="type-eyebrow">Where support goes</p>
              <h2 className="ut-heading__title">What the work covers</h2>
            </header>

            <div className="about-points reveal" style={{ maxWidth: "none" }}>
              {DONATION_PURPOSES.map((p) => (
                <div key={p.title} className="about-points__item">
                  <h3 className="about-points__title">
                    <Link to={p.to} className="laya-link--quiet">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="about-points__desc">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- How to give ------------------------------------------------ */}
        <section className="ut-band">
          <div className="ut-header__inner">
            <header className="ut-heading">
              <p className="type-eyebrow">How to give</p>
              <h2 className="ut-heading__title">Bank transfer</h2>
              <p className="ut-heading__intro">{DONATE_STATEMENTS.mechanism}</p>
            </header>

            <div className="reveal">
              <div className="bank-tabs" role="tablist" aria-label="Account type">
                <button
                  type="button"
                  role="tab"
                  aria-selected={bankTab === "domestic"}
                  className="bank-tab"
                  onClick={() => setBankTab("domestic")}
                >
                  Domestic
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={bankTab === "foreign"}
                  className="bank-tab"
                  onClick={() => setBankTab("foreign")}
                >
                  Foreign (FCRA)
                </button>
              </div>

              <div className="bank-list">
                {Object.entries(details).map(([label, value]) => {
                  const key = `${bankTab}-${label}`;
                  return (
                    <div key={label} className="bank-row">
                      <span className="bank-row__label">{label}</span>
                      <span className="bank-row__value">{value}</span>
                      <button
                        type="button"
                        className="copy-btn"
                        onClick={() => copyToClipboard(value, key)}
                        aria-label={
                          copiedField === key ? `${label} copied` : `Copy ${label}`
                        }
                      >
                        {copiedField === key ? (
                          <Check className="copy-btn__icon" aria-hidden="true" />
                        ) : (
                          <Copy className="copy-btn__icon" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Live region so the copied confirmation is announced. */}
              <p aria-live="polite" className="form-field__hint" style={{ marginTop: "var(--space-sm)" }}>
                {copiedField ? "Copied to clipboard." : ""}
              </p>
            </div>

            <p className="statement">{DONATE_STATEMENTS.legal}</p>
            <p className="statement">{DONATE_STATEMENTS.fcra}</p>

            <div className="prog-actions">
              <EditorialLink to={ROUTES.aboutFcraInformation}>FCRA information</EditorialLink>
              <EditorialLink to={ROUTES.aboutFinancialReports}>
                Foreign contribution reports
              </EditorialLink>
            </div>
          </div>
        </section>

        {/* ---- Record your intent ----------------------------------------- */}
        <section className="ut-band ut-band--sunken">
          <div className="ut-header__inner">
            <header className="ut-heading">
              <p className="type-eyebrow">Record your intention</p>
              <h2 className="ut-heading__title">Tell us about your contribution</h2>
              <p className="ut-heading__intro">
                Contributions are transferred directly using the bank account details above.
                Online pledge persistence is currently pending backend integration; you can prepare your pledge details below to email them directly to the LAYA office.
              </p>
            </header>

            <div className="form-panel" style={{ maxWidth: "44rem" }}>
              {pledgeNoticeVisible ? (
                <div className="form-status form-status--info" role="status" style={{ borderLeft: "4px solid #d97706", background: "#fdfbf7", padding: "1.25rem", borderRadius: "0" }}>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <AlertCircle className="form-status__icon" style={{ color: "#d97706", flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
                    <div>
                      <span className="form-status__title" style={{ display: "block", fontWeight: 600, marginBottom: "0.375rem" }}>
                        Online pledge recording is pending backend integration
                      </span>
                      <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.925rem" }}>
                        Thank you, <strong>{pledge.name.trim()}</strong>. Because automated database pledge storage is not yet active on this site, your pledge of <strong>₹{Number(pledge.amount).toLocaleString("en-IN")}</strong> was not automatically transmitted.
                      </p>
                      <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.925rem" }}>
                        To ensure your pledge reaches the LAYA finance team directly, please send your details via email or use the official bank transfer details above:
                      </p>
                      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
                        <a
                          href={`mailto:${CONTACT_DETAILS.email}?subject=Donation%20Pledge%20from%20${encodeURIComponent(pledge.name.trim())}&body=Name:%20${encodeURIComponent(pledge.name.trim())}%0AEmail:%20${encodeURIComponent(pledge.email.trim())}%0AIntended%20Amount:%20Rs.%20${encodeURIComponent(pledge.amount)}%0AMessage:%20${encodeURIComponent(pledge.message || "N/A")}`}
                          className="inline-flex items-center gap-2 bg-[#6E5BA8] hover:bg-[#5D4B94] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-2.5 transition-colors no-underline shadow-none"
                        >
                          Email pledge to {CONTACT_DETAILS.email}
                        </a>
                        <button
                          type="button"
                          onClick={() => setPledgeNoticeVisible(false)}
                          style={{ background: "none", border: "1px solid #ccc", padding: "0.5rem 1rem", fontSize: "0.875rem", borderRadius: "0", cursor: "pointer" }}
                        >
                          Edit pledge details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePledgeSubmit} noValidate>
                  <div className="form-field">
                    <input
                      id="pledge-name"
                      type="text"
                      autoComplete="name"
                      placeholder="E.g., Jane Doe"
                      value={pledge.name}
                      onChange={(e) => setPledge({ ...pledge, name: e.target.value })}
                      aria-invalid={pledgeErrors.name ? true : undefined}
                      aria-describedby={pledgeErrors.name ? "pledge-name-error" : undefined}
                      className={`form-field__input ${
                        pledgeErrors.name ? "form-field__input--invalid" : ""
                      }`}
                    />
                    <label htmlFor="pledge-name" className="form-field__label">
                      Name
                    </label>
                    {pledgeErrors.name && (
                      <p className="form-field__error" id="pledge-name-error" role="alert">
                        <AlertCircle className="form-field__error-icon" aria-hidden="true" />
                        <span>{pledgeErrors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <input
                      id="pledge-email"
                      type="email"
                      autoComplete="email"
                      placeholder="yourname@example.com"
                      value={pledge.email}
                      onChange={(e) => setPledge({ ...pledge, email: e.target.value })}
                      aria-invalid={pledgeErrors.email ? true : undefined}
                      aria-describedby={pledgeErrors.email ? "pledge-email-error" : undefined}
                      className={`form-field__input ${
                        pledgeErrors.email ? "form-field__input--invalid" : ""
                      }`}
                    />
                    <label htmlFor="pledge-email" className="form-field__label">
                      Email
                    </label>
                    {pledgeErrors.email && (
                      <p className="form-field__error" id="pledge-email-error" role="alert">
                        <AlertCircle className="form-field__error-icon" aria-hidden="true" />
                        <span>{pledgeErrors.email}</span>
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <input
                      id="pledge-amount"
                      type="number"
                      min={1}
                      placeholder="e.g. 5000"
                      value={pledge.amount}
                      onChange={(e) => setPledge({ ...pledge, amount: e.target.value })}
                      aria-invalid={pledgeErrors.amount ? true : undefined}
                      aria-describedby={pledgeErrors.amount ? "pledge-amount-error" : undefined}
                      className={`form-field__input ${
                        pledgeErrors.amount ? "form-field__input--invalid" : ""
                      }`}
                    />
                    <label htmlFor="pledge-amount" className="form-field__label">
                      Intended amount (₹)
                    </label>
                    {pledgeErrors.amount && (
                      <p className="form-field__error" id="pledge-amount-error" role="alert">
                        <AlertCircle className="form-field__error-icon" aria-hidden="true" />
                        <span>{pledgeErrors.amount}</span>
                      </p>
                    )}
                    <span className="form-field__hint">
                      Enter an amount you intend to transfer. Nothing is charged here.
                    </span>
                  </div>

                  <div className="form-field">
                    <textarea
                      id="pledge-message"
                      rows={3}
                      placeholder="Tell us what inspired you to contribute..."
                      value={pledge.message}
                      onChange={(e) => setPledge({ ...pledge, message: e.target.value })}
                      className="form-field__textarea"
                    />
                    <label htmlFor="pledge-message" className="form-field__label">
                      Message <span className="form-field__optional">(optional)</span>
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full whitespace-normal h-auto py-4">
                    Record my intention to give
                  </Button>
                </form>
              )}
            </div>

            <p className="statement">
              For questions about donations, write to{" "}
              <a href={CONTACT_DETAILS.emailHref} className="contact-record__link">
                {CONTACT_DETAILS.email}
              </a>{" "}
              or call {CONTACT_DETAILS.phone}.
            </p>

            <div className="prog-actions">
              <EditorialLink to={ROUTES.contact}>Contact the office</EditorialLink>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Donate;
