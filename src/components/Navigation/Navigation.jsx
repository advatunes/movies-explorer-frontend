import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='navigation'>
      <div className={`overlay ${isMenuOpen ? 'overlay_visible' : ''}`}></div>
      <a className='navigation__logo' href='#'></a>
      <div className='navigation__films'>
        <a href='#' className='navigation__link'>
          Фильмы
        </a>
        <a href='http://localhost:3000/' className='navigation__link navigation__link_fw400'>
          Сохранённые фильмы
        </a>
      </div>
      <div className='navigation__account'>
        <Link to='/profile' className='navigation__link navigation__link-account'>
          Аккаунт
        </Link>
        <Link to='/profile' className='navigation__link navigation__link-icon'> </Link>
        <button
          className='navigation__link navigation__link-burger'
          onClick={handleBurgerClick}
        ></button>
      </div>

      <div className={`burger-menu ${isMenuOpen ? 'burger-menu_open' : ''}`}>
        <button className='burger-menu__close' onClick={handleBurgerClick}></button>

        <div className='burger-menu__content'>
          <nav className='burger-menu__links'>
            <a href='#' className='burger-menu__link'>
              Главная
            </a>
            <a href='#' className='burger-menu__link'>
              Фильмы
            </a>
            <a href='http://localhost:3000/' className='burger-menu__link'>
              Сохранённые фильмы
            </a>
          </nav>
          <div className='navigation__account navigation__account_burger'>
            <a
              href='#'
              className='navigation__link navigation__link-account navigation__link-account_burger'
            >
              Аккаунт
            </a>
            <a
              href='#'
              className='navigation__link navigation__link-icon navigation__link-icon_burger'
            ></a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
