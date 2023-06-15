import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';

import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';

import Layout from '../Layout/Layout';

import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
  return (
    <div className='root'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='movies' element={<Movies />} />
            <Route path='saved-movies' element={<Movies />} />
            <Route path='profile' element={<Profile />} />
            <Route path='signup' element={<Register />} />
            <Route path='signin' element={<Login />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
