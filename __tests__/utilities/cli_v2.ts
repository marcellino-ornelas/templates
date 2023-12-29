// import { Volume } from 'memfs';
import { DirectoryJSON } from 'memfs/lib/volume';
import fs from 'fs';
import {
	USER_HOME,
	CWD,
	MAIN_DIR,
	DEFAULT_TPS,
} from '@tps/utilities/constants';
import { vol } from './vol';
import { mkTpsrc } from './templates';

// const DEFAULT_FILES = {
// 	[`${CWD}/readme.md`]: '',
// };

// /**
//  * Inside of constants, we override CWD to point to the __tests__ directory
//  *
//  * We may not have to do this anymore if everything is in memory but to be continued
//  */
// const dir = new DirectoryNode('.tps', TESTING_DIR);

// dir.find({ type: 'file' }).forEach((a: FileNode) => {
// 	const data = fs.readFileSync(a.path);
// 	DEFAULT_FILES[a.path] = data?.toString() ?? '';
// });

// export const createFs = (): _Volume => {
// 	const vol = new Volume();
// 	reset(vol);
// 	return vol;
// };

// export const reset = (vol: _Volume) => {
// 	vol.reset();
// 	vol.fromJSON(DEFAULT_FILES);
// };

// export const mkTemplate = (
// 	name: string,
// 	json: DirectoryJSON = { './default/index.js': 'hey' },
// 	global = false,
// ) => {
// 	const location = global ? USER_HOME : CWD;

// 	vol.fromJSON(json, `${location}/.tps/${name}/`);

// 	return vol;
// };

/**
 * Include default packages
 */
// const defaultTps = new DirectoryNode('.tps', MAIN_DIR);
const DEFAULT_TEMPLATES = {};

// defaultTps.find({ type: 'file' }).forEach((a: FileNode) => {
// 	const data = fs.readFileSync(a.path);
// 	DEFAULT_TEMPLATES[a.path] = data?.toString() ?? '';
// });

export const loadDefaultTemplates = (): void => {
	vol.fromJSON(
		{
			...DEFAULT_TEMPLATES,
		},
		DEFAULT_TPS,
	);
};
