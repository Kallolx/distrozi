"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import SupportFAQ from "../../components/sections/SupportFAQ";
import Button from "../../components/ui/Button";

const SUPPORT_CARDS = [
  {
    id: "yt-claim-release",
    title: "YouTube Claim Release",
    desc: "Release a copyright claim on standard or user-generated YouTube videos.",
    icon: "/icons/youtube.png",
  },
  {
    id: "fb-claim-release",
    title: "Facebook Claim Release",
    desc: "Release a copyright claim on videos uploaded to Facebook profiles or pages.",
    icon: "/icons/facebook.svg",
  },
  {
    id: "yt-whitelist",
    title: "YouTube Commercial Whitelist",
    desc: "Whitelist client channels to prevent copyright claims on distributed tracks.",
    icon: "/icons/youtube.png",
  },
  {
    id: "fb-ig-whitelist",
    title: "Facebook / Instagram Whitelist",
    desc: "Whitelist profiles or pages to bypass automated copyright matches on Meta platforms.",
    icon: "/icons/facebook.svg",
  },
  {
    id: "tiktok-safelist",
    title: "TikTok Commercial Safelist",
    desc: "Safelist TikTok accounts and page profiles for commercial audio releases.",
    icon: "/icons/tiktok.svg",
  },
  {
    id: "oac-request",
    title: "Official Artist Channel (OAC) Request",
    desc: "Upgrade standard YouTube channels to Official Artist Channels.",
    icon: "/icons/youtube.png",
  },
  {
    id: "meta-attribution",
    title: "Meta Link / Attribution",
    desc: "Link sound recording ISRCs to Facebook/Instagram pages or attribute Reel claims.",
    icon: "/icons/instagram.svg",
  },
  {
    id: "tiktok-manual-claim",
    title: "TikTok Manual Claim",
    desc: "Request a manual copyright claim for sound assets used in TikTok UGC videos.",
    icon: "/icons/tiktok.svg",
  },
  {
    id: "yt-manual-claim",
    title: "YouTube Manual Claim",
    desc: "Request a manual copyright claim for sound assets used in YouTube UGC videos.",
    icon: "/icons/youtube.png",
  },
];

const COUNTRIES = [
  "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil", "Canada", "Chile", "Colombia",
  "Denmark", "Egypt", "Finland", "France", "Germany", "Greece", "India", "Indonesia", "Ireland", "Italy",
  "Japan", "Kenya", "Malaysia", "Mexico", "Nepal", "Netherlands", "New Zealand", "Nigeria", "Norway",
  "Pakistan", "Philippines", "Poland", "Portugal", "Saudi Arabia", "Singapore", "South Africa", "South Korea",
  "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey", "United Arab Emirates",
  "United Kingdom", "United States", "Vietnam"
];

function CaptchaMock({ onVerify, verified }: { onVerify: (val: boolean) => void; verified: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    if (verified || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerify(true);
    }, 1200);
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10 select-none w-full max-w-[320px] mt-2 mb-4">
      <button
        type="button"
        onClick={handleCheck}
        className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${
          verified
            ? "bg-emerald-500 border-emerald-500 text-white"
            : "border-white/20 hover:border-white/40 bg-black/40"
        } ${loading ? "cursor-wait" : "cursor-pointer"}`}
      >
        {loading && (
          <div className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
        )}
        {verified && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <div className="flex flex-col text-left">
        <span className="text-xs sm:text-sm font-semibold text-white/80">I am not a robot</span>
        <span className="text-[10px] text-white/30">reCAPTCHA (Mock Verification)</span>
      </div>
    </div>
  );
}

export default function SupportFormClient({ formId }: { formId: string }) {
  const card = SUPPORT_CARDS.find((c) => c.id === formId);
  const isMeta = formId === "fb-ig-whitelist" || formId === "meta-attribution";

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successTicket, setSuccessTicket] = useState<string | null>(null);

  // Form States
  const [labelName, setLabelName] = useState("");
  const [email, setEmail] = useState("");
  const [upc, setUpc] = useState("");
  const [url, setUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [isrc, setIsrc] = useState("");
  const [artistName, setArtistName] = useState("");
  const [country, setCountry] = useState("");
  const [channelLink, setChannelLink] = useState("");
  const [topicLink, setTopicLink] = useState("");
  const [vevoLink, setVevoLink] = useState("");
  const [comments, setComments] = useState("");
  const [metaIssue, setMetaIssue] = useState("");

  // Meta Reel States
  const [reelArtist, setReelArtist] = useState("");
  const [reelTrack, setReelTrack] = useState("");
  const [reelTerritories, setReelTerritories] = useState("");
  const [reelTimestamp, setReelTimestamp] = useState("");

  // TikTok Declarations
  const [songTitle, setSongTitle] = useState("");
  const [ugcId, setUgcId] = useState("");
  const [ugcTimeframe, setUgcTimeframe] = useState("");
  const [tkConfirm1, setTkConfirm1] = useState(false);
  const [tkConfirm2, setTkConfirm2] = useState(false);
  const [tkConfirm3, setTkConfirm3] = useState(false);

  // YouTube Declarations
  const [ytConfirm1, setYtConfirm1] = useState(false);
  const [ytConfirm2, setYtConfirm2] = useState(false);
  const [ytConfirm3, setYtConfirm3] = useState(false);
  const [ytConfirm4, setYtConfirm4] = useState(false);
  const [ytTerritories, setYtTerritories] = useState("");
  const [ytStartTime, setYtStartTime] = useState("");
  const [ytEndTime, setYtEndTime] = useState("");

  if (!card) {
    return (
      <ServiceLayout>
        <div className="pt-32 pb-16 min-h-screen flex flex-col justify-center items-center">
          <p className="text-white/60">Form not found.</p>
          <Link href="/support" className="text-[#f3c343] hover:underline mt-4">
            Back to Support
          </Link>
        </div>
      </ServiceLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please complete the Captcha verification.");
      return;
    }

    // UPC validation length checks
    if (["yt-claim-release", "fb-claim-release"].includes(formId)) {
      const cleanedUpc = upc.replace(/\s+/g, "");
      if (cleanedUpc.length !== 13 || isNaN(Number(cleanedUpc))) {
        alert("The Affected UPC must be exactly 13 digits.");
        return;
      }
    }

    setSubmitting(true);

    try {
      const randomTicket = "DT-" + Math.floor(100000 + Math.random() * 900000);
      const payload: Record<string, string> = {
        submissionType: `Support - ${card.title}`,
        ticketId: randomTicket,
        labelName,
        email,
      };

      if (formId === "yt-claim-release") {
        payload.upc = upc;
        payload.youtubeVideoUrl = url;
      } else if (formId === "fb-claim-release") {
        payload.upc = upc;
        payload.facebookVideoUrl = url;
      } else if (formId === "yt-whitelist") {
        payload.upcs = upc;
        payload.youtubeChannelUrl = url;
      } else if (formId === "fb-ig-whitelist") {
        payload.upcs = upc;
        payload.facebookProfileOrPageUrl = facebookUrl;
        payload.instagramProfileUrl = instagramUrl;
      } else if (formId === "tiktok-safelist") {
        payload.tiktokIsrcs = isrc;
        payload.tiktokAccountOrPageUrl = url;
      } else if (formId === "oac-request") {
        payload.upcs = upc;
        payload.artistName = artistName;
        payload.artistCountry = country;
        payload.ownedAndOperatedChannelLink = channelLink;
        payload.topicChannelLink = topicLink;
        if (vevoLink) payload.vevoChannelLink = vevoLink;
        if (comments) payload.additionalComments = comments;
      } else if (formId === "meta-attribution") {
        payload.issueType = metaIssue === "link-isrc" ? "Link ISRC to Profile/Page" : "Attribute Claim on a Reel";
        if (metaIssue === "link-isrc") {
          payload.isrc = isrc;
          payload.facebookProfileOrPageUrl = facebookUrl;
          payload.instagramProfileUrl = instagramUrl;
        } else {
          payload.reelArtistName = reelArtist;
          payload.reelTrackName = reelTrack;
          payload.reelTerritories = reelTerritories;
          payload.isrc = isrc;
          payload.reelTimestamp = reelTimestamp;
          payload.reelLink = url;
          payload.additionalContext = comments;
        }
      } else if (formId === "tiktok-manual-claim") {
        payload.songTitle = songTitle;
        payload.isrc = isrc;
        payload.ugcVideoIdOrLink = ugcId;
        payload.ugcTimeframe = ugcTimeframe;
        payload.declarationNoOtherClaims = tkConfirm1 ? "Confirmed" : "No";
        payload.declarationWorldwideExclusive = tkConfirm2 ? "Confirmed" : "No";
        payload.declarationTruthfulAndAccurate = tkConfirm3 ? "Confirmed" : "No";
      } else if (formId === "yt-manual-claim") {
        payload.youtubeVideoUrl = url;
        payload.isrc = isrc;
        payload.startTime = ytStartTime;
        payload.endTime = ytEndTime;
        payload.declarationNoOtherClaims = ytConfirm1 ? "Confirmed" : "No";
        payload.declarationWorldwideExclusive = ytConfirm2 ? "Confirmed" : "No";
        payload.declarationLimitedTerritories = ytConfirm3 ? "Yes (limited)" : "No (worldwide)";
        if (ytConfirm3) {
          payload.territories = ytTerritories;
        }
        payload.declarationTruthfulAndAccurate = ytConfirm4 ? "Confirmed" : "No";
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request to email system");
      }

      setSuccessTicket(randomTicket);
    } catch (error) {
      console.error("Error submitting support form:", error);
      alert("There was an error submitting your request. Please try again or contact support directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#f5f5f5] overflow-x-hidden font-sans">
      <Navbar />
      <div className="pt-32 pb-16 min-h-screen flex flex-col max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/support"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#f3c343] transition-colors text-sm font-semibold group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Support Portal
          </Link>
        </div>

        {/* Dynamic Card Container with BorderGlow for Premium Styling */}
        <div className="w-full">
          <div className="w-full rounded-2xl bg-[#121212] border border-white/10">
            <div className="p-8 sm:p-12 flex flex-col gap-8 text-left">
              
              {/* Form Title & Big Borderless Logos */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-[#f3c343] tracking-widest uppercase">
                    Support Ticket Portal
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                    {card.title}
                  </h1>
                  <p className="text-white/50 text-sm max-w-xl">
                    {card.desc}
                  </p>
                </div>
                
                {/* Platform Logo(s) - Bigger, No Bg, No Border */}
                <div className="flex items-center gap-4 shrink-0">
                  {isMeta ? (
                    <div className="flex items-center gap-3">
                      <img
                        src="/icons/facebook.svg"
                        alt="Facebook"
                        className="w-14 h-14 object-contain filter brightness-100"
                      />
                      <img
                        src="/icons/instagram.svg"
                        alt="Instagram"
                        className="w-14 h-14 object-contain filter brightness-100"
                      />
                    </div>
                  ) : (
                    <img
                      src={card.icon}
                      alt={card.title}
                      className="w-14 h-14 object-contain filter brightness-100"
                    />
                  )}
                </div>
              </div>

              {successTicket ? (
                /* Success screen */
                <div className="flex flex-col items-center gap-6 text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle size={44} />
                  </div>
                  <div className="flex flex-col gap-2 max-w-md">
                    <h3 className="text-2xl font-bold text-white">Request Submitted Successfully</h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      Your support request ticket has been registered in the rights log system. Our team is reviewing the submission details.
                    </p>
                  </div>
                  <div className="px-6 py-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-base font-bold text-[#f3c343] tracking-wider font-mono">
                    TICKET ID: {successTicket}
                  </div>
                  <div className="flex gap-4 mt-4 w-full justify-center">
                    <Link href="/support">
                      <Button type="button" variant="secondary" className="w-[200px]">
                        Back to Portal
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  {/* Common Fields: Label and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-white/80">
                        Label Name (Company Name) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={labelName}
                        onChange={(e) => setLabelName(e.target.value)}
                        placeholder="Enter company name"
                        className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-white/80">
                        Registered Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter registered email"
                        className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* 1. YouTube Claim Release */}
                  {formId === "yt-claim-release" && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/80">
                          Affected UPC <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={upc}
                          onChange={(e) => setUpc(e.target.value)}
                          placeholder="5054197079234 (13 digits)"
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/80">
                          YouTube Video URL <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          required
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* 2. Facebook Claim Release */}
                  {formId === "fb-claim-release" && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/80">
                          Affected UPC <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={upc}
                          onChange={(e) => setUpc(e.target.value)}
                          placeholder="5054197079234 (13 digits)"
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/80">
                          Facebook Video URL <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          required
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://www.facebook.com/.../videos/..."
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* 3. YouTube Whitelist */}
                  {formId === "yt-whitelist" && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/80">
                          UPCs <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={upc}
                          onChange={(e) => setUpc(e.target.value)}
                          placeholder="Comma-separated, 13 digits each"
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/80">
                          YouTube Channel URL <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          required
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://www.youtube.com/channel/..."
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                        />
                      </div>
                      <div className="p-4 rounded-xl bg-[#f3c343]/5 border border-[#f3c343]/15 text-xs text-[#f3c343]/85 text-left">
                        <span className="font-bold block mb-1">📌 Note</span>
                        Only direct Distrozi client channels will be whitelisted. This service is not available for tracks distributed via Believe Music.
                      </div>
                    </div>
                  )}

                  {/* 4. Facebook / Instagram Whitelist */}
                  {formId === "fb-ig-whitelist" && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/80">
                          UPCs <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={upc}
                          onChange={(e) => setUpc(e.target.value)}
                          placeholder="Comma-separated, 13 digits each"
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-white/80">
                            Facebook Profile / Page URL <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="url"
                            required
                            value={facebookUrl}
                            onChange={(e) => setFacebookUrl(e.target.value)}
                            placeholder="https://www.facebook.com/page"
                            className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-white/80">
                            Instagram Profile URL <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="url"
                            required
                            value={instagramUrl}
                            onChange={(e) => setInstagramUrl(e.target.value)}
                            placeholder="https://www.instagram.com/profile"
                            className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. TikTok Safelist */}
                  {formId === "tiktok-safelist" && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/80">
                          TikTok ISRCs <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={isrc}
                          onChange={(e) => setIsrc(e.target.value)}
                          placeholder="US6X62600839, US6X62600840"
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/80">
                          TikTok Account / Page URL <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          required
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://www.tiktok.com/@username"
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                        />
                      </div>
                      <div className="p-4 rounded-xl bg-[#f3c343]/5 border border-[#f3c343]/15 text-xs text-[#f3c343]/85 text-left">
                        <span className="font-bold block mb-1">📌 Important</span>
                        Please provide the URL of the TikTok account/page and ALL the ISRCs of the sound recordings you wish to safelist. If you wish to safelist different ISRCs for different pages, submit the form multiple times.
                      </div>
                    </div>
                  )}

                  {/* 6. Official Artist Channel (OAC) Request */}
                  {formId === "oac-request" && (
                    <div className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-white/80">
                            UPCs <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={upc}
                            onChange={(e) => setUpc(e.target.value)}
                            placeholder="Minimum 3 UPCs, comma-separated"
                            className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-white/80">
                            Artist Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={artistName}
                            onChange={(e) => setArtistName(e.target.value)}
                            placeholder="Enter artist stage name"
                            className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/80">
                          Artist Country <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                        >
                          <option value="">Select country</option>
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/80">
                          Artist&apos;s Owned & Operated Channel Link <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          required
                          value={channelLink}
                          onChange={(e) => setChannelLink(e.target.value)}
                          placeholder="Link to your personal/band channel"
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-white/80">
                            Artist&apos;s Topic Channel Link <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="url"
                            required
                            value={topicLink}
                            onChange={(e) => setTopicLink(e.target.value)}
                            placeholder="https://www.youtube.com/channel/...-Topic"
                            className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-white/80">
                            Artist&apos;s Vevo Channel Link (Optional)
                          </label>
                          <input
                            type="url"
                            value={vevoLink}
                            onChange={(e) => setVevoLink(e.target.value)}
                            placeholder="https://www.youtube.com/user/...VEVO"
                            className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/80">
                          Additional Comments
                        </label>
                        <textarea
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          placeholder="Add any extra comments here"
                          rows={3}
                          className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all resize-none"
                        />
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/45 flex flex-col select-none text-left">
                        <span className="font-bold text-white/60 mb-1">📋 Eligibility Requirements</span>
                        <ul className="list-disc pl-4 flex flex-col gap-1.5 mt-1">
                          <li>At least 1 official music release on YouTube (3+ recommended)</li>
                          <li>Your artist-owned channel has at least 1 music video with matching audio on Topic channel (3+ recommended)</li>
                          <li>You own and operate a single artist/band YouTube channel focused on the artist&apos;s music</li>
                          <li>Channel complies with YouTube Community Guidelines, ToS, and Copyright policies</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-[#f3c343]/5 border border-[#f3c343]/15 text-xs text-[#f3c343]/85 text-left">
                        <span className="font-bold block mb-1">⚠️ Please Note</span>
                        Approval of OAC requests is entirely at YouTube&apos;s discretion. Distrozi does not control the approval decision or timeline. The review process may take several weeks to a few months, and submission of this form does not guarantee approval.
                      </div>
                    </div>
                  )}

                  {/* 7. Meta Link / Attribution */}
                  {formId === "meta-attribution" && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white/80">
                          Please Select Your Issue <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={metaIssue}
                          onChange={(e) => setMetaIssue(e.target.value)}
                          className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                        >
                          <option value="">Select option</option>
                          <option value="link-isrc">Link ISRC to Facebook/Instagram profile/page</option>
                          <option value="attribute-reel">Attribute Claim on a Reel</option>
                        </select>
                      </div>

                      {metaIssue === "link-isrc" && (
                        <div className="flex flex-col gap-6">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-white/80">
                              ISRC <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={isrc}
                              onChange={(e) => setIsrc(e.target.value)}
                              placeholder="US6X62600839 (12 characters)"
                              className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-semibold text-white/80">
                                Facebook Profile / Page URL <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="url"
                                required
                                value={facebookUrl}
                                onChange={(e) => setFacebookUrl(e.target.value)}
                                placeholder="https://www.facebook.com/page"
                                className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-semibold text-white/80">
                                Instagram Profile URL <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="url"
                                required
                                value={instagramUrl}
                                onChange={(e) => setInstagramUrl(e.target.value)}
                                placeholder="https://www.instagram.com/profile"
                                className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {metaIssue === "attribute-reel" && (
                        <div className="flex flex-col gap-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-semibold text-white/80">
                                Artist / Songwriter Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={reelArtist}
                                onChange={(e) => setReelArtist(e.target.value)}
                                placeholder="One per report"
                                className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-semibold text-white/80">
                                Track Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={reelTrack}
                                onChange={(e) => setReelTrack(e.target.value)}
                                placeholder="One per report"
                                className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-semibold text-white/80">
                                Territories <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={reelTerritories}
                                onChange={(e) => setReelTerritories(e.target.value)}
                                placeholder="Worldwide, or list countries"
                                className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-semibold text-white/80">
                                ISRC (Not UPC) <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={isrc}
                                onChange={(e) => setIsrc(e.target.value)}
                                placeholder="US6X62600839"
                                className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-semibold text-white/80">
                                Timestamp <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={reelTimestamp}
                                onChange={(e) => setReelTimestamp(e.target.value)}
                                placeholder="Format HH:MM:SS"
                                className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-semibold text-white/80">
                                Instagram/Facebook Reel Link <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="url"
                                required
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Link to the target Reel"
                                className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-white/80">
                              Additional Context / Why are you reporting this <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              required
                              value={comments}
                              onChange={(e) => setComments(e.target.value)}
                              placeholder="Explain the attribution details..."
                              rows={3}
                              className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all resize-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 8. TikTok Manual Claim */}
                  {formId === "tiktok-manual-claim" && (
                    <div className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-white/80">
                            Song Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={songTitle}
                            onChange={(e) => setSongTitle(e.target.value)}
                            placeholder="Enter track title"
                            className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-white/80">
                            ISRC <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={isrc}
                            onChange={(e) => setIsrc(e.target.value)}
                            placeholder="US6X62600839"
                            className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-white/80">
                            UGC ID <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={ugcId}
                            onChange={(e) => setUgcId(e.target.value)}
                            placeholder="TikTok Video ID or link"
                            className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-white/80">
                            UGC Timeframe <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={ugcTimeframe}
                            onChange={(e) => setUgcTimeframe(e.target.value)}
                            placeholder="00:15 - 00:45"
                            className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                          />
                        </div>
                      </div>

                      {/* Required Declarations */}
                      <div className="flex flex-col gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/50 text-left">
                        <span className="font-bold text-white/60 flex items-center gap-1.5 select-none">
                          🛡️ Required Declarations
                        </span>
                        
                        <label className="flex gap-2 items-start cursor-pointer hover:text-white/80 transition-colors select-none mt-1">
                          <input
                            type="checkbox"
                            required
                            checked={tkConfirm1}
                            onChange={(e) => setTkConfirm1(e.target.checked)}
                            className="mt-0.5 shrink-0"
                          />
                          <span>None of my other TikTok assets are currently claiming this video</span>
                        </label>

                        <label className="flex gap-2 items-start cursor-pointer hover:text-white/80 transition-colors select-none">
                          <input
                            type="checkbox"
                            required
                            checked={tkConfirm2}
                            onChange={(e) => setTkConfirm2(e.target.checked)}
                            className="mt-0.5 shrink-0"
                          />
                          <span>The video that I wish to claim contains copyrighted content that my company owns WORLDWIDE and EXCLUSIVELY</span>
                        </label>

                        <label className="flex gap-2 items-start cursor-pointer hover:text-white/80 transition-colors select-none">
                          <input
                            type="checkbox"
                            required
                            checked={tkConfirm3}
                            onChange={(e) => setTkConfirm3(e.target.checked)}
                            className="mt-0.5 shrink-0"
                          />
                          <span>I hereby confirm that all the information above is truthful and accurate. I understand that providing inaccurate or misleading information will cause TikTok to penalize Distrozi, and I will therefore lose the ability to make additional manual claims, or even potentially the ability to distribute to TikTok.</span>
                        </label>
                      </div>

                      <div className="p-4 rounded-xl bg-[#f3c343]/5 border border-[#f3c343]/15 text-xs text-[#f3c343]/85 text-left">
                        <span className="font-bold block mb-1">⚠️ Important Notice</span>
                        Providing inaccurate or misleading information may cause TikTok to penalize Distrozi, and you may lose the ability to make additional manual claims, or even the ability to distribute to TikTok.
                      </div>
                    </div>
                  )}

                  {/* 9. YouTube Manual Claim */}
                  {formId === "yt-manual-claim" && (
                    <div className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-white/80">
                            URL of the video you wish to claim <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="url"
                            required
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-white/80">
                            ISRC of the asset in the video <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={isrc}
                            onChange={(e) => setIsrc(e.target.value)}
                            placeholder="US6X62600839"
                            className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-white/80">
                            Start Time <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={ytStartTime}
                            onChange={(e) => setYtStartTime(e.target.value)}
                            placeholder="00:30"
                            className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-white/80">
                            End Time <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={ytEndTime}
                            onChange={(e) => setYtEndTime(e.target.value)}
                            placeholder="01:45"
                            className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                          />
                        </div>
                      </div>

                      {/* Required Declarations */}
                      <div className="flex flex-col gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/50 text-left">
                        <span className="font-bold text-white/60 flex items-center gap-1.5 select-none">
                          🛡️ Required Declarations
                        </span>
                        
                        <label className="flex gap-2 items-start cursor-pointer hover:text-white/80 transition-colors select-none mt-1">
                          <input
                            type="checkbox"
                            required
                            checked={ytConfirm1}
                            onChange={(e) => setYtConfirm1(e.target.checked)}
                            className="mt-0.5 shrink-0"
                          />
                          <span>None of my other YouTube assets are currently claiming this video</span>
                        </label>

                        <label className="flex gap-2 items-start cursor-pointer hover:text-white/80 transition-colors select-none">
                          <input
                            type="checkbox"
                            required
                            checked={ytConfirm2}
                            onChange={(e) => setYtConfirm2(e.target.checked)}
                            className="mt-0.5 shrink-0"
                          />
                          <span>The video contains copyrighted content that my company owns WORLDWIDE and EXCLUSIVELY</span>
                        </label>

                        <label className="flex gap-2 items-start cursor-pointer hover:text-white/80 transition-colors select-none">
                          <input
                            type="checkbox"
                            checked={ytConfirm3}
                            onChange={(e) => setYtConfirm3(e.target.checked)}
                            className="mt-0.5 shrink-0"
                          />
                          <span>My company does NOT own worldwide rights. Specify territories below.</span>
                        </label>

                        {ytConfirm3 && (
                          <input
                            type="text"
                            required
                            value={ytTerritories}
                            onChange={(e) => setYtTerritories(e.target.value)}
                            placeholder="Specify territories (EU Only, US/CA)"
                            className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f3c343]/30 transition-all mt-1 ml-6 w-[calc(100%-1.5rem)]"
                          />
                        )}

                        <label className="flex gap-2 items-start cursor-pointer hover:text-white/80 transition-colors select-none">
                          <input
                            type="checkbox"
                            required
                            checked={ytConfirm4}
                            onChange={(e) => setYtConfirm4(e.target.checked)}
                            className="mt-0.5 shrink-0"
                          />
                          <span>I hereby confirm that all the information above is truthful and accurate. I understand that providing inaccurate or misleading information will cause YouTube to penalize Distrozi, and I will therefore lose the ability to make additional manual claims, or even potentially the ability to distribute to YouTube. After submitting, I will email asset ownership documents to support@distrozi.com</span>
                        </label>
                      </div>

                      <div className="p-4 rounded-xl bg-[#f3c343]/5 border border-[#f3c343]/15 text-xs text-[#f3c343]/85 text-left">
                        <span className="font-bold block mb-1">⚠️ Important Notice</span>
                        Providing inaccurate or misleading information may cause YouTube to penalize Distrozi. After submitting, please email us the asset ownership documents so we can properly process the claim.
                      </div>
                    </div>
                  )}

                  {/* Warning message/important notice for standard claim pages */}
                  {(formId === "yt-claim-release" || formId === "fb-claim-release" || formId === "fb-ig-whitelist") && (
                    <div className="p-4 rounded-xl bg-[#f3c343]/5 border border-[#f3c343]/15 text-xs text-[#f3c343]/85 text-left">
                      <span className="font-bold block mb-1">⚠️ Important Notice</span>
                      Note that our company will not monetize the content, nor will rewards for works and soundtracks presented on the {formId === "yt-claim-release" ? "channel" : formId === "fb-claim-release" ? "page/profile" : "channel"} be paid.
                    </div>
                  )}

                  {/* Security Captcha Verification */}
                  <div className="flex flex-col gap-2 mt-2">
                    <label className="text-sm font-semibold text-white/80 select-none">
                      Security Verification <span className="text-red-500">*</span>
                    </label>
                    <CaptchaMock verified={captchaVerified} onVerify={setCaptchaVerified} />
                  </div>

                  {/* Form Submission Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting || !captchaVerified}
                    className="w-full py-3.5 bg-[#f3c343] hover:bg-[#ffd866] text-black font-bold text-sm rounded-xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none flex items-center justify-center gap-2 mt-4"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <span>Submit Request</span>
                    )}
                  </Button>

                </form>
              )}

            </div>
          </div>
        </div>

        {/* Integrated FAQ section at the bottom */}
        <div className="mt-24 border-t border-white/5 pt-8">
          <SupportFAQ />
        </div>

      </div>
      <Footer />
    </main>
  );
}
