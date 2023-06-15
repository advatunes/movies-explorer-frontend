import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from "../Portfolio/Portfolio"
import Header from '../Header/Header';

function Main() {
  return (

    <main className='content'>
        {/* <Header /> */}
      <div className='container container-blue'>
        <Promo />
      </div>
      <div className='container'>
        <AboutProject />
      </div>
      <div className='container container-gray'>
        <Techs />
      </div>
      <div className='container '>
        <AboutMe />
      </div>
      <div className='container '>
        <Portfolio />
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
