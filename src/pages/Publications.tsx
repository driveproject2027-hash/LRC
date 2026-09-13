import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Input } from "@/components/ui/input";
import { BookOpen, ExternalLink, FileText, Search } from "lucide-react";
import { layaPublicationImages } from "@/assets/layaAssets";

type PublicationCategory =
  | "Climate & Environment"
  | "Policy & Advocacy"
  | "Livelihoods"
  | "Health"
  | "Education & Youth"
  | "SDGs & Urban"
  | "Research & Stories";

const CATEGORIES: Array<PublicationCategory | "All"> = [
  "All",
  "Climate & Environment",
  "Policy & Advocacy",
  "Livelihoods",
  "Health",
  "Education & Youth",
  "SDGs & Urban",
  "Research & Stories",
];

const publications: Array<{
  title: string;
  description: string;
  image: string;
  link: string;
  category: PublicationCategory;
}> = [
  {
    title: "Training in Integrated Mussel Farming",
    description: "This publication showcases training in integrated mussel farming with sea cage and seaweed, enabling sustainable livelihoods for coastal communities.",
    image: layaPublicationImages[0],
    link: "https://laya.org.in/PublicFiles/Mussel_Seaweed_Book.pdf",
    category: "Livelihoods",
  },
  {
    title: "Renewable Energy Case Study",
    description: "A case study on renewable energy that has enhanced energy access and energy security.",
    image: layaPublicationImages[1],
    link: "https://laya.org.in/PublicFiles/Are_You_In_BFW_CAN.pdf",
    category: "Climate & Environment",
  },
  {
    title: "The LAYA Chronicle",
    description: "LAYA's story of change on Sustainable Farming has been featured in Azim Premji University, Bangalore's Vol II compendium.",
    image: layaPublicationImages[2],
    link: "https://laya.org.in/PublicFiles/The_Laya_Chronicle.pdf?download",
    category: "Research & Stories",
  },
  {
    title: "Herbal Based Health Care",
    description: "This document showcases LAYA's approach to strengthening local and relevant herbal-based healthcare practices.",
    image: layaPublicationImages[3],
    link: "https://laya.org.in/PublicFiles/HBHC_SOC.pdf?download",
    category: "Health",
  },
  {
    title: "Building Community Resilience",
    description: "Building community resilience in a climate changing environment set in a remote tribal or Adivasi area of Andhra Pradesh.",
    image: layaPublicationImages[4],
    link: "https://laya.org.in/PublicFiles/Laya-The%20change%20story2021.pdf?download",
    category: "Climate & Environment",
  },
  {
    title: "AIIB Climate Resilience Goal",
    description: "Criteria to Align AIIB with PA Climate resilience Goal",
    image: layaPublicationImages[5],
    link: "https://laya.org.in/PublicFiles/Criteria%20to%20Align%20AIIB%20with%20PA%20Climate%20resilience%20Goal.pdf?download",
    category: "Policy & Advocacy",
  },
  {
    title: "Blue Economy for Fishing Communities",
    description: "Towards Strengthening Blue Economy for Fishing Communities - Equity in climate and sustainability action.",
    image: layaPublicationImages[6],
    link: "https://laya.org.in/PublicFiles/Towards-Strengthening-Blue-Economy-for-Fishing-Communities.pdf?download",
    category: "Livelihoods",
  },
  {
    title: "Climate Variability Impact",
    description: "This document focuses on climate variability and its impacts and explores coping measures undertaken by the Konda Reddis of Pathakota.",
    image: layaPublicationImages[7],
    link: "https://laya.org.in/PublicFiles/livelihood-Vulnerablity-To-Climate-Variability.pdf?download",
    category: "Climate & Environment",
  },
  {
    title: "AIIB Projects in India",
    description: "The purpose of this brief is to share information and the current state of play of AIIB projects in India.",
    image: layaPublicationImages[8],
    link: "https://laya.org.in/PublicFiles/Brief-on-AIIB-Projects-in-India.pdf?download",
    category: "Policy & Advocacy",
  },
  {
    title: "Trainers' Manual on SDGs",
    description: "Trainers' Manual on Games and Activities for Sustainable Development Goals & Climate Change for Children and Youth.",
    image: layaPublicationImages[9],
    link: "https://laya.org.in/PublicFiles/Trainers-Manual-on-Games-and-Activities-SDG-CC.pdf?download",
    category: "Education & Youth",
  },
  {
    title: "Policy Brief on Coastal Ecosystem",
    description: "Policy Brief on Coastal Ecosystem",
    image: layaPublicationImages[10],
    link: "https://laya.org.in/PublicFiles/Policy-Brief-Coastal-Ecosystem.pdf?download",
    category: "Climate & Environment",
  },
  {
    title: "Resilient Forest EcoSystem",
    description: "Towards A Resilient Forest EcoSystem",
    image: layaPublicationImages[11],
    link: "https://laya.org.in/PublicFiles/Laya_Eco_System.pdf?download",
    category: "Climate & Environment",
  },
  {
    title: "AIIB Report 2019",
    description: "AIIB Report 2019",
    image: layaPublicationImages[12],
    link: "https://laya.org.in/PublicFiles/AIIB_Report_2019.pdf?download",
    category: "Policy & Advocacy",
  },
  {
    title: "The Rhythm Behind Stories of Change",
    description: "THE RHYTHM BEHIND STORIES OF CHANGE",
    image: layaPublicationImages[13],
    link: "https://laya.org.in/PublicFiles/THE_RHYTHM_BEHIND_STORIES_OF_CHANGE.pdf?download",
    category: "Research & Stories",
  },
  {
    title: "Adivasi Women Climate Adaptation",
    description: "Adapting Adivasi women to climate change: cooking and water solutions.",
    image: layaPublicationImages[14],
    link: "#",
    category: "Climate & Environment",
  },
  {
    title: "Sustainably SMART Pune 2030",
    description: "Sustainably SMART Pune 2030",
    image: layaPublicationImages[15],
    link: "https://laya.org.in/PublicFiles/Sustainably_SMART_Pune_2030.pdf?download",
    category: "SDGs & Urban",
  },
  {
    title: "Smart Cities Vision: SDG-11",
    description: "Pioneering Vision for INDIA's Smart Cities: SDG-11",
    image: layaPublicationImages[16],
    link: "https://laya.org.in/PublicFiles/Pioneering_vision_for_INDIA's_Smart_Cities_SDG_11.pdf?download",
    category: "SDGs & Urban",
  },
  {
    title: "Energy Goals: SDG-7",
    description: "Towards Achieving INDIA's Energy Goals: SDG-7",
    image: layaPublicationImages[17],
    link: "https://laya.org.in/PublicFiles/Towards_Achieving_INDIA's_Energy_Goals_SDG_7.pdf?download",
    category: "SDGs & Urban",
  },
  {
    title: "Education Policy: SDG-4",
    description: "Policy Brief on Sustainable Development Goal: SDG-4 (Education)",
    image: layaPublicationImages[18],
    link: "https://laya.org.in/PublicFiles/Policy_Brief_on_Sustainable_Development_Goal_SDG_4_Education.pdf?download",
    category: "Education & Youth",
  },
  {
    title: "Zero Hunger: SDG-2",
    description: "ZERO Hunger: SDG-2",
    image: layaPublicationImages[19],
    link: "https://laya.org.in/PublicFiles/ZERO_Hunger_SDG_2.pdf?download",
    category: "SDGs & Urban",
  },
  {
    title: "Stories from the Ground",
    description: "Towards A Wholesome Tomorrow Through Stories from the Ground",
    image: layaPublicationImages[20],
    link: "https://laya.org.in/PublicFiles/Stories_from_the_ground.pdf?download",
    category: "Research & Stories",
  },
  {
    title: "Clean Cookstove Projects",
    description: "The Social and Cultural Context of Clean Cookstove Projects in Andhra Pradesh.",
    image: layaPublicationImages[21],
    link: "https://laya.org.in/PublicFiles/Laya_CUDenver_Report.pdf?download",
    category: "Health",
  },
  {
    title: "Climate Resilience for the Poor",
    description: "Strengthening climate resilience for the poor",
    image: layaPublicationImages[22],
    link: "https://laya.org.in/PublicFiles/Strengthening_climate%20resilience_for%20_the_poor.pdf?download",
    category: "Climate & Environment",
  },
  {
    title: "India's INDCs Discussion Paper",
    description: "A Discussion Paper On India's Intended Nationally Determined Contributions (INDCs)",
    image: layaPublicationImages[23],
    link: "https://www.laya.org.in/PublicFiles/INDC%20Discussion%20Paper.pdf?download",
    category: "Policy & Advocacy",
  },
  {
    title: "CDM Projects in India",
    description: "CDM Projects in India: Do they truly promote sustainable development? A mapping and analysis of select CDM projects in India.",
    image: layaPublicationImages[24],
    link: "#",
    category: "Policy & Advocacy",
  },
  {
    title: "CDM Projects Executive Summary",
    description: "CDM Projects in India - Executive Summary",
    image: layaPublicationImages[25],
    link: "#",
    category: "Policy & Advocacy",
  },
  {
    title: "Rhythms in Development - III",
    description: "Rhythms in Development - III",
    image: layaPublicationImages[26],
    link: "https://www.laya.org.in/PublicFiles/Rhythms_in_Development_III.pdf?download",
    category: "Research & Stories",
  },
  {
    title: "Low Carbon Pathway",
    description: "Development through a low carbon pathway",
    image: layaPublicationImages[27],
    link: "https://www.laya.org.in/PublicFiles/Development_Through_A_Low_Carbon_Pathway.pdf?download",
    category: "Climate & Environment",
  },
  {
    title: "Climate Change Adaptation",
    description: "Climate Change and Grassroots Adaptation Process",
    image: layaPublicationImages[28],
    link: "https://www.laya.org.in/PublicFiles/Adaptation_Study_5case_studies.pdf?download",
    category: "Climate & Environment",
  },
  {
    title: "Forest EcoSystem Vulnerability",
    description: "Vulnerability of the forest eco-system in the context of the changing climate",
    image: layaPublicationImages[29],
    link: "https://www.laya.org.in/PublicFiles/Vulnerability_of_the_forest_eco-system.pdf?download",
    category: "Climate & Environment",
  },
  {
    title: "Rhythms in Development - II",
    description: "Rhythms in Development - II",
    image: layaPublicationImages[30],
    link: "https://www.laya.org.in/PublicFiles/Rythms_in%20_Development_II.pdf?download",
    category: "Research & Stories",
  },
  {
    title: "CDM for Sustainable Development",
    description: "CDM for sustainable development?",
    image: layaPublicationImages[31],
    link: "https://www.laya.org.in/PublicFiles/Money_For_Nothing.pdf?download",
    category: "Policy & Advocacy",
  },
  {
    title: "Decentralized Energy Options",
    description: "Decentralized energy options in the tribal belt of the eastern ghats region in India",
    image: layaPublicationImages[0],
    link: "https://www.laya.org.in/PublicFiles/DEOBooklet.pdf?download",
    category: "Climate & Environment",
  },
];

const isAvailable = (link: string) => link !== "#";

const Publications = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<PublicationCategory | "All">("All");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return publications.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const availableCount = publications.filter((p) => isAvailable(p.link)).length;

  return (
    <>
      <Helmet>
        <title>Publications | LAYA</title>
        <meta name="description" content="Explore LAYA publications, annual reports, and knowledge resources from grassroots work." />
      </Helmet>
      <MainLayout>
        <PageHero
          title="Publications"
          subtitle="Research papers, policy briefs, and field documentation from LAYA's grassroots work with Adivasi communities"
          image={layaPublicationImages[2]}
          imageAlt="LAYA publications and research"
          badge={
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-sm font-body mb-6">
              <BookOpen className="h-4 w-4" />
              Knowledge & Research Library
            </div>
          }
        />

        <section className="laya-section">
          <div className="container-narrow mx-auto laya-panel p-6 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                { value: publications.length, label: "Publications" },
                { value: CATEGORIES.length - 1, label: "Research Areas" },
                { value: availableCount, label: "Available PDFs" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <p className="font-heading text-3xl md:text-4xl font-bold text-white">{stat.value}+</p>
                  <p className="text-sm text-white/75 font-body mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="laya-section pb-20 md:pb-28">
          <div className="container-narrow mx-auto laya-panel-solid p-6 md:p-10 lg:p-12">
            <SectionHeading
              title="Knowledge Resources"
              subtitle="Browse our collection of research documents, policy briefs, and community stories"
            />

            <div className="mb-10 space-y-5">
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Search publications by title or topic..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-11 rounded-full border-border bg-card shadow-sm"
                  aria-label="Search publications"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                      activeCategory === category
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground font-body text-center mb-8">
              Showing {filtered.length} of {publications.length} publications
            </p>

            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 px-6 rounded-2xl border border-dashed border-border bg-card"
              >
                <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">No publications found</h3>
                <p className="text-muted-foreground font-body text-sm">Try adjusting your search or selecting a different category.</p>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item, i) => {
                  const available = isAvailable(item.link);
                  const CardWrapper = available ? "a" : "div";

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: Math.min(i * 0.04, 0.3) }}
                      className="h-full"
                    >
                      <CardWrapper
                        {...(available
                          ? { href: item.link, target: "_blank", rel: "noreferrer" }
                          : {})}
                        aria-label={`${item.title}. ${item.description}`}
                        className={`group flex h-full flex-col rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 ${
                          available
                            ? "hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 cursor-pointer"
                            : "opacity-80"
                        }`}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className={`h-full w-full object-contain p-3 transition-transform duration-500 ${
                              available ? "group-hover:scale-105" : ""
                            }`}
                          />
                          <div className="absolute top-3 left-3">
                            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold font-body bg-primary/90 text-primary-foreground backdrop-blur-sm">
                              {item.category}
                            </span>
                          </div>
                          {!available && (
                            <div className="absolute inset-0 flex items-center justify-center bg-foreground/40 backdrop-blur-[1px]">
                              <span className="px-3 py-1.5 rounded-full bg-card text-foreground text-xs font-semibold font-body shadow-lg">
                                Coming Soon
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="font-heading text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-3 flex-1 mb-4">
                            {item.description}
                          </p>
                          <div
                            className={`flex items-center gap-2 text-sm font-semibold font-body pt-3 border-t border-border ${
                              available ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            {available ? (
                              <>
                                <ExternalLink className="h-4 w-4" />
                                <span className="group-hover:underline">View PDF</span>
                              </>
                            ) : (
                              <>
                                <FileText className="h-4 w-4" />
                                <span>Document unavailable</span>
                              </>
                            )}
                          </div>
                        </div>
                      </CardWrapper>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Publications;
