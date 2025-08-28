/*
 * Modules
 */
import {
	DEFAULT_PROMPT,
	mkPrompt,
	mkSettingsFileJSON,
	mkTemplate,
} from '@test/utilities/templates';
import { reset } from '@test/utilities/vol';
// eslint-disable-next-line import/no-relative-packages
import { TemplatesLibrariesPlugin } from '../../docs/plugins/templates-libraries-plugin';

jest.mock('fs');

describe('Templates library plugin', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		reset();
	});

	it('should be able to load a template  with a json settings file', async () => {
		const setGlobalData = jest.fn();
		const templateName = 'templates-library-plugin';

		await mkTemplate(templateName, undefined, {
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
					[templateName]: expect.objectContaining({
						name: templateName,
						settings: {
							opts: {},
							prompts: expect.arrayContaining([DEFAULT_PROMPT]),
						},
					}),
				}),
			}),
		);
	});

	// it('should be able to load a template with settings js file', async () => {
	// 	const setGlobalData = jest.fn();
	// 	const templateName = 'templates-library-plugin';

	// 	await mkTemplate(templateName);

	// 	await TemplatesLibrariesPlugin(null, {
	// 		templates: [templateName],
	// 	}).contentLoaded({
	// 		actions: { setGlobalData },
	// 	});

	// 	expect(setGlobalData).toHaveBeenCalledWith(
	// 		expect.objectContaining({
	// 			templates: expect.objectContaining({
	// 				[templateName]: {
	// 					name: templateName,
	// 					settings: {
	// 						prompts: expect.arrayContaining([DEFAULT_PROMPT]),
	// 					},
	// 				},
	// 			}),
	// 		}),
	// 	);
	// });
});
