import { useLocation } from 'react-router-dom';
import NavPromo from '../NavPromo/NavPromo';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  const location = useLocation();

  const isHeaderVisible = location.pathname !== '/signup' && location.pathname !== '/signin';
  if (!isHeaderVisible) {
    return null;
  }

  return (
    <header className={` header ${!loggedIn ? 'container-blue' : ''}`}>
       {loggedIn ? <Navigation /> : <NavPromo />}
    </header>
  );
}

export default Header;
