import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { SHORT_FILM_DURATION } from '../../utils/constants';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Layout from '../Layout/Layout';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { api } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { checkToken } from '../../utils/auth.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const [email, setEmail] = useState(formValue.email);
  const [isSavedMovies, setIsSavedMovies] = useState(false);
  const storedMovies = localStorage.getItem('movies');
  
  const parsedMovies = storedMovies ? JSON.parse(storedMovies) : [];
  const [cards, setCards] = useState(parsedMovies);
  const [filteredCards, setFilteredCards] = useState(parsedMovies);
  const [originalCards, setOriginalCards] = useState([]);
  const [filteredCardsSV, setFilteredCardsSV] = useState([]);
  const [savedCards, setSavedCards] = useState(
    JSON.parse(localStorage.getItem('savedCards')) || []
  );
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shortFilms, setShortFilms] = useState(localStorage.getItem('shortFilms') === 'true');
  const [showNotification, setShowNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') || '');
  const [isInitialSearch, setIsInitialSearch] = useState(true);

  // поиск и фильтрация Фильмы
  useEffect(() => {
    localStorage.setItem('savedCards', JSON.stringify(savedCards));
    localStorage.setItem('shortFilms', shortFilms);
    if (filteredCards.length !== 0 && shortFilms) {
      setCards(filteredCards.filter((card) => card.duration <= SHORT_FILM_DURATION));
    } else if (filteredCards.length !== 0) {
      setCards(filteredCards);
    }
  }, [savedCards, shortFilms, filteredCards]);

  function handleSearch(searchValue) {
    setIsLoadingPage(true);
    setIsError(false);
    localStorage.setItem('searchValue', searchValue);
    if (isInitialSearch) {
      moviesApi
        .getInitialCards()
        .then((cards) => {
          const filteredCards = cards.filter(
            (card) =>
              card.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
              card.nameEN.toLowerCase().includes(searchValue.toLowerCase())
          );
          setCards(filteredCards);
          setFilteredCards(filteredCards);
          setOriginalCards(cards);
          localStorage.setItem('movies', JSON.stringify(filteredCards));
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
        })
        .finally(() => {
          setIsLoadingPage(false);
          setIsInitialSearch(false);
        });
    } else {
      setIsLoadingPage(false);

      const filteredCards = originalCards.filter(
        (card) =>
          card.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
          card.nameEN.toLowerCase().includes(searchValue.toLowerCase())
      );
      setCards(filteredCards);
      setFilteredCards(filteredCards);
      localStorage.setItem('movies', JSON.stringify(filteredCards));
    }
  }

  function shortFilmsHandler() {
    setShortFilms((prevShortFilms) => !prevShortFilms);
  }

  // Добавление фильма в сохраненные
  function handleCardLike(card) {
    api
      .saveMovie(card)
      .then((newCard) => {
        setSavedCards((prevSavedCards) => [...prevSavedCards, newCard]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Удаление фильма из сохраненных
  function handleDeleteCard(card) {
    api
      .deleteMovie(card._id)
      .then(() => {
        setSavedCards(savedCards.filter((c) => c._id !== card._id));
        if (filteredCardsSV.length !== 0) {
          setFilteredCardsSV(filteredCardsSV.filter((c) => c._id !== card._id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Выход из профиля
  function handleLogout() {
    setLoggedIn(false);
    localStorage.clear();
  }

  // Редактирование профиля
  function handleUpdateUser(data) {
    setErrorMessage('');
    api
      .editUserData(data)
      .then((data) => {
        setCurrentUser(data);
        setShowNotification(true);
      })
      .catch((err) => {
        console.log(err);
        if ((err = 'Ошибка: 409')) {
          setErrorMessage('Пользователь с таким email уже существует');
        } else {
          setErrorMessage('При обновлении профиля произошла ошибка');
        }
      });
  }
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Проверка токена
  const validateToken = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          if (res) {
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
          handleLogout();
        });
    } else {
      handleLogout();
    }
  }, []);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return (
    <div className='root'>
      <CurrentUserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <Layout
                  setLoggedIn={setLoggedIn}
                  setEmail={setEmail}
                  formValue={formValue}
                  setFormValue={setFormValue}
                  loggedIn={loggedIn}
                  setCurrentUser={setCurrentUser}
                />
              }
            >
              <Route index element={<Main />} />

              <Route
                path='/movies'
                element={
                  <ProtectedRoute
                    element={Movies}
                    loggedIn={loggedIn}
                    savedCards={savedCards}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    handleSearch={handleSearch}
                    onShortFilms={shortFilmsHandler}
                    cards={cards}
                    isLoadingPage={isLoadingPage}
                    isError={isError}
                    shortFilms={shortFilms}
                    setShortFilms={setShortFilms}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteCard}
                    originalCards={originalCards}
                    isSavedMovies={false}
                    setIsSavedMovies={setIsSavedMovies}
                  />
                }
              />
              <Route
                path='/saved-movies'
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    loggedIn={loggedIn}
                    savedCards={savedCards}
                    setSavedCards={setSavedCards}
                    isLoadingPage={isLoadingPage}
                    isError={isError}
                    filteredCardsSV={filteredCardsSV}
                    setFilteredCardsSV={setFilteredCardsSV}
                    shortFilms={shortFilms}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteCard}
                    setShortFilms={setShortFilms}
                    onShortFilms={shortFilmsHandler}
                    isSavedMovies={true}
                    setIsSavedMovies={setIsSavedMovies}
                  />
                }
              />
              <Route
                path='/profile'
                element={
                  <ProtectedRoute
                    element={Profile}
                    loggedIn={loggedIn}
                    handleUpdateUser={handleUpdateUser}
                    errorMessage={errorMessage}
                    showNotification={showNotification}
                    setShowNotification={setShowNotification}
                    setLoggedIn={setLoggedIn}
                    onLogoutClick={handleLogout}
                  />
                }
              />
              <Route
                path='/signup'
                element={
                  <Register
                    setEmail={setEmail}
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                    validateToken={validateToken}
                  />
                }
              />
              <Route
                path='/signin'
                element={
                  <Login
                    setEmail={setEmail}
                    setFormValue={setFormValue}
                    handleLogin={handleLogin}
                    loggedIn={loggedIn}
                    validateToken={validateToken}
                  />
                }
              />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
