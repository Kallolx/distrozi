"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import BorderGlow from "@/components/BorderGlow";
import Button from "../ui/Button";
import { BlogData } from "@/lib/blogs";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Plus, 
  Minus,
  Share2
} from "lucide-react";
import {
  RiFacebookCircleFill,
  RiLinkedinBoxFill,
  RiWhatsappFill,
  RiTwitterXFill,
} from "react-icons/ri";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any, delay },
});

const PlatformLogo = ({ name, logoDomain }: { name: string; logoDomain: string }) => {
  const [error, setError] = useState(false);
  const logoUrl = `https://logo.clearbit.com/${logoDomain.toLowerCase().trim()}`;

  return (
    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-lg relative transition-colors duration-300">
      {!error ? (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="w-10 h-10 object-contain p-1 filter brightness-100 transition-transform duration-300"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f3c343]/20 to-amber-600/10 text-[#f3c343] text-xl font-bold uppercase tracking-wider">
          {name ? name.charAt(0) : "M"}
        </div>
      )}
    </div>
  );
};

interface BlogDetailPageProps {
  blog: BlogData;
  relatedBlogs: BlogData[];
}

export default function BlogDetailPage({
  blog,
  relatedBlogs,
}: BlogDetailPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + " - " + shareUrl)}`,
  };

  return (
    <main className="relative min-h-screen bg-black text-[#f5f5f5] overflow-x-hidden font-sans">
      {/* Dynamic SEO Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.title,
            "image": [
              blog.image.startsWith("http") ? blog.image : `https://distrozi.com${blog.image}`
            ],
            "datePublished": blog.publishDate,
            "dateModified": blog.publishDate,
            "author": [{
              "@type": "Organization",
              "name": blog.author,
              "url": "https://distrozi.com"
            }],
            "publisher": {
              "@type": "Organization",
              "name": "Distrozi",
              "logo": {
                "@type": "ImageObject",
                "url": "https://distrozi.com/logo.png"
              }
            },
            "description": blog.metaDescription
          })
        }}
      />

      {blog.faq && blog.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": blog.faq.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            })
          }}
        />
      )}

      <Navbar />

      <div className="relative z-10 w-full pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-8">
          
          {/* Header & Navigation Group (Reduced vertical gap under Back button) */}
          <div className="flex flex-col gap-4 text-left">
            {/* Back Navigation */}
            <motion.div {...fadeUp(0)}>
              <Link
                href={`/${blog.category === "guide" ? "guides" : blog.category}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest"
              >
                <ArrowLeft size={16} />
                <span>Back to {blog.category === "guide" ? "guides" : blog.category}</span>
              </Link>
            </motion.div>

            {/* Article Header (Plain white title, no aurora text effect) */}
            <header className="flex flex-col gap-4">
              <motion.h1
                {...fadeUp(0.05)}
                className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight"
              >
                {blog.title}
              </motion.h1>

              {/* Author / Date Metadata */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-white/50 border-y border-white/5 py-4">
                <span>By <strong className="text-white/80 font-medium">{blog.author}</strong></span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {new Date(blog.publishDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {blog.readTime}
                </span>
              </div>
            </header>
          </div>

          {/* Featured Image */}
          <motion.div
            {...fadeUp(0.1)}
            className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 relative"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Article Content & Share sidebar layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Share Buttons - Desktop sticky sidebar */}
            <aside className="lg:col-span-1 lg:sticky lg:top-36 hidden lg:flex flex-col items-center gap-4 text-white/40">
              <span className="text-[10px] uppercase tracking-widest font-bold rotate-90 my-6">Share</span>
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all"
                aria-label="Share on Facebook"
              >
                <RiFacebookCircleFill size={20} />
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white hover:text-black flex items-center justify-center transition-all"
                aria-label="Share on X"
              >
                <RiTwitterXFill size={18} />
              </a>
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-all"
                aria-label="Share on LinkedIn"
              >
                <RiLinkedinBoxFill size={20} />
              </a>
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all"
                aria-label="Share on WhatsApp"
              >
                <RiWhatsappFill size={20} />
              </a>
            </aside>

            {/* Main Article Body */}
            <article className="lg:col-span-11 flex flex-col gap-6 text-left text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed">
              {blog.content.map((block, i) => {
                if (block.type === "heading") {
                  return (
                    <h2 key={i} className="text-xl sm:text-2xl font-bold text-white mt-4">
                      {block.text}
                    </h2>
                  );
                } else if (block.type === "image" && block.url) {
                  return (
                    <div key={i} className="my-6 flex flex-col gap-2">
                      <img
                        src={block.url}
                        alt={block.caption || "Blog image"}
                        className="w-full rounded-2xl object-cover max-h-[480px]"
                      />
                      {block.caption && (
                        <span className="text-xs text-white/40 text-center block italic">
                          {block.caption}
                        </span>
                      )}
                    </div>
                  );
                } else if (block.type === "platforms" && block.platformItems) {
                  return (
                    <div key={i} className="my-8 flex flex-col gap-6">
                      {block.platformItems.map((plat, idx) => (
                        <div
                          key={idx}
                          className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-[#f3c343]/30 hover:from-white/[0.05] hover:to-white/[0.01] transition-all duration-300 shadow-xl"
                        >
                          {/* Rank Badge */}
                          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-xs font-bold text-white/60 group-hover:text-[#f3c343] group-hover:border-[#f3c343]/30 transition-colors duration-300 shadow-lg">
                            {String(idx + 1).padStart(2, "0")}
                          </div>

                          <div className="flex flex-col sm:flex-row items-start gap-4 text-left w-full md:w-3/4">
                            <PlatformLogo name={plat.name} logoDomain={plat.logoDomain} />
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <h4 className="text-lg font-bold text-white tracking-tight">
                                  {plat.name}
                                </h4>
                                {plat.bestFor && (
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#f3c343]/10 text-[#f3c343] border border-[#f3c343]/20 uppercase tracking-wider">
                                    {plat.bestFor}
                                  </span>
                                )}
                                {plat.rating && (
                                  <span className="text-xs text-white/50 flex items-center gap-1 font-medium bg-white/5 border border-white/5 px-2 py-0.5 rounded-md">
                                    ⭐ {plat.rating}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-white/60 leading-relaxed">
                                {plat.description}
                              </p>
                              {plat.pricing && (
                                <div className="text-xs text-white/40 font-medium">
                                  Pricing: <span className="text-white/80">{plat.pricing}</span>
                                </div>
                              )}
                              {plat.pros && plat.pros.length > 0 && (
                                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-1">
                                  {plat.pros.map((pro, pIdx) => (
                                    <span key={pIdx} className="text-xs text-white/50 flex items-center gap-1">
                                      <span className="text-green-500 font-bold text-xs">✓</span> {pro}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-auto">
                            <a
                              href={plat.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-[#f3c343] hover:text-black hover:border-[#f3c343] hover:shadow-lg hover:shadow-[#f3c343]/20 transition-all duration-300 text-center w-full md:w-auto cursor-pointer"
                            >
                              Visit Website
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                } else if (block.type === "list" && block.items) {
                  return (
                    <ul key={i} className="list-disc pl-6 flex flex-col gap-2 text-white/70">
                      {block.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  );
                } else {
                  return (
                    <p key={i} className="text-white/70">
                      {block.text}
                    </p>
                  );
                }
              })}

              {/* Comparison Table */}
              {blog.comparisonTable && (
                <div className="my-8 flex flex-col gap-3">
                  {blog.comparisonTable.title && (
                    <h3 className="text-lg font-bold text-white">
                      {blog.comparisonTable.title}
                    </h3>
                  )}
                  <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-[#070707]/80 backdrop-blur-md">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          {blog.comparisonTable.headers.map((header, idx) => (
                            <th key={idx} className="p-4 font-bold text-white whitespace-nowrap">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {blog.comparisonTable.rows.map((row, rowIdx) => (
                          <tr key={rowIdx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className="p-4 text-white/60">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Mobile Share Buttons (Visible only on mobile/tablet) */}
              <div className="lg:hidden flex flex-col gap-3 border-t border-white/5 pt-6 mt-4">
                <span className="text-xs uppercase tracking-widest font-bold text-white/40 flex items-center gap-1.5">
                  <Share2 size={14} /> Share this article
                </span>
                <div className="flex gap-3">
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all"
                    aria-label="Share on Facebook"
                  >
                    <RiFacebookCircleFill size={18} />
                  </a>
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white hover:text-black flex items-center justify-center transition-all"
                    aria-label="Share on X"
                  >
                    <RiTwitterXFill size={16} />
                  </a>
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-all"
                    aria-label="Share on LinkedIn"
                  >
                    <RiLinkedinBoxFill size={18} />
                  </a>
                  <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all"
                    aria-label="Share on WhatsApp"
                  >
                    <RiWhatsappFill size={18} />
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* FAQ Accordion Section */}
          {blog.faq && blog.faq.length > 0 && (
            <section className="flex flex-col gap-6 border-t border-white/5 pt-10 text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              <div className="flex flex-col gap-3">
                {blog.faq.map((item, index) => (
                  <BorderGlow
                    key={index}
                    backgroundColor="#0b0b0b"
                    borderRadius={16}
                    enableViewportActive={false}
                    className="w-full"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <h3 className="text-sm sm:text-base font-semibold text-white/90">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0 text-white/60">
                        {openFaqIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {openFaqIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-xs sm:text-sm text-white/50 leading-relaxed border-t border-white/5">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </BorderGlow>
                ))}
              </div>
            </section>
          )}

          {/* Related Articles Section - Re-styled as minimalist cards */}
          {relatedBlogs && relatedBlogs.length > 0 && (
            <section className="flex flex-col gap-6 border-t border-white/5 pt-10 text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                {relatedBlogs.map((relBlog) => (
                  <Link
                    key={relBlog.slug}
                    href={`/${relBlog.category === "guide" ? "guides" : relBlog.category}/${relBlog.slug}`}
                    className="group flex flex-col gap-4 text-left h-full"
                  >
                    {/* Thumbnail image with rounded corners */}
                    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-white/5">
                      <img
                        src={relBlog.image}
                        alt={relBlog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#f3c343] transition-colors duration-200">
                        {relBlog.title}
                      </h3>
                      {/* Date as clean gray text */}
                      <span className="text-xs sm:text-sm text-white/40 font-medium block mt-1">
                        {new Date(relBlog.publishDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA Banner (Reusable premium component) */}
          <section className="relative z-10 w-full pt-6">
            <motion.div
              {...fadeUp(0)}
              className="relative rounded-3xl overflow-hidden px-8 sm:px-14 py-12 text-center"
              style={{ background: "var(--gradient-accent)" }}
            >
              <div className="pointer-events-none absolute inset-0 bg-black/10 mix-blend-multiply" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <h2 className="text-2xl sm:text-4xl font-medium text-white title-text max-w-2xl drop-shadow-md">
                  Take Your Music Distribution Global
                </h2>
                <p className="text-white/95 text-sm sm:text-base max-w-lg drop-shadow-sm">
                  Distribute your tracks to 150+ stores, keep 100% rights, and access YouTube CMS tools with Distrozi.
                </p>
                <Button
                  as="a"
                  href="/apply"
                  variant="primary"
                  size="md"
                  className="mt-2 bg-white text-black hover:bg-gray-100 border-none px-8 font-semibold"
                >
                  Get Started Free
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
