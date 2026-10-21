import { notFound } from "next/navigation";
import ListingCard from "@/components/ListingCard";
import { getCategory, getListingsByCategory } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const listings = await getListingsByCategory(category.id);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="font-mono text-xs tracking-widest text-accent">CATEGORY</p>
      <h1 className="mt-2 text-3xl font-extrabold text-white">{category.name}</h1>
      {category.description && (
        <p className="mt-2 max-w-xl text-slate-400">{category.description}</p>
      )}
      {listings.length === 0 ? (
        <p className="mt-8 text-slate-400">No published listings here yet.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}
