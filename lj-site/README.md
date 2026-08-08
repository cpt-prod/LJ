# LJ — landing page

Video showcase landing page for LJ. Displays YouTube videos, DJ performances,
music/creative work, and community service content.

## Stack

- Next.js 14 (App Router) + TypeScript
- Plain CSS with `:root` design tokens (no Tailwind, no CSS-in-JS)
- No CMS, no backend — content lives in [`lib/data.ts`](./lib/data.ts)
- MIT licensed

## Pages

- `/` — home: hero, featured video, recent videos, contact CTA
- `/videos` — gallery with category filter
- `/about` — bio
- `/contact` — `mailto:` form
- `/api/videos` — JSON endpoint exposing the seed data

## Develop

```bash
npm install
npm run dev   # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Adding videos

Edit [`lib/data.ts`](./lib/data.ts) and add an entry to the `videos` array.
Three source types are supported via the `kind` discriminator:

- `kind: "youtube"` — paste a YouTube video ID
- `kind: "mp4"` — point `src` at a video file (e.g. `/videos/sample.mp4`)
- `kind: "vimeo"` — paste a Vimeo video ID

When migrating to a real backend, swap the import in
[`app/api/videos/route.ts`](./app/api/videos/route.ts) for a query.

## License

MIT — see [LICENSE](./LICENSE).
