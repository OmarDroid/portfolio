/** @type {import('next').NextConfig} */
// Only prefix paths with /portfolio in production builds (i.e. `next build`).
// In `next dev` we want to hit http://localhost:3000/ directly.
// Override anything by setting NEXT_PUBLIC_BASE_PATH explicitly.
const explicitBase = process.env.NEXT_PUBLIC_BASE_PATH;
const isProd = process.env.NODE_ENV === 'production';
const basePath = explicitBase ?? (isProd ? '/portfolio' : '');

const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages (the workflow uploads ./out as the artifact).
  output: 'export',
  basePath,
  // assetPrefix must be `undefined` (not "") when there's no base path,
  // otherwise Next.js prefixes _next/static URLs with an empty string.
  assetPrefix: basePath || undefined,
  // GitHub Pages can't run the Next.js image optimizer, so let next/image emit
  // <img> tags directly.
  images: {
    unoptimized: true,
  },
  // Trailing slashes play nicer with static hosting on GitHub Pages.
  trailingSlash: true,
  // Surface the basePath to client-side code so raw <img> tags can prefix it.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

module.exports = nextConfig
