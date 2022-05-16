import { extractDomain } from './extractDomain';
import SaveButton from './saveBtton';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import OrgBreifing from './orgBreifing';
import { Button, ButtonGroup, Divider, Tooltip } from '@blueprintjs/core';

const MainContent = () => {
  const [url, setUrl] = useState();
  const [token, setToken] = useState();
  const { getIdTokenClaims } = useAuth0();
  const domain = extractDomain(url);
  const axios = require('axios').default;
  const [org, setOrg] = useState();
  const [orgExists, setOrgExists] = useState(false);
  const [itemType, setItemType] = useState('Organization');
  const itemTypes = ['Organization', 'Signal'];
  const itemIcons = {
    Organization: 'social-media',
    Signal: 'pulse',
  };
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

  const getSaveButton = () => {
    if (!orgExists || itemType !== 'Organization')
      return <SaveButton itemType={itemType} />;
  };

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
  return (
    <div>
      {orgExists && <OrgBreifing org={getOrg()} />}
      <Divider style={{ marginTop: '10px' }} />
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
      <div style={{ display: 'flex', justifyContent: 'flex-end ' }}>
        {getSaveButton()}
      </div>
    </div>
  );
};

export default MainContent;
