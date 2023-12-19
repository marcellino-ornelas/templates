import { vol as _vol, fs as _fs } from 'memfs';
// eslint-disable-next-line import/no-unresolved -- Generated file
import templateFiles from '@test/templates.json';
import { CWD } from '@tps/utilities/constants';
import path from 'path';

export const vol = _vol;
export const fs = _fs;

export function reset() {
	vol.reset();

	vol.fromJSON({
		[`${process.cwd()}/readme.md`]: '',
		[`${process.cwd()}/__tests__/readme.md`]: '',
		...templateFiles,
	});

	// vol.rmSync(path.join(CWD, '.tps/.tpsrc'), { force: true });
}

/**
 * Initialize file system
 */
reset();
