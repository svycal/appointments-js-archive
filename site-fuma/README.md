# SavvyCal Appointments Docs (Fumadocs)

Experimental Fumadocs port of the Docusaurus site in `../site`. This package is
not deployed yet; production docs still build from `site/`.

It uses **Next.js + Fumadocs MDX**. That is the most maintained Fumadocs path
(first-class OpenAPI, search, `llms.txt`, and OG images) for a standalone docs
site.

### Local development

```bash
pnpm install
pnpm --filter site-fuma dev
```

Open http://localhost:3000.

API reference and schema pages are generated at build/dev time from
https://api.savvycal.app/v1/spec (no committed MDX dump). Schema pages live at
`/api/schemas/{name}`.

### Scripts

| Script             | Description                |
| ------------------ | -------------------------- |
| `pnpm dev`         | Next.js dev server         |
| `pnpm build`       | Production build           |
| `pnpm start`       | Serve the production build |
| `pnpm types:check` | Typecheck                  |
