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
  setShortFilms,
  onCardDelete,
  onCardLike,
  filteredCardsSV,
  setFilteredCardsSV,
  setSavedCards,
  isSavedMovies,
}) {
  const [cards, setCards] = useState(JSON.parse(localStorage.getItem('savedCards')) || []);
  const [shortFilmsSavedMovies, setShortFilmsSavedMovies] = useState(
    localStorage.getItem('shortFilmsSavedMovies') === 'true'
  );
  const [searchValueSavedMovies, setSearchValueSavedMovies] = useState('');

  useEffect(() => {
    api
      .getMovies()
      .then((cards) => {
        setSavedCards(cards);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('shortFilmsSavedMovies', shortFilmsSavedMovies);

    if (filteredCardsSV.length !== 0 && shortFilmsSavedMovies) {
      setCards(filteredCardsSV.filter((card) => card.duration <= SHORT_FILM_DURATION));
    } else if (filteredCardsSV.length !== 0) {
      setCards(filteredCardsSV);
    } else if (
      filteredCardsSV.length === 0 &&
      shortFilmsSavedMovies &&
      searchValueSavedMovies === ''
    ) {
      setCards(savedCards.filter((card) => card.duration <= SHORT_FILM_DURATION));
    } else if (filteredCardsSV.length === 0 && searchValueSavedMovies === '') {
      setCards(savedCards);
    } else {
      setCards([]);
    }
  }, [savedCards, shortFilmsSavedMovies, filteredCardsSV, setCards, searchValueSavedMovies]);

  function handleSearchSavedMovies(searchValue) {
    const filteredCards = savedCards.filter(
      (card) =>
        card.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
        card.nameEN.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCardsSV(filteredCards);
    setCards(filteredCards);
  }

  function shortFilmsHandler() {
    setShortFilmsSavedMovies((shortFilmsSavedMovies) => !shortFilmsSavedMovies);
  }


  return (
    <main className='movies'>
      <SearchForm
        onSearch={handleSearchSavedMovies}
        shortFilms={shortFilmsSavedMovies}
        setShortFilms={setShortFilms}
        searchValue={searchValueSavedMovies}
        setSearchValue={setSearchValueSavedMovies}
        onShortFilms={shortFilmsHandler}
      />

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
        <MoviesCardList
          cards={cards}
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
