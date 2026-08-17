import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-teal-deep text-paper-2">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl">{site.name}</p>
          <p className="mt-2 text-sm text-paper-2/80">{site.nameZh}</p>
          <p className="mt-3 text-sm leading-relaxed text-paper-2/70">{site.tagline}</p>
        </div>
        <div className="text-sm leading-relaxed text-paper-2/80">
          <p className="mb-2 font-medium">Audience</p>
          <p>精神科醫師、臨床心理師及精神醫療從業人員。Terminology 保留英文，主要內容為繁體中文。</p>
          <p className="mt-3">
            <Link href="/about" className="underline underline-offset-4">
              關於本站
            </Link>
          </p>
        </div>
        <div className="text-sm leading-relaxed text-paper-2/75">
          <p className="mb-2 font-medium">Disclaimer</p>
          <p>
            教育用途，不能取代個別臨床判斷或官方 DSM-5 / DSM-5-TR 文本。不重製受著作權保護的診斷準則原文。
          </p>
          <p className="mt-6 text-[10px] tracking-[0.35em] text-paper-2/30">
            <Link href="/lab" className="hover:text-paper-2/60">
              LAB
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
