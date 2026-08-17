import { LabConsole } from "@/components/LabConsole";

export const metadata = { title: "Lab" };
export const robots = { index: false, follow: false };

export default function Page() {
  return <LabConsole />;
}
