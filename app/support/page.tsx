import { Metadata } from "next";
import SupportClient from "./SupportClient";

export const metadata: Metadata = {
  title: "Distrozi - Creator Support Portal",
  description: "Submit Whitelist requests, OAC requests, copyright release forms, or request manual claims with Distrozi.",
};

export default function SupportPage() {
  return <SupportClient />;
}
