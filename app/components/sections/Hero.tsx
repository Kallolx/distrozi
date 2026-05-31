"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  RiGlobeLine,
  RiMicLine,
  RiPlayCircleLine,
  RiPlayFill,
  RiPauseFill,
} from "react-icons/ri";

import Button from "../ui/Button";

const stats = [
  { label: "5K+", description: "Artists & Labels Served", icon: RiMicLine },
  { label: "100+", description: "Countries reached", icon: RiGlobeLine },
  { label: "50K+", description: "Streams delivered", icon: RiPlayCircleLine },
];

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&h=80&q=80",
];

const BRAND_ITEMS = Array.from({ length: 20 }, (_, i) => ({
  id: `brand-${i + 1}`,
  src: `/brands/${i + 1}.svg`,
}));

// Duplicate for seamless loop — animate -50% so it loops perfectly
const MARQUEE_ITEMS = [...BRAND_ITEMS, ...BRAND_ITEMS];

// ─── shared animation presets ───────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.7, delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 28 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, delay },
});

export default function Hero({ isMobile = false }: { isMobile?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-black relative w-full overflow-hidden">

      {/* ── Main Hero ──────────────────────────────────────────────────────── */}
      <div className="flex min-h-[90vh] sm:min-h-screen lg:min-h-[120vh] w-full flex-col relative z-20">
        {/* Spacer to prevent layout shift when Navbar is fixed */}
        <div className="h-20 sm:h-24 w-full shrink-0 pointer-events-none" />

        {/* Background */}
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <motion.div
            className="hero-section absolute inset-0 w-full h-full"
            {...fadeIn(0)}
          />
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between px-6 pb-6 pt-0 sm:pb-12 lg:pt-10 z-20">
          <div className="flex-1 flex flex-col justify-center lg:grid lg:flex-none lg:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start w-full">

            {/* ── Left copy column ── */}
            <div className="flex flex-col gap-6 items-center text-center lg:items-start lg:text-left">

              {/* Line 1: "Your Music" */}
              <motion.div
                className="flex flex-col leading-tighter items-center lg:items-start"
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                <h1 className="title-text text-5xl text-foreground sm:text-6xl lg:text-7xl font-medium">
                  Your Music
                </h1>

                {/* Line 2: "Everywhere." gradient — slight extra delay */}
                <motion.h1
                  className="title-text text-5xl text-foreground sm:text-6xl lg:text-7xl font-medium"
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.22 }}
                >
                  <span className="gradient-text">Everywhere.</span>
                </motion.h1>
              </motion.div>

              {/* Subtitle */}
              <motion.div
                className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-start lg:text-left lg:gap-6"
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.34 }}
              >
                <img
                  src="/icons/wave.png"
                  alt="Music"
                  className="hidden lg:block h-10 w-10 shrink-0 text-primary"
                />
                <p className="text-lg text-muted sm:text-xl leading-tight font-normal">
                  Release, reach and <br /> grow. All in one place.
                </p>
              </motion.div>

              {/* CTA button */}
              <motion.div
                className="flex flex-wrap items-center gap-4 justify-center lg:justify-start"
                initial={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.46 }}
              >
                <Button as="a" href="/apply" variant="primary" size="lg">
                  Apply Now
                </Button>
              </motion.div>
            </div>

            {/* ── Right stat card (desktop) ── */}
            <motion.aside
              className="hidden justify-self-end lg:block"
              {...fadeRight(0.38)}
            >
              <div className="stat-card flex w-72 flex-col gap-6 rounded-3xl p-6">
                {stats.map((item, i) => {
                  const Icon = item.icon;
                  return (
                      <motion.div
                      key={item.label}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + i * 0.1,
                      }}
                    >
                      <span className="stat-icon flex h-11 w-11 items-center justify-center rounded-2xl">
                        <Icon size={20} />
                      </span>
                      <div>
                        <div className="text-lg font-bold text-foreground">
                          {item.label}
                        </div>
                        <div className="text-sm font-semibold text-white/70">
                          {item.description}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.aside>
          </div>

          {/* ── Platforms Marquee Banner ── */}
          <motion.div
            className="w-[96%] max-w-[780px] h-12 sm:h-14 md:h-16 z-30 mx-auto my-4 md:my-6 relative shrink-0"
            aria-label="Supported streaming platforms"
            initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            {/* Glass pill */}
            <div className="absolute inset-0 w-full h-full rounded-full border border-white/15 bg-neutral-900/40 backdrop-blur-2xl shadow-2xl" />

            {/* Marquee track */}
            <div
              className="absolute inset-0 flex items-center overflow-hidden"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            >
              <div className="platform-marquee-track">
                {MARQUEE_ITEMS.map((item, i) => (
                  <div key={`${item.id}-${i}`} className="platform-marquee-item !border-r-0 !px-1.5 sm:!px-2 md:!px-3 flex items-center justify-center shrink-0">
                    <img
                      src={item.src}
                      alt="Brand Partner"
                      className="h-5 sm:h-5.5 md:h-6 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Play row: New Release label / Waves+Button / Listener stats ── */}
          <motion.div
            className="flex flex-col md:flex-row w-full items-center md:items-end justify-center gap-6 md:gap-12 relative mt-2 md:mt-0"
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.65 }}
          >
            {/* New Release label */}
            <div className="hidden md:flex flex-col items-center gap-1.5 md:absolute md:left-0 md:items-start md:gap-2">
              <span className="text-xs sm:text-sm font-medium uppercase text-yellow-400">
                New Release
              </span>
              <div className="text-lg sm:text-2xl font-semibold text-foreground">
                Midnight City
              </div>
              <div className="gradient-line w-36 sm:w-48" />
            </div>

            {/* Waves + Play button */}
            <div className="relative flex items-center justify-center my-6 md:my-0 z-10">
              {/* Left Wave */}
              <motion.img
                src="/hero-images/left-wave.svg"
                alt="Left Wave"
                className="absolute right-full top-1/2 -translate-y-1/2 mr-1 sm:mr-2 w-[100px] sm:w-[120px] md:w-[120px] lg:w-[160px] xl:w-[200px] h-auto max-w-none pointer-events-none z-10 origin-right"
                style={{
                  maskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
                  WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
                }}
                animate={
                  isPlaying
                    ? { scaleY: [1, 1.28, 0.72, 1.18, 0.82, 1.08, 1], opacity: 0.95 }
                    : { scaleY: 1, opacity: 0.6 }
                }
                transition={
                  isPlaying
                    ? { duration: 1.8, repeat: Infinity }
                    : { duration: 0.3 }
                }
              />

              {/* Play Button */}
              <motion.button
                className={`cursor-pointer play-button shrink-0 z-20 transition-all duration-300 ${isPlaying ? "playing" : ""}`}
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                {isPlaying ? <RiPauseFill size={28} /> : <RiPlayFill size={28} />}
              </motion.button>

              {/* Right Wave */}
              <motion.img
                src="/hero-images/right-wave.svg"
                alt="Right Wave"
                className="absolute left-full top-1/2 -translate-y-1/2 ml-1 sm:ml-2 w-[100px] sm:w-[120px] md:w-[120px] lg:w-[160px] xl:w-[200px] h-auto max-w-none pointer-events-none z-10 origin-left"
                style={{
                  maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                }}
                animate={
                  isPlaying
                    ? { scaleY: [1, 0.72, 1.28, 0.82, 1.18, 1.08, 1], opacity: 0.95 }
                    : { scaleY: 1, opacity: 0.6 }
                }
                transition={
                  isPlaying
                    ? { duration: 1.8, delay: 0.15, repeat: Infinity }
                    : { duration: 0.3 }
                }
              />
            </div>

            {/* Listener stats */}
            <div className="flex flex-col items-center gap-1.5 md:absolute md:right-0 md:items-end md:gap-3">
              <span className="text-xs sm:text-sm font-medium uppercase text-yellow-400">
                Listen Now
              </span>
              <div className="flex items-center gap-3">
                <div className="avatar-stack">
                  {avatars.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt="Listener avatar"
                      className="avatar-dot object-cover"
                    />
                  ))}
                </div>
                <span className="text-sm sm:text-base font-bold text-white">+1.2M</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
