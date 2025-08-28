import { RecursivePartial } from '@tps/types/helpers';
import { Tpsrc } from '@tps/types/tpsrc';
import { vol } from '@test/utilities/vol';
import path from 'path';
import os from 'os';
import { CWD, USER_HOME } from '@tps/utilities/constants';
import { DirectoryJSON } from 'memfs';
import { SettingsFile, SettingsFilePrompt } from '@tps/types/settings';
import Templates from '@tps/templates';
import { TemplatesOptions } from '@tps/types/templates';

export type OptionsTpsrc = RecursivePartial<Tpsrc>;

export const mkTpsrc = (
	pathToTpsrc: string,
	tpsrc: OptionsTpsrc = {},
): void => {
	mkFile(pathToTpsrc, JSON.stringify(tpsrc));
};

const GLOBAL_TPS: string = path.join(os.homedir(), '.tps');
const GLOBAL_TPSRC: string = path.join(GLOBAL_TPS, '.tpsrc');

export const mkGlobalTpsrc = (tpsrc: OptionsTpsrc): void => {
	mkFile(GLOBAL_TPSRC, JSON.stringify(tpsrc));
};

export const mkFile = (file: string, data: string): void => {
	vol.mkdirSync(path.dirname(file), { recursive: true });

	vol.writeFileSync(file, data);
};
export const DEFAULT_TEMPLATE_FILES: DirectoryJSON = {
	'./default/index.js': 'hey',
};

export const DEFAULT_BUILD_FILES = ['index.js'];

export const mkTemplateBase = async (
	/**
	 * full path to the template folder including name
	 *
	 * @example /User/marcellinoornelas/Desktop/project/.tps/<template-name>
	 * @example /usr/lib/node_modules/<template-name>
	 */
	location: string,
	json: DirectoryJSON = DEFAULT_TEMPLATE_FILES,
	opts: Partial<TemplatesOptions> = {},
): Promise<Templates> => {
	vol.fromJSON(json, location);

	const templatename = path.basename(location);

	return Templates.get(templatename, {
		default: true,
		...opts,
	});
};

export const mkTemplate = async (
	name: string,
	directory: string = CWD,
	json: DirectoryJSON = DEFAULT_TEMPLATE_FILES,
	opts: Partial<TemplatesOptions> = {},
): Promise<Templates> => {
	return mkTemplateBase(path.join(directory, `.tps/${name}/`), json, opts);
};

export const mk3rdPartyTemplate = async (
	name: string,
	location: string = CWD,
	json: DirectoryJSON = DEFAULT_TEMPLATE_FILES,
	opts: Partial<TemplatesOptions> = {},
): Promise<Templates> => {
	if (!name.startsWith('tps-')) {
		throw new Error('3rd party template must with tps- ');
	}
	return mkTemplateBase(path.join(location, 'node_modules', name), json, opts);
};

export const mkGlobal3rdPartyTemplate = async (
	name: string,
	json: DirectoryJSON = DEFAULT_TEMPLATE_FILES,
	opts: Partial<TemplatesOptions> = {},
): Promise<Templates> => {
	return mk3rdPartyTemplate(name, '/usr/lib', json, opts);
};

export const mkGlobalTemplate = async (
	name: string,
	json: DirectoryJSON = DEFAULT_TEMPLATE_FILES,
	opts: Partial<TemplatesOptions> = {},
): Promise<Templates> => {
	return mkTemplate(name, USER_HOME, json, opts);
};

export const DEFAULT_SETTINGS_FILE: SettingsFile = {
	opts: {},
	prompts: [],
};

export type OptionsSettingsFile = Partial<SettingsFile>;

export const mkSettingsFile = (
	settings: OptionsSettingsFile = {},
): SettingsFile => {
	return { ...DEFAULT_SETTINGS_FILE, ...settings };
};

export const mkSettingsFileJSON = (
	settings: OptionsSettingsFile = {},
): string => {
	return JSON.stringify(mkSettingsFile(settings));
};

export const DEFAULT_PROMPT: SettingsFilePrompt = {
	name: 'prompt1',
	message: 'Prompt1?',
	tpsType: 'data',
	type: 'confirm',
};

export const mkPrompt = (
	prompt: Partial<SettingsFilePrompt> = {},
): SettingsFilePrompt => {
	return {
		...DEFAULT_PROMPT,
		...prompt,
	};
};

export const init = (tpsrc: OptionsTpsrc = {}): void => {
	mkTpsrc(`${CWD}/.tps/.tpsrc`, tpsrc);
};

export const globalInit = (tpsrc: OptionsTpsrc = {}): void => {
	mkTpsrc(`${USER_HOME}/.tps/.tpsrc`, tpsrc);
};
