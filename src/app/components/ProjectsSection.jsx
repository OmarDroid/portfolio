"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
// Import projects data
import projectsData, { filterOptions } from "../../data/projects";

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filtered, setFiltered] = useState(projectsData);
  const [visibleProjects, setVisibleProjects] = useState(6);

  // Filter projects based on tag
  const handleFilterChange = (tag) => {
    setActiveFilter(tag);
    
    if (tag === "all") {
      setFiltered(projectsData);
    } else {
      setFiltered(projectsData.filter((project) => project.tag.includes(tag)));
    }
  };

  // Load more projects
  const loadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filtered.length));
  };

  return (
    <section
      id="projects"
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
              <h2>My Projects</h2>
              <p>
                Here are some of the projects I&apos;ve worked on as a mobile engineer. My focus has been on creating responsive, user-friendly applications with clean code and exceptional user experiences.
              </p>
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 mb-10 relative z-10"
            >
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === option.value
                      ? "bg-primary-500 text-white shadow-lg"
                      : "bg-slate-900/80 border border-slate-700 text-gray-200 hover:bg-slate-800"
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </motion.div>

            {/* Project Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                  {filtered.slice(0, visibleProjects).map((project, index) => (
                    <motion.li
                      key={project.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      viewport={{ once: true }}
                    >
                      <ProjectCard
                        title={project.title}
                        description={project.description}
                        imgUrl={project.image}
                        previewUrl={project.previewUrl}
                      />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Load More button */}
            {visibleProjects < filtered.length && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex justify-center mt-10 relative z-10"
              >
                <button
                  onClick={loadMore}
                  className="px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-primary-500 transition-colors duration-300 flex items-center gap-2 border border-slate-700 backdrop-blur-sm"
                >
                  Load More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
