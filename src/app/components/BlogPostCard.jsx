"use client";
import React from "react";

const FALLBACK_IMAGE = "https://placehold.co/600x400/0f172a/3b82f6?text=Blog+Post";

// Decode the most common HTML entities that show up in Medium RSS titles
// (e.g. "&amp;" → "&", "&#x27;" → "'"). Keeps things simple — no dependency.
const HTML_ENTITIES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&hellip;": "…",
  "&mdash;": "—",
  "&ndash;": "–",
};
function decodeEntities(input) {
  if (typeof input !== "string") return input;
  return input
    .replace(/&(amp|lt|gt|quot|apos|nbsp|hellip|mdash|ndash);/g, (m) => HTML_ENTITIES[m] ?? m)
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

const BlogPostCard = ({ article }) => {
  // Support both RSS-shaped objects (description string) and curated objects (image field)
  const imageFromDescription =
    typeof article.description === "string"
      ? article.description.match(/<img[^>]+src="([^">]+)"/)?.[1]
      : null;
  const imageSrc = article.image || imageFromDescription || FALLBACK_IMAGE;
  const title = decodeEntities(article.title);
  const snippet = decodeEntities(article.contentSnippet);

  return (
    <div className="h-full w-full">
      <a href={article.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        <div className="relative group cursor-pointer h-full w-full flex flex-col">
          {/* Card border overlay */}
          <div className="absolute inset-0 rounded-xl border-2 border-white/30 group-hover:border-blue-700 group-hover:shadow-2xl group-hover:shadow-blue-900/50 z-10 pointer-events-none transition-all duration-500"></div>

          {/* Image */}
          <div className="relative h-52 w-full rounded-t-xl overflow-hidden flex-shrink-0">
            <img
              src={imageSrc}
              alt={title}
              loading="lazy"
              onError={(e) => {
                if (e.currentTarget.src !== FALLBACK_IMAGE) {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }
              }}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:scale-105"
              style={{ objectPosition: "center" }}
            />
          </div>

          {/* Text section — flex column with min-height instead of fixed height,
              so a long title can take 2 lines without pushing the snippet out
              of the rounded bottom border. */}
          <div className="flex flex-col gap-2 px-4 pt-4 pb-5 bg-gray-900/90 group-hover:bg-gray-800/95 transition-all duration-300 rounded-b-xl flex-1 min-h-[11rem]">
            <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
              {snippet}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default BlogPostCard;
