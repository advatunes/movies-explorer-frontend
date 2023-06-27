import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import { api } from '../../utils/MoviesApi';

function Movies({ savedCards, handleAddToSavedCards, cards, handleSearch, isLoadingPage, isError, shortFilms, setShortFilms }) {


  return (
    <main className='movies'>
      <SearchForm onSearch={handleSearch} setShortFilms={setShortFilms} />

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
          handleAddToSavedCards={handleAddToSavedCards}
        />
      )}
    </main>
  );
}

export default Movies;
