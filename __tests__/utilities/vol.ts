import { Volume } from 'memfs';
import { Volume as _Volume } from 'memfs/lib/volume';
// eslint-disable-next-line import/no-unresolved -- Generated file
import templateFiles from '@test/templates.json';

export const vol = new Volume();

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
