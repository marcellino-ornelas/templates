import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { ConfigProvider, theme } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useColorMode } from '@docusaurus/theme-common';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { PlaygroundTps } from '@site/types/playground';
import { Editors } from './_editors';
import { Options } from './_options';

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
	const isDarkTheme = useColorMode().colorMode === 'dark';
	const [all, setAll] = useState<PlaygroundTps>({
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

				<BrowserOnly>
					{() => <Editors answers={answers} name={all.name} />}
				</BrowserOnly>
			</div>
		</ConfigProvider>
	);
};
