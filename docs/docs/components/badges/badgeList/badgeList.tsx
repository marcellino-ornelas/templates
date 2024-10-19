import React, { useEffect, useState } from 'react';
import styles from './badgeList.module.css';

interface BadgeListProps {
	children: React.ReactNode;
}

export const BadgeList = ({ children }: BadgeListProps) => {
	const badges = React.Children.map(children, (child) => {
		return <div className={styles.badgeListItem}>{child}</div>;
	});
	return <div className={styles.badgeList}>{badges}</div>;
};
