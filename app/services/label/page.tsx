import ServiceLayout from "@/app/components/layout/ServiceLayout";
import ServicePage, { ServicePageData } from "@/app/components/services/ServicePage";

export const metadata = {
  title: "Label Solutions - Distrozi",
  description: "Enterprise-grade catalog management, global distribution, and royalty split accounting for record labels.",
};

const labelData: ServicePageData = {
  badge: "Enterprise Solutions",
  heroTitle: "The Modern Engine for",
  heroTitleHighlight: "Record Labels",
  heroSubtitle: "Scale your imprint with high-volume catalog distribution, automated royalty accounting, and dedicated platform management tailored for professional labels.",
  accentClass: "text-amber-400",
  glowColor: "rgba(243,195,67,0.12)",
  consoleType: "label",
  sections: [
    {
      id: "catalog-management",
      title: "Bulk Catalog Management",
      description: "Manage your entire imprint's catalog with professional precision. Our system is built for scale, allowing you to organize thousands of releases, manage multiple artists, and maintain flawless metadata from a single visual dashboard.",
      image: "/feature/1.png",
      imageAlt: "Label Catalog Management illustration",
      glowColor: "220 80% 50%", // Blue
      features: [
        { title: "Centralized Imprint Hub", subtitle: "Manage all your sub-labels and artists from one unified console." },
        { title: "Enterprise Metadata Auditing", subtitle: "Ensure every release adheres to strict store guidelines automatically." },
        { title: "High-Volume Batch Tools", subtitle: "Upload and schedule massive catalogs with specialized bulk workflows." },
        { title: "Secure Asset Storage", subtitle: "Store studio-grade WAV files and high-resolution artwork safely." },
        { title: "Visual Catalog Insights", subtitle: "Track the performance and lifecycle of your entire roster's music." },
        { title: "Format Verification", subtitle: "Automatically verify audio and artwork specs before delivery." },
      ],
    },
    {
      id: "rights-governance",
      title: "Rights & Ownership Governance",
      description: "Protect your label's intellectual property with total confidence. We provide the structure to define complex ownership rules, manage multi-artist rights, and enforce copyright protection across the global digital landscape.",
      image: "/feature/3.png",
      imageAlt: "Label Rights Management illustration",
      glowColor: "280 85% 55%", // Purple
      features: [
        { title: "Multi-Artist Rights Hub", subtitle: "Define ownership structures across your entire artist roster." },
        { title: "Automated Contract Splits", subtitle: "Set dynamic revenue splits between the label and its artists." },
        { title: "Advanced Ownership Ledger", subtitle: "Maintain a legally sound digital record of all distribution rights." },
        { title: "UGC Rights Enforcement", subtitle: "Protect and monetize your catalog across YouTube, Meta, and TikTok." },
        { title: "Conflict Resolution Tools", subtitle: "Directly resolve overlapping ownership claims on global platforms." },
        { title: "IP Protection & Takedowns", subtitle: "Issue automated takedown requests to protect your creative works." },
      ],
    },
    {
      id: "global-distribution",
      title: "Distribution & DSP Delivery",
      description: "Push your music to every corner of the globe. Deliver your entire catalog to 150+ stores while maintaining complete control over release schedules, pricing, and territorial availability.",
      image: "/feature/2.png",
      imageAlt: "Distribution illustration",
      glowColor: "140 85% 55%", // Green
      features: [
        { title: "Enterprise DSP Delivery", subtitle: "Direct ingestion pathways to all major streaming platforms." },
        { title: "Custom Release Strategy", subtitle: "Set unique delivery rules for different territories and markets." },
        { title: "Priority Delivery Support", subtitle: "Ensure your marquee releases go live exactly when planned." },
        { title: "Global Territory Scaling", subtitle: "Reach listeners in 180+ countries with effortless one-click delivery." },
        { title: "UGC Monetization Access", subtitle: "Maximize label revenue from creator-led content on social media." },
        { title: "Bulk Intake Processor", subtitle: "Process and ingest large catalogs into stores with zero downtime." },
      ],
    },
    {
      id: "revenue-tracking",
      title: "Revenue & Income Tracking",
      description: "Gain total visibility into your label's financial ecosystem. Track incoming earnings across all artists and platforms through a single visual ledger that eliminates manual spreadsheet errors.",
      image: "/feature/4.png",
      imageAlt: "Revenue Tracking illustration",
      glowColor: "350 85% 55%", // Pink
      features: [
        { title: "Consolidated Label Ledger", subtitle: "Track every dollar earned across your entire roster in real-time." },
        { title: "Granular Financial Reports", subtitle: "Break down revenue by artist, track, store, and geographic region." },
        { title: "Real-Time Income Sync", subtitle: "Monitor incoming gross sales as they are reported by global stores." },
        { title: "Automatic Reconciliation", subtitle: "Instantly match store statements against your catalog metadata." },
        { title: "Large-Scale Data Handling", subtitle: "Process millions of stream logs monthly with high accuracy." },
        { title: "Multi-Currency Collection", subtitle: "Collect and manage revenue in 12+ international currencies." },
      ],
    },
    {
      id: "royalty-accounting",
      title: "Royalty Accounting & Payouts",
      description: "Professional accounting designed for record labels. Automate complex tiered splits, recoup marketing costs, and provide your artists with transparent, professional earning portals.",
      image: "/feature/6.png",
      imageAlt: "Royalty Accounting illustration",
      glowColor: "40 85% 55%", // Amber
      features: [
        { title: "Automated Split Engine", subtitle: "Eliminate manual math with precise, automated royalty allocations." },
        { title: "Multi-Tier Payout Hub", subtitle: "Disburse payments to artists, producers, and labels worldwide." },
        { title: "Professional Artist Portals", subtitle: "Give your artists direct access to their own earning dashboards." },
        { title: "Recoupment Management", subtitle: "Automatically deduct production costs before split disbursements." },
        { title: "Secure Transaction Cloud", subtitle: "Process safe payouts via PayPal, Stripe, and Crypto." },
        { title: "Transparent Audit Logs", subtitle: "Build trust with your roster through clear, traceable financials." },
      ],
    },
    {
      id: "advanced-analytics",
      title: "Analytics & Demographic Insights",
      description: "Fuel your label's growth with data-driven intelligence. Deconstruct audience behaviors and listenership trends to identify the next breakout hit on your roster.",
      image: "/feature/7.png",
      imageAlt: "Analytics illustration",
      glowColor: "190 85% 55%", // Cyan
      features: [
        { title: "360° Roster Overview", subtitle: "Monitor streaming stats across all artists from one visual map." },
        { title: "Predictive Trend Analysis", subtitle: "Identify surging tracks before they go viral on social media." },
        { title: "Audience Heatmaps", subtitle: "Pinpoint exactly where your label's biggest fans reside globally." },
        { title: "Editorial Playlist Tracking", subtitle: "Monitor placements and retention across major DSP playlists." },
        { title: "Exportable Label Reports", subtitle: "Generate professional PDFs for label meetings and strategy." },
        { title: "Engagement Optimization", subtitle: "Measure how listeners interact with your roster's releases." },
      ],
    },
    {
      id: "label-support",
      title: "Label Support & Dedicated Reps",
      description: "First-class support for established imprints. Our team of experts actively manages your profile setups, resolves metadata conflicts, and provides direct platform troubleshooting.",
      image: "/feature/5.png",
      imageAlt: "Label Support illustration",
      glowColor: "0 0% 80%", // Light gray
      features: [
        { title: "YouTube OAC Verification", subtitle: "Dedicated setup and management for artist Official Channels." },
        { title: "DSP Profile Optimization", subtitle: "Guarantee every artist profile is verified and connected properly." },
        { title: "Topic Channel Merging", subtitle: "Resolve and hide incorrect or duplicate YouTube topic accounts." },
        { title: "Content ID Claim Defense", subtitle: "Handle third-party flags and protect your catalog's rights." },
        { title: "Direct Platform escalations", subtitle: "Fast-track issue resolution through our platform relationships." },
        { title: "Dedicated Account Experts", subtitle: "Recieve personalized support from experienced label managers." },
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
