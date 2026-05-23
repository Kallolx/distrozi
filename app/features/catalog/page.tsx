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
  showcaseImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&h=1080&q=80",
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
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Music library organized on screen",
    },
    {
      title: "Rich metadata that platforms actually accept",
      description:
        "Correct ISRC, ISWC, UPC codes and proper contributor credits aren't optional — they're required for royalties. Our smart metadata editor validates every field before you distribute, so you never lose earnings to bad data.",
      image:
        "https://images.unsplash.com/photo-1614680376739-414d95ff43df?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Metadata editing interface",
    },
    {
      title: "Artwork and asset management built in",
      description:
        "Upload cover art once and Distrozi auto-generates every platform-specific variant — Spotify squares, Apple banners, YouTube thumbnails. No Photoshop required. Version control keeps your art history clean.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Artwork management panel",
    },
    {
      title: "Release scheduling and drafts",
      description:
        "Plan your releases weeks in advance. Set embargo dates, coordinate pre-saves, and keep drafts private until you're ready. Every release goes through a pre-flight checklist so nothing ships with missing data.",
      image:
        "https://images.unsplash.com/photo-1484876065684-b1cf96a77b8b?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Release calendar and scheduling",
    },
    {
      title: "Collaboration and team access",
      description:
        "Invite managers, producers, and A&R contacts with role-based permissions. Everyone sees what they need, nothing they don't. Activity logs track every change, so you always know what happened and who did it.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=900&q=75",
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
