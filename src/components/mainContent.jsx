import { extractDomain } from './extractDomain';
import SaveButton from './saveBtton';
import React, { useEffect, useState } from 'react';
import { Card, H3 } from '@blueprintjs/core';

const MainContent = (email, itemType) => {
  const [url, setUrl] = useState();

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    setUrl(tabs[0].url.toString());
  });
  const domain = extractDomain(url);
  if (!domain) {
    return <SaveButton email={email} itemType={itemType} />;
  }
  return (
    <Card style={{ textAlign: 'center' }}>
      <H3>Oraganization</H3>
      <p>asdf</p>
      <p>asdf</p>
      <p>asdf</p>
      <p>asdf</p>
      <p>asdf</p>
      <p>asdf</p>
      <p>asdf</p>
      <p>asdf</p>
    </Card>
  );
};

export default MainContent;
