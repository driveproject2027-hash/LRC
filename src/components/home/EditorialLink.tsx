import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import EditableText from "@/components/admin/EditableText";

/**
 * Editorial link with an arrow affordance.
 * Used across the homepage for "Our Story →", "All programmes →" etc.
 */
export const EditorialLink = ({
  to,
  children,
  className = "",
  id,
  fieldPath,
  fieldLabel,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  id?: string;
  fieldPath?: string;
  fieldLabel?: string;
}) => (
  <Link to={to} id={id} className={`editorial-link ${className}`}>
    {fieldPath ? (
      <EditableText
        path={fieldPath}
        label={fieldLabel || "Link Label"}
        value={typeof children === "string" ? children : undefined}
        as="span"
      >
        {children}
      </EditableText>
    ) : (
      children
    )}
    <ArrowRight className="editorial-link__arrow" aria-hidden="true" />
  </Link>
);

/**
 * Section header: eyebrow, serif heading, optional intro.
 * Keeps heading hierarchy consistent — always renders an h2, since the
 * homepage h1 belongs to the hero.
 */
export const SectionHeader = ({
  eyebrow,
  heading,
  intro,
  wide = false,
  as: Heading = "h2",
  fieldPrefix,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  wide?: boolean;
  as?: "h2" | "h3";
  fieldPrefix?: string;
}) => {
  if (fieldPrefix) {
    return (
      <header
        className={`home-section-header ${wide ? "home-section-header--wide" : ""}`}
      >
        {eyebrow && (
          <EditableText
            path={`${fieldPrefix}.eyebrow`}
            label="Section Eyebrow"
            value={eyebrow}
            as="p"
            className="type-eyebrow"
          />
        )}
        <EditableText
          path={`${fieldPrefix}.heading`}
          label="Section Heading"
          value={heading}
          as={Heading as any}
          className="home-section-header__heading"
        />
        {intro && (
          <EditableText
            path={`${fieldPrefix}.intro`}
            label="Section Intro"
            value={intro}
            as="p"
            multiline={true}
            className="home-section-header__intro"
          />
        )}
      </header>
    );
  }

  return (
    <header
      className={`home-section-header ${wide ? "home-section-header--wide" : ""}`}
    >
      <p className="type-eyebrow">{eyebrow}</p>
      <Heading className="home-section-header__heading">{heading}</Heading>
      {intro && <p className="home-section-header__intro">{intro}</p>}
    </header>
  );
};

export default EditorialLink;
