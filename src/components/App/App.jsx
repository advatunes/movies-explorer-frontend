import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Header from '../Header/Header';

import Footer from '../Footer/Footer';

import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
  return (
    <div className='root'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Footer />



      </Router>
    </div>
  );
}

export default App;
