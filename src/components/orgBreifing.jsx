import React from 'react';
import { Card, H4, H6 } from '@blueprintjs/core';

const OrgBreifing = (org) => {
  console.log(org.org);
  const _org = org.org;
  return (
    <Card style={{ textAlign: 'center' }}>
      <H4>{_org.name}</H4>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <H6>Description</H6>
        <p style={{ textAlign: 'left' }}>{_org.description}</p>
        <div style={{ display: 'inline-flex', flexDirection: 'row' }}>
          <H6>Founded: </H6>
          <p style={{ marginLeft: '10px' }}>{_org.founded}</p>
        </div>
      </div>
    </Card>
  );
};

export default OrgBreifing;
