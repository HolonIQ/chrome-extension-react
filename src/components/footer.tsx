import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import logo from '../assets/img/43e302560b283485c8cdc0aee276c206.png';

export const Footer = () => {
  const { user, isAuthenticated } = useAuth0();
  const handleClickLogo = () => {
    chrome.tabs.create({
      active: true,
      url: `${process.env.BASE_URL}`,
    });
  };
  return (
    <div
      style={{
        padding: 5,
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      <img
        onClick={() => handleClickLogo()}
        height={'25px'}
        src={logo}
        alt="HIQ Logo"
        style={{ cursor: 'pointer', marginRight: 0 }}
      />
      <p
        style={{
          textAlign: 'right',
          margin: 0,
          fontWeight: 300,
          color: 'gray',
        }}
      >
        {isAuthenticated && user?.email}
      </p>
    </div>
  );
};
