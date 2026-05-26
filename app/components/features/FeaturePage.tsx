"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  RiArrowRightLine,
  RiGridLine,
  RiUploadCloud2Line,
  RiBarChart2Line,
  RiShieldKeyholeLine,
  RiMoneyDollarCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import Button from "../ui/Button";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface BenefitCard {
  title: string;
  description: string;
  /** emoji or small icon label shown in the card decoration */
  accent?: string;
  /** image url for the bottom of the card */
  image?: string;
}

export interface FeatureSection {
  title: string;
  description: string;
  /** image url */
  image: string;
  imageAlt: string;
}

export interface FeaturePageData {
  /** short label shown above the hero title e.g. "Feature" */
  badge: string;
  heroTitle: string;
  heroTitleHighlight?: string;
  heroSubtitle: string;
  /** accent colour class for badge/highlight e.g. "text-blue-400" */
  accentClass: string;
  /** glow colour for the image box border */
  glowColor: string;
  /** theme color for highlighted card bg */
  themeColor?: string;
  /** 16:9 showcase image */
  showcaseImage: string;
  showcaseAlt: string;
  benefits: [BenefitCard, BenefitCard, BenefitCard];
  /** alternating image+text sections */
  sections: FeatureSection[];
}

// ─── Explore cards data (shared across all pages) ───────────────────────────

const exploreFeatures = [
  {
    label: "Catalog Management",
    description: "Organize your entire music catalogue in one place.",
    icon: RiGridLine,
    href: "/features/catalog",
    accentClass: "text-blue-400",
    border: "hover:border-blue-500/40",
  },
  {
    label: "Distribution",
    description: "Deliver tracks to 150+ global stores instantly.",
    icon: RiUploadCloud2Line,
    href: "/features/distribution",
    accentClass: "text-violet-400",
    border: "hover:border-violet-500/40",
  },
  {
    label: "Analytics Insights",
    description: "Real-time streaming data and audience analytics.",
    icon: RiBarChart2Line,
    href: "/features/analytics",
    accentClass: "text-emerald-400",
    border: "hover:border-emerald-500/40",
  },
  {
    label: "Rights Management",
    description: "Protect your ownership across every platform.",
    icon: RiShieldKeyholeLine,
    href: "/features/rights",
    accentClass: "text-amber-400",
    border: "hover:border-amber-500/40",
  },
  {
    label: "Royalty Accounting",
    description: "Transparent splits and real-time royalty reports.",
    icon: RiMoneyDollarCircleLine,
    href: "/features/royalty",
    accentClass: "text-rose-400",
    border: "hover:border-rose-500/40",
  },
];

// ─── Animation helpers ───────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any, delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" as any, delay },
});

// ─── Component ───────────────────────────────────────────────────────────────

export default function FeaturePage({
  data,
  currentHref,
}: {
  data: FeaturePageData;
  currentHref: string;
}) {
  return (
    <div className="relative">
      {/* ── Spacer for fixed Navbar ── */}
      <div className="h-24 w-full" />

      {/* ══════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-10 pb-10 text-center">
        <motion.div {...fadeUp(0)} className="flex flex-col items-center gap-5">
          {/* Title */}
          <h1 className="title-text text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground max-w-3xl">
            {data.heroTitle}{" "}
            {data.heroTitleHighlight && (
              <span className="gradient-text">{data.heroTitleHighlight}</span>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-muted max-w-xl leading-relaxed">
            {data.heroSubtitle}
          </p>

          {/* CTA */}
          <div className="mt-2">
            <Button as="a" href="/start" variant="primary" size="lg">
              Get Started
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. SHOWCASE IMAGE (16:9)
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pb-24">
        <motion.div {...fadeIn(0.1)}>
          <div
            className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.08]"
            style={{ boxShadow: `0 0 60px ${data.glowColor}` }}
          >
            <img
              src={data.showcaseImage}
              alt={data.showcaseAlt}
              className="w-full h-full object-cover"
            />
            {/* subtle glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          BOTTOM HALF - SOLID BLACK BACKGROUND
      ══════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full bg-black pt-20">
        {/* ══════════════════════════════════════════════════
            3. BENEFITS (3 cards)
        ══════════════════════════════════════════════════ */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pb-28">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground title-text">
              Why it matters
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.benefits.map((b, i) => {
              const isHighlighted = i === 1;
              return (
                <motion.div
                  key={b.title}
                  {...fadeUp(i * 0.08)}
                  className={`relative flex flex-col rounded-3xl overflow-hidden border min-h-[380px] md:h-[360px] transition-all duration-300 ${
                    isHighlighted
                      ? "border-blue-500/30 bg-blue-950 backdrop-blur-md"
                      : "border-white/5 bg-black/40 hover:border-white/10"
                  }`}
                  style={
                    isHighlighted
                      ? { boxShadow: `0 20px 40px ${data.glowColor}` }
                      : {}
                  }
                >
                  {/* Header Info */}
                  <div className="p-6 md:p-8 pb-4 relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <RiCheckboxCircleFill
                        className={
                          isHighlighted
                            ? "text-blue-400 shrink-0"
                            : "text-white/40 shrink-0"
                        }
                        size={22}
                      />
                      {b.accent && (
                        <span className="text-xl sm:text-2xl mr-1">
                          {b.accent}
                        </span>
                      )}
                      <h3 className="text-lg md:text-xl font-medium tracking-tight text-white">
                        {b.title}
                      </h3>
                    </div>
                    <p
                      className={`text-sm md:text-base leading-relaxed ${isHighlighted ? "text-white" : "text-white/60"}`}
                    >
                      {b.description}
                    </p>
                  </div>

                  {/* Image Content */}
                  <div className="flex-1 relative w-full mt-auto flex flex-col justify-end overflow-hidden pt-4 select-none pointer-events-none">
                    {b.image && (
                      <div className="relative w-full h-[180px] md:h-[210px]">
                        <img
                          src={b.image}
                          alt={b.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
          4. ALTERNATING SECTIONS (5 sections)
      ══════════════════════════════════════════════════ */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pb-24">
          <div className="flex flex-col gap-24 lg:gap-32">
            {data.sections.map((sec, i) => {
              const isEven = i % 2 === 0; // even → image left, text right
              return (
                <motion.div
                  key={sec.title}
                  {...fadeUp(0)}
                  className={`flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2 shrink-0">
                    <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                      <img
                        src={sec.image}
                        alt={sec.imageAlt}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="w-full lg:w-1/2 flex flex-col gap-5">
                    <span className="text-xs font-medium uppercase tracking-widest text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground title-text leading-tight">
                      {sec.title}
                    </h2>
                    <p className="text-muted text-lg leading-relaxed">
                      {sec.description}
                    </p>
                    <div>
                      <Button
                        as="a"
                        href="/start"
                        variant="secondary"
                        size="md"
                      >
                        Get started
                        <RiArrowRightLine size={16} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
          5. EXPLORE OTHER FEATURES
      ══════════════════════════════════════════════════ */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pb-14">
          <motion.div {...fadeUp(0)} className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-medium text-foreground title-text">
              Explore all features
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {exploreFeatures
              .filter((f) => f.href !== currentHref)
              .map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div key={f.label} {...fadeUp(i * 0.06)}>
                    <Link
                      href={f.href}
                      className={`group flex items-center gap-4 p-4 rounded-2xl bg-black/[0.5] border border-white/[0.06] transition-all duration-300`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] ${f.accentClass} transition-colors`}
                      >
                        <Icon size={18} />
                      </span>
                      <span className="text-sm font-medium text-foreground group-hover:text-white transition-colors truncate">
                        {f.label}
                      </span>
                      <RiArrowRightLine
                        size={14}
                        className="shrink-0 text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 ml-auto"
                      />
                    </Link>
                  </motion.div>
                );
              })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
          6. BANNER CTA
      ══════════════════════════════════════════════════ */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pb-24">
          <motion.div
            {...fadeUp(0)}
            className="relative rounded-3xl overflow-hidden px-8 sm:px-14 py-14 sm:py-16 text-center"
            style={{ background: "var(--gradient-accent)" }}
          >
            {/* Subtle overlay to ensure text readability */}
            <div className="pointer-events-none absolute inset-0 bg-black/10 mix-blend-multiply" />

            <div className="relative z-10 flex flex-col items-center gap-5">
              <h2 className="text-3xl sm:text-4xl font-medium text-white title-text max-w-xl shadow-black/10 drop-shadow-md">
                Ready to take your music further?
              </h2>
              <p className="text-white/90 text-base max-w-md drop-shadow-sm">
                Join over 10,000 artists and labels already growing with
                Distrozi.
              </p>
              <Button
                as="a"
                href="/start"
                variant="primary"
                size="lg"
                className="mt-2 bg-white text-black hover:bg-gray-100"
              >
                Start for free
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
