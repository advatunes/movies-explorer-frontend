import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';

function Main() {
  return (
    <main className='content'>
      <div className='container container-blue'>

        <Promo />
      </div>
      <div className='container'>
        <AboutProject />
      </div>
    </main>
  );
}

export default Main;

// Promo — компонент с вёрсткой баннера страницы «О проекте».
// NavTab — компонент с навигацией по странице «О проекте».
// AboutProject — компонент с описанием дипломного проекта.
// Techs — компонент с использованными технологиями.
// AboutMe — компонент с информацией о студенте.
// Portfolio — компонент со ссылками на другие проекты.
