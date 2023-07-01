import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { api } from '../../utils/MainApi';

function SavedMovies({
  savedCards,
  setSavedCards,
  isLoadingPage,
  isError,
  shortFilms,
  setShortFilms,

  onCardDelete,
  onCardLike,
}) {
  // const [cards, setCards] = useState([]);

  // const [isSavedMovies, setIsSavedMovies] = useState(true);
  const isSavedMovies = true;
  const [originalCards, setOriginalCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    api
      .getMovies()
      .then((data) => {
        setSavedCards(data);
        setOriginalCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (shortFilms) {
      setSavedCards(savedCards.filter((card) => card.duration <= 40));
    } else {
      setSavedCards(filteredCards);
    }
  }, [shortFilms]);

  function handleSearchSavedMovies(searchValue) {
    setFilteredCards(originalCards.filter(
      (card) =>
        card.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
        card.nameEN.toLowerCase().includes(searchValue.toLowerCase())
    ))

    setSavedCards(filteredCards);
  }

  return (
    <main className='movies'>
      <SearchForm onSearch={handleSearchSavedMovies} setShortFilms={setShortFilms} />

      {isLoadingPage ? (
        <Preloader />
      ) : isError ? (
        <p className='movies__text'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.
        </p>
      ) : savedCards.length === 0 ? (
        <p className='movies__text'>Ничего не найдено.</p>
      ) : (
        <MoviesCardList
          cards={savedCards}
          savedCards={savedCards}
          isSavedMovies={isSavedMovies}
          onCardDelete={onCardDelete}
          onCardLike={onCardLike}
        />
      )}
    </main>
  );
}

export default SavedMovies;
