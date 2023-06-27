import MoviesCard from '../MoviesCard/MoviesCard';

import { api } from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';

function MoviesCardList({cards, savedCards,handleAddToSavedCards, isSavedMovies,onCardDelete }) {
  // const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(0);
  const movieUrl = 'https://api.nomoreparties.co/';
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    const handleResize = () => {
      setTimeout(() => {
        if (window.innerWidth >= 900) {
          setVisibleCards(12)
        } else if (window.innerWidth >= 568) {
          setVisibleCards(8)
        } else {
          setVisibleCards(5)
        }

      }, 200);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  function handleLoadMore()  {
    setVisibleCards(visibleCards + ( window.innerWidth >= 900 ? 3 : 2));
  };

  const displayedCards = isSavedMovies ? cards : cards.slice(0, visibleCards);
console.log(isSavedMovies);
  return (
    <section className='cardlist'>

        <div className='cardlist__wrap'>
          {displayedCards.map((card)  => (
            <MoviesCard
              key={isSavedMovies ? card._id: card.id }
              card={card}
              link={isSavedMovies ? card.image : movieUrl + card.image.url}
              image={movieUrl + card.image.url}
              title={card.nameRU}
              duration={card.duration}
              trailerLink={card.trailerLink}
              savedCards={savedCards}
              handleAddToSavedCards={handleAddToSavedCards}
              isSavedMovies={isSavedMovies}
              onCardDelete={onCardDelete}
            />
          ))}
        </div>

      {visibleCards < cards.length && (
        <button className='cardlist__button' onClick={handleLoadMore}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
