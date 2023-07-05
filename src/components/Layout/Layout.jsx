import { Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/MainApi';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';



function Layout({ setLoggedIn, setCurrentUser, loggedIn }) {
  const navigate = useNavigate();



  return (
    <>
      <Header loggedIn={loggedIn} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
