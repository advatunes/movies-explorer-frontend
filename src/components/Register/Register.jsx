import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className='register'>
      <Link to='/' className='register__logo navigation__logo' href='#'></Link>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <div className='register__container'>
        <form className='register__form' name='register'>
          <div className='register__form-group'>
            <p className='register__label'>Имя</p>
            <input
              className='register__input'
              type='text'
              placeholder='Введите ваше имя'
              pattern='.{2,}'
              title='Минимальная длина имени: 2 символа'
              required
            />
            <span className='input__error'>Что-то пошло не так.</span>
          </div>

          <div className='register__form-group'>
            <p className='register__label'>E-mail</p>
            <input
              className='register__input'
              type='email'
              placeholder='Введите ваш email'
              required
            />
            <span className='input__error input__error-visible'>Что-то пошло не так</span>
          </div>

          <div className='register__form-group'>
            <p className='register__label'>Пароль</p>
            <input
              className='register__input'
              type='password'
              placeholder='Введите ваш пароль'
              minLength='6'
              required
            />
            <span className='input__error input__error-visible'>Что-то пошло не так.</span>
          </div>

          <div className='register__buttons'>
            <button
              className='register__button button-orange'
              type='submit'
              aria-label='Зарегистрироваться'
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
