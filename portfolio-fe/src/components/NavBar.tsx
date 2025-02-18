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
  const [isTranslateVisible, setIsTranslateVisible] = useState(false); // Track if translate button is clicked

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
      `returnTo=${encodeURIComponent('portfolio-fe-app-aqt9o.ondigitalocean.app/home')}`;

    window.location.href = logoutUrl;
  };

  const handleTranslateClick = () => {
    setIsTranslateVisible(!isTranslateVisible);
  };

  // Add the Google Translate script only when the button is clicked
  useEffect(() => {
    if (isTranslateVisible) {
      // Check if the script already exists
      if (!document.querySelector('[src*="translate_a/element.js"]')) {
        const addScript = document.createElement('script');
        addScript.setAttribute(
          'src',
          'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        );
        addScript.async = true;
        addScript.defer = true;
        document.body.appendChild(addScript);

        // Define the Google Translate initialization function globally
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              autoDisplay: false,
              includedLanguages: 'en,fr', // Specify supported languages
            },
            'google_translate_element' // ID of the element to render the language selector
          );
        };
      }
    } else {
      // Remove the Google Translate script and styles if visible is false
      const script = document.querySelector('[src*="translate_a/element.js"]');
      if (script) {
        script.remove();
      }
    }

    // Cleanup the script and style on component unmount
    return () => {
      const script = document.querySelector('[src*="translate_a/element.js"]');
      if (script) {
        script.remove();
      }
    };
  }, [isTranslateVisible]);

  return (
    <nav role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div className="portfolio">Portfolio</div>
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
          {/* Google Translate Button */}
          <button onClick={handleTranslateClick} className="translate-btn">
            {isTranslateVisible ? 'Hide Translate' : 'Show Translate'}
          </button>
          {/* Google Translate Container */}
          {isTranslateVisible && <div id="google_translate_element" />}
        </div>
      </div>
    </nav>
  );
};
