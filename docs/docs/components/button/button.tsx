import React, { PropsWithChildren } from 'react';
import Link from '@docusaurus/Link';

interface Props extends PropsWithChildren {
	to?: string;
	text?: React.ReactNode;
	size?: 'lg' | 'sm';
	onClick: () => void;
	color?:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'info'
		| 'warning'
		| 'danger'
		| 'link';
}

export const Button = ({
	to,
	size,
	children,
	text,
	onClick,
	color = 'primary',
}: Props) => {
	let className = `button button--${color}`;

	if (size) {
		className = `${className} button--${size} `;
	}

	const props = {
		className,
		onClick,
		style: {
			textDecoration: 'none',
		},
	};

	return to ? (
		<Link to={to} {...props}>
			{text || children}
		</Link>
	) : (
		<button type="button" {...props}>
			{text || children}
		</button>
	);
};
