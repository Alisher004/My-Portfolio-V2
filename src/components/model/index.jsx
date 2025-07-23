import React, { useState, useEffect } from "react";
import "./Modal.css";
import { FaCode, FaUser, FaCoffee } from "react-icons/fa";

function Modal() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`modal ${isVisible ? "modal-in" : "modal-out"}`}>
      <div className="modal-content">
        <div className="icons">
          <FaCode size={40} />
          <FaUser size={40} />
          <FaCoffee size={40} />
        </div>
        <h1>
          <span className="white-text fade-in delay-1">Welcome To My</span>
        </h1>
        <h1>
          <span className="purple-text fade-in delay-2">Portfolio </span>
          <span className="purple-light-text fade-in delay-3">Website</span>
        </h1>
      </div>
    </div>
  );
}

export default Modal;