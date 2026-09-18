import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgramCard from "@/components/ProgramCard";
import ImpactCounter from "@/components/ImpactCounter";
import MainLayout from "@/layouts/MainLayout";
import { mockPrograms, mockImpactMetrics } from "@/services/api";
import { Helmet } from "react-helmet-async";
import { referenceProgramImages, referencePublications } from "@/assets/referenceAssets";
import { homeHeroImage } from "@/assets/newGalleryAssets";

const featureCards = [
  {
    icon: Leaf,
    title: "Nature-centered",
    description: "Rooted in the wisdom of forests, land, and water systems of the Eastern Ghats.",
    accent: "purple" as const,
  },
  {
    icon: Users,
    title: "Community-led",
    description: "Programs shaped by Adivasi communities through gram sabhas and local institutions.",
    accent: "cyan" as const,
  },
  {
    icon: Heart,
    title: "Culturally rooted",
    description: "Honoring indigenous knowledge, identity, and the rhythm of resilient lives.",
    accent: "purple" as const,
  },
];

const heroHighlights = [
  { value: "39+", label: "Years alongside communities" },
  { value: "1,500+", label: "Villages reached across the Eastern Ghats" },
  { value: "25+", label: "Active initiatives rooted in local leadership" },
];

const publicationCards = [
  {
    image: referencePublications.chronicle,
    title: "The LAYA Chronicle",
    description: "Stories, reflections, and field learning from decades of community-rooted practice.",
  },
  {
    image: referencePublications.hbhcPublication,
    title: "HBHC Social Documentation",
    description: "A closer look at herbal health care traditions and community-led wellness systems.",
  },
  {
    image: referencePublications.covidBanner,
    title: "Response to COVID-19",
    description: "How local institutions and rapid grassroots action protected vulnerable families.",
  },
];

const HeroSection = () => {
  return (
    <section className="laya-section max-lg:!pt-5 pt-8 sm:pt-10 lg:pt-10 !pb-8 md:!pb-6">
      <div className="container-narrow mx-auto">
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] gap-7 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center order-1"
          >
            <p className="laya-label mb-4 lg:mb-5">Resource Center for Adivasis</p>
            <h1 className="font-heading text-[1.85rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white mb-4 lg:mb-5 max-w-xl">
              Standing with Adivasi Communities
            </h1>
            <p className="text-[0.95rem] sm:text-base md:text-lg text-white/85 font-body leading-relaxed max-w-md mb-6 lg:mb-7">
              For nearly four decades, LAYA has walked alongside indigenous communities in the Eastern
              Ghats — advancing rights, livelihoods, health, and lasting self-reliance.
            </p>

            <div className="flex flex-col xs:flex-row sm:flex-row gap-3 mb-2 lg:mb-8 w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-[var(--laya-purple)] hover:bg-white/90 rounded font-semibold px-7"
                asChild
              >
                <Link to="/about">
                  Our Story <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/70 bg-transparent text-white hover:bg-white/10 rounded px-7"
                asChild
              >
                <Link to="/programs">What We Do</Link>
              </Button>
            </div>

            {/* Desktop stats under copy */}
            <div className="hidden lg:flex flex-wrap gap-x-8 gap-y-4 pt-6 max-w-xl">
              {heroHighlights.map((item) => (
                <div key={item.label} className="min-w-[6.5rem]">
                  <p className="font-heading text-2xl md:text-[1.75rem] font-bold text-white leading-none">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-xs text-white/75 font-body leading-snug max-w-[9rem]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image — visible on mobile + desktop */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 w-full"
          >
            <Link to="/about" className="group block">
              <div className="relative overflow-hidden rounded sm:rounded border-[3px] sm:border-4 border-white/90 shadow-2xl">
                <img
                  src={homeHeroImage}
                  alt="Training programme on Social Entitlements"
                  loading="eager"
                  className="w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[560px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5 flex items-end justify-between gap-3">
                  <p className="text-xs sm:text-sm font-heading font-semibold text-white leading-snug max-w-[14rem] sm:max-w-[16rem]">
                    Training programme on Social Entitlements
                  </p>
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white text-[var(--laya-purple)] transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Mobile stats under image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="order-3 lg:hidden grid grid-cols-3 gap-2 rounded border border-white/25 bg-white/10 p-3 backdrop-blur-sm"
          >
            {heroHighlights.map((item) => (
              <div key={item.label} className="text-center px-1">
                <p className="font-heading text-xl font-bold text-white leading-none">{item.value}</p>
                <p className="mt-1.5 text-[10px] text-white/80 font-body leading-snug">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AboutPreview = () => (
  <section className="laya-section">
    <div className="container-narrow mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="laya-panel p-6 md:p-10 lg:p-12"
      >
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] gap-10 lg:gap-16 items-start mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <p className="laya-label mb-5">About LAYA</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white mb-6 leading-tight">
              A Rhythm of Service & Solidarity
            </h2>
            <p className="text-white/90 font-body text-base md:text-lg leading-relaxed mb-5">
              LAYA — meaning &apos;rhythm&apos; — is a civil society organization founded in 1985 in
              Visakhapatnam. It serves as a resource center dedicated to Adivasi communities inhabiting
              the <strong className="text-white font-semibold">Eastern Ghats</strong>, who are increasingly
              marginalized despite living in resource-rich areas.
            </p>
            <p className="text-white/85 font-body text-base md:text-lg leading-relaxed mb-8">
              For over 39 years, LAYA has worked alongside indigenous communities on land rights,
              governance, livelihoods, education, and cultural preservation — rooted in the belief that
              Adivasi wisdom holds keys to sustainable development.
            </p>
            <Button
              size="lg"
              className="bg-white text-[var(--laya-purple)] hover:bg-white/90 rounded font-semibold"
              asChild
            >
              <Link to="/about">
                Read Our Story <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="relative lg:mt-2">
            <img
              src={referenceProgramImages[1]}
              alt="LAYA community gathering"
              loading="lazy"
              width={1280}
              height={864}
              className="w-full rounded border-4 border-white/90 shadow-2xl object-cover aspect-[4/3]"
            />
            <div className="absolute left-4 bottom-4 rounded border border-white/30 bg-[rgba(255,255,255,0.14)] px-4 py-3 backdrop-blur-md">
              <p className="text-xs font-heading uppercase tracking-[0.18em] text-white/80">Resource Center</p>
              <p className="mt-1 font-heading text-lg font-semibold text-white">Serving Adivasi communities since 1985</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {featureCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="laya-feature-card flex flex-col"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  card.accent === "cyan" ? "bg-[var(--laya-cyan)]" : "bg-[var(--laya-purple)]"
                }`}
              >
                <card.icon className="h-5 w-5 text-white" />
              </div>
              <h3
                className={`font-heading text-lg font-bold mb-2 laya-feature-card__title ${
                  card.accent === "cyan"
                    ? "laya-feature-card__title--cyan"
                    : "laya-feature-card__title--purple"
                }`}
              >
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 font-body leading-relaxed flex-1">{card.description}</p>
              <div
                className={`mt-4 h-1 w-10 rounded-full ${
                  card.accent === "cyan" ? "bg-[var(--laya-cyan)]" : "bg-[var(--laya-purple)]"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const ProgramsSection = () => (
  <section className="laya-section">
    <div className="container-narrow mx-auto laya-panel-solid p-6 md:p-10 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 lg:mb-12"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[var(--laya-purple)] mb-3">
              What We Do
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Program Areas</h2>
            <p className="text-muted-foreground font-body">
              Integrated development programs rooted in Adivasi knowledge systems, self-governance, and sustainable futures.
            </p>
          </div>
          <div className="h-1 w-20 rounded-full bg-[var(--laya-cyan)]" />
        </div>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
        {mockPrograms.map((program, i) => (
          <ProgramCard key={program.id} program={program} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const ImpactSection = () => (
  <section className="laya-section">
    <div className="container-narrow mx-auto laya-panel p-6 md:p-10 lg:p-12">
      <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-8 lg:gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <p className="laya-label mb-4">Our Impact</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Numbers that carry decades of trust.</h2>
          <p className="text-lg text-white/85 font-body leading-relaxed">
            Across the Eastern Ghats, LAYA's work continues to strengthen community institutions, livelihoods, health systems, and cultural resilience.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {mockImpactMetrics.map((metric, i) => (
            <div key={metric.id} className="rounded border border-white/20 bg-white/10">
              <ImpactCounter metric={metric} index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const PublicationsSection = () => (
  <section className="laya-section">
    <div className="container-narrow mx-auto laya-panel-solid p-6 md:p-10 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 lg:mb-12"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[var(--laya-purple)] mb-3">
              Knowledge
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Publications</h2>
            <p className="text-muted-foreground font-body">
              Resources and documentation from LAYA&apos;s field practice, community learning, and response work.
            </p>
          </div>
          <div className="h-1 w-20 rounded-full bg-[var(--laya-cyan)]" />
        </div>
      </motion.div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group overflow-hidden rounded border border-border bg-card shadow-md transition-all duration-300 hover:border-[var(--laya-cyan)] hover:shadow-xl"
        >
          <Link to="/publications" className="grid md:grid-cols-[1.05fr_0.95fr] items-stretch">
            <div className="overflow-hidden">
              <img
                src={publicationCards[0].image}
                alt="The LAYA Chronicle publication"
                loading="lazy"
                className="h-full min-h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <p className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-[var(--laya-purple)] mb-3">
                Featured Publication
              </p>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">{publicationCards[0].title}</h3>
              <p className="text-muted-foreground font-body leading-relaxed">{publicationCards[0].description}</p>
              <div className="mt-6 flex items-center gap-2 text-[var(--laya-cyan)] text-sm font-semibold">
                <span>Explore Publications</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </motion.div>
        <div className="grid gap-6">
          {publicationCards.slice(1).map((publication, i) => (
            <motion.div
              key={publication.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group grid overflow-hidden rounded border border-border bg-card shadow-md transition-all duration-300 hover:border-[var(--laya-cyan)] hover:shadow-xl sm:grid-cols-[160px_minmax(0,1fr)]"
            >
              <Link to="/publications" className="contents">
              <div className="overflow-hidden">
                <img
                  src={publication.image}
                  alt={`${publication.title} publication`}
                  loading="lazy"
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-full"
                />
              </div>
              <div className="flex flex-col justify-center p-5">
                <h3 className="text-lg font-semibold text-foreground font-body">{publication.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-body">{publication.description}</p>
                <div className="mt-4 flex items-center gap-2 text-[var(--laya-cyan)] text-sm font-semibold">
                  <span>View All</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const DonateSection = () => (
  <section className="laya-section pb-20 md:pb-28">
    <div className="container-narrow mx-auto laya-panel p-8 md:p-12 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="w-16 h-1 bg-white/70 mx-auto mb-8 rounded-full" />
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-5">
          Join the Rhythm of Change
        </h2>
        <p className="text-lg text-white/85 font-body max-w-xl mx-auto mb-10 leading-relaxed">
          Support Adivasi communities in preserving their heritage, protecting their lands, and building
          sustainable futures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-[var(--laya-purple)] hover:bg-white/90 px-10 rounded font-semibold"
            asChild
          >
            <Link to="/donate">Donate Now</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white/70 bg-transparent text-white hover:bg-white/10 px-10 rounded"
            asChild
          >
            <Link to="/publications">Browse Publications</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

const Index = () => {
  return (
    <>
      <Helmet>
        <title>The LAYA Chronicle | Resource Center for Adivasis</title>
        <meta
          name="description"
          content="LAYA – Resource Center for Adivasis. 39+ years of working with indigenous communities in the Eastern Ghats. Discover programs, stories, and impact."
        />
        <meta property="og:title" content="The LAYA Chronicle" />
        <meta
          property="og:description"
          content="Rhythms of Nature and Resilient Lives — LAYA's journey with Adivasi communities."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <MainLayout>
        <HeroSection />
        <AboutPreview />
        <ProgramsSection />
        <ImpactSection />
        <PublicationsSection />
        <DonateSection />
      </MainLayout>
    </>
  );
};

export default Index;
