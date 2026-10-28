import { createContext, useContext } from "react";
import { defaultContent } from "./defaultContent";
import type { SiteContent } from "./types";

export const ContentContext = createContext<SiteContent>(defaultContent);

export const useContent = () => useContext(ContentContext);

// Saved content may predate fields added to the site later; fill any gaps from the defaults.
export function mergeContent(stored: unknown): SiteContent {
  if (!stored || typeof stored !== "object") return defaultContent;
  const saved = stored as Record<string, unknown>;
  const merged: Record<string, unknown> = {};
  for (const [key, fallback] of Object.entries(defaultContent)) {
    const value = saved[key];
    if (Array.isArray(fallback)) {
      merged[key] = Array.isArray(value) ? value : fallback;
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      merged[key] = { ...fallback, ...value };
    } else {
      merged[key] = fallback;
    }
  }
  return merged as unknown as SiteContent;
}

export const whatsappUrl = (phone: string, message: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
