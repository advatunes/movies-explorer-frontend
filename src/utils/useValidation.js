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
    


    if (name === 'email') {
      setError((errors) => ({
        ...errors,
        [name]: validator.isEmail(value) ? error : 'Некорректный адрес электронной почты',
      }));
      setFormValid(formValid && validator.isEmail(value));
<<<<<<< HEAD


=======
      
     
>>>>>>> level-3
    } else {
      setError((errors) => ({ ...errors, [name]: error }));
      const formValid = e.target.form.checkValidity();
      setFormValid(formValid  );
<<<<<<< HEAD

=======
   
>>>>>>> level-3
    }

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
