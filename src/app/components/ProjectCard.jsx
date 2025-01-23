import React from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, previewUrl }) => {
  return (
    <div className="group bg-[#181818] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Project image */}
      <div
        className="relative h-56 md:h-72 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        {/* Overlay with EyeIcon */}
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <Link
            href={previewUrl}
            target="_blank"
            className="flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full border-2 border-gray-500 hover:border-white transition-all"
          >
            <EyeIcon className="w-8 h-8 text-gray-400 hover:text-white" />
          </Link>
        </div>
      </div>

      {/* Project description */}
      <div className="p-4 bg-[#181818]">
        <h5 className="text-xl font-semibold text-white mb-2">{title}</h5>
        <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
