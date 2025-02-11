/*
 * Modules
 */
import { mkTemplate } from '@test/utilities/templates';
import Templates from '@tps/templates';
import { CWD } from '@tps/utilities/constants';
import { reset, vol } from '@test/utilities/vol';
import path from 'path';

jest.mock('fs');

interface PrettierConfigAnswers {
	type: 'json' | 'js';
	spacing: 'spaces' | 'tab';
	ignore: boolean;
}

describe('Prettier config', () => {
	beforeEach(() => {
		reset();
	});

	it('should render prettier-config', async () => {
		const newCwd = path.join(CWD, 'food-app');

		vol.mkdirSync(newCwd);

		const tps = new Templates<PrettierConfigAnswers>('prettier-config', {
			default: true,
		});

		await tps.render(newCwd);

		// @ts-expect-error no types for extending jest functions
		expect(path.join(newCwd, '.prettierrc')).toBeFile();
	});

	describe('type', () => {
		it('should render a .prettierrc when json ', async () => {
			const newCwd = path.join(CWD, 'food-app');

			vol.mkdirSync(newCwd);

			const tps = new Templates<PrettierConfigAnswers>('prettier-config', {
				default: true,
			});

			tps.setAnswers({ type: 'json' });

			await tps.render(newCwd);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(newCwd, '.prettierrc')).toBeFile();
		});

		it('should render a .prettier.config.js when js', async () => {
			const newCwd = path.join(CWD, 'food-app');

			vol.mkdirSync(newCwd);

			const tps = new Templates<PrettierConfigAnswers>('prettier-config', {
				default: true,
			});

			tps.setAnswers({ type: 'js' });

			await tps.render(newCwd);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(newCwd, 'prettier.config.js')).toBeFile();
		});
	});

	describe('ignore', () => {
		it('should render a .prettierignore when ignore is false', async () => {
			const newCwd = path.join(CWD, 'food-app');

			vol.mkdirSync(newCwd);

			const tps = new Templates<PrettierConfigAnswers>('prettier-config', {
				default: true,
			});

			tps.setAnswers({ ignore: true });

			await tps.render(newCwd);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(newCwd, '.prettierignore')).toBeFile();
		});

		it('should render a .prettierignore when ignore is false', async () => {
			const newCwd = path.join(CWD, 'food-app');

			vol.mkdirSync(newCwd);

			const tps = new Templates<PrettierConfigAnswers>('prettier-config', {
				default: true,
			});

			tps.setAnswers({ ignore: false });

			await tps.render(newCwd);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(newCwd, '.prettierignore')).not.toBeFile();
		});
	});

	describe('spaces', () => {
		it('should support using spaces as spacing', async () => {
			const newCwd = path.join(CWD, 'food-app');

			vol.mkdirSync(newCwd);

			const tps = new Templates<PrettierConfigAnswers>('prettier-config', {
				default: true,
			});

			tps.setAnswers({ spacing: 'spaces', type: 'json' });

			await tps.render(newCwd);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(newCwd, '.prettierrc')).toHaveFileContents(
				'"useTabs": false',
			);
			// @ts-expect-error no types for extending jest functions
			expect(path.join(newCwd, '.prettierrc')).toHaveFileContents(
				'"tabWidth": 2',
			);
		});

		it('should support using spaces as spacing in js file', async () => {
			const newCwd = path.join(CWD, 'food-app');

			vol.mkdirSync(newCwd);

			const tps = new Templates<PrettierConfigAnswers>('prettier-config', {
				default: true,
			});

			tps.setAnswers({ spacing: 'spaces', type: 'js' });

			await tps.render(newCwd);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(newCwd, 'prettier.config.js')).toHaveFileContents(
				'useTabs: false',
			);
			// @ts-expect-error no types for extending jest functions
			expect(path.join(newCwd, 'prettier.config.js')).toHaveFileContents(
				'tabWidth: 2',
			);
		});

		it('should support using tabs as spacing', async () => {
			const newCwd = path.join(CWD, 'food-app');

			vol.mkdirSync(newCwd);

			const tps = new Templates<PrettierConfigAnswers>('prettier-config', {
				default: true,
			});

			tps.setAnswers({ spacing: 'tab', type: 'json' });

			await tps.render(newCwd);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(newCwd, '.prettierrc')).toHaveFileContents(
				'"useTabs": true',
			);
			// @ts-expect-error no types for extending jest functions
			expect(path.join(newCwd, '.prettierrc')).not.toHaveFileContents(
				'"tabWidth": 2',
			);
		});

		it('should support using tabs as spacing in js file', async () => {
			const newCwd = path.join(CWD, 'food-app');

			vol.mkdirSync(newCwd);

			const tps = new Templates<PrettierConfigAnswers>('prettier-config', {
				default: true,
			});

			tps.setAnswers({ spacing: 'tab', type: 'js' });

			await tps.render(newCwd);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(newCwd, 'prettier.config.js')).toHaveFileContents(
				'useTabs: true,',
			);
			// @ts-expect-error no types for extending jest functions
			expect(path.join(newCwd, 'prettier.config.js')).not.toHaveFileContents(
				'tabWidth: 2,',
			);
		});
	});
});
