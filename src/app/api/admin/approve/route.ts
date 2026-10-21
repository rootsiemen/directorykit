import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Approve or reject a pending listing.
 * POST { "slug": "my-listing", "action": "publish" | "reject" }
 * Header: x-admin-token: <ADMIN_TOKEN>
 */
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { slug?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const slug = (body.slug ?? "").trim();
  const status = body.action === "reject" ? "rejected" : "published";
  if (!slug) {
    return NextResponse.json({ error: "slug is required." }, { status: 400 });
  }

  const sql = getSql();
  const rows = (await sql`
    UPDATE listings SET status = ${status}
    WHERE slug = ${slug}
    RETURNING slug, status
  `) as { slug: string; status: string }[];

  if (rows.length === 0) {
    return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  }
  return NextResponse.json({ listing: rows[0] });
}
