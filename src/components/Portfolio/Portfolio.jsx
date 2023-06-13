function AboutMe() {
  return (
    <section className="portfolio">
      <h2 className='portfolio__title'>Портфолио</h2>
      <nav className='portfolio__nav'>
      <a className='portfolio__navlink' href="#">
        <span className='portfolio__navlink-text'>Статичный сайт</span>
        <span className='portfolio__navlink-arrow'>&#8599;</span>
      </a>
      <a className='portfolio__navlink' href="#">
        <span className='portfolio__navlink-text'>Адаптивный сайт</span>
        <span className='portfolio__navlink-arrow'>&#8599;</span>
      </a>
      <a className='portfolio__navlink' href="#">
        <span className='portfolio__navlink-text'>Одностраничное приложение</span>
        <span className='portfolio__navlink-arrow'>&#8599;</span>
      </a>
      </nav>
    </section>
  );
}

export default AboutMe;
