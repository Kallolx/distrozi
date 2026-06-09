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
  
  if (!blog || blog.category !== "resources") {
    return {
      title: "Resource Not Found | Distrozi",
    };
  }

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    alternates: {
      canonical: `https://distrozi.com/resources/${blog.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const blogs = getBlogsByCategory("resources");
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function ResourcesPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog || blog.category !== "resources") {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(blog);

  return <BlogDetailPage blog={blog} relatedBlogs={relatedBlogs} />;
}
