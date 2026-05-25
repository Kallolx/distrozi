import type { Metadata } from "next";
import FeatureLayout from "@/app/components/layout/FeatureLayout";
import FeaturePage, { type FeaturePageData } from "@/app/components/features/FeaturePage";

export const metadata: Metadata = {
  title: "Analytics Insights — Distrozi",
  description: "Real-time streaming data, audience demographics, and revenue analytics for independent artists.",
};

const data: FeaturePageData = {
  badge: "Feature · Analytics Insights",
  heroTitle: "Know your audience.",
  heroTitleHighlight: "Grow your reach.",
  heroSubtitle:
    "Real-time streaming data, listener demographics, revenue trends, and territory breakdowns — all in one dashboard.",
  accentClass: "text-emerald-400",
  glowColor: "rgba(16,185,129,0.12)",
  showcaseImage: "/feature/analytics.png",
  showcaseAlt: "Analytics dashboard showing streaming data",
  benefits: [
    {
      title: "Real-time streams",
      description:
        "Watch your play counts update in near real-time across all platforms. No more waiting 48 hours for yesterday's data.",
      accent: "📊",
    },
    {
      title: "Audience breakdown",
      description:
        "Know exactly who your listeners are — age, gender, city, country — and where your next tour stop should be.",
      accent: "🎯",
    },
    {
      title: "Revenue forecasting",
      description:
        "Predictive royalty estimates based on current streaming velocity. Know what's coming before the payout.",
      accent: "📈",
    },
  ],
  sections: [
    {
      title: "Streams, saves, and skips — all in real time",
      description:
        "Distrozi aggregates data from Spotify, Apple Music, YouTube, Deezer and 20+ other platforms into one unified feed. See which track is climbing, which is dropping, and act before the algorithm does it for you.",
      image: "/features/showcase3.png",
      imageAlt: "Real-time streaming analytics chart",
    },
    {
      title: "Territory insights that inform your strategy",
      description:
        "Is your latest track blowing up in Brazil or gaining traction in South Korea? Our territory heat maps and city-level breakdowns show you where your audience actually lives — so you can target playlisting, ads, and touring accordingly.",
      image: "/features/showcase4.png",
      imageAlt: "Geographic listener heat map",
    },
    {
      title: "Playlist placement tracking",
      description:
        "Know every editorial and user-generated playlist your tracks land on. Monitor follower counts, stream contributions per playlist, and how long you stay on each list. Playlist data is your most actionable growth metric.",
      image: "/features/showcase5.png",
      imageAlt: "Playlist tracking analytics",
    },
    {
      title: "Revenue analytics across every source",
      description:
        "Streaming royalties, Content ID claims, YouTube ad revenue, sync fees — all broken down in a single revenue chart. Filter by platform, territory, or time period. Export to CSV for your accountant in seconds.",
      image: "/features/showcase6.png",
      imageAlt: "Revenue analytics breakdown chart",
    },
    {
      title: "Performance reports, automatically generated",
      description:
        "Schedule weekly or monthly PDF reports delivered to your inbox. Share them with your manager, label, or investors without logging into any dashboard. Customise what's included per stakeholder.",
      image: "/features/showcase1.png",
      imageAlt: "Automated performance report",
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
