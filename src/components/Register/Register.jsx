import { Link } from 'react-router-dom';

function Register() {
    return (
      <div className='register'>
        <a className='register__logo navigation__logo' href='#'></a>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <div className='register__container'>
        <form className='register__form' name='register'>
          <div className='register__form-group'>
            <p className='register__label'>Имя</p>
            <input className='register__input' />
            <span class="input__error ">Что-то пошло не так.</span>

          </div>

          <div className='register__form-group'>
            <p className='register__label'>E-mail</p>
            <input className='register__input' />
            <span class="input__error input__error-visible ">Что-то пошло не так</span>
          </div>
          <div className='register__form-group'>
            <p className='register__label'>Пароль</p>
            <input className='register__input' />
            <span class="input__error input__error-visible">Что-то пошло не так.</span>
          </div>
          <div className='register__buttons'>


            <button
              className='register__button button-orange'
              type='button'
              aria-label='Выйти из аккаунта'
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
        <p className='register__text'>
        Уже зарегистрированы?
        <Link to='/signin' className='register__link'>
          Войти
        </Link>
      </p>
      </div>
    </div>
    );
  }

  export default Register;
