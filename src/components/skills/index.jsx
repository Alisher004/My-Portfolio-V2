import React from "react";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaGithub, FaBootstrap } from "react-icons/fa";
import "./Skills.css";

const iconMapping = {
  html5: <FaHtml5 />,
  css3: <FaCss3Alt />,
  javascript: <FaJsSquare />,
  react: <FaReact />,
  github: <FaGithub />,
  bootstrap: <FaBootstrap />,
};

// Көндүмдөр массиви
const skillsData = [
  { name: "HTML", level: "50%", icon: "html5", color: "#e44d26" },
  { name: "CSS", level: "50%", icon: "css3", color: "#264de4" },
  { name: "JavaScript", level: "50%", icon: "javascript", color: "#f7df1e" },
  { name: "React", level: "50%", icon: "react", color: "#61dbfb" },
  { name: "GitHub", level: "50%", icon: "github", color: "#ffffff" },
  { name: "Bootstrap", level: "50%", icon: "bootstrap", color: "#6c27d3" },
];

const Skills = () => {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="s">Менин көндүмдөрүм</h2>
        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="icon" style={{ color: skill.color, fontSize: "3rem" }}>
                {iconMapping[skill.icon]} {/* Иконка экранда көрүнө тургандай кылып */}
              </div>
              <h3>{skill.name}</h3>
              <p>{skill.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
