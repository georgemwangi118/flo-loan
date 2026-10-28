import React, { useEffect, useState } from "react";
import { ContentContext, mergeContent } from "./useContent";
import { defaultContent } from "./defaultContent";
import type { SiteContent } from "./types";

const LOAD_TIMEOUT_MS = 4000;

// Loads the content saved through the admin panel. If the API is unreachable the
// site falls back to the built-in default content rather than showing nothing.
const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), LOAD_TIMEOUT_MS);

    fetch("/api/content.php", { signal: controller.signal, cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setContent(mergeContent(data?.content)))
      .catch(() => setContent(defaultContent))
      .finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  if (!content) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
};

export default ContentProvider;
