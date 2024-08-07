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
	indexExtension: boolean;
	extension?: string;
	cssExtension?: string;
	test?: boolean;
	testExtension: string;
	testType?: boolean;
	storybook?: boolean;
	export?: 'named' | 'default';
	functionStyle?: 'function' | 'arrow';
	inlineDefaultExport?: boolean;
	component?: string | null;
	reactTestingLibrary?: boolean;
	jestDomImport?: boolean;
	indexExportPattern: 'explicit' | 'shorthand';
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
		expect(path.join(CWD, 'App/index.js')).toBeFile();

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.jsx')).toBeFile();

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.css')).toBeFile();
	});

	it('should be able to use different types of file naming patterns', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		await tps.render(CWD, 'nav_item');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'nav_item')).toBeDirectory();

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'nav_item/index.js')).toBeFile();

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'nav_item/nav_item.jsx')).toBeFile();

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'nav_item/nav_item.css')).toBeFile();
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
			App component
		</div>
	);
};

export default App;
`);
	});

	// default
	describe('component', () => {
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
				cssExtension: 'module.css',
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
				cssExtension: 'module.less',
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/App.jsx')).toHaveFileContents(
				"import styles from './App.module.less';",
			);
		});

		it('should always use pascal case for component name', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			await tps.render(CWD, 'nav_item');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'nav_item/nav_item.jsx')).toHaveFileContents(
				`function NavItem`,
			);
		});

		it('should always use pascal case in component contents', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			await tps.render(CWD, 'nav-item');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'nav-item/nav-item.jsx')).toHaveFileContents(
				`NavItem component`,
			);
		});

		it('should be able to use default export', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			tps.setAnswers({
				export: 'default',
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/App.jsx')).toHaveFileContents(`\
import React, { useEffect, useState } from 'react';
import './App.css';

function App({}) {
	return (
		<div>
			App component
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
			App component
		</div>
	);
};
`);
		});

		it('should ignore inlineDefaultExport when export is not default', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			tps.setAnswers({
				export: 'named',
				inlineDefaultExport: true,
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/App.jsx')).toHaveFileContents(`\
import React, { useEffect, useState } from 'react';
import './App.css';

export function App({}) {
	return (
		<div>
			App component
		</div>
	);
};
`);
		});

		it('should ignore inlineDefaultExport when functionStyle is arrow', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			tps.setAnswers({
				export: 'default',
				inlineDefaultExport: true,
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
			App component
		</div>
	);
};

export default App;
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
			App component
		</div>
	);
};

export default App;
`);
		});

		it('should be able to use named export', async () => {
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
			App component
		</div>
	);
};
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
			App component
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
			App component
		</div>
	);
};

export default App;
`);
		});
	});

	describe('test', () => {
		it('should support test file', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			tps.setAnswers({
				test: true,
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/App.test.jsx')).toHaveFileContents(`\
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
	it('should render the component', () => {
		render(<App />);

		expect(screen.getByText('App component')).toBeInTheDocument();
	});
});
`);
		});

		it('should support different export statements in tests', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			tps.setAnswers({
				test: true,
				export: 'named',
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/App.test.jsx')).toHaveFileContents(`\
import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
	it('should render the component', () => {
		render(<App />);

		expect(screen.getByText('App component')).toBeInTheDocument();
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

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/App.test.tsx')).toHaveFileContents(`\
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
	it('should render the component', () => {
		render(<App />);

		expect(screen.getByText('App component')).toBeInTheDocument();
	});
});
`);
		});

		it('should support be able to not use react testing library', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			tps.setAnswers({
				test: true,
				reactTestingLibrary: false,
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/App.test.jsx')).toHaveFileContents(`\
import React from 'react';
import App from './App';

describe('App', () => {
	it('should render the component', () => {
		<App />
	});
});
`);
		});

		it('should support test file with react testing library and jest dom import', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			tps.setAnswers({
				test: true,
				reactTestingLibrary: true,
				jestDomImport: true,
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/App.test.jsx')).toHaveFileContents(`\
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
	it('should render the component', () => {
		render(<App />);

		expect(screen.getByText('App component')).toBeInTheDocument();
	});
});
`);
		});
	});
	describe('index', () => {
		it('should be able to use index file', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			tps.setAnswers({
				index: true,
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/index.js')).toHaveFileContents(`\
export { default } from './App';
`);
		});

		it('should strip ending x in the index file for jsx extensions', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			tps.setAnswers({
				index: true,
				extension: 'jsx',
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/index.js')).toBeFile();
		});

		it('should strip ending x in the index file for tsx extensions', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			tps.setAnswers({
				index: true,
				extension: 'tsx',
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/index.ts')).toBeFile();
		});

		it('should be able to use index file with explicit export', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			tps.setAnswers({
				index: true,
				indexExportPattern: 'explicit',
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/index.js')).toHaveFileContents(`\
import App from './App';
export default App;
`);
		});

		it('should support named export import statement', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			tps.setAnswers({
				index: true,
				export: 'named',
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/index.js')).toHaveFileContents(`\
export * from './App';
`);
		});

		it('should support named export import statement with explicit import', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			tps.setAnswers({
				index: true,
				export: 'named',
				indexExportPattern: 'explicit',
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/index.js')).toHaveFileContents(`\
import { App } from './App';
export { App };
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
	});

	describe('storybook', () => {
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
import App from './App';

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

		it('should support differnt types of exports in storybook', async () => {
			const tps = new Templates<ReactComponentAnswers>('react-component', {
				default: true,
			});

			tps.setAnswers({
				storybook: true,
				export: 'named',
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
import App from './App';

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
	});

	it('should be able to use set a base component', async () => {
		const tps = new Templates<ReactComponentAnswers>('react-component', {
			default: true,
		});

		tps.setAnswers({
			component: 'Box',
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/App.jsx')).toHaveFileContents(`\
import React, { useEffect, useState } from 'react';
import './App.css';

function App({}) {
	return (
		<Box>
			App component
		</Box>
	);
};

export default App;
`);
	});
});
