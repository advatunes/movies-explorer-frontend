import promo__logo from '../../images/header-logo-bg.png';

function Promo() {
  return (
    <div className='promo'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <img className='promo__logo' alt='promo logo' src={promo__logo}></img>
    </div>
  );
}

export default Promo;
