import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function LoginModal({ onClose, onLogin, onSwitch, submitError }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation({
    email: "",
    password: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }

  return (
    <ModalWithForm
      title="Sign in"
      name="login"
      buttonText="Sign in"
      isSubmitDisabled={!isValid}
      submitError={submitError}
      onClose={onClose}
      onSubmit={handleSubmit}
      switchText="Sign up"
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
    </ModalWithForm>
  );
}
export default LoginModal;
