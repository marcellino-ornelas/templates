/* eslint-disable jest/no-conditional-expect */
/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR, TESTING_PACKAGE_FILES } from '@test/utilities/constants';
import Templates from '@test/templates';
import { writeFile } from '@test/utilities/helpers';
import { reset } from '@test/utilities/vol';

jest.mock('fs');

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS] Rendered Failed Cases:', () => {
	let tps;

	beforeEach(() => {
		reset();

		tps = new Templates('testing');

		return playground.createBox('render_failed');
	});

	it('should throw error if file is already created when creating a new folder', () => {
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

	it('should throw error if file is already created when building in CWD', () => {
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

	it('should throw error if file is already created in nested folder', () => {
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

	it('should create templates for every build path regardless if one build path fails', () => {
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

	it('should return array of errors when multiple fail', () => {
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

	it('should return error when one fails', () => {
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
