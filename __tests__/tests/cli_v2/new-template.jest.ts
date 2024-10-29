import yargs from 'yargs/yargs';
import newCommand from '@tps/cli/commands/new';
import { reset, vol } from '@test/utilities/vol';
import { CWD } from '@tps/utilities/constants';
import path from 'path';

jest.mock('fs');

describe('Command Line: new template', () => {
	beforeEach(() => {
		reset();
	});

	it('should be able to create a new template', async () => {
		const parser = yargs().command(newCommand).fail(false);

		await parser.parseAsync('new template my-template --annotate');

		// @ts-expect-error not typed yet
		expect(path.join(CWD, '.tps/my-template')).toBeDirectory();
	});

	it('should fail when template is already created', async () => {
		const parser = yargs().command(newCommand).fail(false);

		vol.mkdirSync(path.join(CWD, '.tps/my-template'));

		// @ts-expect-error not typed yet
		expect(path.join(CWD, '.tps/my-template')).toBeDirectory();

		await expect(
			parser.parseAsync('new template my-template --annotate'),
		).rejects.toThrowError('TPS template is already created.');
	});

	it('should be able to use new-template options', async () => {
		const parser = yargs().command(newCommand).fail(false);

		/**
		 * We need answer annotate because using `js` type makes annotate get prompted
		 */
		await parser.parseAsync('new template my-template --type js --annotate');

		// @ts-expect-error not typed yet
		expect(path.join(CWD, '.tps/my-template/settings.js')).toBeFile();
	});
});
