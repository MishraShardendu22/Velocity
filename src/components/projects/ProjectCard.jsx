import React from "react";
import "./Projects.css";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaVuejs,
  FaEthereum,
} from "react-icons/fa";
import {
  SiMongodb,
  SiFirebase,
  SiTypescript,
  SiTensorflow,
  SiPostgresql,
  SiExpress,
  SiMysql,
  SiSolidity,
  SiD3Dotjs,
} from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const techIconMap = {
  React: <FaReact />,
  "Node.js": <FaNodeJs />,
  MongoDB: <SiMongodb />,
  "React Native": <FaReact />,
  Firebase: <SiFirebase />,
  TypeScript: <SiTypescript />,
  Python: <FaPython />,
  TensorFlow: <SiTensorflow />,
  NLP: null,
  "D3.js": <SiD3Dotjs />,
  PostgreSQL: <SiPostgresql />,
  "Vue.js": <FaVuejs />,
  Express: <SiExpress />,
  MySQL: <SiMysql />,
  Solidity: <SiSolidity />,
  "Web3.js": <TbWorldWww />,
  Ethereum: <FaEthereum />,
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const ProjectCard = ({ project, index, getStatusColor }) => {
  // Create a URL-friendly slug from the project title
  const projectSlug = project.title.toLowerCase().replace(/ /g, "-");
  return (
    <motion.div className="project-card" variants={cardVariants}>
      <div className="project-image relative h-32 flex items-center justify-center">
        <img
          src={project.image}
          alt={project.title}
          className="max-h-16 object-contain"
        />
        <div
          className="project-status absolute top-2 right-2 px-2 py-1 text-xs rounded text-white"
          style={{ backgroundColor: getStatusColor(project.status) }}
        >
          {project.status}
        </div>
      </div>
      <div className="project-content">
        <div className="project-category">{project.category}</div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.tech.map((tech) => (
            <span key={tech} className="tech-tag flex items-center gap-1.5">
              {techIconMap[tech]}
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-10">
          <Link
            to={project.link}
            className="project-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-6 h-6" />
          </Link>
          {project.hostedLink && (
            <Link
              to={project.hostedLink}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project →
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
