import type { Metadata } from "next";
import FeatureLayout from "@/app/components/layout/FeatureLayout";
import FeaturePage, { type FeaturePageData } from "@/app/components/features/FeaturePage";

export const metadata: Metadata = {
  title: "Royalty Accounting — Distrozi",
  description: "Transparent royalty splits, real-time financial reports, and on-time payments for every collaborator.",
};

const data: FeaturePageData = {
  badge: "Feature · Royalty Accounting",
  heroTitle: "Every dollar tracked.",
  heroTitleHighlight: "Every split, transparent.",
  heroSubtitle:
    "Automated royalty calculations, real-time earnings dashboards, and on-time payments to every collaborator on your releases.",
  accentClass: "text-rose-400",
  glowColor: "rgba(244,63,94,0.10)",
  showcaseImage:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&h=1080&q=80",
  showcaseAlt: "Royalty accounting and financial dashboard",
  benefits: [
    {
      title: "Automated splits",
      description:
        "Define royalty splits once per release. Distrozi calculates and distributes each collaborator's share automatically every payout cycle.",
      accent: "✂️",
    },
    {
      title: "Multi-source aggregation",
      description:
        "Streaming, Content ID, sync, and performance royalties all collected and consolidated into a single monthly statement.",
      accent: "🔗",
    },
    {
      title: "On-time payments",
      description:
        "Payouts processed on a fixed schedule — no delays, no excuses. Bank transfer, PayPal, or Wise supported globally.",
      accent: "💸",
    },
  ],
  sections: [
    {
      title: "Royalties collected from every source",
      description:
        "Mechanical royalties, performance royalties, neighbouring rights, streaming micro-payments, YouTube ad revenue — Distrozi aggregates earnings from every income source into a single monthly statement. No more chasing PROs or missing platform payouts.",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Multi-source royalty aggregation dashboard",
    },
    {
      title: "Collaborator splits, set once and forget",
      description:
        "Define ownership and royalty percentages per track at the time of upload. Producers, featured artists, co-writers — every collaborator gets their exact share deposited automatically. No spreadsheets, no arguments.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Collaborator royalty split setup",
    },
    {
      title: "Transparent earnings statements",
      description:
        "Every payout comes with a detailed statement broken down by platform, territory, and time period. Collaborators receive their own view of only their earnings — private, secure, and audit-ready.",
      image:
        "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Detailed earnings statement view",
    },
    {
      title: "Tax documentation, automated",
      description:
        "Year-end tax documents, withholding calculations, and country-specific compliance forms generated automatically. We support W-8, W-9, and international equivalents — so your accountant has everything they need.",
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Tax documentation and compliance forms",
    },
    {
      title: "Dispute resolution for royalty discrepancies",
      description:
        "Found a discrepancy between what a platform reports and what you received? Our accounting team investigates and resolves royalty disputes directly with DSPs, PROs, and collection societies — with full documentation of the outcome.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Royalty dispute investigation interface",
    },
  ],
};

export default function RoyaltyPage() {
  return (
    <FeatureLayout>
      <FeaturePage data={data} currentHref="/features/royalty" />
    </FeatureLayout>
  );
}
