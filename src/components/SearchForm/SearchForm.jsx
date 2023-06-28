import React from 'react';
import { useEffect, useState } from 'react';

function SearchForm({ onSearch, setShortFilms  }) {
  const [searchValue, setSearchValue] = useState('');


  function handleSubmit(e) {
    e.preventDefault();

    if (searchValue !== '') {
      onSearch(searchValue);
    }
  }

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  function shortFilmsHandler() {
    setShortFilms((prevShortFilms) => !prevShortFilms);
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
          <input className='search-form__checkbox' type='checkbox' onChange={shortFilmsHandler} />
          <span className='search-form__slider'></span>
          <span className='search-form__text'>Короткометражки</span>
        </label>
      </section>

  );
}

export default SearchForm;
