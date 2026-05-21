"use client";

import { motion } from "framer-motion";

const testimonialsRow1 = [
  {
    name: "Sarah Connor",
    role: "Co-founder, VibeRecords",
    text: "The direct YouTube CMS claiming and transparent royalty splits have made managing our 40+ channel catalog incredibly smooth. Distrozi is a game changer.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Kaelen Vance",
    role: "Independent Producer",
    text: "Uploading unlimited albums for $0 upfront while keeping 100% of my masters is exactly the freedom independent artists need today. Absolutely recommend!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Marta Rossi",
    role: "Manager, SoundHive Label",
    text: "Having real-time streaming analytics and visual financial dashboard splits is phenomenal. Our payouts go straight to creators automatically, zero lag!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "David Chen",
    role: "Hip Hop Artist & Creator",
    text: "The 24/7 priority support team is outstanding. They helped fix a critical metadata conflict on Apple Music within hours. True industry professionals.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

const testimonialsRow2 = [
  {
    name: "Alex Rivera",
    role: "Operations Director, SynthFlow",
    text: "No other distributor offers direct CMS asset conflict resolution this fast. It saved our catalog team hundreds of manual verification hours.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Elena Rostova",
    role: "Vocalist & Songwriter",
    text: "The real-time streaming insights let me track exactly where my playlist additions are coming from. The level of detail is superior.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Marcus Brody",
    role: "Founder, Peak Beats Label",
    text: "Zero fees, transparent operations, and direct ledger credits. We migrated our entire back-catalog of 200+ releases in less than a week.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Aaliyah Jackson",
    role: "R&B Artist",
    text: "Having a team that understands video distribution alongside audio CMS claiming is crucial. Distrozi does both flawlessly.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

// Double the items for a seamless marquee loop
const doubledRow1 = [...testimonialsRow1, ...testimonialsRow1];
const doubledRow2 = [...testimonialsRow2, ...testimonialsRow2];

import BorderGlow from "@/components/BorderGlow";

function TestimonialCard({ 
  name, 
  role, 
  text, 
  image 
}: { 
  name: string; 
  role: string; 
  text: string; 
  image: string; 
}) {
  return (
    <BorderGlow
      backgroundColor="#0b0b0b"
      borderRadius={16}
      className="w-[280px] sm:w-[310px] shrink-0 text-left flex h-full"
    >
      <div className="p-4 flex flex-col gap-3 w-full h-full">
        {/* 5 Vector Rating Stars (100% Solid & Safe Vector SVGs) */}
        <div className="flex gap-0.5 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Quote text */}
        <p className="text-xs sm:text-sm text-white/60 leading-relaxed min-h-[64px]">
          "{text}"
        </p>

        {/* Profile info (snug gap) */}
        <div className="flex items-center gap-2.5 mt-1 border-t border-white/5 pt-3">
          <img
            src={image}
            alt={name}
            className="w-9 h-9 rounded-full object-cover border border-white/10 select-none pointer-events-none"
          />
          <div className="flex flex-col">
            <span className="text-white text-xs sm:text-sm font-bold leading-tight">
              {name}
            </span>
            <span className="text-white/40 text-[10px] sm:text-xs leading-none mt-0.5">
              {role}
            </span>
          </div>
        </div>
      </div>
    </BorderGlow>
  );
}

export default function Testimonials() {
  return (
    <section className="relative w-full py-16 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <div className="flex flex-col items-center gap-2.5 mb-14 sm:mb-16">
          {/* Section Heading - Clean & Minimalist */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white max-w-2xl leading-[1.15]">
            Trusted by <span className="gradient-text font-semibold">Artists & Labels</span> Worldwide
          </h2>
        </div>
      </div>

      {/* Infinite Scrolling Marquee Track Containers */}
      <div className="flex flex-col gap-4 w-full relative select-none">
        {/* Left-to-Right Fade Gradient Overlay */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        {/* Row 1: Sliding Left */}
        <div className="overflow-hidden w-full flex py-1">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity,
            }}
            className="flex gap-4 w-max"
          >
            {doubledRow1.map((item, index) => (
              <TestimonialCard
                key={`row1-${index}`}
                name={item.name}
                role={item.role}
                text={item.text}
                image={item.image}
              />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Sliding Right */}
        <div className="overflow-hidden w-full flex py-1">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity,
            }}
            className="flex gap-4 w-max"
          >
            {doubledRow2.map((item, index) => (
              <TestimonialCard
                key={`row2-${index}`}
                name={item.name}
                role={item.role}
                text={item.text}
                image={item.image}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
