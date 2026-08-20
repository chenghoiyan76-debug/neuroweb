import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import { ContentProvider } from "@/components/ContentProvider";
import { LocaleProvider } from "@/components/LocaleProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { defaultLocale } from "@/lib/i18n";
import { readSiteContent } from "@/lib/repository";
import "./globals.css";

const notoSans = Noto_Sans_TC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSerif = Noto_Serif_TC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await readSiteContent();
  return {
    metadataBase: new URL("https://yanischeng.com"),
    title: {
      default: `${content.profile.siteName}: ${content.profile.tagline.en}`,
      template: `%s · ${content.profile.siteName}`,
    },
    description: `${content.profile.tagline.zh} / ${content.profile.tagline.en}`,
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const content = await readSiteContent();
  return (
    <html
      lang={defaultLocale === "en" ? "en" : "zh-Hant"}
      className={`${notoSans.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <LocaleProvider locale={defaultLocale}>
          <ContentProvider initial={content}>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </ContentProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
