import React, { useState } from "react";
import "./PictureModal.css";

const PictureModal = ({ imgSrc }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="picture-container">
      <div className="image-wrapper" onClick={handleOpen}>
        <img
          className={`image ${open ? "large" : ""}`}
          src="/ser.png"
          alt="Example"
        />
        {!open && (
          <div className="overlay">
            <div className="hover-content">
              <i className="fas fa-search-plus"></i>
              <p>View Full Image</p>
            </div>
          </div>
        )}
      </div>

      {open && (
        <div className="modal modal-in" role="dialog" aria-modal="true" aria-label="Image preview" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="Close" onClick={handleClose}>×</button>
            <img
              className="modal-image"
              src="/ser.png"
              alt="Full size"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PictureModal;
