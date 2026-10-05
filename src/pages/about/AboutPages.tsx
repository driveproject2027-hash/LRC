import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Download, ExternalLink, FileText } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { EditorialLink } from "@/components/home/EditorialLink";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { ROUTES } from "@/lib/routes";
import { FINANCIAL_REPORTS } from "@/content/resources";
import {
  PARTNERS,
  PARTNERS_HEADING,
  TRANSPARENCY_DOCUMENTS,
  TRANSPARENCY_HEADING,
} from "@/content/trust";
import {
  ABOUT_HERO_LABELS,
  fcraInformation,
  financialReports,
  governance,
  supportPartners,
  wayWeWork,
  whereWeWork,
} from "@/content/about";

const SectionHeading = ({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) => (
 <header className="about-heading">
    <p className="type-eyebrow">{eyebrow}</p>
    <h2 className="about-heading__title">{title}</h2>
    {intro && <p className="about-heading__intro">{intro}</p>}
 </header>
);

const PageHeader = ({
  eyebrow,
  title,
  subtitle,
  meta,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  meta?: Array<{ label: string; value: string }>;
}) => (
 <header className="about-header">
    <div className="about-header__inner">
      <p className="about-header__eyebrow type-eyebrow">{eyebrow}</p>
      <h1 className="about-header__title">{title}</h1>
      <p className="about-header__subtitle">{subtitle}</p>
      {meta && meta.length > 0 && (
        <dl className="about-header__meta">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="type-label">{m.label}</dt>
              <dd className="type-meta" style={{ margin: 0 }}>
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
 </header>
);

/* ==========================================================================
   WAY WE WORK  →  /about/way-we-work
   ========================================================================== */
export const WayWeWork = () => {
  useRevealOnScroll();
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>How We Work | LAYA</title>
        <meta name="description" content={wayWeWork.description} />
        <link rel="canonical" href="https://laya.org.in/about/way-we-work" />
      </Helmet>
      <MainLayout>
        <PageHeader
          eyebrow={ABOUT_HERO_LABELS[pathname]}
          title={wayWeWork.title}
          subtitle={wayWeWork.subtitle}
        />

        <section className="about-band about-band--warm">
          <div className="container-page">
            <SectionHeading
              eyebrow="Overview"
              title="Management, systems and monitoring"
              intro={wayWeWork.description}
            />
          </div>
        </section>

        <section className="about-band">
          <div className="container-page">
            {wayWeWork.sections.map((section, i) => (
              <div
                key={section.heading}
                className="reveal"
                style={{ marginBottom: "var(--space-3xl)" }}
              >
                <SectionHeading eyebrow={`0${i + 1}`} title={section.heading} />
                <div className="about-split">
                  <div>
                    <p className="about-prose">{section.paragraph}</p>
                    {section.bullets && (
                      <ul
                        className="about-points"
                        style={{ listStyle: "none", padding: 0, marginTop: "var(--space-md)" }}
                      >
                        {section.bullets.map((b) => (
                          <li key={b} className="about-points__item">
                            <p className="about-points__desc">{b}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {section.image && (
                    <figure>
                      <div className="about-media">
                        <img src={section.image} alt="" loading="lazy" decoding="async" />
                      </div>
                    </figure>
                  )}
                </div>
              </div>
            ))}

            <div className="about-note">
              {wayWeWork.points.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="about-actions">
              <EditorialLink to={ROUTES.aboutGovernance}>Governance</EditorialLink>
              <EditorialLink to={ROUTES.aboutWhereWeWork}>Where we work</EditorialLink>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

/* ==========================================================================
   WHERE WE WORK  →  /about/where-we-work
   ========================================================================== */
export const WhereWeWork = () => {
  useRevealOnScroll();
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>Where We Work | LAYA</title>
        <meta name="description" content={whereWeWork.description} />
        <link rel="canonical" href="https://laya.org.in/about/where-we-work" />
      </Helmet>
      <MainLayout>
        <PageHeader
          eyebrow={ABOUT_HERO_LABELS[pathname]}
          title={whereWeWork.title}
          subtitle={whereWeWork.subtitle}
          meta={[
            { label: "Offices", value: `${whereWeWork.locations.length} locations` },
            { label: "Districts", value: `${whereWeWork.coverage.districts.length} covered` },
            { label: "Region", value: "Eastern Ghats" },
          ]}
        />

        <section className="about-band">
          <div className="container-page">
            <SectionHeading
              eyebrow="Our locations"
              title="Resource centre and field units"
              intro={whereWeWork.description}
            />
            <div className="reveal" style={{ borderTop: "1px solid var(--border-default)" }}>
              {whereWeWork.locations.map((loc) => (
                <div key={loc.name} className="location-record">
                  <div>
                    <h3 className="location-record__name">{loc.name}</h3>
                    <span
                      className={`location-record__type ${
                        loc.type === "Headquarters" ? "location-record__type--hq" : ""
                      }`}
                    >
                      {loc.type}
                    </span>
                  </div>
                  <div>
                    <p className="location-record__address">{loc.address}</p>
                    <span className="location-record__pincode">
                      {loc.district} · {loc.pincode}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-band about-band--warm">
          <div className="container-page about-split reveal">
            <div>
              <SectionHeading
                eyebrow="Coverage"
                title={whereWeWork.coverage.title}
                intro={whereWeWork.coverage.description}
              />
              <div className="district-tags">
                {whereWeWork.coverage.districts.map((d) => (
                  <span key={d} className="district-tag">
                    {d}
                  </span>
                ))}
              </div>
              <div className="about-note" style={{ marginTop: "var(--space-lg)" }}>
                {whereWeWork.points.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <figure>
              <div className="about-media">
                <img
                  src={whereWeWork.image}
                  alt="Adivasi community members in the Eastern Ghats"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>
          </div>
        </section>

        <section className="about-band">
          <div className="container-page">
            <div className="about-actions">
              <EditorialLink to={ROUTES.programs}>All programmes</EditorialLink>
              <EditorialLink to={ROUTES.contact}>Contact us</EditorialLink>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

/* ==========================================================================
   FINANCIAL REPORTS  →  /about/financial-reports
   --------------------------------------------------------------------------
   Rebuilt on the off-white canvas per the Phase 6 brief. Previously a generic
   document grid floating on the purple/blue background.

   Now: clear heading, supporting explanation, a year filter, and a clean
   document list in which each report shows its FY label, title, description and
   two explicit actions (View PDF / Download).

   Year filtering is legitimate HERE, unlike the wider Resource Centre: these
   six documents carry real financial years taken from their source file names.
   ========================================================================== */
export const FinancialReports = () => {
  useRevealOnScroll();
  const { pathname } = useLocation();
  const [activeYear, setActiveYear] = useState<string>("all");

  const visible = useMemo(
    () =>
      activeYear === "all"
        ? FINANCIAL_REPORTS
        : FINANCIAL_REPORTS.filter((r) => r.year === activeYear),
    [activeYear],
  );

  return (
    <>
      <Helmet>
        <title>Foreign Contribution Reports | LAYA</title>
        <meta name="description" content={financialReports.description} />
        <link rel="canonical" href="https://laya.org.in/about/financial-reports" />
      </Helmet>
      <MainLayout>
        <header className="res-header">
          <div className="res-header__inner">
            <p className="res-header__eyebrow type-eyebrow">
              Transparency &amp; accountability
            </p>
            <h1 className="res-header__title">Foreign Contribution Reports</h1>
            <p className="res-header__lead">
              LAYA publishes an annual foreign contribution report in compliance with FCRA
              requirements, ensuring public accountability in all financial operations. Each
              document below is the disclosure for that financial year.
            </p>

            <dl className="res-header__stats">
              <div>
                <dd className="res-stat__value">{FINANCIAL_REPORTS.length}</dd>
                <dt className="res-stat__label">Annual reports</dt>
              </div>
              <div>
                <dd className="res-stat__value">2019–20</dd>
                <dt className="res-stat__label">Earliest report</dt>
              </div>
              <div>
                <dd className="res-stat__value">FCRA</dd>
                <dt className="res-stat__label">Compliant</dt>
              </div>
            </dl>
          </div>
        </header>

        {/* ---- Year filter ---------------------------------------------- */}
        <div className="res-filters">
          <div className="res-filters__inner">
            <div className="res-filters__row">
              <span className="res-filters__label" id="fy-filter-label">
                Financial year
              </span>
              <div
                role="group"
                aria-labelledby="fy-filter-label"
                className="res-filters__row"
                style={{ gap: "0.375rem" }}
              >
                <button
                  type="button"
                  onClick={() => setActiveYear("all")}
                  aria-pressed={activeYear === "all"}
                  className={`res-chip ${activeYear === "all" ? "res-chip--active" : ""}`}
                >
                  All years
                  <span className="res-chip__count">{FINANCIAL_REPORTS.length}</span>
                </button>
                {FINANCIAL_REPORTS.map((r) => (
                  <button
                    key={r.year}
                    type="button"
                    onClick={() => setActiveYear(r.year)}
                    aria-pressed={activeYear === r.year}
                    className={`res-chip ${activeYear === r.year ? "res-chip--active" : ""}`}
                  >
                    {r.fy}
                  </button>
                ))}
              </div>
            </div>

            <p className="res-filters__result">
              Showing <strong>{visible.length}</strong> of {FINANCIAL_REPORTS.length} reports
            </p>
          </div>
        </div>

        {/* ---- Document list -------------------------------------------- */}
        <section className="res-band" aria-live="polite">
          <div className="res-header__inner">
            {visible.length === 0 ? (
              <div className="res-empty">
                <p className="res-empty__title">No reports for that year</p>
                <p className="res-empty__body">Choose a different financial year.</p>
                <button
                  type="button"
                  onClick={() => setActiveYear("all")}
                  className="res-chip res-chip--active"
                >
                  Show all years
                </button>
              </div>
            ) : (
              <div className="fy-ledger reveal">
                {visible.map((report) => (
                  <div key={report.year} className="fy-row">
                    <span className="fy-row__year">{report.fy}</span>

                    <span className="fy-row__title">
                      <span
                        className="doc-icon"
                        aria-hidden="true"
                        style={{ marginInlineEnd: "0.5rem", verticalAlign: "middle" }}
                      >
                        <FileText className="doc-icon__glyph" />
                      </span>
                      {report.label}
                    </span>

                    <span className="fy-row__desc">{report.description}</span>

                    <span className="fy-row__actions">
                      <a
                        href={report.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="res-action res-action--primary"
                        aria-label={`View ${report.label} for ${report.fy} as PDF (opens in a new tab)`}
                      >
                        <ExternalLink className="res-action__icon" aria-hidden="true" />
                        View PDF
                      </a>
                      <a
                        href={report.url}
                        download
                        className="res-action"
                        aria-label={`Download ${report.label} for ${report.fy}`}
                      >
                        <Download className="res-action__icon" aria-hidden="true" />
                        Download
                      </a>
                    </span>
                  </div>
                ))}
              </div>
            )}

            <p className="type-small" style={{ marginTop: "var(--space-lg)", color: "var(--text-secondary)" }}>
              These disclosures align with LAYA's transparency and governance commitments under
              the Foreign Contribution Regulation Act (FCRA).
            </p>

            <div className="prog-actions">
              <EditorialLink to={ROUTES.aboutFcraInformation}>FCRA information</EditorialLink>
              <EditorialLink to={ROUTES.publications}>Resource Centre</EditorialLink>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

/* ==========================================================================
   FCRA INFORMATION  →  /about/fcra-information
   ========================================================================== */
export const FcraInformation = () => {
  useRevealOnScroll();
  const { pathname } = useLocation();
  const { fcraRegistration, fcraBank, quarterlyReceipts } = fcraInformation;

  return (
    <>
      <Helmet>
        <title>FCRA Information | LAYA</title>
        <meta name="description" content={fcraInformation.description} />
        <link rel="canonical" href="https://laya.org.in/about/fcra-information" />
      </Helmet>
      <MainLayout>
        <PageHeader
          eyebrow={ABOUT_HERO_LABELS[pathname]}
          title={fcraInformation.title}
          subtitle={fcraInformation.subtitle}
          meta={[
            { label: "Registration", value: fcraRegistration.registrationNumber },
            { label: "Registered", value: fcraRegistration.dateOfRegistration },
            { label: "Renewed", value: fcraRegistration.renewalDate },
          ]}
        />

        <section className="about-band">
          <div className="container-page">
            <SectionHeading
              eyebrow="Registration"
              title="FCRA registration and designated bank account"
              intro={fcraInformation.description}
            />

            <div className="record-list record-list--two reveal">
              <div>
                <h3 className="record-list__term">Registration Number</h3>
                <p className="record-list__value record-list__value--mono">
                  {fcraRegistration.registrationNumber}
                </p>
              </div>
              <div>
                <h3 className="record-list__term">Date of Registration</h3>
                <p className="record-list__value">{fcraRegistration.dateOfRegistration}</p>
              </div>
              <div>
                <h3 className="record-list__term">Renewed for 5 years w.e.f.</h3>
                <p className="record-list__value">{fcraRegistration.renewalDate}</p>
              </div>
              <div>
                <h3 className="record-list__term">Branch Code</h3>
                <p className="record-list__value record-list__value--mono">{fcraBank.branchCode}</p>
              </div>
              <div>
                <h3 className="record-list__term">Name of the Bank</h3>
                <p className="record-list__value">{fcraBank.name}</p>
              </div>
              <div>
                <h3 className="record-list__term">Address</h3>
                <p className="record-list__value" style={{ fontSize: "var(--text-sm)" }}>
                  {fcraBank.address}
                </p>
              </div>
            </div>

            <div className="about-actions">
              <Button asChild>
                <Link to={fcraInformation.financialStatementsLink}>
                  Financial Statements
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <p className="type-meta" style={{ marginTop: "var(--space-sm)" }}>
              Under Rule 13(a) of FCRA Amendment Rules, 2015
            </p>
          </div>
        </section>

        <section className="about-band about-band--sunken">
          <div className="container-page">
            <SectionHeading
              eyebrow="Receipts"
              title="Quarter-wise receipts"
              intro="Information on receipts into LAYA's FCRA Account as per Rule 13(b) of FCRA Amendment Rules, 2015"
            />

            <div className="receipts reveal">
              {quarterlyReceipts.map((yearData) => (
                <div key={yearData.year}>
                  <h3 className="receipts__year">{yearData.year}</h3>
                  {yearData.quarters.map((quarter, qi) => (
                    <details key={quarter.name} className="receipts__quarter" open={qi === 0}>
                      <summary className="receipts__summary">
                        <span>
                          <span className="receipts__summary-name">{quarter.name}</span>
                          <span className="receipts__summary-count">
                            {quarter.receipts.length} receipt
                            {quarter.receipts.length !== 1 ? "s" : ""}
                          </span>
                        </span>
                        <span className="receipts__toggle" aria-hidden="true">
                          Details
                        </span>
                      </summary>
                      <div className="laya-table-scroll">
                        <table className="receipts__table">
                          <caption className="sr-only">
                            {quarter.name} — foreign contribution receipts
                          </caption>
                          <thead>
                            <tr>
                              <th scope="col">Received From</th>
                              <th scope="col" style={{ textAlign: "right" }}>
                                Amount (₹)
                              </th>
                              <th scope="col" style={{ textAlign: "right" }}>
                                Date of Receipt
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {quarter.receipts.map((receipt, ri) => (
                              <tr key={`${receipt.donor}-${receipt.date}-${ri}`}>
                                <td>{receipt.donor}</td>
                                <td className="receipts__amount">{receipt.amount}</td>
                                <td className="receipts__date">{receipt.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </details>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

/* ==========================================================================
   GOVERNANCE  →  /about/governance
   ========================================================================== */
export const Governance = () => {
  useRevealOnScroll();
  const { pathname } = useLocation();

  /*
    Two separate numbers, deliberately kept apart:

      statedCount — what LAYA's own description says the General Body comprises.
                    This is the ORGANISATIONAL FACT and is what the page reports.
      namedCount  — how many members are actually listed in the source data.

    Widened to `number` so the guard below is a genuine runtime comparison. As
    literal types TS can prove `14 !== 16` and flags it as an unintentional
    comparison, which would also silently break the check once the listing is
    completed.
  */
  const statedCount: number = governance.statedComposition.generalBodyCount;
  const namedCount: number = governance.generalBody.length;

  return (
    <>
      <Helmet>
        <title>Governance | LAYA</title>
        <meta name="description" content={governance.description} />
        <link rel="canonical" href="https://laya.org.in/about/governance" />
      </Helmet>
      <MainLayout>
        <PageHeader
          eyebrow={ABOUT_HERO_LABELS[pathname]}
          title={governance.title}
          subtitle={governance.subtitle}
          /*
            FACT ROW — uses the ORGANISATION'S STATED figures, never array
            lengths.

            The source description says "a General Body comprising 16 General
            Body Members … and a Board of Management (BoM) comprising 7 elected
            members", while the published listings contain 14 and 6 records.
            Counting the arrays here would put a number on the page that
            contradicts the organisation's own sentence directly beneath it.

            Meetings are shown as two separate rows (BoM quarterly, General Body
            annually) because they are two distinct bodies with different
            cadences — collapsing them into one "BoM quarterly · GB annually"
            cell blurred that.

            See the note on `statedComposition` in src/content/about.ts.
          */
          meta={[
            {
              label: "General Body",
              value: `${governance.statedComposition.generalBodyCount} members`,
            },
            {
              label: "Board of Management",
              value: `${governance.statedComposition.boardOfManagementCount} elected members`,
            },
            { label: "Meetings", value: "BoM quarterly" },
            { label: "General Body", value: "Annually" },
          ]}
        />

        <section className="about-band">
          <div className="container-page">
            <SectionHeading
              eyebrow="Structure"
              title="How LAYA is governed"
              intro={governance.description}
            />
            <div className="about-points reveal">
              {governance.governanceProcesses.map((p) => (
                <div key={p} className="about-points__item">
                  <p className="about-points__desc">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-band about-band--warm">
          <div className="container-page">
            <SectionHeading
              eyebrow="Board of Management"
              title="Elected office bearers"
              intro="LAYA's Board of Management comprises 7 elected members. The BoM meets four times a year, and one meeting each year includes field exposure and critical reflection on programme activities."
            />
            <div className="roster reveal">
              {governance.boardOfManagement.map((member) => (
                <div key={member.name} className="roster__row">
                  <span className="roster__name">
                    {member.name}
                    <span className="roster__office">{member.role}</span>
                  </span>
                  <span className="roster__role">
                    {governance.generalBody.find((g) => g.name === member.name)?.role ?? ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-band">
          <div className="container-page">
            <SectionHeading
              eyebrow="General Body"
              title="General Body members"
              intro={`LAYA's General Body comprises ${statedCount} members from academic and development practice. The General Body meets once a year.`}
            />
            <div className="roster reveal">
              {governance.generalBody.map((member) => (
                <div key={member.name} className="roster__row">
                  <span className="roster__name">{member.name}</span>
                  <span className="roster__role">{member.role}</span>
                </div>
              ))}
            </div>

            {/*
              Surfaced rather than hidden: the source describes a 16-member
              General Body while listing 14 named members. Rather than inventing
              two names, the discrepancy is stated so it is resolved by LAYA, not              silently by this page.

              Both sides are widened to `number` deliberately. As literal types
              TS can prove `14 !== 16`, which makes the guard look like dead code
              and would silently stop working the moment the listing reaches 16.
              Comparing two numbers keeps it a real runtime check that retires
              itself once the listing is complete.
            */}
            {namedCount !== statedCount && (
              <p className="type-meta" style={{ marginTop: "var(--space-md)" }}>
                {namedCount} members are currently named. LAYA's General Body is stated as
                comprising {statedCount} members.
              </p>
            )}
          </div>
        </section>

        {/* ---- Transparency ----------------------------------------------
            Every entry resolves to something that actually exists — a real PDF
            or a real internal page. No policy documents, audit reports,
            certificates or annual reports are listed, because none are held in
            this repository. */}
        <section className="trust-band trust-band--sunken">
          <div className="trust-header__inner">
            <header className="trust-heading">
              <p className="type-eyebrow">{TRANSPARENCY_HEADING.eyebrow}</p>
              <h2 className="trust-heading__title">{TRANSPARENCY_HEADING.title}</h2>
              <p className="trust-heading__intro">{TRANSPARENCY_HEADING.lead}</p>
            </header>

            {/* Registration facts, stated plainly. */}
            <dl className="reg-list reg-list--two reveal" style={{ marginBottom: "var(--space-2xl)" }}>
              <div>
                <dt className="reg-list__term">FCRA registration number</dt>
                <dd className="reg-list__value reg-list__value--mono">
                  {fcraInformation.fcraRegistration.registrationNumber}
                </dd>
              </div>
              <div>
                <dt className="reg-list__term">Date of registration</dt>
                <dd className="reg-list__value">
                  {fcraInformation.fcraRegistration.dateOfRegistration}
                </dd>
              </div>
              <div>
                <dt className="reg-list__term">Renewed for 5 years w.e.f.</dt>
                <dd className="reg-list__value">
                  {fcraInformation.fcraRegistration.renewalDate}
                </dd>
              </div>
              <div>
                <dt className="reg-list__term">Designated bank</dt>
                <dd className="reg-list__value">{fcraInformation.fcraBank.name}</dd>
              </div>
            </dl>

            <div className="transparency-grid reveal">
              {TRANSPARENCY_DOCUMENTS.map((doc) => {
                const inner = (
                  <>
                    <div>
                      <span className="transparency-doc__kind">{doc.kind}</span>
                      <span className="transparency-doc__title">{doc.title}</span>
                      <span className="transparency-doc__desc">{doc.description}</span>
                      {doc.meta && <span className="transparency-doc__meta">{doc.meta}</span>}
                    </div>
                  </>
                );

                const icon = (
                  <span className="transparency-doc__icon" aria-hidden="true">
                    <FileText className="transparency-doc__glyph" />
                  </span>
                );

                return doc.href ? (
                  <a
                    key={doc.id}
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transparency-doc"
                  >
                    {icon}
                    {inner}
                  </a>
                ) : (
                  <Link key={doc.id} to={doc.to ?? ROUTES.aboutFinancialReports} className="transparency-doc">
                    {icon}
                    {inner}
                  </Link>
                );
              })}
            </div>

            <p className="trust-note">
              Every document listed is filed with the Government of India and available under the
              Foreign Contribution Regulation Act. Where a document set runs to many pages, the
              underlying PDFs are listed on the linked page.
            </p>

            <div className="trust-actions">
              <EditorialLink to={ROUTES.aboutFinancialReports}>
                Foreign contribution reports
              </EditorialLink>
              <EditorialLink to={ROUTES.aboutFcraInformation}>FCRA information</EditorialLink>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

/* ==========================================================================
   SUPPORT PARTNERS  →  /about/support-partners
   --------------------------------------------------------------------------
   Redesigned per the Phase 7 brief.

   NOT a wall of cards with large acronym boxes, and not a logo grid — because
   NO PARTNER LOGO FILES EXIST in the repository (verified by a full search of
   src/assets and public/). Nothing was downloaded or substituted to fill the
   gap.

   Each partner is instead a ruled institutional record: organisation name,
   location, and the contribution reported in LAYA's published 2023-2024
   listing. The source of those figures is stated on the page.

   The unverified `mockPartners` names (ActionAid, Ford Foundation, UNDP India,
   Ministry of Tribal Affairs, NABARD, UNICEF) are deliberately NOT rendered.
   See the conflict note in src/content/trust.ts.
   ========================================================================== */
export const SupportPartners = () => {
  useRevealOnScroll();

  const withAmounts = PARTNERS.filter((p) => p.amount !== null);

  return (
    <>
      <Helmet>
        <title>Our Partners | LAYA</title>
        <meta name="description" content={PARTNERS_HEADING.lead} />
        <link rel="canonical" href="https://laya.org.in/about/support-partners" />
      </Helmet>
      <MainLayout>
        <header className="trust-header">
          <div className="trust-header__inner">
            <p className="trust-header__eyebrow type-eyebrow">{PARTNERS_HEADING.eyebrow}</p>
            <h1 className="trust-header__title">{PARTNERS_HEADING.title}</h1>
            <p className="trust-header__lead">{PARTNERS_HEADING.lead}</p>

            <dl className="res-header__stats">
              <div>
                <dd className="res-stat__value">{PARTNERS.length}</dd>
                <dt className="res-stat__label">Partner organisations</dt>
              </div>
              <div>
                <dd className="res-stat__value">{withAmounts.length}</dd>
                <dt className="res-stat__label">With reported contributions</dt>
              </div>
              <div>
                <dd className="res-stat__value">2023–24</dd>
                <dt className="res-stat__label">Reporting period</dt>
              </div>
            </dl>
          </div>
        </header>

        <section className="trust-band">
          <div className="trust-header__inner">
            <header className="trust-heading">
              <p className="type-eyebrow">Partners and supporters</p>
              <h2 className="trust-heading__title">Organisations supporting this work</h2>
              <p className="trust-heading__intro">
                Listed in the order published by LAYA for 2023–2024. Locations are shown where the
                listing states one.
              </p>
            </header>

            {/* Column captions — hidden on narrow screens where each row stacks. */}
            <div className="partner-captions" aria-hidden="true">
              <span className="partner-caption">Organisation</span>
              <span className="partner-caption">Location</span>
              <span className="partner-caption partner-caption--end">
                Reported contribution
              </span>
            </div>

            <div className="partner-list reveal">
              {PARTNERS.map((partner) => (
                <div key={partner.id} className="partner-row">
                  <span className="partner-row__name">{partner.name}</span>
                  <span className="partner-row__location">
                    {partner.location ?? "\u2014"}
                  </span>
                  <span
                    className={`partner-row__amount ${
                      partner.amount ? "" : "partner-row__amount--none"
                    }`}
                  >
                    {partner.amount ?? "Not disclosed"}
                  </span>
                </div>
              ))}
            </div>

            <p className="trust-note">{PARTNERS_HEADING.note}</p>

            <p className="trust-note" style={{ marginTop: "var(--space-sm)" }}>
              These figures are not reconciled against the FCRA Rule 13(b) quarterly receipts shown
              under FCRA information: several partners here are domestic funders whose
              contributions fall outside FCRA reporting, and the published listing is rounded while
              the receipts are exact.
            </p>

            <p className="trust-note" style={{ marginTop: "var(--space-sm)" }}>
              Partner logos are not displayed because no verified logo files are held for these
              organisations. Organisation names and reported figures are shown instead.
            </p>

            <div className="trust-actions">
              <EditorialLink to={ROUTES.aboutFinancialReports}>
                Foreign contribution reports
              </EditorialLink>
              <EditorialLink to={ROUTES.aboutFcraInformation}>FCRA information</EditorialLink>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

/* ==========================================================================
   TEAM  →  /team
   ========================================================================== */

/**
 * Team records, verbatim from `mockTeam` in src/services/api.ts.
 * No headshots exist in the repository, so each person is shown as a monogram
 * rather than a reused landscape photograph.
 */
const TEAM = [
  {
    name: "Nafisa Goga D'Souza",
    designation: "Executive Director",
    bio: "Founder and visionary leader of LAYA, dedicated to Adivasi rights and development for over three decades.",
  },
  {
    name: "Dominic D'Souza",
    designation: "Program Director",
    bio: "Leading LAYA's program strategy and community engagement across the Eastern Ghats region.",
  },
] as const;

const initialsOf = (name: string) =>
  name
    .replace(/^(Ms\.?|Mr\.?|Mrs\.?|Dr\.?|Prof\.?)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

export const Team = () => {
  useRevealOnScroll();

  return (
    <>
      <Helmet>
        <title>Our Team | LAYA</title>
        <meta name="description" content="The people behind LAYA's work with Adivasi communities." />
        <link rel="canonical" href="https://laya.org.in/team" />
      </Helmet>
      <MainLayout>
        <PageHeader
          eyebrow="Our People"
          title="Our Team"
          subtitle="The people behind the mission"
        />

        <section className="about-band">
          <div className="container-page">
            <SectionHeading eyebrow="Leadership" title="Directors and programme leadership" />

            <div className="team-grid reveal">
              {TEAM.map((member) => (
                <article key={member.name} className="team-member">
                  {/*
                    Consistent 1:1 portrait frame.

                    No team photographs exist in the repository, so this frame
                    currently renders a monogram. The aspect ratio is fixed here
                    so real portraits render at a consistent size with no layout
                    change once supplied.

                    Gallery photographs were NOT substituted: they are landscape
                    field scenes, and presenting one as a named individual's
                    portrait would be a false claim.
                  */}
                  <div className="team-member__portrait">
                    <span className="team-member__monogram" aria-hidden="true">
                      {initialsOf(member.name)}
                    </span>
                  </div>

                  <h3 className="team-member__name">{member.name}</h3>
                  <p className="team-member__role">{member.designation}</p>
                  <p className="team-member__bio">{member.bio}</p>
                </article>
              ))}
            </div>

            <p className="team-notice">
              This directory lists LAYA's programme leadership. Photographs are not yet available
              for these colleagues, so initials are shown in their place. The Board of Management
              and General Body are listed under {}
              <Link to={ROUTES.aboutGovernance} className="laya-link">
                Governance
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="about-band about-band--warm">
          <div className="container-page">
            <SectionHeading
              eyebrow="Governance"
              title="Board and General Body"
              intro="LAYA is governed by an elected Board of Management and a General Body drawn from academic and development practice."
            />
            <div className="about-actions">
              <EditorialLink to={ROUTES.aboutGovernance}>Governance</EditorialLink>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};
