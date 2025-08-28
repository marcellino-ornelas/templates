import Templates from '@tps/templates';
import Playground from '@test/utilities/playground';
import { TESTING_PACKAGE_FILES } from '@test/utilities/constants';
import {
	TemplateNotFoundError,
	DirectoryNotFoundError,
	RequiresTemplateError,
} from '@tps/errors';
import { writeFile } from '@test/utilities/helpers';
import {
	mk3rdPartyTemplate,
	mkGlobal3rdPartyTemplate,
	mkTemplate,
} from '@test/utilities/templates';
import { reset } from '@test/utilities/vol';
import { CWD } from '@tps/utilities/constants';
import path from 'path';

jest.mock('fs');

/**
 * Constants
 */

const playground = new Playground();

describe('[Templates] Render Process:', () => {
	beforeAll(() => playground.create());

	afterAll(() => playground.destroy());

	beforeEach(() => {
		jest.resetAllMocks();
		reset();

		return playground.createBox('render_process');
	});

	it('should throw RequiresTemplateError if no template was set', async () => {
		expect(() => await Templates.get()).toThrow(RequiresTemplateError);
	});

	it('should throw TemplateNotFound if no template is available', async () => {
		expect(() => await Templates.get('some-random-template')).toThrow(
			TemplateNotFoundError,
		);
	});

	it('should throw DirectoryNotFoundError if dest does not exist', async () => {
		const dest = playground.pathTo('non/existent/path');
		const tps = await Templates.get('testing');

		return expect(tps.render(dest, 'app')).rejects.toThrow(
			DirectoryNotFoundError,
		);
	});

	it('should be able to render a local template', async () => {
		const tps = await Templates.get('testing');

		const destPath = playground.pathTo('app');

		const results = await tps.render(playground.box(), 'app');

		expect(results).toEqual(destPath);

		expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
	});

	it('should render all directories', async () => {
		const tps = await mkTemplate('testing-directories', CWD, {
			'default/index.js': 'hey',
			'default/folder1': {},
			'default/folder2': {},
			'default/folder3/folder31': {},
		});

		const destPath = playground.pathTo('app');

		const results = await tps.render(playground.box(), 'app');

		expect(results).toEqual(destPath);

		expect(path.join(destPath, 'index.js')).toBeFile();
		expect(path.join(destPath, 'folder1')).toBeDirectory();
		expect(path.join(destPath, 'folder2')).toBeDirectory();
		expect(path.join(destPath, 'folder3/folder31')).toBeDirectory();
	});

	it('should be able to use dynamic files', async () => {
		const tps = await mkTemplate('test-dynamic-file', undefined, {
			// single extension
			'./default/index.js.tps': `{{=tps.name}}`,
			// single extension
			'./default/file.js.dot': `{{=tps.name}}`,
			// no extension
			'./default/.tpsrc.tps': `{{=tps.name}}`,
			// no extension no dot
			'./default/settings.tps': `{{=tps.name}}`,
			// more than one extensions
			'./default/tps.config.js.tps': `{{=tps.name}}`,
		});

		await tps.render(CWD, ['App']);

		expect(path.join(CWD, 'App/index.js')).toHaveFileContents('App');
		expect(path.join(CWD, 'App/file.js')).toHaveFileContents('App');
		expect(path.join(CWD, 'App/.tpsrc')).toHaveFileContents('App');
		expect(path.join(CWD, 'App/settings')).toHaveFileContents('App');
		expect(path.join(CWD, 'App/tps.config.js')).toHaveFileContents('App');
	});

	it('should be able to use any type of file', async () => {
		const tps = await mkTemplate('test-file', undefined, {
			// single extension
			'./default/index.js': 'hey',
			// no extension
			'./default/.tpsrc': 'hey',
			// no extension no dot
			'./default/settings': 'hey',
			// more than one extensions
			'./default/tps.config.js': 'hey',
		});

		await tps.render(CWD, ['App']);

		expect(path.join(CWD, 'App/index.js')).toHaveFileContents('hey');
		expect(path.join(CWD, 'App/.tpsrc')).toHaveFileContents('hey');
		expect(path.join(CWD, 'App/settings')).toHaveFileContents('hey');
		expect(path.join(CWD, 'App/tps.config.js')).toHaveFileContents('hey');
	});

	it('should be able to render a template with nested files and folders', async () => {
		const fileSystem = {};

		for (let i = 0; i < 20; i++) {
			const dir = `./default/src/dir${i}`;

			for (let j = 0; j < 20; j++) {
				const filePath = `${dir}/file${j}.txt`;

				fileSystem[filePath] =
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
			}

			const extraDirs = Array.from({
				length: Math.floor(Math.random() * 10) + 1,
			})
				.fill(null)
				.map((_, index) => `dir${index}`)
				.join('/');

			for (let j = 0; j < 20; j++) {
				const filePath = `${dir}/${extraDirs}/file${j}.txt`;

				fileSystem[filePath] =
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
			}
		}

		await mkTemplate('test-template-nested-files', CWD, fileSystem);

		const tps = await Templates.get('test-template-nested-files');

		const results = await tps.render(CWD, 'app');

		const destPath = path.join(CWD, 'app');

		expect(results).toEqual(destPath);

		expect(destPath).toBeDirectory();

		const expectedCreatedFiles = Object.keys(fileSystem).map((p) =>
			p.replace('./default/', ''),
		);

		expect(destPath).toHaveAllFilesAndDirectories(expectedCreatedFiles);
	});

	it('should be able to render 1000 templates with no problems', async () => {
		const all = [];

		for (let i = 0; i < 1000; i++) {
			const tps = await Templates.get('testing');
			const destPath = playground.pathTo(`app_${i}`);
			// eslint-disable-next-line jest/valid-expect-in-promise
			const promise = tps.render(playground.box(), `app_${i}`).then(() => {
				expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
			});

			all.push(promise);
		}

		return Promise.all(all);
	});

	it('should be able to render with multiple build paths', async () => {
		const tps = await Templates.get('testing');

		const buildPaths = Array.from({ length: 100 }, (_, i) => `app_${i + 1}`);

		await tps.render(playground.box(), buildPaths);

		buildPaths.forEach((buildPath) => {
			const destPath = playground.pathTo(buildPath);

			expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
		});
	});

	it('should be able to render a local template without tps prefix', async () => {
		await mkTemplate('tps-test-template-prefix');

		const tps = await Templates.get('test-template-prefix');

		const destPath = playground.pathTo('app');

		const results = await tps.render(playground.box(), 'app');

		expect(results).toEqual(destPath);

		expect(destPath).toHaveAllFilesAndDirectories(['index.js']);
	});

	it('should be able to render a local template with long build path', async () => {
		const tps = await Templates.get('testing');

		const destPath = playground.pathTo('hey/app');

		const results = await tps.render(playground.box(), 'hey/app');

		expect(results).toEqual(destPath);

		expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
	});

	it('should be able to render a local template with short build path with no new folder', async () => {
		const tps = await Templates.get('testing', {
			newFolder: false,
		});

		const destPath = playground.box();

		const results = await tps.render(destPath, 'app');

		expect(results).toEqual(playground.pathTo('app'));

		expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
	});

	it('should be able to render a local template with long build path with no new folder', async () => {
		const tps = await Templates.get('testing', {
			newFolder: false,
		});

		const destPath = playground.pathTo('hey');

		const results = await tps.render(playground.box(), 'hey/app');

		expect(results).toEqual(playground.pathTo('hey/app'));

		expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
	});

	it('should be able to render a local template with multiple build paths', async () => {
		const tps = await Templates.get('testing');

		const buildPaths = ['app', 'Box', 'New'];

		const results = await tps.render(playground.box(), buildPaths);

		expect(results).toEqual(
			buildPaths.map((buildPath) => playground.pathTo(buildPath)),
		);

		buildPaths.forEach((buildPath) => {
			const destPath = playground.pathTo(buildPath);
			expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
		});
	});

	it("should be able to render a local template and keep all files that don't interfere with the template", async () => {
		const tps = await Templates.get('testing');

		const destPath = playground.pathTo('app');
		const randomDest = playground.pathTo('app/some-random-file.js');

		writeFile(randomDest, 'blah');

		return tps.render(playground.box(), 'app').then(() => {
			expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
			expect(randomDest).toBeFile();
		});
	});

	/**
	 * @docs guide/getting-started/packages.md#including-more-packages
	 */
	it('should be able to render packages', async () => {
		const tps = await Templates.get('testing');
		tps.loadPackages(['extras', 'extras2']);

		const destPath = playground.pathTo('app');

		return tps.render(playground.box(), 'app').then(() => {
			expect(destPath).toHaveAllFilesAndDirectories([
				...TESTING_PACKAGE_FILES,
				'extras.js',
				'extras2.js',
			]);
		});
	});

	it('should use experimental template engine by default', async () => {
		const tps = await Templates.get('testing-experimental-template-engine');

		tps.setAnswers({ one: true });

		const indexFile = playground.pathTo('app/index.txt');

		await tps.render(playground.box(), 'app');

		expect(indexFile).toHaveFileContents('hey there\nbye');
	});

	it('should be able to turn off experimental template engine', async () => {
		const tps = await Templates.get('testing-experimental-template-engine', {
			experimentalTemplateEngine: false,
		});

		tps.setAnswers({ one: true });

		const indexFile = playground.pathTo('app/index.txt');

		await tps.render(playground.box(), 'app');

		expect(indexFile).toHaveFileContents('{}\nhey there\n{}\nbye');
	});

	it('should be able to use a local npm template', async () => {
		await mk3rdPartyTemplate('tps-test-3rd-party-package');

		const tps = await Templates.get('tps-test-3rd-party-package', { default: true });

		const appPath = playground.pathTo('app');

		await tps.render(playground.box(), 'app');

		expect(appPath).toHaveAllFilesAndDirectories(['index.js']);
	});

	it('should be able to render a local 3rd party template without tps prefix', async () => {
		await mk3rdPartyTemplate('tps-test-3rd-template-prefix');

		// Exclude tps prefix
		const tps = await Templates.get('test-3rd-template-prefix');

		const appPath = playground.pathTo('app');

		await tps.render(playground.box(), 'app');

		expect(appPath).toHaveAllFilesAndDirectories(['index.js']);
	});

	it('should be able to use a global npm template', async () => {
		await mkGlobal3rdPartyTemplate('tps-test-3rd-party-package');

		const tps = await Templates.get('tps-test-3rd-party-package', { default: true });

		const appPath = playground.pathTo('app');

		await tps.render(playground.box(), 'app');

		expect(appPath).toHaveAllFilesAndDirectories(['index.js']);
	});

	it('should be able to render a global 3rd party template without tps prefix', async () => {
		await mkGlobal3rdPartyTemplate('tps-test-3rd-template-prefix');

		// Exclude tps prefix
		const tps = await Templates.get('test-3rd-template-prefix');

		const destPath = playground.pathTo('app');

		return tps.render(playground.box(), 'app').then(() => {
			expect(destPath).toHaveAllFilesAndDirectories(['index.js']);
		});
	});

	// TODO: remove .gitkeep
	it('should ignore .tpskeep & .gitkeep files', async () => {
		const tps = await mkTemplate('my-template', undefined, {
			'./default/some-directory/.tpskeep': '',
			'./default/some-directory-nested/nested/.tpskeep': '',
			'./default/some-directory/.gitkeep': '',
			'./default/some-directory-nested/nested/.gitkeep': '',
			'./default/index.js': '',
		});

		return tps.render(playground.box(), 'app').then(() => {
			expect(
				playground.pathTo('app/some-directory'),
			).not.toHaveAllFilesAndDirectories(['.tpskeep', '.gitkeep']);

			expect(
				playground.pathTo('app/some-directory-nested/nested'),
			).not.toHaveAllFilesAndDirectories(['.tpskeep', '.gitkeep']);

			expect(playground.pathTo('app/')).toHaveAllFilesAndDirectories([
				'index.js',
			]);
		});
	});
});
