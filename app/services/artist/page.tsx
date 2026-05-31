import ServiceLayout from "@/app/components/layout/ServiceLayout";
import ServicePage, { ServicePageData } from "@/app/components/services/ServicePage";

export const metadata = {
  title: "Distrozi - Artist Solutions",
  description: "Global music distribution, smart marketing automation, automated royalty splits, and artist advances for independent creators.",
};

const artistData: ServicePageData = {
  badge: "Creators",
  heroTitle: "Total Command Over",
  heroTitleHighlight: "Your Music Career",
  heroSubtitle: "From global delivery to rights protection and earning transparency, get the professional tools you need to manage your independent music business.",
  accentClass: "text-indigo-400",
  glowColor: "rgba(112,66,248,0.12)",
  consoleType: "artist",
  sections: [
    {
      id: "catalog-management",
      title: "Music Catalog Management",
      description: "Organize your music with professional-grade tools. We help you maintain a clean, structured catalog so every release is optimized for global stores, preventing metadata errors and ensuring consistency across your entire journey.",
      image: "/feature/1.png",
      imageAlt: "Artist Catalog Management illustration",
      glowColor: "220 80% 50%", // Blue
      features: [
        { title: "Universal Music Dashboard", subtitle: "Manage your entire library of singles and albums from one hub." },
        { title: "Metadata Optimization", subtitle: "Ensure your credits and data meet strict platform requirements." },
        { title: "Release Strategy & Tools", subtitle: "Take full control of your release schedules and updates." },
        { title: "Instant Library Sync", subtitle: "Update your catalog data instantly without platform delays." },
        { title: "Visual Catalog Tracking", subtitle: "Monitor the lifecycle and status of every track in your library." },
        { title: "Asset Integrity", subtitle: "Keep high-fidelity files and artwork safe and accessible." },
      ],
    },
    {
      id: "rights-protection",
      title: "Rights & Ownership Control",
      description: "Secure your creative works and eliminate ownership confusion. We provide a clear structure to define your rights and protect your music across all platforms, ensuring every contributor is correctly recognized and compensated.",
      image: "/feature/2.png",
      imageAlt: "Rights Management illustration",
      glowColor: "280 85% 55%", // Purple
      features: [
        { title: "Verified Ownership Tiers", subtitle: "Establish crystal-clear ownership for every sound recording." },
        { title: "Dynamic Split Control", subtitle: "Handle complex collaborations with transparent percentage splits." },
        { title: "Global Rights Protection", subtitle: "Guard your music against unauthorized use across the web." },
        { title: "Precise Revenue Allocation", subtitle: "Ensure earnings flow accurately to every rightsholder." },
        { title: "Transparent Agreements", subtitle: "Maintain clean digital contracts for all your creative works." },
        { title: "Direct Content ID Rights", subtitle: "Enforce your ownership on YouTube, TikTok, and Instagram." },
      ],
    },
    {
      id: "distribution-presence",
      title: "Distribution & Platform Presence",
      description: "Reach the world while maintaining a unified identity. We deliver your music to 150+ stores globally, ensuring your artist profiles are consistent and verified across Spotify, Apple Music, YouTube, and beyond.",
      image: "/feature/3.png", 
      imageAlt: "Distribution illustration",
      glowColor: "140 85% 55%", // Green
      features: [
        { title: "Worldwide DSP Delivery", subtitle: "Push your music to Spotify, Apple, TikTok, and Amazon instantly." },
        { title: "Identity Alignment", subtitle: "Keep your artist profiles clean, connected, and verified everywhere." },
        { title: "Targeted Market Control", subtitle: "Choose exactly where and when your music goes live." },
        { title: "Enhanced Visibility", subtitle: "Optimize how your music is presented to global algorithms." },
        { title: "UGC Ecosystem Access", subtitle: "Monetize user content on YouTube Shorts, Reels, and TikTok." },
        { title: "Fast-Track Ingestion", subtitle: "Priority delivery routes to get your music live within 48 hours." },
      ],
    },
    {
      id: "earnings-tracking",
      title: "Earnings & Revenue Tracking",
      description: "Stop guessing and start tracking. Get a structured, real-time view of your income across all platforms, helping you understand your revenue streams and financial growth without the complexity.",
      image: "/feature/4.png",
      imageAlt: "Earnings Tracking illustration",
      glowColor: "350 85% 55%", // Pink
      features: [
        { title: "Unified Income Ledger", subtitle: "See exactly how much you're earning from a single dashboard." },
        { title: "Platform Performance", subtitle: "Break down your revenue by store, territory, and track." },
        { title: "Live Financial Data", subtitle: "Stay updated with recent revenue trends and daily logs." },
        { title: "Error-Free Accounting", subtitle: "Ensure every cent is accounted for with precise tracking." },
        { title: "Multi-Currency Collection", subtitle: "Manage global earnings in multiple currencies effortlessly." },
        { title: "Historical Trends", subtitle: "Analyze your financial progress over months and years." },
      ],
    },
    {
      id: "royalty-management",
      title: "Royalty Management & Payouts",
      description: "Reliable payouts and transparent accounting. We simplify the entire royalty cycle — from tracking splits to final disbursement — ensuring everyone gets paid accurately and on time.",
      image: "/feature/5.png",
      imageAlt: "Royalty Management illustration",
      glowColor: "40 85% 55%", // Amber
      features: [
        { title: "Transparent Split Engine", subtitle: "Calculate complex collaborator shares automatically." },
        { title: "On-Time Global Payouts", subtitle: "Recieve your earnings via PayPal, Bank, or Wire without delays." },
        { title: "Contributor Portals", subtitle: "Let your team track their own shares and earnings easily." },
        { title: "Clear Financial Reporting", subtitle: "Access full monthly audit breakdowns of your royalties." },
        { title: "Secure Payment Guard", subtitle: "Safe and consistent transaction processing worldwide." },
        { title: "Automated Tax Forms", subtitle: "Streamline your accounting with integrated tax documentation." },
      ],
    },
    {
      id: "analytics-insights",
      title: "Analytics & Career Growth",
      description: "Convert raw data into actionable career moves. Gain deep insights into your audience behavior and streaming trends to build a larger, more engaged fanbase based on facts.",
      image: "/feature/6.png",
      imageAlt: "Career Growth illustration",
      glowColor: "190 85% 55%", // Cyan
      features: [
        { title: "Audience Intelligence", subtitle: "Know exactly who is listening and where they are from." },
        { title: "Trend Identification", subtitle: "Spot viral spikes and optimize your marketing strategy." },
        { title: "Streaming Velocity", subtitle: "Track how fast your tracks are moving across playlists." },
        { title: "Interactive Growth Maps", subtitle: "Visualize your fan reach across global cities and regions." },
        { title: "Team Insight Sharing", subtitle: "Export professional reports to share with managers and agents." },
        { title: "Strategic Recommendations", subtitle: "Get data-driven suggestions to maximize your release impact." },
      ],
    },
    {
      id: "artist-support",
      title: "Artist Support & Platform Fixes",
      description: "Beyond distribution: we solve real platform problems. From OAC setup to fixing metadata errors, our experts ensure your music and profiles operate perfectly everywhere.",
      image: "/feature/7.png",
      imageAlt: "Artist Support illustration",
      glowColor: "0 0% 80%", // Gray
      features: [
        { title: "OAC & Profile Setup", subtitle: "Get your YouTube Official Artist Channel verified and unified." },
        { title: "DSPs Verification Assist", subtitle: "Claim your artist badges on Spotify, Apple, and Amazon." },
        { title: "Topic Channel Resolution", subtitle: "Fix duplicate channels and consolidate your YouTube presence." },
        { title: "Content ID Resolution", subtitle: "Handle copyright claims and protect your sound recordings." },
        { title: "Metadata Issue Fixes", subtitle: "Recieve hands-on help for naming errors or delivery conflicts." },
        { title: "Priority Support Crew", subtitle: "Fast, expert assistance whenever your music journey hits a snag." },
      ],
    },
  ],
};

export default function ArtistServicesPage() {
  return (
    <ServiceLayout>
      <ServicePage data={artistData} />
    </ServiceLayout>
  );
}
