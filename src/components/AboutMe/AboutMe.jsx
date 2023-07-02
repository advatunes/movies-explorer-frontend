import photo from '../../images/photo.jpg';

function AboutMe() {
  return (
    <div className='about-me'>
      <h2 className='about-me__title title'>Студент</h2>
      <div className='about-me__wrap'>
        <div className='about-me__text-block'>
          <p className='about-me__name'>Дмитрий</p>
          <p className='about-me__prof'>Фронтенд-разработчик, 31 год</p>
          <p className='about-me__descr'>
            Студент Яндекс Практикума. Выбрал фронтэнд, в нем сразу видишь результат своей работы.
            Совмещаю учебу с работой Люблю учиться и узнавать что-то новое, хочу сменить профессию и
            развиваться в этой сфере. Проходил курсы по JS на Stepik. Решаю задачи на codewars.com В
            свободное время занимаюсь написанием электронной музыки
          </p>
          <a className='about-me__link' href='https://github.com/advatunes' target='_blank'>
            Github
          </a>
        </div>

        <img className='about-me__image' src={photo} alt='my photo' />
      </div>
    </div>
  );
}

export default AboutMe;
