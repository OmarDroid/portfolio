"use client";
import React from "react";

const FALLBACK_IMAGE = "https://placehold.co/600x400/0f172a/3b82f6?text=Blog+Post";

const BlogPostCard = ({ article }) => {
  // Support both RSS-shaped objects (description string) and curated objects (image field)
  const imageFromDescription =
    typeof article.description === "string"
      ? article.description.match(/<img[^>]+src="([^">]+)"/)?.[1]
      : null;
  const imageSrc = article.image || imageFromDescription || FALLBACK_IMAGE;

  return (
    <div className="h-full w-full">
      <a href={article.link} target="_blank" rel="noopener noreferrer">
        <div className="relative group cursor-pointer h-full w-full">
          {/* Card container with border */}
          <div className="absolute inset-0 rounded-xl border-2 border-white/30 group-hover:border-blue-700 group-hover:shadow-2xl group-hover:shadow-blue-900/50 z-10 pointer-events-none transition-all duration-500"></div>

          {/* Blog post image with no gaps */}
          <div className="relative h-52 w-full rounded-t-xl overflow-hidden">
            <img
              src={imageSrc}
              alt={article.title}
              loading="lazy"
              onError={(e) => {
                if (e.currentTarget.src !== FALLBACK_IMAGE) {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }
              }}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:scale-105"
              style={{ objectPosition: 'center' }}
            />
          </div>

          {/* Blog post details */}
          <div className="h-44 pt-4 pb-5 bg-gray-900/90 group-hover:bg-gray-800/95 transition-all duration-300 rounded-b-xl">
            <h3 className="text-lg font-bold text-white px-4 mb-3 group-hover:text-blue-400 transition-colors duration-300">
              {article.title}
            </h3>
            <div className="px-4">
              <p className="text-sm text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                {article.contentSnippet}
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default BlogPostCard;
