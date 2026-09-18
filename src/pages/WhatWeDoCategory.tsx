import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { referenceProgramImages } from "@/assets/referenceAssets";

interface ProgramSection {
  heading?: string;
  paragraph?: string;
  bullets?: string[];
  image?: string;
}

const categories = {
  "/what-we-do/rla": {
    title: "Safeguarding Adivasi Rights for Social Justice",
    short: "Rights, law, and self-governance",
    image: referenceProgramImages[0],
    content:
      "LAYA has addressed land alienation and socio-economic rights of Adivasi communities since inception. Through Resource for Legal Action (RLA), the outreach spans East Godavari, Visakhapatnam, West Godavari, Srikakulam, and Vizianagaram.",
    sections: [
      {
        heading: "Activities at the local level",
        paragraph: "Has succeeded over the years in ensuring that adivasis have reclaimed their land rights on about 25000 acres through legal recourse and by effective administrative decisions. The progress in the last five years shows the following results:",
        bullets: [
          "Facilitating access to justice through legal and other advocacy measures.",
          "Empowering adivasi communities through awareness and legal education.",
          "Generating data for advocacy and training on the adivasis' rights to natural resources.",
          "Promoting activists/paralegals to play a vigilance role in safeguarding rights to natural resources.",
          "Organising legal education camps for adivasi youth on land rights, women's rights, human rights, Right to Information Act, Forest Rights Recognition Act, etc.",
          "Organizing Legal orientation Camps to CBOs/Women Groups.",
          "Conducting paralegal training programmes.",
          "Conducting community mobilization on various issues like RoFR Act implementation, Rejected Claims of RoFR, etc.",
          "Surveying and identifying drop outs in villages of East and West Godavari districts and also facilitating readmission of drop outs.",
          "Facilitating tribal youth to apply for tribal community certificates.",
          "Facilitating adivasi households to secure ration cards in East and West Godavari districts.",
          "Facilitating adivasi households to secure job cards in East and West Godavari districts under MGNREGA.",
          "Facilitating applications of eligible persons for Old Age Pension (OAP).",
          "Facilitating adivasi widows to get Widows' Pension in East and West Godavari and Khammam districts.",
          "Initiating RTI Applications on Previous LTR orders, Settlement orders, RoFR Information from RoFR Cell, TSP funds, Land Compensation details, Fair Adangals, Removed pensions list in Devipatnam and Gangavaram mandals, List of Existing mining quarries in agency tracts from AD, Mines Rajahmundry.",
        ],
      },
      {
        heading: "Policy actions",
        bullets: [
          "Advocated the urgency to frame Rules under PESA Act. The Rules were finally framed in 2011.",
          "Challenged the notification issued by the Government of Andhra Pradesh at the High Court for conducting auctions to give licenses to run liquor shops in the Scheduled Areas. This is against the PESA Act and attempts to override the powers of the gram sabhas.",
          "Engaged with the NTFP, India, and AP Girijan Sangham assailing the order of the Supreme Court passed for eviction of tribals in the cases of rejections of their claims under Recognition of Forest Rights Act.",
          "Lobbied with the Tribal Welfare authorities to follow the 'reservation' norms in the Scheduled Areas to fill up the Teachers' posts with Scheduled Tribe candidates as per GO Ms 3.",
          "Challenged the GO Ms 76 issued by Government of Andhra Pradesh considering the major son only as a separate family unit thus ignoring the rights of a major daughter for the rehabilitation and resettlement benefit under Project Displacement.",
          "Moved to resist delivery of 4000 acres of land situated in 6 hamlets of Manturu estate village in Devipatnam mandal, East Godavari District to a non-adivasi 'inamdar' based on an earlier District Court order.",
          "Made representations to State Human Rights Commission (SHRC) on the issue of compensation for the lands under Musirimilli Project, East Godavari district, thereby drawing attention to the non-implementation of Relief and Rehabilitation Package under Polavaram Project.",
          "Challenged the proposal for extension of Judicial Courts to Agency areas to deal with civil matters in the Supreme Court and lobbied with the Tribal Welfare Department for continuation of executive courts which are more accessible to tribal communities as the procedures are relatively simple. The High Power Committee accepted our contention in the Supreme Court of India. The Supreme Court of India then up held the contention and ordered the continuance of the existing Agency Courts.",
          "Challenged the monopoly power of Girijan Co-operative Corporation (GCC) over minor forest produce as indicated in PESA in order to empower the gram sabhas with authority to take decisions on sale of minor forest produce. The High Court permitted the adivasis' to sell their minor forest produce outside the Scheduled Areas.",
        ],
      },
    ],
    bullets: [
      "About 25,000 acres of land rights reclaimed through legal recourse and administrative action.",
      "Legal awareness for youth, women, panchayat representatives, and officials.",
      "Policy contributions for FRA guidelines, PESA rules, and related governance frameworks.",
    ],
  },
  "/what-we-do/hbhc": {
    title: "Herbal Based Health Care",
    short: "Traditional knowledge and community health",
    image: referenceProgramImages[1],
    content:
      "In remote Adivasi regions with limited mainstream healthcare access, Vanantharam (promoted by LAYA) supports legitimization of herbal-based medicine to complement existing systems.",
    sections: [
      {
        heading: "Program focus",
        paragraph:
          "Before state intervention, many diseases were treated through rich traditional health knowledge. LAYA's HBHC work strengthens, documents, and validates these systems for community well-being.",
        image: referenceProgramImages[1],
      },
      {
        heading: "Core interventions",
        bullets: [
          "Promoting Herbal Based Health Care at local level",
          "Promoting standardisation of herbal medicines",
          "Facilitating herbal gardens and medicinal nurseries",
          "Training Adivasi youth in medicine preparation and local practice",
          "Refresher trainings for community and traditional health practitioners",
          "Special trainings for NGO personnel and students",
          "Licensed pharmacy support and herbal exhibitions for public awareness",
        ],
      },
    ],
    bullets: [
      "Promotion of local herbal health care and standardized medicine preparation.",
      "Training for youth and community health practitioners.",
      "Herbal gardens, medicinal nurseries, exhibitions, and licensed pharmacy support.",
    ],
  },
  "/what-we-do/srm": {
    title: "Sustainable Resource Management",
    short: "Water, agriculture, and biodiversity",
    image: referenceProgramImages[2],
    content:
      "Though the region receives significant rainfall, exploitative conditions keep communities cash-poor and ecologically vulnerable. LAYA promotes resilient farming and biodiversity restoration through NRM interventions.",
    sections: [
      {
        heading: "Promotion of Sustainable Farming",
        paragraph:
          "LAYA supports diversification of crops, productivity improvements, and food security with value-added farming technologies, reaching approximately 10,000 farmer households across Andhra Pradesh.",
        image: referenceProgramImages[2],
      },
      {
        heading: "Promotion of Biodiversity",
        bullets: [
          "Seed centers and conservation of rare crop seed varieties",
          "Seed festivals and biodiversity promotion",
          "Broom grass cultivation and NTFP regeneration",
          "Ethno-botany studies and ecosystem stewardship on degraded lands",
        ],
      },
      {
        heading: "Recognition",
        paragraph:
          "LAYA received the Andhra Pradesh State Biodiversity Conserver Award for work in community herbal systems, biodiversity research, and conservation-focused agriculture and forest regeneration.",
      },
    ],
    bullets: [
      "Outreach to around 10,000 farmer households in four districts.",
      "Sustainable farming, value-added technologies, and climate-resilient practices.",
      "Seed centers, seed festivals, NTFP regeneration, and biodiversity conservation.",
    ],
  },
  "/what-we-do/lifelong-learning": {
    title: "Lifelong Learning",
    short: "Youth and women leadership pathways",
    image: referenceProgramImages[3],
    content:
      "Mainstream education often disconnects Adivasi youth from local history, culture, and rights. LAYA's lifelong learning strengthens contextual understanding, practical skills, and leadership development.",
    sections: [
      {
        heading: "Outreach",
        paragraph:
          "The lifelong learning unit reaches youth and women in East Godavari, Visakhapatnam, Vizianagaram, and Srikakulam districts. It engages directly with 4,000+ youth and indirectly through 100+ CBOs in 1,000+ villages.",
        image: referenceProgramImages[3],
      },
      {
        heading: "Programs",
        bullets: [
          "Adult crash literacy program",
          "Community college initiative with short and long-term trainings",
          "Environmental education and sustainable development courses",
          "Climate change education in Adivasi schools",
          "Campaign outreach to over 20,000 young Adivasi men and women",
        ],
      },
    ],
    bullets: [
      "Direct outreach to 4,000+ youth, with around 50% young women.",
      "Adult crash literacy, community college pathways, and climate education.",
      "Indirect engagement through CBO networks across 1,000+ villages.",
    ],
  },
  "/what-we-do/climate-crisis-sustainable-development": {
    title: "Climate Crisis and Sustainable Development",
    short: "Local energy and climate justice",
    image: referenceProgramImages[4],
    content:
      "Climate change impacts worsen existing vulnerabilities for Adivasi communities dependent on natural resources. LAYA advances climate resilience, local technologies, awareness, and policy advocacy.",
    sections: [
      {
        heading: "Climate vulnerability context",
        paragraph:
          "Erratic rainfall, rising temperatures, and extreme weather intensify marginalization in Adivasi regions. LAYA's interventions build local adaptation and resilience in this context.",
        image: referenceProgramImages[4],
      },
      {
        heading: "Focus areas",
        bullets: [
          "Community resilience to climate change",
          "Climate-friendly technologies",
          "Climate change awareness and education",
          "Policy advocacy",
          "Inclusive and climate-resilient coastal ecosystem model pilots",
        ],
      },
    ],
    bullets: [
      "Community resilience and local adaptation-oriented planning.",
      "Climate-friendly technologies and decentralized energy approaches.",
      "Education, awareness, and policy advocacy for climate justice.",
    ],
  },
};

const WhatWeDoCategory = () => {
  const location = useLocation();
  const page = categories[location.pathname as keyof typeof categories] ?? categories["/what-we-do/rla"];

  return (
    <>
      <Helmet>
        <title>{page.title} | LAYA</title>
        <meta name="description" content={page.content} />
      </Helmet>
      <MainLayout>
        <PageHero
          title={page.title}
          subtitle={page.short}
          image={page.image}
          imageAlt={page.title}
        />

        <section className="laya-section pb-20 md:pb-28">
          <div className="container-narrow mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="laya-panel-solid rounded shadow-xl p-8 md:p-12 border border-[#5BC0DE]/20">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5BC0DE] to-[#4aa3c0] rounded flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 font-body leading-relaxed">
                    {page.content}
                  </p>
                </div>
              </div>
            </motion.div>

            {(page.title === "Safeguarding Adivasi Rights for Social Justice" || page.title === "Herbal Based Health Care" || page.title === "Sustainable Resource Management" || page.title === "Lifelong Learning" || page.title === "Climate Crisis and Sustainable Development") && page.sections.length >= 2 ? (
              <>
                <div className="grid md:grid-cols-2 gap-8">
                  {page.sections.slice(0, 2).map((section, index) => (
                    <motion.article
                      key={`${page.title}-${section.heading ?? section.paragraph ?? "section"}`}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12, duration: 0.6 }}
                      className="bg-white rounded shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[#5BC0DE]/20"
                    >
                      {section.heading && (
                        <div className="bg-gradient-to-r from-[#5BC0DE] to-[#4aa3c0] px-8 py-6">
                          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
                            {section.heading}
                          </h2>
                        </div>
                      )}
                      <div className="p-8 md:p-12">
                        {section.image && (
                          <div className="relative mb-8 group overflow-hidden rounded">
                            <img
                              src={section.image}
                              alt={section.heading ?? page.title}
                              loading="lazy"
                              className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        )}
                        {section.paragraph && (
                          <p className="text-gray-700 font-body text-lg leading-relaxed mb-8">
                            {section.paragraph}
                          </p>
                        )}
                        {section.bullets && (
                          <ul className="space-y-4">
                            {section.bullets.map((item, i) => (
                              <li key={i} className="flex gap-4 text-gray-700 font-body text-lg leading-relaxed items-start">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#5BC0DE] to-[#4aa3c0] rounded flex items-center justify-center shrink-0 mt-0.5">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </div>
                {page.sections.length > 2 && (
                  <div className="mt-16 space-y-16">
                    {page.sections.slice(2).map((section, index) => (
                      <motion.article
                        key={`${page.title}-${section.heading ?? section.paragraph ?? "section"}`}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.12, duration: 0.6 }}
                        className="bg-white rounded shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[#5BC0DE]/20"
                      >
                        {section.heading && (
                          <div className="bg-gradient-to-r from-[#5BC0DE] to-[#4aa3c0] px-8 py-6">
                            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
                              {section.heading}
                            </h2>
                          </div>
                        )}
                        <div className="p-8 md:p-12">
                          {section.image && (
                            <div className="relative mb-8 group overflow-hidden rounded">
                              <img
                                src={section.image}
                                alt={section.heading ?? page.title}
                                loading="lazy"
                                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          )}
                          {section.paragraph && (
                            <p className="text-gray-700 font-body text-lg leading-relaxed mb-8">
                              {section.paragraph}
                            </p>
                          )}
                          {section.bullets && (
                            <ul className="space-y-4">
                              {section.bullets.map((item, i) => (
                                <li key={i} className="flex gap-4 text-gray-700 font-body text-lg leading-relaxed items-start">
                                  <div className="w-8 h-8 bg-gradient-to-br from-[#5BC0DE] to-[#4aa3c0] rounded flex items-center justify-center shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-16">
                {page.sections.map((section, index) => (
                  <motion.article
                    key={`${page.title}-${section.heading ?? section.paragraph ?? "section"}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12, duration: 0.6 }}
                    className="bg-white rounded shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[#5BC0DE]/20"
                  >
                    {section.heading && (
                      <div className="bg-gradient-to-r from-[#5BC0DE] to-[#4aa3c0] px-8 py-6">
                        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
                          {section.heading}
                        </h2>
                      </div>
                    )}
                    <div className="p-8 md:p-12">
                      {section.image && (
                        <div className="relative mb-8 group overflow-hidden rounded">
                          <img
                            src={section.image}
                            alt={section.heading ?? page.title}
                            loading="lazy"
                            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}
                      {section.paragraph && (
                        <p className="text-gray-700 font-body text-lg leading-relaxed mb-8">
                          {section.paragraph}
                        </p>
                      )}
                      {section.bullets && (
                        <ul className="space-y-4">
                          {section.bullets.map((item, i) => (
                            <li key={i} className="flex gap-4 text-gray-700 font-body text-lg leading-relaxed items-start">
                              <div className="w-8 h-8 bg-gradient-to-br from-[#5BC0DE] to-[#4aa3c0] rounded flex items-center justify-center shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {page.bullets && page.bullets.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-20"
              >
                <div className="laya-panel p-8 md:p-12 shadow-2xl">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                    Key Impact
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {page.bullets.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded p-6 hover:bg-white/20 transition-all"
                      >
                        <p className="text-white font-body text-base leading-relaxed">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default WhatWeDoCategory;
