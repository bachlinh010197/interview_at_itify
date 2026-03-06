import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-brand">URL Shortener</Link>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-email">
                {user.email}
                <span className="role-badge">{user.role}</span>
              </span>
              <button type="button" className="btn btn-small" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-small">Sign In</Link>
              <Link to="/register" className="btn btn-small btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
