import { RecursivePartial } from '@tps/types/helpers';
import { Tpsrc } from '@tps/types/tpsrc';
import { vol } from '@test/utilities/vol';
import path from 'path';
import os from 'os';
import { CWD, USER_HOME } from '@tps/utilities/constants';
import { DirectoryJSON } from 'memfs';
import { SettingsFilePrompt } from '@tps/types/settings';

export type OptionsTpsrc = RecursivePartial<Tpsrc>;

export const mkTpsrc = (pathToTpsrc: string, tpsrc: OptionsTpsrc): void => {
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

const DEFAULT_TEMPLATE_FILES: DirectoryJSON = { './default/index.js': 'hey' };

export const mkTemplateBase = (
	/**
	 * full path to the template folder including name
	 *
	 * @example /User/marcellinoornelas/Desktop/project/.tps/<template-name>
	 * @example /usr/lib/node_modules/<template-name>
	 */
	location: string,
	json: DirectoryJSON = {},
): void => {
	vol.fromJSON({ ...DEFAULT_TEMPLATE_FILES, ...json }, location);
};

export const mkTemplate = (
	name: string,
	directory: string = CWD,
	json: DirectoryJSON = {},
): void => {
	mkTemplateBase(path.join(directory, `.tps/${name}/`), json);
};

export const mk3rdPartyTemplate = (
	name: string,
	json: DirectoryJSON = {},
): void => {
	mkTemplateBase(path.join('/usr/lib/node_modules', name), json);
};

export const mkGlobalTemplate = (
	name: string,
	json: DirectoryJSON = {},
): void => {
	mkTemplate(name, USER_HOME, json);
};

export const DEFAULT_PROMPT: SettingsFilePrompt = {
	name: 'prompt1',
	message: 'Prompt1?',
	tpsType: 'data',
	type: 'input',
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
