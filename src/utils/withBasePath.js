/**
 * Prepend the GitHub Pages basePath to absolute /paths so raw <img>, CSS
 * url() and any other non-Next-aware references resolve correctly when
 * the site is hosted under /portfolio.
 *
 * - Leaves http(s)://… URLs alone (Medium CDN, placehold.co, etc.)
 * - Leaves data: URIs alone
 * - Returns "" for empty / null inputs
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function withBasePath(path) {
  if (!path) return "";
  if (/^(https?:)?\/\//i.test(path)) return path; // absolute URL
  if (path.startsWith("data:")) return path;
  if (!path.startsWith("/")) return path; // already relative
  // Avoid double-prefixing if BASE_PATH is somehow already there
  if (BASE_PATH && path.startsWith(BASE_PATH + "/")) return path;
  return `${BASE_PATH}${path}`;
}
