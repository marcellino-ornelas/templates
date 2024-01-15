import { vol } from 'memfs';
// eslint-disable-next-line import/no-unresolved -- Generated file
import templateFiles from '@test/templates.json';
import path from 'path';

export { vol, fs } from 'memfs';

export function reset() {
	vol.reset();

	vol.fromJSON({
		[`${process.cwd()}/readme.md`]: '',
		[`${process.cwd()}/__tests__/readme.md`]: '',
		...templateFiles,
	});

	vol.rmSync(path.join(__dirname, '../../.tps/.tpsrc'), { force: true });
}

/**
 * Initialize file system
 */
reset();
