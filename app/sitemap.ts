import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://distrozi.com";
  const lastModified = new Date();

  const routes = [
    "",
    "/start",
    "/features/catalog",
    "/features/distribution",
    "/features/analytics",
    "/features/rights",
    "/features/royalty",
    "/services/artist",
    "/services/label",
    "/services/youtube",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}