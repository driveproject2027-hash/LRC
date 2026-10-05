import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Editorial link with an arrow affordance.
 * Used across the homepage for "Our Story →", "All programmes →" etc.
 */
export const EditorialLink = ({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) => (
  <Link to={to} className={`editorial-link ${className}`}>
    {children}
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
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  wide?: boolean;
  as?: "h2" | "h3";
}) => (
  <header
    className={`home-section-header ${wide ? "home-section-header--wide" : ""}`}
  >
    <p className="type-eyebrow">{eyebrow}</p>
    <Heading className="home-section-header__heading">{heading}</Heading>
    {intro && <p className="home-section-header__intro">{intro}</p>}
  </header>
);

export default EditorialLink;
