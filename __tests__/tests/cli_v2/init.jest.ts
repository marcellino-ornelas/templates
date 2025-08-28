/*
 * Modules
 */
import yargs from 'yargs/yargs';
import init from '@tps/cli/commands/init';
import { reset, vol } from '@test/utilities/vol';
import { CWD, USER_HOME } from '@tps/utilities/constants';
import path from 'path';
import {
	GlobalInitializedAlreadyError,
	InitializedAlreadyError,
} from '@tps/errors';

jest.mock('fs');

jest.mock('@tps/utilities/constants', () => {
	const original = jest.requireActual('@tps/utilities/constants');
	return {
		...original,
		CWD: jest
			.requireActual('path')
			.join(original.USER_HOME, 'Desktop', 'random'),
	};
});

describe('Command Line: init', () => {
	beforeEach(async () => {
		reset();

		// were mocking this out so ensure it exists
		vol.mkdirSync(CWD, { recursive: true });
	});

	describe('Local', () => {
		it('should be able to initialize templates locally', async () => {
			const parser = yargs().command(init).fail(false);

			// @ts-expect-error not typed yet
			expect(path.join(CWD, '.tps')).not.toBeDirectory();

			await parser.parseAsync('init');

			// @ts-expect-error not typed yet
			expect(path.join(CWD, '.tps')).toBeDirectory();
		});

		it('should throw InitializedAlreadyError when already directory is initialized', async () => {
			const parser = yargs().command(init).fail(false);

			await parser.parseAsync('init');

			// @ts-expect-error not typed yet
			expect(path.join(CWD, '.tps')).toBeDirectory();

			await expect(parser.parseAsync('init')).rejects.toThrowError(
				new InitializedAlreadyError(CWD).message,
			);
		});

		it('should be able to initialize templates locally when parent is initialized', async () => {
			const parser = yargs().command(init).fail(false);

			/**
			 * Since we are in ~/Desktop/random, we can use the
			 * parent directory ~/Desktop to place the `.tps` folder
			 */
			await vol.promises.mkdir(path.join(CWD, '../.tps'));

			// @ts-expect-error not typed yet
			expect(path.join(CWD, '.tps')).not.toBeDirectory();

			await parser.parseAsync('init');

			// @ts-expect-error not typed yet
			expect(path.join(CWD, '.tps')).toBeDirectory();
		});
	});

	describe('Global', () => {
		it('should be able to initialize templates globally', async () => {
			const parser = yargs().command(init).fail(false);

			// @ts-expect-error not typed yet
			expect(path.join(USER_HOME, '.tps')).not.toBeDirectory();

			await parser.parseAsync('init --global');

			// @ts-expect-error not typed yet
			expect(path.join(USER_HOME, '.tps')).toBeDirectory();
		});

		it('should throw GlobalInitializedAlreadyError when already global initialized', async () => {
			const parser = yargs().command(init).fail(false);

			await parser.parseAsync('init --global');

			// @ts-expect-error not typed yet
			expect(path.join(USER_HOME, '.tps')).toBeDirectory();

			await expect(parser.parseAsync('init --global')).rejects.toThrowError(
				new GlobalInitializedAlreadyError(USER_HOME).message,
			);
		});

		it('should be able to initialize local repo when already globally initialized', async () => {
			const parser = yargs().command(init).fail(false);

			// @ts-expect-error not typed yet
			expect(path.join(USER_HOME, '.tps')).not.toBeDirectory();

			await parser.parseAsync('init --global');

			// @ts-expect-error not typed yet
			expect(path.join(USER_HOME, '.tps')).toBeDirectory();

			await parser.parseAsync('init');

			// @ts-expect-error not typed yet
			expect(path.join(CWD, '.tps')).toBeDirectory();
		});
	});
});
