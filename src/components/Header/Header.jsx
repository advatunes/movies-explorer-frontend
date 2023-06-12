import NavPromo from '../NavPromo/NavPromo';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header() {
  const location = useLocation();

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
