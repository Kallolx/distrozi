"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import BorderGlow from "@/components/BorderGlow";
import { 
  RiFileTextLine, 
  RiShieldCheckLine, 
  RiUser3Line, 
  RiScales3Line, 
  RiRestartLine,
  RiMailSendLine 
} from "react-icons/ri";

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("agreement");

  // Handle smooth scrolling and active state
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = sections[0]?.id;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // If the top of the section is near the top of the viewport
        if (rect.top <= 200) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Accounts for sticky header/navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const sections = [
    { id: "agreement", label: "Agreement to Terms", icon: RiFileTextLine },
    { id: "accounts", label: "User Accounts", icon: RiUser3Line },
    { id: "intellectual", label: "Intellectual Property", icon: RiShieldCheckLine },
    { id: "services", label: "Distribution Services", icon: RiRestartLine },
    { id: "liability", label: "Limitation of Liability", icon: RiScales3Line },
    { id: "contact", label: "Contact Us", icon: RiMailSendLine },
  ];

  return (
    <main className="relative min-h-screen bg-black text-[#f5f5f5] overflow-x-hidden font-sans">
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

      <div className="relative z-10 w-full pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-16 sm:mb-20 text-center lg:text-left pt-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-4">
              Terms & <span className="gradient-text font-semibold">Conditions</span>
            </h1>
            <p className="text-white/50 text-sm sm:text-base max-w-2xl">
              Last Updated: May 2026. Please read these terms carefully before using Distrozi's distribution, MCN, and music management platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Sidebar Navigation (Sticky on Desktop) */}
            <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-32">
              <BorderGlow backgroundColor="#0b0b0b" borderRadius={16} className="w-full">
                <nav className="p-6 flex flex-col gap-1 w-full">
                  <span className="text-xs font-bold text-white/30 uppercase tracking-widest block mb-4 px-2">Table of Contents</span>
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(sec.id, e)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm ${
                        activeSection === sec.id
                          ? "bg-white/10 text-white font-medium shadow-sm"
                          : "text-white/50 hover:bg-white/5 hover:text-white/90"
                      }`}
                    >
                      <sec.icon size={16} className={activeSection === sec.id ? "text-blue-400" : "text-white/30"} />
                      {sec.label}
                    </a>
                  ))}
                </nav>
              </BorderGlow>
            </div>

            {/* Main Content Area */}
            <div className="col-span-1 lg:col-span-9 flex flex-col gap-10">
              
              {/* Section 1 */}
              <section id="agreement" className="w-full relative">
                <BorderGlow backgroundColor="#0b0b0b" borderRadius={16} className="w-full">
                  <div className="p-6 sm:p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shrink-0">
                        <RiFileTextLine size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">1. Agreement to Terms</h2>
                    </div>
                    <div className="text-white/60 leading-relax space-y-4 text-sm sm:text-base">
                      <p>
                        These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Distrozi LLC ("Company", "we", "us", or "our"), concerning your access to and use of the Distrozi platform as well as any other media form, related channel, or mobile application related to it.
                      </p>
                      <p>
                        You agree that by accessing the site and platform, you have read, understood, and agreed to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the platform and you must discontinue use immediately.
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              </section>

              {/* Section 2 */}
              <section id="accounts" className="w-full relative">
                <BorderGlow backgroundColor="#0b0b0b" borderRadius={16} className="w-full">
                  <div className="p-6 sm:p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shrink-0">
                        <RiUser3Line size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">2. User Accounts</h2>
                    </div>
                    <div className="text-white/60 leading-relax space-y-4 text-sm sm:text-base">
                      <p>
                        To utilize our distribution or MCN services, you may be required to register with the site. You agree to keep your password confidential and will be responsible for all use of your account and password.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>You must provide truthful, current, and complete information during onboarding.</li>
                        <li>You are strictly prohibited from impersonating another artist, label, or entity.</li>
                        <li>Any fraudulent metadata, fake artist names, or artificial streaming techniques will result in immediate termination of your account and withholding of unpaid royalties.</li>
                      </ul>
                    </div>
                  </div>
                </BorderGlow>
              </section>

              {/* Section 3 */}
              <section id="intellectual" className="w-full relative">
                <BorderGlow backgroundColor="#0b0b0b" borderRadius={16} className="w-full">
                  <div className="p-6 sm:p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <RiShieldCheckLine size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">3. Intellectual Property Rights</h2>
                    </div>
                    <div className="text-white/60 leading-relax space-y-4 text-sm sm:text-base">
                      <p>
                        <strong className="text-white">You Retain 100% Ownership.</strong> Distrozi does not claim copyright ownership over any sound recordings or compositions you submit to us. You retain all of your ownership rights in your User Content.
                      </p>
                      <p>
                        By uploading content through Distrozi, you grant us a limited, worldwide, non-exclusive license to strictly distribute, reproduce, publicly perform, and monetize your content across partnered Digital Service Providers (DSPs) such as Spotify, Apple Music, and the YouTube Content ID system.
                      </p>
                      <p>
                        You represent and warrant that you hold all necessary mechanical and master rights to upload the content, and no content infringes on third-party copyright.
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              </section>

              {/* Section 4 */}
              <section id="services" className="w-full relative">
                <BorderGlow backgroundColor="#0b0b0b" borderRadius={16} className="w-full">
                  <div className="p-6 sm:p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shrink-0">
                        <RiRestartLine size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">4. Distribution Services & Royalties</h2>
                    </div>
                    <div className="text-white/60 leading-relax space-y-4 text-sm sm:text-base">
                      <p>
                        Distrozi attempts to deliver your music as quickly as possible. However, the exact ingestion time on individual DSPs is solely dictated by the DSP's active review policies.
                      </p>
                      <p>
                        <strong>Royalties:</strong> We will calculate and remit your accumulated net revenues on a monthly rolling schedule, typically 45-60 days after the end of the month in which the revenue was generated by the DSP. All payouts are executed via your selected payment method (Bank, PayPal, Crypto, Stripe).
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              </section>

               {/* Section 5 */}
               <section id="liability" className="w-full relative">
                <BorderGlow backgroundColor="#0b0b0b" borderRadius={16} className="w-full">
                  <div className="p-6 sm:p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-rose-400 shrink-0">
                        <RiScales3Line size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">5. Limitation of Liability</h2>
                    </div>
                    <div className="text-white/60 leading-relax space-y-4 text-sm sm:text-base">
                      <p>
                        In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site or our distribution networks.
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              </section>

              {/* Section 6 */}
              <section id="contact" className="w-full relative">
                <BorderGlow backgroundColor="#0b0b0b" borderRadius={16} className="w-full">
                  <div className="p-6 sm:p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shrink-0">
                        <RiMailSendLine size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">6. Contact Us</h2>
                    </div>
                    <div className="text-white/60 leading-relax space-y-4 text-sm sm:text-base">
                      <p>
                        In order to resolve a complaint regarding the platform or to receive further information regarding use of the Services, please contact us at:
                      </p>
                      <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <strong className="text-white block mb-1">Distrozi LLC</strong>
                        <span className="block">Email: <a href="mailto:support@distrozi.com" className="text-blue-400 hover:underline">support@distrozi.com</a></span>
                        <span className="block mt-2 text-xs text-white/40">Response times are normally 24-48 business hours.</span>
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </section>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
