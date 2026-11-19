import { useState } from "react";

function getErrorMessage(input) {
  if (input.validity.valueMissing) return "This field is required";
  if (input.validity.typeMismatch) return "Invalid email address";
  if (input.validity.tooShort)
    return `Must be at least ${input.minLength} characters`;
  return input.validationMessage;
}

export function useFormWithValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const input = evt.target;
    setValues((prev) => ({ ...prev, [input.name]: input.value }));
    setErrors((prev) => ({ ...prev, [input.name]: getErrorMessage(input) }));
    setIsValid(input.closest("form").checkValidity());
  }

  return { values, errors, isValid, handleChange };
}
