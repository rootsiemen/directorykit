import Link from "next/link";
import { siteConfig } from "../../site.config";
import ListingCard from "@/components/ListingCard";
import {
  getCategories,
  getFeatured,
  getLatest,
  searchListings,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const [categories, featured, latest, results] = await Promise.all([
    getCategories(),
    query ? Promise.resolve([]) : getFeatured(),
    query ? Promise.resolve([]) : getLatest(),
    query ? searchListings(query) : Promise.resolve([]),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Hero */}
      <section className="py-16 text-center">
        <p className="font-mono text-xs tracking-widest text-accent">
          OPEN-SOURCE DIRECTORY TEMPLATE
        </p>
        <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {siteConfig.tagline}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-400">
          {siteConfig.description}
        </p>
        <form method="get" className="mx-auto mt-8 flex max-w-xl gap-2">
          <input
            name="q"
            defaultValue={query}
            placeholder={siteConfig.searchPlaceholder}
            className="w-full rounded-xl border border-line bg-panel px-4 py-3 text-white placeholder:text-slate-500 focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-accent px-5 py-3 font-semibold text-slate-950 hover:brightness-110"
          >
            Search
          </button>
        </form>
      </section>

      {query ? (
        <section className="pb-8">
          <h2 className="text-xl font-bold text-white">
            {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
          </h2>
          {results.length === 0 ? (
            <p className="mt-4 text-slate-400">
              Nothing matched yet.{" "}
              <Link href="/submit" className="text-accent hover:underline">
                Submit it
              </Link>{" "}
              and help grow the directory.
            </p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Categories */}
          <section>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/category/${c.slug}`}
                  className="rounded-2xl border border-line bg-panel p-5 transition hover:border-accent/50"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{c.name}</h3>
                    <span className="font-mono text-xs text-slate-500">
                      {c.listing_count ?? 0} listings
                    </span>
                  </div>
                  {c.description && (
                    <p className="mt-1.5 text-sm text-slate-400">{c.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>

          {/* Featured */}
          {featured.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-bold text-white">Featured</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((l) => (
                  <ListingCard key={l.id} listing={l} />
                ))}
              </div>
            </section>
          )}

          {/* Latest */}
          <section className="mt-14">
            <h2 className="text-xl font-bold text-white">Latest additions</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
