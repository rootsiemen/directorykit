import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "../../site.config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-line bg-panel/60 backdrop-blur sticky top-0 z-40">
          <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg tracking-tight">
              {siteConfig.name}
              <span className="text-accent">.</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-slate-300">
              <Link href="/" className="hover:text-white">
                Browse
              </Link>
              <Link
                href="/submit"
                className="rounded-lg bg-accent px-4 py-2 font-semibold text-slate-950 hover:brightness-110"
              >
                Submit a listing
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-line mt-20">
          <div className="mx-auto max-w-6xl px-5 py-10 flex flex-wrap gap-4 items-center justify-between text-sm text-slate-400">
            <p>
              {siteConfig.name} — built with{" "}
              <a
                className="text-accent hover:underline"
                href="https://github.com/rootsiemen/directorykit"
              >
                DirectoryKit
              </a>
              , the open-source directory template.
            </p>
            <p className="font-mono text-xs">NEXT.JS · POSTGRES · NEON</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
