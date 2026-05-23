import type { Metadata } from "next";
import FeatureLayout from "@/app/components/layout/FeatureLayout";
import FeaturePage, { type FeaturePageData } from "@/app/components/features/FeaturePage";

export const metadata: Metadata = {
  title: "Distribution — Distrozi",
  description: "Deliver your music to 150+ streaming platforms and stores worldwide with one click.",
};

const data: FeaturePageData = {
  badge: "Feature · Distribution",
  heroTitle: "Your music,",
  heroTitleHighlight: "everywhere it needs to be.",
  heroSubtitle:
    "Deliver tracks to Spotify, Apple Music, TIDAL, YouTube Music, and 150+ stores globally — in under 24 hours.",
  accentClass: "text-violet-400",
  glowColor: "rgba(139,92,246,0.12)",
  showcaseImage:
    "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?auto=format&fit=crop&w=1920&h=1080&q=80",
  showcaseAlt: "Music distribution to global streaming platforms",
  benefits: [
    {
      title: "150+ platforms",
      description:
        "From major DSPs to niche stores in Asia, Africa, and Latin America — your music reaches listeners everywhere.",
      accent: "🌍",
    },
    {
      title: "Under 24 hours",
      description:
        "Submit today, live tomorrow. Our priority delivery pipeline pushes your release to every platform fast.",
      accent: "⚡",
    },
    {
      title: "Keep 100% royalties",
      description:
        "No hidden cuts. Every dollar earned is yours. We make our margin on plans, not on your success.",
      accent: "💰",
    },
  ],
  sections: [
    {
      title: "Submit once, reach every platform",
      description:
        "Upload your audio once and Distrozi handles transcoding, formatting, and delivery to every platform's specification. WAV, FLAC, or MP3 — we accept them all and output what each store requires, automatically.",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Global streaming platform distribution",
    },
    {
      title: "Pre-release strategy built in",
      description:
        "Set your release date weeks ahead. Coordinate pre-saves, editorial pitching, and influencer timelines from the same dashboard. Our pre-release checklist ensures everything is in order before the launch day.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Pre-release planning calendar",
    },
    {
      title: "Takedowns and replacements, on demand",
      description:
        "Made a mistake on the master? Need to swap a track? Takedowns and audio replacements happen within hours, not weeks. No bureaucracy, no lengthy support tickets — just a click.",
      image:
        "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Content management and takedown dashboard",
    },
    {
      title: "YouTube Content ID, included",
      description:
        "Every distributed track is automatically enrolled in YouTube Content ID. Any video using your music — with or without permission — is monetized in your favour. Passive earnings from user-generated content.",
      image:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "YouTube Content ID monetization",
    },
    {
      title: "Live tracking from day one",
      description:
        "Know the exact second your track goes live on each platform. Get notified instantly and share your release links before the audience even wakes up. Delivery receipts for every store, every time.",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Real-time distribution tracking",
    },
  ],
};

export default function DistributionPage() {
  return (
    <FeatureLayout>
      <FeaturePage data={data} currentHref="/features/distribution" />
    </FeatureLayout>
  );
}
