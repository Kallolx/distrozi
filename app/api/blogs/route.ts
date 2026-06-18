import { NextResponse } from "next/server";
import { getAllBlogs } from "@/lib/blogs";

export async function GET() {
  try {
    const blogs = getAllBlogs();
    // Only return basic metadata for listing cards to reduce payload size
    const cardData = blogs.map((b) => ({
      slug: b.slug,
      title: b.title,
      publishDate: b.publishDate,
      image: b.image,
      readTime: b.readTime,
      category: b.category,
    }));
    return NextResponse.json(cardData);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

