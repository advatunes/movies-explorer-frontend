import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Main() {
  return (
    <main className='content'>
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
