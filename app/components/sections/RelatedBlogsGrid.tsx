"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BlogCardData {
  slug: string;
  title: string;
  publishDate: string;
  image: string;
  readTime: string;
  category: string;
}

interface RelatedBlogsGridProps {
  heading: string;
  highlightedHeading: string;
  relatedSlugs: string[];
  contained?: boolean;
}

const CARDS_PER_BATCH = 6;
const easeOutQuart = [0.22, 1, 0.36, 1] as const;

const cardReveal = (index: number) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration: 0.28,
    ease: easeOutQuart,
    delay: Math.min(index % CARDS_PER_BATCH, 2) * 0.025,
  },
});

const filterRelatedBlogs = (blogs: BlogCardData[], relatedSlugs: string[]) => {
  return relatedSlugs
    .map((slug) => blogs.find((blog) => blog.slug === slug))
    .filter((blog): blog is BlogCardData => Boolean(blog));
};

export default function RelatedBlogsGrid({
  heading,
  highlightedHeading,
  relatedSlugs,
  contained = false,
}: RelatedBlogsGridProps) {
  const [blogs, setBlogs] = useState<BlogCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_BATCH);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        if (response.ok) {
          setBlogs(await response.json());
        }
      } catch (error) {
        console.error("Error fetching related blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const relatedBlogs = useMemo(
    () => filterRelatedBlogs(blogs, relatedSlugs),
    [blogs, relatedSlugs]
  );

  const visibleBlogs = relatedBlogs.slice(0, visibleCount);
  const hasMoreBlogs = visibleCount < relatedBlogs.length;

  if (!loading && relatedBlogs.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-16 sm:py-24 bg-transparent">
      <div className={`${contained ? "w-full" : "max-w-6xl mx-auto px-6 lg:px-8"} flex flex-col gap-10`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-2.5 text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15]">
              {heading} <span className="gradient-text font-semibold">{highlightedHeading}</span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#f3c343] hover:text-black hover:border-[#f3c343] transition-all duration-300 shrink-0 text-center select-none"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {loading
            ? Array.from({ length: CARDS_PER_BATCH }).map((_, index) => (
                <div
                  key={`related-skeleton-${index}`}
                  className="flex flex-col gap-4 animate-pulse"
                >
                  <div className="aspect-video w-full rounded-2xl bg-white/5 border border-white/5" />
                  <div className="h-6 w-3/4 rounded bg-white/5" />
                  <div className="h-4 w-1/4 rounded bg-white/5" />
                </div>
              ))
            : visibleBlogs.map((blog, index) => (
                <motion.div
                  key={blog.slug}
                  {...cardReveal(index)}
                  className="flex flex-col h-full"
                >
                  <Link
                    href={`/${blog.category === "guide" ? "guides" : blog.category || "blog"}/${blog.slug}`}
                    className="group flex flex-col gap-4 text-left h-full"
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-white/5 border border-white/5">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex flex-col gap-1 text-left mt-1">
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#f3c343] transition-colors duration-200 line-clamp-2 min-h-[50px]">
                        {blog.title}
                      </h3>
                      <span className="text-xs sm:text-sm text-white/40 font-medium block mt-1">
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

        {hasMoreBlogs && (
          <div className="flex justify-center">
            <motion.button
              {...cardReveal(0)}
              type="button"
              onClick={() => setVisibleCount((count) => count + CARDS_PER_BATCH)}
              className="rounded-full border border-[#f3c343]/60 bg-[#f3c343] px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-[#f3c343]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffd866] hover:shadow-[#f3c343]/30 focus:outline-none focus:ring-2 focus:ring-[#f3c343] focus:ring-offset-2 focus:ring-offset-black"
            >
              Read More
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
