import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './NavBar.css';


const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="navbar">
      <ul className="nav-left">
        <li>
          <Link to="/">Home</Link>
        </li>

        {user && (
          <li>
            <Link to="/trees">Trees</Link>
          </li>
        )}

        <li>
          <Link to="/personalities">Personalities</Link>
        </li>
      </ul>



      <ul className="nav-right">
        {user ? (
          <>
            <li className="nav-username">
              Welcome, {user.username}
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            {user && (
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
            )}

            <li>
              <button onClick={handleSignOut} className="nav-btn">
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/sign-in">Sign In</Link></li>
            <li><Link to="/sign-up">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
