import type { ReactNode } from "react";
import { pick, type Locale } from "@/lib/i18n";
import { pdfHref } from "@/lib/sen-catalog";
import type { SenResource } from "@/lib/sen-types";

export function DownloadPdfLink({
  resource,
  locale,
  className,
  children,
}: {
  resource: SenResource;
  locale: Locale;
  className?: string;
  children: ReactNode;
}) {
  const title = pick(resource.title, locale);
  return (
    <a
      href={pdfHref(resource.slug, locale)}
      download={`${resource.slug}-${locale}.pdf`}
      className={className}
      aria-label={locale === "en" ? `Download PDF: ${title}` : `下載 PDF：${title}`}
    >
      {children}
    </a>
  );
}
