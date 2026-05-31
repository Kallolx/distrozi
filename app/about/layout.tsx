import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distrozi - About",
  description: "Learn more about Distrozi, the ultimate global ecosystem for independent labels & artists.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
