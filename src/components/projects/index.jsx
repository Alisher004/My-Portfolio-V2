import React, { useState, useEffect } from "react";
import "./Project.css";
import { projects, hiddenProjects } from "../../data/Projects"; 

function Projects() {
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const cards = document.querySelectorAll('.project-card');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.15 });
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [showMore]);

  const onCardMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotateY = dx * 10; // left/right
    const rotateX = -dy * 10; // up/down
    el.style.setProperty('--rx', rotateX.toFixed(2) + 'deg');
    el.style.setProperty('--ry', rotateY.toFixed(2) + 'deg');
    // Shine position
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    el.style.setProperty('--mx', mx + 'px');
    el.style.setProperty('--my', my + 'px');
  };

  const onCardLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.removeProperty('--mx');
    el.style.removeProperty('--my');
  };

  return (
    <section id="project" className="section projects">
      <div className="container">
        <h2>Projects</h2>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="project-card"
              style={{"--stagger": `${idx * 90}ms`}}
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
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
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="button"
              >
                View Project
              </a>
            </div>
          ))}
        </div>

        {showMore && (
          <div className="projects-grid">
            {hiddenProjects.map((project, idx) => (
              <div
                key={project.id}
                className="project-card"
                style={{"--stagger": `${idx * 90}ms`}}
                onMouseMove={onCardMove}
                onMouseLeave={onCardLeave}
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
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  View Project
                </a>
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