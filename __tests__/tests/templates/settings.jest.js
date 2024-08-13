/*
 * Modules
 */
import Templates from '@test/templates';
import { mkTemplate } from '@test/utilities/templates';
import { CWD } from '@tps/utilities/constants';
import { reset } from '@test/utilities/vol';
import path from 'path';

jest.mock('fs');

describe('[Templates] Settings:', () => {
	beforeEach(() => {
		reset();
	});

	it('should load json settings correctly', () => {
		const tps = new Templates('testing-settings-json');

		expect(tps.templateSettings).toEqual({
			name: 'lino',
		});
	});

	it('should load js settings correctly', () => {
		const tps = new Templates('testing-settings-js');

		expect(tps.templateSettings).toEqual({
			name: 'lino',
		});
	});

	it('should be empty when no settings file is found', () => {
		const tps = new Templates('testing-settings-no-settings');

		expect(tps.templateSettings).toEqual({});
	});

	describe('events', () => {
		it('should ignore event if not specified', async () => {
			mkTemplate('test-events-on-render');

			const tps = new Templates('test-events-on-render');

			await tps.render(CWD, 'App');

			expect(path.join(CWD, 'App')).toBeDirectory();
		});

		it('Should be able to use onRender event', async () => {
			mkTemplate('test-events-on-render');

			const tps = new Templates('test-events-on-render');

			tps.templateSettings.events = {};
			tps.templateSettings.events.onRender = jest
				.fn()
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.mockImplementation((_) => {
					expect(path.join(CWD, 'App')).not.toBeDirectory();
				});

			await tps.render(CWD, 'App');

			expect(path.join(CWD, 'App')).toBeDirectory();
		});

		it('Should be able to use onRendered event with single build path', async () => {
			mkTemplate('test-events-on-rendered');

			const tps = new Templates('test-events-on-rendered');

			tps.templateSettings.events = {};
			tps.templateSettings.events.onRendered = jest
				.fn()
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.mockImplementation((_, createdPath) => {
					// all build paths should be completed
					expect(createdPath).toBeDirectory();
				});

			await tps.render(CWD, 'App');
		});

		it('Should be able to use onRendered event with multiple build paths', async () => {
			mkTemplate('test-events-on-rendered');

			const tps = new Templates('test-events-on-rendered');

			tps.templateSettings.events = {};
			tps.templateSettings.events.onRendered = jest
				.fn()
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.mockImplementation((_, createdPaths) => {
					// all build paths should be completed
					createdPaths.forEach((createdPath) => {
						expect(createdPath).toBeDirectory();
					});
				});

			await tps.render(CWD, ['App', 'App2']);
		});

		it('Should be able to use onBuildPathRender event', async () => {
			mkTemplate('test-events-on-build-path-render');

			const tps = new Templates('test-events-on-build-path-render');

			tps.templateSettings.events = {};
			tps.templateSettings.events.onBuildPathRender = jest
				.fn()
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.mockImplementation((_, buildPath) => {
					expect(buildPath).not.toBeDirectory();
				});

			await tps.render(CWD, ['App', 'App2']);
		});

		it('Should be able to use onBuildPathRendered event', async () => {
			mkTemplate('test-events-on-build-path-rendered');

			const tps = new Templates('test-events-on-build-path-rendered');

			tps.templateSettings.events = {};
			tps.templateSettings.events.onBuildPathRendered = jest
				.fn()
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.mockImplementation((_, buildPath) => {
					expect(buildPath).toBeDirectory();
				});

			await tps.render(CWD, ['App', 'App2']);
		});
	});
});
