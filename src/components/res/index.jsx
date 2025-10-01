import React, { useEffect } from "react";
import "./Resume.css";

function Resume() {
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
  }, []);

  return (
    <div id="resume" className="resume-section">
      <h2 className="resume-title">Resume</h2>
      <div className="resume-content">
        {/* Personal Information Card */}
        <div className="resume-card slide-in-left" style={{"--d": "0ms"}}>
          <h3>Personal Information</h3>
          <div className="resume-item">
            <strong>Name:</strong> Talipjanov Alisher Manasovich
          </div>
          <div className="resume-item">
            <strong>Position:</strong> Frontend Developer
          </div>
          <div className="resume-item">
            <strong>Experience:</strong> 6 months
          </div>
          <div className="resume-item">
            <strong>Location:</strong> Kyrgyzstan, Bishkek
          </div>
          <div className="resume-item">
            <strong>Email:</strong> alisermanasov00@gmail.com
          </div>
          <div className="resume-item">
            <strong>Phone:</strong> +996 (XXX) XXX-XXX
          </div>
        </div>

        {/* Skills Card */}
        <div className="resume-card slide-in-right" style={{"--d": "120ms"}}>
          <h3>Technical Skills</h3>
          <div className="skills-list">
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">React</span>
            <span className="skill-tag">TypeScript</span>
            <span className="skill-tag">HTML5</span>
            <span className="skill-tag">CSS3</span>
            <span className="skill-tag">GitHub</span>
            <span className="skill-tag">Responsive Design</span>
            <span className="skill-tag">Node.js</span>
            <span className="skill-tag">MongoDB</span>
            <span className="skill-tag">Express.js</span>
          </div>
        </div>

        {/* Experience Card */}
        <div className="resume-card slide-in-left" style={{"--d": "240ms"}}>
          <h3>Professional Experience</h3>
          <div className="experience-item">
            <h4>Frontend Developer</h4>
            <p><strong>Duration:</strong> 6 months</p>
            <p>Developed user-friendly and aesthetically pleasing web applications. Focused on combining creativity with technology to deliver innovative solutions. Worked on multiple projects including portfolio websites, e-commerce platforms, and interactive web applications.</p>
          </div>
          <div className="experience-item">
            <h4>Freelance Web Developer</h4>
            <p><strong>Duration:</strong> 3 months</p>
            <p>Created custom websites for small businesses and individuals. Specialized in responsive design and modern web technologies.</p>
          </div>
        </div>

        {/* Education Card */}
        <div className="resume-card slide-in-right" style={{"--d": "360ms"}}>
          <h3>Education</h3>
          <div className="education-item">
            <h4>Computer Science</h4>
            <p>Kyrgyz National University</p>
            <p>2020 - 2024</p>
          </div>
          <div className="education-item">
            <h4>Web Development Bootcamp</h4>
            <p>Online Course Platform</p>
            <p>2023 - 2024</p>
          </div>
        </div>

        {/* Languages Card */}
        <div className="resume-card slide-in-left" style={{"--d": "480ms"}}>
          <h3>Languages</h3>
          <div className="languages-list">
            <div className="language-item">🇰🇬 Kyrgyz - Native</div>
            <div className="language-item">🇷🇺 Russian - Fluent</div>
            <div className="language-item">🇺🇸 English - Intermediate</div>
            <div className="language-item">🇹🇷 Turkish - Basic</div>
          </div>
        </div>

        {/* Interests & Hobbies Card */}
        <div className="resume-card slide-in-right" style={{"--d": "600ms"}}>
          <h3>Interests & Hobbies</h3>
          <div className="interests-list">
            <div className="interest-item">🎸 Playing Guitar</div>
            <div className="interest-item">🎨 Creative Design</div>
            <div className="interest-item">💻 Learning New Technologies</div>
            <div className="interest-item">🚀 Innovative Projects</div>
            <div className="interest-item">📚 Reading Tech Blogs</div>
            <div className="interest-item">🏃‍♂️ Fitness & Sports</div>
            <div className="interest-item">🎮 Gaming</div>
            <div className="interest-item">📸 Photography</div>
          </div>
        </div>

        {/* Projects Card */}
        <div className="resume-card slide-in-left" style={{"--d": "720ms"}}>
          <h3>Notable Projects</h3>
          <div className="experience-item">
            <h4>Personal Portfolio Website</h4>
            <p>Built a responsive portfolio website using React, featuring modern animations and interactive elements.</p>
          </div>
          <div className="experience-item">
            <h4>E-commerce Platform</h4>
            <p>Developed a full-stack e-commerce solution with React frontend and Node.js backend.</p>
          </div>
          <div className="experience-item">
            <h4>Task Management App</h4>
            <p>Created a collaborative task management application with real-time updates and user authentication.</p>
          </div>
        </div>

        {/* Certifications Card */}
        <div className="resume-card slide-in-right" style={{"--d": "840ms"}}>
          <h3>Certifications</h3>
          <div className="education-item">
            <h4>React Developer Certification</h4>
            <p>Meta Frontend Developer Certificate</p>
            <p>2024</p>
          </div>
          <div className="education-item">
            <h4>JavaScript Fundamentals</h4>
            <p>FreeCodeCamp Certification</p>
            <p>2023</p>
          </div>
          <div className="education-item">
            <h4>Web Development Bootcamp</h4>
            <p>Udemy Complete Web Development Course</p>
            <p>2023</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;