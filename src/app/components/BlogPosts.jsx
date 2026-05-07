"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { useState, useEffect, useRef } from "react";
import BlogPostCard from "./BlogPostCard";
import { motion } from "framer-motion";
import curatedPosts from "../../data/blogPosts";

const BlogPosts = () => {
  const [articles, setArticles] = useState(curatedPosts);
  // Only loading if the curated list is empty AND we're falling back to RSS
  const [isLoading, setIsLoading] = useState(curatedPosts.length === 0);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    // If you've added entries to src/data/blogPosts.js we use those directly.
    // If the curated list is empty we fall back to the (capped) Medium RSS feed
    // so the section is never empty during initial setup.
    if (curatedPosts.length > 0) return;

    let cancelled = false;
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) throw new Error("Failed to fetch blog posts");
        const data = await response.json();
        if (!cancelled) {
          setArticles(data.items || []);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        if (!cancelled) {
          setError("Unable to load blog posts. Please try again later.");
          setArticles([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchBlogPosts();
    return () => { cancelled = true; };
  }, []);

  // Loading skeleton component
  const BlogSkeleton = () => (
    <div className="h-96 bg-slate-800/50 rounded-xl p-4 animate-pulse flex flex-col">
      <div className="h-48 bg-slate-700/50 rounded-lg mb-4"></div>
      <div className="h-6 bg-slate-700/50 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-slate-700/50 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-slate-700/50 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-slate-700/50 rounded w-4/6 mb-2"></div>
      <div className="h-4 bg-slate-700/50 rounded w-3/6"></div>
      <div className="mt-auto flex justify-between">
        <div className="h-6 bg-slate-700/50 rounded w-1/4"></div>
        <div className="h-6 bg-slate-700/50 rounded w-1/4"></div>
      </div>
    </div>
  );

  return (
    <section
      id="blogs"
      className="section-style section-shell"
    >
      {/* Decorative gradient overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[530px] h-[280px] bg-primary-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400/10 blur-2xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-300/10 blur-2xl rounded-full" />
      </div>

      <div className="section-inner">
        <div className="text-white flex flex-col justify-center items-start gap-2 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full"
          >
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="section-header"
            >
              <h2>Blog Posts</h2>
              <p>
                Articles I&apos;ve published — also available on{" "}
                <a href="https://medium.com/@omaroid" className="underline hover:text-indigo-400 transition-colors" rel="noopener noreferrer" target="_blank">Medium</a>.
              </p>
            </motion.div>
            <div className="max-w-6xl mx-auto space-y-8 ">
              {isLoading ? (
                <Swiper
                  spaceBetween={30}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 2 },
                    1280: { slidesPerView: 3 },
                  }}
                  className="pb-12 w-full"
                >
                  {[1, 2, 3].map((_, index) => (
                    <SwiperSlide key={index}>
                      <BlogSkeleton />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : error ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto text-center"
                >
                  <p className="text-red-400">{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : articles.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="w-full overflow-visible mx-auto"
                >
                  <div className="relative">
                    {/* Custom left navigation arrow */}
                    <button 
                      className="custom-nav-btn custom-nav-prev"
                      onClick={() => {
                        if (swiperRef.current && swiperRef.current.swiper) {
                          swiperRef.current.swiper.slidePrev();
                        }
                      }}
                      aria-label="Previous slide"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <Swiper
                      ref={swiperRef}
                      modules={[Pagination]}
                      pagination={{
                        clickable: true,
                        el: ".custom-pagination",
                        renderBullet: function (index, className) {
                          return `<button class="${className}" aria-label="Go to slide ${index + 1}"></button>`;
                        }
                      }}
                      spaceBetween={30}
                      slidesPerView={1}
                      breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 },
                        1280: { slidesPerView: 3 },
                      }}
                      className="pb-12 w-full overflow-visible"
                    >
                      {articles.map((article, index) => (
                        <SwiperSlide key={index} className="h-auto py-4">
                          <BlogPostCard article={article} />
                        </SwiperSlide>
                      ))}

                      {/* Final slide — invites visitors to dive into the full archive on Medium */}
                      <SwiperSlide className="h-auto py-4">
                        <a
                          href="https://medium.com/@omaroid"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative h-full w-full flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-700/70 hover:border-primary-500/60 bg-gradient-to-br from-slate-900/60 to-slate-800/30 hover:from-slate-900/80 hover:to-primary-900/30 transition-all duration-300 p-8 text-center min-h-[22rem]"
                          aria-label="Browse all articles on Medium"
                        >
                          <span className="w-14 h-14 rounded-full bg-primary-500/15 border border-primary-500/30 flex items-center justify-center text-primary-300 group-hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                              <path d="M2.846 6.887a.864.864 0 0 0-.282-.732L.487 3.642v-.376h6.43l4.97 10.901 4.371-10.901H22.5v.376l-1.778 1.704a.52.52 0 0 0-.197.498V17.62a.52.52 0 0 0 .197.498l1.737 1.704v.376h-8.738v-.376l1.799-1.745c.177-.177.177-.229.177-.498V8.16l-5.003 12.708h-.677L4.193 8.16v8.518c-.05.359.069.72.324.98l2.34 2.84v.376H.207v-.376l2.34-2.84c.252-.26.366-.622.299-.98z"/>
                            </svg>
                          </span>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                              Read all my articles
                            </h3>
                            <p className="text-sm text-slate-400 max-w-xs mx-auto">
                              The full archive lives on Medium — including pieces older than what fits here.
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary-300 group-hover:text-primary-200 transition-colors">
                            View on Medium
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        </a>
                      </SwiperSlide>
                    </Swiper>
                    
                    {/* Custom right navigation arrow */}
                    <button 
                      className="custom-nav-btn custom-nav-next"
                      onClick={() => {
                        if (swiperRef.current && swiperRef.current.swiper) {
                          swiperRef.current.swiper.slideNext();
                        }
                      }}
                      aria-label="Next slide"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="custom-pagination flex items-center justify-center gap-2 mt-4"></div>
                </motion.div>
              ) : (
                <p className="text-center text-gray-300">No blog posts available.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
