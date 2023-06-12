function NavPromo() {
  return (
    <nav className='navigation-promo navigation'>
      <a className='navigation-promo__logo navigation__logo' href='#'></a>
      <div className='navigation-promo__buttons'>
        <a href='#' className='navigation-promo__link'>
          Регистрация
        </a>
        <a href='http://localhost:3000/movies' className='navigation-promo__link'>
          Войти
        </a>
      </div>
    </nav>
  );
}

export default NavPromo;
