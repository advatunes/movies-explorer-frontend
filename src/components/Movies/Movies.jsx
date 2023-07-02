import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({
  savedCards,
  handleAddToSavedCards,
  cards,
  handleSearch,
  isLoadingPage,
  isError,
  shortFilms,
  setShortFilms,
  onCardDelete,
  onCardLike,
  originalCards,
}) {
  return (
    <main className='movies'>
      <SearchForm onSearch={handleSearch} shortFilms={shortFilms} setShortFilms={setShortFilms} />

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
          savedCards={savedCards}
          handleAddToSavedCards={handleAddToSavedCards}
          onCardDelete={onCardDelete}
          onCardLike={onCardLike}
        />
      )}
    </main>
  );
}

export default Movies;
