import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';

import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
  CARDS_PER_MOBILE,
  CARDS_PER_TABLET,
  CARDS_PER_LOAD_DESKTOP,
  CARDS_PER_LOAD_MOBILE,
  MOVIE_API_URL,
} from '../../utils/constants';

function MoviesCardList({
  cards,
  savedCards,
  isSavedMovies,
  onCardDelete,
  onCardLike,
}) {
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        if (window.innerWidth >= TABLET_BREAKPOINT) {
          setVisibleCards(CARDS_PER_LOAD_DESKTOP);
        } else if (window.innerWidth >= MOBILE_BREAKPOINT) {
          setVisibleCards(CARDS_PER_TABLET);
        } else {
          setVisibleCards(CARDS_PER_MOBILE);
        }
      }, 200);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleLoadMore() {
    const perLoad =
      window.innerWidth >= TABLET_BREAKPOINT ? CARDS_PER_LOAD_DESKTOP : CARDS_PER_LOAD_MOBILE;
    setVisibleCards(visibleCards + perLoad);
  }

  const displayedCards = isSavedMovies ? cards : cards.slice(0, visibleCards);

  return (
    <section className='cardlist'>
      <div className='cardlist__wrap'>
        {displayedCards.map((card) => (
          <MoviesCard
            key={isSavedMovies ? card._id : card.id}
            card={card}
            isLiked={card.isLiked}
            link={isSavedMovies ? card.image : MOVIE_API_URL + card.image.url}
            image={MOVIE_API_URL + card.image.url}
            title={card.nameRU}
            duration={card.duration}
            trailerLink={card.trailerLink}
            savedCards={savedCards}
            onCardLike={onCardLike}
            isSavedMovies={isSavedMovies}
            onCardDelete={onCardDelete}
          />
        ))}
      </div>

      {!isSavedMovies && visibleCards < cards.length && (
        <button className='cardlist__button' onClick={handleLoadMore}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
