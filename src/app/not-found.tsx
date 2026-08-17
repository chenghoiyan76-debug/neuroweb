import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm text-copper">404</p>
      <h1 className="mt-2 font-serif text-4xl">找不到這個筆記</h1>
      <p className="mt-4 text-ink-soft">路徑可能尚未建立，或 DSM-5 大類 slug 不匹配。</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-teal px-5 py-2 text-sm text-paper-2">
        回到 NeuroPsych Integrator
      </Link>
    </div>
  );
}
