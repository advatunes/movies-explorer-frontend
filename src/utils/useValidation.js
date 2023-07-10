import { useState } from 'react';
import validator from 'validator';

export default function useValidation() {
  const [values, setValues] = useState({});
  const [error, setError] = useState({});
  const [formValid, setFormValid] = useState(false);

  const resetValidation = () => {
    setError({});
  };
  function onChangeValue(e) {
    const { name, value } = e.target;
    const error = e.target.validationMessage;
    setError((errors) => ({ ...errors, [name]: error }));

    let isEmailValid = true;
    if (name === 'email') {
      isEmailValid = validator.isEmail(value);
      setError((errors) => ({ ...errors, email: isEmailValid ? '' : 'Некорректный адрес электронной почты' }));
    }

    const formValid = e.target.form.checkValidity() && isEmailValid;
    setFormValid(formValid);


    setValues((values) => ({ ...values, [name]: value }));
  }


  return {
    values,
    setValues,
    error,
    onChangeValue,
    resetValidation,
    formValid,
  };
}
