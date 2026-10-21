import { getSql, type Category, type Listing } from "./db";

const LISTING_COLS = `
  l.id, l.slug, l.name, l.description, l.website, l.logo_url,
  l.category_id, c.slug AS category_slug, c.name AS category_name,
  l.tags, l.featured, l.status, l.created_at
`;
const JOIN = `FROM listings l LEFT JOIN categories c ON c.id = l.category_id`;

export async function getCategories(): Promise<Category[]> {
  const sql = getSql();
  return (await sql`
    SELECT c.id, c.slug, c.name, c.description,
           COUNT(l.id)::int AS listing_count
    FROM categories c
    LEFT JOIN listings l ON l.category_id = c.id AND l.status = 'published'
    GROUP BY c.id
    ORDER BY c.name
  `) as Category[];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const sql = getSql();
  const rows = (await sql`
    SELECT id, slug, name, description FROM categories WHERE slug = ${slug}
  `) as Category[];
  return rows[0] ?? null;
}

export async function getFeatured(limit = 6): Promise<Listing[]> {
  const sql = getSql();
  return (await sql`
    SELECT ${sql.unsafe(LISTING_COLS)} ${sql.unsafe(JOIN)}
    WHERE l.status = 'published' AND l.featured = true
    ORDER BY l.created_at DESC
    LIMIT ${limit}
  `) as Listing[];
}

export async function getLatest(limit = 12): Promise<Listing[]> {
  const sql = getSql();
  return (await sql`
    SELECT ${sql.unsafe(LISTING_COLS)} ${sql.unsafe(JOIN)}
    WHERE l.status = 'published'
    ORDER BY l.created_at DESC
    LIMIT ${limit}
  `) as Listing[];
}

export async function getListingsByCategory(categoryId: number): Promise<Listing[]> {
  const sql = getSql();
  return (await sql`
    SELECT ${sql.unsafe(LISTING_COLS)} ${sql.unsafe(JOIN)}
    WHERE l.status = 'published' AND l.category_id = ${categoryId}
    ORDER BY l.featured DESC, l.created_at DESC
  `) as Listing[];
}

export async function getListing(slug: string): Promise<Listing | null> {
  const sql = getSql();
  const rows = (await sql`
    SELECT ${sql.unsafe(LISTING_COLS)} ${sql.unsafe(JOIN)}
    WHERE l.slug = ${slug} AND l.status = 'published'
  `) as Listing[];
  return rows[0] ?? null;
}

export async function searchListings(q: string, limit = 24): Promise<Listing[]> {
  const sql = getSql();
  const like = `%${q}%`;
  return (await sql`
    SELECT ${sql.unsafe(LISTING_COLS)} ${sql.unsafe(JOIN)}
    WHERE l.status = 'published'
      AND (l.name ILIKE ${like} OR l.description ILIKE ${like} OR ${q} = ANY(l.tags))
    ORDER BY l.featured DESC, l.created_at DESC
    LIMIT ${limit}
  `) as Listing[];
}
