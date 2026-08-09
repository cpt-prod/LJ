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

## Bulk-import from YouTube channels

To populate `lib/data.ts` with every video from one or more YouTube
channels, use the helper script:

1. **Get an API key.** Open
   [Google Cloud Console](https://console.cloud.google.com), create a
   project (or reuse one), enable **YouTube Data API v3**, then create an
   API key.
2. **Add it to `.env.local`** at the project root:
   ```
   YOUTUBE_API_KEY=AIza...
   ```
   `.env.local` is gitignored — your key stays local.
3. **Edit the `HANDLES` array** in
   [`scripts/fetch-channels.mjs`](./scripts/fetch-channels.mjs) to list
   the `@handles` you want (currently `@LJ_THE_DJ` and
   `@Ljthedjinthemix`).
4. **Run the script:**
   ```
   node scripts/fetch-channels.mjs
   ```
5. **Copy the printed `videos: Video[]` block** into
   [`lib/data.ts`](./lib/data.ts), replacing the existing seed array.

The script resolves handles → channel IDs, pulls each channel's uploads
playlist (capped at 100 videos per channel), guesses a category from the
title (`dj`, `music`, `community`, `other`), and prints a TypeScript-ready
array. Re-run anytime you want to refresh.

## License

MIT — see [LICENSE](./LICENSE).
