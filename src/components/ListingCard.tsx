import Link from "next/link";
import type { Listing } from "@/lib/db";

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listing/${listing.slug}`}
      className="group block rounded-2xl border border-line bg-panel p-5 transition hover:border-accent/50 hover:bg-panel/70"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-white group-hover:text-accent">
          {listing.name}
        </h3>
        {listing.featured && (
          <span className="shrink-0 rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
            FEATURED
          </span>
        )}
      </div>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
        {listing.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {listing.category_name && (
          <span className="rounded-md bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-300">
            {listing.category_name}
          </span>
        )}
        {listing.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-md px-1.5 py-1 font-mono text-[11px] text-slate-500"
          >
            #{t}
          </span>
        ))}
      </div>
    </Link>
  );
}
