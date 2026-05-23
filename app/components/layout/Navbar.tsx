"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RiMenu3Line,
  RiCloseLine,
  RiArrowDownSLine,
  RiGridLine,
  RiShieldKeyholeLine,
  RiUploadCloud2Line,
  RiMoneyDollarCircleLine,
  RiBarChart2Line,
  RiUserStarLine,
  RiDiscLine,
  RiYoutubeLine,
  RiMagicLine,
  RiEqualizer3Line,
  RiVoiceprintLine,
} from "react-icons/ri";

import Button from "../ui/Button";

interface SubmenuItem {
  name: string;
  desc: string;
  icon: any;
  href?: string;
}

interface NavItem {
  label: string;
  href?: string;
  submenu?: SubmenuItem[];
}

const navConfig: NavItem[] = [
  {
    label: "Features",
    submenu: [
      {
        name: "Catalog Management",
        desc: "Organize metadata, artwork, and tracks.",
        icon: RiGridLine,
        href: "/features/catalog",
      },
      {
        name: "Rights Management",
        desc: "Protect licenses and content ownership.",
        icon: RiShieldKeyholeLine,
        href: "/features/rights",
      },
      {
        name: "Distribution",
        desc: "Deliver tracks to 150+ stores globally.",
        icon: RiUploadCloud2Line,
        href: "/features/distribution",
      },
      {
        name: "Royalty Accounting",
        desc: "Split earnings and track financial reports.",
        icon: RiMoneyDollarCircleLine,
        href: "/features/royalty",
      },
      {
        name: "Analytics Insights",
        desc: "Track real-time streams and audience trends.",
        icon: RiBarChart2Line,
        href: "/features/analytics",
      },
    ],
  },
  {
    label: "Services",
    submenu: [
      {
        name: "Artist Solution",
        desc: "Tailored marketing, licensing, and support.",
        icon: RiUserStarLine,
        href: "/services/artist",
      },
      {
        name: "Label Solution",
        desc: "Scale your imprint with publishing pipelines.",
        icon: RiDiscLine,
        href: "/services/label",
      },
      {
        name: "YouTube Network",
        desc: "Monetize content and join our MCN network.",
        icon: RiYoutubeLine,
        href: "/services/youtube",
      },
    ],
  },
  {
    label: "AI Tools",
    submenu: [
      {
        name: "Music Gen",
        desc: "Generate original backing tracks with AI.",
        icon: RiMagicLine,
      },
      {
        name: "Mastering",
        desc: "Get industry-grade stereo masters instantly.",
        icon: RiEqualizer3Line,
      },
      {
        name: "Vocal Synthesis",
        desc: "Synthesize high-fidelity vocal cloning.",
        icon: RiVoiceprintLine,
      },
    ],
  },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAccordions, setActiveAccordions] = useState<
    Record<string, boolean>
  >({ Features: true });
  const [isVisible, setIsVisible] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) setIsSticky(true);
      else setIsSticky(false);

      if (currentScrollY <= 50) setIsVisible(true);
      else if (currentScrollY < lastScrollY) setIsVisible(true);
      else if (currentScrollY > lastScrollY) setIsVisible(false);

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Ensure "Features" is open when mobile menu is opened
  useEffect(() => {
    if (isOpen) {
      setActiveAccordions((prev) => ({ ...prev, Features: true }));
    }
  }, [isOpen]);

  const toggleAccordion = (label: string) => {
    setActiveAccordions((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      {/* ── Navbar ── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isSticky
            ? "bg-black/60 backdrop-blur-md shadow-2xl"
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible || isOpen ? 0 : -100,
          opacity: 1,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <nav
          className={`mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-10 transition-all duration-300 ${isSticky ? "py-4" : "py-6"}`}
        >
          {/* Logo */}
          <a href="/" className="flex items-center" aria-label="Distrozi Home">
            <img
              src="/logo.png"
              alt="Distrozi Logo"
              className="h-12 w-auto object-contain select-none"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 text-sm font-medium text-foreground md:flex">
            {navConfig.map((item) => {
              const hasSubmenu = !!item.submenu;
              if (hasSubmenu) {
                return (
                  <div key={item.label} className="relative group py-2">
                    <button className="flex items-center gap-1 cursor-pointer transition-colors hover:text-white text-foreground font-medium">
                      {item.label}
                      <RiArrowDownSLine
                        size={16}
                        className="transition-transform duration-300 group-hover:rotate-180 text-muted group-hover:text-white"
                      />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[640px] rounded-2xl bg-neutral-950/98 backdrop-blur-2xl p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 scale-95 group-hover:scale-100 origin-top z-50">
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                        {item.submenu!.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <a
                              key={sub.name}
                              href={sub.href || "#"}
                              className="flex items-start gap-4 p-2.5 rounded-xl hover:bg-white/5 transition-all text-left group/item"
                            >
                              <span className="submenu-item-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                                <SubIcon size={24} />
                              </span>
                              <div className="flex flex-col gap-0.5 justify-center">
                                <div className="submenu-item-title text-sm font-medium">
                                  {sub.name}
                                </div>
                                <div className="text-xs text-muted leading-snug">
                                  {sub.desc}
                                </div>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <a
                  key={item.label}
                  href={item.href || "#"}
                  className="transition-colors hover:text-white text-foreground font-medium py-2"
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Button
              as="a"
              href="https://backstage.distrozi.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="px-3.5 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm md:px-[22px] md:py-[10px] md:text-[15px]"
            >
              <span className="md:hidden">Client Login</span>
              <span className="hidden md:inline">Client Login</span>
            </Button>

            <button
              onClick={() => setIsOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-foreground md:hidden transition-colors focus:outline-none cursor-pointer"
              aria-label="Open menu"
            >
              <RiMenu3Line size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Sidebar — rendered OUTSIDE header to avoid transform stacking context ── */}
      <div
        className={`fixed inset-0 z-[999] md:hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-[88vw] max-w-[360px] flex flex-col bg-[#0a0a0a] border-l border-white/5 shadow-[-40px_0_80px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Glow accent */}
          <div className="pointer-events-none absolute top-0 right-0 w-60 h-60 rounded-full bg-[#f3c343]/10 blur-[90px] opacity-60" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-white/5">
            <a href="/" onClick={() => setIsOpen(false)} aria-label="Home">
              <img
                src="/logo.png"
                alt="Distrozi"
                className="h-8 w-auto object-contain"
              />
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-foreground transition-colors focus:outline-none cursor-pointer"
              aria-label="Close menu"
            >
              <RiCloseLine size={20} />
            </button>
          </div>

          {/* Nav items */}
          <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-1">
            {navConfig.map((item) => {
              const hasSubmenu = !!item.submenu;
              const isExpanded = !!activeAccordions[item.label];

              if (hasSubmenu) {
                return (
                  <div key={item.label} className="flex flex-col">
                    <button
                      onClick={() => toggleAccordion(item.label)}
                      className="flex items-center justify-between w-full px-3 py-3.5 rounded-xl text-[15px] font-medium text-foreground hover:text-[#f3c343] hover:bg-white/5 transition-all cursor-pointer text-left"
                    >
                      <span>{item.label}</span>
                      <RiArrowDownSLine
                        size={18}
                        className={`transition-transform duration-300 text-muted flex-shrink-0 ${isExpanded ? "rotate-180 text-[#f3c343]" : ""}`}
                      />
                    </button>
                    <div
                      className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
                        isExpanded
                          ? "max-h-[600px] opacity-100 mt-1 mb-2"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col gap-1 px-2 py-2 rounded-2xl bg-white/2 border border-white/5">
                        {item.submenu!.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <a
                              key={sub.name}
                              href={sub.href || "#"}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3.5 px-3 py-3 rounded-xl hover:bg-white/5 transition-all"
                            >
                              <span className="submenu-item-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                                <SubIcon size={18} />
                              </span>
                              <div className="flex flex-col gap-0.5 min-w-0">
                                <span className="submenu-item-title text-[13.5px] font-medium leading-tight">
                                  {sub.name}
                                </span>
                                <span className="text-[11.5px] text-muted leading-tight truncate">
                                  {sub.desc}
                                </span>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href || "#"}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-3 py-3.5 rounded-xl text-[15px] font-medium text-foreground hover:text-[#f3c343] hover:bg-white/5 transition-all"
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Footer CTA */}
          <div className="px-5 pb-8 pt-4 border-t border-white/5 flex flex-col gap-3">
            <Button
              as="a"
              href="https://backstage.distrozi.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="w-full justify-center py-3.5 text-[15px] font-medium"
              onClick={() => setIsOpen(false)}
            >
              Client Login
            </Button>
            <p className="text-center text-[11px] text-muted">
              Join 10,000+ artists on Distrozi
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
