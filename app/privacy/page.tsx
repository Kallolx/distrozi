"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import BorderGlow from "@/components/BorderGlow";
import { 
  RiDatabase2Line, 
  RiRadarLine, 
  RiLockPasswordLine, 
  RiUserVoiceLine, 
  RiGlobalLine,
  RiMailSendLine 
} from "react-icons/ri";

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("collection");

  // Handle smooth scrolling and active state
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = sections[0]?.id;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
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
      const offset = 120;
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
    { id: "collection", label: "Information We Collect", icon: RiDatabase2Line },
    { id: "usage", label: "How We Use Data", icon: RiRadarLine },
    { id: "sharing", label: "Data Sharing", icon: RiGlobalLine },
    { id: "security", label: "Information Security", icon: RiLockPasswordLine },
    { id: "rights", label: "Your Privacy Rights", icon: RiUserVoiceLine },
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
              Privacy <span className="gradient-text font-semibold">Policy</span>
            </h1>
            <p className="text-white/50 text-sm sm:text-base max-w-2xl">
              Last Updated: May 2026. We respect your privacy and are committed to protecting your personal data globally.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Sidebar Navigation */}
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
                      <sec.icon size={16} className={activeSection === sec.id ? "text-emerald-400" : "text-white/30"} />
                      {sec.label}
                    </a>
                  ))}
                </nav>
              </BorderGlow>
            </div>

            {/* Main Content Area */}
            <div className="col-span-1 lg:col-span-9 flex flex-col gap-10">
              
              {/* Section 1 */}
              <section id="collection" className="w-full relative">
                <BorderGlow backgroundColor="#0b0b0b" borderRadius={16} className="w-full">
                  <div className="p-6 sm:p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                        <RiDatabase2Line size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">1. Information We Collect</h2>
                    </div>
                    <div className="text-white/60 leading-relax space-y-4 text-sm sm:text-base">
                      <p>
                        We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li><strong className="text-white">Personal Data:</strong> First name, last name, phone numbers, email addresses, and home/business addresses.</li>
                        <li><strong className="text-white">Credentials & Identity:</strong> Government-issued ID records to combat artificial streaming and securely verify payouts.</li>
                        <li><strong className="text-white">Payment Information:</strong> Bank account numbers, Payoneer, PayPal, or Crypto wallet addresses strictly for royalty remission.</li>
                        <li><strong className="text-white">Artistic Metadata:</strong> Artist names, SRCs, release dates, and YouTube channel URLs.</li>
                      </ul>
                    </div>
                  </div>
                </BorderGlow>
              </section>

              {/* Section 2 */}
              <section id="usage" className="w-full relative">
                <BorderGlow backgroundColor="#0b0b0b" borderRadius={16} className="w-full">
                  <div className="p-6 sm:p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                        <RiRadarLine size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">2. How We Use Your Data</h2>
                    </div>
                    <div className="text-white/60 leading-relax space-y-4 text-sm sm:text-base">
                      <p>
                        We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>To facilitate music delivery to platforms like Spotify and Apple Music.</li>
                        <li>To enforce copyright claims and protect your assets within YouTube CMS.</li>
                        <li>To securely calculate, process, and send your monthly royalty earnings.</li>
                        <li>To prevent fraud, artificial streaming, and protect our DSP partners.</li>
                      </ul>
                    </div>
                  </div>
                </BorderGlow>
              </section>

              {/* Section 3 */}
              <section id="sharing" className="w-full relative">
                <BorderGlow backgroundColor="#0b0b0b" borderRadius={16} className="w-full">
                  <div className="p-6 sm:p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                        <RiGlobalLine size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">3. Data Sharing</h2>
                    </div>
                    <div className="text-white/60 leading-relax space-y-4 text-sm sm:text-base">
                      <p>
                        We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                      </p>
                      <p>
                        Specifically, we routinely transmit your metadata and uploaded sound files to major third-party DSPs (Digital Service Providers) to distribute your releases. Additionally, payment routing details will be shared securely with payment gateways (like PayPal or Stripe) strictly to transmit royalty funds to you.
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              </section>

              {/* Section 4 */}
              <section id="security" className="w-full relative">
                <BorderGlow backgroundColor="#0b0b0b" borderRadius={16} className="w-full">
                  <div className="p-6 sm:p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                        <RiLockPasswordLine size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">4. Information Security</h2>
                    </div>
                    <div className="text-white/60 leading-relax space-y-4 text-sm sm:text-base">
                      <p>
                        We aim to protect your personal information through a system of organizational and technical security measures. We have implemented appropriate, commercially reasonable technical and organizational security measures to protect the security of any sensitive identity data or payment info we process.
                      </p>
                      <p>
                        However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              </section>

               {/* Section 5 */}
               <section id="rights" className="w-full relative">
                <BorderGlow backgroundColor="#0b0b0b" borderRadius={16} className="w-full">
                  <div className="p-6 sm:p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                        <RiUserVoiceLine size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">5. Your Privacy Rights</h2>
                    </div>
                    <div className="text-white/60 leading-relax space-y-4 text-sm sm:text-base">
                      <p>
                        Depending on your location (e.g. EEA, UK, or California), you may have specific rights that allow you greater access to and control over your personal information.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>You may request to access, update, or delete your personal account data at any time.</li>
                        <li>You may opt-out of marketing and promotional communications at any time.</li>
                        <li>In some regions, you have the right to request a digital export of your data.</li>
                      </ul>
                    </div>
                  </div>
                </BorderGlow>
              </section>

              {/* Section 6 */}
              <section id="contact" className="w-full relative">
                <BorderGlow backgroundColor="#0b0b0b" borderRadius={16} className="w-full">
                  <div className="p-6 sm:p-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                        <RiMailSendLine size={24} />
                      </div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">6. Contact Us</h2>
                    </div>
                    <div className="text-white/60 leading-relax space-y-4 text-sm sm:text-base">
                      <p>
                        If you have questions or comments about this privacy policy, you may contact our central support team at:
                      </p>
                      <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <strong className="text-white block mb-1">Distrozi Privacy Team</strong>
                        <span className="block">Email: <a href="mailto:support@distrozi.com" className="text-emerald-400 hover:underline">support@distrozi.com</a></span>
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
