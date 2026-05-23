import ServiceLayout from "@/app/components/layout/ServiceLayout";
import ServicePage, { ServicePageData } from "@/app/components/services/ServicePage";

export const metadata = {
  title: "Label Solutions - Distrozi",
  description: "Enterprise-grade catalog management, global distribution, and royalty split accounting for record labels.",
};

const labelData: ServicePageData = {
  badge: "Enterprise",
  heroTitle: "Enterprise Scale for",
  heroTitleHighlight: "Modern Record Labels",
  heroSubtitle: "Take complete control of your distribution, protect copyright ownership, and automate royalty splits globally.",
  accentClass: "text-amber-400",
  glowColor: "rgba(243,195,67,0.12)",
  consoleType: "label",
  sections: [
    {
      id: "catalog-management",
      title: "Catalog Management",
      description: "Organize, audit, and scale your entire imprint's catalog from a unified dashboard. Distrozi provides a central visual system to manage releases, track credits, and store high-fidelity WAV files with absolute precision.",
      image: "/how.png",
      imageAlt: "Catalog Management illustration",
      glowColor: "220 80% 50%", // Blue
      features: [
        { title: "Bulk Uploads", subtitle: "Upload track files and excel metadata sheets effortlessly." },
        { title: "Asset Storage", subtitle: "Secure cloud hosting for high-resolution audio and artwork." },
        { title: "Automatic Format Verification", subtitle: "Ensure artwork and release titles match store guidelines automatically." },
        { title: "Batch Release Builder", subtitle: "Schedule and group multiple tracks into unified releases." },
        { title: "Smart Search & Filters", subtitle: "Retrieve specific catalogs via advanced tags and keywords." },
        { title: "Archive Exports", subtitle: "Export complete datasets in industry-standard formats instantly." },
      ],
    },
    {
      id: "rights-management",
      title: "Rights Management & Enforcement",
      description: "Secure your artists' creative works across the entire internet. Monitor online platforms and resolve copyright disputes instantly with direct platform white-listing tools.",
      image: "/ownership.png",
      imageAlt: "Rights Management illustration",
      glowColor: "280 85% 55%", // Purple
      features: [
        { title: "Global Content ID", subtitle: "Enforce digital fingerprints on YouTube, TikTok, and Meta." },
        { title: "Territory Blocklists", subtitle: "Define strict territorial blacklists and authorization rules." },
        { title: "White-List Clearance", subtitle: "Protect channel partners from copyright strikes." },
        { title: "Publishing Pipeline", subtitle: "Collect mechanical and performance royalties worldwide." },
        { title: "Dispute Resolution", subtitle: "Resolve overlapping ownership claims in real time." },
        { title: "Direct Anti-Piracy", subtitle: "Issue automated takedown requests to unverified hosts." },
      ],
    },
    {
      id: "distribution-delivery",
      title: "Distribution & DSP Delivery",
      description: "Deliver music to 150+ global stores within a few clicks. Implement customized territory-specific marketing rules and delivery schedules tailored to your label's needs.",
      image: "/youtube_cms.png",
      imageAlt: "Distribution illustration",
      glowColor: "140 85% 55%", // Green
      features: [
        { title: "Global DSP Distribution", subtitle: "Reach all major streaming platforms worldwide." },
        { title: "Custom Distribution Control", subtitle: "Set platform-level and territory-level delivery rules." },
        { title: "Fast & Reliable Delivery", subtitle: "Ensure releases go live without delays." },
        { title: "Flexible Release Strategy", subtitle: "Launch globally or regionally based on your plan." },
        { title: "UGC Monetization Integration", subtitle: "Earn from TikTok, YouTube, Facebook, Instagram, and more." },
        { title: "Bulk Delivery System", subtitle: "Distribute large volumes of content efficiently." },
      ],
    },
    {
      id: "income-tracking",
      title: "Income & Revenue Tracking",
      description: "Consolidate all incoming earnings in one visual ledger. Track daily stream logs and monitor retail sales pipelines seamlessly.",
      image: "/analytics.png",
      imageAlt: "Income Tracking illustration",
      glowColor: "350 85% 55%", // Pink
      features: [
        { title: "Live Stream Pacing", subtitle: "Track daily stream logs from top global stores." },
        { title: "Global Revenue Currency Collection", subtitle: "Collect revenue in 12+ international currencies automatically." },
        { title: "Ledger Visualizer", subtitle: "Analyze incoming gross sales and retail payouts in real time." },
        { title: "Sub-Publisher Splits", subtitle: "Log third-party collection splits dynamically." },
        { title: "Platform Audits", subtitle: "Reconcile store performance statements against raw stream logs." },
        { title: "Micro-Licensing Gains", subtitle: "Capture synchronization and sync-broadcast income pools." },
      ],
    },
    {
      id: "royalty-accounting",
      title: "Royalty Splits & Accounting",
      description: "Forget spreadsheets. Manage complex multi-tiered contributor splits, recoup visual/marketing costs, and issue direct payouts instantly.",
      image: "/support.png",
      imageAlt: "Royalty Accounting illustration",
      glowColor: "40 85% 55%", // Amber
      features: [
        { title: "Split-Contract Engine", subtitle: "Assign percentage splits to artists and contributors." },
        { title: "Invoice Automation", subtitle: "Generate monthly statements and transfer requests." },
        { title: "Direct Payouts", subtitle: "Disburse payouts via PayPal, Stripe, Crypto, or Wire." },
        { title: "Expense Recovery", subtitle: "Recoup marketing and production investments before split payouts." },
        { title: "Dynamic Recoupment", subtitle: "Track active recoupment ledgers across multi-album contracts." },
        { title: "Sub-Label Modules", subtitle: "Partition royalty ledgers for multiple sub-imprints." },
      ],
    },
    {
      id: "analytics-insights",
      title: "Analytics & Demographic Insights",
      description: "Drive your catalog strategy with raw, real-time analytics. Build detailed heatmap reports and monitor editorial playlist metrics.",
      image: "/analytics.png",
      imageAlt: "Analytics illustration",
      glowColor: "190 85% 55%", // Cyan
      features: [
        { title: "Multi-Store Tracking", subtitle: "Consolidate performance charts from Spotify, Apple, and YouTube." },
        { title: "Demographic Heatmaps", subtitle: "Pinpoint listener concentrations by age, gender, and country." },
        { title: "Playlist Analytics", subtitle: "Monitor editorial placement velocity and duration." },
        { title: "Performance Alerts", subtitle: "Get daily alerts on surging tracks and viral trends." },
        { title: "Campaign Optimization", subtitle: "Analyze conversion rates on custom smartlinks." },
        { title: "Competitor Benchmarking", subtitle: "Compare catalogue performance to current genre benchmarks." },
      ],
    },
    {
      id: "support-management",
      title: "Label Support & Imprint Management",
      description: "Govern multiple sub-labels and team members through a granular role hierarchy. Recieve first-class platform support from dedicated account representatives.",
      image: "/support.png",
      imageAlt: "Label Support illustration",
      glowColor: "0 0% 80%", // Light gray
      features: [
        { title: "Imprint Management", subtitle: "Manage multiple visual sub-imprints under a single login." },
        { title: "Role Permissions", subtitle: "Assign catalog or account access to staff members." },
        { title: "Priority Store Pitching", subtitle: "Priority pitching pipelines for time-critical drops." },
        { title: "Platform Advocacy", subtitle: "Pitch releases directly to store editorial teams." },
        { title: "Dedicated Imprint Support", subtitle: "Talk directly to senior account managers 24/7." },
        { title: "Enterprise Security", subtitle: "Lock accounts with advanced two-factor authentication." },
      ],
    },
  ],
};

export default function LabelServicesPage() {
  return (
    <ServiceLayout>
      <ServicePage data={labelData} />
    </ServiceLayout>
  );
}
