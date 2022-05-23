import React from 'react';
import './Options.css';
import { Button } from '@blueprintjs/core';

import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../../components/authLogoutButton';

const Options = () => {
  const { isAuthenticated, isLoading, loginWithPopup } = useAuth0();

  if (isLoading) {
    return <div>isLoading...</div>;
  }
  return (
    <div className="OptionsContainer">
      <Button id="loginButton" color="primary" onClick={loginWithPopup}>
        {isAuthenticated ? 'Re-Authenticate' : 'Login'}
      </Button>
      <LogoutButton />
    </div>
  );
};

export default Options;
