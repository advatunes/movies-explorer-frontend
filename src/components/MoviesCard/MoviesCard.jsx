import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function MoviesCard({
  card,
  link,
  title,
  duration,
  trailerLink,
  savedCards,
  isLiked,
  isSavedMovies,
  onCardDelete,
  onCardLike,
}) {
  const isCardLiked = savedCards.some((savedCard) => savedCard.movieId === card.id);

  function handleDeleteClick() {
    return onCardDelete(card);
  }
  function handleLikeClick() {
    return onCardLike(card);
  }

  return (
    <article className='card'>
      <Link to={trailerLink} className='card__link' target='_blank'>
        <div className='card__wrap'>
          <h2 className='card__title'>{title}</h2>
          <p className='card__movie-duration'>{duration}</p>
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
          } else if (!isCardLiked) {
            handleLikeClick();
          }
        }}
      ></button>
    </article>
  );
}

export default MoviesCard;
