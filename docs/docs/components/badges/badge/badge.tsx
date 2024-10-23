import React from 'react';

interface BadgeProps {
	type?: 'primary' | 'success' | 'secondary';
	className?: string;
	children: React.ReactNode;
}

export const Badge = ({
	children = null,
	type = 'primary',
	className = '',
}: BadgeProps) => {
	return (
		<span className={`badge badge--${type} ${className}`}>{children}</span>
	);
};
