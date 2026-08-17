import Link from "next/link";
import { axes } from "@/lib/site";

export const metadata = { title: "關於本站" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-4xl">關於 NeuroPsych Integrator</h1>
      <p className="mt-4 leading-relaxed text-ink-soft">
        本站是為精神科醫師、臨床心理師及精神醫療從業人員設計的知識整合介面。五大主軸互相連結：從 DSM-5 大類進入 Illness Studies，或從症狀反推機制與解方。
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 leading-relaxed">
        {axes.map((axis) => (
          <li key={axis.slug}>
            <Link href={axis.href} className="text-teal hover:underline">
              {axis.zh}（{axis.en}）
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="mt-10 font-serif text-2xl">技術</h2>
      <p className="mt-3 leading-relaxed">
        以 Next.js / React 建立，導覽為客戶端轉址，內容以 JSON 資料層保存，便於 Git 版本控管。內容更新走隱藏的 Lab 後台（頁尾 LAB），寫入 <code>data/site-content.json</code>。
      </p>
      <h2 className="mt-10 font-serif text-2xl">原則</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
        <li>Terminology 保留英文，敘事用繁體中文。</li>
        <li>不重製 DSM-5 受著作權保護的準則條文。</li>
        <li>藥理與刺激協定為專業教育，不是處方工具。</li>
      </ul>
    </div>
  );
}
