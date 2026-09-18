import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ImpactCounter from "@/components/ImpactCounter";
import { mockImpactMetrics } from "@/services/api";
import { referencePublications } from "@/assets/referenceAssets";

const Impact = () => (
  <>
    <Helmet>
      <title>Impact & Outcomes | LAYA</title>
      <meta name="description" content="Explore the measurable impact of LAYA's work with Adivasi communities across the Eastern Ghats." />
    </Helmet>
    <MainLayout>
      <PageHero
        label="Our Impact"
        title="Impact & Outcomes"
        subtitle="Measuring transformation across communities"
        image={referencePublications.covidBanner}
        imageAlt="LAYA impact in communities"
      />

      <section className="laya-section">
        <div className="container-narrow mx-auto laya-panel p-6 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockImpactMetrics.map((m, i) => (
              <ImpactCounter key={m.id} metric={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="laya-section pb-20 md:pb-28">
        <div className="container-narrow mx-auto laya-panel-solid p-6 md:p-10 lg:p-12">
          <SectionHeading title="Areas of Impact" subtitle="How our programs create lasting change" />
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Adivasi Rights Secured", desc: "Strengthened socio-economic and cultural rights of Adivasi communities through legal advocacy, gram sabha empowerment, and PESA implementation.", metric: "500+ villages" },
              { title: "Food Sovereignty", desc: "Revived traditional millet farming and enabled communities to improve agriculture productivity by watershed management and value added technologies.", metric: "10,000+ families" },
              { title: "Herbal Health Systems", desc: "Legitimized the practice of herbal based medicine to complement prevailing mainstream health care systems in tribal areas.", metric: "300+ communities" },
              { title: "Youth & Women Empowerment", desc: "Capacitated young men and women towards a life-long learning process and development of skills enabling them to play leadership roles.", metric: "10,000+ youth trained" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded border border-border bg-card"
                role="article"
                aria-label={`${item.title}: ${item.desc}`}
              >
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-body mb-3">{item.desc}</p>
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-heading font-semibold">
                  {item.metric}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  </>
);

export default Impact;
