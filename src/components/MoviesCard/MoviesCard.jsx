import image from '../../images/card-img.jpg';

function MoviesCard() {
  return (
    <article className='card'>
      <div className='card__wrap'>
        <h2 className='card__title'>В погоне за Бенкси</h2>
        <p className='card__movie-duration'>27 минут</p>
      </div>

      <img className='card__image' src={image} alt='card' />
      <button className='card__like'></button>
    </article>
  );
}

export default MoviesCard;
