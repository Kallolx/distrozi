import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distrozi - YouTube Network",
  description: "Join the Distrozi MCN/CMS network to protect your rights and monetize your music-related content globally.",
};

export default function YouTubeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
