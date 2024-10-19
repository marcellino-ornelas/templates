import React, { useEffect, useState } from 'react';
import { Badge } from '@site/docs/components/badges/badge';

interface VersionBadgeProps {
	version: string;
}

export const VersionBadge = ({ version }: VersionBadgeProps) => {
	return <Badge type="secondary">templates@{version}</Badge>;
};
