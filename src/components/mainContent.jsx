import { extractDomain } from './extractDomain';
import SaveButton from './saveBtton';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import OrgBreifing from './orgBreifing';

const MainContent = (email, itemType) => {
  const [url, setUrl] = useState();
  const [token, setToken] = useState();
  const { getIdTokenClaims } = useAuth0();
  const domain = extractDomain(url);
  const axios = require('axios').default;
  const [org, setOrg] = useState();
  const [orgExists, setOrgExists] = useState(false);

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
        .then((resp) => {
          setOrg(resp.data[0]);
        })
        .catch(console.error);
  }, [axios, domain, token]);
  useEffect(() => {
    org && setOrgExists(true);
  }, [org]);
  const getOrg = () => {
    return org;
  };
  if (!orgExists) {
    return <SaveButton email={email} itemType={itemType} />;
  }

  return <OrgBreifing org={getOrg()} />;
};

export default MainContent;
