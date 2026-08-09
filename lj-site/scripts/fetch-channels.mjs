#!/usr/bin/env node
/**
 * scripts/fetch-channels.mjs
 *
 * One-shot script: resolve LJ's YouTube handles to channel IDs, fetch the
 * uploads playlist for each, and emit a TypeScript-ready list of `Video`
 * entries that can be pasted into lib/data.ts.
 *
 * Usage:
 *   1. Create a YouTube Data API v3 key in Google Cloud Console.
 *   2. Put it in lj-site/.env.local as:  YOUTUBE_API_KEY=AIza...
 *   3. Run:  node scripts/fetch-channels.mjs
 *   4. Copy the printed `videos: Video[]` block into lib/data.ts.
 *
 * Requires Node 18+ (uses native fetch). No dependencies.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const HANDLES = ["@LJ_THE_DJ", "@Ljthedjinthemix"];
const PER_CHANNEL_LIMIT = 50; // YouTube API max per page
const API_BASE = "https://www.googleapis.com/youtube/v3";

// -------- env loading (no dotenv dep) --------
function loadEnvLocal() {
  const envPath = resolve(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
  console.error(
    "Missing YOUTUBE_API_KEY.\n" +
      "Set it in lj-site/.env.local (one line: YOUTUBE_API_KEY=AIza...)\n" +
      "Get a key at https://console.cloud.google.com → enable YouTube Data API v3.",
  );
  process.exit(1);
}

// -------- helpers --------
async function apiGet(path, params) {
  const url = new URL(API_BASE + path);
  url.searchParams.set("key", API_KEY);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${res.statusText} — ${body.slice(0, 200)}`);
  }
  return res.json();
}

async function resolveHandle(handle) {
  const data = await apiGet("/channels", { part: "id,snippet", forHandle: handle });
  const ch = data.items?.[0];
  if (!ch) throw new Error(`No channel found for ${handle}`);
  return { id: ch.id, title: ch.snippet.title };
}

async function fetchAllUploads(channelId) {
  // Find the uploads playlist ID via channels.list (contentDetails)
  const channelData = await apiGet("/channels", {
    part: "contentDetails",
    id: channelId,
  });
  const uploadsPlaylistId =
    channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) throw new Error(`No uploads playlist for ${channelId}`);

  const items = [];
  let pageToken = undefined;
  while (true) {
    const data = await apiGet("/playlistItems", {
      part: "snippet",
      playlistId: uploadsPlaylistId,
      maxResults: PER_CHANNEL_LIMIT,
      pageToken,
    });
    for (const it of data.items ?? []) items.push(it);
    pageToken = data.nextPageToken;
    if (!pageToken) break;
    if (items.length >= PER_CHANNEL_LIMIT * 2) {
      // cap at 100 per channel to keep the seed file manageable
      break;
    }
  }
  return items;
}

function categoryFor(title) {
  const t = (title || "").toLowerCase();
  if (/(mix|set|live|dj|club|festival|warehouse)/.test(t)) return "dj";
  if (/(official|music video|audio|original|release|premiere|feat|ft\.)/.test(t))
    return "music";
  if (/(community|volunteer|charity|gala|fundraiser|food drive|service)/.test(t))
    return "community";
  return "other";
}

function escapeForSingleQuote(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function toVideoEntry(item, channelTitle, index) {
  const sn = item.snippet;
  const id = `${channelTitle.replace(/\W+/g, "").toLowerCase()}-${index}`;
  return {
    id,
    title: sn.title,
    category: categoryFor(sn.title),
    description: sn.description?.slice(0, 220) || undefined,
    date: sn.publishedAt?.slice(0, 10),
    kind: "youtube",
    youtubeId: sn.resourceId?.videoId,
  };
}

// -------- main --------
const allEntries = [];
for (const handle of HANDLES) {
  console.error(`Resolving ${handle}…`);
  const { id: channelId, title: channelTitle } = await resolveHandle(handle);
  console.error(`  → ${channelId} (${channelTitle})`);

  console.error(`Fetching uploads for ${channelTitle}…`);
  const items = await fetchAllUploads(channelId);
  console.error(`  → ${items.length} video(s)`);

  items.forEach((item, i) => {
    const entry = toVideoEntry(item, channelTitle, i + 1);
    if (!entry.youtubeId) return;
    allEntries.push(entry);
  });
}

console.error(`\nTotal: ${allEntries.length} videos\n`);

// Emit TS-ready array literal that can be dropped into lib/data.ts.
const lines = [];
lines.push("export const videos: Video[] = [");
allEntries.forEach((e, i) => {
  const comma = i === allEntries.length - 1 ? "" : ",";
  lines.push("  {");
  lines.push(`    id: '${escapeForSingleQuote(e.id)}',${i < 0 ? "" : ""}`);
  lines.push(`    kind: 'youtube',`);
  lines.push(`    youtubeId: '${escapeForSingleQuote(e.youtubeId)}',`);
  lines.push(`    title: '${escapeForSingleQuote(e.title)}',`);
  lines.push(`    category: '${e.category}',`);
  if (e.description) {
    lines.push(
      `    description: '${escapeForSingleQuote(e.description)}',`,
    );
  }
  if (e.date) lines.push(`    date: '${e.date}',`);
  lines.push(`  }${comma}`);
});
lines.push("];");

console.log(lines.join("\n"));
