"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LOCAL_CONTENT_KEY, readLocalContent } from "@/lib/admin-client";
import { searchSite } from "@/lib/query";
import { withBase } from "@/lib/site";
import type { SiteContent } from "@/lib/types";

const ContentContext = createContext<SiteContent | null>(null);

export function ContentProvider({
  initial,
  children,
}: {
  initial: SiteContent;
  children: ReactNode;
}) {
  const [content, setContent] = useState(initial);

  useEffect(() => {
    let active = true;
    const local = readLocalContent();

    fetch(withBase("/api/content"), { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: SiteContent | null) => {
        if (!active) return;
        if (local && (!data?.profile || local.updatedAt >= data.updatedAt)) {
          setContent(local);
          return;
        }
        if (data?.profile) {
          setContent(data);
          try {
            localStorage.setItem(LOCAL_CONTENT_KEY, JSON.stringify(data));
          } catch {
            // ignore quota
          }
          return;
        }
        if (local) setContent(local);
      })
      .catch(() => {
        if (active && local) setContent(local);
      });

    return () => {
      active = false;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const value = useContext(ContentContext);
  if (!value) throw new Error("useContent must be used within ContentProvider");
  return value;
}

export function useSearch(query: string) {
  const content = useContent();
  return useMemo(() => searchSite(content, query), [content, query]);
}
