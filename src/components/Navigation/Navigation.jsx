import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='navigation'>
      <div className={`overlay ${isMenuOpen ? 'overlay_visible' : ''}`}></div>
      <Link to='/' className='navigation__logo' href='#'></Link>
      <div className='navigation__films'>
        <Link to='/movies' href='#' className='navigation__link'>
          Фильмы
        </Link>
        <Link to='/saved-movies' className='navigation__link navigation__link_fw400  '>
          Сохранённые фильмы
        </Link>
      </div>
      <div className='navigation__account'>
        <Link to='/profile' className='navigation__link navigation__link-account'>
          Аккаунт
        </Link>
        <Link to='/profile' className='navigation__link navigation__link-icon'></Link>
        <button
          className='navigation__link navigation__link-burger'
          onClick={handleBurgerClick}
        ></button>
      </div>

      <div className={`burger-menu ${isMenuOpen ? 'burger-menu_open' : ''}`}>
        <button className='burger-menu__close' onClick={handleBurgerClick}></button>

        <div className='burger-menu__content'>
          <nav className='burger-menu__links'>
            <Link to='/' className='burger-menu__link' onClick={handleBurgerClick}>
              Главная
            </Link>

            <Link
              to='/movies'
              className={`burger-menu__link ${
                location.pathname === '/movies' ? 'navigation__link_underline' : ''
              }`}
              onClick={handleBurgerClick}
            >
              Фильмы
            </Link>
            <Link to='/saved-movies'   className={`burger-menu__link ${
                location.pathname === '/saved-movies' ? 'navigation__link_underline' : ''
              }`} onClick={handleBurgerClick}>
              Сохранённые фильмы
            </Link>
          </nav>
          <div className='navigation__account navigation__account_burger'>
            <Link
              to='/profile'
              className='navigation__link navigation__link-account navigation__link-account_burger'
              onClick={handleBurgerClick}
            >
              Аккаунт
            </Link>
            <Link
              to='/profile'
              className='navigation__link navigation__link-icon navigation__link-icon_burger'
            ></Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
