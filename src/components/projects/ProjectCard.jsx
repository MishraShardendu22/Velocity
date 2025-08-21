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
      <div className="project-image">
        <span className="project-emoji">{project.image}</span>
        <div
          className="project-status"
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
        <Link to={`/project/${projectSlug}`} className="project-link">
          View Project →
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
