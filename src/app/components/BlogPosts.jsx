"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { useState, useEffect } from "react";
import BlogPostCard from "./BlogPostCard";

const BlogPosts = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@omaroid")
      .then((res) => res.json())
      .then((data) => setArticles(data.items || []));
  }, []);

  return (
    <section id="blogs" className="mt-20 mb-12 px-4 lg:px-12">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-white mb-8">
        Blog Posts
      </h2>

      {articles.length > 0 ? (
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{
              clickable: true,
              el: ".custom-pagination", // Attach pagination to custom container
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {articles.map((article, index) => (
              <SwiperSlide key={index}>
                <BlogPostCard article={article} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="custom-pagination flex justify-center mt-4"></div>
        </div>
      ) : (
        <p className="text-center text-gray-300">No blog posts available.</p>
      )}
    </section>
  );
};

export default BlogPosts;
