"use client";
import React from "react";
import ProjectCard from "./ProjectCard";

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
    previewUrl: "http://www.bdecash.com/",
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
  return (
    <section id="projects" className="py-12 px-6 bg-[#121212]">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-white mb-12">
        My Projects
      </h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <li key={project.id}>
            <ProjectCard
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              previewUrl={project.previewUrl}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
