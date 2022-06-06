import React from 'react';
import { Button, H4, H6, Intent, Slider } from '@blueprintjs/core';
import './components.css';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';
import { formatNumber } from './numberFormat';
import { RubricSlider } from './rubricSlider';
const OrgBreifing = ({ org }) => {
  const sliderLabels = [0, 5, 10];
  const _org = org?.find((f) => f);
  const handleOnClick = (option) => {
    switch (option) {
      case 'detail':
        chrome.tabs.create({
          active: true,
          url: `${process.env.BASE_URL}/organizations/${_org?.id}`,
        });
        break;
      case 'sector':
        chrome.tabs.create({
          active: true,
          url: `${process.env.BASE_URL}/markets/sector/${_org?.sector_id}`,
        });
        break;
      case 'subsector':
        chrome.tabs.create({
          active: true,
          url: `${process.env.BASE_URL}/markets/subsector/${_org?.subsector_id}/#overview`,
        });
        break;
      case 'cluster':
        chrome.tabs.create({
          active: true,
          url: `${process.env.BASE_URL}/markets/cluster/${_org?.landscape_id}/#overview`,
        });
        break;
      default:
    }
  };

  if (org.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <H4> No information has been found for this domain</H4>
        <H6> Would you like to send request to our data team</H6>
      </div>
    );
  }
  return (
    <div style={{ padding: '20px' }}>
      <H4> {_org?.org_name}</H4>
      <H6 style={{ color: '#5c7080' }}>{_org?.headline}</H6>

      {/*
          <H6>Description</H6>
          <p style={{ textAlign: 'left' }}>{_org[0].description}</p> */}
      <Button
        className="detialButton"
        rightIcon={'arrow-right'}
        intent={Intent.PRIMARY}
        style={{ backgroundColor: '#137CCA' }}
        small
        fill
        onClick={() => {
          handleOnClick('detail');
        }}
      >
        Details
      </Button>
      <H6 style={{ color: '#5c7080', marginTop: '15px' }}>PROFILE</H6>
      <div className="info">
        <p className="hiq-text-grey">Founded </p>
        <p style={{ fontWeight: '600' }}>{_org?.founded || '-'}</p>
      </div>
      <div className="info">
        <p className="hiq-text-grey">Status </p>
        <p style={{ fontWeight: '600' }}>
          {capitalizeFirstLetter(_org?.status) || '-'}
        </p>
      </div>
      <div className="info">
        <p className="hiq-text-grey">Control </p>
        <p style={{ fontWeight: '600' }}>
          {capitalizeFirstLetter(_org?.control) || '-'}
        </p>
      </div>
      <div className="info">
        <p className="hiq-text-grey">Sector </p>
        <button
          type="button"
          className="linkButton"
          onClick={() => {
            handleOnClick('sector');
          }}
          style={{ fontWeight: '600' }}
        >
          {_org?.sector_name || '-'}
        </button>
      </div>
      <div className="info">
        <p className="hiq-text-grey">Sub-Sector </p>
        <button
          type="button"
          className="linkButton"
          onClick={() => {
            handleOnClick('subsector');
          }}
          style={{ fontWeight: '600' }}
        >
          {_org?.subsector_name || '-'}
        </button>
      </div>
      <div className="info">
        <p className="hiq-text-grey">Cluster </p>
        <button
          type="button"
          className="linkButton"
          onClick={() => {
            handleOnClick('subsector');
          }}
          style={{ fontWeight: '600' }}
        >
          {_org?.cluster || '-'}
        </button>
      </div>

      <H6 style={{ color: '#5c7080', marginTop: '15px' }}>ESTIMATES</H6>
      <div className="info">
        <p className="hiq-text-grey">Employee</p>
        <p style={{ fontWeight: '600' }}>
          {_org?.metricRanges?.find((f) => f.type_id === 20)?.value || '-'}
        </p>
      </div>

      <div className="info">
        <p className="hiq-text-grey">Revenue</p>
        <p style={{ fontWeight: '600' }}>
          {_org?.metricRanges?.find((f) => f.type_id === 22)?.value || '-'}
        </p>
      </div>

      <div className="info">
        <p className="hiq-text-grey">Funding</p>
        <p style={{ fontWeight: '600' }}>
          {_org?.metricRanges?.find((f) => f.type_id === 21)?.value || '-'}
        </p>
      </div>
      <div className="info">
        <p className="hiq-text-grey">Monthly Web Visits</p>
        <p style={{ fontWeight: '600' }}>
          {formatNumber(_org?.metrics?.find((f) => f.type_id === 12)?.value) ||
            '-'}
        </p>
      </div>
      <div>
        {/* <div
          style={{
            display: 'flex',
            marginTop: '15px',
            justifyContent: 'space-between',
          }}
        >
          <H6 style={{ color: '#5c7080' }}>WORKSPACE RATING</H6>
          <Button icon={'eraser'} minimal />
        </div>
        <div style={{ display: 'flex' }}>
          <p style={{ marginRight: '40px' }} className="hiq-text-grey">
            Weighted Total
          </p>
          <Slider
            style={{ cursor: 'default', width: '120px' }}
            value={10}
            labelValues={sliderLabels}
            intent={Intent.PRIMARY}
          />
        </div>
        <RubricSlider /> */}
      </div>
    </div>
  );
};

export default OrgBreifing;
