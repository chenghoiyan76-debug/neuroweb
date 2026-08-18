import type { Metadata } from "next";
import { LabConsole } from "@/components/LabConsole";

export const metadata: Metadata = {
  title: "Lab",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return <LabConsole />;
}
