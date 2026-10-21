import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;

/**
 * Lazily-created SQL client. Lazy so `next build` can import route/page
 * modules without a database present; the connection is only opened
 * when a query actually runs.
 */
export function getSql(): NeonQueryFunction<false, false> {
  if (!client) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL is not set. Copy .env.example to .env.local and add your Neon connection string."
      );
    }
    client = neon(process.env.DATABASE_URL);
  }
  return client;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  listing_count?: number;
}

export interface Listing {
  id: number;
  slug: string;
  name: string;
  description: string;
  website: string;
  logo_url: string | null;
  category_id: number | null;
  category_slug?: string | null;
  category_name?: string | null;
  tags: string[];
  featured: boolean;
  status: "pending" | "published" | "rejected";
  created_at: string;
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 60);
}
