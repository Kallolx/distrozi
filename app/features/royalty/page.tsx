import type { Metadata } from "next";
import FeatureLayout from "@/app/components/layout/FeatureLayout";
import FeaturePage, { type FeaturePageData } from "@/app/components/features/FeaturePage";

export const metadata: Metadata = {
  title: "Royalty Accounting — Distrozi",
  description:
    "Automate royalty calculations, streamline approvals, and distribute earnings to artists with complete accuracy. Built for labels managing complex catalogs at scale.",
};

const data: FeaturePageData = {
  badge: "Feature · Royalty Accounting",
  heroTitle: "Automate Your",
  heroTitleHighlight: "Royalty Accounting.",
  heroSubtitle:
    "Automate complex royalty calculations, manage multi-artist statements, and distribute earnings reliably at scale. Purpose-built for labels that need precision, speed, and full transparency.",
  accentClass: "text-[#DA35F7]",
  glowColor: "rgba(218,53,247,0.12)",
  themeColor: "#DA35F7", // Striking magenta for the highlighted card
  showcaseImage: "/feature/report.png",
  showcaseAlt: "Royalty accounting and financial dashboard",
  benefits: [
    {
      title: "Automate Back Office",
      description:
        "Cut down on the time you spend on accounting",
      image: "/features/benifit/4.png"
    },
    {
      title: "Transparent Workflows",
      description:
        "Quickly give the thumbs up to royalties and statements",
      image: "/features/benifit/12.png"
    },
    {
      title: "Client Portal Access",
      description:
        "Give clients access to a secure portal",
      image: "/features/benifit/13.png"
    },
  ],
  sections: [
    {
      title: "Automate Royalty Processing",
      description:
        "Simplify how your label handles royalty calculations and reporting. Distrozi Music automates complex workflows so you can generate accurate royalty statements across your entire catalog without manual effort. Reduce errors, save time, and scale your operations as your artist roster grows.",
      image: "/features/24.png",
      imageAlt: "Automate Royalty Processing",
    },
    {
      title: "Simplify Approval Workflows",
      description:
        "Maintain full control over your royalty process with a structured approval system. Review and approve statements before payouts are processed, ensuring complete accuracy at every stage. This workflow reduces discrepancies, improves transparency, and keeps operations organized across all your artists and releases.",
      image: "/features/25.png",
      imageAlt: "Simplify Approval Workflows",
    },
    {
      title: "Analyze Royalty Earnings",
      description:
        "Gain deeper insights into your revenue across platforms, artists, and releases. Distrozi Music provides clear, structured data so you understand exactly where income is generated and how your catalog is performing across every DSP. Identify trends, monitor growth, and make informed decisions to scale your music business.",
      image: "/features/26.png",
      imageAlt: "Analyze Royalty Earnings",
    },
    {
      title: "Accelerate Royalty Distribution",
      description:
        "Distribute earnings to your artists and collaborators quickly and reliably. Once balances are confirmed and approved, royalties flow efficiently through a secure global payment system. Support your roster with consistent, timely payments while maintaining complete control over your financial operations.",
      image: "/features/27.png",
      imageAlt: "Accelerate Royalty Distribution",
    },
    {
      title: "YouTube CMS & Channel Revenue",
      description:
        "Manage your YouTube network with full visibility and control. Track channel performance, monitor earnings, and distribute revenue accurately across multiple creators and channels. From Content ID revenue to channel monetization, everything is structured and transparent — helping you scale MCN operations without added complexity.",
      image: "/features/28.png",
      imageAlt: "YouTube CMS & Channel Revenue",
    },
    {
      title: "Secure & Flexible Global Payouts",
      description:
        "Pay every rights holder accurately through traditional or blockchain-based payment methods. Distrozi Music supports global bank transfers, PayPal, Payoneer, Wise, and digital asset options — eliminating manual tasks, reducing errors, and delivering complete transparency for every transaction.",
      image: "/features/29.png",
      imageAlt: "Secure & Flexible Global Payouts",
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
