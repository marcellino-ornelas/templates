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

		await tps.render(CWD, 'app');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'app')).toBeDirectory();
	});

	describe('api', () => {
		it('should be able to add an api route', async () => {
			const templateName = 'express-app';

			const tps = new Templates<ExpressAppAnswers>(templateName, {
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
			const templateName = 'express-app';

			const tps = new Templates<ExpressAppAnswers>(templateName, {
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
			const templateName = 'express-app';

			const tps = new Templates<ExpressAppAnswers>(templateName, {
				default: true,
			});

			tps.setAnswers({ packageManager: 'npm' });

			await tps.render(CWD, 'app');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app')).toBeDirectory();

			expect(sync).toBeCalledWith('npm', [
				'install',
				'--prefix',
				path.join(CWD, 'app'),
			]);
		});

		it('should be able to render the express app template with yarn', async () => {
			const templateName = 'express-app';

			const tps = new Templates<ExpressAppAnswers>(templateName, {
				default: true,
			});

			tps.setAnswers({ packageManager: 'yarn' });

			await tps.render(CWD, 'app');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'app')).toBeDirectory();

			expect(sync).toBeCalledWith('yarn', [
				'install',
				'--cwd',
				path.join(CWD, 'app'),
			]);
		});
	});
});
