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
  showcaseImage:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&h=1080&q=80",
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
      image:
        "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Copyright registration interface",
    },
    {
      title: "Content ID — your music earns, even without permission",
      description:
        "Every video on YouTube that uses your track — licensed or not — is automatically claimed and monetised on your behalf. Content ID scans billions of videos continuously, so nothing slips through. You earn from every use.",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "YouTube Content ID claims dashboard",
    },
    {
      title: "Sync and licensing deal management",
      description:
        "Track every sync placement — films, TV, ads, games — with contract dates, fee amounts, usage terms, and expiry notifications. Never miss a licence renewal or discover an expired deal too late.",
      image:
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Sync licensing agreement tracker",
    },
    {
      title: "Dispute and claim handling",
      description:
        "When someone files a fraudulent copyright claim against your music, our rights team responds immediately. We prepare counter-notifications, evidence packages, and legal correspondence — so you keep your revenue while the dispute is resolved.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&h=900&q=75",
      imageAlt: "Copyright dispute resolution process",
    },
    {
      title: "Ownership splits and co-writer agreements",
      description:
        "Define ownership percentages between co-writers, producers, and featured artists upfront. Locked agreements prevent future disputes. Every collaborator sees only their share — nothing else.",
      image:
        "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&h=900&q=75",
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
