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
  showcaseImage:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&h=1080&q=80",
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
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Real-time streaming analytics chart",
    },
    {
      title: "Territory insights that inform your strategy",
      description:
        "Is your latest track blowing up in Brazil or gaining traction in South Korea? Our territory heat maps and city-level breakdowns show you where your audience actually lives — so you can target playlisting, ads, and touring accordingly.",
      image:
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Geographic listener heat map",
    },
    {
      title: "Playlist placement tracking",
      description:
        "Know every editorial and user-generated playlist your tracks land on. Monitor follower counts, stream contributions per playlist, and how long you stay on each list. Playlist data is your most actionable growth metric.",
      image:
        "https://images.unsplash.com/photo-1495434786317-5ded47c49b56?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Playlist tracking analytics",
    },
    {
      title: "Revenue analytics across every source",
      description:
        "Streaming royalties, Content ID claims, YouTube ad revenue, sync fees — all broken down in a single revenue chart. Filter by platform, territory, or time period. Export to CSV for your accountant in seconds.",
      image:
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Revenue analytics breakdown chart",
    },
    {
      title: "Performance reports, automatically generated",
      description:
        "Schedule weekly or monthly PDF reports delivered to your inbox. Share them with your manager, label, or investors without logging into any dashboard. Customise what's included per stakeholder.",
      image:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&h=900&q=75",
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
