"use client";

import { useState } from "react";
import {
  RiTwitterFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiArrowRightLine,
  RiCopyrightLine
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
              <img src="/logo.png" alt="Distrozi Logo" className="h-12 w-auto object-contain select-none pointer-events-none" />
            </div>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-sm">
              An advanced, autonomous global distribution infrastructure engineered for modern music labels and independent artists. Scale your reach across 150+ platforms with direct rights delivery.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all" aria-label="Twitter">
                <RiTwitterFill size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all" aria-label="Instagram">
                <RiInstagramLine size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all" aria-label="LinkedIn">
                <RiLinkedinBoxFill size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links (Col span 2) */}
          <div className="md:col-span-2 flex flex-col gap-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-white/40">Platform</h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200">Catalog Manager</a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200">Distribution Pipeline</a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200">Royalty Ledger</a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200">AI Creator Suite</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Links (Col span 2) */}
          <div className="md:col-span-2 flex flex-col gap-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-white/40">Company</h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200">About Us</a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200">Careers</a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200">Press Kit</a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200">Contact Support</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Connect (Col span 4) */}
          <div className="md:col-span-4 flex flex-col gap-3.5 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-white/40">Stay Tuned</h4>
            <p className="text-xs text-white/50 leading-relaxed max-w-sm">
              Subscribe to get release schedules, developer notes, and platform update logs.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-1 flex flex-col gap-1">
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

        {/* Mid-boundary: Copyright / Server info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 text-[11px] text-white/45 select-none text-center sm:text-left">
          <div className="flex items-center gap-1.5">
            <RiCopyrightLine size={12} className="shrink-0" />
            <span>{new Date().getFullYear()} Distrozi Ltd. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors font-mono tracking-tighter text-emerald-400/80">SYS // OK</a>
          </div>
        </div>

      </div>

      {/* Colossal Peaking Logo Segment at Bottom (Only Half Top Visible - Absolute Clipped, No Layout Gaps) */}
      <div className="w-full select-none overflow-hidden relative h-[10vw] flex justify-center items-start bg-gradient-to-t from-white/[0.01] to-transparent pointer-events-none mt-2">
        <img src="/logo.png" alt="Distrozi Logo" className="absolute top-0 h-[20vw] w-auto opacity-[0.5] select-none pointer-events-none object-contain" />
      </div>

    </footer>
  );
}
