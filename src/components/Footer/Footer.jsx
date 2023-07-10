import React from 'react';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();

  function getYear() {
    const today = new Date();
    return today.getFullYear();
  }

  const isFooterVisible =
    location.pathname !== '/profile' &&
    location.pathname !== '/signup' &&
    location.pathname !== '/signin';

  if (!isFooterVisible) {
    return null;
  }

  return (
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__link-wrap'>
        <p className='footer__year'>© {getYear()} </p>
        <div className='footer__links'>
          <a href='https://practicum.yandex.ru/' className='footer_link' target='_blank'>
            Яндекс.Практикум
          </a>
          <a href='https://github.com/Yandex-Practicum' className='footer_link' target='_blank'>
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
