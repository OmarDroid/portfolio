import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * Animation variants for the underline effect
 */
const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};

/**
 * TabButton Component
 * 
 * A button component for tab navigation with an animated underline effect
 * when active. Used for switching between different content sections.
 * 
 * @param {boolean} active - Whether this tab is currently selected
 * @param {function} selectTab - Callback function when tab is clicked
 * @param {React.ReactNode} children - The content/label of the tab button
 */
const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active ? "text-white" : "text-[#ADB7BE]";

  return (
    <button onClick={selectTab} className="relative">
      <p className={`mr-3 font-semibold hover:text-white transition-colors duration-200 ${buttonClasses}`}>
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className="h-1 bg-primary-500 mt-2 mr-3"
        transition={{ duration: 0.3 }}
      ></motion.div>
    </button>
  );
};

// PropTypes validation
TabButton.propTypes = {
  active: PropTypes.bool.isRequired,
  selectTab: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default TabButton;
