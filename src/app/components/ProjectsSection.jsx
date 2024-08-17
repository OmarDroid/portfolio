"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";

import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Payback App",
    description: "Mobile payment & reward program",
    image: "./images/projects/1.png",
    previewUrl: "https://www.payback.de/app",
  },
  {
    id: 2,
    title: "BVB FC",
    description: "Borussia Dortmund official mobile app",
    image: "./images/projects/2.png",
    previewUrl: "https://play.google.com/store/apps/details?id=de.bvb09.android&hl=en",
  },
  {
    id: 3,
    title: "Westham FC",
    description: "Westham official mobile app",
    image: "./images/projects/3.png",
    previewUrl: "https://play.google.com/store/apps/details?id=de.elasticbrains.west_ham_united&hl=en_GB&gl=US",
  },
  {
    id: 4,
    title: "Navvis Ivion Go",
    description: "Indoor Mapping",
    image: "./images/projects/4.png",
    previewUrl: "https://play.google.com/store/apps/details?id=com.navvis.mdfa&hl=en&gl=US",
  },
  {
    id: 5,
    title: "Bde Bank",
    description: "Mobile banking app",
    image: "./images/projects/5.png",
    previewUrl: "https://play.google.com/store/apps/details?id=com.setelia.android.bde",
  },
  {
    id: 6,
    title: "BLC Bank",
    description: "Mobile payment app",
    image: "./images/projects/6.png",
    previewUrl: "https://www.blcbank.com/personal/detail.aspx?pid=164&ptid=1",
  },
  {
    id: 7,
    title: "Elnashra",
    description: "Mobile news app",
    image: "./images/projects/7.png",
    previewUrl: "https://play.google.com/store/apps/details?id=com.elnashra&hl=en&gl=US",
  },
  {
    id: 8,
    title: "Hey Pay",
    description: "Mobile payment app",
    image: "./images/projects/8.png",
    previewUrl: "http://hey-pay.me/#aboutUsId",
  },
  {
    id: 9,
    title: "NBK Bank",
    description: "Mobile banking app",
    image: "./images/projects/9.png",
    previewUrl: "https://play.google.com/store/apps/details?id=com.nbk.IBGmobile&hl=en_US",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);

  return (
    <section id="projects">
      <h2 className="text-center text-3xl sm:text-2xl lg:text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>

      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {projectsData.map((project, _index) => (
         
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              previewUrl={project.previewUrl}
            />
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;