import {
	DEFAULT_SETTINGS_FILE,
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
	beforeEach(() => {
		// jest.resetAllMocks();
		reset();
	});

	describe('Fetching Template', () => {
		it('should be able to get a template', async () => {
			mkTemplate(templateName, undefined, {
				'./.settingsrc': mkSettingsFileJSON(),
			});

			const template = await Template.get(templateName);

			expect(template.name).toBe(templateName);

			expect(template.location).toBe(path.join(CWD, '.tps', templateName));
			expect(template.settingsFile).toStrictEqual(DEFAULT_SETTINGS_FILE);
		});

		it('should be able to get a local template', async () => {
			mkTemplate(templateName, undefined, {
				'settings.json': mkSettingsFileJSON(),
			});

			const template = await Template.get(templateName);

			expect(template.location).toBe(path.join(CWD, '.tps', templateName));
			expect(template.settingsFile).toStrictEqual(DEFAULT_SETTINGS_FILE);
		});

		it('should be able to get a global template', async () => {
			mkGlobalTemplate(templateName, {
				'settings.json': mkSettingsFileJSON(),
			});

			const template = await Template.get(templateName);

			expect(template.location).toBe(
				path.join(USER_HOME, '.tps', templateName),
			);
			expect(template.settingsFile).toStrictEqual(DEFAULT_SETTINGS_FILE);
		});

		it('should be able to get a global template', async () => {
			mkGlobalTemplate(templateName, {
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
			mk3rdPartyTemplate(templateNameTps, undefined, {
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
			mkGlobal3rdPartyTemplate(templateNameTps, {
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
		mkTemplate(templateName, undefined, {
			'./.settingsrc': mkSettingsFileJSON(),
		});

		const template = await Template.get(templateName);

		expect(template.packages.default).toBeInstanceOf(DirectoryNode);
	});
});
