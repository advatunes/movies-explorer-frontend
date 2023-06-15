import { Link } from 'react-router-dom';

function NavPromo() {
  return (
    <nav className='navigation-promo navigation'>
      <Link to='/' className='navigation-promo navigation__logo' href='#'></Link>
      <div className='navigation-promo__buttons'>
        <Link to='/signup' className='navigation-promo__link'>
          Регистрация
        </Link>
        <Link to='/signin' className='navigation-promo__link'>
          Войти
        </Link>
      </div>
    </nav>
  );
}

export default NavPromo;
