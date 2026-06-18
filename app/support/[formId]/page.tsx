import { Metadata } from "next";
import SupportFormClient from "./SupportFormClient";
import { notFound } from "next/navigation";

// Form keys matching SUPPORT_CARDS
const VALID_FORM_IDS = [
  "yt-claim-release",
  "fb-claim-release",
  "yt-whitelist",
  "fb-ig-whitelist",
  "tiktok-safelist",
  "oac-request",
  "meta-attribution",
  "tiktok-manual-claim",
  "yt-manual-claim",
];

const FORM_TITLES: Record<string, string> = {
  "yt-claim-release": "YouTube Claim Release Request",
  "fb-claim-release": "Facebook Claim Release Request",
  "yt-whitelist": "YouTube Commercial Whitelist Request",
  "fb-ig-whitelist": "Facebook / Instagram Whitelist Request",
  "tiktok-safelist": "TikTok Commercial Safelist Request",
  "oac-request": "Official Artist Channel (OAC) Request",
  "meta-attribution": "Meta Link / Attribution Request",
  "tiktok-manual-claim": "TikTok Manual Claim Request",
  "yt-manual-claim": "YouTube Manual Claim Request",
};

interface PageProps {
  params: Promise<{ formId: string }>;
}

export async function generateStaticParams() {
  return VALID_FORM_IDS.map((formId) => ({
    formId,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { formId } = await params;
  if (!VALID_FORM_IDS.includes(formId)) {
    return {
      title: "Page Not Found | Distrozi Support",
    };
  }

  const title = FORM_TITLES[formId] || "Support Request";
  return {
    title: `Distrozi - ${title}`,
    description: `Submit your support requests for ${title.toLowerCase()} directly to the Distrozi rights department.`,
  };
}

export default async function SupportFormPage({ params }: PageProps) {
  const { formId } = await params;
  if (!VALID_FORM_IDS.includes(formId)) {
    notFound();
  }

  return <SupportFormClient formId={formId} />;
}
