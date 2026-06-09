import { getBlogsByCategory } from "@/lib/blogs";
import BlogCategoryPage from "@/app/components/sections/BlogCategoryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distrozi - Blogs & Insights",
  description: "Explore the latest insights, tutorials, and articles from the Distrozi editorial team on global music distribution, licensing, and streaming tips.",
};

export default function BlogIndexPage() {
  const blogs = getBlogsByCategory("blog");
  return (
    <BlogCategoryPage
      category="blog"
      title="Latest Blogs & Insights"
      description="Stay ahead of the curve with articles, news, and tips from the music industry experts."
      blogs={blogs}
    />
  );
}
