# Casa de Langosta

Production-ready marketing website for **Restaurante Roberto — La Casa de la Langosta**, a family-owned Caribbean seafood restaurant in Cahuita, Limón, Costa Rica.

**Stack:** Next.js 15 · React 19 · Tailwind CSS v4 · next-intl (EN + ES) · Cloudflare Workers via @opennextjs/cloudflare

---

## Quickstart

```bash
pnpm i && pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Preview in the Workers runtime

This runs the OpenNext build locally inside a Cloudflare Workers sandbox — the closest thing to production:

```bash
pnpm preview
```

---

## Deploy

```bash
pnpm deploy
```

This requires the Cloudflare secrets below to be configured in your shell or CI:

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Needs **Workers Scripts: Edit**, **Workers KV Storage: Edit**, **Cloudflare Images: Edit** |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID (Dashboard → right sidebar) |

For CI, add these as GitHub Actions secrets (Settings → Secrets → Actions).

---

## Cloudflare KV cache (optional but recommended)

```bash
pnpm exec wrangler kv namespace create NEXT_CACHE_WORKERS_KV
```

Copy the returned `id`, then uncomment and fill in the `kv_namespaces` block in `wrangler.jsonc`.

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_BASE_URL` | No | Public URL (default: `https://casadelangosta.cr`) |
| `RESEND_API_KEY` | No | Enables email notifications on contact form submission |

For local dev, create `.dev.vars` (gitignored) and add Cloudflare bindings:

```
RESEND_API_KEY=re_...
```

---

## Content editing

**The owner can update content without touching JSX by editing these files:**

### Menu
`content/menu.en.ts` / `content/menu.es.ts` — Add, remove, or update dishes and prices here. Each item is a typed object; TypeScript will catch structural mistakes.

### Excursions
`content/excursions.en.ts` — Add or remove excursion entries.

### Strings & copy
`messages/en.json` / `messages/es.json` — Every user-facing string lives here. Update hours, phone numbers, addresses, testimonials, etc.

### Constants (hours, phone, address)
`lib/constants.ts` — Central source of truth for contact info, coordinates, and hours.

---

## Project structure

```
app/
  [locale]/       # All pages (locale-prefixed routing)
  api/reserve/    # POST endpoint — builds WhatsApp deep link
  sitemap.ts
  robots.ts
  opengraph-image.tsx
components/
  layout/         # Header, Footer, LocaleSwitcher, MobileNav
  sections/       # Page sections (Hero, LobsterTank, etc.)
  menu/           # MenuCategory, MenuItem, MenuBadge
  ui/             # shadcn primitive components
content/          # Typed menu and excursion data (EN + ES)
i18n/             # next-intl routing, navigation, request config
lib/              # constants, utils, whatsapp helper, SEO helpers
messages/         # en.json, es.json translation files
styles/           # globals.css (Tailwind v4 + design tokens)
```

---

## Generating Cloudflare type definitions

After updating `wrangler.jsonc` bindings:

```bash
pnpm cf-typegen
```

This updates `cloudflare-env.d.ts` with your current binding types.

---

## Lighthouse targets

| Metric | Target |
|--------|--------|
| Performance | ≥ 95 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
