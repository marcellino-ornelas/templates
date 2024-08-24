/*
 * Modules
 */
import {
	DEFAULT_PROMPT,
	mkPrompt,
	mkSettingsFileJSON,
	mkTemplate,
} from '@test/utilities/templates';
import Templates from '@tps/templates';
import { CWD } from '@tps/utilities/constants';
import { reset, vol } from '@test/utilities/vol';
// eslint-disable-next-line import/no-relative-packages
import { TemplatesLibrariesPlugin } from '../../docs/plugins/templates-libraries-plugin';

jest.mock('fs');

describe('Templates library plugin', () => {
	beforeEach(() => {
		// jest.resetAllMocks();
		reset();
	});

	it('should be able to load a template', async () => {
		const setGlobalData = jest.fn();
		const templateName = 'templates-library-plugin';

		mkTemplate(templateName, undefined, {
			'settings.json': mkSettingsFileJSON({
				prompts: [mkPrompt()],
			}),
		});

		await TemplatesLibrariesPlugin(null, {
			templates: ['templates-library-plugin'],
		}).contentLoaded({
			actions: { setGlobalData },
		});

		expect(setGlobalData).toHaveBeenCalledWith(
			expect.objectContaining({
				templates: expect.objectContaining({
					'templates-library-plugin': {
						name: 'templates-library-plugin',
						settings: {
							prompts: expect.arrayContaining([DEFAULT_PROMPT]),
						},
					},
				}),
			}),
		);
	});

	it('should be able to load a template with settings json file', async () => {
		const setGlobalData = jest.fn();
		const templateName = 'templates-library-plugin';

		mkTemplate(templateName, undefined, {
			'settings.json': mkSettingsFileJSON({
				prompts: [mkPrompt()],
			}),
		});

		await TemplatesLibrariesPlugin(null, {
			templates: [templateName],
		}).contentLoaded({
			actions: { setGlobalData },
		});

		expect(setGlobalData).toHaveBeenCalledWith(
			expect.objectContaining({
				templates: expect.objectContaining({
					[templateName]: {
						name: templateName,
						settings: {
							prompts: expect.arrayContaining([DEFAULT_PROMPT]),
						},
					},
				}),
			}),
		);
	});

	it('should be able to load a template with settings json file', async () => {
		const setGlobalData = jest.fn();
		const templateName = 'templates-library-plugin';

		mkTemplate(templateName, undefined, {
			'settings.js': `\
module.exports = {
	prompts: [
		${JSON.stringify(mkPrompt())}
	],
};`,
		});

		console.log(
			vol.toTree({
				dir: '/Users/marcellinoornelas/Desktop/templates/__tests__/.tps/templates-library-plugin',
			}),
		);

		await TemplatesLibrariesPlugin(null, {
			templates: [templateName],
		}).contentLoaded({
			actions: { setGlobalData },
		});

		expect(setGlobalData).toHaveBeenCalledWith(
			expect.objectContaining({
				templates: expect.objectContaining({
					[templateName]: {
						name: templateName,
						settings: {
							prompts: expect.arrayContaining([DEFAULT_PROMPT]),
						},
					},
				}),
			}),
		);
	});
});
