# DirectoryKit

**An open-source directory website template.** Launch a listings directory for
any niche — tools, services, local businesses, professionals — with
**Next.js** and **Postgres (Neon)**.

Built from production experience running a live directory of 760+ listings:
categories, search, featured placements, public submissions with a review
queue, and a JSON API — in one small, readable codebase.

## Features

- **Categories & listings** — Postgres-backed, with tags and featured flags
- **Search** — name, description and tag matching out of the box
- **Public submissions** — visitors submit listings; they start as `pending`
- **Review queue** — approve/reject via a token-protected admin endpoint
- **JSON API** — `GET /api/listings` (with `?q=` search) for programmatic access
- **One-file branding** — rename and reposition the whole site from
  `site.config.ts`
- **Sample data** — seed categories and demo listings so a fresh install
  never starts empty

## Quickstart

### 1. Get a Postgres database (free)

Create a project at [neon.tech](https://neon.tech) and copy the connection
string — or use any Postgres you already have.

### 2. Configure and migrate

```bash
git clone https://github.com/rootsiemen/directorykit
cd directorykit
cp .env.example .env.local   # paste your DATABASE_URL + pick an ADMIN_TOKEN
npm install
npm run migrate -- --seed    # creates tables and loads sample data
```

### 3. Run

```bash
npm run dev                  # http://localhost:3000
```

### 4. Make it yours

Edit `site.config.ts` (name, tagline, description), replace the seed data in
`db/seed.sql` with your categories, and change the accent color in
`src/app/globals.css`.

## Approving submissions

New submissions are `pending` and invisible until approved:

```bash
curl -X POST http://localhost:3000/api/admin/approve \
  -H "Content-Type: application/json" \
  -H "x-admin-token: YOUR_ADMIN_TOKEN" \
  -d '{"slug": "my-listing", "action": "publish"}'   # or "reject"
```

## Schema

Two tables (`db/schema.sql`):

- **categories** — `slug, name, description`
- **listings** — `slug, name, description, website, logo_url, category_id,
  tags[], featured, status (pending | published | rejected), created_at`

## Deploy

Any Node host works. On **Vercel**: import the repo, set `DATABASE_URL` and
`ADMIN_TOKEN` environment variables, deploy — then run the migration once
against the production database.

## Roadmap

- Logo uploads and image storage
- Admin dashboard UI for the review queue
- Listing analytics (click tracking)
- Sitemap + SEO metadata per listing
- Paid featured placements

## Contributing

Issues and PRs are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). New
niche presets (a `seed.sql` for attorneys, restaurants, SaaS tools…) are an
especially good first contribution.

## License

MIT — see [LICENSE](LICENSE).
