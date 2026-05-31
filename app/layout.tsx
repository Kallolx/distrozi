import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://distrozi.com"),
  title: "Distrozi - Global Music Distribution & Rights Management",
  description:
    "Powering artists and labels with global music distribution, YouTube CMS/MCN services, and advanced royalty management across 150+ platforms.",
  keywords: [
    "music distribution",
    "YouTube CMS",
    "music rights management",
    "record label software",
    "artist services",
    "royalties",
    "indie label",
  ],
  authors: [{ name: "Distrozi" }],
  creator: "Distrozi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://distrozi.com",
    siteName: "Distrozi",
    title: "Distrozi - Global Music Distribution & Rights Management",
    description:
      "Powering artists and labels with global music distribution, YouTube CMS/MCN services, and advanced royalty management across 150+ platforms.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Distrozi Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Distrozi - Global Music Distribution & Rights Management",
    description:
      "Powering artists and labels with global music distribution, YouTube CMS/MCN services, and advanced royalty management across 150+ platforms.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", outfit.variable)}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
