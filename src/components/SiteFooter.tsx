import Link from "next/link";
import { site } from "@/lib/taxonomy";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-teal-deep text-paper-2">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl">{site.name}</p>
          <p className="mt-2 text-sm text-paper-2/80">{site.nameZh}</p>
          <p className="mt-3 text-sm leading-relaxed text-paper-2/70">{site.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-medium">專業導覽</p>
          <div className="grid gap-1 text-paper-2/80">
            <Link href="/models">心理學與認知模型</Link>
            <Link href="/psychiatry">精神醫學與神經藥理學</Link>
            <Link href="/therapy">治療取向</Link>
            <Link href="/glossary">中英術語詞彙表</Link>
          </div>
        </div>
        <div className="text-sm leading-relaxed text-paper-2/75">
          <p className="mb-2 font-medium">使用聲明</p>
          <p>
            內容供心理健康專業人員教育與討論，不能取代個別臨床判斷、完整評估或所屬機構指引。診斷分類請以
            DSM-5-TR、ICD-11 官方文本為準。
          </p>
          <p className="mt-3">
            <Link href="/about" className="underline underline-offset-4">
              關於本站與平台選擇
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
