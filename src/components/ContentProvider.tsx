"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { searchBrain } from "@/lib/query";
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
    fetch("/api/content", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: SiteContent) => {
        if (active && data?.notes && data?.domains) setContent(data);
      })
      .catch(() => undefined);
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
  return useMemo(() => searchBrain(content, query), [content, query]);
}
