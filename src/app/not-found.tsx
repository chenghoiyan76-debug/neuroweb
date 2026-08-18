import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-serif text-3xl">找不到這個路徑</h1>
      <p className="mt-3 text-ink-soft">可能尚未建立，或 slug 不匹配。可從 Lab 後門補上。</p>
      <Link href="/" className="mt-4 inline-block text-teal">
        回到金字塔
      </Link>
    </div>
  );
}
