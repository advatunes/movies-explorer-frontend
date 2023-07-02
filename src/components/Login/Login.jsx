import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {login} from '../../utils/auth.js'
import useValidation from '../../utils/useValidation';

function Login({ setFormValue, setEmail, handleLogin }) {
  const { values, setValues, error, onChangeValue, resetValidation } = useValidation();

  const navigate = useNavigate();

  useEffect(() => {
    resetValidation();
  }, []);


  function handleSubmit(e) {
    e.preventDefault();
    login(values.email, values.password)
      .then((data) => {
        if (data.token) {
          setEmail(values.email);
          localStorage.setItem('jwt', data.token);
          setFormValue({ username: '', password: '' });
          handleLogin();
          navigate('/movies', { replace: true });
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='login'>
      <Link to='/' className='login__logo navigation__logo'></Link>
      <h2 className='login__title'>Рады видеть!</h2>
      <div className='login__container'>
        <form className='login__form' name='login' onSubmit={handleSubmit} noValidate>
          <div className='login__form-group'>
            <p className='login__label'>E-mail</p>
            <input
              className='login__input'
              type='email'
              placeholder='Введите ваш email'
              name='email'
              onChange={onChangeValue}
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
              minLength='8'
              required
            />
            <span className='input__error input__error-visible'>{error.password || ''}</span>
          </div>
          <div className='login__buttons'>
            <button
              className='login__button button-orange'
              type='submit'
              aria-label='Войти в аккаунт'
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
