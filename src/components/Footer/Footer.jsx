function Footer() {
  function getYear() {
    const today = new Date();
    return today.getFullYear();
  }
  return (
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__link-wrap'>
        <p className='footer__year'>© {getYear()} </p>
        <div className='footer__links'>
          <a href='https://practicum.yandex.ru/' className='footer_link'>
            Яндекс.Практикум
          </a>
          <a href='https://github.com/Yandex-Practicum' className='footer_link'>
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
