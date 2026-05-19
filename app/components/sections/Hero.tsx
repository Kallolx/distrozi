"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  RiArrowRightUpLine,
  RiGlobeLine,
  RiMicLine,
  RiPlayCircleLine,
  RiPlayFill,
  RiPauseFill,
  RiSoundModuleLine,
  RiAddLine,
} from "react-icons/ri";
import { SiSpotify, SiApplemusic, SiYoutube, SiTiktok } from "react-icons/si";

import Navbar from "../layout/Navbar";
import Button from "../ui/Button";

const stats = [
  {
    label: "10M+",
    description: "Artists empowered",
    icon: RiMicLine,
  },
  {
    label: "150+",
    description: "Countries reached",
    icon: RiGlobeLine,
  },
  {
    label: "1B+",
    description: "Streams delivered",
    icon: RiPlayCircleLine,
  },
];

const avatars = [1, 2, 3, 4, 5];

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Platforms Glass Container under the person */}
      <div className="hidden md:block absolute bottom-[14%] sm:bottom-[18%] left-1/2 -translate-x-1/2 w-[94%] max-w-[780px] aspect-[5.5/1] z-30">
        {/* The Glass Background using SVG Mask for the arched pill shape */}
        <div
          className="absolute inset-0 w-full h-full shadow-2xl"
          style={{
            background: "rgba(20, 20, 20, 0.4)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            maskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 200' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 50 80 Q 600 -20 1150 80 A 50 50 0 0 1 1150 180 Q 600 80 50 180 A 50 50 0 0 1 50 80 Z' fill='black'/%3E%3C/svg%3E")`,
            WebkitMaskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 200' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 50 80 Q 600 -20 1150 80 A 50 50 0 0 1 1150 180 Q 600 80 50 180 A 50 50 0 0 1 50 80 Z' fill='black'/%3E%3C/svg%3E")`,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
          }}
        />

        {/* The SVG Border overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
        >
          <path
            d="M 50 80 Q 600 -20 1150 80 A 50 50 0 0 1 1150 180 Q 600 80 50 180 A 50 50 0 0 1 50 80 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="2"
          />
        </svg>

        {/* Content */}
        <div className="relative w-full h-full flex items-center justify-between px-[5%] sm:px-[7%]">
          {/* Spotify (t ~ 0.08) */}
          <div className="flex items-center gap-2 sm:gap-3 translate-y-[11px] -rotate-[8deg]">
            <SiSpotify
              size={24}
              color="#1ED760"
              className="sm:w-[28px] sm:h-[28px]"
            />
            <span className="font-semibold text-white text-xs sm:text-base">
              Spotify
            </span>
          </div>

          {/* Apple Music (t ~ 0.29) */}
          <div className="flex items-center gap-2 sm:gap-3 -translate-y-[8px] -rotate-[4deg]">
            <div className="bg-white rounded-lg p-1 sm:p-1.5 flex items-center justify-center">
              <SiApplemusic
                size={16}
                color="#FA243C"
                className="sm:w-[18px] sm:h-[18px]"
              />
            </div>
            <span className="font-semibold text-white text-xs sm:text-base">
              Apple Music
            </span>
          </div>

          {/* YouTube (t = 0.5) */}
          <div className="flex items-center gap-2 sm:gap-3 -translate-y-[13px]">
            <SiYoutube
              size={24}
              color="#FF0000"
              className="sm:w-[28px] sm:h-[28px]"
            />
            <span className="font-semibold text-white text-xs sm:text-base">
              YouTube
            </span>
          </div>

          {/* TikTok (t ~ 0.71) */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3 -translate-y-[8px] rotate-[4deg]">
            <SiTiktok
              size={20}
              color="#fff"
              className="sm:w-[24px] sm:h-[24px]"
            />
            <span className="font-semibold text-white text-xs sm:text-base">
              TikTok
            </span>
          </div>

          {/* And more (t ~ 0.92) */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-3 opacity-80 translate-y-[11px] rotate-[8deg]">
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border border-white/30 flex items-center justify-center">
              <RiAddLine
                size={16}
                className="text-white sm:w-[18px] sm:h-[18px]"
              />
            </div>
            <span className="text-xs sm:text-sm text-white">and more</span>
          </div>
        </div>
      </div>

      <div className="flex min-h-[120vh] w-full flex-col relative z-20">
        <Navbar />

        {/* Background Image */}
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <div className="hero-section absolute inset-0 w-full h-full" />
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-6 pb-12 pt-2 sm:pt-4 lg:pt-10 z-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start mt-4 sm:mt-8 lg:mt-0 w-full">
            <motion.div
              className="flex flex-col gap-6 items-center text-center lg:items-start lg:text-left"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-0 items-center lg:items-start">
                <h1 className="title-text text-4xl text-foreground sm:text-5xl lg:text-6xl">
                  Your Music
                </h1>
                <h1 className="title-text text-4xl text-foreground sm:text-5xl lg:text-6xl">
                  <span className="gradient-text">Everywhere.</span>
                </h1>
              </div>

              <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-start lg:text-left lg:gap-6">
                <img
                  src="/icons/wave.png"
                  alt="Music"
                  className="h-10 w-10 shrink-0 text-primary"
                />
                <p className="text-base text-muted sm:text-lg leading-tight">
                  Release, reach and <br className="hidden lg:inline" /> grow.
                  All in one place.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                <Button as="a" href="#" variant="primary" size="lg">
                  Start Now
                  <RiArrowRightUpLine size={18} />
                </Button>
              </div>
            </motion.div>

            <motion.aside
              className="hidden justify-self-end lg:block"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <div className="stat-card flex w-72 flex-col gap-6 rounded-3xl p-6">
                {stats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-4">
                      <span className="stat-icon flex h-11 w-11 items-center justify-center rounded-2xl">
                        <Icon size={20} />
                      </span>
                      <div>
                        <div className="text-lg font-semibold text-foreground">
                          {item.label}
                        </div>
                        <div className="text-sm text-muted">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.aside>
          </div>

          <motion.div
            className="flex flex-col md:flex-row w-full items-center md:items-end justify-center gap-6 md:gap-12 relative mt-8 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <div className="flex flex-col items-center gap-1.5 md:absolute md:left-0 md:items-start md:gap-3">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                New Release
              </span>
              <div className="text-base sm:text-xl font-semibold text-foreground">
                Midnight City
              </div>
              <div className="gradient-line w-28 sm:w-44" />
            </div>

            <div className="relative flex items-center justify-center my-6 md:my-0 z-10">
              {/* Left Wave (Absolute, direct image) */}
              <motion.img
                src="/hero-images/left-wave.svg"
                alt="Left Wave"
                className="absolute right-full top-1/2 -translate-y-1/2 mr-1 sm:mr-2 w-[80px] sm:w-[110px] md:w-[120px] lg:w-[160px] xl:w-[200px] h-auto max-w-none pointer-events-none z-10 origin-right"
                style={{
                  maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)'
                }}
                animate={isPlaying ? {
                  scaleY: [1, 1.28, 0.72, 1.18, 0.82, 1.08, 1],
                  opacity: 0.95
                } : {
                  scaleY: 1,
                  opacity: 0.6
                }}
                transition={isPlaying ? {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                } : {
                  duration: 0.3
                }}
              />

              {/* Play Button */}
              <motion.button
                className={`cursor-pointer play-button shrink-0 z-20 transition-all duration-300 ${
                  isPlaying ? "playing" : ""
                }`}
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                {isPlaying ? (
                  <RiPauseFill size={28} />
                ) : (
                  <RiPlayFill size={28} />
                )}
              </motion.button>

              {/* Right Wave (Absolute, direct image) */}
              <motion.img
                src="/hero-images/right-wave.svg"
                alt="Right Wave"
                className="absolute left-full top-1/2 -translate-y-1/2 ml-1 sm:ml-2 w-[80px] sm:w-[110px] md:w-[120px] lg:w-[160px] xl:w-[200px] h-auto max-w-none pointer-events-none z-10 origin-left"
                style={{
                  maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                }}
                animate={isPlaying ? {
                  scaleY: [1, 0.72, 1.28, 0.82, 1.18, 1.08, 1],
                  opacity: 0.95
                } : {
                  scaleY: 1,
                  opacity: 0.6
                }}
                transition={isPlaying ? {
                  duration: 1.8,
                  delay: 0.15,
                  repeat: Infinity,
                  ease: "easeInOut"
                } : {
                  duration: 0.3
                }}
              />
            </div>

            <div className="flex flex-col items-center gap-1.5 md:absolute md:right-0 md:items-end md:gap-3">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Listen Now
              </span>
              <div className="flex items-center gap-3">
                <div className="avatar-stack">
                  {avatars.map((item) => (
                    <span key={item} className="avatar-dot" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-muted">+1.2M</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
