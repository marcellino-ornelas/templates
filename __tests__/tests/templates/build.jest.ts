import path from 'path';
import { Build } from '@tps/templates/build';
import { Template } from '@tps/templates/template';
import { CWD } from '@tps/utilities/constants';
import { reset, vol } from '@test/utilities/vol';
import { mkTemplate } from '@test/utilities/templates';
import logger from '@tps/utilities/logger';

jest.mock('fs');

const BUILD_PATH = path.join(CWD, 'App');

const templateName = 'testing_build';

describe('Build', () => {
	beforeEach(() => {
		jest.restoreAllMocks();
		reset();

		mkTemplate(templateName);
	});

	it('should be able to track directories and files built', async () => {
		const tps = mkTemplate('testing_build_built', CWD, {
			'default/index.txt': 'index.txt',
			'default/dynamic.txt.dot': 'dynamic.txt.dot',
			'default/{{=tps.name}}.txt.dot': '{{=tps.name}}.txt.dot',
			'default/myDirectory/.tpskeep': '',
			// @ts-expect-error - something
			'default/myDirectory/myDirectory2/': {},
			'default/myDirectory/myDirectory2/index.txt': '',
			'package1/package1.txt': 'package1.txt',
			'package2/package2.txt': 'package2.txt',
		});

		tps.loadPackage('package1');

		const template = new Template(
			tps.template,
			tps.src,
			tps.templateSettings,
			tps.packages,
			tps.packagesUsed,
			tps.compiledFiles,
			// @ts-expect-error - private
			// eslint-disable-next-line no-underscore-dangle
			tps._defs,
		);

		const build = new Build(BUILD_PATH, template);

		await build.render();

		expect(build.built).toStrictEqual(
			expect.objectContaining({
				files: expect.arrayContaining([
					path.join(BUILD_PATH, 'index.js'),
					path.join(BUILD_PATH, 'index.txt'),
					// default file thats included in `mkTemplate`
					path.join(BUILD_PATH, 'dynamic.txt'),
					path.join(BUILD_PATH, 'App.txt'),
					path.join(BUILD_PATH, 'package1.txt'),
					path.join(BUILD_PATH, 'myDirectory/myDirectory2/index.txt'),
				]),
				directories: [
					path.join(BUILD_PATH, 'myDirectory'),
					path.join(BUILD_PATH, 'myDirectory/myDirectory2'),
				],
			}),
		);
	});

	describe('maybeWipe', () => {
		it('should be false when directory doesnt exist', async () => {
			const template = await Template.get(templateName);

			const build = new Build(BUILD_PATH, template, {
				wipe: true,
			});

			// @ts-expect-error(TS2769)
			const spy = jest.spyOn(build, 'wipe');

			const wasWiped = await build.maybeWipe();

			expect(wasWiped).toBeFalsy();

			expect(spy).not.toBeCalled();
		});

		it('should be true when directory exist and was wiped', async () => {
			vol.mkdirSync(BUILD_PATH);

			const template = await Template.get(templateName);

			const build = new Build(BUILD_PATH, template, {
				wipe: true,
			});

			// @ts-expect-error(TS2769)
			const spy = jest.spyOn(build, 'wipe');

			const wasWiped = await build.maybeWipe();

			expect(wasWiped).toBeTruthy();

			expect(spy).toBeCalled();
		});

		it('should be false when building in the destination directory', async () => {
			const template = await Template.get(templateName);

			const build = new Build(CWD, template, { wipe: true, buildInDest: true });

			// @ts-expect-error(TS2769)
			const spy = jest.spyOn(build, 'wipe');

			const wasWiped = await build.maybeWipe();

			expect(wasWiped).toBeFalsy();

			expect(spy).not.toBeCalled();
		});

		it('should be false when not building a new folder', async () => {
			const hackyForceFunction = jest.fn();
			vol.mkdirSync(BUILD_PATH);

			const template = await Template.get(templateName);

			const build = new Build(BUILD_PATH, template, {
				wipe: true,
				buildNewFolder: false,
			});

			// @ts-expect-error(TS2769)
			const spy = jest.spyOn(build, 'wipe');

			const wasWiped = await build.maybeWipe(hackyForceFunction);

			expect(wasWiped).toBeFalsy();

			expect(spy).not.toBeCalled();

			expect(hackyForceFunction).toBeCalled();
		});
	});

	describe('clean', () => {
		it('should be able delete all created files and directories', async () => {
			const tps = mkTemplate('testing_build_built', CWD, {
				'default/index.txt': 'index.txt',
				'default/dynamic.txt.dot': 'dynamic.txt.dot',
				'default/{{=tps.name}}.txt.dot': '{{=tps.name}}.txt.dot',
				'default/myDirectory/.tpskeep': '',
				// @ts-expect-error - something
				'default/myDirectory/myDirectory2/': {},
				'default/myDirectory/myDirectory2/index.txt': '',
				'package1/package1.txt': 'package1.txt',
				'package2/package2.txt': 'package2.txt',
			});

			tps.loadPackage('package1');

			const template = new Template(
				tps.template,
				tps.src,
				tps.templateSettings,
				tps.packages,
				tps.packagesUsed,
				tps.compiledFiles,
				// @ts-expect-error - private
				// eslint-disable-next-line no-underscore-dangle
				tps._defs,
			);

			const build = new Build(BUILD_PATH, template);

			await build.render();

			// @ts-expect-error no types for extending jest functions
			expect(BUILD_PATH).toHaveAllFilesAndDirectories([
				'index.js',
				'index.txt',
				'dynamic.txt',
				'App.txt',
				'package1.txt',
				'myDirectory/myDirectory2/index.txt',
			]);

			await build.clean(true);

			// @ts-expect-error no types for extending jest functions
			expect(BUILD_PATH).not.toBeDirectory();

			// @ts-expect-error no types for extending jest functions
			expect(BUILD_PATH).not.toHaveAllFilesAndDirectories([
				'index.js',
				'index.txt',
				'dynamic.txt',
				'App.txt',
				'package1.txt',
				'myDirectory/myDirectory2/index.txt',
				'myDirectory/',
			]);
		});

		it.only('should be able to delete all created files and directories when not a new folder', async () => {
			const tps = mkTemplate('testing_build_built', CWD, {
				'default/index.txt': 'index.txt',
				'default/dynamic.txt.dot': 'dynamic.txt.dot',
				'default/{{=tps.name}}.txt.dot': '{{=tps.name}}.txt.dot',
				'default/myDirectory/.tpskeep': '',
				// @ts-expect-error - something
				'default/myDirectory/myDirectory2/': {},
				'default/myDirectory/myDirectory2/index.txt': '',
				'package1/package1.txt': 'package1.txt',
				'package2/package2.txt': 'package2.txt',
			});

			tps.loadPackage('package1');

			const template = new Template(
				tps.template,
				tps.src,
				tps.templateSettings,
				tps.packages,
				tps.packagesUsed,
				tps.compiledFiles,
				// @ts-expect-error - private
				// eslint-disable-next-line no-underscore-dangle
				tps._defs,
			);

			const build = new Build(BUILD_PATH, template);

			await build.render();

			// @ts-expect-error no types for extending jest functions
			expect(BUILD_PATH).toHaveAllFilesAndDirectories([
				'index.js',
				'index.txt',
				'dynamic.txt',
				'App.txt',
				'package1.txt',
				'myDirectory/myDirectory2/index.txt',
			]);

			await build.clean(false);

			// @ts-expect-error no types for extending jest functions
			expect(BUILD_PATH).toBeDirectory();

			// @ts-expect-error no types for extending jest functions
			expect(BUILD_PATH).not.toHaveAllFilesAndDirectories([
				'index.js',
				'index.txt',
				'dynamic.txt',
				'App.txt',
				'package1.txt',
				'myDirectory/myDirectory2/index.txt',
				'myDirectory/',
			]);
		});
	});
});
