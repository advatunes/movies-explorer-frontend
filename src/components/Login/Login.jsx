import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Auth from '../../utils/Auth';

function Login({ setLoggedIn, formValue, onChange, setFormValue, setEmail }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      Auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.email);
            setLoggedIn(true);
            navigate('/movies', { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }



  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValue;
    Auth.login(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          localStorage.setItem('jwt', data.token);
          setFormValue({ username: '', password: '' });
          navigate('/movies', { replace: true });
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='login'>
      <Link to='/' className='login__logo navigation__logo' href='#'></Link>
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
              onChange={onChange}
              required
            />
            <span className='input__error'>Что-то пошло не так</span>
          </div>
          <div className='login__form-group'>
            <p className='login__label'>Пароль</p>
            <input
              className='login__input'
              type='password'
              name='password'
              placeholder='Введите ваш пароль'
              onChange={onChange}
              required
            />
            <span className='input__error'>Что-то пошло не так.</span>
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
