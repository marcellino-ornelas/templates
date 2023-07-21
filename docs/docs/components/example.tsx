import React from 'react';
import Details from '@theme/Details';

export const Example = ({ children, open = false, title = '' }) => {
  const summary = title ? `Example: ${title}` : 'Example';

  return (
    <Details summary={summary} open={open}>
      <div>{children}</div>
    </Details>
  );
};
