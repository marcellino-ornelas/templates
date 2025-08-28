import {
	DEFAULT_SETTINGS_FILE,
	DEFAULT_TEMPLATE_FILES,
	mk3rdPartyTemplate,
	mkGlobal3rdPartyTemplate,
	mkGlobalTemplate,
	mkSettingsFileJSON,
	mkTemplate,
} from '@test/utilities/templates';
import { Template } from '@tps/templates/template';
import { CWD, USER_HOME } from '@tps/utilities/constants';
import { reset } from '@test/utilities/vol';
import path from 'path';
import DirectoryNode from '@tps/fileSystemTree';

jest.mock('fs');
jest.mock('fs/promises');

const templateName = 'template-core';

describe('Template', () => {
	beforeEach(async () => {
		// jest.resetAllMocks();
		reset();
	});

	describe('Fetching Template', () => {
		it('should be able to get a template', async () => {
			await mkTemplate(templateName, undefined, {
				...DEFAULT_TEMPLATE_FILES,
				'./.settingsrc': mkSettingsFileJSON(),
			});

			const template = await Template.get(templateName);

			expect(template.name).toBe(templateName);

			expect(template.location).toBe(path.join(CWD, '.tps', templateName));
			expect(template.settingsFile).toStrictEqual(DEFAULT_SETTINGS_FILE);
		});

		it('should be able to get a local template', async () => {
			await mkTemplate(templateName, undefined, {
				...DEFAULT_TEMPLATE_FILES,
				'settings.json': mkSettingsFileJSON(),
			});

			const template = await Template.get(templateName);

			expect(template.location).toBe(path.join(CWD, '.tps', templateName));
			expect(template.settingsFile).toStrictEqual(DEFAULT_SETTINGS_FILE);
		});

		it('should be able to get a global template', async () => {
			await mkGlobalTemplate(templateName, {
				...DEFAULT_TEMPLATE_FILES,
				'settings.json': mkSettingsFileJSON(),
			});

			const template = await Template.get(templateName);

			expect(template.location).toBe(
				path.join(USER_HOME, '.tps', templateName),
			);
			expect(template.settingsFile).toStrictEqual(DEFAULT_SETTINGS_FILE);
		});

		it('should be able to get a global template', async () => {
			await mkGlobalTemplate(templateName, {
				...DEFAULT_TEMPLATE_FILES,
				'settings.json': mkSettingsFileJSON(),
			});

			const template = await Template.get(templateName);

			expect(template.location).toBe(
				path.join(USER_HOME, '.tps', templateName),
			);
			expect(template.settingsFile).toStrictEqual(DEFAULT_SETTINGS_FILE);
		});

		it('should be able to get a 3rd party template', async () => {
			const templateNameTps = `tps-${templateName}`;
			await mk3rdPartyTemplate(templateNameTps, undefined, {
				...DEFAULT_TEMPLATE_FILES,
				'settings.json': mkSettingsFileJSON(),
			});

			const template = await Template.get(templateNameTps);

			expect(template.location).toBe(
				path.join(CWD, 'node_modules', templateNameTps),
			);
			expect(template.settingsFile).toStrictEqual(DEFAULT_SETTINGS_FILE);
		});

		it('should be able to get a global 3rd party template', async () => {
			const templateNameTps = `tps-${templateName}`;
			await mkGlobal3rdPartyTemplate(templateNameTps, {
				...DEFAULT_TEMPLATE_FILES,
				'settings.json': mkSettingsFileJSON(),
			});

			const template = await Template.get(templateNameTps);

			expect(template.location).toBe(
				path.join('/usr/lib', 'node_modules', templateNameTps),
			);
			expect(template.settingsFile).toStrictEqual(DEFAULT_SETTINGS_FILE);
		});
	});

	it('should load the default package by default', async () => {
		await mkTemplate(templateName, undefined, {
			...DEFAULT_TEMPLATE_FILES,
			'./.settingsrc': mkSettingsFileJSON(),
		});

		const template = await Template.get(templateName);

		expect(template.packages.default).toBeInstanceOf(DirectoryNode);
	});
});
