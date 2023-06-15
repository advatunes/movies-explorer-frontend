import { Routes, Route, useLocation } from 'react-router-dom';
import NavPromo from '../NavPromo/NavPromo';
import Navigation from '../Navigation/Navigation';

function Header() {
  const location = useLocation();


  const isHeaderVisible =
    location.pathname !== '/signup' &&
    location.pathname !== '/signin';

  if (!isHeaderVisible) {
    return null;
  }


  return (

      <header className={` header ${location.pathname === '/' ? ' header-blue' : ''}`}>
        <Routes>

          <Route path='/' element={<NavPromo />} />
          <Route path='/*' element={<Navigation />} />
        </Routes>
      </header>

  );
}

export default Header;
