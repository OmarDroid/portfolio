"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaMediumM, FaEnvelope } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineGlobe } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer is the canonical social block. Email sits inline with the others —
  // it's a real way to reach me, not a "scroll up" shortcut.
  const socialLinks = [
    { icon: <FaGithub />,     url: "https://github.com/OmarDroid",            label: "GitHub",   external: true  },
    { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/andomaroid/", label: "LinkedIn", external: true  },
    { icon: <FaMediumM />,    url: "https://omaroid.medium.com/",             label: "Medium",   external: true  },
    { icon: <FaEnvelope />,   url: "mailto:omar.hamid@gmx.net",               label: "Email omar.hamid@gmx.net", external: false },
  ];
  
  return (
    <footer className="relative z-20 bg-[#0d0d0d] text-white w-full max-w-full overflow-hidden">
      {/* Keep the blue line on top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] w-full bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-40"></div>
      
      <div className="w-full pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Logo and social media section - keeping intact */}
            <div className="flex flex-col w-full md:w-auto">
              <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-600 mb-3 inline-block">
                Omar Hamid
              </Link>
              <p className="text-gray-400 mt-2 max-w-xs">
                Senior Mobile Engineer specializing in Kotlin and Swift development, creating exceptional mobile experiences.
              </p>
              
              {/* Social media links — email lives inline with the others */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    title={link.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800 text-gray-300 hover:text-white hover:bg-slate-700 transition-all duration-300"
                    whileHover={{ y: -3 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Location section - left aligned but right side on desktop */}
            <div className="w-full md:w-auto md:self-center md:ml-auto">
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center bg-slate-800/50 rounded-full pl-2 pr-4 py-1.5 mb-3 border border-slate-700/30">
                  <HiOutlineLocationMarker className="text-primary-400 text-xl mr-2" />
                  <span className="text-gray-300">Munich, Germany</span>
                </div>
                
                <div className="flex items-center bg-slate-800/50 rounded-full pl-2 pr-4 py-1.5 border border-slate-700/30">
                  <HiOutlineGlobe className="text-primary-400 text-xl mr-2" />
                  <span className="text-gray-300">Remote worldwide</span>
                </div>
                
                <div className="mt-4 text-left">
                  <p className="text-gray-500 text-sm italic">
                    "Crafting exceptional mobile experiences"
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Simple copyright section */}
          <div className="border-t border-gray-800/30 pt-5 mt-6 text-center w-full">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} <span className="text-gray-400">Omar Hamid</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
