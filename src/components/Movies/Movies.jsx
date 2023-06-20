import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import { api } from '../../utils/MoviesApi';

function Movies() {
  const [cards, setCards] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {}, []);

  function handleSearch(searchValue) {
    setIsLoadingPage(true);
    setIsError(false);
    api
      .getInitialCards()
      .then((data) => {
        const filteredCards = data.filter((card) =>
          card.nameRU.toLowerCase().includes(searchValue.toLowerCase())
        );
        setCards(filteredCards);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoadingPage(false);
      });
  }

  return (
    <main className='movies'>
      <SearchForm onSearch={handleSearch} />

      {isLoadingPage ? (
        <Preloader />
      ) : isError ? (
        <p className='movies__text'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.
        </p>
      ) : cards.length === 0 ? (
        <p className='movies__text'>Ничего не найдено.</p>
      ) : (
        <MoviesCardList cards={cards} />
      )}
    </main>
  );
}

export default Movies;
