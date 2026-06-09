"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface BlogCardData {
  slug: string;
  title: string;
  publishDate: string;
  image: string;
  readTime: string;
  category: string;
}

export default function BlogsSlider() {
  const [blogs, setBlogs] = useState<BlogCardData[]>([]);
  const [loading, setLoading] = useState(true);

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true, // Smooth drag with inertia
    align: "start",
    containScroll: "trimSnaps",
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (err) {
        console.error("Error fetching blogs for slider:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!loading && blogs.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-16 sm:py-10 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col gap-10">
        
        {/* Header Group */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-2.5 text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15]">
              Latest <span className="gradient-text font-semibold">Blogs & Insights</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            {/* Navigation buttons */}
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
                className="w-10 h-10 rounded-full border border-white/10 bg-[#070707]/60 backdrop-blur-md text-white/70 hover:bg-[#f3c343] hover:text-black hover:border-[#f3c343] disabled:opacity-30 disabled:hover:bg-[#070707]/60 disabled:hover:text-white/70 disabled:hover:border-white/10 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg select-none"
                aria-label="Slide Left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
                className="w-10 h-10 rounded-full border border-white/10 bg-[#070707]/60 backdrop-blur-md text-white/70 hover:bg-[#f3c343] hover:text-black hover:border-[#f3c343] disabled:opacity-30 disabled:hover:bg-[#070707]/60 disabled:hover:text-white/70 disabled:hover:border-white/10 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg select-none"
                aria-label="Slide Right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <Link
              href="/blog"
              className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#f3c343] hover:text-black hover:border-[#f3c343] transition-all duration-300 shrink-0 text-center select-none"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Carousel Slider */}
        <div className="relative w-full overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 select-none cursor-grab active:cursor-grabbing pb-4">
            {loading
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={`skeleton-${idx}`}
                    className="w-[280px] sm:w-[320px] shrink-0 flex flex-col gap-4 animate-pulse"
                  >
                    <div className="aspect-video w-full rounded-2xl bg-white/5 border border-white/5" />
                    <div className="h-6 w-3/4 rounded bg-white/5" />
                    <div className="h-4 w-1/4 rounded bg-white/5" />
                  </div>
                ))
              : blogs.map((blog, idx) => (
                  <motion.div
                    key={blog.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="w-[280px] sm:w-[320px] shrink-0 flex flex-col"
                  >
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="group flex flex-col gap-4 text-left h-full"
                    >
                      {/* Image Frame */}
                      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-white/5 border border-white/5 pointer-events-none select-none">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.02] pointer-events-none select-none"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Content block */}
                      <div className="flex flex-col gap-1 text-left select-none">
                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#f3c343] transition-colors duration-200 line-clamp-2 min-h-[50px] select-none">
                          {blog.title}
                        </h3>
                        
                        <span className="text-xs sm:text-sm text-white/40 font-medium block mt-1 select-none">
                          {new Date(blog.publishDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
          </div>
        </div>

      </div>
    </section>
  );
}
