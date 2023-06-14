import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';

import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
  return (
    <div className='root'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup ' element={<Register />} />
          <Route path='/signin ' element={<Login />} />
        </Routes>
        <Footer />
        <Routes>
          <Route>
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
