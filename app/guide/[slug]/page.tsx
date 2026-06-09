import { getBlogBySlug, getRelatedBlogs, getBlogsByCategory } from "@/lib/blogs";
import BlogDetailPage from "@/app/components/sections/BlogDetailPage";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  
  if (!blog || blog.category !== "guide") {
    return {
      title: "Guide Not Found | Distrozi",
    };
  }

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    alternates: {
      canonical: `https://distrozi.com/guide/${blog.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const blogs = getBlogsByCategory("guide");
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function GuidePostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog || blog.category !== "guide") {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(blog);

  return <BlogDetailPage blog={blog} relatedBlogs={relatedBlogs} />;
}
