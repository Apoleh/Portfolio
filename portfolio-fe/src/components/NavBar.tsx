import React, { useState } from 'react';
import { PathRoutes } from '../path.routes';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const navigationItems = [
  { label: 'Home', path: PathRoutes.HomePage },
  { label: 'Felix', path: '/felix' },
  { label: 'Projects', path: '/project' },
];

export const NavBar: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleLoginRedirect = () => {
    setLoading(true);
    const audience = 'https://dev-5kbvxb8zgblo1by3.us.auth0.com/api/v2/';
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

    // Redirect the user to the Auth0 Universal Login page
    window.location.href =
      `https://dev-5kbvxb8zgblo1by3.us.auth0.com/authorize?` +
      `response_type=token&` +
      `client_id=${clientId}&` + // Your Auth0 Client ID
      `redirect_uri=${redirectUri}&` + // The redirect URL after login
      `scope=openid profile email read:current_user read:roles&` + // Scope to get user information
      `audience=${audience}&` + // Specify the audience for access token
      `prompt=login`; // Force the login page to prompt user credentials
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
    >
      <div >
        <div>Portfolio</div>
        <div role="menubar">
          {navigationItems.map(item => (
            <NavLink
              key={item.label}
              to={item.path}
              role="menuitem"
            >
              {item.label}
            </NavLink>
          ))}
          {/* Add the Login item as a button */}
          <button
            onClick={handleLoginRedirect}
            disabled={loading}
          >
            {loading ? 'Redirecting to Auth0...' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
};
