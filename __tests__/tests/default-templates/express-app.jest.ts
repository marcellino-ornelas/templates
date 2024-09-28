/*
 * Modules
 */
import Templates from '@tps/templates';
import { CWD } from '@tps/utilities/constants';
import { reset } from '@test/utilities/vol';
import path from 'path';
import { sync } from 'cross-spawn';

interface ExpressAppAnswers {
	packageManager?: 'npm' | 'yarn';
	api?: boolean;
}

jest.mock('fs');

jest.mock('cross-spawn');

describe('Express app', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		reset();
	});

	it('should be able to render the express app template', async () => {
		const templateName = 'express-app';

		const tps = new Templates<ExpressAppAnswers>(templateName, {
			default: true,
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App')).toBeDirectory();
	});

	describe('api', () => {
		it('should be able to add an api route', async () => {
			const templateName = 'express-app';

			const tps = new Templates<ExpressAppAnswers>(templateName, {
				default: true,
			});

			tps.setAnswers({ api: true });

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App')).toBeDirectory();

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/src/app.js')).toHaveFileContents(
				"import apiRouter from './api/index.js",
			);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/src/app.js')).toHaveFileContents(`\
// === Routes ===

app.use('/', router);

app.use('/api', apiRouter);

// === Error Handling ===
`);
		});

		it('should be able to not add an API route', async () => {
			const templateName = 'express-app';

			const tps = new Templates<ExpressAppAnswers>(templateName, {
				default: true,
			});

			tps.setAnswers({ api: false });

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App')).toBeDirectory();

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/src/app.js')).not.toHaveFileContents(
				"import apiRouter from './api/index.js",
			);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/src/app.js')).toHaveFileContents(`\
// === Routes ===

app.use('/', router);

// === Error Handling ===
`);
		});
	});

	it('should be able to render the express app template with npm', async () => {
		const templateName = 'express-app';

		const tps = new Templates<ExpressAppAnswers>(templateName, {
			default: true,
		});

		tps.setAnswers({ packageManager: 'npm' });

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App')).toBeDirectory();

		expect(sync).toBeCalledWith('npm', [
			'install',
			'--prefix',
			path.join(CWD, 'App'),
		]);
	});

	it('should be able to render the express app template with yarn', async () => {
		const templateName = 'express-app';

		const tps = new Templates<ExpressAppAnswers>(templateName, {
			default: true,
		});

		tps.setAnswers({ packageManager: 'yarn' });

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App')).toBeDirectory();

		expect(sync).toBeCalledWith('yarn', [
			'install',
			'--cwd',
			path.join(CWD, 'App'),
		]);
	});
});
