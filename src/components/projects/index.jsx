import React, { useState } from "react";
import "./Project.css";
import { projects, hiddenProjects } from "../../data/Projects"; 

function Projects() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="project" className="section projects">
      <div className="container">
        <h2>Долбоорлор</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <img src={project.img} alt={project.title} className="project-img" />
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <ul>
                <li>
                  Технологиялар: <strong>{project.tech}</strong>
                </li>
              </ul>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="button">
                Долбоорду көрүү
              </a>
            </div>
          ))}
        </div>

        {showMore && (
          <div className="projects-grid">
            {hiddenProjects.map((project) => (
              <div key={project.id} className="project-card">
                <img src={project.img} alt={project.title} className="project-img" />
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <ul>
                  <li>
                    Технологиялар: <strong>{project.tech}</strong>
                  </li>
                </ul>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="button">
                  Долбоорду көрүү
                </a>
              </div>
            ))}
          </div>
        )}

        <button onClick={() => setShowMore(!showMore)} className="toggle-button">
          {showMore ? "Аз көрсөтүү" : "Көбүрөөк көрүү"}
        </button>
      </div>
    </section>
  );
}

export default Projects;
