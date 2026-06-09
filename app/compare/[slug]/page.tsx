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
  
  if (!blog || blog.category !== "compare") {
    return {
      title: "Comparison Not Found | Distrozi",
    };
  }

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    alternates: {
      canonical: `https://distrozi.com/compare/${blog.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const blogs = getBlogsByCategory("compare");
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function ComparePostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog || blog.category !== "compare") {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(blog);

  return <BlogDetailPage blog={blog} relatedBlogs={relatedBlogs} />;
}
