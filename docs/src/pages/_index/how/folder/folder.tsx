import React, { useLayoutEffect, useState } from 'react';
import { animated, useTrail } from '@react-spring/web';
import { FileSystemRow } from './fileSystemRow';
import styles from './folder.module.css';

interface FolderProps {
	name: string;
	children?: React.ReactNode[];
	delay?: number;
	start?: boolean;
	animation?: boolean;
	key?: string;
}

export const Folder = ({
	children = [],
	name,
	key = null,
	delay = null,
	start = null,
	animation = true,
}: FolderProps) => {
	const items = React.Children.toArray(children);
	const [end, setEnd] = useState(false);

	const [trails, api] = useTrail(
		items.length,
		() => ({
			x: animation ? -15 : 0,
			y: animation ? -15 : 0,
			opacity: animation ? 0 : 1,
		}),
		[animation],
	);

	useLayoutEffect(() => {
		if (!animation) setEnd(true);
	}, [animation]);

	useLayoutEffect(() => {
		if (!animation) return;
		if (end && children.length) {
			api.start({
				to: {
					x: 0,
					y: 0,
					opacity: 1,
				},
				delay: 10,
				config: {
					duration: 500,
				},
			});
		}
	}, [end, children, animation]);

	return (
		<div className={styles.folder}>
			<FileSystemRow
				name={name}
				slash
				delay={delay}
				start={start}
				animation={animation}
				onEnd={() => {
					setEnd(true);
				}}
			/>
			<div className={styles.folderChildren}>
				{trails.map((style, i) => {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const item: any = items[i];
					return (
						// eslint-disable-next-line react/no-array-index-key
						<animated.div key={`${key || name}_${i}`} style={style}>
							{React.cloneElement(item, {
								delay: item?.props?.delay || 0,
								start,
								animation,
							})}
						</animated.div>
					);
				})}
			</div>
		</div>
	);
};
