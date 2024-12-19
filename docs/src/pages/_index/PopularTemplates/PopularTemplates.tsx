import React from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import Link from '@docusaurus/Link';
import styles from './PopularTemplates.module.css';

export const PopularTemplates = () => {
	return (
		<div className={clsx('container', styles.popularTemplatesContainer)}>
			<h2 className={styles.popularHeader}>Featured Templates</h2>
			<div
				className={clsx(
					'row justify-content--space-between',
					styles.popularTemplatesInnerContainer,
				)}
			>
				<div className={clsx('col col--4', styles.popularTemplate)}>
					<Icon
						icon="skill-icons:expressjs-light"
						className={styles.communityImg}
					/>
					<h3>express-app</h3>
					<p className={styles.popularTemplateDescription}>
						Generates a fully functional Express application using ESM modules.
						This template supports TypeScript integration and database
						connectivity, making it easy to start building your backend
						application right away.
					</p>
					<div className={styles.popularTemplateActions}>
						<Link
							className="button button--primary"
							to="/docs/main/templates/express-app"
						>
							view
						</Link>
					</div>
				</div>
				<div className={clsx('col col--4', styles.popularTemplate)}>
					<Icon icon="eos-icons:ai" className={styles.communityImg} />
					<h3>ai</h3>
					<p className={styles.popularTemplateDescription}>
						Generate complete codebases in any programming language,
						configuration files for any library or framework, or anything else
						your heart desires—all powered by AI.
					</p>
					<div className={styles.popularTemplateActions}>
						<Link
							className="button button--primary"
							to="/docs/main/templates/ai"
						>
							view
						</Link>
					</div>
				</div>
				<div className={clsx('col col--4', styles.popularTemplate)}>
					<Icon icon="logos:react" className={styles.communityImg} />
					<h3>react-component</h3>
					<p className={styles.popularTemplateDescription}>
						Generates a React component with full support for TypeScript, React
						Testing Library, and Storybook. This template accommodates various
						CSS languages, exporting styles, and includes options for automatic
						formatting and linting.
					</p>
					<div className={styles.popularTemplateActions}>
						<Link
							className="button button--primary"
							to="/docs/main/templates/react-component"
						>
							view
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
