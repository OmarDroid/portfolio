"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const MAX_TILT = 8; // degrees

const ProjectCard = ({ imgUrl, title, description, previewUrl }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0..1
    const py = (e.clientY - rect.top) / rect.height;  // 0..1
    const tiltY = (px - 0.5) * 2 * MAX_TILT;          // left/right
    const tiltX = -(py - 0.5) * 2 * MAX_TILT;         // up/down
    node.style.setProperty("--tilt-x", `${tiltX}deg`);
    node.style.setProperty("--tilt-y", `${tiltY}deg`);
    node.classList.add("is-tilting");
  };

  const handleMouseLeave = () => {
    const node = cardRef.current;
    if (!node) return;
    node.style.setProperty("--tilt-x", `0deg`);
    node.style.setProperty("--tilt-y", `0deg`);
    node.classList.remove("is-tilting");
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group tilt-card flex flex-col h-full w-full"
    >
      {/* Image */}
      <div className="relative w-full">
        <div className="absolute inset-0 rounded-xl border-2 border-white/30 group-hover:border-blue-700 group-hover:shadow-2xl group-hover:shadow-blue-900/50 transition-all duration-500 z-10 pointer-events-none"></div>

        <img
          src={imgUrl}
          alt={title}
          loading="lazy"
          className="h-80 md:h-72 w-full rounded-xl object-cover transition-all duration-500 group-hover:brightness-110"
        />

        {/* Hover overlay */}
        <div className="overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 opacity-0 group-hover:opacity-100 backdrop-blur-sm flex items-center justify-center transition-all duration-300 rounded-xl">
          <Link
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-primary-500/30 backdrop-blur-md rounded-full border-2 border-primary-400/70 hover:border-primary-400 hover:bg-primary-500/40 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all transform hover:scale-110"
            aria-label={`View ${title} project`}
          >
            <EyeIcon className="w-8 h-8 text-white" />
          </Link>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 z-10 bg-slate-900/30 backdrop-blur-sm p-4 rounded-xl border border-white/20 group-hover:bg-slate-800/40 group-hover:border-blue-700/40 group-hover:shadow-md transition-all duration-500 w-full">
        <h5 className="text-lg font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight group-hover:from-primary-300 group-hover:to-blue-400 transition-all duration-300">
          {title}
        </h5>
        <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-all duration-300">
          {description}
        </p>

        <div className="flex justify-end items-center mt-3">
          <Link
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-400 hover:text-primary-300 inline-flex items-center gap-1.5 transition-all duration-300 group/link hover:translate-x-0.5"
            aria-label={`View ${title} project details`}
          >
            <span className="text-xs">View</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
