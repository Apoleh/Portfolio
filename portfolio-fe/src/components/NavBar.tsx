import React, { useState, useEffect } from 'react';
import { PathRoutes } from '../path.routes';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const navigationItems = [
  { label: 'Home', path: PathRoutes.HomePage },
  { label: 'About', path: '/felix' },
  { label: 'Projects', path: '/project' },
  { label: 'Comments', path: '/comments' },
];

export const NavBar: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track if mobile menu is open

  // This effect will handle resizing
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);

    // Close menu on resize if screen width is large enough
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAuthAction = () => {
    setLoading(true);
    if (isAuthenticated) {
      handleLogout();
    } else {
      handleLoginRedirect();
    }
  };

  const handleLoginRedirect = () => {
    const audience = 'https://dev-q4qzodi6wpd1thnb.us.auth0.com/api/v2/';
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

    window.location.href =
      `https://dev-q4qzodi6wpd1thnb.us.auth0.com/authorize?` +
      `response_type=token&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `scope=openid profile email read:current_user read:roles&` +
      `audience=${audience}&` +
      `prompt=login`;
  };

  const clearAuthData = () => {
    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie.trim().replace(/=.*/, '=;expires=Thu, 01 Jan 1970 00:00:00 GMT');
    });
    localStorage.clear();
    sessionStorage.clear();
    setIsAuthenticated(false);
  };

  const handleLogout = () => {
    clearAuthData();
    const logoutUrl = `https://dev-q4qzodi6wpd1thnb.us.auth0.com/v2/logout?` +
      `client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&` +
      `returnTo=${encodeURIComponent('http://localhost:3000/home')}`;

    window.location.href = logoutUrl;
  };

  return (
    <nav role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div className="portfolio">Portfolio</div>
        {/* Hamburger and nav items container */}
        <div className={`hamburger-container ${isMenuOpen ? 'open' : ''}`}>
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <div className={`nav-items ${isMenuOpen ? 'open' : ''}`}>
          {navigationItems.map(item => (
            <NavLink key={item.label} to={item.path} role="menuitem">
              {item.label}
            </NavLink>
          ))}
          <button className="login-btn" onClick={handleAuthAction} disabled={loading}>
            {loading ? 'Processing...' : isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
};
