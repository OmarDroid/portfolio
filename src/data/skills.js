// Skills data used in the AboutSection component

import { FaDocker, FaGithub, FaGraduationCap, FaUniversity } from "react-icons/fa";
import { SiKotlin, SiSwift, SiSpringboot, SiFastlane } from "react-icons/si";
import { TbBrandKotlin } from "react-icons/tb";
import { BiGitBranch } from "react-icons/bi";
import { GrTest } from "react-icons/gr";
import { MdSpeed, MdAutoFixHigh, MdSecurity, MdOutlinePhoneIphone } from "react-icons/md";
import { BsGearFill, BsFillKanbanFill, BsCodeSquare } from "react-icons/bs";
import { AiOutlineApi } from "react-icons/ai";

const SKILLS_DATA = {
  mobile: {
    title: "Mobile Development",
    icon: <MdOutlinePhoneIphone className="text-xl" />,
    iconBgColor: "indigo",
    iconTextColor: "indigo",
    titleGradient: "from-indigo-400 to-blue-400",
    borderHoverColor: "indigo",
    textHoverColor: "indigo",
    badgeBgColor: "indigo",
    badgeTextColor: "indigo",
    badgeBorderColor: "indigo",
    skills: [
      { 
        name: "Kotlin & Jetpack Compose", 
        level: "Expert", 
        icon: <SiKotlin className="text-[#7F52FF]" />
      },
      { 
        name: "Swift & SwiftUI", 
        level: "Proficient", 
        icon: <SiSwift className="text-[#F05138]" />
      },
      { 
        name: "KMP/CMP (Multiplatform)", 
        level: "Advanced", 
        icon: <TbBrandKotlin className="text-[#7F52FF]" />
      }
    ]
  },
  backend: {
    title: "Backend Development",
    icon: <BsGearFill className="text-lg" />,
    iconBgColor: "violet",
    iconTextColor: "violet",
    titleGradient: "from-violet-400 to-purple-400",
    borderHoverColor: "violet",
    textHoverColor: "violet",
    badgeBgColor: "violet",
    badgeTextColor: "violet",
    badgeBorderColor: "violet",
    skills: [
      { 
        name: "Spring Boot", 
        level: "Proficient", 
        icon: <SiSpringboot className="text-[#6DB33F]" />
      },
      { 
        name: "Ktor", 
        level: "Proficient", 
        icon: <TbBrandKotlin className="text-[#7F52FF]" />
      },
      { 
        name: "RESTful APIs", 
        level: "Expert", 
        icon: <AiOutlineApi className="text-[#3498DB]" />
      }
    ]
  },
  devOps: {
    title: "DevOps & CI/CD",
    icon: <FaGithub className="text-lg" />,
    iconBgColor: "emerald",
    iconTextColor: "emerald",
    titleGradient: "from-emerald-400 to-teal-400",
    borderHoverColor: "emerald",
    textHoverColor: "emerald",
    badgeBgColor: "emerald",
    badgeTextColor: "emerald",
    badgeBorderColor: "emerald",
    skills: [
      { 
        name: "CI/CD Pipelines", 
        level: "Expert", 
        icon: <BiGitBranch className="text-[#F05033]" />
      },
      { 
        name: "FastLane", 
        level: "Advanced", 
        icon: <SiFastlane className="text-[#00F200]" />
      },
      { 
        name: "Automated Testing", 
        level: "Expert", 
        icon: <GrTest className="text-[#C21325]" />
      },
      { 
        name: "Docker", 
        level: "Expert", 
        icon: <FaDocker className="text-[#2496ED]" />
      }
    ]
  },
  methods: {
    title: "Methods & Practices",
    icon: <BsFillKanbanFill className="text-lg" />,
    iconBgColor: "amber",
    iconTextColor: "amber",
    titleGradient: "from-amber-400 to-yellow-400",
    borderHoverColor: "amber",
    textHoverColor: "amber",
    badgeBgColor: "amber",
    badgeTextColor: "amber",
    badgeBorderColor: "amber",
    skills: [
      { 
        name: "Agile/Scrum", 
        level: "Expert", 
        icon: <BsFillKanbanFill className="text-[#FF9900]" />
      },
      { 
        name: "Code Review & QA",
        level: "Expert", 
        icon: <BsCodeSquare className="text-[#E44D26]" />
      },
      { 
        name: "Performance Optimization", 
        level: "Advanced", 
        icon: <MdSpeed className="text-[#4CAF50]" />
      },
      { 
        name: "Security Best Practices", 
        level: "Proficient", 
        icon: <MdSecurity className="text-[#F44336]" />
      }
    ]
  }
};

export default SKILLS_DATA;