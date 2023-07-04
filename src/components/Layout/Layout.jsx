import { Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/MainApi';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { checkToken } from '../../utils/auth.js';

function Layout({ setLoggedIn, setCurrentUser, loggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }
          navigate('/movies', { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
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

  return (
    <>
      <Header loggedIn={loggedIn} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
