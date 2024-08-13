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

	it('should throw RequiresTemplateError if no template was set', () => {
		expect(() => new Templates()).toThrow(RequiresTemplateError);
	});

	it('should throw TemplateNotFound if no template is available', () => {
		expect(() => new Templates('some-random-template')).toThrow(
			TemplateNotFoundError,
		);
	});

	it('should throw DirectoryNotFoundError if dest does not exist', () => {
		const dest = playground.pathTo('non/existent/path');
		const tps = new Templates('testing');

		return expect(tps.render(dest, 'app')).rejects.toThrow(
			DirectoryNotFoundError,
		);
	});

	it('should be able to render a local template', async () => {
		const tps = new Templates('testing');

		const destPath = playground.pathTo('app');

		const results = await tps.render(playground.box(), 'app');

		expect(results).toEqual(destPath);

		expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
	});

	it('should be able to render a local template without tps prefix', async () => {
		mkTemplate('tps-test-template-prefix');

		const tps = new Templates('test-template-prefix');

		const destPath = playground.pathTo('app');

		const results = await tps.render(playground.box(), 'app');

		expect(results).toEqual(destPath);

		expect(destPath).toHaveAllFilesAndDirectories(['index.js']);
	});

	it('should be able to render 1000 templates with no problems', () => {
		const all = [];

		for (let i = 0; i < 1000; i++) {
			const tps = new Templates('testing');
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
		const tps = new Templates('testing');

		const buildPaths = Array.from({ length: 100 }, (_, i) => `app_${i + 1}`);

		await tps.render(playground.box(), buildPaths);

		buildPaths.forEach((buildPath) => {
			const destPath = playground.pathTo(buildPath);

			expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
		});
	});

	it('should be able to render a local template with long build path', async () => {
		const tps = new Templates('testing');

		const destPath = playground.pathTo('hey/app');

		const results = await tps.render(playground.box(), 'hey/app');

		expect(results).toEqual(destPath);

		expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
	});

	it('should be able to render a local template with short build path with no new folder', async () => {
		const tps = new Templates('testing', {
			newFolder: false,
		});

		const destPath = playground.box();

		const results = await tps.render(destPath, 'app');

		expect(results).toEqual(playground.pathTo('app'));

		expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
	});

	it('should be able to render a local template with long build path with no new folder', async () => {
		const tps = new Templates('testing', {
			newFolder: false,
		});

		const destPath = playground.pathTo('hey');

		const results = await tps.render(playground.box(), 'hey/app');

		expect(results).toEqual(playground.pathTo('hey/app'));

		expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
	});

	it('should be able to render a local template with multiple build paths', async () => {
		const tps = new Templates('testing');

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

	it("should be able to render a local template and keep all files that don't interfere with the template", () => {
		const tps = new Templates('testing');

		const destPath = playground.pathTo('app');
		const randomDest = playground.pathTo('app/some-random-file.js');

		writeFile(randomDest, 'blah');

		return tps.render(playground.box(), 'app').then(() => {
			expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
			expect(randomDest).toBeFile();
		});
	});

	it('should be able to render a template with force, if files exist', () => {
		const tps = new Templates('testing', { force: true });

		const indexFile = playground.pathTo('app/index.js');

		writeFile(indexFile, 'blah');

		const destPath = playground.pathTo('app');

		return tps.render(playground.box(), 'app').then(() => {
			expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
		});
	});

	/**
	 * @docs guide/getting-started/packages.md#including-more-packages
	 */
	it('should be able to render packages', () => {
		const tps = new Templates('testing');
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
		const tps = new Templates('testing-experimental-template-engine');

		tps.setAnswers({ one: true });

		const indexFile = playground.pathTo('app/index.txt');

		await tps.render(playground.box(), 'app');

		expect(indexFile).toHaveFileContents('hey there\nbye');
	});

	it('should be able to turn off experimental template engine', async () => {
		const tps = new Templates('testing-experimental-template-engine', {
			experimentalTemplateEngine: false,
		});

		tps.setAnswers({ one: true });

		const indexFile = playground.pathTo('app/index.txt');

		await tps.render(playground.box(), 'app');

		expect(indexFile).toHaveFileContents('{}\nhey there\n{}\nbye');
	});

	it('should be able to use a local npm template', async () => {
		mk3rdPartyTemplate('tps-test-3rd-party-package');

		const tps = new Templates('tps-test-3rd-party-package', { default: true });

		const appPath = playground.pathTo('app');

		await tps.render(playground.box(), 'app');

		expect(appPath).toHaveAllFilesAndDirectories(['index.js']);
	});

	it('should be able to render a local 3rd party template without tps prefix', async () => {
		mk3rdPartyTemplate('tps-test-3rd-template-prefix');

		// Exclude tps prefix
		const tps = new Templates('test-3rd-template-prefix');

		const appPath = playground.pathTo('app');

		await tps.render(playground.box(), 'app');

		expect(appPath).toHaveAllFilesAndDirectories(['index.js']);
	});

	it('should be able to use a global npm template', async () => {
		mkGlobal3rdPartyTemplate('tps-test-3rd-party-package');

		const tps = new Templates('tps-test-3rd-party-package', { default: true });

		const appPath = playground.pathTo('app');

		await tps.render(playground.box(), 'app');

		expect(appPath).toHaveAllFilesAndDirectories(['index.js']);
	});

	it('should be able to render a global 3rd party template without tps prefix', () => {
		mkGlobal3rdPartyTemplate('tps-test-3rd-template-prefix');

		// Exclude tps prefix
		const tps = new Templates('test-3rd-template-prefix');

		const destPath = playground.pathTo('app');

		return tps.render(playground.box(), 'app').then(() => {
			expect(destPath).toHaveAllFilesAndDirectories(['index.js']);
		});
	});
});
