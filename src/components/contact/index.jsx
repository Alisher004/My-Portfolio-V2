import React, { useState, useEffect } from "react";
import {
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./ContactForm.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".slide-in-left, .slide-in-right"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus("Please fill in all fields..");
      return;
    }

    setStatus("Message sent!");
    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => {
      setStatus("");
    }, 3000);
  };

  return (
    <div id="contact" className="contact-section">
      <h2 className="contact-title">Contact Me</h2>
      <div className="contact-content">
        {/* Contact Form Card */}
        <div className="contact-card slide-in-left" style={{ "--d": "0ms" }}>
          <h3>Send Message</h3>
          <form
            action="https://formsubmit.co/alisermanasov00@gmail.com"
            method="POST"
            className="contact-form"
          >
            <input type="text" name="name" placeholder="Your Name" required />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea name="message" placeholder="Your Message" required />
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>

          {status && (
            <p
              className={`status-message ${
                status === "Билдирүү жөнөтүлдү!" ? "success" : "error"
              }`}
            >
              {status}
            </p>
          )}
        </div>

        {/* Contact Info Card */}
        <div className="contact-card slide-in-right" style={{ "--d": "120ms" }}>
          <h3>Get In Touch</h3>
          <div className="contact-info">
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div className="info-content2">
                <h4>Email</h4>
                <p>email@gmail.com</p>
              </div>
            </div>
            <div className="info-item">
              <FaPhone className="info-icon" />
              <div className="info-content2">
                <h4>Phone</h4>
                <p>+996 (XXX) XXX-XXX</p>
              </div>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div className="info-content2">
                <h4>Location</h4>
                <p>Bishkek, Kyrgyzstan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Card */}
        <div className="contact-card slide-in-left" style={{ "--d": "240ms" }}>
          <h3>Follow Me</h3>
          <div className="social-links">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/%D0%B0%D0%BB%D0%B8%D1%88%D0%B5%D1%80-%D0%BC%D0%B0%D0%BD%D0%B0%D1%81%D0%BE%D0%B2-79665032a/"
              className="social-item"
            >
              <FaLinkedin className="social-icon" />
              <span>LinkedIn</span>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/_manasovi4/"
              className="social-item"
            >
              <FaInstagram className="social-icon" />
              <span>Instagram</span>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Alisher004"
              className="social-item"
            >
              <FaGithub className="social-icon" />
              <span>GitHub</span>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/@%D0%90%D0%BB%D0%B8%D1%88%D0%B5%D1%80444"
              className="social-item"
            >
              <FaYoutube className="social-icon" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;