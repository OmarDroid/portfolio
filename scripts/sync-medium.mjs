#!/usr/bin/env node
/**
 * sync-medium.mjs
 *
 * Why: medium.com/feed/@user only ever returns the 10 most recent posts.
 * This script merges new RSS items into src/data/blogPosts.js so the curated
 * archive accumulates over time. Re-run it whenever you publish a new post
 * (it will dedupe by article link and never drop entries already in the file).
 *
 * Usage:
 *   node scripts/sync-medium.mjs
 *
 * No dependencies (uses built-in fetch). Requires Node 18+.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(PROJECT_ROOT, "src", "data", "blogPosts.js");

const MEDIUM_USER = "omaroid"; // <-- change here if your Medium handle changes
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USER}`;

// Pull the first <img> out of the post description HTML.
function extractImage(descriptionHtml) {
  if (!descriptionHtml) return undefined;
  const m = descriptionHtml.match(/<img[^>]+src="([^">]+)"/);
  return m ? m[1] : undefined;
}

// Strip HTML tags and collapse whitespace for a clean snippet.
function buildSnippet(html, max = 220) {
  if (!html) return "";
  const text = html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

async function fetchRssItems() {
  const res = await fetch(RSS2JSON_URL);
  if (!res.ok) throw new Error(`rss2json responded with ${res.status}`);
  const json = await res.json();
  if (!Array.isArray(json.items)) throw new Error("Unexpected response shape from rss2json");
  return json.items.map((item) => ({
    title: item.title,
    link: item.link.split("?")[0],
    contentSnippet: buildSnippet(item.description || item.content),
    image: extractImage(item.description || item.content),
    pubDate: item.pubDate ? new Date(item.pubDate).toISOString().slice(0, 10) : undefined,
  }));
}

async function loadExistingPosts() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    return [];
  }
  // Import the existing module to read its current entries.
  const mod = await import(pathToFileURL(DATA_FILE).href);
  return Array.isArray(mod.default) ? mod.default : [];
}

function mergePosts(existing, incoming) {
  const byLink = new Map();
  for (const post of existing) {
    if (post && post.link) byLink.set(post.link, post);
  }
  for (const post of incoming) {
    if (!post.link) continue;
    // Don't overwrite a manually-edited entry, but fill in any missing fields.
    const prev = byLink.get(post.link);
    byLink.set(post.link, prev ? { ...post, ...prev } : post);
  }
  return [...byLink.values()].sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return db - da;
  });
}

function renderFile(posts) {
  const header = `// Curated list of Medium posts. Auto-managed by scripts/sync-medium.mjs.
//
// You can edit entries here freely — the script preserves your manual changes
// when it merges new posts in. Re-run \`node scripts/sync-medium.mjs\` whenever
// you publish a new article to append it to the top.
//
// Schema per entry:
//   { title, link, contentSnippet, image?, pubDate (YYYY-MM-DD) }

const blogPosts = `;
  const body = JSON.stringify(posts, null, 2);
  const footer = `;

export default blogPosts.slice().sort((a, b) => {
  const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
  const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
  return db - da;
});
`;
  return header + body + footer;
}

async function main() {
  console.log(`Fetching latest posts for @${MEDIUM_USER}…`);
  const incoming = await fetchRssItems();
  console.log(`  → ${incoming.length} posts returned by RSS`);

  const existing = await loadExistingPosts();
  console.log(`  → ${existing.length} posts already in ${path.relative(PROJECT_ROOT, DATA_FILE)}`);

  const merged = mergePosts(existing, incoming);
  console.log(`  → ${merged.length} posts after merge`);

  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, renderFile(merged), "utf8");
  console.log(`✔ Wrote ${path.relative(PROJECT_ROOT, DATA_FILE)}`);
}

main().catch((err) => {
  console.error("✖ sync-medium failed:", err.message);
  process.exit(1);
});
