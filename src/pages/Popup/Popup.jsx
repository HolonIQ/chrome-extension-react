import React, { useCallback, useEffect } from 'react';
import './Popup.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, H3, H5, Spinner } from '@blueprintjs/core';
import MainContent from '../../components/mainContent';
import { Footer } from '../../components/footer';

const Popup = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const getToken = useCallback(async () => {
    try {
      await getAccessTokenSilently();
    } catch (e) {
      console.log(e);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  if (isLoading) {
    return <Spinner className="spinner" intent="primary"></Spinner>;
  }
  if (!isAuthenticated) {
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
    <div>
      {/* <div className="header">
        <H3 style={{ padding: '25px', color: 'white' }}>Save to HolonIQ</H3>
      </div> */}

      <MainContent />
      {/* <p
        style={{
          textAlign: 'right',
          padding: 5,
          margin: 0,
          fontWeight: 300,
          color: 'gray',
        }}
      >
        {getEmail()}
      </p> */}
      <Footer />
    </div>
  );
};
export default Popup;
