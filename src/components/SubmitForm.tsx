"use client";

import { useState } from "react";
import type { Category } from "@/lib/db";

export default function SubmitForm({ categories }: { categories: Category[] }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          description: form.get("description"),
          website: form.get("website"),
          categorySlug: form.get("categorySlug"),
          tags: form.get("tags"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed.");
      setMessage(data.message ?? "Submitted.");
      setState("done");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Submission failed.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-6 text-emerald-200">
        <p className="font-semibold">Thanks — {message}</p>
        <p className="mt-1 text-sm text-emerald-200/80">
          Listings go live once a maintainer approves them.
        </p>
      </div>
    );
  }

  const input =
    "w-full rounded-xl border border-line bg-panel px-4 py-3 text-white placeholder:text-slate-500 focus:border-accent focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">Name</label>
        <input name="name" required minLength={2} maxLength={80} placeholder="My Tool" className={input} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">Website</label>
        <input name="website" required type="url" placeholder="https://example.com" className={input} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">Category</label>
        <select name="categorySlug" className={input} defaultValue="">
          <option value="">— pick a category —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">
          Description <span className="text-slate-500">(20–600 characters)</span>
        </label>
        <textarea name="description" required minLength={20} maxLength={600} rows={4} placeholder="What does it do, and who is it for?" className={input} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">
          Tags <span className="text-slate-500">(comma-separated, up to 6)</span>
        </label>
        <input name="tags" placeholder="ai, saas, free" className={input} />
      </div>
      {state === "error" && (
        <p className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="rounded-xl bg-accent px-6 py-3 font-semibold text-slate-950 hover:brightness-110 disabled:opacity-60"
      >
        {state === "sending" ? "Submitting…" : "Submit listing"}
      </button>
    </form>
  );
}
