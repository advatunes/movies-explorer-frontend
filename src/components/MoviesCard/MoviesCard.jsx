function MoviesCard({ link, title, duration }) {
  return (
    <article className='card'>
      <div className='card__wrap'>
        <h2 className='card__title'>{title}</h2>
        <p className='card__movie-duration'>{duration}</p>
      </div>

      <img className='card__image' src={link} alt='card' />
      <button className='card__like'></button>
    </article>
  );
}

export default MoviesCard;
