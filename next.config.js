/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages (the workflow uploads ./out as the artifact).
  output: 'export',
  // Repo is hosted at OmarDroid/portfolio → site lives at /portfolio.
  basePath: '/portfolio',
  // GitHub Pages can't run the Next.js image optimizer, so let next/image emit
  // <img> tags directly.
  images: {
    unoptimized: true,
  },
  // Trailing slashes play nicer with static hosting on GitHub Pages.
  trailingSlash: true,
}

module.exports = nextConfig
