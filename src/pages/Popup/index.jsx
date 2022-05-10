import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import Popup from './Popup';

const domain = process.env.AUTH_DOMAIN;
const clientId = process.env.AUTH_CLIENTID;
const audience = process.env.AUTH_AUDIENCE;
render(
  <Auth0Provider domain={domain} clientId={clientId} audience={audience}>
    <Popup />
  </Auth0Provider>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
