import React, { useState, useEffect } from "react";
import "./Modal.css";
import { FaCode, FaUser, FaCoffee } from "react-icons/fa";

function Modal({ onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Force hardware acceleration on iOS
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.style.webkitTransform = 'translateZ(0)';
      modal.style.transform = 'translateZ(0)';
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) return;
    const outTimer = setTimeout(() => {
      if (typeof onClose === "function") {
        onClose();
      }
    }, 500); // match .modal-out duration
    return () => clearTimeout(outTimer);
  }, [isVisible, onClose]);

  // Prevent iOS Safari from hiding the modal due to viewport issues
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <div className={`modal ${isVisible ? "modal-in" : "modal-out"}`}>
      <div className="modal-content">
        <div className="icons">
          <FaCode size={40}  className="icon1"/>
          <FaUser size={40} className="icon2"/>
          <FaCoffee size={40} className="icon3"/>
        </div>
        <h1>
          <span className="white-text fade-in delay-1">Welcome To My</span>
        </h1>
        <h1 className="modal-text">
          <span className="purple-text fade-in delay-2">Portfolio</span>
          <span className="purple-light-text fade-in delay-3">Website</span>
        </h1>
      </div>
    </div>
  );
}

export default Modal;