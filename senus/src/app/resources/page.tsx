"use client";

import { useLocale } from "@/components/LocaleProvider";
import { ResourceBrowser } from "@/components/sen/ResourceBrowser";
import { Breadcrumbs, PageHero } from "@/components/Ui";
import { ui } from "@/lib/i18n";
import { allSenResources } from "@/lib/sen-catalog";

export default function ResourcesPage() {
  const locale = useLocale();
  const t = ui[locale];
  const total = allSenResources().length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Breadcrumbs locale={locale} items={[{ href: "/", label: t.home }, { label: t.allMaterials }]} />
      <div className="mt-6">
        <PageHero
          kicker={t.materials}
          title={t.allMaterials}
          summary={`${total} ${t.resourceCount} · ${t.layer2Body}`}
        />
      </div>
      <div className="mt-10">
        <ResourceBrowser />
      </div>
    </div>
  );
}
