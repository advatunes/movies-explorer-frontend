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

  useEffect(() => {
    api
      .getMovies()
      .then((data) => {
        setSavedCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // function handleDeleteCard(card) {
  //   api
  //     .deleteMovie(card._id)
  //     .then(() => {
  //       setCards(cards.filter((c) => c._id !== card._id));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  function handleSearchSavedMovies(searchValue) {
    const filteredCards = savedCards.filter(
      (card) =>
        card.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
        card.nameEN.toLowerCase().includes(searchValue.toLowerCase())
      //   &&
      // (!shortFilms || card.duration <= 40)
    );
    // if (shortFilms) {
    // }
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
