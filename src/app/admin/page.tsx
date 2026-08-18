import type { Metadata } from "next";
import { AdminPortal } from "@/components/LabConsole";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminPortal />;
}
