import { Metadata } from "next";
import ServiceLayout from "../components/layout/ServiceLayout";
import FAQ from "../components/sections/FAQ";
import RelatedBlogsGrid from "../components/sections/RelatedBlogsGrid";

export const metadata: Metadata = {
  title: "Distrozi - Frequently Asked Questions",
  description:
    "Everything you need to know about Distrozi Distribution, royalties, ownership, dashboard, and payouts.",
};

export default function FAQPage() {
  return (
    <ServiceLayout>
      <div className="pt-24 pb-12 min-h-screen flex flex-col justify-center">
        <FAQ />
      </div>
      <RelatedBlogsGrid
        heading="Helpful"
        highlightedHeading="FAQ Reads"
        relatedSlugs={[
          "best-music-distribution",
          "best-music-distributor-with-youtube-content-id",
          "best-music-distributor-with-publishing-administration",
          "most-affordable-music-distribution-service",
          "top-free-music-distribution-companies",
          "best-free-music-distribution",
          "fastest-music-distribution-service",
          "free-music-distribution-with-youtube-content-id",
          "best-music-distributor-2026",
          "how-royalties-are-calculated",
          "music-distribution-pricing-comparison",
          "isrc-explained",
          "upc-explained",
          "ddex-explained",
          "how-youtube-content-id-works",
        ]}
      />
    </ServiceLayout>
  );
}
