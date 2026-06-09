import fs from "fs";
import path from "path";

export interface BlogPlatformItem {
  name: string;
  logoDomain: string;
  description: string;
  url: string;
  bestFor?: string;
  rating?: string;
  pricing?: string;
  pros?: string[];
}

export interface BlogContentBlock {
  type: "paragraph" | "heading" | "list" | "image" | "platforms";
  text?: string;
  items?: string[];
  url?: string;
  caption?: string;
  platformItems?: BlogPlatformItem[];
}

export interface BlogComparisonTable {
  title?: string;
  headers: string[];
  rows: string[][];
}

export interface BlogFAQItem {
  question: string;
  answer: string;
}

export interface BlogData {
  slug: string;
  category: "blog" | "compare" | "resources" | "guide";
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishDate: string;
  author: string;
  image: string;
  readTime: string;
  content: BlogContentBlock[];
  faq: BlogFAQItem[];
  comparisonTable?: BlogComparisonTable;
  relatedSlugs: string[];
}

const BLOGS_DIR = path.join(process.cwd(), "data", "blogs");

export function getBlogsByCategory(category: "blog" | "compare" | "resources" | "guide"): BlogData[] {
  const categoryDir = path.join(BLOGS_DIR, category);
  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  try {
    const items = fs.readdirSync(categoryDir);
    const blogs: BlogData[] = [];

    for (const item of items) {
      const itemPath = path.join(categoryDir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        const jsonPath = path.join(itemPath, "blog.json");
        if (fs.existsSync(jsonPath)) {
          try {
            const content = fs.readFileSync(jsonPath, "utf-8");
            const blog = JSON.parse(content) as BlogData;
            blog.slug = blog.slug || item;
            blog.category = category;
            blogs.push(blog);
          } catch (error) {
            console.error(`Error parsing blog.json in ${category}/${item}:`, error);
          }
        }
      }
    }

    return blogs.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error(`Error reading blogs in category ${category}:`, error);
    return [];
  }
}

export function getBlogBySlug(slug: string): BlogData | null {
  const categories: ("blog" | "compare" | "resources" | "guide")[] = ["blog", "compare", "resources", "guide"];
  
  for (const cat of categories) {
    const categoryDir = path.join(BLOGS_DIR, cat);
    const blogDir = path.join(categoryDir, slug);
    
    if (fs.existsSync(blogDir)) {
      const jsonPath = path.join(blogDir, "blog.json");
      if (fs.existsSync(jsonPath)) {
        try {
          const content = fs.readFileSync(jsonPath, "utf-8");
          const blog = JSON.parse(content) as BlogData;
          blog.slug = blog.slug || slug;
          blog.category = cat;
          return blog;
        } catch (error) {
          console.error(`Error parsing blog.json for slug ${slug} under ${cat}:`, error);
        }
      }
    }
  }
  
  return null;
}

export function getAllBlogs(): BlogData[] {
  const categories: ("blog" | "compare" | "resources" | "guide")[] = ["blog", "compare", "resources", "guide"];
  let all: BlogData[] = [];
  
  for (const cat of categories) {
    all = all.concat(getBlogsByCategory(cat));
  }
  
  return all.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

export function getRelatedBlogs(blog: BlogData): BlogData[] {
  const allBlogs = getAllBlogs();
  
  if (blog.relatedSlugs && blog.relatedSlugs.length > 0) {
    return allBlogs.filter((b) => blog.relatedSlugs.includes(b.slug));
  }
  
  return allBlogs
    .filter((b) => b.category === blog.category && b.slug !== blog.slug)
    .slice(0, 3);
}
