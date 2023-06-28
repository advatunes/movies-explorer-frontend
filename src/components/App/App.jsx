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

  function handleSearch(searchValue) {
    setIsLoadingPage(true);
    setIsError(false);
    moviesApi
      .getInitialCards()
      .then((data) => {
        const filteredCards = data.filter(
          (card) =>
            (card.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
              card.nameEN.toLowerCase().includes(searchValue.toLowerCase())) &&
            (!shortFilms || card.duration <= 40)
        );
        if (shortFilms) {
        }
        setCards(filteredCards);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoadingPage(false);
      });
  }

  // const handleChangeFormValue = (e) => {
  //   const { name, value } = e.target;

  //   setFormValue({
  //     ...formValue,
  //     [name]: value,
  //   });
  // };

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserData()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleAddToSavedCards(newCard) {
    console.log(savedCards);
    console.log('savedC123ards');
    setSavedCards((prevSavedCards) => [newCard, ...prevSavedCards]);
  }

  return (
    <div className='root'>
      <CurrentUserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Main />} />

              <Route
                path='movies'
                element={
                  <ProtectedRoute
                    element={Movies}
                    loggedIn={loggedIn}
                    savedCards={savedCards}
                    handleAddToSavedCards={handleAddToSavedCards}
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
                element={<ProtectedRoute element={Profile} loggedIn={loggedIn} />}
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
