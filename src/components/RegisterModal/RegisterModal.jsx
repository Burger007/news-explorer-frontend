import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function RegisterModal({ onClose, onRegister, onSwitch, submitError }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation({
    email: "",
    password: "",
    name: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText="Sign up"
      isSubmitDisabled={!isValid}
      submitError={submitError}
      onClose={onClose}
      onSubmit={handleSubmit}
      switchText="Sign in"
      onSwitch={onSwitch}
    >
      <label className="modal-form__label">
        Email
        <input
          className="modal-form__input"
          type="email"
          name="email"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <span className="modal-form__error">{errors.email}</span>
      </label>
      <label className="modal-form__label">
        Password
        <input
          className="modal-form__input"
          type="password"
          name="password"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
          minLength="8"
          required
        />
        <span className="modal-form__error">{errors.password}</span>
      </label>
      <label className="modal-form__label">
        Username
        <input
          className="modal-form__input"
          type="text"
          name="name"
          placeholder="Enter your username"
          value={values.name}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span className="modal-form__error">{errors.name}</span>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
