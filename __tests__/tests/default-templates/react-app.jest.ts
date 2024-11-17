/*
 * Modules
 */
import Templates from '@tps/templates';
import { CWD } from '@tps/utilities/constants';
import { reset } from '@test/utilities/vol';
import path from 'path';
import { sync } from 'cross-spawn';

interface ReactAppAnswers {
	packageManager?: 'npm' | 'yarn';
	typescript: boolean;
}

jest.mock('fs');
jest.mock('cross-spawn');

describe('React app', () => {
	beforeEach(() => {
		reset();
	});

	it('should be able to render an react app', async () => {
		const tps = new Templates<ReactAppAnswers>('react-app', { default: true });

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App')).toBeDirectory();
	});

	it('should be able to render name in README', async () => {
		const tps = new Templates<ReactAppAnswers>('react-app', { default: true });

		await tps.render(CWD, 'food-app');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'food-app/README.md')).toHaveFileContents(
			'# Food App',
		);
	});

	describe('packageManager', () => {
		it('should be able to render the express app template with npm', async () => {
			const tps = new Templates<ReactAppAnswers>('react-app', {
				default: true,
			});

			tps.setAnswers({ packageManager: 'npm' });

			await tps.render(CWD, 'app');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app')).toBeDirectory();

			expect(sync).toBeCalledWith(
				'npm',
				['install', '--prefix', path.join(CWD, 'app')],
				expect.objectContaining({}),
			);
		});
	});

	describe('typescript', () => {
		it('should use js files by default', async () => {
			const tps = new Templates<ReactAppAnswers>('react-app', {
				default: true,
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App')).toHaveAllFilesAndDirectories([
				'./src/index.js',
				'./src/App.test.js',
				'./src/App.js',
				'./src/routes/Home/index.js',
				'./src/routes/Home/Home.js',
				'./src/routes/Home/Home.test.js',
				'./src/reportWebVitals.js',
				'./src/setupTests.js',
			]);
		});

		it('should use ts(x) files when typescript is true', async () => {
			const tps = new Templates<ReactAppAnswers>('react-app', {
				default: true,
			});

			tps.setAnswers({
				typescript: true,
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App')).toHaveAllFilesAndDirectories([
				'./src/index.tsx',
				'./src/App.test.tsx',
				'./src/App.tsx',
				'./src/routes/Home/index.ts',
				'./src/routes/Home/Home.tsx',
				'./src/routes/Home/Home.test.tsx',
				'./src/reportWebVitals.ts',
				'./src/setupTests.ts',
			]);
		});

		it('should not add html type in src/index.js', async () => {
			const tps = new Templates<ReactAppAnswers>('react-app', {
				default: true,
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/src/index.js')).toHaveFileContents(`\
const root = ReactDOM.createRoot(
	document.getElementById('root')
);`);
		});

		it('should add html type in src/index.js', async () => {
			const tps = new Templates<ReactAppAnswers>('react-app', {
				default: true,
			});

			tps.setAnswers({
				typescript: true,
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/src/index.tsx')).toHaveFileContents(`\
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);`);
		});

		it('should not add type in src/reportWebVitals.js', async () => {
			const tps = new Templates<ReactAppAnswers>('react-app', {
				default: true,
			});

			await tps.render(CWD, 'App');

			expect(
				path.join(CWD, 'App/src/reportWebVitals.js'),
				// @ts-expect-error no types for extending jest functions
			).not.toHaveFileContents(`import { ReportHandler } from 'web-vitals';`);
		});

		it('should add type in src/reportWebVitals.ts', async () => {
			const tps = new Templates<ReactAppAnswers>('react-app', {
				default: true,
			});

			tps.setAnswers({
				typescript: true,
			});

			await tps.render(CWD, 'App');

			expect(path.join(CWD, 'App/src/reportWebVitals.ts'))
				// prettier-ignore
				// @ts-expect-error no types for extending jest functions
				.toHaveFileContents(`\
import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
`);
		});

		it('should not add type in src/reportWebVitals.js', async () => {
			const tps = new Templates<ReactAppAnswers>('react-app', {
				default: true,
			});

			await tps.render(CWD, 'App');

			expect(
				path.join(CWD, 'App/src/reportWebVitals.js'),
				// @ts-expect-error no types for extending jest functions
			).not.toHaveFileContents(`import { ReportHandler } from 'web-vitals';`);
		});
	});
});
