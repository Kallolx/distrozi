"use client";

import BorderGlow from "@/components/BorderGlow";

export default function WhyChoose() {
  const reasons = [
    {
      title: "YouTube Content ID, Rights Management & MCN Services",
      description: "Claim user-generated content, resolve asset conflicts, manage channel monetization, and maximize video revenue with advanced YouTube CMS & multi-channel network solutions.",
      image: "/youtube_cms.png"
    },
    {
      title: "100% Ownership & Zero Costs",
      description: "Release unlimited singles, albums, and videos to the world for $0 upfront. Retain complete ownership of your master recordings.",
      image: "/ownership.png"
    },
    {
      title: "Advanced Real-Time Dashboard",
      description: "Track live streaming data, playlist highlights, audience demographics, and split accounts on a high-fidelity visual web panel.",
      image: "/analytics.png"
    },
    {
      title: "24/7 Dedicated Label Support",
      description: "Work with real industry professionals who assist with metadata validation, catalog ingestion, and priority publishing assistance.",
      image: "/support.png"
    }
  ];

  return (
    <section className="relative w-full py-16 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center gap-2.5 mb-14 sm:mb-16">
          {/* Section Heading - Clean & Minimalist */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white max-w-2xl leading-[1.15]">
            Why Choose <span className="gradient-text font-semibold">Distrozi</span> for Your Distribution?
          </h2>
        </div>

        {/* Grid of Reasons - Opaque Compact Snug Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 w-full">
          {reasons.map((reason, index) => (
            <BorderGlow
              key={index}
              backgroundColor="#0b0b0b"
              borderRadius={16}
              enableViewportActive={false}
              className="w-full h-full flex"
            >
              <div className="p-3 flex flex-col gap-2.5 w-full h-full">
                {/* Premium Static Illustration (Sleek, Small Padding Frame) */}
                <div className="w-full h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden bg-black border border-white/5 relative">
                  <img
                    src={reason.image}
                    alt={reason.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>

                {/* Text Info Area (Snug directly below image) */}
                <div className="px-1 pb-0.5 flex flex-col gap-1">
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
                    {reason.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
