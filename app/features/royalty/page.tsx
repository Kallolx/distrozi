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
  showcaseImage: "/feature/report.png",
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
      image: "/features/showcase5.png",
      imageAlt: "Multi-source royalty aggregation dashboard",
    },
    {
      title: "Collaborator splits, set once and forget",
      description:
        "Define ownership and royalty percentages per track at the time of upload. Producers, featured artists, co-writers — every collaborator gets their exact share deposited automatically. No spreadsheets, no arguments.",
      image: "/features/showcase6.png",
      imageAlt: "Collaborator royalty split setup",
    },
    {
      title: "Transparent earnings statements",
      description:
        "Every payout comes with a detailed statement broken down by platform, territory, and time period. Collaborators receive their own view of only their earnings — private, secure, and audit-ready.",
      image: "/features/showcase1.png",
      imageAlt: "Detailed earnings statement view",
    },
    {
      title: "Tax documentation, automated",
      description:
        "Year-end tax documents, withholding calculations, and country-specific compliance forms generated automatically. We support W-8, W-9, and international equivalents — so your accountant has everything they need.",
      image: "/features/showcase2.png",
      imageAlt: "Tax documentation and compliance forms",
    },
    {
      title: "Dispute resolution for royalty discrepancies",
      description:
        "Found a discrepancy between what a platform reports and what you received? Our accounting team investigates and resolves royalty disputes directly with DSPs, PROs, and collection societies — with full documentation of the outcome.",
      image: "/features/showcase3.png",
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
