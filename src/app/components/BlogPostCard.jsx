"use client";
import React from "react";
import Link from "next/link";

const BlogPostCard = ({ article }) => {
  const imageSrc = article.description.match(/<img[^>]+src="([^">]+)"/)?.[1];

  return (
    <Link href={article.link} passHref>
      <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden group h-80 cursor-pointer">
        {/* Blog post image */}
        <div
          className="h-2/3 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageSrc || "https://via.placeholder.com/400"})`,
          }}
        ></div>

        {/* Blog post details */}
        <div className="p-4 bg-gray-900 group-hover:bg-gray-800 transition-colors duration-300 flex flex-col justify-between h-full">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-3">
            {article.contentSnippet}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
