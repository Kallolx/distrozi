"use client";

import { useState } from "react";

import BorderGlow from "@/components/BorderGlow";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }
    
    setStatus("sending");
    
    // Simulate high-end backend dispatch
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        role: "",
        email: "",
        phone: "",
        message: ""
      });
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") setStatus("idle");
  };

  return (
    <section className="relative w-full py-16 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white max-w-2xl leading-[1.15]">
            Start Your <span className="gradient-text font-semibold">Distribution Partnership</span>
          </h2>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch w-full">
          
          {/* Left Column: Smart Unified Location Card */}
          <div className="lg:col-span-5 w-full flex flex-col">
            <BorderGlow
              backgroundColor="#0b0b0b"
              borderRadius={16}
              className="w-full h-full flex"
            >
              <div className="flex flex-col w-full h-full overflow-hidden rounded-[16px]">
                
                {/* Location Map (Top Area) - Explicit top rounding to guarantee clipping */}
                <div className="w-full h-48 sm:h-56 lg:h-auto lg:flex-grow bg-black relative border-b border-white/5 rounded-t-[16px] overflow-hidden">
                  <iframe
                    title="London Headquarters Location Map"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1325%2C51.5115%2C-0.1235%2C51.5155&amp;layer=mapnik&amp;marker=51.5136%2C-0.1279"
                    className="w-full h-full border-0 select-none pointer-events-none rounded-t-[16px]"
                    style={{
                      filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)"
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Location & Communication Details (Bottom Area - Dense Spacing) */}
                <div className="p-5 flex flex-col gap-4 text-left shrink-0">

                  {/* Office Address */}
                  <div className="flex gap-3 items-start">
                    <div className="text-white/40 mt-0.5 shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider text-white/40">Office Address</h4>
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed mt-0.5">
                        71-75 Shelton Street, Covent Garden, London, WC2H 9JQ
                      </p>
                    </div>
                  </div>

                  {/* Support Hours */}
                  <div className="flex gap-3 items-start border-t border-white/5 pt-4">
                    <div className="text-white/40 mt-0.5 shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.3 14.3L11 13.8V7h1.5v6.1l3.5 2.1-.7 1.1z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider text-white/40">Support Hours</h4>
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed mt-0.5">
                        Mon - Fri 3AM - 5PM
                      </p>
                    </div>
                  </div>

                  {/* Direct Connect Grid */}
                  <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-1">
                    
                    {/* Phone Connect */}
                    <div className="flex gap-2.5 items-center">
                      <div className="text-white/40 shrink-0">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.57a1 1 0 0 0-1.01.24l-1.57 1.57c-2.83-1.44-5.15-3.76-6.59-6.59l1.57-1.57a1 1 0 0 0 .24-1.01 11.51 11.51 0 0 1-.57-3.53c0-.56-.43-1.01-.97-1.01H4c-.56 0-1.01.45-1.01 1.01C2.99 14.89 12.11 24 21 24c.56 0 1.01-.45 1.01-1.01v-3.87c0-.56-.45-1-.97-1z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/30 block uppercase tracking-wider leading-none">Call</span>
                        <a href="tel:+447307601744" className="text-[11px] sm:text-xs text-white/80 hover:text-white font-semibold transition-colors duration-200">
                          +44 7307 601 744
                        </a>
                      </div>
                    </div>

                    {/* Email Connect */}
                    <div className="flex gap-2.5 items-center">
                      <div className="text-white/40 shrink-0">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[9px] text-white/30 block uppercase tracking-wider leading-none">Email</span>
                        <a href="mailto:contact@distrozi.com" className="text-[11px] sm:text-xs text-white/80 hover:text-white font-semibold transition-colors duration-200 block truncate">
                          contact@distrozi.com
                        </a>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </BorderGlow>
          </div>

          {/* Right Column: Premium Form Block */}
          <div className="lg:col-span-7 w-full flex flex-col">
            <BorderGlow
              backgroundColor="#0b0b0b"
              borderRadius={16}
              className="w-full h-full flex"
            >
              <div className="p-5 sm:p-6 flex flex-col gap-4 text-left relative overflow-hidden w-full h-full">
                
                <div className="flex flex-col gap-0.5 border-b border-white/5 pb-3">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Distribution Inquiry</h3>
                </div>

                {status === "success" ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center gap-3 w-full">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white">Inquiry Dispatched</h4>
                    <p className="text-xs text-white/50 max-w-sm leading-relaxed">
                      We will review your submission and follow up within one business day.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-3 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 w-full">
                    
                    {/* Name & Role Field Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name *"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-xs sm:text-sm placeholder-white/30"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          placeholder="Role / Position"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-xs sm:text-sm placeholder-white/30"
                        />
                      </div>
                    </div>

                    {/* Email & Phone Field Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email Address *"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-xs sm:text-sm placeholder-white/30"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone Number"
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-xs sm:text-sm placeholder-white/30"
                        />
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Main Message Text *"
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors duration-200 text-xs sm:text-sm placeholder-white/30 resize-none"
                      />
                    </div>

                    {/* Errors / Feedback Notices */}
                    {status === "error" && (
                      <span className="text-xs font-semibold text-rose-500">
                        * Please fill out all required fields.
                      </span>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full mt-1 bg-white text-black hover:bg-white/90 font-bold py-3 rounded-xl transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-2 select-none shadow-md disabled:bg-white/50"
                    >
                      {status === "sending" ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending Ingestion Request...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </button>

                  </form>
                )}

              </div>
            </BorderGlow>
          </div>

        </div>

      </div>
    </section>
  );
}
