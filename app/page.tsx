"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import WhyChoose from "./components/sections/WhyChoose";
import Testimonials from "./components/sections/Testimonials";
import Team from "./components/sections/Team";
import Contact from "./components/sections/Contact";
import FAQ from "./components/sections/FAQ";
import BlogsSlider from "./components/sections/BlogsSlider";
import Footer from "./components/layout/Footer";

const Aurora = dynamic(() => import("../components/Aurora"), { ssr: false });

export default function Home() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Global Fixed Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
        {!isMobile && (
          <Aurora 
            colorStops={["#7042f8", "#d159ff", "#3b82f6", "#14b8a6", "#22c55e", "#f3c343"]}
            amplitude={1.2}
            blend={0.5}
          />
        )}
        {/* Premium solid dimming overlay (more intense on mobile for maximum readability) */}
        <div className="absolute inset-0 bg-black/45 sm:bg-black/25 transition-all duration-300" />
        
        {/* Dynamic radial vignette overlay (deeper black edges on mobile) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.9)_95%)] sm:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_90%)] transition-all duration-300" />
        
        {/* Futuristic studio grid pattern overlay (more distinct grid lines on mobile for text separation) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] sm:bg-[size:32px_32px] transition-all duration-300" />
      </div>

      <Navbar />

      <div className="relative z-10 flex flex-col items-center w-full">
          <Hero isMobile={isMobile} />       
          <Services isMobile={isMobile} />
          <About isMobile={isMobile} />
          <WhyChoose />
          <Testimonials isMobile={isMobile} />
          <FAQ />
          <Contact />
          <Footer />
        </div>
    </main>
  );
}
