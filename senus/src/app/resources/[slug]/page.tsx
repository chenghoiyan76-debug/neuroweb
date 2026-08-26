import { senResources } from "@/data/sen";
import { ResourceDetailView } from "./view";

export function generateStaticParams() {
  return senResources.map((item) => ({ slug: item.slug }));
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ResourceDetailView slug={slug} />;
}
