import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { api } from '../../utils/MainApi';

function SavedMovies({  isLoadingPage, isError, shortFilms,setShortFilms }) {
  const [cards, setCards] = useState([]);
  // const [isSavedMovies, setIsSavedMovies] = useState(true);
  const isSavedMovies = true

  useEffect(() => {
    api
    .getMovies()
    .then((data) => {
      console.log(data);
      setCards(data)
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  function handleDeleteCard(card) {
    api
      .deleteMovie(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSearchSavedMovies(searchValue) {

    const filteredCards = cards.filter(
      (card) =>

        (card.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
          card.nameEN.toLowerCase().includes(searchValue.toLowerCase()))
        //   &&
        // (!shortFilms || card.duration <= 40)

    );
    // if (shortFilms) {
    // }
    setCards(filteredCards);

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
    ) : cards.length === 0 ? (
      <p className='movies__text'>Ничего не найдено.</p>
    ) : (
     <MoviesCardList cards={cards} isSavedMovies={isSavedMovies} onCardDelete={handleDeleteCard}
      />
    )}
    </main>
  );
}

export default SavedMovies;


