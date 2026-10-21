import Link from "next/link";
import { notFound } from "next/navigation";
import { getListing } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListing(slug);
  if (!listing) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      {listing.category_name && listing.category_slug && (
        <Link
          href={`/category/${listing.category_slug}`}
          className="font-mono text-xs tracking-widest text-accent hover:underline"
        >
          ← {listing.category_name.toUpperCase()}
        </Link>
      )}
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
        {listing.name}
        {listing.featured && (
          <span className="ml-3 align-middle rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
            FEATURED
          </span>
        )}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-slate-300">
        {listing.description}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {listing.tags.map((t) => (
          <span
            key={t}
            className="rounded-md bg-slate-800 px-2.5 py-1 font-mono text-xs text-slate-300"
          >
            #{t}
          </span>
        ))}
      </div>

      <a
        href={listing.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block rounded-xl bg-accent px-6 py-3.5 font-semibold text-slate-950 hover:brightness-110"
      >
        Visit website →
      </a>
      <p className="mt-3 font-mono text-xs text-slate-500">{listing.website}</p>
    </div>
  );
}
