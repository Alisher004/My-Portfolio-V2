import React from "react";
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJsSquare, 
  FaReact, 
  FaGithub, 
  FaBootstrap,
  FaGitAlt,
  FaNodeJs,
  FaPython,
  FaSass
} from "react-icons/fa";
import { 
  SiRedux, 
  SiTypescript, 
  SiFirebase 
} from "react-icons/si";
import "./Skills.css";

const iconMapping = {
  html5: <FaHtml5 />,
  css3: <FaCss3Alt />,
  javascript: <FaJsSquare />,
  react: <FaReact />,
  github: <FaGithub />,
  bootstrap: <FaBootstrap />,
  redux: <SiRedux />,
  typescript: <SiTypescript />,
  sass: <FaSass />,
  git: <FaGitAlt />,
  firebase: <SiFirebase />,
  nodejs: <FaNodeJs />,
  python: <FaPython />,
};

// Көндүмдөр массиви
const skillsData = [
  { name: "HTML", level: "95%", icon: "html5", color: "#e44d26" },
  { name: "CSS", level: "95%", icon: "css3", color: "#264de4" },
  { name: "JavaScript", level: "80%", icon: "javascript", color: "#f7df1e" },
  { name: "React", level: "70%", icon: "react", color: "#61dbfb" },
  { name: "Redux Toolkit", level: "60%", icon: "redux", color: "#764abc" },
  { name: "TypeScript", level: "50%", icon: "typescript", color: "#3178c6" },
  { name: "Sass", level: "45%", icon: "sass", color: "#cc6699" },
  { name: "Git", level: "60%", icon: "git", color: "#f05032" },
  { name: "GitHub", level: "80%", icon: "github", color: "#ffffff" },
  { name: "Firebase", level: "30%", icon: "firebase", color: "#ffca28" },
  { name: "Node.js", level: "10%", icon: "nodejs", color: "#68a063" },
  { name: "Python", level: "10%", icon: "python", color: "#3776ab" },
  { name: "Bootstrap", level: "80%", icon: "bootstrap", color: "#6c27d3" },
];

const Skills = () => {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="s">My Skills</h2>
        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="icon" style={{ color: skill.color, fontSize: "3rem" }}>
                {iconMapping[skill.icon]} {/* Иконка экранда көрүнө тургандай кылып */}
              </div>
              <h3>{skill.name}</h3>
              <div className="skill-level">
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ 
                      width: skill.level, 
                      backgroundColor: skill.color 
                    }}
                  ></div>
                </div>
                <p>{skill.level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
