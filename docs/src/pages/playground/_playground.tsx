import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { ConfigProvider, Divider, theme, ThemeConfig } from 'antd';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useColorMode } from '@docusaurus/theme-common';
import { Editors } from './_editors';
import { Options } from './_options';
import styles from './playground.module.css';

const { defaultAlgorithm, darkAlgorithm } = theme;

export const Playground = () => {
  return (
    <Layout
      title="Template playground"
      description="Test out dot file changes in browser"
    >
      <PlaygroundContents />
    </Layout>
  );
};

const PlaygroundContents = () => {
  const { isDarkTheme } = useColorMode();
  const [all, setAll] = useState<any>({
    name: 'App',
    prompts: [
      {
        type: 'confirm',
        name: 'css',
        value: true,
      },
      {
        type: 'input',
        name: 'cssType',
        value: 'css',
      },
    ],
  });

  const answers = React.useMemo(() => {
    return all?.prompts
      ?.filter((prompt) => !!prompt.name)
      .reduce((acc, prompt) => {
        acc[prompt.name] = prompt.value;
        return acc;
      }, {});
  }, [all]);

  const onChange = React.useCallback((data) => {
    setAll(data);
  }, []);

  return (
    <ConfigProvider
      theme={{ algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm }}
    >
      <div className="margin--md">
        <h2 className="container margin-bottom--md">
          Playground
          <span className="badge badge--success margin-left--sm">Beta</span>
        </h2>
        <Options onChange={onChange} initialState={all} />
        <Editors answers={answers} name={all.name} />
      </div>
    </ConfigProvider>
  );
};
