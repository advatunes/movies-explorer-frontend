import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../utils/auth.js';
import useValidation from '../../utils/useValidation';

function Login({ setEmail, loggedIn, validateToken }) {
  const { values, setValues, error, onChangeValue, resetValidation, formValid } = useValidation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);

  if (loggedIn) {
    navigate('/movies', { state: { location }, replace: true });
  }

  useEffect(() => {
    resetValidation();
  }, []);

  function authorization() {
    login(values.email, values.password)
      .then((data) => {
        if (data.token) {
          setEmail(values.email);
          localStorage.setItem('jwt', data.token);
          validateToken();
          navigate('/movies', { state: { location }, replace: true });
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        setShowNotification(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);
    authorization();
  }

  return (
    <div className='login'>
      <Link to='/' className='login__logo navigation__logo'></Link>
      <h2 className='login__title'>Рады видеть!</h2>
      <div className='login__container'>
        <form
          className='login__form'
          name='login'
          onSubmit={handleSubmit}
          noValidate
          isDisabled={!formValid}
        >
          <div className='login__form-group'>
            <p className='login__label'>E-mail</p>
            <input
              className='login__input'
              type='email'
              placeholder='Введите ваш email'
              name='email'
              value={values.email || ''}
              onChange={onChangeValue}
              disabled={isSubmitting}
              required
            />
            <span className='input__error input__error-visible'>{error.email || ''}</span>
          </div>
          <div className='login__form-group'>
            <p className='login__label'>Пароль</p>
            <input
              className='login__input'
              type='password'
              name='password'
              placeholder='Введите ваш пароль'
              onChange={onChangeValue}
              value={values.password || ''}
              minLength='8'
              disabled={isSubmitting}
              required
            />

            <span className='input__error input__error-visible'>{error.password || ''}</span>
          </div>

          {showNotification ? <p className='notification'>Произошла ошибка</p> : ''}

          <div className='login__buttons'>
            <button
              className={`login__button button-orange ${
                !formValid ? 'profile__button_disabled' : ''
              }`}
              type='submit'
              aria-label='Войти в аккаунт'
              disabled={!formValid || isSubmitting}
            >
              Войти
            </button>
          </div>
        </form>
        <p className='login__text'>
          Ещё не зарегистрированы?{' '}
          <Link to='/signup' className='login__link'>
            Регистрация
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
