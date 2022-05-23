import { useAuth0 } from '@auth0/auth0-react';
import { Button, ButtonGroup, Toaster, Tooltip } from '@blueprintjs/core';
import React, { useState } from 'react';

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
  console.log(itemType);

  const { user, getIdTokenClaims } = useAuth0();
  const [isSaving, setIsSaving] = useState(false);

  const getSaveButton = () => {
    if (!org || itemType !== 'Organization' || org.length === 0)
      return (
        <Button
          style={{
            alignSelf: 'end',
            marginRight: '10px',
            marginTop: '30px',
          }}
          onClick={handleSave}
          loading={isSaving}
        >
          {itemType === 'Organization' ? 'Send' : 'Save'}
        </Button>
      );
  };
  const handleSave = () => {
    setIsSaving(true);

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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <ButtonGroup fill style={{ padding: '5p' }}>
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
      {getSaveButton()}
    </div>
  );
};

export default SubmitNavBar;
