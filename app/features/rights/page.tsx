import type { Metadata } from "next";
import FeatureLayout from "@/app/components/layout/FeatureLayout";
import FeaturePage, { type FeaturePageData } from "@/app/components/features/FeaturePage";

export const metadata: Metadata = {
  title: "Rights Management — Distrozi",
  description:
    "Stay in full control of your music rights. Define ownership, manage splits, and protect your earnings with precision rights management built for independent artists.",
};

const data: FeaturePageData = {
  badge: "Feature · Rights Management",
  heroTitle: "Own Your Music.",
  heroTitleHighlight: "Protect Every Note.",
  heroSubtitle:
    "Define ownership, manage splits, and protect your catalog across every platform. Your rights are your livelihood — we make sure they're always in order.",
  accentClass: "text-[#EA621F]",
  glowColor: "rgba(234,98,31,0.12)",
  themeColor: "#EA621F", // Vibrant orange for highlighted card
  showcaseImage: "/feature/royalti.png",
  showcaseAlt: "Rights management and copyright protection interface",
  benefits: [
    {
      title: "Clear Ownership Structure",
      description:
        "Tailored logic for intricate rights conditions.",
      image: "/features/benifit/5.png"
    },
    {
      title: "Flexible Split Management",
      description:
        "Get detailed reports.",
      image: "/features/benifit/4.png"
    },
    {
      title: "Secure Rights Protection",
      description:
        "Make royalty payments easier to get right.",
      image: "/features/benifit/6.png"
    },
  ],
  sections: [
    {
      title: "Digital Contracts",
      description:
        "Create, customize, and manage music contracts in a structured digital environment. Whether working with a few collaborators or large teams, ensure every agreement is clearly defined, securely stored, and fully compliant with industry standards.",
      image: "/features/8.png",
      imageAlt: "Digital Contracts interface",
    },
    {
      title: "Rights Management",
      description:
        "Organize and process complex rights data with ease, including publishing splits and ownership details. Our system ensures every contributor’s share is accurately recorded and maintained across all projects.",
      image: "/features/9.png",
      imageAlt: "Rights Management split tracking",
    },
    {
      title: "Royalty Splits",
      description:
        "Automatically calculate and distribute royalties to all collaborators with precision. Eliminate manual errors, reduce delays, and ensure that every stakeholder receives their correct share on time.",
      image: "/features/10.png",
      imageAlt: "Royalty Splits calculation",
    },
    {
      title: "Smart Contracts",
      description:
        "Leverage blockchain-based smart contracts to automate agreements and payments. Provide a secure, transparent, and tamper-resistant system that builds trust among all collaborators.",
      image: "/features/11.png",
      imageAlt: "Smart Contracts and blockchain agreements",
    },
  ],
};

export default function RightsPage() {
  return (
    <FeatureLayout>
      <FeaturePage data={data} currentHref="/features/rights" />
    </FeatureLayout>
  );
}
