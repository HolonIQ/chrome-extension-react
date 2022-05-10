import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LogoutButton = () => {
  const { logout } = useAuth0();
  const clientId = process.env.AUTH_CLIENTID;
  return (
    <button
      className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
          client_id: clientId,
        })
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
