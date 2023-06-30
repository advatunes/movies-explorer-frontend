import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useNavigate } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';

import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { api } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import * as Auth from '../../utils/Auth';

import Layout from '../Layout/Layout';

import NotFoundPage from '../NotFoundPage/NotFoundPage';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const [savedCards, setSavedCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const [email, setEmail] = useState(formValue.email);

  const [cards, setCards] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shortFilms, setShortFilms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (searchValue) => {
    setIsLoadingPage(true);
    setIsError(false);

    Promise.all([moviesApi.getInitialCards(), api.getMovies()])
      .then(([initialCards, savedMovies]) => {
        const likedCards = initialCards.map((card) => {
          const isLiked = savedMovies.some((movie) => movie._id === card._id);
          return { ...card, isLiked };
        });

        const filteredCards = likedCards.filter(
          (card) =>
            (card.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
              card.nameEN.toLowerCase().includes(searchValue.toLowerCase())) &&
            (!shortFilms || card.duration <= 40)
        );

        setCards(filteredCards);

        localStorage.setItem('searchValue', searchValue);
        localStorage.setItem('shortFilms', shortFilms);
        localStorage.setItem('movies', JSON.stringify(filteredCards));
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoadingPage(false);
      });
  };

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('movies'));
    if (savedMovies) {
      setCards(savedMovies);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserData()
        .then((data) => {
          if (data) {
            setCurrentUser(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleUpdateUser(data) {
    setErrorMessage('');
    api
      .editUserData(data)
      .then((data) => {
        setCurrentUser(data);
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

  // function handleAddToSavedCards(newCard) {
  //   setSavedCards((prevSavedCards) => [newCard, ...prevSavedCards]);
  // }

  const handleLogin = () => {
    setLoggedIn(true);
  };

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
                />
              }
            >
              <Route index element={<Main />} />

              <Route
                path='movies'
                element={
                  <ProtectedRoute
                    element={Movies}
                    loggedIn={loggedIn}
                    savedCards={savedCards}
                    handleSearch={handleSearch}
                    cards={cards}
                    isLoadingPage={isLoadingPage}
                    isError={isError}
                    shortFilms={shortFilms}
                    setShortFilms={setShortFilms}
                  />
                }
              />
              <Route
                path='saved-movies'
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    loggedIn={loggedIn}
                    savedCards={savedCards}
                    isLoadingPage={isLoadingPage}
                    isError={isError}
                    setCards={setCards}
                    shortFilms={shortFilms}
                    // handleSearch={handleSearchSavedMovies}
                    setShortFilms={setShortFilms}
                  />
                }
              />
              <Route
                path='profile'
                element={
                  <ProtectedRoute
                    element={Profile}
                    loggedIn={loggedIn}
                    handleUpdateUser={handleUpdateUser}
                    errorMessage={errorMessage}
                  />
                }
              />
              <Route
                path='signup'
                element={
                  <Register
                    formValue={formValue}

                    // onChange={handleChangeFormValue}
                  />
                }
              />
              <Route
                path='signin'
                element={
                  <Login
                    setLoggedIn={setLoggedIn}
                    setEmail={setEmail}
                    formValue={formValue}
                    setFormValue={setFormValue}
                    handleLogin={handleLogin}
                    // onChange={handleChangeFormValue}
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
