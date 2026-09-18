import { motion } from "framer-motion";
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
      <section className="laya-section pt-8 lg:pt-10 pb-8 md:pb-12">
        <div className="container-narrow mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {label && <p className="laya-label mb-6 mx-auto w-fit">{label}</p>}
            {badge}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-white/85 font-body max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
            )}
            {description && (
              <p className="text-sm text-white/80 font-body max-w-xl mx-auto mt-4 leading-relaxed">{description}</p>
            )}
            {children}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="laya-section pt-8 lg:pt-10 pb-8 md:pb-12">
      <div className="container-narrow mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[40vh]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {label && <p className="laya-label mb-6">{label}</p>}
            {badge}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white mb-5 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-white/85 font-body leading-relaxed max-w-lg mb-4">{subtitle}</p>
            )}
            {description && (
              <p className="text-sm text-white/80 font-body leading-relaxed max-w-lg border-l-2 border-white/50 pl-4 mb-6">
                {description}
              </p>
            )}
            {children}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded overflow-hidden border-4 border-white/90 shadow-2xl aspect-[4/3]">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover"
                width={1920}
                height={1080}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
