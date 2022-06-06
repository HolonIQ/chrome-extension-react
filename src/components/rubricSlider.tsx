import { FormGroup, Slider } from '@blueprintjs/core';
import React, { useState } from 'react';
import './components.css';

export const RubricSlider = (title: string, score: string) => {
  const [value, setValue] = useState<number>(6);

  return (
    <FormGroup>
      <div style={{ display: 'flex' }}>
        <p style={{ marginRight: '40px' }} className="hiq-text-grey">
          testing
        </p>

        <Slider
          value={value}
          min={0}
          max={10}
          stepSize={0.1}
          labelStepSize={5}
          showTrackFill
          intent="success"
          onChange={setValue}
          //   labelRenderer={(_label, opts) => (
          //     <HiqTypography variant="div" strong={opts?.isHandleTooltip} loading={opts?.isHandleTooltip && loading} loadingWidth={15}>
          //       {formatNumber(_label, false, decimalPlace)}
          //     </HiqTypography>
          //   )}
          //   onRelease={onChange}
        />
      </div>
    </FormGroup>
  );
};
