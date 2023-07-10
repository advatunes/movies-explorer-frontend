import { NavLink } from 'react-router-dom';

function AboutMe() {
  return (
    <div className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <nav className='portfolio__nav'>
        <NavLink
          to='https://github.com/advatunes/react-mesto-api-full-gha'
          className='portfolio__navlink'
          target='_blank'
        >
          <span className='portfolio__navlink-text'>Статичный сайт</span>
          <span className='portfolio__navlink-arrow'>&#8599;</span>
        </NavLink>
        <NavLink
          to='https://github.com/advatunes/russian-travel'
          className='portfolio__navlink'
          target='_blank'
        >
          <span className='portfolio__navlink-text'>Адаптивный сайт</span>
          <span className='portfolio__navlink-arrow'>&#8599;</span>
        </NavLink>
        <NavLink
          to='https://github.com/advatunes/how-to-learn'
          className='portfolio__navlink'
          target='_blank'
        >
          <span className='portfolio__navlink-text'>Одностраничное приложение</span>
          <span className='portfolio__navlink-arrow'>&#8599;</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default AboutMe;
