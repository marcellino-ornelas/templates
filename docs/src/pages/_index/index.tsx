import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { TemplatesLogo } from '@site/src/components/TemplatesLogo';
import { How } from './how';
import { CommunityTemplates } from './CommunityTemplates';
import { PopularTemplates } from './PopularTemplates';
import styles from './index.module.css';

const HomepageHeader = () => {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={clsx('hero', styles.heroBanner)}>
			<div className="container">
				<TemplatesLogo white />
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
						Templates is a scaffolding framework built to streamline development
						workflows. It makes code generation simple, dynamic, and
						reusable—whether you&apos;re scaffolding individual files, parts of
						your application, or full project structures. Say goodbye to
						copy-pasting code and let Templates handle the heavy lifting, so you
						can focus on building what matters!
					</p>
				</div>

				{/* <HomepageFeatures /> */}

				<CommunityTemplates />

				<PopularTemplates />

				<How />
			</main>
		</Layout>
	);
};

export default Home;
