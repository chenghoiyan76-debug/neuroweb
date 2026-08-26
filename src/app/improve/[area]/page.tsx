import { abilityAreas } from "@/lib/sen-taxonomy";
import { ImproveAreaView } from "./view";

export function generateStaticParams() {
  return abilityAreas.map((area) => ({ area: area.slug }));
}

export default async function ImproveAreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  return <ImproveAreaView area={area} />;
}
