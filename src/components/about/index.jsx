import React from "react";
import "./About.css";

function About() {
  const imgRef = React.useRef(null);
  const imgWrapRef = React.useRef(null);

  React.useEffect(() => {
    const wrap = imgWrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotateY = dx * 10; // left/right
      const rotateX = -dy * 10; // up/down
      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const onLeave = () => {
      img.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };

    wrap.addEventListener("mousemove", onMove, { passive: true });
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  React.useEffect(() => {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15 });

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about">
      <h2>About me</h2>
      <div className="info-about container about-card">
        <div className="block1 about-text slide-in-left" style={{"--d":"120ms"}}>
          <p className="p">
          Hello Im <b>Talipjanov Alisher Manasovich.</b> I am a front-end web developer. For me, creating websites is the best way to combine creativity with technology. My goal is to showcase myself in this field, create user-friendly and aesthetically pleasing web applications, and expand my experience. In my 6 months of experience, I have worked with technologies such as JavaScript, React, GitHub, and TypeScript. Besides coding, I enjoy participating in creative projects, designing, and learning new technologies. In my personal life, I love playing the guitar.

          </p>
        </div>
        <div ref={imgWrapRef} className="block2 about-image slide-in-right" style={{"--d":"260ms"}}>
          <img ref={imgRef} src="/icon.svg" alt="photo" />
        </div>
      </div>
    </section>
  );
}

export default About;
