"use client";

import dynamic from "next/dynamic";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Contact from "@/app/components/sections/Contact";
import RelatedBlogsGrid from "@/app/components/sections/RelatedBlogsGrid";

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black text-[#f5f5f5] overflow-x-hidden font-sans flex flex-col">
      {/* Global Fixed Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={["#7042f8", "#d159ff", "#3b82f6", "#14b8a6", "#22c55e", "#f3c343"]}
          amplitude={1.2}
          blend={0.4}
        />
        <div className="absolute inset-0 bg-black/60 transition-all duration-300" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.95)_90%)] transition-all duration-300" />
      </div>

      <Navbar />

      {/* Main Content Area */}
      <div className="relative z-10 w-full flex-grow pt-12 pb-16 flex flex-col justify-center">
        <Contact />
        <RelatedBlogsGrid
          heading="Before You"
          highlightedHeading="Contact Us"
          relatedSlugs={[
            "fastest-music-distribution-service",
            "best-free-music-distribution",
            "free-music-distribution-for-independent-artists",
            "best-music-distributor-for-musicians",
            "best-music-distributor-for-youtube-music",
            "most-affordable-music-distribution-service",
            "best-music-distributor-for-spotify",
            "best-music-distributor-for-tiktok",
            "best-music-distributor-for-apple-music",
          ]}
        />
      </div>

      <Footer />
    </main>
  );
}
