import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function MoviesCard({
  card,
  link,
  title,
  duration,
  trailerLink,
  savedCards,
  isSavedMovies,
  onCardDelete,
  onCardLike,
}) {

  const isCardLiked = savedCards.some((savedCard) => savedCard.movieId === card.id);

  function convertTime(minutes) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;

    if (hours === 0) {
      return remainingMinutes + ' м';
    }

    return hours + ' ч ' + remainingMinutes + ' м';
  }

  function handleDeleteClick() {
    return onCardDelete(card);
  }

  function handleLikeClick() {
    isCardLiked
      ? onCardDelete(savedCards.filter((savedCard) => savedCard.movieId === card.id)[0])
      : onCardLike(card);
  }

  return (
    <article className='card'>
      <Link to={trailerLink} className='card__link' target='_blank'>
        <div className='card__wrap'>
          <h2 className='card__title'>{title}</h2>
          <p className='card__movie-duration'>{convertTime(duration)}</p>
        </div>

        <img className='card__image' src={link} alt={title} />
      </Link>

      <button
        className={` card__like ${isCardLiked ? 'card__like_active' : ''} ${
          isSavedMovies ? 'card__like_dislike' : ''
        }`}
        onClick={() => {
          if (isSavedMovies) {
            handleDeleteClick();
          } else {
            handleLikeClick();
          }
        }}
      ></button>
    </article>
  );
}

export default MoviesCard;
