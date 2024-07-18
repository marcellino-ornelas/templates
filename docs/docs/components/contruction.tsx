import React from 'react';
import Admonition from '@theme/Admonition';
import { Icon } from '@iconify/react/dist/iconify.cjs';

export const Contruction = () => {
	return (
		<Admonition
			type="caution"
			icon={<Icon icon="material-symbols:construction" />}
			title="Under Construction"
		>
			This page is under construction, but we are working hard to improve it.
		</Admonition>
	);
};
