import photo from '../../images/photo.jpg';

function AboutMe() {
  return (
    <section className="portfolio">
      <h2 className='portfolio__title'>Портфолио</h2>
      <nav className='portfolio__nav'>
      <a className='portfolio__navlink' href="#">
        <p className='portfolio__navlink-text'>Статичный сайт</p>
        <p className='portfolio__navlink-arrow'>&#8599;</p>
      </a>
      <a className='portfolio__navlink' href="#">
        <p className='portfolio__navlink-text'>Адаптивный сайт</p>
        <p className='portfolio__navlink-arrow'>&#8599;</p>
      </a>
      <a className='portfolio__navlink' href="#">
        <p className='portfolio__navlink-text'>Одностраничное приложение</p>
        <p className='portfolio__navlink-arrow'>&#8599;</p>
      </a>
      </nav>
    </section>
  );
}

export default AboutMe;
