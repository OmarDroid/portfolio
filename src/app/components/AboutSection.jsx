"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
        <ul className="list-disc pl-2">
            <li>Kotlin</li>
            <li>Swift</li>
            <li>Jetpack Compose</li>
            <li>SwiftUi - UiKit</li>
            <li>TDD</li>
            <li>CI - CD</li>
          </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Computer Science</li>
        <li>AUL University - Beirut, Lebanon</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
          I am a seasoned software engineer with over ten years of
          experience in native mobile app development for both Android and iOS platforms.
          <br></br>
          My expertise includes creating user-friendly,
          high-performance applications using best practices.
          I am adept at implementing rigorous unit and UI testing
          to ensure software reliability and quality.
          <br></br>
          With experience as a Scrum Master and Delivery Manager,
          I facilitate cross-functional team collaboration to ensure efficient project delivery.
          <br></br>
          <br></br>
          Beyond my current expertise,
          I have a keen interest in AI and machine learning
          and am excited about integrating these technologies
          into future projects to drive innovation and enhance user experiences.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
