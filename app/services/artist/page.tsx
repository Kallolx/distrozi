import ServiceLayout from "@/app/components/layout/ServiceLayout";
import ServicePage, { ServicePageData } from "@/app/components/services/ServicePage";

export const metadata = {
  title: "Artist Solutions - Distrozi",
  description: "Global music distribution, smart marketing automation, automated royalty splits, and artist advances for independent creators.",
};

const artistData: ServicePageData = {
  badge: "Creators",
  heroTitle: "Empower Your",
  heroTitleHighlight: "Independent Music Career",
  heroSubtitle: "Get your tracks on all major platforms, collaborate seamlessly, analyze your fan growth, and fund your next release.",
  accentClass: "text-indigo-400",
  glowColor: "rgba(112,66,248,0.12)",
  consoleType: "artist",
  sections: [
    {
      id: "global-distribution",
      title: "Global Music Distribution",
      description: "Deliver your tracks to Spotify, Apple Music, TikTok, Amazon Music, and 150+ other global stores instantly. Upload unlimited songs, EPs, and albums while keeping 100% of your rights and earnings.",
      image: "/how.png",
      imageAlt: "Artist Distribution illustration",
      glowColor: "220 80% 50%", // Blue
      features: [
        { title: "Major Store Delivery", subtitle: "Deliver releases instantly to Spotify, Apple, Amazon, and Deezer." },
        { title: "Unlimited Releases", subtitle: "Upload as many albums, EPs, and singles as your music career needs." },
        { title: "Next-Day Delivery", subtitle: "Priority processing pathways to push tracks live within 24-48 hours." },
        { title: "Store Customization", subtitle: "Specify platform-level start dates and track-level pricing tiers." },
        { title: "Global Territory Scale", subtitle: "Distribute your music to listeners in over 180 countries." },
        { title: "Store Metadata Integrity", subtitle: "Easily add track credits, artist details, and barcodes." },
      ],
    },
    {
      id: "marketing-promotion",
      title: "Smart Marketing & Promotion",
      description: "Amplify your audience and trigger platform algorithms. Autogenerate beautiful, high-converting pre-save smartlinks and get submission guidelines for editorial playlist pitching.",
      image: "/analytics.png",
      imageAlt: "Marketing & Promotion illustration",
      glowColor: "190 85% 55%", // Cyan
      features: [
        { title: "Instant Smartlinks", subtitle: "Autogenerate beautiful pre-save pages and universal store links." },
        { title: "Pre-Save Campaigns", subtitle: "Build pre-save lists to guarantee strong release day algorithms." },
        { title: "Playlist Pitching Guides", subtitle: "Get direct submission guidelines to pitch Spotify and Apple editors." },
        { title: "Custom QR Generators", subtitle: "Create custom high-tech QR codes linking directly to your release." },
        { title: "Social Media Sharing", subtitle: "Instantly share rich, animated audio snippets to TikTok and Reels." },
        { title: "Dynamic Promo Pages", subtitle: "Establish modern press-kit assets for bloggers and radio hosts." },
      ],
    },
    {
      id: "creator-support",
      title: "Direct Creator Support",
      description: "Never feel stranded. Connect with our dedicated crew of music distribution experts for fast assistance with release edits, profile badges, and platform verification support.",
      image: "/support.png",
      imageAlt: "Creator Support illustration",
      glowColor: "0 0% 80%", // Gray
      features: [
        { title: "Dedicated Inbox Help", subtitle: "Chat directly with our music operations experts anytime." },
        { title: "24-Hour Responses", subtitle: "Recieve fast, personalized answers to delivery or payout questions." },
        { title: "Live Upload Audits", subtitle: "Get prompt feedback if your release violates store naming rules." },
        { title: "Store Take-Down Assist", subtitle: "Quickly manage store removals or catalogue transfers." },
        { title: "Profile Verification", subtitle: "Get assistance claiming your Spotify for Artists and Apple Music badges." },
        { title: "Release Troubleshooting", subtitle: "Recieve hands-on support for audio rendering or formatting conflicts." },
      ],
    },
    {
      id: "split-collaborations",
      title: "Split Payments & Collaborators",
      description: "Pay your team without hassle. Assign custom percentages for producers, guest vocalists, or session players, and let Distrozi disburse automatic splits every month.",
      image: "/support.png",
      imageAlt: "Collaborator Splits illustration",
      glowColor: "40 85% 55%", // Amber
      features: [
        { title: "Simple Split Setup", subtitle: "Define percentages for producers, co-writers, or featured artists." },
        { title: "Automated Payouts", subtitle: "Distrozi splits incoming earnings and pays collaborators automatically." },
        { title: "Invite Collaborators", subtitle: "Add collaborators by email to sign up and claim their split share." },
        { title: "Custom Split Windows", subtitle: "Set split dates or adjust allocations after release." },
        { title: "Recoupment for Teams", subtitle: "Pay back your video producers or mix engineers before splits begin." },
        { title: "Secure Split Ledgers", subtitle: "Track contract agreements in clean, transparent accounting logs." },
      ],
    },
    {
      id: "audience-analytics",
      title: "Audience & Fan Analytics",
      description: "Deconstruct your audience demographics and listenership trends. Track performance daily across DSPs and spot surging tracks using rich visual charts.",
      image: "/analytics.png",
      imageAlt: "Fan Analytics illustration",
      glowColor: "350 85% 55%", // Pink
      features: [
        { title: "Real-Time Stream Feeds", subtitle: "Track listeners and streaming numbers from top platforms daily." },
        { title: "Fan Heatmaps", subtitle: "View geographic maps showing where your listeners reside." },
        { title: "Playlist Performance", subtitle: "Track exactly which user and editorial playlists add your songs." },
        { title: "Demographic Reports", subtitle: "View aggregate age and gender splits of your listener base." },
        { title: "Streaming Activity Logs", subtitle: "Monitor listener growth to detect trending tracks." },
        { title: "Engagement Ratios", subtitle: "Measure save-to-stream ratios to optimize marketing campaigns." },
      ],
    },
    {
      id: "monetization-ugc",
      title: "UGC & Content Monetization",
      description: "Earn revenue whenever your music is played in user-generated videos on YouTube, TikTok, Facebook, or Instagram. Easily secure licensing rights for release covers.",
      image: "/ownership.png",
      imageAlt: "UGC Monetization illustration",
      glowColor: "280 85% 55%", // Purple
      features: [
        { title: "YouTube Content ID", subtitle: "Monetize user-generated videos containing your sound recordings." },
        { title: "TikTok Sound Library", subtitle: "Distribute sounds directly to TikTok's creator sounds menu." },
        { title: "Instagram Audio Reels", subtitle: "Ensure your tracks are available for reels, stories, and posts." },
        { title: "Social Claims Protection", subtitle: "Whitelist your personal channels from copyright flags." },
        { title: "Cover Song Licensing", subtitle: "Easily secure mechanical licenses for cover versions." },
        { title: "Direct UGC Earnings", subtitle: "Collect master and publishing royalties from creator uploads." },
      ],
    },
    {
      id: "funding-advances",
      title: "Advances & Release Funding",
      description: "Fund your creative vision and scaling campaigns. Apply for recoupable release advances based on your streaming history while retaining 100% master ownership.",
      image: "/youtube_cms.png",
      imageAlt: "Advances illustration",
      glowColor: "140 85% 55%", // Green
      features: [
        { title: "Release Funding", subtitle: "Apply for marketing advances based on your streaming history." },
        { title: "Simple Repayments", subtitle: "Repay advances automatically through your streaming payouts." },
        { title: "Zero Equity Fees", subtitle: "Retain 100% ownership of your master rights during advances." },
        { title: "Predictive Growth", subtitle: "Get custom revenue projections for your catalogue's next phase." },
        { title: "Independent Status", subtitle: "Avoid restrictive multi-album deals with major record labels." },
        { title: "Transparent Advances", subtitle: "Track repayment progress in a clean visual accounting dashboard." },
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
