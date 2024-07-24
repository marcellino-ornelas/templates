/*
 * Modules
 */
import Templates from '@tps/templates';
import { CWD } from '@tps/utilities/constants';
import { reset } from '@test/utilities/vol';
import path from 'path';

interface ReactComponentAnswers {
	typescript?: boolean;
	css?: boolean;
	index?: boolean;
	extension?: string;
	cssType?: string;
	test?: boolean;
	testType?: boolean;
	storybook?: boolean;
	export?: 'named' | 'default';
	functionStyle?: 'function' | 'arrow';
	inlineDefaultExport?: boolean;
	// component?: string | null;
}

jest.mock('fs');

describe('React component', () => {
	beforeEach(() => {
		reset();
	});

	it('should be able to render a react component', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App')).toBeDirectory();

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/index.jsx')).toBeFile();

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.jsx')).toBeFile();

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.css')).toBeFile();
	});

	it('should have correct component contents', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.jsx')).toHaveFileContents(`\
import React, { useEffect, useState } from 'react';
import './App.css';

function App({}) {
	return (
		<div>
			{/* ... */}
		</div>
	);
};

export default App;
`);
	});

	it('should be able to use inline default export', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			export: 'default',
			inlineDefaultExport: true,
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.jsx')).toHaveFileContents(`\
import React, { useEffect, useState } from 'react';
import './App.css';

export default function App({}) {
	return (
		<div>
			{/* ... */}
		</div>
	);
};
`);
	});

	it('should be able to use named export with function style', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			export: 'named',
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.jsx')).toHaveFileContents(`\
import React, { useEffect, useState } from 'react';
import './App.css';

export function App({}) {
	return (
		<div>
			{/* ... */}
		</div>
	);
};
`);
	});

	it('should be able to use default export with arrow style', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			export: 'default',
			functionStyle: 'arrow',
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.jsx')).toHaveFileContents(`\
import React, { useEffect, useState } from 'react';
import './App.css';

const App = ({}) => {
	return (
		<div>
			{/* ... */}
		</div>
	);
};

export default App;
`);
	});

	it('should be able to use named export with arrow style', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			export: 'named',
			functionStyle: 'arrow',
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.jsx')).toHaveFileContents(`\
import React, { useEffect, useState } from 'react';
import './App.css';

export const App = ({}) => {
	return (
		<div>
			{/* ... */}
		</div>
	);
};
`);
	});

	it('should be able to use typescript', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			typescript: true,
			extension: 'tsx',
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.tsx')).toHaveFileContents(`\
import React, { useEffect, useState } from 'react';
import './App.css';

interface Props {
	// props
}

function App({}: Props) {
	return (
		<div>
			{/* ... */}
		</div>
	);
};

export default App;
`);
	});

	it('should be able to not use a css file', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			css: false,
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.jsx')).not.toHaveFileContents(
			"import './App.css';",
		);
	});

	it('should support modules css import', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			css: true,
			cssType: 'module.css',
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.jsx')).toHaveFileContents(
			"import styles from './App.module.css';",
		);
	});

	it('should support modules less import', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			css: true,
			cssType: 'module.less',
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.jsx')).toHaveFileContents(
			"import styles from './App.module.less';",
		);
	});

	it('should support test file', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			test: true,
		});

		await tps.render(CWD, 'App');

		// TODO: Should be jsx
		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.test.jsx')).toHaveFileContents(`\
import React from 'react';
import { App } from './App';

describe('App', () => {
	it('first test', () => {
		<App />
	});
});
`);
	});

	it('should support test file with typescript', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			test: true,
			typescript: true,
		});

		await tps.render(CWD, 'App');

		// TODO: Should be tsx
		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.test.tsx')).toHaveFileContents(`\
import React from 'react';
import { App } from './App';

describe('App', () => {
	it('first test', () => {
		<App />
	});
});
`);
	});

	it('should be able to use index file', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			index: true,
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/index.jsx')).toHaveFileContents(`\
export * from './App';
`);
	});

	it('should be able to not use a index file', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			index: false,
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/index.jsx')).not.toBeFile();
	});

	it('should be able to use storybook', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			storybook: true,
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.stories.jsx')).toHaveFileContents(`\
import { App } from './App';

const meta = {
	component: App,
};

export default meta;

export const Primary = {
	args: {
		/* props */
	},
};
`);
	});

	it('should be able to use storybook with typescript', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			storybook: true,
			typescript: true,
			extension: 'tsx',
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.stories.tsx')).toHaveFileContents(`\
import type { Meta, StoryObj } from '@storybook/react';
import { App } from './App';

const meta: Meta<typeof App> = {
	component: App,
};

export default meta;
type Story = StoryObj<typeof App>;

export const Primary: Story = {
	args: {
		/* props */
	},
};
`);
	});

	// 	it('should be able to use set a base component', async () => {
	// 		const tps = new Templates<ReactComponentAnswers>('react-component', {
	// 			default: true,
	// 		});

	// 		tps.setAnswers({
	// 			component: 'Box',
	// 		});

	// 		await tps.render(CWD, 'App');

	// 		// @ts-expect-error no types for extending jest functions
	// 		expect(path.join(CWD, 'App/App.jsx')).toHaveFileContents(`\
	// import React, { useEffect, useState } from 'react';
	// import './App.css';

	// function App({}) {
	// 	return (
	// 		<div>
	// 			{/* ... */}
	// 		</div>
	// 	);
	// };

	// export default App;
	// `);
	// 	});
});
