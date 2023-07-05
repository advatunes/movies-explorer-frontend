import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='navigation'>
      <div className={`overlay ${isMenuOpen ? 'overlay_visible' : ''}`}></div>
      <NavLink to='/' className='navigation__logo' href='#'></NavLink>
      <div className='navigation__films'>
        <NavLink
          to='/movies'
          className={({ isActive }) =>
            isActive ? 'navigation__link ' : 'navigation__link navigation__link_fw400'
          }
        >
          Фильмы
        </NavLink>
        <NavLink
          to='/saved-movies'
          className={({ isActive }) =>
            isActive ? 'navigation__link ' : 'navigation__link navigation__link_fw400'
          }
        >
          Сохранённые фильмы
        </NavLink>
      </div>
      <div className='navigation__account'>
        <NavLink to='/profile' className='navigation__link navigation__link-account'>
          Аккаунт
        </NavLink>
        <NavLink to='/profile' className='navigation__link navigation__link-icon'></NavLink>
        <button
          className='navigation__link navigation__link-burger'
          onClick={handleBurgerClick}
        ></button>
      </div>

      <div className={`burger-menu ${isMenuOpen ? 'burger-menu_open' : ''}`}>
        <button className='burger-menu__close' onClick={handleBurgerClick}></button>

        <div className='burger-menu__content'>
          <nav className='burger-menu__links'>
            <NavLink to='/' className='burger-menu__link' onClick={handleBurgerClick}>
              Главная
            </NavLink>

            <NavLink
              to='/movies'
              className={({ isActive }) =>
                isActive ? 'burger-menu__link navigation__link_underline' : 'burger-menu__link '
              }
              onClick={handleBurgerClick}
            >
              Фильмы
            </NavLink>
            <NavLink
              to='/saved-movies'
              className={({ isActive }) =>
                isActive ? 'burger-menu__link navigation__link_underline' : 'burger-menu__link '
              }
              onClick={handleBurgerClick}
            >
              Сохранённые фильмы
            </NavLink>
          </nav>
          <div className='navigation__account navigation__account_burger'>
            <NavLink
              to='/profile'
              className='navigation__link navigation__link-account navigation__link-account_burger'
              onClick={handleBurgerClick}
            >
              Аккаунт
            </NavLink>
            <NavLink
              to='/profile'
              className='navigation__link navigation__link-icon navigation__link-icon_burger'
            ></NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
