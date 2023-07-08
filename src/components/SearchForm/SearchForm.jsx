import React from 'react';
import { useEffect, useState } from 'react';

function SearchForm({
  onSearch,
  setShortFilms,
  searchValue,
  setSearchValue,
  onShortFilms,
  shortFilms,
}) {
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (searchValue.trim() !== '') {
      setErrorMessage('');
      onSearch(searchValue);
    } else {
      setErrorMessage('Нужно ввести ключевое слово');
    }
  }

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  function shortFilmsHandler() {
    onShortFilms();
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
        <input
          className='search-form__checkbox'
          type='checkbox'
          checked={shortFilms}
          onChange={shortFilmsHandler}
        />

        <span className='search-form__slider'></span>
        <span className='search-form__text'>Короткометражки</span>
        {errorMessage && <p className='search-form__error-message'>{errorMessage}</p>}
      </label>
    </section>
  );
}

export default SearchForm;
