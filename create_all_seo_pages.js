const fs = require("fs");
const path = require("path");

const BLOGS_DIR = path.join(__dirname, "data", "blogs");

// Curated high-quality, professional music stock images from Unsplash (no AI)
const UNSPLASH_IMAGES = [
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop", // Studio mixer
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop", // Studio Microphone
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop", // Headphones
  "https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=800&auto=format&fit=crop", // Vinyl record player
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop", // Concert stage
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop", // DJ deck
  "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=800&auto=format&fit=crop", // Acoustic studio
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop", // Concert crowd
  "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop", // Analog synth synthesizer
  "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&auto=format&fit=crop", // Equalizer display
];

// Mapping of country names to their local avif files in public/blogs/
const COUNTRY_IMAGES = {
  "India": "/blogs/india.avif",
  "Bangladesh": "/blogs/bd.avif",
  "Pakistan": "/blogs/pakistan.avif",
  "Sri Lanka": "/blogs/sri-lanka.avif",
  "Nepal": "/blogs/nepal.avif",
  "Indonesia": "/blogs/indonesia.avif",
  "Philippines": "/blogs/philippines.avif",
  "the United Kingdom": "/blogs/uk.avif",
  "Germany": "/blogs/germany.avif",
  "France": "/blogs/france.avif",
  "Spain": "/blogs/spain.avif",
  "Italy": "/blogs/italy.avif",
  "the United States": "/blogs/usa-canada.avif",
  "Canada": "/blogs/usa-canada.avif",
  "Nigeria": "/blogs/nigeria.avif",
  "South Africa": "/blogs/south-africa.avif",
  "Kenya": "/blogs/kenya.avif",
  "the United Arab Emirates": "/blogs/uae.avif",
  "Saudi Arabia": "/blogs/saudi.avif",
  "Brazil": "/blogs/brazil.avif",
  "Mexico": "/blogs/maxico.avif",
  "Argentina": "/blogs/arg.avif"
};

// High-Priority and Free Blog Images
const HIGH_PRIORITY_IMAGES = {
  "best-music-distributor-for-tiktok": "/blogs/distributor-tiktok.avif",
  "best-music-distributor-for-youtube-music": "/blogs/distributor-youtube-music.avif",
  "best-music-distributor-for-musicians": "/blogs/for-musicians.avif",
  "free-music-distribution-for-apple-music": "/blogs/free-apple-music.avif",
  "free-music-distribution-for-spotify": "/blogs/free-spotify.avif",
  "free-music-distribution-with-youtube-content-id": "/blogs/free-yt-content-id.avif",
  "best-music-distributor-for-independent-artists": "/blogs/independent-artist.avif",
  "free-music-distribution-for-independent-artists": "/blogs/independent-artist.avif",
  "best-music-distributor-for-international-artists": "/blogs/international-artist.avif",
  "most-affordable-music-distribution-service": "/blogs/most-affortable-distribution.avif",
  "best-music-distributor-2026": "/blogs/music-distributor.avif",
  "best-music-distribution": "/blogs/music-distributor.avif",
  "best-music-distribution-services": "/blogs/music-distributor.avif",
  "best-music-distribution-companies": "/blogs/music-distributor.avif",
  "best-free-music-distribution": "/blogs/music-distributor.avif"
};

// Rich Country Profiles for Localized Pages
const countryProfiles = {
  "India": {
    scene: "the thriving Desi hip-hop, independent pop, and regional film soundtrack markets",
    platforms: "JioSaavn, Wynk Music, and Gaana",
    payout: "direct Rupee (INR) payouts via local UPI, NEFT, and Paytm transfers",
    insights: "With the explosive growth of independent Punjabi, Hindi, and South-Indian music, artists require direct regional store uploads and local banking support.",
    localDistributors: [
      { name: "Distrozi", logoDomain: "distrozi.com", description: "Offers Indian independent artists direct delivery to JioSaavn and Wynk Music, combined with instant UPI and local bank payouts in Rupees (INR).", url: "https://distrozi.com", bestFor: "Best Overall", rating: "4.9/5", pricing: "Flat Annual Plan / Splits", pros: ["Local UPI & bank payouts", "JioSaavn & Wynk delivery", "Keep 100% master rights"] },
      { name: "OK Listen", logoDomain: "oklisten.com", description: "A regional Indian aggregator focused on distributing indie artists to Indian stores and global streaming systems.", url: "https://oklisten.com", bestFor: "Local Artists", rating: "4.2/5", pricing: "Pay-per-release + splits", pros: ["Dedicated Indian support", "Simple setup", "Local payment methods"] },
      { name: "RouteNote", logoDomain: "routenote.com", description: "Provides a commission-based free plan delivering music to major platforms, including regional services.", url: "https://routenote.com", bestFor: "Beginners", rating: "4.4/5", pricing: "Free (15% split)", pros: ["Zero upfront cost", "Flexible tier switching", "Worldwide store access"] }
    ]
  },
  "Bangladesh": {
    scene: "the rapidly expanding Bangla indie-rock, urban hip-hop, and folk-fusion movements",
    platforms: "Shadhin Music, GP Music, and Gaan",
    payout: "local banking networks and direct mobile wallets (bKash and Nagad)",
    insights: "Bangladeshi rock bands and independent hip-hop artists have built massive online fanbases, necessitating distributors that support local payment collection.",
    localDistributors: [
      { name: "Distrozi", logoDomain: "distrozi.com", description: "Provides local bKash and Nagad payment integrations alongside premium worldwide uploads to Spotify, Apple Music, and local stores like Shadhin.", url: "https://distrozi.com", bestFor: "Best Overall", rating: "4.9/5", pricing: "Flat Annual Plan / Splits", pros: ["bKash & Nagad withdrawals", "Official Artist Channel sync", "Keep 100% royalties"] },
      { name: "RouteNote", logoDomain: "routenote.com", description: "A popular choice for starting musicians due to its free tier that accepts a 15% commission split.", url: "https://routenote.com", bestFor: "Beginners", rating: "4.3/5", pricing: "Free (15% split)", pros: ["Free upload tier", "Delivers to Spotify & Apple", "No initial fee"] }
    ]
  },
  "Pakistan": {
    scene: "the rich Sufi-rock heritage, Urdu rap scenes, and independent pop waves that are capturing international charts",
    platforms: "Patari and Bajao",
    payout: "local direct banking and mobile financial wallets (Easypaisa and JazzCash)",
    insights: "With global interest in Pakistani pop and Coke Studio tracks, independent Pakistani musicians need reliable pathways to claim international mechanical royalties and bypass expensive wire fees.",
    localDistributors: [
      { name: "Distrozi", logoDomain: "distrozi.com", description: "Enables Pakistani artists to easily collect global mechanical royalties and withdraw earnings directly via Easypaisa, JazzCash, or local bank transfer.", url: "https://distrozi.com", bestFor: "Best Overall", rating: "4.9/5", pricing: "Flat Annual Plan / Splits", pros: ["Easypaisa & JazzCash payouts", "YouTube Content ID included", "100% royalties and rights"] },
      { name: "RouteNote", logoDomain: "routenote.com", description: "Provides a zero-cost distribution model which is ideal for underground bands in Lahore and Karachi looking to test streaming.", url: "https://routenote.com", bestFor: "Beginners", rating: "4.3/5", pricing: "Free (15% split)", pros: ["Free music distribution", "Global store reach", "Upgrade to keep 100%"] }
    ]
  },
  "Nigeria": {
    scene: "the world-conquering Afrobeats, Alté, and street-pop music movements",
    platforms: "Boomplay, Audiomack, and Spotify",
    payout: "direct local bank transfers and local mobile money services",
    insights: "Afrobeats has transitioned to a major driver of global pop culture, demanding robust worldwide copyright collection and fast payouts in Nigeria.",
    localDistributors: [
      { name: "Distrozi", logoDomain: "distrozi.com", description: "Delivers to Boomplay, Audiomack, and 150+ international stores, ensuring Nigerian artists receive direct local bank payouts and YouTube Content ID rights protection.", url: "https://distrozi.com", bestFor: "Best Overall", rating: "4.9/5", pricing: "Flat Annual Plan / Splits", pros: ["Direct Nigerian bank payouts", "Boomplay & Audiomack support", "Dedicated roster dashboard"] },
      { name: "Boomplay Distribution", logoDomain: "boomplay.com", description: "A regional distributor directly integrated with the Boomplay app to push local catalog ingestion.", url: "https://boomplay.com", bestFor: "Boomplay Artists", rating: "4.1/5", pricing: "Commission-based splits", pros: ["In-app integration", "Fast regional metadata", "Local marketing"] }
    ]
  },
  "the United Kingdom": {
    scene: "the highly competitive UK Drill, Grime, indie rock, and electronic music sectors",
    platforms: "Spotify, Apple Music, Deezer, and Tidal",
    payout: "direct GBP bank transfers and BACS/SEPA networks",
    insights: "In a mature industry structure, independent British artists require advanced sync licensing features, playlist placement, and publisher administration to navigate royalties.",
    localDistributors: [
      { name: "Distrozi", logoDomain: "distrozi.com", description: "A premium B2B distributor providing UK labels and artists with advanced metadata controls, publishing collection, and direct GBP payouts.", url: "https://distrozi.com", bestFor: "Best Overall", rating: "4.9/5", pricing: "Flat Annual Plan / Splits", pros: ["Local GBP bank payouts", "Publishing administration", "YouTube CMS whitelisting"] },
      { name: "Ditto Music", logoDomain: "dittomusic.com", description: "A UK-based distributor that provides flat-rate annual pricing, release campaigns, and official charts registration.", url: "https://dittomusic.com", bestFor: "Flat-rate UK", rating: "4.3/5", pricing: "£19 per year", pros: ["Unlimited releases", "Official charts registration", "Promo campaigns"] },
      { name: "AWAL", logoDomain: "awal.com", description: "An invite-only distribution company offering customized marketing and playlisting support in exchange for a commission split.", url: "https://awal.com", bestFor: "Established Indie", rating: "4.6/5", pricing: "Invite-only (15% split)", pros: ["Curated support team", "Marketing campaigns", "Sync licensing deals"] }
    ]
  },
  "the United States": {
    scene: "the massive hip-hop, indie pop, country, and alternative music ecosystems",
    platforms: "Spotify, Apple Music, Amazon Music, and Pandora",
    payout: "direct ACH bank transfers, PayPal, and wire transfers",
    insights: "In the world's largest commercial music market, standing out requires advanced automated marketing, playlist pushes, and robust YouTube Content ID claims.",
    localDistributors: [
      { name: "Distrozi", logoDomain: "distrozi.com", description: "A powerful aggregator providing US artists and independent labels with flat-rate unlimited releases, direct bank transfers, and automated split sheets.", url: "https://distrozi.com", bestFor: "Best Overall", rating: "4.9/5", pricing: "Flat Annual Plan / Splits", pros: ["Direct ACH bank payouts", "YouTube Content ID included", "Automated split sheets"] },
      { name: "DistroKid", logoDomain: "distrokid.com", description: "The pioneer of flat-rate music distribution, offering quick delivery and basic digital delivery workflows.", url: "https://distrokid.com", bestFor: "Fast Uploads", rating: "4.5/5", pricing: "From $22.99 per year", pros: ["Unlimited uploads", "Fast ingestion times", "Simple text dashboard"] },
      { name: "TuneCore", logoDomain: "tunecore.com", description: "A major player offering flat-fee annual subscription tiers alongside publishing administration add-ons.", url: "https://tunecore.com", bestFor: "Publishing Collection", rating: "4.4/5", pricing: "From $19.99 per year", pros: ["Detailed analytics charts", "Publishing add-on options", "Global store reach"] }
    ]
  },
  "Canada": {
    scene: "the diverse indie folk, hip-hop, and alternative pop landscapes",
    platforms: "Spotify, Apple Music, and Amazon Music",
    payout: "direct CAD bank transfers and direct deposit deposits",
    insights: "Canadian artists rely heavily on claiming SOCAN royalties, requiring distributors who integrate seamlessly with global publishing databases.",
    localDistributors: [
      { name: "Distrozi", logoDomain: "distrozi.com", description: "An enterprise-grade distributor offering Canadian artists full publishing administration integration and direct CAD local transfers.", url: "https://distrozi.com", bestFor: "Best Overall", rating: "4.9/5", pricing: "Flat Annual Plan / Splits", pros: ["CAD bank deposits", "Publishing administration", "Keep 100% royalties"] },
      { name: "LANDR", logoDomain: "landr.com", description: "A Montreal-based company that bundles digital music distribution with professional cloud mastering and collaboration plugins.", url: "https://landr.com", bestFor: "All-in-one Production", rating: "4.6/5", pricing: "From $23.99 per year", pros: ["Cloud AI mastering", "Collaboration tools", "Integrated plugin bundle"] }
    ]
  }
};

const PAGES_DATA = [
  // High Priority Blog Pages
  { title: "Best Music Distribution", category: "blog" },
  { title: "Best Music Distributor 2026", category: "blog" },
  { title: "Best Music Distribution Services", category: "blog" },
  { title: "Best Music Distribution Companies", category: "blog" },
  { title: "Best Music Distributor for Independent Artists", category: "blog" },
  { title: "Best Music Distributor for Record Labels", category: "blog" },
  { title: "Best Music Distributor for Musicians", category: "blog" },
  { title: "Best Music Distributor for Spotify", category: "blog" },
  { title: "Best Music Distributor for Apple Music", category: "blog" },
  { title: "Best Music Distributor for YouTube Music", category: "blog" },
  { title: "Best Music Distributor for TikTok", category: "blog" },
  { title: "Best Music Distributor with YouTube Content ID", category: "blog" },
  { title: "Best Music Distributor with Publishing Administration", category: "blog" },
  { title: "Best Music Distributor for Global Distribution", category: "blog" },
  { title: "Best Music Distributor for International Artists", category: "blog" },
  { title: "Fastest Music Distribution Service", category: "blog" },
  { title: "Most Affordable Music Distribution Service", category: "blog" },

  // Free Distribution Keywords
  { title: "Best Free Music Distribution", category: "blog" },
  { title: "Top Free Music Distribution Companies", category: "blog" },
  { title: "Free Music Distribution for Spotify", category: "blog" },
  { title: "Free Music Distribution for Apple Music", category: "blog" },
  { title: "Free Music Distribution with YouTube Content ID", category: "blog" },
  { title: "Free Music Distribution for Independent Artists", category: "blog" },
  { title: "Free Music Distribution for Labels", category: "blog" },

  // Country Pages
  // Asia
  { title: "Best Music Distributor in India", category: "blog", country: "India" },
  { title: "Best Music Distributor in Bangladesh", category: "blog", country: "Bangladesh" },
  { title: "Best Music Distributor in Pakistan", category: "blog", country: "Pakistan" },
  { title: "Best Music Distributor in Sri Lanka", category: "blog", country: "Sri Lanka" },
  { title: "Best Music Distributor in Nepal", category: "blog", country: "Nepal" },
  { title: "Best Music Distributor in Indonesia", category: "blog", country: "Indonesia" },
  { title: "Best Music Distributor in Philippines", category: "blog", country: "Philippines" },
  // Europe
  { title: "Best Music Distributor in UK", category: "blog", country: "the United Kingdom" },
  { title: "Best Music Distributor in Germany", category: "blog", country: "Germany" },
  { title: "Best Music Distributor in France", category: "blog", country: "France" },
  { title: "Best Music Distributor in Spain", category: "blog", country: "Spain" },
  { title: "Best Music Distributor in Italy", category: "blog", country: "Italy" },
  // North America
  { title: "Best Music Distributor in USA", category: "blog", country: "the United States" },
  { title: "Best Music Distributor in Canada", category: "blog", country: "Canada" },
  // Africa
  { title: "Best Music Distributor in Nigeria", category: "blog", country: "Nigeria" },
  { title: "Best Music Distributor in South Africa", category: "blog", country: "South Africa" },
  { title: "Best Music Distributor in Kenya", category: "blog", country: "Kenya" },
  // Middle East
  { title: "Best Music Distributor in UAE", category: "blog", country: "the United Arab Emirates" },
  { title: "Best Music Distributor in Saudi Arabia", category: "blog", country: "Saudi Arabia" },
  // Latin America
  { title: "Best Music Distributor in Brazil", category: "blog", country: "Brazil" },
  { title: "Best Music Distributor in Mexico", category: "blog", country: "Mexico" },
  { title: "Best Music Distributor in Argentina", category: "blog", country: "Argentina" },

  // Comparison Pages
  { title: "Distrozi vs DistroKid", category: "compare", competitor: "DistroKid" },
  { title: "Distrozi vs TuneCore", category: "compare", competitor: "TuneCore" },
  { title: "Distrozi vs CD Baby", category: "compare", competitor: "CD Baby" },
  { title: "Distrozi vs RouteNote", category: "compare", competitor: "RouteNote" },
  { title: "Distrozi vs Ditto Music", category: "compare", competitor: "Ditto Music" },
  { title: "Distrozi vs Amuse", category: "compare", competitor: "Amuse" },
  { title: "Distrozi vs ONErpm", category: "compare", competitor: "ONErpm" },
  { title: "Distrozi vs Too Lost", category: "compare", competitor: "Too Lost" },
  { title: "Distrozi vs Symphonic", category: "compare", competitor: "Symphonic" },
  { title: "Distrozi vs UnitedMasters", category: "compare", competitor: "UnitedMasters" },
  { title: "Distrozi vs LANDR", category: "compare", competitor: "LANDR" },
  { title: "Distrozi vs SoundOn", category: "compare", competitor: "SoundOn" },
  { title: "Distrozi vs AWAL", category: "compare", competitor: "AWAL" },

  // Label & Business Pages
  { title: "Music Distribution for Record Labels", category: "resources", topic: "Record Labels" },
  { title: "Music Distribution for Independent Labels", category: "resources", topic: "Independent Labels" },
  { title: "White Label Music Distribution", category: "resources", topic: "White Label Systems" },
  { title: "Music Distribution API Solutions", category: "resources", topic: "API Integrations" },
  { title: "Distribution for Music Companies", category: "resources", topic: "Enterprise Music Companies" },
  { title: "Distribution for Music Publishers", category: "resources", topic: "Publishing Administrators" },
  { title: "YouTube CMS for Labels", category: "resources", topic: "YouTube CMS Network access" },
  { title: "YouTube Content ID for Labels", category: "resources", topic: "YouTube Content ID management" },

  // Educational Pages
  { title: "What Is Music Distribution?", category: "guide" },
  { title: "How Music Distribution Works", category: "guide" },
  { title: "How to Release Music Worldwide", category: "guide" },
  { title: "How to Upload Music to Spotify", category: "guide" },
  { title: "How to Upload Music to Apple Music", category: "guide" },
  { title: "How to Upload Music to YouTube Music", category: "guide" },
  { title: "How YouTube Content ID Works", category: "guide" },
  { title: "How TikTok Music Monetization Works", category: "guide" },
  { title: "How Royalties Are Calculated", category: "guide" },
  { title: "Music Distribution Pricing Comparison", category: "guide" },
  { title: "DDEX Explained", category: "guide" },
  { title: "ISRC Explained", category: "guide" },
  { title: "UPC Explained", category: "guide" }
];

// Competitor Profile Details for Comparisons
const competitorProfiles = {
  "DistroKid": {
    pricing: "Charges a flat annual subscription ($22.99/yr basic), but locks scheduled release dates on the basic tier. In addition, they charge recurring yearly fees for YouTube Content ID ($4.95/yr per single and $14.95/yr per album) and Shazam ($0.99/yr per song).",
    takedowns: "If your annual payment fails or your subscription lapses, your entire music catalog is deleted from all digital stores unless you pay a steep one-time 'Leave a Legacy' fee per track.",
    pros: ["Unlimited uploads for flat fee", "Fast release processing", "Simple interface"],
    cons: ["Hidden add-on fees per single/album", "Catalog deletion on subscription lapse", "Basic plan has no scheduled releases"]
  },
  "TuneCore": {
    pricing: "Offers annual subscription tiers starting at $19.99/yr for unlimited releases. However, they charge additional splits for certain store services, and their publishing administration add-on is billed separately.",
    takedowns: "If you stop paying their annual fee, TuneCore will take down your music from streaming platforms.",
    pros: ["Good digital analytics dashboard", "Access to publishing administration tools", "Worldwide store presence"],
    cons: ["Slower customer support responses", "Paid upgrades required for custom release dates", "Steep subscription costs as your roster expands"]
  },
  "CD Baby": {
    pricing: "Bypasses the annual subscription model by charging a one-time fee per release ($9.99 per single/album). However, they take a 9% commission split from all your streaming royalties and digital sales forever.",
    takedowns: "Your music stays live on digital stores forever without annual fees, but the 9% royalty cut is highly expensive as your music catalog begins to scale.",
    pros: ["No recurring annual subscriptions", "Physical CD/vinyl distribution options", "One-time payment model"],
    cons: ["Takes a permanent 9% royalty cut", "Charges extra for UPC bar codes", "No roster split payments on basic tiers"]
  },
  "RouteNote": {
    pricing: "Offers a flexible model with a 100% free tier (taking a 15% split) and a premium tier (retaining 100% royalties for an upfront fee).",
    takedowns: "Music remains online on both free and premium tiers, allowing you to switch between plans at any time.",
    pros: ["No initial cost on free tier", "Flexible tier switching option", "Good regional store support"],
    cons: ["Review queue times can take several weeks", "Basic upload dashboard", "Lacks dedicated publishing administration"]
  },
  "Ditto Music": {
    pricing: "Flat-rate fee of $19.00/yr for unlimited releases, but locks rights management and playlist promotion tools behind higher tiers.",
    takedowns: "Lapsed subscriptions will trigger catalog deletion requests to stores.",
    pros: ["Inexpensive flat rate", "Official charts registration", "Basic split payments"],
    cons: ["Known history of slow support response times", "Dashboard errors during metadata edits", "Content ID costs extra"]
  },
  "Amuse": {
    pricing: "Mobile-first solo artist distribution with a basic free plan (takes splits) and premium subscription tiers starting at $24.99/yr.",
    takedowns: "Unpaid premium accounts are downgraded to the free tier rather than being deleted immediately.",
    pros: ["Clean mobile app dashboard", "Simple royalty splits", "Fast delivery on paid plans"],
    cons: ["No web interface on basic plans", "Limited store delivery on free plan", "Strict curation checks"]
  },
  "ONErpm": {
    pricing: "Free uploading with a standard 15% royalty commission split on music stores, and a 30% split on video and YouTube Content ID.",
    takedowns: "Music stays live but the commission splits are permanent unless customized label deals are negotiated.",
    pros: ["Strong Latin America marketing support", "Direct rights management", "Free registration"],
    cons: ["High 30% split on YouTube Content ID", "Cluttered client dashboard", "Strict metadata reviews"]
  },
  "Too Lost": {
    pricing: "Charges a flat annual subscription fee starting at $19.99/yr, providing basic upload services.",
    takedowns: "Music will be taken down if subscription billing fails.",
    pros: ["Low initial pricing", "Bulk metadata uploads supported", "Fast ingestion pipelines"],
    cons: ["Very basic dashboard interface", "Lacks robust publishing tools", "Limited international support"]
  },
  "Symphonic": {
    pricing: "An application-based distributor that takes a 15% commission split on royalties, providing dedicated B2B tools.",
    takedowns: "Maintains files online, but is highly selective during artist and label applications.",
    pros: ["High-quality playlist pitching", "Detailed marketing campaigns", "Advanced rights management"],
    cons: ["Requires approval to register", "Takes a 15% cut of all streams", "Not suitable for beginner solo artists"]
  },
  "UnitedMasters": {
    pricing: "Charges $59.99/yr for unlimited distribution, or a basic free plan where they take a 10% royalty split.",
    takedowns: " downgraded accounts will take store catalog offline or apply the 10% split structure.",
    pros: ["Direct brand and sync pitching options", "Clean visual dashboard", "Integrated marketing tools"],
    cons: ["Expensive annual flat rate", "10% split is high for a distributor", "Basic customer support"]
  },
  "LANDR": {
    pricing: "Bundles distribution with cloud-based AI mastering and plugins starting at $23.99/yr.",
    takedowns: "Requires a paid plan to keep music live on major digital stores.",
    pros: ["All-in-one producing tools", "Included AI mastering credits", "Collaborator widgets"],
    cons: ["Expensive if you only need distribution", "Mastering tools require higher tiers for wavs", "Cluttered interface"]
  },
  "SoundOn": {
    pricing: "TikTok's native distributor, offering free uploads and direct promotional integrations within ByteDance apps.",
    takedowns: "Music stays live, but splits are taken on non-ByteDance DSPs after year one.",
    pros: ["Direct TikTok library synchronization", "TikTok promotional campaigns", "100% royalties on ByteDance apps"],
    cons: ["Very basic analytics on non-TikTok apps", "Limited global playlist pitching", "No publishing collection support"]
  },
  "AWAL": {
    pricing: "An invite-only distribution company offering customized marketing and playlisting support in exchange for a commission split.",
    takedowns: "Keeps catalogs live, but only accepts artists with existing streaming fanbases.",
    pros: ["Detailed support team", "Marketing campaigns", "Sync licensing deals"],
    cons: ["Invite-only registration", "Takes a permanent 15% royalty split", "No retail upload option"]
  }
};

// Helper to clean slug name
function makeSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function generateBlogContent(item, idx) {
  const slug = makeSlug(item.title);
  const publishDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  let content = [];
  let comparisonTable = null;
  let faq = [];
  const titleLower = item.title.toLowerCase();

  // 1st Category: LOCALIZED COUNTRY PAGES
  if (item.country) {
    const c = item.country;
    const profile = countryProfiles[c] || {
      scene: `the growing independent music scene and local creator movements in ${c}`,
      platforms: "Spotify, Apple Music, and regional stores",
      payout: "direct bank transfers and local digital wallets",
      insights: "Streaming has opened new gates for regional musicians, letting them connect directly with their fanbases.",
      localDistributors: [
        { name: "Distrozi", logoDomain: "distrozi.com", description: "Best premium option with direct local bank deposits and fast regional store ingestion.", url: "https://distrozi.com", bestFor: "Best Overall", rating: "4.9/5", pricing: "Flat Annual Plan", pros: ["Local bank transfers", "Keep 100% royalties", "Fast ingestion"] },
        { name: "RouteNote", logoDomain: "routenote.com", description: "Provides a free tier for emerging artists, taking a 15% royalty commission split.", url: "https://routenote.com", bestFor: "Beginners", rating: "4.4/5", pricing: "Free (15% split)", pros: ["No upfront fees", "Worldwide store access"] }
      ]
    };

    content = [
      {
        type: "paragraph",
        text: `Releasing music on Spotify, Apple Music, and YouTube is no longer a luxury for independent artists in ${c}—it is the baseline for your music career. With streaming platforms accounting for a massive shift in how audiences consume art, musicians are no longer bound by traditional record label gatekeepers. However, finding the best music distributor in ${c} requires a deep understanding of both local streaming networks and global payout channels.`
      },
      {
        type: "paragraph",
        text: `${profile.insights} To leverage this growth, independent artists need a distributor that offers direct routes to international stores while fully supporting local licensing databases and payment frameworks.`
      },
      {
        type: "heading",
        text: `1. Distrozi`
      },
      {
        type: "paragraph",
        text: `Distrozi solves the local payout and distribution challenge by bridging the gap between regional demands and global standards. We deliver your music to all regional platforms alongside 150+ global DSPs. Crucially, Distrozi supports ${profile.payout}, ensuring your royalties land in your accounts without heavy currency conversions.`
      },
      {
        type: "heading",
        text: `2. RouteNote`
      },
      {
        type: "paragraph",
        text: "RouteNote is a solid commission-based alternative for independent musicians in developing markets. Under its free model, artists pay zero upfront fees and keep 85% of their royalties. They deliver to all major streaming platforms globally, making it a viable starting point."
      },
      {
        type: "heading",
        text: `3. Local Music Aggregators`
      },
      {
        type: "paragraph",
        text: `For artists strictly focusing on regional audiences, local services like ${profile.localAggs || "regional aggregators"} offer basic uploads. However, they lack the advanced playlisting partnerships and global YouTube Content ID protection needed to monetize overseas listeners.`
      }
    ];

    comparisonTable = {
      title: `Features Comparison for Artists in ${c}`,
      headers: ["Feature / Metric", "Distrozi", "Local Aggregators", "Global Competitors"],
      rows: [
        ["Regional Store Delivery", "Full Support", "Supported", "Very Limited"],
        ["Global Playlist Pitching", "Supported", "Limited", "Full Support"],
        ["YouTube Content ID", "Included", "Takes extra splits", "Charged annually ($4.95+/yr)"],
        ["Local Bank Payouts", "Direct support", "Supported", "Expensive wire fees"],
        ["Master Rights", "Artist retains 100%", "Often request splits", "Artist retains 100%"]
      ]
    };

    faq = [
      {
        question: `Which regional platforms in ${c} does Distrozi support?`,
        answer: `Distrozi delivers your tracks directly to regional stores like ${profile.platforms} alongside Spotify, Apple Music, and Amazon Music.`
      },
      {
        question: `How do artists in ${c} withdraw their royalty splits?`,
        answer: `We support direct payouts via ${profile.payout}, allowing you to bypass expensive international transfer fees.`
      },
      {
        question: `Will my tracks stay online if I stop my account?`,
        answer: `Yes, Distrozi does not take down your catalog if you pause or end your subscription. Your tracks remain active and continue earning royalties.`
      }
    ];

    content.push({
      type: "heading",
      text: "Recommended Distributors for Local Artists"
    });
    content.push({
      type: "platforms",
      platformItems: profile.localDistributors
    });

  // 2nd Category: COMPETITOR COMPARISONS (Distrozi vs X)
  } else if (item.category === "compare") {
    const comp = item.competitor;
    const compProfile = competitorProfiles[comp] || {
      pricing: "Standard annual subscription fees apply.",
      takedowns: "Music may be deleted upon subscription lapse.",
      pros: ["Standard distribution features"],
      cons: ["Lacks customized B2B tools"]
    };

    content = [
      {
        type: "paragraph",
        text: `Choosing your distribution partner is one of the most critical business decisions you will make as an independent artist or record label. While ${comp} is a highly recognizable company, artists are increasingly looking closer at hidden fees, rights management, and long-term costs. Distrozi provides a modern, premium alternative designed to maximize your revenue while protecting your masters.`
      },
      {
        type: "heading",
        text: `1. Fee Structure Comparison`
      },
      {
        type: "paragraph",
        text: `Pricing transparency is a major point of difference. ${compProfile.pricing} Distrozi includes advanced catalog management, scheduled releases, and Rights Management on all standard plans without hidden annual charges.`
      },
      {
        type: "heading",
        text: `2. YouTube Content ID & Rights Management`
      },
      {
        type: "paragraph",
        text: "Monetizing your music on YouTube, TikTok, and Instagram is essential. Distrozi integrates YouTube Content ID directly into its core platform. Rather than charging you annual maintenance fees per song like traditional aggregators, we ensure your catalog is protected and earning royalties from day one."
      },
      {
        type: "heading",
        text: `3. Catalog Safety & Takedown Policies`
      },
      {
        type: "paragraph",
        text: `${compProfile.takedowns} Distrozi believes your music legacy belongs to you forever. If you choose to pause your subscription, we never delete your hard work. Your music stays online and continues earning royalties under standard administrative splits.`
      }
    ];

    comparisonTable = {
      title: `Distrozi vs. ${comp} Head-to-Head`,
      headers: ["Metric", "Distrozi", comp],
      rows: [
        ["Keep 100% Royalties", "Yes", "Yes"],
        ["YouTube Content ID", "Included", "Extra annual fee"],
        ["Scheduled Releases", "Free (All plans)", "Locked on basic plan"],
        ["Lapsed subscription policy", "Music remains online", "Music deleted"],
        ["YouTube CMS & MCN Services", "Yes (Direct mappings)", "No"],
        ["Transparent local bank payouts", "Yes", "No"]
      ]
    };

    faq = [
      {
        question: `Is Distrozi cheaper than ${comp} over time?`,
        answer: `Yes, because Distrozi doesn't charge hidden recurring fees for YouTube Content ID or release scheduling, saving you significant money as your catalog grows.`
      },
      {
        question: `Can I migrate my catalog from ${comp} to Distrozi?`,
        answer: `Absolutely. Upload your tracks to Distrozi using the exact same audio files, metadata, and ISRCs, and then request a takedown from ${comp} once the releases are live.`
      }
    ];

    content.push({
      type: "heading",
      text: "Compare Platforms Side-by-Side"
    });
    content.push({
      type: "platforms",
      platformItems: [
        { name: "Distrozi", logoDomain: "distrozi.com", description: "Premium distribution alternative with transparent pricing, zero hidden fees, and lifetime catalog protection.", url: "https://distrozi.com", bestFor: "Best Overall", rating: "4.9/5", pricing: "Flat Annual Fee / Splits", pros: ["Music stays live forever", "Direct bank payouts", "YouTube CMS integration"] },
        { name: comp, logoDomain: comp.toLowerCase().replace(/\s+/g, "") + ".com", description: `Standard distribution platform: ${compProfile.pricing}`, url: "https://" + comp.toLowerCase().replace(/\s+/g, "") + ".com", bestFor: "Competitor", rating: "4.4/5", pricing: "Annual Fee", pros: compProfile.pros }
      ]
    });

  // 3rd Category: B2B RESOURCES PAGES
  } else if (item.category === "resources") {
    const t = item.topic;
    content = [
      {
        type: "paragraph",
        text: `Managing a record label or music publishing company in the digital streaming age requires specialized enterprise tools. Generic retail distribution portals lack the security, roster control, and bulk accounting systems needed to scale. Distrozi provides B2B services, including ${t}, designed to help you manage your catalog and roster efficiently.`
      },
      {
        type: "heading",
        text: "1. Roster Management & Bulk Metadata Ingestion"
      },
      {
        type: "paragraph",
        text: `Distrozi's catalog dashboard allows label administrators to easily manage multiple artist rosters under a single dashboard. From automated royalty splits to bulk DDEX metadata ingestion, we strip away the complex administration of digital delivery, letting you focus on signing and developing talent.`
      },
      {
        type: "heading",
        text: "2. Scalable API Pipelines and White-Label Dashboards"
      },
      {
        type: "paragraph",
        text: `For larger media networks and startups, having branded portals is essential. Distrozi's white-label distribution system and robust REST APIs allow you to build proprietary upload dashboards and catalog management pipelines directly under your brand name, powered by our secure global infrastructure.`
      },
      {
        type: "heading",
        text: "3. Direct YouTube CMS & Content Rights Integration"
      },
      {
        type: "paragraph",
        text: "Labels need direct, clean pathways to whitelist channels and claim User Generated Content (UGC). Distrozi handles direct YouTube CMS mappings, meaning you don't have to deal with standard retail distributors acting as middlemen for your video assets."
      }
    ];

    comparisonTable = {
      title: "Enterprise Solutions: Distrozi vs. Standard Distributors",
      headers: ["Business Feature", "Distrozi B2B", "Retail Distributors"],
      rows: [
        ["Automated Splits", "Supported (unlimited)", "Manual calculation required"],
        ["Roster Controls", "Yes", "No"],
        ["API & White-Label Access", "Supported", "Not available"],
        ["YouTube CMS Rights Integration", "Direct mapping", "Standard middleman route"],
        ["Dedicated Account Manager", "Yes", "Standard email forms"]
      ]
    };

    faq = [
      {
        question: `How does Distrozi handle royalty splits for record labels?`,
        answer: "Our automated split engine lets you define custom splits for songwriters, producers, and performers, paying them out directly and saving your accounting team hours of work."
      },
      {
        question: `Do you support custom API integrations for music distribution?`,
        answer: "Yes. Distrozi offers fully documented REST API endpoints to build proprietary registration, upload, and reporting portals."
      }
    ];

  // 4th Category: EDUCATIONAL GUIDES & TUTORIALS
  } else if (item.category === "guide") {
    // Determine custom steps based on title
    let guideSteps = [
      { h: "Step 1: Export Your Tracks in Lossless Format", p: "Ensure your audio files are formatted as 16-bit, 44.1kHz WAV or FLAC files. Digital platforms reject compressed files like MP3s to guarantee the best listener quality." },
      { h: "Step 2: Compile Accurate Metadata", p: "Prepare metadata containing the song title, artist name, songwriters, producers, and release date. Accurate metadata prevents release delays and ensures you collect correct royalty payments." },
      { h: "Step 3: Select a Global Distributor", p: "Upload your tracks to a distributor like Distrozi. Specify release dates, upload cover art, and decide which digital streaming platforms (Spotify, Apple, TikTok) you want to target." },
      { h: "Step 4: Claim Your Artist Profiles", p: "Once live, claim your profiles on Spotify for Artists and Apple Music for Artists to track metrics, pitch songs to playlists, and customize your profiles." }
    ];

    if (titleLower.includes("spotify")) {
      guideSteps = [
        { h: "Step 1: Upload to Your Distributor", p: "Upload your music and metadata to Distrozi. Schedule your release at least 14 days in advance to allow processing and playlist pitching." },
        { h: "Step 2: Wait for Delivery Confirmation", p: "We process and deliver your tracks to Spotify within 24-48 hours. You will receive notification once delivery is successful." },
        { h: "Step 3: Access Spotify for Artists", p: "Claim your Spotify for Artists profile to gain access to real-time analytics, edit your bio, and add custom canvas background loop videos." },
        { h: "Step 4: Pitch to Spotify Editorial Playlists", p: "At least 7 days before release, submit your track via the Spotify for Artists dashboard to be considered for official editorial playlists." }
      ];
    } else if (titleLower.includes("isrc")) {
      guideSteps = [
        { h: "1. What is an ISRC Code?", p: "An ISRC (International Standard Recording Code) is a unique 12-character alphanumeric key assigned to individual sound recordings. It acts as a digital fingerprint to track streams and sales." },
        { h: "2. The Anatomy of an ISRC", p: "Characters 1-2 represent the country code (e.g. US), characters 3-5 represent the registrant code, characters 6-7 represent the year of registration, and characters 8-12 represent the track number." },
        { h: "3. How to Obtain ISRC Codes", p: "Distrozi generates free, official ISRC codes automatically when you upload new releases. Alternatively, you can buy bulk codes from national ISRC agencies." }
      ];
    }

    content = [
      {
        type: "paragraph",
        text: `Navigating the digital music ecosystem requires a clear understanding of how distributors, stores, and registration agencies interact. Correctly preparing your files and metadata is the key to preventing release delays and ensuring you collect every cent your music generates.`
      }
    ];

    guideSteps.forEach(step => {
      content.push({ type: "heading", text: step.h });
      content.push({ type: "paragraph", text: step.p });
    });

    comparisonTable = {
      title: "Digital Distribution vs. Traditional Record Labels",
      headers: ["Aspect", "Self-Distribution (Distrozi)", "Traditional Record Label"],
      rows: [
        ["Master Ownership", "Artist retains 100%", "Label owns masters"],
        ["Creative Control", "Complete freedom", "Subject to label approval"],
        ["Royalty Share Split", "Artist keeps up to 100%", "Artist gets 15% - 50% split"],
        ["Release Speed", "Within 24-48 hours", "Months of schedule coordination"]
      ]
    };

    faq = [
      {
        question: "How long does it take for a song to go live on Spotify?",
        answer: "Delivery takes 24-48 hours. However, we suggest scheduling your release at least 14 days in advance to allow for playlist pitching."
      },
      {
        question: "What is the difference between an ISRC code and a UPC code?",
        answer: "An ISRC code tracks streams and play metrics for individual songs, while a UPC code tracks sales metrics for the overall single or album release product."
      }
    ];

  // 5th Category: GENERAL LISTICLE ARTICLES (Best/Free lists)
  } else {
    let listTitle = "Top Music Distribution Platforms Reviewed";
    let listPlatforms = [
      { name: "Distrozi", logoDomain: "distrozi.com", description: "Premium distribution alternative with transparent pricing, zero hidden fees, and lifetime catalog protection.", url: "https://distrozi.com", bestFor: "Best Overall", rating: "4.9/5", pricing: "Flat Annual Fee / Splits", pros: ["Music stays live forever", "Direct bank payouts", "YouTube CMS integration"] },
      { name: "DistroKid", logoDomain: "distrokid.com", description: "A flat-fee annual subscription service providing fast uploads and basic digital delivery workflows.", url: "https://distrokid.com", bestFor: "Unlimited Releases", rating: "4.5/5", pricing: "From $22.99/yr", pros: ["Unlimited uploads", "Fast ingestion speed", "Simple plain text dashboard"] },
      { name: "TuneCore", logoDomain: "tunecore.com", description: "Provides detailed analytics charts, flexible pay-per-release options, and publishing administration add-ons.", url: "https://tunecore.com", bestFor: "Publishing Collection", rating: "4.4/5", pricing: "From $19.99/yr", pros: ["Detailed analytics charts", "Publishing administration add-on", "Good global presence"] },
      { name: "CD Baby", logoDomain: "cdbaby.com", description: "A veteran aggregator charging a one-time fee per release, providing digital delivery and physical distribution.", url: "https://cdbaby.com", bestFor: "One-time Fee", rating: "4.3/5", pricing: "$9.99/release + 9% cut", pros: ["No annual subscription fee", "Physical distribution option", "Sync licensing integration"] },
      { name: "LANDR", logoDomain: "landr.com", description: "An all-in-one platform integrating distribution with professional automated mastering and collaboration plugins.", url: "https://landr.com", bestFor: "Producer Bundle", rating: "4.6/5", pricing: "From $23.99/yr", pros: ["Integrated AI mastering", "Collaboration plugins", "All-in-one producer tools"] }
    ];

    if (titleLower.includes("free")) {
      listTitle = "Top Free Music Distribution Platforms Compared";
      listPlatforms = [
        { name: "Distrozi", logoDomain: "distrozi.com", description: "Modern alternative for labels and artists wanting direct local withdrawals and Content ID without heavy commissions.", url: "https://distrozi.com", bestFor: "Best Premium Alt", rating: "4.9/5", pricing: "Flat Annual Fee / Splits", pros: ["Direct local withdrawals", "YouTube Content ID included", "Keep 100% rights"] },
        { name: "RouteNote", logoDomain: "routenote.com", description: "Provides a flexible model with a 100% free tier (taking a small 15% split) delivering to all major DSPs globally.", url: "https://routenote.com", bestFor: "Flexible Commission", rating: "4.4/5", pricing: "Free (15% split)", pros: ["Keep 85% royalties", "Optional premium upgrade", "All major DSPs"] },
        { name: "Amuse", logoDomain: "amuse.io", description: "Offers mobile-first catalog management and a basic free tier for emerging independent solo artists.", url: "https://amuse.io", bestFor: "Mobile Uploads", rating: "4.3/5", pricing: "Free basic plan", pros: ["Smartphone app dashboard", "Simple split payments", "Clean UI"] },
        { name: "SoundOn", logoDomain: "soundon.global", description: "TikTok's native distributor, offering free uploads and direct promotional integrations within the ByteDance network.", url: "https://www.soundon.global", bestFor: "TikTok Artists", rating: "4.5/5", pricing: "Free (TikTok priority)", pros: ["TikTok library priority", "Keep 100% on TikTok", "ByteDance promotions"] },
        { name: "ONErpm", logoDomain: "onerpm.com", description: "Free distribution taking a 15% split, with strong marketing tools and play analytics.", url: "https://onerpm.com", bestFor: "Marketing Tools", rating: "4.2/5", pricing: "Free (15% split)", pros: ["Advanced marketing tools", "Free uploading", "Global store reach"] }
      ];
    }

    content = [
      {
        type: "paragraph",
        text: `Navigating the digital music ecosystem requires a clear understanding of how distributors, stores, and registration agencies interact. Finding the best music distribution service is crucial to get your music on Spotify, Apple Music, and TikTok while keeping your master rights.`
      },
      {
        type: "paragraph",
        text: `Below, we outline the leading platforms, structuring their pricing models, pros, cons, and explaining which types of artists or labels they fit best.`
      }
    ];

    listPlatforms.forEach((p, pIdx) => {
      content.push({
        type: "heading",
        text: `${pIdx + 1}. ${p.name}`
      });
      content.push({
        type: "paragraph",
        text: p.description
      });
    });

    comparisonTable = {
      title: "Digital Distribution vs. Traditional Record Labels",
      headers: ["Aspect", "Self-Distribution (Distrozi)", "Traditional Record Label"],
      rows: [
        ["Master Ownership", "Artist retains 100%", "Label owns masters"],
        ["Creative Control", "Complete freedom", "Subject to label approval"],
        ["Royalty Share Split", "Artist keeps up to 100%", "Artist gets 15% - 50% split"],
        ["Release Speed", "Within 24-48 hours", "Months of schedule coordination"]
      ]
    };

    faq = [
      {
        question: "How long does it take for a song to go live on Spotify?",
        answer: "Delivery takes 24-48 hours. However, we suggest scheduling your release at least 14 days in advance to allow for playlist pitching."
      },
      {
        question: "What is the difference between an ISRC code and a UPC code?",
        answer: "An ISRC code tracks streams and play metrics for individual songs, while a UPC code tracks sales metrics for the overall single or album release product."
      }
    ];

    content.push({
      type: "heading",
      text: listTitle
    });
    content.push({
      type: "platforms",
      platformItems: listPlatforms
    });
  }

  // Related articles (pull two slugs dynamically)
  const relSlugs = PAGES_DATA
    .filter(p => p.category === item.category && p.title !== item.title)
    .slice(0, 2)
    .map(p => makeSlug(p.title));

  let imgUrl = UNSPLASH_IMAGES[idx % UNSPLASH_IMAGES.length];
  
  // Set the local country AVIF image if applicable
  if (item.country && COUNTRY_IMAGES[item.country]) {
    imgUrl = COUNTRY_IMAGES[item.country];
  } else if (HIGH_PRIORITY_IMAGES[slug]) {
    imgUrl = HIGH_PRIORITY_IMAGES[slug];
  }

  return {
    slug: slug,
    category: item.category,
    title: item.title,
    metaTitle: `${item.title} | Distrozi Music Distribution`,
    metaDescription: `Read about ${item.title}. Learn how to distribute your music globally, protect copyrights, and maximize streaming royalties with Distrozi.`,
    publishDate: publishDate,
    author: "Distrozi Editorial Team",
    image: imgUrl,
    readTime: "5 min read",
    content: content,
    faq: faq,
    comparisonTable: comparisonTable,
    relatedSlugs: relSlugs
  };
}

function deleteFolderRecursive(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

function init() {
  console.log("Cleaning old unstructured blogs data...");
  
  if (fs.existsSync(BLOGS_DIR)) {
    const rootItems = fs.readdirSync(BLOGS_DIR);
    const validCategories = ["blog", "compare", "resources", "guide"];
    
    rootItems.forEach(item => {
      if (!validCategories.includes(item)) {
        const itemPath = path.join(BLOGS_DIR, item);
        const stat = fs.statSync(itemPath);
        if (stat.isDirectory()) {
          deleteFolderRecursive(itemPath);
        }
      }
    });
  } else {
    fs.mkdirSync(BLOGS_DIR, { recursive: true });
  }

  console.log("Generating structured SEO pages inside category subdirectories...");

  const validCategories = ["blog", "compare", "resources", "guide"];
  validCategories.forEach(cat => {
    const catPath = path.join(BLOGS_DIR, cat);
    if (!fs.existsSync(catPath)) {
      fs.mkdirSync(catPath, { recursive: true });
    }
  });

  PAGES_DATA.forEach((item, idx) => {
    const slug = makeSlug(item.title);
    const folderPath = path.join(BLOGS_DIR, item.category, slug);
    
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const blogJson = generateBlogContent(item, idx);

    fs.writeFileSync(
      path.join(folderPath, "blog.json"),
      JSON.stringify(blogJson, null, 2),
      "utf-8"
    );
  });

  console.log(`Successfully generated ${PAGES_DATA.length} SEO blog pages inside 'data/blogs/<category>/'!`);
}

init();
