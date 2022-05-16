import { useAuth0 } from '@auth0/auth0-react';
import { Button, Toaster } from '@blueprintjs/core';
import React, { useState } from 'react';

const AlarmToaster = Toaster.create({
  className: 'recipe-toaster',
  position: 'bottom-left',
  maxToasts: 1,
});

const SaveButton = (type) => {
  //   console.log(email, type);
  const { user, getIdTokenClaims } = useAuth0();
  const { email } = user;
  const [isSaving, setIsSaving] = useState(false);
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
    <div>
      <Button
        style={{ textAlign: 'right', marginRight: '10px', marginTop: '30px' }}
        onClick={handleSave}
        loading={isSaving}
      >
        Save
      </Button>
    </div>
  );
};

export default SaveButton;
