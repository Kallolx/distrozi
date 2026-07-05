"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AlertCircle, Loader2, Search, TicketCheck } from "lucide-react";
import ServiceLayout from "../components/layout/ServiceLayout";
import FAQ from "../components/sections/FAQ";
import BorderGlow from "@/components/BorderGlow";

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

interface TicketStatusResult {
  ticketId: string;
  type: string;
  trackArtist: string;
  status: "Pending" | "In Progress" | "Resolved" | "Rejected";
  date: string;
}

const statusStyles: Record<TicketStatusResult["status"], string> = {
  Pending: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  "In Progress": "border-blue-500/20 bg-blue-500/10 text-blue-300",
  Resolved: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  Rejected: "border-red-500/20 bg-red-500/10 text-red-300",
};

function getSupportIcons(type: string) {
  const card = SUPPORT_CARDS.find((item) => item.title === type);
  if (card?.id === "fb-ig-whitelist" || card?.id === "meta-attribution") {
    return [
      { src: "/icons/facebook.svg", alt: "Facebook" },
      { src: "/icons/instagram.svg", alt: "Instagram" },
    ];
  }

  if (card) {
    return [{ src: card.icon, alt: card.title }];
  }

  const normalizedType = type.toLowerCase();
  if (normalizedType.includes("instagram")) {
    return [{ src: "/icons/instagram.svg", alt: "Instagram" }];
  }
  if (normalizedType.includes("facebook") || normalizedType.includes("meta")) {
    return [{ src: "/icons/facebook.svg", alt: "Facebook" }];
  }
  if (normalizedType.includes("tiktok")) {
    return [{ src: "/icons/tiktok.svg", alt: "TikTok" }];
  }

  return [{ src: "/icons/youtube.png", alt: "YouTube" }];
}

export default function SupportClient() {
  const [ticketId, setTicketId] = useState("");
  const [ticketStatus, setTicketStatus] = useState<TicketStatusResult | null>(null);
  const [statusError, setStatusError] = useState("");
  const [checkingStatus, setCheckingStatus] = useState(false);
  const ticketIcons = ticketStatus ? getSupportIcons(ticketStatus.type) : [];

  const handleTicketLookup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanTicketId = ticketId.trim();

    setTicketStatus(null);
    setStatusError("");

    if (!cleanTicketId) {
      setStatusError("Enter your ticket ID to check the latest status.");
      return;
    }

    setCheckingStatus(true);

    try {
      const response = await fetch(
        `/api/support/ticket-status?ticketId=${encodeURIComponent(cleanTicketId)}`,
        { cache: "no-store" }
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatusError(data.message || "No support ticket found with that ID.");
        return;
      }

      setTicketStatus(data.ticket);
    } catch (error) {
      console.error("Ticket lookup failed:", error);
      setStatusError("Unable to check that ticket right now. Please try again.");
    } finally {
      setCheckingStatus(false);
    }
  };

  return (
    <ServiceLayout>
      <div className="pt-32 pb-16 min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Support Page Header */}
        <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-medium tracking-tight text-white"
          >
            How can we <span className="gradient-text font-bold">help?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-white/50 text-sm sm:text-base leading-relaxed"
          >
            Submit release requests, whitelisting, Official Artist Channel requests, or request manual claims. Our rights department handles submissions daily.
          </motion.p>
        </div>

        {/* Ticket Status Lookup */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto w-full mb-14"
        >
          <BorderGlow backgroundColor="#080808" borderRadius={18} className="w-full">
            <div className="p-5 sm:p-6 flex flex-col gap-5">
              <div className="flex items-start gap-3 text-left">
                <div className="w-11 h-11 rounded-xl bg-[#f3c343]/10 border border-[#f3c343]/20 flex items-center justify-center text-[#f3c343] shrink-0">
                  <TicketCheck size={22} />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Check Support Status
                  </h2>
                  <p className="text-xs sm:text-sm text-white/45 leading-relaxed">
                    Enter the ticket ID from your submission confirmation to view the latest support status.
                  </p>
                </div>
              </div>

              <form onSubmit={handleTicketLookup} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 w-4.5 h-4.5" />
                  <input
                    type="text"
                    value={ticketId}
                    onChange={(event) => setTicketId(event.target.value)}
                    placeholder="Enter ticket ID, e.g. DT-493871"
                    className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.06] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#f3c343]/45 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={checkingStatus}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 bg-[#f3c343] hover:bg-[#ffd866] disabled:bg-[#f3c343]/50 text-black text-sm font-bold transition-all cursor-pointer disabled:cursor-not-allowed min-w-32"
                >
                  {checkingStatus ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                  {checkingStatus ? "Checking" : "Search"}
                </button>
              </form>

              {statusError && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3 text-sm text-red-200">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{statusError}</span>
                </div>
              )}

              {ticketStatus && (
                <div className="rounded-xl border border-white/8 bg-white/[0.025] p-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 text-left">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="flex items-center justify-center gap-1 w-12 h-12 rounded-xl bg-white/[0.03] border border-white/8 shrink-0 overflow-hidden">
                      {ticketIcons.map((icon) => (
                        <img
                          key={icon.src}
                          src={icon.src}
                          alt={icon.alt}
                          className={ticketIcons.length > 1 ? "w-5 h-5 object-contain" : "w-8 h-8 object-contain"}
                        />
                      ))}
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-0">
                    <span className="font-mono text-xs font-bold text-[#f3c343]">
                      {ticketStatus.ticketId}
                    </span>
                    <h3 className="text-base font-bold text-white">{ticketStatus.type}</h3>
                    <p className="text-xs text-white/45">
                      {ticketStatus.trackArtist || "Support request"} · Submitted{" "}
                      {new Date(ticketStatus.date).toLocaleDateString([], {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${statusStyles[ticketStatus.status]}`}
                    >
                      {ticketStatus.status}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </BorderGlow>
        </motion.div>

        {/* Support Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUPPORT_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className="group animate-fade-in"
            >
              <Link href={`/support/${card.id}`} className="block h-full cursor-pointer">
                <BorderGlow
                  backgroundColor="#080808"
                  borderRadius={16}
                  className="h-full"
                  enableViewportActive={false}
                >
                  <div className="p-6 sm:p-8 flex flex-col gap-4 text-left h-full">
                    
                    {/* Platform Logo(s) - No Bg, No Border, Bigger */}
                    <div className="flex items-center gap-3 h-14 shrink-0">
                      {card.id === "fb-ig-whitelist" || card.id === "meta-attribution" ? (
                        <>
                          <img
                            src="/icons/facebook.svg"
                            alt="Facebook"
                            className="w-14 h-14 object-contain filter brightness-100 animate-fade-in"
                          />
                          <img
                            src="/icons/instagram.svg"
                            alt="Instagram"
                            className="w-14 h-14 object-contain filter brightness-100 animate-fade-in"
                          />
                        </>
                      ) : (
                        <img
                          src={card.icon}
                          alt={card.title}
                          className="w-14 h-14 object-contain filter brightness-100"
                        />
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 mt-2">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#f3c343] transition-colors leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Need custom support? */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 max-w-xl mx-auto w-full"
        >
          <div className="relative rounded-2xl bg-[#f3c343]/[0.02] border border-[#f3c343]/20 hover:border-[#f3c343]/40 p-6 text-center transition-all duration-300 shadow-[0_0_20px_rgba(243,195,67,0.02)] hover:shadow-[0_0_25px_rgba(243,195,67,0.05)]">
            {/* Ambient gold glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(243,195,67,0.04)_0%,transparent_70%)] pointer-events-none rounded-2xl" />
            
            <p className="text-white/80 text-base font-semibold relative z-10 flex items-center justify-center gap-2">
              <span>💡</span> Need custom assistance?
            </p>
            <p className="text-white/50 text-sm mt-1.5 relative z-10 leading-relaxed">
              If you have any custom requests or questions not covered by the forms above, email us directly at{" "}
              <a
                href="mailto:support@distrozi.com"
                className="text-[#f3c343] hover:text-[#ffd866] transition-colors font-semibold underline decoration-[#f3c343]/30 hover:decoration-[#ffd866]"
              >
                support@distrozi.com
              </a>
            </p>
          </div>
        </motion.div>

        {/* FAQ Section Integrated */}
        <div className="mt-24 border-t border-white/5 pt-8">
          <FAQ />
        </div>
      </div>
    </ServiceLayout>
  );
}
