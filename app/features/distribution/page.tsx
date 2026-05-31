import type { Metadata } from "next";
import FeatureLayout from "@/app/components/layout/FeatureLayout";
import FeaturePage, { type FeaturePageData } from "@/app/components/features/FeaturePage";

export const metadata: Metadata = {
  title: "Distrozi - Distribution",
  description: "Deliver your catalog to 150+ digital service providers globally. Maintain total independence and keep 100% of your royalties.",
};

const data: FeaturePageData = {
  badge: "Feature · Distribution",
  heroTitle: "Release Globally.",
  heroTitleHighlight: "Unrestricted Reach.",
  heroSubtitle:
    "Deliver your music to over 150 digital service providers and social platforms instantly. Maintain total independence and keep 100% of your earnings without sacrificing control.",
  accentClass: "text-[#008DFF]",
  glowColor: "rgba(0,141,255,0.12)",
  themeColor: "#004B8C", // Sleek dark blue for highlighted card
  showcaseImage: "/feature/distribution.png",
  showcaseAlt: "Music distribution platform interface",
  benefits: [
    {
      title: "150+ Platform Network",
      description:
        "Share with all DSPs around the globe.",
      image: "/features/benifit/3.png"
    },
    {
      title: "Zero Royalty Deductions",
      description:
        "Achieve top-notch delivery standards.",
      image: "/features/benifit/7.png"
    },
    {
      title: "Precision Rollout Control",
      description:
        "Detailed management of your supply chain.",
      image: "/features/benifit/11.png"
    },
  ],
  sections: [
    {
      title: "Worldwide Audience Reach",
      description:
        "Unlock massive global visibility. Transmit your audio to premier major streams, emerging regional ecosystems in Latin America and Asia, and modern lifestyle channels encompassing gaming hubs and integrated fitness applications.",
      image: "/features/13.png",
      imageAlt: "Global music footprint map",
    },
    {
      title: "Social Ecosystem Integration",
      description:
        "Capitalize immediately on viral moments. Transform background audio into primary revenue automatically across user-generated content platforms including TikTok, YouTube Shorts, Facebook, and Instagram Reels.",
      image: "/features/14.png",
      imageAlt: "Social media music monetization",
    },
    {
      title: "Automated Compliance Audits",
      description:
        "Bypass store rejections entirely. Our distribution engine enforces strict, automated metadata validation against each DSP's distinct structural rules, guaranteeing that your releases pass inspection flawlessly the first time.",
      image: "/features/15.png",
      imageAlt: "Distribution metadata quality control",
    },
    {
      title: "Strategic Delivery Windows",
      description:
        "Command ultimate authority over your launch timing. Trigger simultaneous global drops or curate staggered releases restricted by distinct timezones, ensuring the rollout flawlessly synchronizes with your PR and marketing campaigns.",
      image: "/features/16.png",
      imageAlt: "Music delivery scheduling and timing",
    },
    {
      title: "High-Volume Intake Processing",
      description:
        "Enterprise-level handling for expanding labels. Initiate, edit, or execute comprehensive takedowns across massive multi-artist catalogs simultaneously using centralized batch operations — preventing critical delays when minutes matter.",
      image: "/features/17.png",
      imageAlt: "Batch distribution and release pipeline",
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
