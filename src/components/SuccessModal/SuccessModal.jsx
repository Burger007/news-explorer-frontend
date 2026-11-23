import Modal from "../Modal/Modal";
import "./SuccessModal.css";

function SuccessModal({ onClose, onSignInClick }) {
  return (
    <Modal onClose={onClose}>
      <h2 className="success-modal__title"> Registration completed!</h2>
      <button
        type="button"
        className="success-modal__link"
        onClick={onSignInClick}
      >
        Sign in
      </button>
    </Modal>
  );
}
export default SuccessModal;
