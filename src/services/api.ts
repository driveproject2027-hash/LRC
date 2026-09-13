import axios from "axios";
import { referenceProgramImages, referenceStoryImages } from "@/assets/referenceAssets";

// WordPress REST API base URL can be configured by the deployment environment.
const WP_API_BASE = import.meta.env.VITE_WP_API_URL || "";

const api = axios.create({
  baseURL: WP_API_BASE,
  timeout: 10000,
});

// Types
export interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  impactMetrics: { label: string; value: string }[];
}

export interface Story {
  id: number;
  title: string;
  author: string;
  content: string;
  excerpt: string;
  image: string;
  date: string;
}

export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  photo: string;
  bio: string;
}

export interface TimelinePhase {
  id: number;
  year: string;
  phase: string;
  description: string;
  image?: string;
}

export interface ImpactMetric {
  id: number;
  title: string;
  number: string;
  description: string;
  icon?: string;
}

export interface Partner {
  id: number;
  name: string;
  logo?: string;
  url?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  category: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  photo?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Mock data from laya.org.in
export const mockPrograms: Program[] = [
  {
    id: 1,
    title: "Safeguarding Adivasi Rights for Social Justice",
    description: "Human rights are basic rights for human existence and refer more specifically to the socio-economic and cultural rights of the Adivasi communities. LAYA works to strengthen land rights, self-governance through Community Forest Rights under FRA, gram sabha empowerment, and PESA implementation across the Eastern Ghats.",
    image: referenceProgramImages[0],
    category: "Rights",
    impactMetrics: [{ label: "Villages Covered", value: "500+" }],
  },
  {
    id: 2,
    title: "Herbal Based Health Care",
    description: "LAYA legitimizes the practice of herbal based medicine to complement prevailing mainstream health care systems. We integrate traditional Adivasi healing knowledge with modern public health approaches to address malnutrition and strengthen community health practices in tribal areas.",
    image: referenceProgramImages[1],
    category: "Health",
    impactMetrics: [{ label: "Communities Served", value: "300+" }],
  },
  {
    id: 3,
    title: "Sustainable Resource Management",
    description: "LAYA through its NRM Unit enables communities to improve agriculture productivity by watershed management and value added technologies. We promote sustainable agriculture, millet revival, non-timber forest produce, and traditional food systems for Adivasi food sovereignty.",
    image: referenceProgramImages[2],
    category: "Environment",
    impactMetrics: [{ label: "Hectares Protected", value: "50,000+" }],
  },
  {
    id: 4,
    title: "Lifelong Learning",
    description: "LAYA capacitates young men and women towards a life-long learning process and development of skills enabling them to play a leadership role in the region. We support multilingual education, mother-tongue instruction, and preservation of Adivasi cultural heritage and indigenous knowledge systems.",
    image: referenceProgramImages[3],
    category: "Education",
    impactMetrics: [{ label: "Youth Trained", value: "10,000+" }],
  },
  {
    id: 5,
    title: "Climate Crisis and Sustainable Development",
    description: "LAYA works with Adivasi communities to harness natural resources to facilitate energy that can be produced, owned, controlled, managed and utilized by local Adivasi communities. We pioneer decentralized renewable energy solutions and climate-resilient development models.",
    image: referenceProgramImages[4],
    category: "Climate",
    impactMetrics: [{ label: "Green Projects", value: "50+" }],
  },
];

export const mockStories: Story[] = [
  {
    id: 1,
    title: "Reclaiming the Forest: A Community's Journey",
    author: "LAYA Field Team",
    content: "In the heart of the Eastern Ghats, a small village of 50 families fought for their forest rights through collective action and legal advocacy supported by LAYA's rights-based programs.",
    excerpt: "How a small Adivasi village in the Eastern Ghats reclaimed their ancestral forest rights through collective action and legal advocacy.",
    image: referenceStoryImages[0],
    date: "2024-03-15",
  },
  {
    id: 2,
    title: "Seeds of Change: Millet Revival",
    author: "LAYA NRM Unit",
    content: "Traditional millet varieties were disappearing from tribal farmlands. LAYA's sustainable resource management program helped revive indigenous farming practices.",
    excerpt: "The revival of traditional millet farming is transforming food security and reconnecting communities with their agricultural heritage.",
    image: referenceStoryImages[1],
    date: "2024-01-20",
  },
  {
    id: 3,
    title: "Mother Tongue, Mother Earth",
    author: "LAYA Education Team",
    content: "When children learn in their mother tongue, they don't just learn words — they connect with their identity, culture, and community knowledge systems.",
    excerpt: "A multilingual education initiative is preserving indigenous languages while empowering Adivasi children with quality education.",
    image: referenceStoryImages[2],
    date: "2023-11-10",
  },
];

export const mockTimeline: TimelinePhase[] = [
  { id: 1, year: "1985", phase: "Phase I: Genesis", description: "LAYA founded in Visakhapatnam as a resource center for Adivasi communities in the Eastern Ghats." },
  { id: 2, year: "1990", phase: "Phase II: Grounding", description: "Established field presence in tribal areas, began community organizing and rights-based work." },
  { id: 3, year: "1996", phase: "Phase III: Expansion", description: "Extended programs to multiple districts, launched natural resource management initiatives." },
  { id: 4, year: "2002", phase: "Phase IV: Deepening", description: "Strengthened governance programs, intensified advocacy for Forest Rights Act implementation." },
  { id: 5, year: "2008", phase: "Phase V: Consolidation", description: "Integrated approach combining livelihoods, education, health, and governance programs." },
  { id: 6, year: "2014", phase: "Phase VI: Innovation", description: "Pioneered new models for tribal self-governance, cultural preservation, and sustainable development." },
  { id: 7, year: "2020", phase: "Phase VII: Resilience", description: "Adapted programs during COVID-19, strengthened digital outreach and community networks." },
];

export const mockImpactMetrics: ImpactMetric[] = [
  { id: 1, title: "Years of Service", number: "39+", description: "Decades of dedicated work with Adivasi communities" },
  { id: 2, title: "Villages Reached", number: "1,500+", description: "Communities across the Eastern Ghats" },
  { id: 3, title: "Lives Impacted", number: "500,000+", description: "Adivasi lives touched through programs" },
  { id: 4, title: "Programs Active", number: "25+", description: "Ongoing development initiatives" },
];

export const mockPartners: Partner[] = [
  { id: 1, name: "Misereor" },
  { id: 2, name: "Bread for the World" },
  { id: 3, name: "ActionAid" },
  { id: 4, name: "Ford Foundation" },
  { id: 5, name: "UNDP India" },
  { id: 6, name: "Ministry of Tribal Affairs" },
  { id: 7, name: "NABARD" },
  { id: 8, name: "UNICEF" },
  { id: 9, name: "Ashakiran e.V." },
  { id: 10, name: "Fair Climate Services" },
];

export const mockTeam: TeamMember[] = [
  { id: 1, name: "Nafisa Goga D'Souza", designation: "Executive Director", photo: "", bio: "Founder and visionary leader of LAYA, dedicated to Adivasi rights and development for over three decades." },
  { id: 2, name: "Dominic D'Souza", designation: "Program Director", photo: "", bio: "Leading LAYA's program strategy and community engagement across the Eastern Ghats region." },
  { id: 3, name: "Myron Mendes", designation: "Senior Program Manager", photo: "", bio: "Spearheading governance and land rights programs with deep field experience." },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: "I was really impressed with the farming project. The training is conducted in a very considerate and practical way. I really believe that the methods the young farmers are taught will change their and their communities lives in a very sustainable way.",
    name: "Jonas Riedel",
    role: "Germany",
  },
  {
    id: 2,
    quote: "LAYA has been a pioneer in the social field. They were creative twenty years ago in the villages and recently in the field of climate change. I've learnt a lot from LAYA, which has aided my work in Mumbai.",
    name: "Allwyn D'Silva",
    role: "Head - Archdiocesan Office for Environment",
  },
  {
    id: 3,
    quote: "LAYA is one of the unique organisations, which combines grassroots activism and negotiates for Adivasi rights at wide-ranging platforms. It has managed to bring the voices of the people to the centre stage.",
    name: "Gagan Sethi",
    role: "Chairperson, JANVIKAS",
  },
  {
    id: 4,
    quote: "LAYA is the only NGO that I know of that works at grassroots levels to provide energy access and livelihoods in tribal villages and also engages in national and international levels policy advocacy on climate change issues.",
    name: "Priyadarshani Karve",
    role: "Director, Samuchit Enviro Tech Pvt Ltd, Pune",
  },
  {
    id: 5,
    quote: "The cooperation between LAYA and Misereor has been a long and trustful relationship (about 20 years). Misereor has always admired the commitment and competence of the LAYA team.",
    name: "Kesuma Saddak",
    role: "Programme Officer for India, Misereor",
  },
  {
    id: 6,
    quote: "I am honoured and proud to have been closely associated with LAYA for over two decades. LAYA with its commitment, sacrifice and innovative dynamic leadership has brought peace and happiness among thousands of dalits, tribals and marginal farmers.",
    name: "K.C. Malhotra",
    role: "Professor",
  },
];

// API functions
export const submitContactMessage = async (submission: ContactSubmission): Promise<void> => {
  await api.post("/contact", submission);
};

export const getPrograms = async (): Promise<Program[]> => mockPrograms;
export const getStories = async (): Promise<Story[]> => mockStories;
export const getTeam = async (): Promise<TeamMember[]> => mockTeam;
export const getTimeline = async (): Promise<TimelinePhase[]> => mockTimeline;
export const getImpact = async (): Promise<ImpactMetric[]> => mockImpactMetrics;
export const getPartners = async (): Promise<Partner[]> => mockPartners;
export const getGallery = async (): Promise<GalleryItem[]> => [];

export default api;
