"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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

export default function SupportClient() {
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
                <BorderGlow backgroundColor="#080808" borderRadius={16} className="h-full">
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

        {/* FAQ Section Integrated */}
        <div className="mt-24 border-t border-white/5 pt-8">
          <FAQ />
        </div>
      </div>
    </ServiceLayout>
  );
}
