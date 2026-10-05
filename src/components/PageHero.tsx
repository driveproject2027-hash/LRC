import { ReactNode } from "react";

export interface PageHeroProps {
  label?: string;
  title: ReactNode;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  badge?: ReactNode;
  children?: ReactNode;
  centered?: boolean;
}

const PageHero = ({
  label,
  title,
  subtitle,
  description,
  image,
  imageAlt = "",
  badge,
  children,
  centered = false,
}: PageHeroProps) => {
  if (centered || !image) {
    return (
      <section className="page-hero page-hero--centered">
        <div className="page-hero__inner">
          <div>
            {label && <p className="type-eyebrow page-hero__label">{label}</p>}
            {badge}
            <h1 className="page-hero__title">{title}</h1>
            {subtitle && (
              <p className="page-hero__subtitle">{subtitle}</p>
            )}
            {description && (
              <p className="page-hero__description">{description}</p>
            )}
            {children}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero">
      <div className="page-hero__inner page-hero__inner--split">
        <div>
            {label && <p className="type-eyebrow page-hero__label">{label}</p>}
            {badge}
            <h1 className="page-hero__title">{title}</h1>
            {subtitle && (
              <p className="page-hero__subtitle">{subtitle}</p>
            )}
            {description && (
              <p className="page-hero__description">{description}</p>
            )}
            {children}
        </div>
        <figure className="page-hero__media">
          <img src={image} alt={imageAlt} width={1920} height={1080} />
        </figure>
      </div>
    </section>
  );
};

export default PageHero;
