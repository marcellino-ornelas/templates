/* eslint-disable jest/no-conditional-expect */
/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR, TESTING_PACKAGE_FILES } from '@test/utilities/constants';
import Templates from '@test/templates';
import { writeFile } from '@test/utilities/helpers';
import { reset } from '@test/utilities/vol';
import { mkTemplate } from '@test/utilities/templates';
import { CWD } from '@tps/utilities/constants';
import { FileExistError } from '@tps/errors';
import path from 'path';

jest.mock('fs');

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS] Rendered Failed Cases:', () => {
	let tps;

	beforeEach(() => {
		reset();

		tps = await Templates.get('testing');

		return playground.createBox('render_failed');
	});

	it('should throw error if file is already created when creating a new folder', async () => {
		const indexFile = playground.pathTo('App/index.js');
		const appFolder = playground.pathTo('App');

		writeFile(indexFile, 'blah');

		expect(appFolder).toBeDirectory();
		expect(indexFile).toBeFile();

		jest.setTimeout(100000);

		return tps.render(playground.box(), 'App').catch((error) => {
			expect(error).toBeDefined();

			expect(appFolder).toBeDirectory();
			expect(indexFile).toBeFile();
			expect(appFolder).not.toHaveAllFilesAndDirectories([
				'db',
				'server',
				'storeUtils',
				'db/db.js',
			]);
		});
	});

	it('should throw error if dot file is already created when creating a new folder', async () => {
		tps = mkTemplate('dynamic-file-failed', CWD, {
			'default/index.txt': 'hey',
			'default/{{=tps.name}}.txt.dot': 'hey',
		});

		const appFile = path.join(CWD, 'App/App.txt');
		const appDir = path.join(CWD, 'App/');

		writeFile(appFile, 'blah');

		expect(appFile).toBeFile();

		await expect(tps.render(CWD, 'App')).rejects.toThrow(FileExistError);

		expect(appFile).toHaveFileContents('blah');

		expect(appDir).not.toHaveAllFilesAndDirectories(['index.txt']);
	});

	it('should throw error if file is already created when building in CWD', async () => {
		const box = playground.box();
		const indexFile = playground.pathTo('index.js');

		writeFile(indexFile, 'blah');
		expect(indexFile).toBeFile();

		return tps.render(box).catch((error) => {
			expect(error).toBeDefined();
			expect(box).not.toHaveAllFilesAndDirectories([
				'db',
				'server',
				'storeUtils',
				'db/db.js',
			]);
			expect(indexFile).toBeFile();
		});
	});

	it('should throw error if dot file is already created when building in CWD', async () => {
		tps = mkTemplate('dynamic-file-failed', CWD, {
			'default/index.txt': 'hey',
			'default/{{=tps.packages[0]}}.txt.dot': 'hey',
		});

		const defaultFile = path.join(CWD, 'default.txt');
		const indexFile = path.join(CWD, 'index.txt');

		writeFile(defaultFile, 'blah');

		expect(defaultFile).toBeFile();

		await expect(tps.render(CWD)).rejects.toThrow(FileExistError);

		expect(defaultFile).toHaveFileContents('blah');
		expect(indexFile).not.toBeFile();
	});

	it('should throw error if file is already created in nested folder', async () => {
		const file = playground.pathTo('App/storeUtils/user.js');
		const appFolder = playground.pathTo('App');

		writeFile(file, 'blah');

		expect(file).toBeFile();

		return tps.render(playground.box(), 'App').catch((error) => {
			expect(error).toBeDefined();
			expect(file).toBeFile();
			expect(appFolder).not.toHaveAllFilesAndDirectories([
				'db',
				'server',
				'db/db.js',
				'index.js',
			]);
		});
	});

	it('should throw error if dot file is already created in nested folder', async () => {
		tps = mkTemplate('dynamic-file-failed', CWD, {
			'default/storeUtils/index.txt': 'hey',
			'default/storeUtils/{{=tps.name}}.txt.dot': 'hey',
		});

		const defaultFile = path.join(CWD, 'App/storeUtils/App.txt');
		const indexFile = path.join(CWD, 'App/storeUtils/index.txt');

		writeFile(defaultFile, 'blah');

		expect(defaultFile).toBeFile();

		await expect(tps.render(CWD, 'App')).rejects.toThrow(FileExistError);

		expect(defaultFile).toHaveFileContents('blah');
		expect(indexFile).not.toBeFile();
	});

	it('should create templates for every build path regardless if one build path fails', async () => {
		const fileInApp = playground.pathTo('App/storeUtils/user.js');
		const appFolder = playground.pathTo('App');
		const app2Folder = playground.pathTo('App2');

		writeFile(fileInApp, 'blah');

		expect(fileInApp).toBeFile();

		return tps.render(playground.box(), ['App', 'App2']).catch((error) => {
			expect(error).toBeDefined();

			expect(fileInApp).toBeFile();
			expect(appFolder).not.toHaveAllFilesAndDirectories([
				'db',
				'server',
				'db/db.js',
				'index.js',
			]);

			expect(app2Folder).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
		});
	});

	it('should return array of errors when multiple fail', async () => {
		const fileInApp = playground.pathTo('App/storeUtils/user.js');
		const appFolder = playground.pathTo('App');
		const app2Folder = playground.pathTo('App2');
		const fileInApp2 = playground.pathTo('App2/storeUtils/user.js');

		writeFile(fileInApp, 'blah');
		writeFile(fileInApp2, 'blah');

		expect(fileInApp).toBeFile();
		expect(fileInApp2).toBeFile();

		return tps.render(playground.box(), ['App', 'App2']).catch((errors) => {
			expect(errors).toBeInstanceOf(Array);

			errors.forEach((error) => expect(error).toBeInstanceOf(Error));

			expect(fileInApp).toBeFile();
			expect(appFolder).not.toHaveAllFilesAndDirectories([
				'db',
				'server',
				'db/db.js',
				'index.js',
			]);

			expect(app2Folder).not.toHaveAllFilesAndDirectories(
				'db',
				'server',
				'db/db.js',
				'index.js',
			);
		});
	});

	it('should return error when one fails', async () => {
		const fileInApp = playground.pathTo('App/storeUtils/user.js');
		const appFolder = playground.pathTo('App');

		writeFile(fileInApp, 'blah');

		expect(fileInApp).toBeFile();

		return tps.render(playground.box(), ['App', 'App2']).catch((error) => {
			expect(error).toBeInstanceOf(Error);

			expect(fileInApp).toBeFile();
			expect(appFolder).not.toHaveAllFilesAndDirectories([
				'db',
				'server',
				'db/db.js',
				'index.js',
			]);
		});
	});
});
