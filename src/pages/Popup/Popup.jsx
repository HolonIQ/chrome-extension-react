import React, { useEffect, useState } from 'react';
import './Popup.css';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Button,
  ButtonGroup,
  Divider,
  H3,
  H5,
  Spinner,
  Tooltip,
} from '@blueprintjs/core';
import MainContent from '../../components/mainContent';

const Popup = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [itemType, setItemType] = useState('Organization');
  const itemTypes = ['Organization', 'Signal'];
  const itemIcons = {
    Organization: 'social-media',
    Signal: 'pulse',
  };
  const getEmail = () => {
    if (isAuthenticated) {
      const { email } = user;
      return email;
    }
  };
  const getToken = async () => {
    try {
      await getAccessTokenSilently();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  if (isLoading) {
    return <Spinner className="spinner" intent="primary"></Spinner>;
  }
  if (!isAuthenticated) {
    return (
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
        Login
      </Button>
    );
  }
  return (
    <div>
      <div className="header">
        <H3 style={{ padding: '35px' }}>Save to HolonIQ</H3>
      </div>
      <Divider style={{ marginTop: '10px' }} />
      <div style={{ textAlign: 'center' }}>
        <ButtonGroup fill style={{ padding: '5px' }}>
          {itemTypes.map((type) => {
            return (
              <Tooltip
                content={type}
                placement={'top'}
                key={type}
                usePortal={false}
              >
                <Button
                  icon={itemIcons[type]}
                  intent={itemType === type ? 'primary' : 'none'}
                  onClick={() => {
                    setItemType(type);
                  }}
                />
              </Tooltip>
            );
          })}
        </ButtonGroup>
      </div>
      <div style={{ padding: '5px' }}>
        <MainContent email={getEmail()} type={itemType} />
      </div>
      <H5
        style={{
          textAlign: 'right',
          bottom: '0px',
          position: 'relative',
          padding: '5px',
        }}
      >
        {getEmail()}
      </H5>
    </div>
  );
};
export default Popup;
