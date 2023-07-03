import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../utils/auth.js';
import useValidation from '../../utils/useValidation';

function Register() {
  const { values, setValues, error, onChangeValue, resetValidation, formValid } = useValidation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    resetValidation();
  }, []);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    register(values.email, values.password, values.name)
      .then((res) => {
        if (res !== undefined) {
          navigate('/signin', { replace: true });
        }
        setShowNotification(false);
      })
      .catch((err) => {
        console.log(err);
        setShowNotification(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className='register'>
      <Link to='/' className='register__logo navigation__logo' href='#'></Link>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <div className='register__container'>
        <form className='register__form' name='register' noValidate onSubmit={handleSubmit}>
          <div className='register__form-group'>
            <p className='register__label'>Имя</p>
            <input
              className='register__input'
              type='text'
              name='name'
              placeholder='Введите ваше имя'
              value={values.name || ''}
              onChange={onChangeValue}
              minLength='2'
              maxLength='30'
              disabled={isSubmitting}
              required
            />
            <span className='input__error input__error-visible'>{error.name || ''}</span>
          </div>

          <div className='register__form-group'>
            <p className='register__label'>E-mail</p>
            <input
              className='register__input'
              type='email'
              name='email'
              onChange={onChangeValue}
              value={values.email || ''}
              placeholder='Введите ваш email'
              disabled={isSubmitting}
              required
            />
            <span className='input__error input__error-visible'>{error.email || ''}</span>
          </div>

          <div className='register__form-group'>
            <p className='register__label'>Пароль</p>
            <input
              className='register__input'
              type='password'
              placeholder='Введите ваш пароль'
              name='password'
              value={values.password || ''}
              onChange={onChangeValue}
              minLength='8'
              disabled={isSubmitting}
              required
            />
            <span className='input__error input__error-visible'> {error.password || ''}</span>
          </div>

          {showNotification ? <p className='notification'>Произошла ошибка</p> : ''}

          <div className='register__buttons'>
            <button
              className={`register__button button-orange ${
                !formValid ? 'profile__button_disabled' : ''
              }`}
              type='submit'
              aria-label='Зарегистрироваться'
              disabled={!formValid || isSubmitting}
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
        <p className='register__text'>
          Уже зарегистрированы?{' '}
          <Link to='/signin' className='register__link'>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
