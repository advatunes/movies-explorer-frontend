import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';

import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { api } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

import Layout from '../Layout/Layout';

import NotFoundPage from '../NotFoundPage/NotFoundPage';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const [email, setEmail] = useState(formValue.email);

  const [cards, setCards] = useState([]);
  const [originalCards, setOriginalCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [savedCards, setSavedCards] = useState(
    JSON.parse(localStorage.getItem('savedCards')) || []
  );
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shortFilms, setShortFilms] = useState(localStorage.getItem('shortFilms') === 'true');
  const [showNotification, setShowNotification] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (searchValue) => {
    setIsLoadingPage(true);
    setIsError(false);

    Promise.all([moviesApi.getInitialCards(), api.getMovies()])
      .then(async ([initialCards, savedCards]) => {
        setOriginalCards(initialCards);
        setSavedCards(savedCards);

        const filteredCards = await initialCards.filter(
          (card) =>
            card.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
            card.nameEN.toLowerCase().includes(searchValue.toLowerCase())
        );
        if (shortFilms) {
          setCards(filteredCards.filter((card) => card.duration <= 40));
        } else setCards(filteredCards);

        localStorage.setItem('savedCards', JSON.stringify(savedCards));
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
    const savedSearchMovies = JSON.parse(localStorage.getItem('movies'));

    if (savedSearchMovies !== null) {
      if (shortFilms) {
        setCards(savedSearchMovies.filter((card) => card.duration <= 40));
      } else {
        setCards(filteredCards.length === 0 ? savedSearchMovies : filteredCards);
      }
    }
  }, [shortFilms]);

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

  localStorage.setItem('savedCards', JSON.stringify(savedCards));

  function handleDeleteCard(card) {
    api
      .deleteMovie(card._id)
      .then(() => {
        setSavedCards(savedCards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteCard}
                    originalCards={originalCards}
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
                    setSavedCards={setSavedCards}
                    isLoadingPage={isLoadingPage}
                    isError={isError}
                    setCards={setCards}
                    shortFilms={shortFilms}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteCard}
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
                    showNotification={showNotification}
                    setShowNotification={setShowNotification}
                  />
                }
              />
              <Route
                path='signup'
                element={
                  <Register
                    formValue={formValue}

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
