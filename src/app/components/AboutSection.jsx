"use client";
import React, { useTransition, useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import TabButton from "./TabButton";
import useEmblaCarousel from 'embla-carousel-react';
import { FaGraduationCap, FaUniversity, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Import skills data
import SKILLS_DATA from "../../data/skills";
// Custom carousel styles
import './custom-swiper.css';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1 },
};

const skillItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const SkillsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = Object.values(SKILLS_DATA);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1,
  });
  const [isPaused, setIsPaused] = useState(false);

  // For handling scale transitions
  const tweenNodes = useRef([]);
  const slideContainers = useRef([]);
  
  // Scale factor for transitions
  const SCALE_FACTOR = 0.2;

  // Track the current slide index
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Handle smooth scale transitions between slides
  const updateScaleStyling = useCallback(() => {
    if (!emblaApi || !tweenNodes.current.length) return;
    
    const scrollProgress = emblaApi.scrollProgress();
    const scrollSnapList = emblaApi.scrollSnapList();
    
    tweenNodes.current.forEach((node, index) => {
      // Calculate the scale based on distance from center
      let closestSnapIndex = 0;
      let closestDistance = 1;
      
      scrollSnapList.forEach((snap, snapIndex) => {
        let distance = Math.abs(scrollProgress - snap);
        
        // Handle loop transition when at the edges
        if (scrollProgress < 0.1 && snap > 0.9) {
          distance = Math.abs(1 + scrollProgress - snap);
        } else if (scrollProgress > 0.9 && snap < 0.1) {
          distance = Math.abs(scrollProgress - 1 - snap);
        }
        
        if (distance < closestDistance) {
          closestSnapIndex = snapIndex;
          closestDistance = distance;
        }
      });
      
      // Calculate scale value - larger when closer to center
      const isClosest = index === closestSnapIndex;
      const isNextOrPrev = 
        index === (closestSnapIndex + 1) % slides.length || 
        index === (closestSnapIndex - 1 + slides.length) % slides.length;
        
      let scale = 0.8;
      let opacity = 0.6;
      let blur = '1px';
      
      if (isClosest) {
        scale = 1;
        opacity = 1;
        blur = '0px';
      } else if (isNextOrPrev) {
        scale = 0.9;
        opacity = 0.7;
        blur = '0.5px';
      }
      
      // Apply styles
      if (node) {
        node.style.transform = `scale(${scale})`;
        node.style.opacity = opacity;
        node.style.filter = `blur(${blur})`;
        
        // Add appropriate z-index for stacking
        node.style.zIndex = isClosest ? 10 : 5;
      }
    });
  }, [emblaApi, slides.length]);

  // Navigation functions
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  // Initialize
  useEffect(() => {
    if (!emblaApi) return;

    // Set up the select event listener
    emblaApi.on('select', onSelect);
    
    // Collect all slide nodes for scale animation
    slideContainers.current = emblaApi.slideNodes();
    tweenNodes.current = slideContainers.current.map(slide => 
      slide.querySelector('.skill-card-container')
    );
    
    // Set up scroll listeners for smooth animations
    emblaApi.on('scroll', updateScaleStyling);
    emblaApi.on('reInit', updateScaleStyling);
    emblaApi.on('settle', updateScaleStyling);
    
    // Initial styling update
    updateScaleStyling();
    onSelect();
    
    return () => {
      // Cleanup listeners
      emblaApi.off('select', onSelect);
      emblaApi.off('scroll', updateScaleStyling);
      emblaApi.off('reInit', updateScaleStyling);
      emblaApi.off('settle', updateScaleStyling);
    };
  }, [emblaApi, onSelect, updateScaleStyling]);

  // Auto-play effect
  useEffect(() => {
    if (isPaused || !emblaApi) return;
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        scrollNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollNext, scrollPrev]);

  return (
    <div 
      className="skills-carousel-container relative py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Swipe animation indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          repeatDelay: 1
        }}
        className="absolute inset-x-0 flex justify-center items-center gap-3 top-0 z-10 bg-slate-900/60 py-1 px-3 w-max mx-auto rounded-full backdrop-blur-sm border border-indigo-500/20"
      >
        {/* Left arrow */}
        <motion.div
          animate={{ x: [-5, 0, -5] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut" 
          }}
          className="flex text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </motion.div>
        
        <span className="text-indigo-400 text-sm font-medium">Swipe</span>
        
        {/* Right arrow */}
        <motion.div 
          animate={{ x: [0, 5, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut" 
          }}
          className="flex text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Embla Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex py-10">
          {slides.map((category, index) => (
            <div key={index} className="embla-slide flex-[0_0_90%] md:flex-[0_0_40%] mx-2 sm:mx-4">
              <div className="skill-card-container w-full">
                <div className="skill-card bg-slate-800/80 p-4 sm:p-6 rounded-xl border border-slate-700 shadow-md transition-all duration-300 h-full w-full mx-auto section-style flex flex-col">
                  <div className="flex items-center mb-4">
                    <span className="w-10 h-10 flex items-center justify-center bg-slate-700/40 rounded-lg mr-3 text-white/70">
                      {category.icon}
                    </span>
                    <h4 className="text-xl font-semibold text-white">{category.title}</h4>
                  </div>
                  <div className="flex-grow space-y-3 overflow-y-auto">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        // CSS Grid with minmax(0,1fr) for the middle column is the
                        // bulletproof truncation pattern — the middle cell can shrink
                        // below its content's intrinsic width, so `truncate` actually
                        // clips long skill names without pushing the level pill off.
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto minmax(0, 1fr) auto",
                          alignItems: "center",
                          columnGap: "0.5rem",
                        }}
                        className="skill-item p-2 sm:p-3 rounded-lg bg-slate-700/80 border border-slate-700 backdrop-blur-sm w-full max-w-full overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 + idx * 0.1 }}
                        whileHover={{ y: -3, scale: 1.01 }}
                      >
                        <span className="text-lg sm:text-2xl opacity-90">{skill.icon}</span>
                        <span className="block truncate text-slate-100 font-medium text-sm sm:text-base">
                          {skill.name}
                        </span>
                        <span className="text-[10px] sm:text-xs bg-slate-700/30 text-slate-300 py-0.5 sm:py-1 px-1.5 sm:px-2 rounded-full font-medium border border-slate-600/30 whitespace-nowrap">
                          {skill.level}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="embla-controls controls-container flex justify-between items-center max-w-4xl mx-auto mt-8 px-8">
        <button 
          className="embla-prev text-blue-500 hover:text-blue-400 w-16 h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={scrollPrev}
          aria-label="Previous slide"
          style={{ 
            color: '#3b82f6',
            transition: 'all 0.3s cubic-bezier(0.2, 0.85, 0.4, 1)'
          }}
        >
          <FaChevronLeft className="text-4xl" />
        </button>
        
        {/* Pagination Indicators */}
        <div className="embla-dots flex flex-row items-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 md:w-2.5 md:h-2.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${index === currentSlide ? 'bg-blue-500 scale-110 shadow-sm shadow-blue-500/40' : 'bg-slate-600/50 hover:bg-slate-500/70'}`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          className="embla-next text-blue-500 hover:text-blue-400 w-16 h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={scrollNext}
          aria-label="Next slide"
          style={{ 
            color: '#3b82f6',
            transition: 'all 0.3s cubic-bezier(0.2, 0.85, 0.4, 1)'
          }}
        >
          <FaChevronRight className="text-4xl" />
        </button>
      </div>
    </div>
  );
};

const EducationCard = () => {
  return (
    <div className="education-section space-y-4 w-full">
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="education-card bg-gradient-to-br from-slate-800/90 to-blue-950/70 p-6 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-900/30 transition-all duration-300 w-full section-style hover:border-indigo-500/60 hover:shadow-indigo-500/20"
      >
        <div className="flex items-start mb-4">
          <span className="w-10 h-10 flex items-center justify-center bg-blue-500/20 rounded-lg mr-4 text-blue-400 mt-1">
            <FaGraduationCap className="text-2xl" />
          </span>
          <div className="flex-grow">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Computer Science</h3>
            <div className="flex items-center mt-2 text-slate-100">
              <FaUniversity className="mr-2 text-blue-400/70" />
              <span>AUL University - Beirut, Lebanon</span>
            </div>
            <p className="mt-3 text-slate-200 text-sm">
              My computer science education was where I mastered the core principles that enable me to solve complex architectural challenges today.
              I focused on the fundamentals of algorithms, software architecture, and systems design—the bedrock I now use to engineer scalable, high-performance mobile applications.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Software Architecture",
                "Algorithms & Data Structures",
                "Mobile Engineering",
                "Systems Design"
              ].map((subject, index) => (
                <motion.span 
                  key={index}
                  variants={skillItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-xs bg-blue-500/10 text-blue-300 py-1 px-2 rounded-full font-medium border border-blue-500/20"
                >
                  {subject}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ============================================================
   SkillsBento — desktop layout
   Clean, uniform 2×2 grid. Every card has the same anatomy
   (header + vertical skill list) so the section reads as a
   coherent unit. Each category gets its own accent color, and
   the headline (Mobile) carries a small "Primary" badge.
   ============================================================ */

const ACCENT_PRESETS = {
  indigo:  { glow: "from-indigo-500/30 to-blue-500/10",     chip: "text-indigo-300 border-indigo-500/30 bg-indigo-500/10",   bar: "from-indigo-500 to-blue-500",     hover: "hover:border-indigo-500/40" },
  violet:  { glow: "from-violet-500/30 to-fuchsia-500/10",  chip: "text-violet-300 border-violet-500/30 bg-violet-500/10",   bar: "from-violet-500 to-fuchsia-500",  hover: "hover:border-violet-500/40" },
  emerald: { glow: "from-emerald-500/30 to-teal-500/10",    chip: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10", bar: "from-emerald-500 to-teal-500",    hover: "hover:border-emerald-500/40" },
  amber:   { glow: "from-amber-500/30 to-orange-500/10",    chip: "text-amber-300 border-amber-500/30 bg-amber-500/10",      bar: "from-amber-500 to-orange-500",    hover: "hover:border-amber-500/40" },
};

const SkillsCard = ({ category, accent = "indigo", featured = false, delay = 0 }) => {
  const a = ACCENT_PRESETS[accent] ?? ACCENT_PRESETS.indigo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={`relative group h-full flex flex-col rounded-2xl border border-slate-700/60 bg-slate-900/70 backdrop-blur-sm overflow-hidden transition-all duration-300 ${a.hover} hover:shadow-lg hover:shadow-slate-900/40`}
    >
      {/* Top accent bar */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${a.bar} opacity-80`} />

      {/* Decorative glow in the corner */}
      <div className={`pointer-events-none absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${a.glow} blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-500`} />

      <div className="relative z-10 p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <span className="w-11 h-11 flex items-center justify-center bg-slate-800/80 border border-slate-700/60 rounded-xl text-white shrink-0">
            {category.icon}
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="text-lg font-semibold text-white tracking-tight truncate">
              {category.title}
            </h4>
            {featured && (
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-0.5">
                Primary focus
              </p>
            )}
          </div>
        </div>

        {/* Skills list — same row anatomy in every card */}
        <ul className="space-y-2.5 flex-1">
          {category.skills.map((skill, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-800/70 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800 transition-colors"
            >
              <span className="text-xl shrink-0">{skill.icon}</span>
              <span className="text-slate-100 font-medium text-sm flex-1 min-w-0 truncate">
                {skill.name}
              </span>
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border whitespace-nowrap ${a.chip}`}>
                {skill.level}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const SkillsBento = () => {
  const cards = [
    { data: SKILLS_DATA.mobile,  accent: "indigo",  featured: true  },
    { data: SKILLS_DATA.backend, accent: "violet",  featured: false },
    { data: SKILLS_DATA.devOps,  accent: "emerald", featured: false },
    { data: SKILLS_DATA.methods, accent: "amber",   featured: false },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
      {cards.map((c, i) => (
        <SkillsCard
          key={c.data.title}
          category={c.data}
          accent={c.accent}
          featured={c.featured}
          delay={i * 0.08}
        />
      ))}
    </div>
  );
};

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <div className="skills-section space-y-8 mt-2 w-full overflow-visible pb-10 md:pb-12">
        {/* Mobile keeps the catchy carousel; desktop gets the bento grid */}
        <div className="md:hidden">
          <SkillsCarousel />
        </div>
        <div className="hidden md:block">
          <SkillsBento />
        </div>
      </div>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: <EducationCard />,
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="section-style section-shell" id="about">
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
              <h2>About Me</h2>
              <p>
                For over <span className="text-primary-400 font-semibold">10 years</span>, my passion has been crafting <span className="text-secondary-400 font-semibold">high-quality mobile experiences</span> as a Senior Mobile Engineer.
              </p>
            </motion.div>
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Key specialties with visual enhancements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-slate-900/80 to-slate-800/40 p-6 rounded-xl border border-slate-700/40 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-300 group shadow-md"
                >
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary-400 transition-colors duration-300 flex items-center">
                    <span className="text-primary-500 mr-2 text-2xl">⟡</span>
                    Mobile Specialist
                  </h3>
                  <p className="text-slate-300">
                    I specialize in the <span className="font-semibold text-primary-300">Kotlin</span> ecosystem, building scalable applications for <span className="font-semibold text-violet-300">Android</span> (Jetpack Compose) and <span className="font-semibold text-blue-300">iOS</span> (SwiftUI).
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-slate-900/80 to-slate-800/40 p-6 rounded-xl border border-slate-700/40 backdrop-blur-sm hover:border-secondary-500/30 transition-all duration-300 group shadow-md"
                >
                  <h3 className="text-xl font-bold mb-3 group-hover:text-secondary-400 transition-colors duration-300 flex items-center">
                    <span className="text-secondary-500 mr-2 text-2xl">⟡</span>
                    Full-Stack Approach
                  </h3>
                  <p className="text-slate-300">
                    I believe in <span className="font-semibold text-secondary-300">end-to-end ownership</span>, architecting solutions that span the entire mobile stack with <span className="font-semibold text-green-300">Kotlin Multiplatform</span>.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-slate-900/80 to-slate-800/40 p-6 rounded-xl border border-slate-700/40 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 group shadow-md"
                >
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <span className="text-blue-500 mr-2 text-2xl">⟡</span>
                    Backend Development
                  </h3>
                  <p className="text-slate-300">
                    I develop robust backend APIs using <span className="font-semibold text-teal-300">Ktor</span> and <span className="font-semibold text-green-300">Spring Boot</span> to support modern mobile applications.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-slate-900/80 to-slate-800/40 p-6 rounded-xl border border-slate-700/40 backdrop-blur-sm hover:border-violet-500/30 transition-all duration-300 group shadow-md"
                >
                  <h3 className="text-xl font-bold mb-3 group-hover:text-violet-400 transition-colors duration-300 flex items-center">
                    <span className="text-violet-500 mr-2 text-2xl">⟡</span>
                    Team Leadership
                  </h3>
                  <p className="text-slate-300">
                    As a <span className="font-semibold text-amber-300">Scrum Master</span> and <span className="font-semibold text-rose-300">Delivery Manager</span>, I foster a culture of continuous improvement for successful project outcomes.
                  </p>
                </motion.div>
              </div>
            </div>
            <div className="flex flex-row justify-center mt-8 mb-4">
              {TAB_DATA.map((tabItem) => (
                <TabButton
                  key={tabItem.id}
                  selectTab={() => handleTabChange(tabItem.id)}
                  active={tab === tabItem.id}
                >
                  {tabItem.title}
                </TabButton>
              ))}
            </div>
            <motion.div 
              key={tab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 w-full flex justify-center"
            >
              {TAB_DATA.find((t) => t.id === tab).content}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
