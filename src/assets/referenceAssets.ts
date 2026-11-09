import logo from "@/assets/reference/logo.png";
import rights from "@/assets/reference/rights.jpg";
import health from "@/assets/reference/health.jpg";
import srm from "@/assets/reference/srm.jpg";
import climate from "@/assets/reference/climate.jpg";
import youth from "@/assets/reference/youth.jpg";
import covidBanner from "@/assets/reference/covid-banner.jpg";
import gallery25 from "@/assets/reference/gallery-25.jpg";
import gallery16 from "@/assets/reference/gallery-16.jpg";
import gallery23 from "@/assets/reference/gallery-23.jpg";
import gallery22 from "@/assets/reference/gallery-22.jpg";
import chronicle from "@/assets/reference/chronicle.jpg";
import hbhcPublication from "@/assets/reference/hbhc-publication.jpg";

export const referenceLogo = logo;
export const referenceHero = rights;
export const referenceProgramImages = [rights, health, srm, youth, climate];
export const referenceStoryImages = [gallery25, gallery16, gallery23];
export const referenceGalleryImages = [
  { src: gallery25, title: "Gravity Water Flow Scheme", category: "Water" },
  { src: gallery16, title: "Literacy Program for Tribal Women", category: "Education" },
  { src: gallery23, title: "SRI Paddy Cultivation", category: "Agriculture" },
  { src: gallery22, title: "Energy Efficient Wood Stove", category: "Climate" },
  { src: rights, title: "Safeguarding Adivasi Rights", category: "Rights" },
  { src: youth, title: "Youth and Women Leadership", category: "Leadership" },
];

export const referencePublications = {
  chronicle,
  hbhcPublication,
  covidBanner,
};

export {
  logo,
  rights,
  health,
  srm,
  climate,
  youth,
  gallery16,
  gallery22,
  gallery23,
  gallery25,
  chronicle,
  hbhcPublication,
  covidBanner,
};
