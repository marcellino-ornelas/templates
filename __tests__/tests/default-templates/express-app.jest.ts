/*
 * Modules
 */
import Templates from '@tps/templates';
import { CWD } from '@tps/utilities/constants';
import { reset } from '@test/utilities/vol';
import path from 'path';
import { sync } from 'cross-spawn';
// import { mockConsoleLog } from '@test/utilities/mocks';

interface ExpressAppAnswers {
	port: string | number;
	packageManager?: 'npm' | 'yarn';
	api?: boolean;
	typescript: true;
}

jest.mock('fs');

jest.mock('cross-spawn');

describe('Express app', () => {
	beforeEach(() => {
		// mockConsoleLog();
		jest.resetAllMocks();
		reset();
	});

	it('should be able to render the express app template', async () => {
		const tps = new Templates<ExpressAppAnswers>('express-app', {
			default: true,
		});

		await tps.render(CWD, 'app');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'app')).toBeDirectory();
	});

	it('should use javascript files by default', async () => {
		const tps = new Templates<ExpressAppAnswers>('express-app', {
			default: true,
		});

		await tps.render(CWD, 'app');

		const jsFiles = [
			path.join(CWD, 'app/src/app.js'),
			path.join(CWD, 'app/src/middlewares/error-handler.js'),
			path.join(CWD, 'app/src/config/constrants.js'),
			path.join(CWD, 'app/src/routes/index.js'),
		];

		jsFiles.forEach((file) => {
			// @ts-expect-error no types for extending jest functions
			expect(file).toBeFile();
		});
	});

	it('should use npm scripts to support javascript', async () => {
		const tps = new Templates<ExpressAppAnswers>('express-app', {
			default: true,
		});

		await tps.render(CWD, 'app');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'app/package.json')).toHaveFileContents(
			'"main": "src/app.js",',
		);

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'app/package.json')).toHaveFileContents(
			`\
	"scripts": {
		"test": "echo \\"Error: no test specified\\" && exit 1",
		"start": "node src/app.js",
		"dev": "nodemon src/app.js"
	},`,
		);
	});

	describe('port', () => {
		it('should support custom ports', async () => {
			const tps = new Templates<ExpressAppAnswers>('express-app', {
				default: true,
			});

			tps.setAnswers({ port: 5000 });

			await tps.render(CWD, 'app');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app/.env')).toHaveFileContents('PORT=5000');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app/.env')).toHaveFileContents(
				'CLIENT_URL=http://localhost:5000',
			);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app/src/app.js')).toHaveFileContents(
				'const PORT = process.env.PORT || 5000;',
			);
		});

		it('should support custom port when port is string', async () => {
			const tps = new Templates<ExpressAppAnswers>('express-app', {
				default: true,
			});

			tps.setAnswers({ port: '5000' });

			await tps.render(CWD, 'app');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app/.env')).toHaveFileContents('PORT=5000');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app/.env')).toHaveFileContents(
				'CLIENT_URL=http://localhost:5000',
			);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app/src/app.js')).toHaveFileContents(
				'const PORT = process.env.PORT || 5000;',
			);
		});
	});

	describe('api', () => {
		it('should be able to add an api route', async () => {
			const tps = new Templates<ExpressAppAnswers>('express-app', {
				default: true,
			});

			tps.setAnswers({ api: true });

			await tps.render(CWD, 'app');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app')).toBeDirectory();

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app/src/app.js')).toHaveFileContents(
				"import apiRouter from './api/index.js",
			);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app/src/app.js')).toHaveFileContents(`\
// === Routes ===

app.use('/', router);

app.use('/api', apiRouter);

// === Error Handling ===
`);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app/src/api/index.js')).toBeFile();
		});

		it('should be able to not add an API route', async () => {
			const tps = new Templates<ExpressAppAnswers>('express-app', {
				default: true,
			});

			tps.setAnswers({ api: false });

			await tps.render(CWD, 'app');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app')).toBeDirectory();

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app/src/app.js')).not.toHaveFileContents(
				"import apiRouter from './api/index.js",
			);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app/src/app.js')).toHaveFileContents(`\
// === Routes ===

app.use('/', router);

// === Error Handling ===
`);
		});
	});

	describe('packageManager', () => {
		it('should be able to render the express app template with npm', async () => {
			const tps = new Templates<ExpressAppAnswers>('express-app', {
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

		it('should be able to render the express app template with yarn', async () => {
			const tps = new Templates<ExpressAppAnswers>('express-app', {
				default: true,
			});

			tps.setAnswers({ packageManager: 'yarn' });

			await tps.render(CWD, 'app');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app')).toBeDirectory();

			expect(sync).toBeCalledWith(
				'yarn',
				['install', '--cwd', path.join(CWD, 'app')],
				expect.objectContaining({}),
			);
		});
	});

	describe('typescript', () => {
		it('should use npm scripts to support javascript', async () => {
			const tps = new Templates<ExpressAppAnswers>('express-app', {
				default: true,
			});

			tps.setAnswers({
				typescript: true,
			});

			await tps.render(CWD, 'app');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app/package.json')).toHaveFileContents(
				'"main": "dist/app.js",',
			);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app/package.json')).toHaveFileContents(
				`\
	"scripts": {
		"test": "echo \\"Error: no test specified\\" && exit 1",
		"start": "node dist/app.js",
		"build": "tsc",
		"dev": "tsc && nodemon dist/app.js",
		"serve": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/app.ts"
	},`,
			);
		});
	});
});
