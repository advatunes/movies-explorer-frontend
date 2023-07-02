import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Main() {
  return (
    <main className='content'>
      <section className='container container-blue'>
        <Promo />
      </section>
      <section className='container'>
        <AboutProject />
      </section>
      <section className='container container-gray'>
        <Techs />
      </section>
      <section className='container'>
        <AboutMe />
      </section>
      <section className='container'>
        <Portfolio />
      </section>
    </main>
  );
}

export default Main;
