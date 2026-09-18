import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { mockTeam } from "@/services/api";

const Team = () => (
  <>
    <Helmet>
      <title>Team & Governance | LAYA</title>
      <meta name="description" content="Meet the dedicated team behind LAYA's work with Adivasi communities." />
    </Helmet>
    <MainLayout>
      <PageHero
        label="Our People"
        title="Team & Governance"
        subtitle="The people behind the mission"
        centered
      />
      <section className="laya-section pb-20 md:pb-28">
        <div className="container-narrow mx-auto laya-panel-solid p-6 md:p-10 lg:p-12">
          <SectionHeading title="Leadership" subtitle="Dedicated professionals driving LAYA's mission forward" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTeam.map((member, i) => {
              // Monogram avatar: real headshots aren't available, and reusing
              // landscape gallery photos as portraits looked wrong. Initials
              // on brand colors are honest and look intentional.
              const initials = member.name
                .split(/\s+/)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() ?? "")
                .join("");
              const accent = i % 2 === 0 ? "var(--laya-purple)" : "var(--laya-cyan)";
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded border border-border bg-card"
                  role="article"
                  aria-label={`${member.name}. ${member.designation}. ${member.bio}`}
                >
                  <div
                    className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center border border-border"
                    style={{ backgroundColor: accent }}
                    aria-hidden="true"
                  >
                    <span className="font-heading text-2xl font-bold text-white">{initials}</span>
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-accent font-body mt-1">{member.designation}</p>
                  <p className="text-sm text-muted-foreground font-body mt-3 leading-relaxed">{member.bio}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MainLayout>
  </>
);

export default Team;
