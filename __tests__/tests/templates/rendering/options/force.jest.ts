/*
 * Modules
 */
import { mkTemplate } from '@test/utilities/templates';
import { CWD } from '@tps/utilities/constants';
import { reset, vol } from '@test/utilities/vol';
import path from 'path';
import { FileExistError } from '@tps/errors';

jest.mock('fs');

describe('Force', () => {
	beforeEach(() => {
		// jest.resetAllMocks();
		reset();
	});

	it('should not be able to render a template file when files exist', async () => {
		expect.assertions(1);
		const indexFilePath = path.join(CWD, 'app', 'index.js');

		const files = {
			'default/index.js': 'template-file',
		};

		const tps = mkTemplate('testing-force', CWD, files);

		vol.mkdirSync(path.join(CWD, 'app'));

		vol.writeFileSync(indexFilePath, 'original-file', {});

		await expect(() => tps.render(CWD, 'app')).rejects.toThrowError(
			FileExistError,
		);
	});

	it('should be able to render a template with force, if files exist', async () => {
		const indexFilePath = path.join(CWD, 'app', 'index.js');

		const files = {
			'default/index.js': 'template-file',
		};

		const tps = mkTemplate('testing-force', CWD, files, { force: true });

		vol.mkdirSync(path.join(CWD, 'app'));

		vol.writeFileSync(indexFilePath, 'original-file');

		await tps.render(CWD, 'app');

		// @ts-expect-error no types for extending jest functions
		expect(indexFilePath).toHaveFileContents('template-file');
	});

	it('should be able to render a template with force, when long build path and files exist', async () => {
		const indexFilePath = path.join(CWD, 'some/path/app', 'index.js');

		const files = {
			'default/index.js': 'template-file',
		};

		const tps = mkTemplate('testing-force', CWD, files, { force: true });

		vol.mkdirSync(path.join(CWD, 'some/path/app'), { recursive: true });

		vol.writeFileSync(indexFilePath, 'original-file');

		await tps.render(CWD, 'some/path/app');

		// @ts-expect-error no types for extending jest functions
		expect(indexFilePath).toHaveFileContents('template-file');
	});

	it('should be able to render a template with force, when building in dest and file exists', async () => {
		const indexFilePath = path.join(CWD, 'index.js');

		const files = {
			'default/index.js': 'template-file',
		};

		const tps = mkTemplate('testing-force', CWD, files, { force: true });

		vol.writeFileSync(indexFilePath, 'original-file');

		await tps.render(CWD);

		// @ts-expect-error no types for extending jest functions
		expect(indexFilePath).toHaveFileContents('template-file');
	});
});
