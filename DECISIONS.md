# Architecture Decisions

## Routing
- **next-intl pathnames**: Spanish routes are aliased (`/story` → `/historia`, etc.) for better SEO in Spanish-speaking markets. English is the default locale (no prefix redirect needed for tourists hitting the root).

## Images
- **No custom Cloudflare image loader**: The @opennextjs/cloudflare adapter handles the `IMAGES` binding automatically. Using the default next/image without a custom loader means local dev works with Next.js's built-in image optimization, and production uses Cloudflare's pipeline.
- **Placeholder images**: All `public/images/*.jpg` are referenced but not committed. `public/images/README.md` documents exactly which files are needed and at what dimensions.

## Contact form
- **WhatsApp-first**: The `/api/reserve` route builds a `wa.me` deep link and returns it to the client, which opens it in a new tab. No server-side state is stored. This is intentional — it keeps the backend stateless and the owner's primary workflow in WhatsApp.
- **Resend fallback**: The email path is fully wired but commented out in `app/api/reserve/route.ts`. Uncomment and set `RESEND_API_KEY` to activate it.

## Gallery lightbox
- **CSS columns + client component**: Using CSS `columns` for a masonry-style layout (no JS masonry library). The lightbox state lives in `GalleryGrid` (a client component), while the page itself remains a server component for metadata generation.

## Design system
- **Tailwind v4 `@theme`**: All brand tokens (`--color-sand`, `--color-ocean`, etc.) are defined in `@theme` in `globals.css` so they generate Tailwind utility classes (`bg-sand`, `text-ocean`) without a `tailwind.config.js`.
- **No dark mode**: Single warm light theme. Removed all shadcn dark-mode CSS variable variants.

## Testimonials
- **Embla carousel**: Chosen over Swiper (smaller bundle) and CSS-only scroll-snap (needs JS for prev/next buttons and accessibility). Three generic attributions — no real names scraped from review sites.
- **`t.raw()`**: Used to access the testimonials array from next-intl since the items are structured objects, not simple strings.

## i18n
- **next-intl v3 App Router setup**: Uses `defineRouting`, `createNavigation`, and `getRequestConfig` — the current v3 API. The `i18n/request.ts` file replaces the deprecated `i18n.ts` pattern.

## OG image
- **`runtime = "nodejs"`** in `opengraph-image.tsx`: The `ImageResponse` from `next/og` requires either nodejs or edge runtime. The spec prohibits `"edge"`, so nodejs is used. This is fine — the OG image is only fetched by crawlers.

## Cloudflare Workers
- **`export const runtime = "edge"` prohibited**: No file in this project exports this. The @opennextjs/cloudflare adapter does not support the edge runtime directive; it handles the Worker runtime globally.
- **KV cache**: Commented out in `wrangler.jsonc` with a clear TODO. The namespace must be created with `wrangler kv namespace create` before the id is known.

## Coordinates
- **Approximate coords used**: `9.7365, -82.8407` — these place the pin at the western entrance of Cahuita village near the national park entrance, consistent with the address description. Verify on-site and update `lib/constants.ts` before launch.

## Biome over ESLint
- Biome was chosen for faster linting/formatting with zero configuration overhead. The `biome.json` mirrors the project's formatting conventions (2-space indent, double quotes, ES5 trailing commas).
