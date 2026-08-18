import type { Metadata } from "next";
import type { ReactNode } from "react";
import { reflection } from "@/lib/site";

export const metadata: Metadata = {
  title: reflection.en,
  description: `${reflection.description.zh} / ${reflection.description.en}`,
};

export default function ReflectionLayout({ children }: { children: ReactNode }) {
  return children;
}
