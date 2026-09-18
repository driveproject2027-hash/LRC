import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import { referenceHero, referenceProgramImages } from "@/assets/referenceAssets";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About LAYA | Resource Center for Adivasis</title>
        <meta name="description" content="Learn about LAYA's mission, vision, and 39+ years of service with Adivasi communities in the Eastern Ghats." />
      </Helmet>
      <MainLayout>
        <PageHero
          title="About LAYA"
          subtitle="A Resource Center for Adivasis since 1985 — 39+ years of service and solidarity"
          image={referenceHero}
          imageAlt="Eastern Ghats landscape"
        />

        <section className="laya-section">
          <div className="container-narrow mx-auto laya-panel-solid p-6 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "39+", label: "Years of Service" },
                { value: "500K+", label: "Lives Touched" },
                { value: "1,500+", label: "Villages" },
                { value: "25+", label: "Active Programs" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-[var(--laya-purple)] font-heading mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-body font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="laya-section" id="who-we-are">
          <div className="container-narrow mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="laya-panel-solid p-10 md:p-16 text-center"
            >
              <div className="w-16 h-1 bg-[var(--laya-cyan)] mx-auto mb-8 rounded-full" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">Who We Are</h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed">
                We are a Resource Center for Adivasis. Adivasi communities are increasingly marginalized
                in spite of inhabiting resource rich areas and are constantly threatened by commercial
                interests interfering with their habitats. For over 39 years, we have stood alongside
                these indigenous communities, fighting for their rights, preserving their culture,
                and building sustainable futures rooted in traditional wisdom.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="laya-section">
          <div className="container-narrow mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="w-20 h-1 bg-[var(--laya-cyan)] mx-auto mb-6 rounded-full" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Our Foundation</h2>
              <p className="text-lg text-white/85 font-body max-w-2xl mx-auto">
                The principles that guide our work across the Eastern Ghats
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                id="vision"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="laya-panel-solid p-8 md:p-10"
                role="article"
                aria-label="Vision card"
              >
                <div className="w-16 h-16 bg-[var(--laya-purple)] rounded flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Vision</h2>
                <p className="text-muted-foreground font-body leading-relaxed text-base">
                  We envisage a socially just and humanized society where the marginalised communities
                  find a space for survival with dignity. The vulnerability of such societies is under
                  greater threat with the forces of globalization and privatization on their day-to-day
                  life situation.
                </p>
              </motion.div>
              <motion.div
                id="mission"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="laya-panel-solid p-8 md:p-10"
                role="article"
                aria-label="Mission card"
              >
                <div className="w-16 h-16 bg-[var(--laya-cyan)] rounded flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Mission</h2>
                <p className="text-muted-foreground font-body leading-relaxed text-base">
                  Empowerment of marginalised communities for assertion of their rights and to promote
                  relevant sustainable alternatives at the grassroots level.
                </p>
              </motion.div>
              <motion.div
                id="goals"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="laya-panel-solid p-8 md:p-10"
                role="article"
                aria-label="Goals card"
              >
                <div className="w-16 h-16 bg-[var(--laya-purple)] rounded flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Goals</h2>
                <ul className="text-muted-foreground font-body leading-relaxed text-base space-y-3">
                  {[
                    "Promote empowerment of communities in urban, rural, tribal contexts",
                    "Promote sustainable development initiatives at various levels",
                    "Undertake capacity development with youth and women",
                    "Build strategic alliances with voluntary organisations and networks",
                    "Develop alternative database through research and documentation",
                  ].map((goal) => (
                    <li key={goal} className="flex gap-3">
                      <div className="w-2 h-2 bg-[var(--laya-purple)] rounded-full mt-2 shrink-0" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="laya-section">
          <div className="container-narrow mx-auto laya-panel-solid p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src={referenceProgramImages[3]}
                  alt="LAYA community work"
                  loading="lazy"
                  className="rounded shadow-2xl w-full"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-1 bg-[var(--laya-cyan)] rounded-full mb-6" />
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">The LAYA Story</h2>
                <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
                  Founded in 1985 in Visakhapatnam, LAYA began as a small resource center with a big vision —
                  to stand alongside the Adivasi communities of the Eastern Ghats who face increasing marginalization
                  despite living in some of India&apos;s most resource-rich regions.
                </p>
                <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
                  The word &apos;LAYA&apos; represents &apos;rhythm&apos; — reflecting the organization&apos;s core belief in the wisdom
                  underlying tribal societies and the cosmic balance of creation. Over seven distinct phases, LAYA
                  has evolved from grassroots organizing to comprehensive program development spanning governance,
                  livelihoods, education, health, and environmental conservation.
                </p>
                <p className="text-lg text-muted-foreground font-body leading-relaxed">
                  Today, LAYA&apos;s work touches over 500,000 lives across 1,500+ villages, implementing 25+ active
                  programs that integrate traditional knowledge with contemporary development approaches.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="laya-section pb-20 md:pb-28">
          <div className="container-narrow mx-auto max-w-4xl">
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="laya-panel p-10 md:p-16 text-center"
            >
              <div className="w-20 h-1 bg-white/70 mx-auto mb-8 rounded-full" />
              <p className="text-2xl md:text-3xl text-white font-body italic leading-relaxed mb-8">
                &ldquo;Give me the strength never to disown the poor or bend my knees before insolent might&rdquo;
              </p>
              <cite className="text-white/85 font-heading text-lg font-semibold not-italic">
                — Rabindranath Tagore
              </cite>
            </motion.blockquote>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default About;
