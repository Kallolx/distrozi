"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RiCheckboxCircleLine, RiArrowRightLine } from "react-icons/ri";
import Button from "../ui/Button";
import BorderGlow from "@/components/BorderGlow";

// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface KeyFeature {
  title: string;
  subtitle: string;
}

export interface ServiceSectionData {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  glowColor: string;
  features: [
    KeyFeature,
    KeyFeature,
    KeyFeature,
    KeyFeature,
    KeyFeature,
    KeyFeature,
  ];
}

export interface ServicePageData {
  badge: string;
  heroTitle: string;
  heroTitleHighlight?: string;
  heroSubtitle: string;
  accentClass: string;
  glowColor: string;
  sections: ServiceSectionData[];
  consoleType: "label" | "artist";
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ServicePage({ data }: { data: ServicePageData }) {
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // ─── Scrollspy Intersection Observer ──────────────────────────────────────
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    );

    data.sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) {
        observer.observe(el);
        sectionRefs.current[sec.id] = el;
      }
    });

    return () => observer.disconnect();
  }, [data.sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="relative">
      {/* Spacer for fixed Navbar */}
      <div className="h-24 w-full" />

      {/* ══════════════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-6 pb-2 text-center">
        <div className="flex flex-col items-center gap-5">
          {/* Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-widest border border-white/10 bg-white/[0.04] ${data.accentClass}`}
          >
            {data.badge}
          </span>

          {/* Title */}
          <h1 className="title-text text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground max-w-3xl leading-[1]">
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
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. MAIN CONTENT WRAPPER WITH STICKY LEFT SIDEBAR
      ══════════════════════════════════════════════════ */}
      <section className="relative max-w-6xl mx-auto px-6 lg:px-8 py-16 flex gap-12 items-start">
        {/* Desktop Sidebar (Left side, sticky) */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-28 z-30 self-start py-1">
          <div className="flex flex-col gap-5">
            <span className="text-sm uppercase tracking-widest text-muted font-medium">
              Overview
            </span>
            <div className="flex flex-col gap-3.5">
              {data.sections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`text-left text-sm transition-all duration-200 flex items-center gap-2 group ${
                      isActive
                        ? "text-foreground font-semibold translate-x-1"
                        : "text-muted hover:text-foreground font-normal hover:translate-x-0.5"
                    }`}
                  >
                    <RiArrowRightLine
                      className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                        isActive
                          ? "text-amber-400 opacity-100 scale-110 drop-shadow-[0_0_8px_#f3c343]"
                          : "opacity-0 -translate-x-2"
                      }`}
                    />
                    <span className="truncate">{sec.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Sections Listing */}
        <div className="flex-1 flex flex-col gap-32 lg:gap-40 min-w-0">
          {data.sections.map((sec, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={sec.id}
                id={sec.id}
                className="scroll-mt-36 flex flex-col gap-12"
              >
                {/* Top alternating content showcase */}
                <div
                  className={`flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-14 ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Visual Image container with BorderGlow */}
                  <div className="w-full lg:w-1/2 shrink-0">
                    <BorderGlow
                      backgroundColor="#090909"
                      borderRadius={18}
                      glowColor={sec.glowColor}
                      glowIntensity={0.65}
                      className="w-full aspect-[16/9] overflow-hidden"
                      enableViewportActive={false}
                    >
                      <div className="relative w-full h-full p-1.5">
                        <img
                          src={sec.image}
                          alt={sec.imageAlt}
                          className="w-full h-full object-cover rounded-[12px] opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none rounded-[12px] m-1.5" />
                      </div>
                    </BorderGlow>
                  </div>

                  {/* Copy content */}
                  <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-medium text-foreground title-text leading-tight">
                      {sec.title}
                    </h2>
                    <p className="text-muted text-base leading-relaxed">
                      {sec.description}
                    </p>
                  </div>
                </div>

                {/* Sub-grid of 6 Key Features */}
                <div className="flex flex-col gap-5">
                  <span className="text-sm uppercase tracking-widest text-muted/80 font-semibold pb-2">
                    Key Features
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sec.features.map((feat) => (
                      <div
                        key={feat.title}
                        className="group flex flex-col gap-2 p-5 rounded-2xl bg-black/[0.5] border border-white/[0.05] hover:bg-white/[0.035] hover:border-white/[0.1] transition-all duration-300"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-400">
                            <RiCheckboxCircleLine size={18} />
                          </span>
                          <span className="text-md font-medium text-foreground group-hover:text-primary transition-colors">
                            {feat.title}
                          </span>
                        </div>
                        <span className="text-sm text-muted leading-relaxed group-hover:text-muted/90 transition-colors">
                          {feat.subtitle}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. BANNER CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="h-px bg-white/[0.06] mb-20" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.02] px-8 sm:px-14 py-14 sm:py-16 text-center"
        >
          {/* Subtle gold ambient glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(243,195,67,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 flex flex-col items-center gap-5">
            <h2 className="text-3xl sm:text-4xl font-medium text-foreground title-text max-w-xl leading-snug">
              Take your music global
            </h2>
            <p className="text-muted text-base max-w-md">
              Join over 10,000 global artists and record labels already running
              on Distrozi.
            </p>
            <Button as="a" href="/start" variant="primary" size="lg">
              Get Started Now
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
