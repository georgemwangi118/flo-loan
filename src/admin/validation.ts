import type { SiteContent } from "../content/types";

// Kept in sync with RESERVED_SLUGS in public/api/content.php.
export const RESERVED_SLUGS = [
  "admin",
  "about",
  "contact",
  "terms-and-conditions",
  "privacy-policy",
  "api",
  "uploads",
  "images",
  "assets",
  "scripts",
  "loans",
];

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function slugError(slug: string, otherSlugs: string[]): string | null {
  if (!slug) return "Page address is required.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return "Use lowercase letters, numbers and dashes only.";
  if (RESERVED_SLUGS.includes(slug)) return "This address is already used by another page.";
  if (otherSlugs.includes(slug)) return "Another loan already uses this address.";
  return null;
}

// Problems that would stop the server accepting the content, shown before saving.
export function validateContent(content: SiteContent): string[] {
  const problems: string[] = [];
  content.loans.forEach((loan, i) => {
    const label = loan.name.trim() || `Loan #${i + 1}`;
    if (!loan.name.trim()) problems.push(`${label} needs a name.`);
    const others = content.loans.filter((_, j) => j !== i).map((l) => l.slug);
    const error = slugError(loan.slug, others);
    if (error) problems.push(`${label}: ${error}`);
  });
  return problems;
}
