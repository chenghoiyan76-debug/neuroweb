import Link from "next/link";
import { bilingualTitle, ui } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { pageTitle } from "@/lib/meta";
import { axes } from "@/lib/site";

export async function generateMetadata() {
  return pageTitle("關於本站", "About");
}

export default async function Page() {
  const locale = await getLocale();
  const t = ui[locale];
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-4xl">{t.aboutTitle}</h1>
      <p className="mt-4 leading-relaxed text-ink-soft">{t.aboutBody}</p>
      <ul className="mt-6 list-disc space-y-2 pl-5 leading-relaxed">
        {axes.map((axis) => (
          <li key={axis.slug}>
            <Link href={axis.href} className="text-teal hover:underline">
              {bilingualTitle(axis.zh, axis.en, locale)}
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="mt-10 font-serif text-2xl">{t.aboutTech}</h2>
      <p className="mt-3 leading-relaxed">{t.aboutTechBody}</p>
      <h2 className="mt-10 font-serif text-2xl">{t.aboutPrinciples}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
        <li>{t.principle1}</li>
        <li>{t.principle2}</li>
        <li>{t.principle3}</li>
      </ul>
    </div>
  );
}
