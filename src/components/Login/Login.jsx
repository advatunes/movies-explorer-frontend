import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='login'>
      <Link to='/' className='login__logo navigation__logo' href='#'></Link>
      <h2 className='login__title'>Рады видеть!</h2>
      <div className='login__container'>
        <form className='login__form' name='login'>
          <div className='login__form-group'>
            <p className='login__label'>E-mail</p>
            <input className='login__input' type='email' placeholder='Введите ваш email' required />
            <span className='input__error input__error-visible'>Что-то пошло не так</span>
          </div>
          <div className='login__form-group'>
            <p className='login__label'>Пароль</p>
            <input
              className='login__input'
              type='password'
              placeholder='Введите ваш пароль'
              required
            />
            <span className='input__error input__error-visible'>Что-то пошло не так.</span>
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
