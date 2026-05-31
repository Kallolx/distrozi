import { Metadata } from "next";
import ServiceLayout from "../components/layout/ServiceLayout";
import FAQ from "../components/sections/FAQ";

export const metadata: Metadata = {
  title: "Distrozi - Frequently Asked Questions",
  description:
    "Everything you need to know about Distrozi Distribution, royalties, ownership, dashboard, and payouts.",
};

export default function FAQPage() {
  return (
    <ServiceLayout>
      <div className="pt-24 pb-12 min-h-screen flex flex-col justify-center">
        <FAQ />
      </div>
    </ServiceLayout>
  );
}
