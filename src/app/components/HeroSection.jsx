"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import withBasePath from "../../utils/withBasePath";

const HERO_PORTRAIT = withBasePath("/images/hero-image.png");

const typeSequence = [
  "Senior Mobile Engineer",
  1000,
  "Kotlin Architect",
  1000,
  "Agile Tech Leader",
  1000,
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="section-style relative w-full mx-auto rounded-2xl py-16 md:py-24 px-8 md:px-12 shadow-lg border border-slate-700/20 bg-[#121212]/60 backdrop-blur-sm flex items-center justify-center"
    >
      {/* Background structure */}
      <div className="absolute inset-0 z-0 rounded-2xl pointer-events-none">
        <div className="absolute inset-0 bg-black/40 rounded-2xl backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-800/10 via-secondary-800/5 to-primary-500/10 opacity-50 rounded-2xl" />
        <div className="absolute inset-0 border border-white/5 rounded-2xl" />
        <div className="absolute inset-0 rounded-2xl shadow-[0_0_50px_5px_rgba(75,100,255,0.1)]" />
      </div>

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto gap-16 md:gap-32 px-4 md:px-12">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center md:items-start w-full md:w-[54%] md:max-w-xl lg:max-w-2xl"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600 mb-6 md:mb-8 text-center md:text-left">
            Hello, I&apos;m Omar
          </h1>

          {/* Portrait — mobile only (still gets the gradient ring, no rotation) */}
          <div className="mb-8 flex justify-center items-center w-full md:hidden">
            <div className="hero-portrait-ring hero-portrait-ring--static w-[140px] h-[140px]">
              <Image
                src={HERO_PORTRAIT}
                alt="Omar Hamid portrait"
                width={140}
                height={140}
                className="rounded-full object-cover w-full h-full bg-[#121212]"
                priority
              />
            </div>
          </div>

          <div className="w-full mb-8 md:mb-10" style={{ minHeight: "56px", height: "56px" }}>
            <div className="flex justify-center md:justify-start w-full">
              <TypeAnimation
                sequence={typeSequence}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-xl md:text-3xl font-extrabold text-white"
                style={{ minHeight: "56px", display: "inline-block" }}
              />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.6 }}
            className="text-[#ADB7BE] text-base md:text-lg font-medium max-w-md mt-6 mb-10 text-center md:text-left"
          >
            Crafting exceptional mobile experiences with Kotlin and Swift.<br />
            Passionate about clean architecture, robust engineering, and delightful UI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-col md:flex-row gap-4 w-full justify-center md:justify-start"
          >
            <a
              href="#contact"
              className="w-full md:w-auto px-6 py-3 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 text-white text-base font-semibold shadow-md shadow-primary-500/30 hover:scale-105 transition-all duration-200 text-center"
            >
              Let&apos;s Connect
            </a>
            <a
              href="#projects"
              className="w-full md:w-auto px-6 py-3 rounded-full border border-primary-400 text-white text-base font-semibold bg-transparent hover:bg-primary-700/20 hover:border-primary-500 transition-all duration-200 text-center"
            >
              View Projects
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — desktop portrait (static ring, no parallax) */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden md:flex justify-center w-full md:w-1/2 md:max-w-[40%] relative"
        >
          <div className="hero-portrait-ring hero-portrait-ring--static w-[230px] h-[230px]">
            <Image
              src={HERO_PORTRAIT}
              alt="Omar Hamid portrait"
              width={230}
              height={230}
              className="rounded-full object-cover w-full h-full bg-[#121212]"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
