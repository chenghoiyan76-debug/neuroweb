import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import { ContentProvider } from "@/components/ContentProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { readSiteContent } from "@/lib/repository";
import { site } from "@/lib/site";
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

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.nameZh}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const content = await readSiteContent();
  return (
    <html
      lang="zh-Hant"
      className={`${notoSans.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <ContentProvider initial={content}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ContentProvider>
      </body>
    </html>
  );
}
