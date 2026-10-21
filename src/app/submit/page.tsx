import SubmitForm from "@/components/SubmitForm";
import { getCategories } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function SubmitPage() {
  const categories = await getCategories();
  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-3xl font-extrabold text-white">Submit a listing</h1>
      <p className="mt-2 text-slate-400">
        Add a tool, product or service to the directory. Submissions are reviewed
        before they go live.
      </p>
      <div className="mt-8">
        <SubmitForm categories={categories} />
      </div>
    </div>
  );
}
