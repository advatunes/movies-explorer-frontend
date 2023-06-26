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
import {api} from '../../utils/MainApi';
import * as Auth from '../../utils/auth';

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
  // const navigate = useNavigate();

  const handleChangeFormValue = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserData()
        .then((data) => setCurrentUser(data))
        .catch((err) => {
          console.log(err);
        });    }
  }, [loggedIn]);


  useEffect(() => {
    tokenCheck();


  }, []);

  function tokenCheck() {

    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      Auth.checkToken(jwt)
        .then((res) => {
          console.log(res);
          if (res) {
            setEmail(res.email);
            setLoggedIn(true);
            // navigate('/movies', { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  };

  function handleAddToSavedCards(newCard) {
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
                    savedCards={savedCards}
                    handleAddToSavedCards={handleAddToSavedCards}
                  />

                }
              />
              <Route
                path='saved-movies'
                element={<ProtectedRoute element={SavedMovies} savedCards={savedCards} />}
              />
              <Route path='profile' element={<ProtectedRoute element={Profile} />} />
              <Route
                path='signup'
                element={<Register formValue={formValue} onChange={handleChangeFormValue} />}
              />
              <Route
                path='signin'
                element={
                  <Login
                    setEmail={setEmail}
                    formValue={formValue}
                    setFormValue={setFormValue}
                    onChange={handleChangeFormValue}
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
