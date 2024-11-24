import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './CommunityTemplates.module.css';
import CommunityImg from './community.svg';

export const CommunityTemplates = () => {
	return (
		<div className={styles.CommunityTemplateContainer}>
			<div className={clsx('container', styles.communityInnerContainer)}>
				<div className="display--flex justify-content--center">
					<CommunityImg className={styles.communityImg} title="community" />
				</div>
				<h2 className={clsx('text--center', styles.communityHeader)}>
					Explore Our Templates
				</h2>
				<p className="text--center">
					Discover our growing library of templates, from full applications to
					modular components you can easily integrate into your projects. Save
					time and focus on building what&apos;s next
				</p>

				<div className="container display--flex justify-content--center">
					<div>
						<Link
							className="button button--primary button--lg"
							to="/docs/main/templates"
						>
							Browse Templates
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
