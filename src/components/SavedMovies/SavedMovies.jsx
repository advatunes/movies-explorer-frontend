import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useEffect, useState } from 'react';

function SavedMovies({ isSavedMovies }) {
  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList isSavedMovies={isSavedMovies} />
    </section>
  );
}

export default SavedMovies;
