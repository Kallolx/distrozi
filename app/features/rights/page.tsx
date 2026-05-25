import type { Metadata } from "next";
import FeatureLayout from "@/app/components/layout/FeatureLayout";
import FeaturePage, { type FeaturePageData } from "@/app/components/features/FeaturePage";

export const metadata: Metadata = {
  title: "Rights Management — Distrozi",
  description: "Protect your music ownership, licenses, and content rights across every platform.",
};

const data: FeaturePageData = {
  badge: "Feature · Rights Management",
  heroTitle: "Own your music.",
  heroTitleHighlight: "Protect it everywhere.",
  heroSubtitle:
    "Register copyrights, manage licenses, and enforce your content rights across every streaming platform — automatically.",
  accentClass: "text-amber-400",
  glowColor: "rgba(245,158,11,0.12)",
  showcaseImage: "/feature/dashboard.png",
  showcaseAlt: "Rights management and copyright protection interface",
  benefits: [
    {
      title: "Content ID protection",
      description:
        "Your catalogue is enrolled in YouTube Content ID automatically. Any use of your music online is tracked and monetised.",
      accent: "🛡️",
    },
    {
      title: "License tracking",
      description:
        "All sync licenses, mechanical licenses, and master use agreements stored in one place with expiry alerts.",
      accent: "📜",
    },
    {
      title: "Dispute resolution",
      description:
        "Our rights team handles copyright disputes, fraudulent claims, and takedown requests on your behalf.",
      accent: "⚖️",
    },
  ],
  sections: [
    {
      title: "Register your copyright with precision",
      description:
        "Proper copyright registration is the foundation of music ownership. Distrozi guides you through registering compositions and masters correctly, with the right performing rights organisations in your territory — PROs, CMOs, and collection societies worldwide.",
      image: "/features/showcase4.png",
      imageAlt: "Copyright registration interface",
    },
    {
      title: "Content ID — your music earns, even without permission",
      description:
        "Every video on YouTube that uses your track — licensed or not — is automatically claimed and monetised on your behalf. Content ID scans billions of videos continuously, so nothing slips through. You earn from every use.",
      image: "/features/showcase5.png",
      imageAlt: "YouTube Content ID claims dashboard",
    },
    {
      title: "Sync and licensing deal management",
      description:
        "Track every sync placement — films, TV, ads, games — with contract dates, fee amounts, usage terms, and expiry notifications. Never miss a licence renewal or discover an expired deal too late.",
      image: "/features/showcase6.png",
      imageAlt: "Sync licensing agreement tracker",
    },
    {
      title: "Dispute and claim handling",
      description:
        "When someone files a fraudulent copyright claim against your music, our rights team responds immediately. We prepare counter-notifications, evidence packages, and legal correspondence — so you keep your revenue while the dispute is resolved.",
      image: "/features/showcase1.png",
      imageAlt: "Copyright dispute resolution process",
    },
    {
      title: "Ownership splits and co-writer agreements",
      description:
        "Define ownership percentages between co-writers, producers, and featured artists upfront. Locked agreements prevent future disputes. Every collaborator sees only their share — nothing else.",
      image: "/features/showcase2.png",
      imageAlt: "Co-writer ownership split interface",
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
