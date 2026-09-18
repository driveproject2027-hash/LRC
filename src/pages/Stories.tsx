import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import StoryCard from "@/components/StoryCard";
import { mockStories } from "@/services/api";
import { referenceStoryImages } from "@/assets/referenceAssets";

// Previously this file re-exported Publications, so the /stories route served
// the wrong content. A dedicated Stories page using the existing mockStories
// data and StoryCard component replaces it.
const Stories = () => (
  <>
    <Helmet>
      <title>Stories from the Field | LAYA</title>
      <meta
        name="description"
        content="Stories from LAYA's work with Adivasi communities — forest rights, millet farming revival, and education in the Eastern Ghats."
      />
    </Helmet>
    <MainLayout>
      <PageHero
        label="Voices from the Ground"
        title="Community Stories"
        subtitle="Firsthand accounts of change, resilience, and self-reliance"
        image={referenceStoryImages[0]}
        imageAlt="Adivasi community in the Eastern Ghats"
      />
      <section className="laya-section pb-20 md:pb-28">
        <div className="container-narrow mx-auto laya-panel-solid p-6 md:p-10 lg:p-12">
          <SectionHeading
            title="Stories from the Field"
            subtitle="Real experiences from the communities LAYA walks alongside"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStories.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i} />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  </>
);

export default Stories;
