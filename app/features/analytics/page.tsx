import type { Metadata } from "next";
import FeatureLayout from "@/app/components/layout/FeatureLayout";
import FeaturePage, { type FeaturePageData } from "@/app/components/features/FeaturePage";

export const metadata: Metadata = {
  title: "Analytics & Insights — Distrozi",
  description:
    "Turn your streaming data into actionable growth decisions. Real-time analytics across every platform — audience, revenue, trends, and more.",
};

const data: FeaturePageData = {
  badge: "Feature · Analytics & Insights",
  heroTitle: "Data That Drives",
  heroTitleHighlight: "Real Growth.",
  heroSubtitle:
    "Stop guessing what's working. Real-time streaming data, audience demographics, and platform insights — all in one powerful dashboard built for artists who take their careers seriously.",
  accentClass: "text-[#DA35F7]",
  glowColor: "rgba(218,53,247,0.12)",
  themeColor: "#802CEE", // Vivid purple for highlighting analytics
  showcaseImage: "/feature/analytics.png",
  showcaseAlt: "Analytics dashboard showing streaming data",
  benefits: [
    {
      title: "Performance Dashboard",
      description:
        "A complete 360° look at how your catalog is performing.",
      image: "/features/benifit/8.png"
    },
    {
      title: "Real-Time Streaming Data",
      description:
        "Spot trends for better choices.",
      image: "/features/benifit/9.png"
    },
    {
      title: "Audience Demographics",
      description:
        "Look for chances to enhance your success.",
      image: "/features/benifit/10.png"
    },
  ],
  sections: [
    {
      title: "Catalog Performance Analysis",
      description:
        "Get unmatched granularity into your catalog's reach. Track streaming volume and revenue trends across every release, platform, and territory from a single, high-fidelity dashboard.",
      image: "/features/18.png",
      imageAlt: "Catalog Performance Analysis",
    },
    {
      title: "Revenue Growth Tracking",
      description:
        "Visualize your financial trajectory with precision. Breakdown earnings by asset, market, and DSP to identify your primary revenue drivers and optimize your commercial strategy.",
      image: "/features/19.png",
      imageAlt: "Revenue Growth Tracking",
    },
    {
      title: "Advanced Playlist Insights",
      description:
        "Monitor your music's discovery journey in real-time. Stay notified on every playlist adds and analyze how different placements impact your streaming growth and artist momentum.",
      image: "/features/20.png",
      imageAlt: "Advanced Playlist Insights",
    },
    {
      title: "Seamless Data Portability",
      description:
        "Export high-resolution data for your entire team. Generate CSV or PDF reports with up to 1000 rows of granular analytics, making it easy to collaborate and make data-backed decisions.",
      image: "/features/21.png",
      imageAlt: "Seamless Data Portability",
    },
    {
      title: "Direct Audience Understanding",
      description:
        "Deep-dive into your fan demographics and engagement patterns. Track daily growth and location data to refine your marketing efforts and expand your global listener base.",
      image: "/features/22.png",
      imageAlt: "Direct Audience Understanding",
    },
    {
      title: "UGC & Social Impact Monitoring",
      description:
        "Gain clear visibility into your music's viral performance. Track catalog reach across TikTok, YouTube, Meta, and Vevo to measure social traction and fan interaction globally.",
      image: "/features/23.png",
      imageAlt: "UGC & Social Impact Monitoring",
    },
  ],
};

export default function AnalyticsPage() {
  return (
    <FeatureLayout>
      <FeaturePage data={data} currentHref="/features/analytics" />
    </FeatureLayout>
  );
}
