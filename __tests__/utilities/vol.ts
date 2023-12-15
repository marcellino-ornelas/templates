// import { Volume } from 'memfs';
import { vol as _vol, fs as _fs } from 'memfs';
// eslint-disable-next-line import/no-unresolved -- Generated file
import templateFiles from '@test/templates.json';

export const vol = _vol;
export const fs = _fs;

export function reset() {
	vol.reset();

	vol.fromJSON({
		[`${process.cwd()}/readme.md`]: '',
		[`${process.cwd()}/__tests__/readme.md`]: '',
		...templateFiles,
	});
}

// export function reset() {
// 	vol.reset();

// 	vol.fromJSON({
// 		[`${process.cwd()}/readme.md`]: '',
// 		[`${process.cwd()}/__tests__/readme.md`]: '',
// 		...templateFiles,
// 	});
// }

reset();
