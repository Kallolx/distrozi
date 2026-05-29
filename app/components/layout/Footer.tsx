"use client";

import { useState } from "react";
import {
  RiTwitterFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiArrowRightLine,
  RiCopyrightLine,
} from "react-icons/ri";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="w-full bg-[#050505] pt-16 sm:pt-20 overflow-hidden relative z-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Top Half: Asymmetric Modern Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 sm:pb-16">
          {/* Column 1: Brand & Pitch (Col span 4) */}
          <div className="md:col-span-4 flex flex-col gap-4 text-left">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Distrozi Logo"
                className="h-12 w-auto object-contain select-none pointer-events-none"
              />
            </div>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-sm">
              Distrozi is a global music distribution and rights management
              platform empowering artists and labels with worldwide delivery,
              YouTube CMS & MCN services, content protection, and royalty
              management across 150+ platforms.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
                aria-label="Twitter"
              >
                <RiTwitterFill size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <RiInstagramLine size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <RiLinkedinBoxFill size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links (Col span 2) */}
          <div className="md:col-span-2 flex flex-col gap-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-white/40">
              Platform
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="/features/catalog"
                  className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  Catalog Manager
                </a>
              </li>
              <li>
                <a
                  href="/features/distribution"
                  className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  Distribution Pipeline
                </a>
              </li>
              <li>
                <a
                  href="/features/royalty"
                  className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  Royalty Ledger
                </a>
              </li>
              <li>
                <a
                  href="/features/analytics"
                  className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  Analytics Insights
                </a>
              </li>
              <li>
                <a
                  href="/features/rights"
                  className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  Rights Management
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Links (Col span 2) */}
          <div className="md:col-span-2 flex flex-col gap-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-white/40">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="/services/artist"
                  className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  Artist Solution
                </a>
              </li>
              <li>
                <a
                  href="/services/label"
                  className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  Label Solution
                </a>
              </li>
              <li>
                <a
                  href="/services/youtube"
                  className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  YouTube Network
                </a>
              </li>
              <li>
                <a
                  href="/start"
                  className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Connect (Col span 4) */}
          <div className="md:col-span-4 flex flex-col gap-3.5 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-white/40">
              Stay Tuned
            </h4>
            <p className="text-xs text-white/50 leading-relaxed max-w-sm">
              Subscribe to get release schedules, developer notes, and platform
              update logs.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="relative mt-1 flex flex-col gap-1"
            >
              <div className="relative bg-white/[0.03] hover:bg-white/[0.05] focus-within:bg-white/[0.07] transition-all px-4 py-2.5 rounded-xl flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-white text-xs sm:text-sm placeholder-white/20 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-3 text-white/40 hover:text-white transition-colors p-1 cursor-pointer"
                  aria-label="Subscribe"
                >
                  <RiArrowRightLine size={16} />
                </button>
              </div>
              {subscribed && (
                <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
                  * Added successfully to dispatch registry.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Mid-boundary: Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 text-[11px] text-white/45 select-none text-center sm:text-left">
          <div className="flex items-center gap-1.5">
            <RiCopyrightLine size={12} className="shrink-0" />
            <span>{new Date().getFullYear()} Distrozi LLC. All rights reserved.</span>
          </div>
          <div className="flex items-center flex-wrap justify-center sm:justify-end gap-x-4 gap-y-2">
            <a href="/about" className="hover:text-white transition-colors">About Us</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact Support</a>
            <span className="hidden sm:block opacity-20">|</span>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
