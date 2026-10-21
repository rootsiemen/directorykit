# Contributing to DirectoryKit

Thanks for helping make directory sites easier to launch.

## Setup

```bash
cp .env.example .env.local   # add a Neon (or any Postgres) DATABASE_URL
npm install
npm run migrate -- --seed
npm run dev
```

## Ground rules

- Keep dependencies minimal — the template's value is that a beginner can
  read the whole codebase in one sitting.
- Database changes go in `db/schema.sql` (idempotent `IF NOT EXISTS`
  style — the migrate script must stay re-runnable).
- Branding belongs in `site.config.ts`, never hardcoded in components.

## Good first contributions

- **Niche presets** — a `db/seed-<niche>.sql` with categories + sample
  listings for a niche (attorneys, restaurants, SaaS, local services…).
- **Docs** — deployment guides for hosts other than Vercel.
- **Fixes** — anything in the issue tracker labelled `good first issue`.

## Pull requests

One focused change per PR. `npm run build` must pass. By contributing you
agree your work is licensed under the project's MIT license.
