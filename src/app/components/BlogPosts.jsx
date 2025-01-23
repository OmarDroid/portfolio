"use client";
import React, { useTransition, useState, useEffect, useRef } from "react";
import BlogPostCard from "./BlogPostCard";

const BlogPosts = () => {
  const [articles, setArticles] = useState([]);
  const ref = useRef(null);
  useEffect(() => {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@omaroid")
      .then((res) => res.json())
      .then((data) => setArticles(data.items));
  }, []);

  return (
    <section id="blogs">
      <h2 className="text-center text-3xl sm:text-2xl lg:text-4xl font-bold text-white mt-20 mb-8 md:mb-12">
        Blog Posts
      </h2>


      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {articles.map((article, index) => (
          <BlogPostCard article={article} />
        ))}
      </ul>

    </section>
  );
};

export default BlogPosts;
