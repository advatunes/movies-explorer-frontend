import MoviesCard from '../MoviesCard/MoviesCard';

import { api } from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';

function MoviesCardList({cards, savedCards,handleAddToSavedCards }) {
  // const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(0);
  const url = 'https://api.nomoreparties.co/';
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


  return (
    <section className='cardlist'>

        <div className='cardlist__wrap'>
          {cards.slice(0, visibleCards).map((card) => (
            <MoviesCard
              key={card.link}
              card={card}
              link={url + card.image.url}
              title={card.nameRU}
              duration={card.duration}
              trailerLink={card.trailerLink}
              savedCards={savedCards}
              handleAddToSavedCards={handleAddToSavedCards}
              // isSavedMovies={isSavedMovies}
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
