/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { useTrail } from '@react-spring/web';
import { HowResult } from './howResult';
import { HowTemplate } from './howTemplate';
import { HowTerminal } from './howTerminal';

export const How = () => {
  const [trails, api] = useTrail(
    2,
    () => ({
      from: { x: -30, y: -50 },
      to: { x: 0, y: 0 },
      config: {},
    }),
    []
  );

  return (
    <div>
      <h2>How it works</h2>
      <HowTemplate />

      <HowTerminal />

      <HowResult />
    </div>
  );
};
