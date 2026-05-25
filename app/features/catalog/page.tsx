import type { Metadata } from "next";
import FeatureLayout from "@/app/components/layout/FeatureLayout";
import FeaturePage, { type FeaturePageData } from "@/app/components/features/FeaturePage";

export const metadata: Metadata = {
  title: "Catalog Management — Distrozi",
  description: "Organize your entire music catalogue — metadata, artwork, audio files, and releases — all in one place.",
};

const data: FeaturePageData = {
  badge: "Feature · Catalog Management",
  heroTitle: "Your entire catalogue,",
  heroTitleHighlight: "perfectly organized.",
  heroSubtitle:
    "Manage metadata, artwork, audio files, and release schedules from a single, intuitive dashboard.",
  accentClass: "text-blue-400",
  glowColor: "rgba(59,130,246,0.12)",
  showcaseImage: "/feature/dashboard.png",
  showcaseAlt: "Catalog management dashboard",
  benefits: [
    {
      title: "Unified library",
      description:
        "All your releases, singles, EPs and albums live in one structured, searchable library — never lose a track again.",
      accent: "📂",
    },
    {
      title: "Metadata precision",
      description:
        "ISRC codes, credits, composers, and genre tagging done right. Accurate metadata means better discoverability.",
      accent: "🏷️",
    },
    {
      title: "Artwork & assets",
      description:
        "Upload high-resolution artwork and promotional assets per release, with automated format compliance checks.",
      accent: "🖼️",
    },
  ],
  sections: [
    {
      title: "One place for every release you've ever made",
      description:
        "No more scattered folders or lost files. Distrozi's Catalog Manager centralizes your entire discography — from your first demo to your latest single — in a clean, searchable dashboard. Filter by genre, release date, label, or artist in seconds.",
      image: "/features/showcase1.png",
      imageAlt: "Music library organized on screen",
    },
    {
      title: "Rich metadata that platforms actually accept",
      description:
        "Correct ISRC, ISWC, UPC codes and proper contributor credits aren't optional — they're required for royalties. Our smart metadata editor validates every field before you distribute, so you never lose earnings to bad data.",
      image: "/features/showcase2.png",
      imageAlt: "Metadata editing interface",
    },
    {
      title: "Artwork and asset management built in",
      description:
        "Upload cover art once and Distrozi auto-generates every platform-specific variant — Spotify squares, Apple banners, YouTube thumbnails. No Photoshop required. Version control keeps your art history clean.",
      image: "/features/showcase3.png",
      imageAlt: "Artwork management panel",
    },
    {
      title: "Release scheduling and drafts",
      description:
        "Plan your releases weeks in advance. Set embargo dates, coordinate pre-saves, and keep drafts private until you're ready. Every release goes through a pre-flight checklist so nothing ships with missing data.",
      image: "/features/showcase4.png",
      imageAlt: "Release calendar and scheduling",
    },
    {
      title: "Collaboration and team access",
      description:
        "Invite managers, producers, and A&R contacts with role-based permissions. Everyone sees what they need, nothing they don't. Activity logs track every change, so you always know what happened and who did it.",
      image: "/features/showcase5.png",
      imageAlt: "Team collaboration dashboard",
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
