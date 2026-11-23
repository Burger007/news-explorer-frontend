import { useEffect } from "react";
import "./Modal.css";

function Modal({ onClose, children }) {
  // Close on Escape; remove the listener when the modal closes
  useEffect(() => {
    function handleEscape(evt) {
      if (evt.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Close on a click on the dark area, not inside the white box
  function handleOverlayMouseDown(evt) {
    if (evt.target === evt.currentTarget) onClose();
  }

  return (
    <div className="modal" onMouseDown={handleOverlayMouseDown}>
      <div className="modal__container" role="dialog" aria-modal="true">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        />
        {children}
      </div>
    </div>
  );
}

export default Modal;
