"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Button from "../ui/Button";
import { BlogData } from "@/lib/blogs";
import Link from "next/link";

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any, delay },
});

interface BlogCategoryPageProps {
  category: "blog" | "compare" | "resources" | "guide";
  title: string;
  description: string;
  blogs: BlogData[];
}

const navCategories = [
  { name: "Blog", path: "/blog" },
  { name: "Compare", path: "/compare" },
  { name: "Resources", path: "/resources" },
  { name: "Guides", path: "/guides" }
];

export default function BlogCategoryPage({
  category,
  title,
  description,
  blogs,
}: BlogCategoryPageProps) {
  // Case-insensitive exact title renderer with reinforced transparent classes to override any parent text-white styles
  const renderTitle = (text: string) => {
    const cleanText = text.trim().toLowerCase();

    if (cleanText === "platform comparisons") {
      return (
        <>
          Platform <span className="gradient-text font-semibold text-transparent bg-clip-text">Comparisons</span>
        </>
      );
    }
    if (cleanText === "latest blogs & insights") {
      return (
        <>
          Latest <span className="gradient-text font-semibold text-transparent bg-clip-text">Blogs & Insights</span>
        </>
      );
    }
    if (cleanText === "industry resources") {
      return <span className="gradient-text font-semibold text-transparent bg-clip-text">Industry Resources</span>;
    }
    if (cleanText === "step-by-step guides") {
      return <span className="gradient-text font-semibold text-transparent bg-clip-text">Step-by-Step Guides</span>;
    }
    return text;
  };

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

      <div className="relative z-10 w-full pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
          
          {/* Header Section */}
          <section className="text-center max-w-3xl mx-auto flex flex-col gap-5">
            {/* Title with Exact Aurora Text Mapping */}
            <motion.h1
              {...fadeUp(0)}
              className="text-4xl sm:text-5xl font-medium tracking-tight text-white leading-tight"
            >
              {renderTitle(title)}
            </motion.h1>

            {/* Description/Bio */}
            <motion.p
              {...fadeUp(0.1)}
              className="text-sm sm:text-base text-white/50 leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Navigation Pills (Active State Highlighted) */}
            <motion.div
              {...fadeUp(0.15)}
              className="flex flex-wrap justify-center gap-3 mt-4"
            >
              {navCategories.map((cat) => {
                const isActive = cat.path === `/${category}` || (category === "guide" && cat.path === "/guides");
                return (
                  <Link
                    key={cat.name}
                    href={cat.path}
                    className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                      isActive
                        ? "bg-[#f3c343] text-black border-[#f3c343] shadow-md shadow-[#f3c343]/20"
                        : "bg-white/5 text-white/50 border-white/10 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </motion.div>
          </section>

          {/* Blogs Grid */}
          <section className="w-full">
            {blogs.length === 0 ? (
              <motion.div
                {...fadeUp(0.25)}
                className="text-center py-20 border border-white/5 bg-[#0b0b0b]/60 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto"
              >
                <p className="text-white/40 mb-4">No posts available in this section yet.</p>
                <Button as="a" href="/" variant="ghost" size="md">
                  Back to Home
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {blogs.map((blog, index) => (
                  <motion.div
                    key={blog.slug}
                    {...fadeUp(0.08 * index + 0.2)}
                    className="flex flex-col h-full"
                  >
                    <Link
                      href={`/${category === "guide" ? "guides" : category}/${blog.slug}`}
                      className="group flex flex-col gap-4 text-left h-full"
                    >
                      {/* Blog Thumbnail - Simple Rounded Corners */}
                      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-white/5">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>

                      {/* Content below image */}
                      <div className="flex flex-col gap-1 text-left">
                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#f3c343] transition-colors duration-200">
                          {blog.title}
                        </h3>

                        {/* Date as clean gray text */}
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
            )}
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
