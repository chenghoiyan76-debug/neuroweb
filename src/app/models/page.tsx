import { PillarIndex } from "@/components/PillarIndex";
import { getArticlesByPillar } from "@/lib/content";
import { pillars } from "@/lib/taxonomy";

const meta = pillars.find((item) => item.slug === "models")!;

export const metadata = {
  title: meta.zh,
  description: meta.description,
};

export default function Page() {
  return <PillarIndex meta={meta} articles={getArticlesByPillar("models")} />;
}
