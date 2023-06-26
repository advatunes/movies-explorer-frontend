import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useEffect, useState } from 'react';

function SavedMovies({ savedCards }) {
  console.log(savedCards);
  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList cards={savedCards}/>
    </section>
  );
}

export default SavedMovies;
