import React from 'react';
import Details from '@theme/Details';

interface Props {
	children: React.ReactNode;
	open?: boolean;
	title?: string;
}

export const Example = ({ children, open = false, title = '' }: Props) => {
	const summary = title ? `Example: ${title}` : 'Example';

	return (
		<Details summary={summary} open={open}>
			<div>{children}</div>
		</Details>
	);
};
