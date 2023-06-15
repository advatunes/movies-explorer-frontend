import React from 'react';

function SearchForm() {
  return (
    <section className='search-form'>
      <div className='search-form__wrap'>
        <input className='search-form__input' type='text' placeholder='Фильм' />

        <button className='search-form__button'>Найти</button>
      </div>

      <label className='search-form__switch'>
        <input className='search-form__checkbox' type='checkbox' />
        <span className='search-form__slider'></span>
        <span className='search-form__text'>Короткометражки</span>
      </label>
    </section>
  );
}

export default SearchForm;
