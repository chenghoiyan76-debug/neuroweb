import { senResources } from "@/data/sen";
import { PrintView } from "./view";

export function generateStaticParams() {
  return senResources.map((item) => ({ slug: item.slug }));
}

export default async function PrintPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PrintView slug={slug} />;
}
