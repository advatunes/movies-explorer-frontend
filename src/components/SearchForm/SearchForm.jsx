import React from 'react';
import { useEffect, useState } from 'react';

import { api } from '../../utils/MoviesApi';



function SearchForm({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  // const [cards, setCards] = useState([]);
  // const [isLoadingPage, setIsLoadingPage] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [searchValue, setSearchValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onSearch(searchValue);
  }

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }



  return (
      <section className='search-form'>
        <form className='search-form__wrap' onSubmit={handleSubmit}>
          <input
            className='search-form__input'
            type='text'
            name='search'
            placeholder='Фильм'
            value={searchValue}
            onChange={handleSearchChange}
          />

          <button className='search-form__button' type='submit'>
            Найти
          </button>
        </form>

        <label className='search-form__switch'>
          <input className='search-form__checkbox' type='checkbox' />
          <span className='search-form__slider'></span>
          <span className='search-form__text'>Короткометражки</span>
        </label>
      </section>

  );
}

export default SearchForm;
