"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
  AnimatePresence,
} from "framer-motion";
import {
  Shield,
  ArrowRight,
  Activity,
  Users,
  DollarSign,
  Tv,
} from "lucide-react";

// --- CountUp Component ---
// Extremely performant 60fps numerical count-up that bypasses React re-renders.
function CountUp({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 45, damping: 15 });
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (inView) {
      animate(motionValue, value, { duration, ease: "easeOut" });
    }
  }, [inView, value, motionValue, duration]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          prefix + Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, prefix, suffix]);

  return (
    <span
      ref={ref}
      className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight text-white font-outfit leading-none"
    >
      {prefix}0{suffix}
    </span>
  );
}

// --- Stat Card Component ---
// Compact premium glassmorphic card with dynamic glow
function StatCard({
  children,
  gradientColor = "from-primary/10",
}: {
  children: React.ReactNode;
  gradientColor?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-[#0b0b0b] border border-white/5 p-4 sm:p-5 rounded-2xl relative overflow-hidden transition-all duration-300 group flex flex-col justify-between min-h-[130px] sm:min-h-[150px] shadow-2xl"
    >
      {/* Dynamic Background Hover Glow */}
      <div
        className={`absolute -right-12 -top-12 w-32 h-32 bg-gradient-to-br ${gradientColor} to-transparent blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`}
      />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      <div className="relative z-10 flex flex-col h-full justify-between gap-3">
        {children}
      </div>
    </motion.div>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState<"mission" | "platforms" | "flow">(
    "mission",
  );
  const [latency, setLatency] = useState(24.5);

  // Latency ticker simulating live stream monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Number((21 + Math.random() * 6).toFixed(1)));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const avatars = [
    {
      name: "Alok",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      name: "Sofi",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      name: "KSHMR",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      name: "Armin",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    },
  ];

  return (
    <section className="relative w-full py-20 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-25">
        
        {/* Centered Header - matching Services style */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-medium leading-tighter tracking-tight text-white">
            The ultimate global ecosystem <br className="hidden sm:block" />
            <span className="gradient-text">for independent labels & artists.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-18 items-center">
          {/* ── Left Column: Rich Typography, Tab Switcher & Dynamic Content Panel ── */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            {/* ── INTERACTIVE TAB VIEW SELECTOR ── */}
            <div className="flex gap-1.5 sm:gap-2.5 p-1 bg-white/[0.03] border border-white/5 rounded-xl backdrop-blur-md self-start w-full sm:w-auto overflow-x-auto">
              {[
                { id: "mission", label: "Our Mission" },
                { id: "platforms", label: "Platforms" },
                { id: "flow", label: "Distribution Flow" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap cursor-pointer z-10 font-outfit ${
                    activeTab === tab.id
                      ? "text-black"
                      : "text-white/60 hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-[#f3c343] rounded-lg -z-10 shadow-[0_0_15px_rgba(243,195,67,0.4)]"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── TAB CONTENT SHOWCASE ── */}
            <div className="min-h-[380px] relative bg-white/[0.01] border border-white/5 rounded-2xl p-5 sm:p-7 backdrop-blur-xl shadow-inner flex flex-col justify-start">
              <AnimatePresence mode="wait">
                {activeTab === "mission" && (
                  <motion.div
                    key="mission"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6 text-left"
                  >
                    <p className="text-base sm:text-lg text-white font-medium leading-relaxed font-outfit">
                      Distrozi is a <span className="text-[#f3c343]">global digital music distribution</span> and rights management platform built for modern independent artists, labels, and music businesses.
                    </p>
                    
                    <div className="space-y-4">
                      <p className="text-[13px] sm:text-sm text-white/60 leading-relaxed">
                        We provide advanced distribution infrastructure, YouTube CMS & MCN services, content protection, royalty management, and platform optimization tools designed to help creators scale worldwide.
                      </p>
                      
                      <p className="text-[13px] sm:text-sm text-white/60 leading-relaxed">
                        With delivery to <strong className="text-white/80">150+ digital streaming platforms</strong> and social media services, Distrozi empowers partners to manage releases, monetize content, protect copyrights, and grow audiences through a powerful and reliable ecosystem.
                      </p>

                      <p className="text-[13px] sm:text-sm text-white/60 leading-relaxed italic">
                        From music distribution and Content ID to artist support and label operations, Distrozi combines technology, automation, and industry expertise to simplify global music management for the next generation of creators.
                      </p>
                    </div>

                    <div className="flex items-center gap-6 mt-2 pt-6 border-t border-white/5">
                      <div className="flex items-center -space-x-3">
                        {avatars.map((av, index) => (
                          <div
                            key={index}
                            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-black overflow-hidden bg-zinc-800 shadow"
                            style={{ zIndex: avatars.length - index }}
                          >
                            <img
                              src={av.img}
                              alt={av.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col text-xs font-outfit">
                        <span className="font-semibold text-white/90 flex items-center gap-1.5">
                          Trusted by 1,000+ Creators{" "}
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        </span>
                        <span className="text-white/40">
                          Powering music across 150+ countries
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "platforms" && (
                  <motion.div
                    key="platforms"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                  >
                    {[
                      {
                        src: "/brands/1.svg",
                        name: "Spotify",
                        bg: "hover:shadow-[0_0_20px_rgba(30,215,96,0.15)] hover:border-[#1ED760]/20",
                      },
                      {
                        src: "/brands/2.svg",
                        name: "Apple Music",
                        bg: "hover:shadow-[0_0_20px_rgba(252,60,68,0.15)] hover:border-[#FC3C44]/20",
                      },
                      {
                        src: "/brands/3.svg",
                        name: "YouTube CMS",
                        bg: "hover:shadow-[0_0_20px_rgba(255,0,0,0.15)] hover:border-[#FF0000]/20",
                      },
                      {
                        src: "/brands/4.svg",
                        name: "Amazon Music",
                        bg: "hover:shadow-[0_0_20px_rgba(0,168,225,0.15)] hover:border-[#00A8E1]/20",
                      },
                      {
                        src: "/brands/9.svg",
                        name: "TikTok Ingest",
                        bg: "hover:shadow-[0_0_20px_rgba(0,242,234,0.15)] hover:border-[#00F2EA]/20",
                      },
                      {
                        src: "/brands/5.svg",
                        name: "Deezer HiFi",
                        bg: "hover:shadow-[0_0_20px_rgba(162,56,255,0.15)] hover:border-[#A238FF]/20",
                      },
                    ].map((plt) => (
                      <div
                        key={plt.name}
                        className={`bg-white/[0.02] border border-white/5 p-5 rounded-xl flex items-center justify-center h-16 sm:h-20 transition-all duration-300 ${plt.bg} group/item cursor-default`}
                      >
                        <img
                          src={plt.src}
                          alt={plt.name}
                          className="h-6 sm:h-7 w-auto max-w-[85%] object-contain filter brightness-0 invert opacity-60 group-hover/item:opacity-100 group-hover/item:scale-105 transition-all duration-300"
                        />
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "flow" && (
                  <motion.div
                    key="flow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left"
                  >
                    {[
                      {
                        num: "01",
                        title: "Master Upload",
                        desc: "Drag & drop high-quality WAV files, crediting collaborators instantly on our catalog dashboard.",
                      },
                      {
                        num: "02",
                        title: "Asset Ingestion",
                        desc: "Automated direct ingest into direct partner nodes and central MCN catalogs.",
                      },
                      {
                        num: "03",
                        title: "Rights Claiming",
                        desc: "Immediate YouTube Content ID scanning to claim user-generated content worldwide.",
                      },
                      {
                        num: "04",
                        title: "Split Harvesting",
                        desc: "Collect automated monthly revenue distributions in local currencies at zero cost.",
                      },
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className="bg-white/[0.02] border border-white/5 p-4.5 rounded-xl flex gap-4 items-start hover:border-white/10 transition-colors group/step"
                      >
                        <span className="font-outfit text-sm font-bold text-[#f3c343] bg-[#f3c343]/10 border border-[#f3c343]/20 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                          {step.num}
                        </span>
                        <div className="flex flex-col">
                          <h4 className="font-outfit text-sm sm:text-base font-bold text-white group-hover/step:text-[#f3c343] transition-colors duration-200">
                            {step.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-white/50 leading-relaxed mt-1">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right Column: Dynamic Statistics Console Dashboard ── */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4.5 w-full">
            {/* Card 1: 155+ Channels */}
            <StatCard gradientColor="from-[#3b82f6]/10">
              <div className="flex flex-col items-start gap-0.5 mt-1 text-left">
                <CountUp value={155} suffix="+" />
                <span className="text-[11px] sm:text-xs font-semibold text-white/50 leading-tight font-outfit mt-1">
                  Channels Managed
                </span>
              </div>
              {/* Full-width context visualizer: Spanning spectrum waves */}
              <div className="w-full h-8 relative mt-3 overflow-hidden flex items-end justify-between gap-[3px] px-0.5 pb-1">
                {[
                  0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.3, 0.7, 1.0, 0.5, 0.8, 0.4,
                  0.7, 0.5, 0.9, 0.6, 0.8, 0.3,
                ].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [`20%`, `${h * 95}%`, `20%`],
                    }}
                    transition={{
                      duration: 1.0 + i * 0.08,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-1 bg-[#3b82f6] rounded-full shrink-0 shadow-[0_0_4px_rgba(59,130,246,0.5)]"
                  />
                ))}
              </div>
            </StatCard>

            {/* Card 2: $249,700 Revenue Paid */}
            <StatCard gradientColor="from-[#ec4899]/10">
              <div className="flex flex-col items-start gap-0.5 mt-1 text-left">
                <CountUp value={249700} prefix="$" />
                <span className="text-[11px] sm:text-xs font-semibold text-white/50 leading-tight font-outfit mt-1">
                  Revenue Paid
                </span>
              </div>
              {/* Full-width context visualizer: Moving billing splits flow */}
              <div className="w-full h-8 relative mt-3 overflow-hidden flex items-center justify-between px-0.5">
                <div className="flex items-center gap-1.5 w-full">
                  <div className="w-2 h-2 rounded-full bg-[#ec4899] shadow-[0_0_8px_#ec4899] shrink-0" />
                  <div className="flex-1 h-[3px] bg-white/10 relative overflow-hidden rounded-full">
                    <motion.div
                      animate={{
                        left: ["0%", "100%"],
                        x: ["-100%", "0%"],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-0 bottom-0 w-6 h-[3px] bg-gradient-to-r from-transparent via-[#ec4899] to-transparent shadow-[0_0_8px_#ec4899]"
                    />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#ec4899] shadow-[0_0_8px_#ec4899] shrink-0" />
                </div>
              </div>
            </StatCard>

            {/* Card 3: 13M Subscribers */}
            <StatCard gradientColor="from-[#facc15]/10">
              <div className="flex flex-col items-start gap-0.5 mt-1 text-left">
                <CountUp value={13} suffix="M" />
                <span className="text-[11px] sm:text-xs font-semibold text-white/50 leading-tight font-outfit mt-1">
                  Subscribers
                </span>
              </div>
              {/* Full-width context visualizer: Broadcasting signal & Audience ripple network */}
              <div className="w-full h-8 relative mt-3 overflow-hidden flex items-center justify-between px-0.5">
                {/* Broadcasting beacon */}
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#facc15] shadow-[0_0_8px_#facc15] z-10 animate-pulse" />
                  {[1, 2, 3].map((j) => (
                    <motion.div
                      key={j}
                      initial={{ width: 4, height: 4, opacity: 0.8 }}
                      animate={{
                        width: 80,
                        height: 80,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 2.0,
                        repeat: Infinity,
                        delay: j * 0.6,
                        ease: "easeOut",
                      }}
                      className="absolute rounded-full border border-[#facc15]/30 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: "8px",
                        top: "8px",
                      }}
                    />
                  ))}
                </div>

                {/* Network nodes and signal streams */}
                <div className="flex-1 relative h-full min-w-[120px] overflow-hidden ml-1">
                  {/* Subscriber Audience Nodes */}
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      delay: 0.2,
                      ease: "easeInOut",
                    }}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#facc15] shadow-[0_0_6px_#facc15]"
                    style={{ left: "25%", top: "30%" }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.9, 0.3] }}
                    transition={{
                      duration: 2.0,
                      repeat: Infinity,
                      delay: 0.8,
                      ease: "easeInOut",
                    }}
                    className="absolute w-2 h-2 rounded-full bg-[#facc15] shadow-[0_0_6px_#facc15]"
                    style={{ left: "55%", top: "60%" }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: 1.4,
                      ease: "easeInOut",
                    }}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#facc15] shadow-[0_0_6px_#facc15]"
                    style={{ left: "80%", top: "20%" }}
                  />

                  {/* Subtle connecting lines */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
                    viewBox="0 0 100 32"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,16 Q25,8 25,10"
                      fill="none"
                      stroke="#facc15"
                      strokeWidth="0.75"
                    />
                    <path
                      d="M0,16 Q45,24 55,20"
                      fill="none"
                      stroke="#facc15"
                      strokeWidth="0.75"
                    />
                    <path
                      d="M0,16 Q65,6 80,6"
                      fill="none"
                      stroke="#facc15"
                      strokeWidth="0.75"
                    />
                  </svg>

                  {/* Dynamic travelling signal stream particles */}
                  <motion.div
                    animate={{
                      left: ["0%", "25%"],
                      top: ["50%", "30%"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute w-1 h-1 bg-[#facc15] rounded-full shadow-[0_0_4px_#facc15]"
                  />
                  <motion.div
                    animate={{
                      left: ["0%", "55%"],
                      top: ["50%", "60%"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.0,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.4,
                    }}
                    className="absolute w-1 h-1 bg-[#facc15] rounded-full shadow-[0_0_4px_#facc15]"
                  />
                  <motion.div
                    animate={{
                      left: ["0%", "80%"],
                      top: ["50%", "20%"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.8,
                    }}
                    className="absolute w-1 h-1 bg-[#facc15] rounded-full shadow-[0_0_4px_#facc15]"
                  />
                </div>
              </div>
            </StatCard>

            {/* Card 4: 24X7 Always Active */}
            <StatCard gradientColor="from-emerald-500/10">
              <div className="flex flex-col items-start gap-0.5 mt-1 text-left">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight text-white font-outfit leading-none">
                  24
                  <span className="text-sm font-semibold text-white/50 lowercase mx-0.5">
                    x
                  </span>
                  7
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-white/50 leading-tight font-outfit mt-1">
                  Always Active
                </span>
              </div>
              {/* Full-width context visualizer: Blinking operational servers and live latency */}
              <div className="w-full h-8 relative mt-3 overflow-hidden flex items-center justify-between px-0.5">
                <span className="text-[9px] font-mono text-emerald-400 font-bold font-outfit">
                  LATENCY: {latency}MS
                </span>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        backgroundColor: ["#10b981", "#34d399", "#10b981"],
                        opacity: [0.4, 1, 0.4],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.25,
                        ease: "easeInOut",
                      }}
                      className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#10b981]"
                    />
                  ))}
                </div>
              </div>
            </StatCard>
          </div>
        </div>
      </div>
    </section>
  );
}
