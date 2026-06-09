import { getBlogsByCategory } from "@/lib/blogs";
import BlogCategoryPage from "@/app/components/sections/BlogCategoryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distrozi - Distribution Guides",
  description: "Comprehensive step-by-step guides on preparing metadata, claiming artist profiles, pitching to playlists, and global royalty collection.",
};

export default function GuideIndexPage() {
  const blogs = getBlogsByCategory("guide");
  return (
    <BlogCategoryPage
      category="guide"
      title="Step-by-Step Guides"
      description="Easy-to-follow, comprehensive walkthroughs detailing the entire music lifecycle, from studio to global stores."
      blogs={blogs}
    />
  );
}
