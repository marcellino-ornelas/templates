import React, { PropsWithChildren, JSX } from 'react';
import './button..module.css';
import Link from '@docusaurus/Link';

interface Props extends PropsWithChildren {
	to?: string;
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
			{children}
		</Link>
	) : (
		<button type="button" {...props}>
			{children}
		</button>
	);
};
