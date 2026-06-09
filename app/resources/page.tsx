import { getBlogsByCategory } from "@/lib/blogs";
import BlogCategoryPage from "@/app/components/sections/BlogCategoryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distrozi - Industry Resources & Tools",
  description: "Find helpful templates, release sheets, guides, and tools to organize your record label or release your independent music.",
};

export default function ResourcesIndexPage() {
  const blogs = getBlogsByCategory("resources");
  return (
    <BlogCategoryPage
      category="resources"
      title="Industry Resources"
      description="Downloadable templates, royalty split sheets, and visual assets to organize your releases."
      blogs={blogs}
    />
  );
}
