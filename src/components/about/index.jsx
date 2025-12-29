import React, { useCallback, useRef } from "react";
import "./About.css";

function About() {
  const imgRef = useRef(null);
  const imgWrapRef = useRef(null);
  const animationRef = useRef(null);

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(() => {
      const wrap = imgWrapRef.current;
      const img = imgRef.current;
      if (!wrap || !img) return;

      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotateY = dx * 8; // Reduced intensity for smoother animation
      const rotateX = -dy * 8;
      
      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const img = imgRef.current;
    if (img) {
      img.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    }
  }, []);

  React.useEffect(() => {
    const wrap = imgWrapRef.current;
    if (!wrap) return;

    wrap.addEventListener("mousemove", handleMouseMove, { passive: true });
    wrap.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      wrap.removeEventListener("mousemove", handleMouseMove);
      wrap.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  React.useEffect(() => {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right');
    
    // Optimized Intersection Observer with better performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother animations
          requestAnimationFrame(() => {
            entry.target.classList.add('is-visible');
          });
        }
      });
    }, { 
      threshold: 0.1, // Reduced threshold for earlier trigger
      rootMargin: '50px 0px', // Trigger animations earlier
    });

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
          <img 
            ref={imgRef} 
            src="/icon.svg" 
            alt="photo"
            loading="lazy"
            style={{
              willChange: 'transform'
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default About;
