import { RecursivePartial } from '@tps/types/helpers';
import { Tpsrc } from '@tps/types/tpsrc';
import { vol } from '@test/utilities/vol';
import path from 'path';
import os from 'os';
import { CWD, USER_HOME } from '@tps/utilities/constants';
import { DirectoryJSON } from 'memfs';

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

export const mkTemplate = (
	name: string,
	json: DirectoryJSON = { './default/index.js': 'hey' },
	global = false,
) => {
	const location = global ? USER_HOME : CWD;

	vol.fromJSON(json, `${location}/.tps/${name}/`);

	return vol;
};

export const init = (tpsrc: OptionsTpsrc = {}): void => {
	mkTpsrc(`${CWD}/.tps/.tpsrc`, tpsrc);
};

export const globalInit = (tpsrc: OptionsTpsrc = {}): void => {
	mkTpsrc(`${USER_HOME}/.tps/.tpsrc`, tpsrc);
};
