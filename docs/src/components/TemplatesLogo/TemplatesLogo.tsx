import React, { useEffect, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

interface TemplatesLogoProps {
	// props
	white: boolean;
}

export const TemplatesLogo = ({ white = false }: TemplatesLogoProps) => {
	return (
		<ThemedImage
			alt="Docusaurus themed image"
			width={200}
			sources={{
				light: white
					? useBaseUrl('/img/templates-logo-dark.svg')
					: useBaseUrl('/img/templates-logo.svg'),
				dark: useBaseUrl('/img/templates-logo-dark.svg'),
			}}
		/>
	);
};
