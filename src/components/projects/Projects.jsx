import { useEffect, useRef, useState } from "react";
import "./Projects.css";

import { projects } from "../../data/projectData";
import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const projectsRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    let tempProjects = projects;

    if (activeFilter !== "All") {
      tempProjects = tempProjects.filter(
        (project) => project.category === activeFilter
      );
    }

    if (searchTerm.trim() !== "") {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      tempProjects = tempProjects.filter((project) => {
        const titleMatch = project.title
          .toLowerCase()
          .includes(lowerCaseSearchTerm);
        const techMatch = project.tech.some((t) =>
          t.toLowerCase().includes(lowerCaseSearchTerm)
        );
        return titleMatch || techMatch;
      });
    }
    setFilteredProjects(tempProjects);
  }, [activeFilter, searchTerm, projects]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "var(--success-color)";
      case "In Progress":
        return "var(--warning-color)";
      case "Planning":
        return "var(--info-color)";
      case "Research":
        return "var(--secondary-color)";
      default:
        return "var(--text-secondary)";
    }
  };

  const categoryDisplayNames = {
    "Web Development": "Web Dev",
    "Mobile Development": "Mobile Dev",
    "Machine Learning": "ML",
    "Data Science": "Data Science",
    "Full-Stack": "Full-Stack",
    Blockchain: "Blockchain",
    All: "All",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Projects</h2>
          <p className="section-subtitle">
            Showcasing the innovative solutions we've built together
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
          <input
            type="text"
            placeholder="Search by title or tech..."
            className="w-full md:w-72 bg-gray-900/50 border border-cyan-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex flex-wrap justify-center gap-4">
            {["All", ...new Set(projects.map((p) => p.category))].map(
              (category) => (
                <button
                  key={category}
                  className={`px-3 py-2 rounded-md font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? "bg-cyan-500 text-gray-900 shadow-lg shadow-cyan-500/20"
                      : "bg-gray-900/50 text-gray-400 hover:bg-gray-800/70 hover:text-cyan-400"
                  }`}
                  onClick={() => setActiveFilter(category)}
                >
                  {categoryDisplayNames[category] || category}
                </button>
              )
            )}
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <motion.div
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeFilter + searchTerm}
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  getStatusColor={getStatusColor}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-16 px-6">
            <p className="text-4xl mb-4">🤷‍♂️</p>
            <h3 className="text-2xl font-bold text-white mb-2">
              No Projects Found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
