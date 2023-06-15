import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />

      <main>
        <div>
          <p>
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
      </main>
    </Layout>
  );
}
