import { api } from '../../utils/MainApi';
import { useEffect } from 'react';

function MoviesCard({
  card,
  link,
  title,
  duration,
  trailerLink,
  savedCards,
  handleAddToSavedCards,
}) {
  function likeMovie() {
    api
      .saveMovie(card)
      .then((data) => {
        handleAddToSavedCards(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <article className='card'>
      <a className='card__link' href={trailerLink} target='_blank'>
        <div className='card__wrap'>
          <h2 className='card__title'>{title}</h2>
          <p className='card__movie-duration'>{duration}</p>
        </div>

        <img className='card__image' src={link} alt='card' />
      </a>
      <button
        className={`card__like`}
        // className={`card__like  ${isSavedMovies ? 'card__like_dislike' : ''}`}
        onClick={() => likeMovie(card)}
      ></button>
    </article>
  );
}

export default MoviesCard;
