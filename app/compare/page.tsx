import { getBlogsByCategory } from "@/lib/blogs";
import BlogCategoryPage from "@/app/components/sections/BlogCategoryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distrozi - Platform Comparisons",
  description: "Unbiased comparisons of top music streaming services, royalty rates, and tools to help you decide how to distribute your music.",
};

export default function CompareIndexPage() {
  const blogs = getBlogsByCategory("compare");
  return (
    <BlogCategoryPage
      category="compare"
      title="Platform Comparisons"
      description="Deep dive comparisons between music streaming platforms and distribution networks to help you choose the best routes."
      blogs={blogs}
    />
  );
}
