import Modal from "../Modal/Modal";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  buttonText,
  isSubmitDisabled,
  submitError,
  onClose,
  onSubmit,
  switchText,
  onSwitch,
  children,
}) {
  return (
    <Modal onClose={onClose}>
      <h2 className="modal-form__title">{title}</h2>
      <form className="modal-form" name={name} onSubmit={onSubmit} noValidate>
        {children}
        <span className="modal-form__submit-error">{submitError}</span>
        <button
          type="submit"
          className="modal-form__submit"
          disabled={isSubmitDisabled}
        >
          {buttonText}
        </button>
      </form>
      <p className="modal-form__switch">
        or{" "}
        <button
          type="button"
          className="modal-form__switch-button"
          onClick={onSwitch}
        >
          {switchText}
        </button>
      </p>
    </Modal>
  );
}

export default ModalWithForm;
