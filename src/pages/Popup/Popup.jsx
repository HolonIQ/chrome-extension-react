import React, { useCallback, useEffect, useState } from 'react';
import './Popup.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, H3, H5, Spinner } from '@blueprintjs/core';
import MainContent from '../../components/mainContent';
import { Footer } from '../../components/footer';

const Popup = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState();
  const _loading = isLoading || loading;

  const getToken = useCallback(async () => {
    setLoading(true);
    try {
      await getAccessTokenSilently();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, [getAccessTokenSilently]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  if (_loading) {
    return <Spinner className="spinner" intent="primary"></Spinner>;
  }
  if (isAuthenticated === false) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="header">
          <H3 style={{ padding: '25px', color: 'white' }}>
            Welcome to HolonIQ
          </H3>
        </div>
        <H5 style={{ alignSelf: 'center', marginTop: '60px' }}>
          {' '}
          Please login to your HolonIQ account
        </H5>
        <Button
          style={{ margin: '30px', marginTop: '80px' }}
          large
          intent="primary"
          id="loginButton"
          onClick={() =>
            chrome.tabs.create({
              url: `${process.env.BASE_URL}`,
            })
          }
        >
          Login
        </Button>
      </div>
    );
  }
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1, overflow: 'auto' }}>
        <MainContent />
      </div>
      <div style={{ height: 35, flexShrink: 0 }}>
        <Footer />
      </div>
    </div>
  );
};
export default Popup;
