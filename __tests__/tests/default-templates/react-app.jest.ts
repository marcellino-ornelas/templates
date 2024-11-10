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
}

jest.mock('fs');
jest.mock('cross-spawn');

describe('React app', () => {
	beforeEach(() => {
		reset();
	});

	it('should be able to render an react app', async () => {
		const tps = new Templates('react-app', { default: true });

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App')).toBeDirectory();
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
});
