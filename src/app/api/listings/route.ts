import { NextRequest, NextResponse } from "next/server";
import { getSql, slugify, type Listing } from "@/lib/db";
import { searchListings, getLatest } from "@/lib/queries";

export const dynamic = "force-dynamic";

function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/** Public JSON API: published listings, optional ?q= search. */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  const listings = q ? await searchListings(q) : await getLatest(24);
  return NextResponse.json({ listings });
}

/** Submit a listing. New submissions start as 'pending' until approved. */
export async function POST(req: NextRequest) {
  let body: {
    name?: string;
    description?: string;
    website?: string;
    categorySlug?: string;
    tags?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const description = (body.description ?? "").trim();
  const website = (body.website ?? "").trim();

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: "Name must be 2–80 characters." }, { status: 400 });
  }
  if (description.length < 20 || description.length > 600) {
    return NextResponse.json(
      { error: "Description must be 20–600 characters." },
      { status: 400 }
    );
  }
  if (!isValidUrl(website)) {
    return NextResponse.json(
      { error: "Please provide a valid http(s) website URL." },
      { status: 400 }
    );
  }

  const tags = (body.tags ?? "")
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 6);

  const sql = getSql();

  let categoryId: number | null = null;
  if (body.categorySlug) {
    const cats = (await sql`
      SELECT id FROM categories WHERE slug = ${body.categorySlug}
    `) as { id: number }[];
    categoryId = cats[0]?.id ?? null;
  }

  // Unique slug from the name, with a numeric suffix on collision.
  const base = slugify(name) || "listing";
  let slug = base;
  for (let n = 2; n < 50; n++) {
    const taken = (await sql`SELECT id FROM listings WHERE slug = ${slug}`) as unknown[];
    if (taken.length === 0) break;
    slug = `${base}-${n}`;
  }

  const rows = (await sql`
    INSERT INTO listings (slug, name, description, website, category_id, tags, status)
    VALUES (${slug}, ${name}, ${description}, ${website}, ${categoryId}, ${tags}, 'pending')
    RETURNING id, slug, name, status
  `) as Pick<Listing, "id" | "slug" | "name" | "status">[];

  return NextResponse.json(
    { listing: rows[0], message: "Submitted — your listing is pending review." },
    { status: 201 }
  );
}
