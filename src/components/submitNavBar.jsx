import { useAuth0 } from '@auth0/auth0-react';
import {
  Button,
  ButtonGroup,
  FormGroup,
  InputGroup,
  Toaster,
  Tooltip,
} from '@blueprintjs/core';
import React, { useCallback, useEffect, useState } from 'react';

const AlarmToaster = Toaster.create({
  className: 'recipe-toaster',
  position: 'bottom-left',
  maxToasts: 1,
});

const SubmitNavBar = ({ org }) => {
  const [itemType, setItemType] = useState('Organization');
  const itemTypes = ['Organization', 'Signal'];
  const itemIcons = {
    Organization: 'social-media',
    Signal: 'pulse',
  };
  // console.log(itemType);
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const { user, getIdTokenClaims } = useAuth0();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    AlarmToaster.show({
      intent: 'success',
      message: `Submitted`,
      timeout: 2000,
    });
    setIsSaving(false);

    //   Axios.post(process.env.NEWS_API, { news_url, user_email: email })
    //     .then(({ data: apiRes }) => {
    //       if (apiRes.success) {
    //         AlarmToaster.show({
    //           intent: 'success',
    //           message: `Submitted ${apiRes.duplicated ? '(Exists)' : ''}`,
    //         });
    //       } else {
    //         AlarmToaster.show({
    //           intent: 'danger',
    //           message: 'Submit Failed',
    //         });
    //       }

    //       setIsSaving(false);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       setIsSaving(false);
    //       AlarmToaster.show({
    //         intent: 'danger',
    //         message: 'Submit Failed',
    //       });
    //     });
  };
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    setTitle(tabs[0].title.toString() || 'Title');
  });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    setUrl(tabs[0].url.toString() || 'URL');
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <ButtonGroup fill style={{ padding: '0px 5px' }}>
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
      {(!org || itemType !== 'Organization' || org.length === 0) && (
        <div
          style={{
            padding: 10,
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          <FormGroup label="TITLE" labelInfo="(required)">
            {title && (
              <InputGroup
                defaultValue={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            )}
          </FormGroup>
          <FormGroup label="URL" labelInfo="(required)">
            {url && (
              <InputGroup
                defaultValue={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                }}
              />
            )}
          </FormGroup>
          <Button
            style={{
              alignSelf: 'end',
              marginTop: '20px',
            }}
            onClick={handleSave}
            loading={isSaving}
          >
            {itemType === 'Organization' ? 'Send' : 'Save'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubmitNavBar;
