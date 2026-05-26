import type { Metadata } from "next";
import FeatureLayout from "@/app/components/layout/FeatureLayout";
import FeaturePage, {
  type FeaturePageData,
} from "@/app/components/features/FeaturePage";

export const metadata: Metadata = {
  title: "Catalog Management — Distrozi",
  description:
    "Organize your entire music catalogue with professional precision. Optimize metadata, manage releases, and maintain full visibility over your lifetime collection.",
};

const data: FeaturePageData = {
  badge: "Feature · Catalog Management",
  heroTitle: "Your Music,",
  heroTitleHighlight: "Perfectly Organized.",
  heroSubtitle:
    "Manage your entire independent music catalog with enterprise precision. Keep every single release clean, structured, and visible — from first upload to global delivery.",
  accentClass: "text-[#DA35F7]",
  glowColor: "rgba(218,53,247,0.12)",
  showcaseImage: "/feature/dashboard.png",
  showcaseAlt: "Distrozi catalog management dashboard",
  benefits: [
    {
      title: "All-in-One Dashboard",
      description: "Compatibility with all standard formats.",
      image: "/features/benifit/1.png",
    },
    {
      title: "Full Release Control",
      description:
        "Handle all your assets in a single, user-friendly platform.",
      image: "/features/benifit/2.png",
    },
    {
      title: "Smart Metadata",
      description:
        "Maximize earnings on every platform.",
      image: "/features/benifit/3.png",
    },
  ],
  sections: [
    {
      title: "Consolidate your entire discography in one place",
      description:
        "From your earliest acoustic demos to full studio albums, your entire catalog resides in a structured, rapid-search environment. Filter, tag, and modify assets in moments — completely eliminating the need to hunt through external drives or spreadsheets.",
      image: "/features/1.png",
      imageAlt: "Organized music discography workspace",
    },
    {
      title: "Metadata that translates globally",
      description:
        "Incomplete credits or missing identification codes directly cost you royalties. Our intelligent metadata validator ensures that every contributor field and ISRC is fully compliant before your submission reaches the stores.",
      image: "/features/2.png",
      imageAlt: "Store metadata optimization",
    },
    {
      title: "Absolute scheduling precision",
      description:
        "Execute your rollouts with confidence. Designate global or regional release dates, orchestrate pre-save campaigns, and visualize your entire release trajectory down to the minute on a unified calendar.",
      image: "/features/3.png",
      imageAlt: "Content launch scheduling",
    },
    {
      title: "Mass content optimization",
      description:
        "When your label grows, update thousands of tracks at once. Whether changing imprint details or enforcing standardized copyright tags, our batch management tools process catalog-wide changes instantly.",
      image: "/features/4.png",
      imageAlt: "Bulk music catalog controls",
    },
    {
      title: "Lifecycle asset tracking",
      description:
        "Monitor the digital pulse of your files. Our platform logs the exact status of your submissions, showing precisely when Apple Music, Spotify, and TikTok ingested and verified your audio packages.",
      image: "/features/5.png",
      imageAlt: "Audio package lifecycle tracking",
    },
    {
      title: "Transparent contributor credits",
      description:
        "Establish immediate financial clarity for your team. Structure split-sheets, detail precise engineering credits, and assign royalty ownership logically directly within your master catalog database.",
      image: "/features/6.png",
      imageAlt: "Collaborator credits and splits",
    },
    {
      title: "Marketplace-ready delivery",
      description:
        "Your catalog should never sit idle. Instantly route your meticulously organized tracks to 150+ international digital stores and streaming hubs with uncompromised metadata fidelity.",
      image: "/features/7.png",
      imageAlt: "Global music delivery",
    },
  ],
};

export default function CatalogPage() {
  return (
    <FeatureLayout>
      <FeaturePage data={data} currentHref="/features/catalog" />
    </FeatureLayout>
  );
}
