import { extractDomain } from './extractDomain';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import OrgBreifing from './orgBreifing';
import { Spinner } from '@blueprintjs/core';
import SubmitNavBar from './submitNavBar';

const MainContent = () => {
  const [url, setUrl] = useState();
  const [token, setToken] = useState();
  const { getIdTokenClaims } = useAuth0();
  const domain = extractDomain(url);
  const axios = require('axios').default;
  const [org, setOrg] = useState();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getIdTokenClaims();
        setToken(token.__raw);
      } catch (e) {
        console.log(e);
      }
    };

    !token && getToken();
  }, [getIdTokenClaims, token]);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    setUrl(tabs[0].url.toString());
  });

  useEffect(() => {
    token &&
      domain &&
      axios({
        method: 'post',
        url: process.env.ORG_API,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          domain: domain,
        },
      })
        .then(({ data }) => {
          setOrg(data);
          setLoading(false);
        })
        .catch(console.error);
  }, [axios, domain, token]);
  if (isLoading) {
    return <Spinner className="spinner" intent="primary"></Spinner>;
  }
  return (
    <div>
      {org && <OrgBreifing org={org} />}

      <SubmitNavBar org={org} />
    </div>
  );
};

export default MainContent;
