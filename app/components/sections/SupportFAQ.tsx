"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is Distrozi Distribution?",
    answer: "Distrozi Distribution is a premium global ecosystem that empowers independent labels and artists to seamlessly distribute, manage, and monetize their music catalogs worldwide."
  },
  {
    question: "Which platforms does Distrozi distribute to?",
    answer: "We distribute to over 150+ major global platforms, including Spotify, Apple Music, YouTube Music, TikTok, Amazon Music, Deezer, and many regional services across the world."
  },
  {
    question: "Do artists keep 100% ownership of their music?",
    answer: "Yes. You always maintain 100% ownership of your masters and intellectual property."
  },
  {
    question: "How much revenue do artists earn?",
    answer: "Our artists keep up to 100% of their generated royalties depending on their specific subscription or split-rate deal. Distrozi believes in transparent, artist-first revenue sharing."
  },
  {
    question: "How long does it take for a release to go live?",
    answer: "Our automated pipeline typically delivers your music to major DSPs within 24-48 hours. However, we recommend scheduling releases at least two weeks in advance to allow for editorial playlist pitching."
  },
  {
    question: "Does Distrozi provide royalty reports and analytics?",
    answer: "Yes, we offer an advanced real-time dashboard where you can track live streaming data, audience demographics, and download detailed monthly royalty accounting reports."
  },
  {
    question: "Can I upload singles, EPs, and albums?",
    answer: "Definitely. You can upload an unlimited number of singles, EPs, and full-length albums to our platform."
  },
  {
    question: "How do payouts work?",
    answer: "Payouts are processed monthly once the minimum payout threshold is reached. Artists can withdraw earnings using supported payment methods directly from their dashboard."
  }
];

export default function SupportFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-10 bg-transparent overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Heading - Clean & Minimalist */}
        <div className="flex flex-col items-center text-center gap-2.5 mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white max-w-2xl leading-[1.15]">
            Frequently Asked <span className="gradient-text font-semibold">Questions</span>
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="w-full rounded-2xl bg-[#121212] border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => toggleOpen(index)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white/90">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 text-white/60">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-white/50 leading-relaxed border-t border-white/5">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
