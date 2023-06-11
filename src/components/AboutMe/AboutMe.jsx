import photo from '../../images/photo.jpg';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title title'>Студент</h2>
      <div className='about__me__wrap'>
        <div className='about-me__text-block'>
          <p className='about-me__name'>Виталий</p>
          <p className='about-me__prof'>Фронтенд-разработчик, 30 лет</p>
          <p className='about-me__descr'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className='about-me__link' href='https://github.com/advatunes'>
            Github
          </a>
        </div>
        <img className='about-me__image' src={photo} alt='my photo' />
      </div>
    </section>
  );
}

export default AboutMe;
