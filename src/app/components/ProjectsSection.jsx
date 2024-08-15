"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";

import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Payback App",
    description: "Mobile payment & reward program",
    image: "/images/projects/1.png",
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "BVB FC",
    description: "Borussia Dortmund official mobile app",
    image: "/images/projects/2.png",
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Westham FC",
    description: "Westham official mobile app",
    image: "/images/projects/3.png",
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Navvis Ivion Go",
    description: "Indoor Mapping",
    image: "/images/projects/4.png",
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Bde Bank",
    description: "Mobile banking app",
    image: "/images/projects/5.png",
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "BLC Bank",
    description: "Mobile payment app",
    image: "/images/projects/6.png",
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 7,
    title: "Elnashra",
    description: "Mobile news app",
    image: "/images/projects/7.png",
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 8,
    title: "Hey BLC",
    description: "Mobile payment app",
    image: "/images/projects/8.png",
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 9,
    title: "NBK Bank",
    description: "Mobile banking app",
    image: "/images/projects/9.png",
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>

      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {projectsData.map((project, index) => (
         
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;