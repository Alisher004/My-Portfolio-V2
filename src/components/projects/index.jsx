import React, { useState, useEffect } from "react";
import "./Project.css";
import { projects, hiddenProjects } from "../../data/Projects"; 
import { Link } from "react-router-dom";

function Projects() {
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.15 });

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showMore]);

  return (
    <section id="project" className="section projects">
      <div className="container">
        <h2>Projects</h2>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`project-card ${idx % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}
              style={{"--d": `${idx * 120}ms`}}
            >
              <div className="project-media">
                <img src={project.img} alt={project.title} className="project-img" />
              </div>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <ul>
                <li>
                  Technologies: <strong>{project.tech}</strong>
                </li>
              </ul>
              <div className="button-row">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  View Project
                </a>
                <Link to={`/projects/${project.id}`} className="button secondary">
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {showMore && (
          <div className="projects-grid">
            {hiddenProjects.map((project, idx) => (
              <div
                key={project.id}
                className={`project-card ${(projects.length + idx) % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}
                style={{"--d": `${(projects.length + idx) * 120}ms`}}
              >
                <div className="project-media">
                  <img src={project.img} alt={project.title} className="project-img" />
                </div>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <ul>
                  <li>
                    Technologies: <strong>{project.tech}</strong>
                  </li>
                </ul>
                <div className="button-row">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                  >
                    View Project
                  </a>
                  <Link to={`/projects/${project.id}`} className="button secondary">
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {hiddenProjects.length > 0 && (
          <button
            type="button"
            aria-expanded={showMore}
            onClick={() => setShowMore(!showMore)}
            className="toggle-button"
          >
            {showMore ? "▲ Show Less" : "▼ More"}
          </button>
        )}
      </div>
    </section>
  );
}

export default Projects;