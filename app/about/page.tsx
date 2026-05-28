"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import BorderGlow from "@/components/BorderGlow";
import Button from "../components/ui/Button";
import { 
  RiRocket2Line, 
  RiEarthLine, 
  RiTeamLine, 
  RiFingerprintLine,
  RiArrowRightLine
} from "react-icons/ri";

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });

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

export default function AboutPage() {
  const stats = [
    { label: "Active Creators", value: "10K+" },
    { label: "Countries Reached", value: "150+" },
    { label: "Streams Processed", value: "5B+" },
    { label: "Payouts Issued", value: "$10M+" },
  ];

  const values = [
    {
      title: "Creator First",
      desc: "We believe artists should maintain 100% of their rights and receive their earnings quickly and transparently.",
      icon: RiFingerprintLine,
    },
    {
      title: "Global Reach",
      desc: "Music has no borders. Our infrastructure guarantees your sound reaches every corner of the globe.",
      icon: RiEarthLine,
    },
    {
      title: "Radical Transparency",
      desc: "No hidden fees, no complex royalty accounting. You see exactly what your music earns, down to the cent.",
      icon: RiTeamLine,
    },
    {
      title: "Future Powered",
      desc: "We integrate AI-driven analytics and automated rights management to keep you ahead of the industry curve.",
      icon: RiRocket2Line,
    },
  ];

  return (
    <main className="relative min-h-screen bg-black text-[#f5f5f5] overflow-x-hidden font-sans">
      {/* Global Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={["#7042f8", "#d159ff", "#3b82f6", "#14b8a6", "#22c55e", "#f3c343"]}
          amplitude={1.2}
          blend={0.5}
        />
        {/* Dimming overlay */}
        <div className="absolute inset-0 bg-black/45 sm:bg-black/25 transition-all duration-300" />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.9)_95%)] sm:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_90%)] transition-all duration-300" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] sm:bg-[size:32px_32px] transition-all duration-300" />
      </div>

      <Navbar />

      <div className="relative z-10 w-full pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-24">
          
          {/* Hero Section */}
          <section className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-10 pb-10 text-center">
            <motion.div {...fadeUp(0)} className="flex flex-col items-center gap-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-400 mb-2 uppercase tracking-widest shadow-sm">
                Our Story
              </div>
              <h1 className="title-text text-4xl sm:text-5xl lg:text-7xl font-medium text-foreground max-w-4xl leading-[1.1]">
                We are rebuilding the <span className="gradient-text font-semibold">music industry</span>.
              </h1>
              <p className="text-xl text-muted max-w-2xl leading-relaxed">
                Distrozi was founded with a singular mission: to strip away the complexity of global music distribution and give independent artists the power of a major label, right from their bedroom.
              </p>
              <div className="mt-2">
                <Button as="a" href="/start" variant="primary" size="lg">
                  Join the Movement
                </Button>
              </div>
            </motion.div>
          </section>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <BorderGlow key={i} backgroundColor="#0b0b0b" borderRadius={16}>
                <div className="p-6 flex flex-col items-center justify-center text-center gap-2 h-full">
                  <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">{stat.value}</span>
                  <span className="text-xs uppercase tracking-widest text-white/40 font-semibold">{stat.label}</span>
                </div>
              </BorderGlow>
            ))}
          </div>

          {/* Vision Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col gap-6 text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Beyond just distribution.
              </h2>
              <div className="text-white/60 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Today’s music landscape is fragmented, leaving independent creators struggling to manage metadata, collect royalties, and track unauthorized uploads across platforms like YouTube and TikTok.
                </p>
                <p>
                  We built Distrozi to be an end-to-end ecosystem. By combining MCN network capabilities, direct relationships with 150+ Digital Service Providers (DSPs), and intelligent copyright protection, we ensure that every stream, everywhere in the world, is accounted for.
                </p>
                <p>
                  We are a team of engineers, artists, and industry veterans based in Sheridan, Wyoming, dedicated to building the tools that will power the next generation of global superstars.
                </p>
              </div>
            </div>
            <div className="w-full aspect-square sm:aspect-video lg:aspect-square relative flex items-center justify-center">
              <img 
                src="/features/6.png" 
                alt="Studio session" 
                className="w-full h-full object-contain transition-all duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Value Impact Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 w-full aspect-square relative flex items-center justify-center">
              <img 
                src="/features/14.png" 
                alt="Value Impact and Data" 
                className="w-full h-full object-contain z-10 transition-transform duration-700 hover:scale-105 filter drop-shadow-2xl"
              />
            </div>
            
            <div className="order-1 lg:order-2 flex flex-col gap-6 text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Making a tangible impact.
              </h2>
              <div className="text-white/60 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Our goal goes beyond a digital dashboard; we aim to foster sustainable careers. We have watched bedroom producers scale into charting artists by merely bridging the gap between talent and global accessibility.
                </p>
                <p>
                  Because we don't take ownership of your master rights, every stream translates directly into independence. We provide the data agility you need to see exactly where your audience is, which playlist triggers your spike, and how to harness your momentum.
                </p>
                <p>
                  With comprehensive reporting and zero black-box royalty deductions, Distrozi empowers the artist to become their own institution. Let your data tell the story of your success while you keep the lion's share of your hard-earned revenue.
                </p>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="flex flex-col gap-10">
            <div className="text-center flex flex-col items-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                Our Core Values
              </h2>
              <p className="text-white/50 max-w-xl text-sm sm:text-base">
                These principles guide every feature we build, every artist we sign, and every royalty payment we distribute.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <BorderGlow key={i} backgroundColor="#0b0b0b" borderRadius={16}>
                  <div className="p-8 sm:p-10 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                      <v.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{v.title}</h3>
                    <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </BorderGlow>
              ))}
            </div>
          </div>

          {/* Call to Action Banner */}
          <section className="relative z-10 w-full pb-10">
            <motion.div
              {...fadeUp(0)}
              className="relative rounded-3xl overflow-hidden px-8 sm:px-14 py-14 sm:py-16 text-center"
              style={{ background: "var(--gradient-accent)" }}
            >
              <div className="pointer-events-none absolute inset-0 bg-black/10 mix-blend-multiply" />

              <div className="relative z-10 flex flex-col items-center gap-5">
                <h2 className="text-3xl sm:text-5xl font-medium text-white title-text max-w-2xl shadow-black/10 drop-shadow-md">
                  Ready to take your music further?
                </h2>
                <p className="text-white/90 text-lg max-w-xl drop-shadow-sm">
                  Join over 10,000 artists and labels already growing with Distrozi.
                </p>
                <Button
                  as="a"
                  href="/start"
                  variant="primary"
                  size="lg"
                  className="mt-2 bg-white text-black hover:bg-gray-100 border-none px-10"
                >
                  Start for free
                </Button>
              </div>
            </motion.div>
          </section>

        </div>
      </div>
      <Footer />
    </main>
  );
}
