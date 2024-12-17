import React from 'react';
import { Badge } from '@site/docs/components/badges/badge';

interface VersionBadgeProps {
	version: string;
	library: string;
}

export const VersionBadge = ({
	version,
	library = 'templates',
}: VersionBadgeProps) => {
	return (
		<Badge type="secondary">
			{library}@{version}
		</Badge>
	);
};
