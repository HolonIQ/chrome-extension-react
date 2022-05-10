import React, { useEffect } from 'react';
import './Popup.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@blueprintjs/core';

const Popup = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, setToken } =
    useAuth0();

  const getToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      setToken(token);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button
        id="loginButton"
        variant="contained"
        color="primary"
        onClick={() =>
          chrome.tabs.create({
            url: `${window.location.origin}/options.html`,
          })
        }
      >
        Start here
      </Button>
      <h4>{isAuthenticated ? 'Authenticated' : 'notAuthenticated'}</h4>
    </div>
  );
};
export default Popup;
