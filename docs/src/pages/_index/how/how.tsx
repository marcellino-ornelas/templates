import React from 'react';
import { HowResult } from './howResult';
import { HowTemplate } from './howTemplate';
import { HowTerminal } from './howTerminal';

export const How = () => {
	return (
		<div>
			<HowTemplate />

			<HowTerminal />

			<HowResult />
		</div>
	);
};
