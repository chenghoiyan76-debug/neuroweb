import { PillarIndex } from "@/components/PillarIndex";
import { getArticlesByPillar } from "@/lib/content";
import { pillars } from "@/lib/taxonomy";

const meta = pillars.find((item) => item.slug === "therapy")!;

export const metadata = {
  title: meta.zh,
  description: meta.description,
};

export default function Page() {
  return (
    <PillarIndex
      meta={meta}
      articles={getArticlesByPillar("therapy")}
      extra={
        <p className="mt-6 max-w-3xl rounded-xl border border-copper/30 bg-[#f4ece2] px-4 py-3 text-sm">
          深度內容測試以「認知行為治療」為完整示範，涵蓋概念化、技術、證據、華語適應與跨專業接口。
        </p>
      }
    />
  );
}
