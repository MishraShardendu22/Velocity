import { useEffect, useRef, useState } from "react";
import "./Projects.css";

const Projects = () => {
  const projectsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.2 }
    );
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  const projects = [
    {
      title: "Community Platform",
      category: "Web Development",
      description:
        "A comprehensive platform for community management and collaboration",
      image: "🌐",
      tech: ["React", "Node.js", "MongoDB"],
      status: "Completed",
      link: "#",
    },
    {
      title: "Mobile App",
      category: "Mobile Development",
      description:
        "Cross-platform mobile application for seamless communication",
      image: "📱",
      tech: ["React Native", "Firebase", "TypeScript"],
      status: "In Progress",
      link: "#",
    },
    {
      title: "AI Chatbot",
      category: "Machine Learning",
      description: "Intelligent chatbot for automated community support",
      image: "🤖",
      tech: ["Python", "TensorFlow", "NLP"],
      status: "Completed",
      link: "#",
    },
    {
      title: "Data Analytics Dashboard",
      category: "Data Science",
      description: "Real-time analytics and insights for community growth",
      image: "📊",
      tech: ["Python", "D3.js", "PostgreSQL"],
      status: "Planning",
      link: "#",
    },
    {
      title: "Event Management System",
      category: "Full-Stack",
      description:
        "Complete solution for organizing and managing community events",
      image: "🎪",
      tech: ["Vue.js", "Express", "MySQL"],
      status: "Completed",
      link: "#",
    },
    {
      title: "Blockchain Integration",
      category: "Blockchain",
      description: "Decentralized identity and reward system for members",
      image: "⛓️",
      tech: ["Solidity", "Web3.js", "Ethereum"],
      status: "Research",
      link: "#",
    },
  ];

  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      const newFilteredProjects = projects.filter(
        (project) => project.category === activeFilter
      );
      setFilteredProjects(newFilteredProjects);
    }
  }, [activeFilter, projects]);

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

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Projects</h2>
          <p className="section-subtitle">
            Showcasing the innovative solutions we've built together
          </p>
        </div>
        <div className="filter-buttons">
          {["All", ...new Set(projects.map((p) => p.category))].map(
            (category) => (
              <button
                key={category}
                className={`filter-btn ${
                  activeFilter === category ? "active" : ""
                }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            )
          )}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              style={{ "--delay": `${index * 0.1}s` }}
            >
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
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={project.link} className="project-link">
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
