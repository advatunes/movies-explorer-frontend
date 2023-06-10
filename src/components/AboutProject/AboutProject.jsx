function AboutProject() {
    return (
      <section className='about-project'>
        <h2 className='about-project__title'>О проекте</h2>
        <div className='about-project__content'>
          <div className='about-project__text-wrap'>
            <div className='about-project__text'>
              <p className='about-project__text-title'>Дипломный проект включал 5 этапов</p>
              <p className='about-project__text-paragraph'>
                Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
                финальные доработки.
              </p>
            </div>
            <div className='about-project__text'>
              <p className='about-project__text-title'>На выполнение диплома ушло 5 недель</p>
              <p className='about-project__text-paragraph'>
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
                успешно защититься.
              </p>
            </div>
          </div>

          <div className='about-project__graphic-wrap'>
            <p className='about-project__graphic-green'>1 неделя</p>
            <p className='about-project__graphic-gray'>4 недели</p>
          </div>

          <div className='about-project__graphic-wrap'>
            <p className='about-project__graphic-back'>Back-end</p>
            <p className='about-project__graphic-front'>Front-end</p>
          </div>
        </div>
      </section>
    );
  }

  export default AboutProject;
