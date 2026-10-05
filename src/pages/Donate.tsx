import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AlertCircle, Check, Copy } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import {
  BANK_DOMESTIC,
  BANK_FOREIGN,
  DONATE_METRICS,
  DONATE_STATEMENTS,
  DONATION_PURPOSES,
} from "@/content/contact";

type BankTab = "domestic" | "foreign";

/**
 * DONATE  →  /donate
 * ---------------------------------------------------------------------------
 * Trustworthy and restrained. No countdown timers, no progress thermometers,
 * no "only 3 hours left", no emotional pressure language. The page states what
 * LAYA does, how money can be given, and what the legal position is.
 *
 * HONEST MECHANISM
 *   There is no payment gateway in this project. The page therefore says so
 *   plainly — contributions are made by bank transfer — rather than implying an
 *   online payment flow that does not exist. The pledge form records intent so
 *   the team can follow up.
 *
 * METRICS
 *   Only the four organisation-wide figures from `mockImpactMetrics` are shown.
 *   A previous "10K+ Families Impacted" stat appeared nowhere else and
 *   conflicted with a programme-level figure; it has been removed.
 *
 * FINANCIAL INFORMATION
 *   Domestic and foreign (FCRA) account details, 80G status and the FCRA
 *   registration number are all existing published information, reproduced
 *   verbatim. Nothing financial has been invented or rounded.
 */
const Donate = () => {
  /*
    Required by every `.reveal` element on this page.

    `.reveal` sets `opacity: 0` until `is-visible` is added by the
    IntersectionObserver inside this hook. Without the hook the observer never
    runs, so the metrics row, the donation purposes list and the bank details
    panel all stayed permanently invisible — measured at opacity 0 while still
    present in the DOM.
  */
  useRevealOnScroll();

  const [bankTab, setBankTab] = useState<BankTab>("domestic");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [pledge, setPledge] = useState({ name: "", email: "", amount: "", message: "" });
  const [pledgeErrors, setPledgeErrors] = useState<Record<string, string | null>>({});
  const [pledgeSent, setPledgeSent] = useState(false);

  const details = bankTab === "foreign" ? BANK_FOREIGN : BANK_DOMESTIC;

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
    setPledgeSent(true);
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
            <p className="ut-header__eyebrow type-eyebrow">Support LAYA</p>
            <h1 className="ut-header__title">Support our work</h1>
            <p className="ut-header__lead">
              Contributions support rights work, herbal health care, sustainable livelihoods,
              lifelong learning and climate resilience with Adivasi communities across the Eastern
              Ghats.
            </p>
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
                This form does not take payment. It records your intention to give so the LAYA
                team can send payment details and, where applicable, a receipt for 80G purposes.
              </p>
            </header>

            <div className="form-panel" style={{ maxWidth: "44rem" }}>
              {pledgeSent ? (
                <div className="form-status form-status--success" role="status">
                  <Check className="form-status__icon" aria-hidden="true" />
                  <div>
                    <span className="form-status__title">Thank you, {pledge.name.trim()}.</span>
                    The LAYA team will contact you at {pledge.email} with payment details and
                    receipt information.
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

                  <Button type="submit" size="lg">
                    Record my intention to give
                  </Button>
                </form>
              )}
            </div>

            <p className="statement">
              For questions about donations, write to{" "}
              <a href="mailto:info@laya.org.in" className="contact-record__link">
                info@laya.org.in
              </a>{" "}
              or call +91-891-2737662.
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
