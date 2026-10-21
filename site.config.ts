/**
 * DirectoryKit site configuration.
 * Rebrand the whole directory by editing this one file.
 */
export const siteConfig = {
  name: "DirectoryKit",
  tagline: "Discover the best tools for your niche",
  description:
    "DirectoryKit is an open-source directory template. Swap this config, add your listings, and launch a directory site for any niche — powered by Next.js and Postgres.",
  // Shown in the hero search bar
  searchPlaceholder: "Search tools, products, services…",
  // Accent color is set in src/app/globals.css (@theme --color-accent)
};

export type SiteConfig = typeof siteConfig;
