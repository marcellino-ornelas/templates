import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { How } from './how';

import styles from './index.module.css';

const HomepageHeader = () => {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={clsx('hero', styles.heroBanner)}>
			<div className="container">
				<h1 className="hero__title">{siteConfig.title}</h1>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				<div className={styles.buttons}>
					<Link
						className="button button--secondary button--lg"
						to="/docs/main/intro"
					>
						View docs
					</Link>
				</div>
			</div>
		</header>
	);
};

const Home = (): JSX.Element => {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={siteConfig.title}
			description="Templates is a powerful filesystem generator that aims to simplify
	  the process of getting started with and maintaining code
	  applications"
		>
			<HomepageHeader />

			<main>
				<div className={styles.introduction}>
					<p className="container">
						Templates is a powerful filesystem generator that aims to simplify
						the process of getting started with and maintaining code
						applications. Its purpose is to provide developers with a friendly
						tool that streamlines their common day-to-day workflows. The
						versatility of templates extends to various scenarios, such as
						creating web applications in any programming language or generating
						new sections within a project, such as web controllers with unit
						tests or React components integrated with Redux and TypeScript.
					</p>
				</div>

				{/* <HomepageFeatures /> */}

				<How />
			</main>
		</Layout>
	);
};

export default Home;
