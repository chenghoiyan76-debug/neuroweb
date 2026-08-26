import { abilityAreas } from "@/lib/sen-taxonomy";
import { ImproveSituationView } from "./view";

export function generateStaticParams() {
  return abilityAreas.flatMap((area) =>
    area.situations.map((situation) => ({ area: area.slug, situation: situation.slug })),
  );
}

export default async function ImproveSituationPage({
  params,
}: {
  params: Promise<{ area: string; situation: string }>;
}) {
  const { area, situation } = await params;
  return <ImproveSituationView area={area} situation={situation} />;
}
