import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({
  savedCards,
  cards,
  handleSearch,
  setSearchValue,
  searchValue,
  isLoadingPage,
  isError,
  onShortFilms,
  onCardDelete,
  onCardLike,
  originalCards,
  isSavedMovies,
  shortFilms,
  setCards,
}) {
  return (
    <main className='movies'>
      <SearchForm
        shortFilms={shortFilms}
        onSearch={handleSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onShortFilms={onShortFilms}
      />

      {isLoadingPage ? (
        <Preloader />
      ) : isError ? (
        <p className='movies__text'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.
        </p>
      ) : cards.length === 0 && originalCards.length !== 0 ? (
        <p className='movies__text'>Ничего не найдено.</p>
      ) : (
        <MoviesCardList
          cards={cards}
          setCards={setCards}
          savedCards={savedCards}
          shortFilms={shortFilms}
          onCardDelete={onCardDelete}
          onCardLike={onCardLike}
          isSavedMovies={isSavedMovies}
        />
      )}
    </main>
  );
}

export default Movies;
