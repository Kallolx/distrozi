"use client";

import dynamic from "next/dynamic";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Contact from "@/app/components/sections/Contact";

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
      </div>

      <Footer />
    </main>
  );
}
