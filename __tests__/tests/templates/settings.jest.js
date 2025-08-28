/*
 * Modules
 */
import Templates from '@test/templates';
import { DEFAULT_BUILD_FILES, mkTemplate } from '@test/utilities/templates';
import { CWD } from '@tps/utilities/constants';
import { reset } from '@test/utilities/vol';
import path from 'path';

jest.mock('fs');

describe('[Templates] Settings:', () => {
	beforeEach(() => {
		reset();
	});

	it('should load json settings correctly', async () => {
		const tps = await Templates.get('testing-settings-json');

		expect(tps.templateSettings).toEqual({
			name: 'lino',
		});
	});

	it('should load js settings correctly', async () => {
		const tps = await Templates.get('testing-settings-js');

		expect(tps.templateSettings).toEqual({
			name: 'lino',
		});
	});

	it('should be empty when no settings file is found', async () => {
		const tps = await Templates.get('testing-settings-no-settings');

		expect(tps.templateSettings).toEqual({});
	});

	describe('events', () => {
		it('should ignore event if not specified', async () => {
			mkTemplate('test-events-on-render');

			const tps = await Templates.get('test-events-on-render');

			await tps.render(CWD, 'App');

			expect(path.join(CWD, 'App')).toBeDirectory();
		});

		it('Should be able to use onRender event', async () => {
			mkTemplate('test-events-on-render');

			const tps = await Templates.get('test-events-on-render');

			tps.templateSettings.events = {};
			tps.templateSettings.events.onRender = jest
				.fn()
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.mockImplementation((_) => {
					// TODO: doesnt work
					// expect(path.join(CWD, 'App')).not.toBeDirectory();
				});

			await tps.render(CWD, 'App');

			expect(path.join(CWD, 'App')).toBeDirectory();

			expect(tps.templateSettings.events.onRender).toHaveBeenCalled();
		});

		it('Should be able to use onRendered event with single build path', async () => {
			mkTemplate('test-events-on-rendered');

			const tps = await Templates.get('test-events-on-rendered');

			tps.templateSettings.events = {};
			tps.templateSettings.events.onRendered = jest
				.fn()
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.mockImplementation((_, { buildPaths }) => {
					// all build paths should be completed
					buildPaths.forEach((createdPath) => {
						expect(createdPath).toBeDirectory();
					});
				});

			await tps.render(CWD, 'App');

			expect(tps.templateSettings.events.onRendered).toHaveBeenCalledWith(tps, {
				dest: CWD,
				buildPaths: [path.join(CWD, 'App')],
			});
		});

		it('Should be able to use onRendered event with multiple build paths', async () => {
			mkTemplate('test-events-on-rendered');

			const tps = await Templates.get('test-events-on-rendered');

			tps.templateSettings.events = {};
			tps.templateSettings.events.onRendered = jest
				.fn()
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.mockImplementation((_, { buildPaths }) => {
					// all build paths should be completed
					buildPaths.forEach((createdPath) => {
						expect(createdPath).toBeDirectory();
					});
				});

			await tps.render(CWD, ['App', 'App2']);

			expect(tps.templateSettings.events.onRendered).toHaveBeenCalledWith(tps, {
				dest: CWD,
				buildPaths: [path.join(CWD, 'App'), path.join(CWD, 'App2')],
			});
		});

		it('Should be able to use onBuildPathRender event', async () => {
			mkTemplate('test-events-on-build-path-render');

			const tps = await Templates.get('test-events-on-build-path-render');

			tps.templateSettings.events = {};
			tps.templateSettings.events.onBuildPathRender = jest
				.fn()
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.mockImplementation((_, { buildPath }) => {
					expect(buildPath).not.toBeDirectory();
				});

			await tps.render(CWD, ['App', 'App2']);

			expect(
				tps.templateSettings.events.onBuildPathRender,
			).toHaveBeenCalledTimes(2);

			expect(
				tps.templateSettings.events.onBuildPathRender,
			).toHaveBeenNthCalledWith(1, tps, {
				buildPath: path.join(CWD, 'App'),
			});

			expect(
				tps.templateSettings.events.onBuildPathRender,
			).toHaveBeenNthCalledWith(2, tps, {
				buildPath: path.join(CWD, 'App2'),
			});
		});

		it('Should be able to use onBuildPathRendered event', async () => {
			mkTemplate('test-events-on-build-path-rendered');

			const tps = await Templates.get('test-events-on-build-path-rendered');

			tps.templateSettings.events = {};
			tps.templateSettings.events.onBuildPathRendered = jest
				.fn()
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.mockImplementation((_, { buildPath }) => {
					expect(buildPath).toBeDirectory();
				});

			await tps.render(CWD, ['App', 'App2']);

			expect(
				tps.templateSettings.events.onBuildPathRendered,
			).toHaveBeenCalledTimes(2);

			expect(
				tps.templateSettings.events.onBuildPathRendered,
			).toHaveBeenNthCalledWith(1, tps, {
				buildPath: path.join(CWD, 'App'),
			});

			expect(
				tps.templateSettings.events.onBuildPathRendered,
			).toHaveBeenNthCalledWith(2, tps, {
				buildPath: path.join(CWD, 'App2'),
			});
		});

		it('Should be able to create files from events', async () => {
			const tps = mkTemplate('test-events-on-build-path-rendered');

			tps.templateSettings.events = {};
			tps.templateSettings.events.onRender = jest.fn(
				async (_, { createFile }) => {
					createFile('./custom.txt', 'hey');
					createFile('custom2.txt', 'hey');
					createFile('./some/path/custom.txt', 'hey');
				},
			);

			const resultPath = await tps.render(CWD, 'App');

			expect(tps.templateSettings.events.onRender).toHaveBeenCalledTimes(1);

			expect(resultPath).toHaveAllFilesAndDirectories([
				...DEFAULT_BUILD_FILES,
				'custom.txt',
				'custom2.txt',
				'some/path/custom.txt',
			]);
		});

		it('Should be able to create directories from events', async () => {
			const tps = mkTemplate('test-events-on-build-path-rendered');

			tps.templateSettings.events = {};
			tps.templateSettings.events.onRender = jest.fn(
				async (_, { createDirectory }) => {
					createDirectory('./dir');
					createDirectory('./dir/dir2');
				},
			);

			const resultPath = await tps.render(CWD, 'App');

			expect(tps.templateSettings.events.onRender).toHaveBeenCalledTimes(1);

			expect(resultPath).toHaveAllFilesAndDirectories([
				...DEFAULT_BUILD_FILES,
				'./dir',
				'./dir/dir2',
			]);
		});
	});
});
