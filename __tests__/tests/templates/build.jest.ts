import path from 'path';
import { Build } from '@tps/templates/build';
import { Template } from '@tps/templates/template';
import { CWD } from '@tps/utilities/constants';
import { reset, vol } from '@test/utilities/vol';
import { DEFAULT_BUILD_FILES, mkTemplate } from '@test/utilities/templates';
import { FileExistError } from '@tps/errors';
import { writeFile } from '@test/utilities/helpers';

jest.mock('fs');

const BUILD_PATH = path.join(CWD, 'App');

const templateName = 'testing_build';

describe('Build', () => {
	beforeEach(async async () => {
		jest.restoreAllMocks();
		reset();

		await mkTemplate(templateName);
	});

	it('should be able to track directories and files built', async () => {
		const tps = await mkTemplate('testing_build_built', CWD, {
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

		await template.compile();

		const build = new Build(BUILD_PATH, template);

		await build.render();

		expect(build.built).toStrictEqual(
			expect.objectContaining({
				files: expect.arrayContaining([
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
			const tps = await mkTemplate('testing_build_built', CWD, {
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
			);

			await template.compile();

			const build = new Build(BUILD_PATH, template);

			await build.render();

			// @ts-expect-error no types for extending jest functions
			expect(BUILD_PATH).toHaveAllFilesAndDirectories([
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
				'index.txt',
				'dynamic.txt',
				'App.txt',
				'package1.txt',
				'myDirectory/myDirectory2/index.txt',
				'myDirectory/',
			]);
		});

		it('should be able to delete all created files and directories when not a new folder', async () => {
			const tps = await mkTemplate('testing_build_built', CWD, {
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
			);

			await template.compile();

			const build = new Build(BUILD_PATH, template);

			await build.render();

			// @ts-expect-error no types for extending jest functions
			expect(BUILD_PATH).toHaveAllFilesAndDirectories([
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
				'index.txt',
				'dynamic.txt',
				'App.txt',
				'package1.txt',
				'myDirectory/myDirectory2/index.txt',
				'myDirectory/',
			]);
		});
	});

	describe('create', () => {
		it('should be able to create custom files', async () => {
			const tps = await mkTemplate('testing_build_built', CWD);

			const template = new Template(
				tps.template,
				tps.src,
				tps.templateSettings,
				tps.packages,
				tps.packagesUsed,
			);

			await template.compile();

			const build = new Build(BUILD_PATH, template);

			template.createFile('./custom.txt', 'hey');

			await build.render();

			// @ts-expect-error no types for extending jest functions
			expect(BUILD_PATH).toHaveAllFilesAndDirectories([
				...DEFAULT_BUILD_FILES,
				'./custom.txt',
			]);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(BUILD_PATH, './custom.txt')).toHaveFileContents('hey');
		});

		it('should be able to create custom files in sub directories', async () => {
			const tps = await mkTemplate('testing_build_built', CWD);

			const template = new Template(
				tps.template,
				tps.src,
				tps.templateSettings,
				tps.packages,
				tps.packagesUsed,
			);

			await template.compile();

			const build = new Build(BUILD_PATH, template);

			template.createFile('./path/to/dir/custom.txt', 'hey');

			await build.render();

			// @ts-expect-error no types for extending jest functions
			expect(BUILD_PATH).toHaveAllFilesAndDirectories([
				...DEFAULT_BUILD_FILES,
				'./path/to/dir/custom.txt',
			]);

			expect(
				path.join(BUILD_PATH, './path/to/dir/custom.txt'),
				// @ts-expect-error no types for extending jest functions
			).toHaveFileContents('hey');
		});

		it('should be able to create custom dynamic files', async () => {
			const tps = await mkTemplate('testing_build_built', CWD);

			const template = new Template(
				tps.template,
				tps.src,
				tps.templateSettings,
				tps.packages,
				tps.packagesUsed,
			);

			await template.compile();

			const build = new Build(BUILD_PATH, template);

			template.createFile('./custom.txt.tps', '{{=tps.name}}');

			await build.render();

			// @ts-expect-error no types for extending jest functions
			expect(BUILD_PATH).toHaveAllFilesAndDirectories([
				...DEFAULT_BUILD_FILES,
				'./custom.txt',
			]);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(BUILD_PATH, './custom.txt')).toHaveFileContents('App');
		});

		it('should be able to create custom files that use dynamic names', async () => {
			const tps = await mkTemplate('testing_build_built', CWD);

			const template = new Template(
				tps.template,
				tps.src,
				tps.templateSettings,
				tps.packages,
				tps.packagesUsed,
			);

			await template.compile();

			const build = new Build(BUILD_PATH, template);

			template.createFile('./{{=tps.name}}.txt', 'hey');

			await build.render();

			// @ts-expect-error no types for extending jest functions
			expect(BUILD_PATH).toHaveAllFilesAndDirectories([
				...DEFAULT_BUILD_FILES,
				'./App.txt',
			]);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(BUILD_PATH, './App.txt')).toHaveFileContents('hey');
		});

		// it('should fail if file creates a conflict', async () => {
		// 	const tps = await mkTemplate('testing_build_built', CWD);

		// 	const template = new Template(
		// 		tps.template,
		// 		tps.src,
		// 		tps.templateSettings,
		// 		tps.packages,
		// 		tps.packagesUsed,
		// 		tps.compiledFiles,
		// 		// @ts-expect-error - private
		// 		// eslint-disable-next-line no-underscore-dangle
		// 		tps._defs,
		// 	);

		// await template.compile();

		// 	const build = new Build(BUILD_PATH, template);

		// 	template.createFile(DEFAULT_BUILD_FILES[0], 'hey');

		// 	await expect(build.render()).rejects.toThrowError(BuildError);
		// });

		it('should fail to create custom file if already exists', async () => {
			const tps = await mkTemplate('testing_build_built');

			const template = new Template(
				tps.template,
				tps.src,
				tps.templateSettings,
				tps.packages,
				tps.packagesUsed,
			);

			await template.compile();

			const build = new Build(BUILD_PATH, template);

			writeFile(path.join(CWD, './App/custom.txt'), 'original');

			template.createFile('./custom.txt', 'hey');

			await expect(build.render()).rejects.toThrowError(FileExistError);

			// @ts-expect-error no types for extending jest functions
			expect(path.join(BUILD_PATH, './custom.txt')).toHaveFileContents(
				'original',
			);
		});

		it('should create custom file if already exists but force', async () => {
			const tps = await mkTemplate('testing_build_built', CWD, undefined, {
				force: true,
			});

			const template = new Template(
				tps.template,
				tps.src,
				tps.templateSettings,
				tps.packages,
				tps.packagesUsed,
			);

			const build = new Build(BUILD_PATH, template, { force: true });

			writeFile(path.join(CWD, './App/custom.txt'), 'original');

			template.createFile('./custom.txt', 'hey', {
				// mimics how normal flow works
				force: tps.opts.force,
			});

			await build.render();

			// @ts-expect-error no types for extending jest functions
			expect(path.join(BUILD_PATH, './custom.txt')).toHaveFileContents('hey');
		});

		it('should create custom file if already exists but wipe', async () => {
			const tps = await mkTemplate('testing_build_built', CWD, undefined, {
				wipe: true,
			});

			const template = new Template(
				tps.template,
				tps.src,
				tps.templateSettings,
				tps.packages,
				tps.packagesUsed,
			);

			const build = new Build(BUILD_PATH, template, { wipe: true });

			writeFile(path.join(CWD, './App/custom.txt'), 'original');

			template.createFile('./custom.txt', 'hey');

			await build.render();

			// @ts-expect-error no types for extending jest functions
			expect(path.join(BUILD_PATH, './custom.txt')).toHaveFileContents('hey');
		});

		it('should be able to create custom directory', async () => {
			const tps = await mkTemplate('testing_build_built', CWD);

			const template = new Template(
				tps.template,
				tps.src,
				tps.templateSettings,
				tps.packages,
				tps.packagesUsed,
			);

			await template.compile();

			const build = new Build(BUILD_PATH, template);

			template.createDirectory('./custom');

			await build.render();

			// @ts-expect-error no types for extending jest functions
			expect(BUILD_PATH).toHaveAllFilesAndDirectories([
				...DEFAULT_BUILD_FILES,
				'./custom',
			]);
		});

		it('should be able to create custom sub directories', async () => {
			const tps = await mkTemplate('testing_build_built', CWD);

			const template = new Template(
				tps.template,
				tps.src,
				tps.templateSettings,
				tps.packages,
				tps.packagesUsed,
			);

			await template.compile();

			const build = new Build(BUILD_PATH, template);

			template.createDirectory('./custom/path/to');

			await build.render();

			// @ts-expect-error no types for extending jest functions
			expect(BUILD_PATH).toHaveAllFilesAndDirectories([
				...DEFAULT_BUILD_FILES,
				'./custom/path/to',
			]);
		});
	});
});
