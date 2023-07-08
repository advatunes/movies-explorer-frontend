import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { api } from '../../utils/MainApi';

import { SHORT_FILM_DURATION } from '../../utils/constants';

function SavedMovies({
  savedCards,
  isLoadingPage,
  isError,
  shortFilms,
  setShortFilms,
  onCardDelete,
  onCardLike,
  setSavedCards,
  isSavedMovies,
  onShortFilms,
}) {
  const [originalCards, setOriginalCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  const [searchValueSavedMovies, setSearchValueSavedMovies] = useState(
    localStorage.getItem('searchValueSavedMovies') || ''
  );

  useEffect(() => {
    api
      .getMovies()
      .then((cards) => {
        setSavedCards(cards);
        setOriginalCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (filteredCards.length !== 0 && shortFilms) {
      setSavedCards(filteredCards.filter((card) => card.duration <= SHORT_FILM_DURATION));
    } else if (filteredCards.length !== 0) {
      setSavedCards(filteredCards);
    } else {
      if (savedCards.length !== 0 && shortFilms) {
        setSavedCards(savedCards.filter((card) => card.duration <= SHORT_FILM_DURATION));
      } else if (savedCards.length !== 0) {
        setSavedCards(originalCards);
      }
    }
  }, [originalCards, shortFilms, filteredCards, setSavedCards]);

  function handleSearchSavedMovies(searchValue) {
    localStorage.setItem('searchValueSavedMovies', searchValue);
    const filteredCards = originalCards.filter(
      (card) =>
        card.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
        card.nameEN.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSavedCards(filteredCards);
    setFilteredCards(filteredCards);
  }

  return (
    <main className='movies'>
      <SearchForm
        onSearch={handleSearchSavedMovies}
        shortFilms={shortFilms}
        setShortFilms={setShortFilms}
        searchValue={searchValueSavedMovies}
        setSearchValue={setSearchValueSavedMovies}
        onShortFilms={onShortFilms}
      />

      {isLoadingPage ? (
        <Preloader />
      ) : isError ? (
        <p className='movies__text'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.
        </p>
      ) : savedCards.length === 0 && originalCards.length !== 0 ? (
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
