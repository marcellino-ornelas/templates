/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR, TESTING_PACKAGE_FILES } from '@test/utilities/constants';
import Templates from '@test/templates';
import * as path from 'path';
import { writeFile } from '@test/utilities/helpers';
import { Build } from '@tps/templates/build';

jest.mock('fs');

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS] Render with Wipe:', () => {
	beforeAll(() => playground.create());
	afterAll(() => playground.destroy());

	beforeEach(async () => playground.createBox('rendering_wipe'));

	it('should be able to render a template with wipe.', async () => {
		/**
		 * directory structure before:
		 *
		 * {cwd}/
		 *    | - app/
		 *        | - some-random-file.js
		 *        | - index.js
		 *
		 * directory structure after:
		 *
		 * {cwd}/
		 *    | - app/
		 *        | - index.js
		 *        | - <rest of templates files...>
		 */
		const destPath = playground.pathTo('app');
		const randomDest = playground.pathTo('app/some-random-file.js');
		// this index file comes from the template. old one gets deleted from wipe
		const indexFile = playground.pathTo('app/index.js');

		const tps = await Templates.get('testing', { wipe: true });

		writeFile(randomDest, 'blah');
		writeFile(indexFile, 'blah');

		return tps.render(playground.box(), 'app').then(() => {
			expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
			expect(randomDest).not.toBeFile();
			expect(indexFile).toHaveFileContents("console.log('hey');");
		});
	});

	/**
	 * @docs api/cli/commands/use.md#when-using-a-long-build-path
	 */
	it('should be able to render a template with wipe and a long build path', async () => {
		/**
		 * directory structure before:
		 *
		 * {cwd}/
		 *    |- dest/
		 *       | - random-file.js
		 *       | - app/ <-- app will get wiped
		 *           | - random-file-2.js
		 *           | - index.js
		 */
		const appPath = playground.pathTo('dest/app');
		const randomFileInDest = playground.pathTo('dest/random-file.js');
		const randomFileInApp = playground.pathTo('dest/app/random-file-2.js');
		const indexFileInApp = playground.pathTo('dest/app/index.js');

		const tps = await Templates.get('testing', { wipe: true });

		// Make file in dest
		writeFile(randomFileInDest, 'blah');
		// Make file in build path
		writeFile(randomFileInApp, 'blah');
		// Make file in build path
		writeFile(indexFileInApp, 'blah');

		return tps.render(playground.box(), 'dest/app').then(() => {
			expect(randomFileInDest).toBeFile();
			expect(appPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
			expect(randomFileInApp).not.toBeFile();
			expect(indexFileInApp).toBeFile();
		});
	});

	/**
	 * @docs api/cli/commands/use.md#when-using-no-build-path
	 */
	it('should be able to render a template with wipe when there is no buildPath', async () => {
		/**
		 * directory structure before:
		 *
		 * {cwd}/
		 *    | - /should-not-be-deleted.js
		 *    | - app/ <--- this will be the acting CWD for tps
		 *        | - some-random-file.js
		 *
		 *  directory structure after:
		 *
		 * {cwd}/
		 *    | - /should-not-be-deleted.js
		 *    | - app/ <--- this will be the acting CWD for tps
		 *        | - some-random-file.js <-- should not be deleted
		 *        | - <templates files...>
		 */
		const cwd = playground.pathTo('app');
		const randomDest = path.join(cwd, 'some-random-file.js');
		const randomFileNotInBuildPath = playground.pathTo(
			'should-not-be-deleted.js',
		);

		const tps = await Templates.get('testing', { wipe: true });

		const wipeMock = jest.spyOn(Build.prototype, 'wipe');

		writeFile(randomDest, 'blah');
		writeFile(randomFileNotInBuildPath, '');

		await tps.render(cwd);

		expect(wipeMock).not.toHaveBeenCalled();
		expect(randomDest).toBeFile();
		expect(cwd).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
		expect(randomFileNotInBuildPath).toBeFile();
	});

	it('should be able to use wipe=true and newFolder=false', async () => {
		/**
		 * directory structure before:
		 *
		 * {cwd}/
		 *    | - some-random-file.js
		 *    | - index.js
		 *
		 *
		 * directory structure after:
		 *
		 * {cwd}/
		 *    | - some-random-file.js
		 *    | - index.js // from template
		 *    | - app.js // from template
		 */
		const randomDest = playground.pathTo('some-random-file.js');
		const indexFileInDest = playground.pathTo('index.js');

		const tps = await Templates.get('testing-clean-up-wipe', {
			wipe: true,
			newFolder: false,
		});

		writeFile(indexFileInDest, 'blah');
		writeFile(randomDest, 'blah');

		return tps.render(playground.box(), 'app').then(() => {
			expect(playground.box()).toHaveAllFilesAndDirectories([
				'index.js',
				'app.js',
				'some-random-file.js',
			]);
			expect(randomDest).toBeFile();
			expect(indexFileInDest).toHaveFileContents('clean up worked');
		});
	});

	/**
	 * This test was added because when using newFolder=false and using wipe and using a long build path.
	 *
	 */
	it('should be able to use wipe=true and newFolder=false with a long build path', async () => {
		/**
		 * directory structure before:
		 *
		 * {cwd}/
		 *    | - my/personal/
		 *        | - index.js
		 *        | - some-random-file.js
		 *
		 *
		 * directory structure after:
		 *
		 * {cwd}/
		 *    | - my/personal/
		 *        | - some-random-file.js
		 *        | - index.js // from template not old index
		 *        | - app.js
		 */
		const destPath = playground.pathTo('my/personal');
		const randomDest = playground.pathTo('my/personal/some-random-file.js');
		const indexFileInParentPath = playground.pathTo('my/personal/index.js');

		writeFile(indexFileInParentPath, 'blah');
		writeFile(randomDest, 'blah');

		expect(indexFileInParentPath).toBeFile();
		expect(randomDest).toBeFile();

		const tps = await Templates.get('testing-clean-up-wipe', {
			wipe: true,
			newFolder: false,
		});

		return tps.render(playground.box(), 'my/personal/app').then(() => {
			expect(destPath).toHaveAllFilesAndDirectories(['index.js', 'app.js']);
			expect(indexFileInParentPath).toHaveFileContents('clean up worked');
			expect(playground.pathTo('my/personal/app')).not.toBeDirectory();

			// original file that already existed shouldnt be wiped
			expect(randomDest).toBeFile();
		});
	});

	it.todo('should not delete a parent directory contents');

	// eslint-disable-next-line jest/no-commented-out-tests
	// it.only('should be able to render a template with wipe and no new folder', () => {
	//   const destPath = playground.pathTo('app');
	//   const randomDest = playground.pathTo('app/some-random-file.js');

	//   const tps = await Templates.get('testing-clean-up-wipe', {
	//     wipe: true,
	//     newFolder: false
	//   });

	//   writeFile(randomDest, 'blah');

	//   return tps.render(playground.box(), 'app').then(() => {
	//     expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
	//     expect(randomDest).not.toBeFile();
	//   });
	// });
});
