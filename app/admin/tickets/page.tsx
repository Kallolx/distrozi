import { Metadata } from "next";
import AdminTicketsClient from "./AdminTicketsClient";

export const metadata: Metadata = {
  title: "Distrozi - Admin Support Desk",
  description: "Review, search, and manage submitted creator support tickets and release requests.",
};

export default function AdminTicketsPage() {
  return <AdminTicketsClient />;
}
