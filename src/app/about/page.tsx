import Link from "next/link";

export const metadata = {
  title: "關於本站",
  description: "NeuroWeb 的定位、內容架構與技術平台選擇。",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-4xl">關於 NeuroWeb</h1>
      <p className="mt-4 leading-relaxed text-ink-soft">
        NeuroWeb 是為心理健康專業人士設計的知識整合網站，系統整理心理學與認知模型、精神醫學與神經藥理學，以及心理治療與神經科學介入，並以文獻回顧、個案研討與中英詞彙表支援臨床推理。
      </p>

      <h2 className="mt-10 font-serif text-2xl">為什麼不是 WordPress 或 Webflow？</h2>
      <p className="mt-3 leading-relaxed">
        兩者都適合行銷型內容網站，但本計畫需要：學術條目的版本歷史、標籤分類可程式化、審查狀態可被檢查，以及未來能把「投稿」做成真正的同儕審查工作流。Next.js 把內容放在儲存庫中，專業社群可以用 pull request 進行修訂；若日後需要視覺化後台，可以再接頭less CMS，而不必從零搬遷資訊架構。
      </p>

      <h2 className="mt-10 font-serif text-2xl">內容原則</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
        <li>不重製 DSM-5-TR 或 ICD-11 的受著作權保護準則條文。</li>
        <li>藥理與刺激協定以教育為目的，不提供可直接套用的處方公式。</li>
        <li>個案研討僅使用合成匿名材料。</li>
        <li>每篇標示證據等級與審查狀態，避免把假說寫成定論。</li>
      </ul>

      <p className="mt-8 text-sm">
        延伸：
        <Link href="/editorial" className="mx-1 underline">
          編審機制
        </Link>
        ·
        <Link href="/therapy/cbt" className="mx-1 underline">
          CBT 深度專題
        </Link>
      </p>
    </div>
  );
}
