import { articleMetadata, ArticlePage } from "@/components/ArticlePage";
import { getArticlesByPillar } from "@/lib/content";

export function generateStaticParams() {
  return getArticlesByPillar("therapy").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return articleMetadata("therapy", slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticlePage pillar="therapy" slug={slug} />;
}
