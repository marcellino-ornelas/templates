/*
 * Modules
 */
import Templates from '@tps/templates';
import path from 'path';
import os from 'os';
import { reset, vol } from '@test/utilities/vol';
import { CWD, LOCAL_CONFIG_PATH } from '@tps/utilities/constants';

jest.mock('fs');
jest.mock('fs/promises');

/*
 * Constants
 */

describe('[TPS] Tpsrc', () => {
	beforeEach(() => {
		reset();
	});

	afterEach(() => {
		// restore the spy created with spyOn
		jest.restoreAllMocks();
	});

	describe('local', () => {
		beforeEach(() => {
			jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);
			jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(false);
		});

		it('should be able to load tpsrc (opts)', async () => {
			const tps: Templates = new Templates('testing-tpsrc');
			// await tps.render(playground.box(), 'App');

			expect(tps.opts.extendedDest).toBe('./new-path');
		});

		it('should be able to load tpsrc (answers)', async () => {
			const tps: Templates = new Templates('testing-tpsrc');

			// eslint-disable-next-line no-underscore-dangle
			expect(tps._prompts.answers.test).toBe('oh-yea');
		});
	});

	describe('parent', () => {
		beforeEach(() => {
			jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);
			jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(false);

			vol.rmSync(path.join(CWD, '.tps/.tpsrc'));
			vol.rmSync(LOCAL_CONFIG_PATH);

			vol.writeFileSync(
				path.join(CWD, '.tps/.tpsrc'),
				JSON.stringify({
					'testing-prompt-core': {
						opts: {
							extendedDest: './parent-path',
						},
						answers: {
							test1: 'parent',
						},
					},
				}),
			);
		});

		it('should be able to load parent directory tpsrc (opts)', async () => {
			const tps: Templates = new Templates('testing-prompt-core');

			expect(tps.opts.extendedDest).toBe('./parent-path');
		});

		it('should be able to load parent directory tpsrc (answers)', async () => {
			const tps: Templates = new Templates('testing-prompt-core');

			// eslint-disable-next-line no-underscore-dangle
			expect(tps._prompts.answers.test1).toBe('parent');
		});
	});

	describe('global', () => {
		const globalTps: string = path.join(os.homedir(), '.tps');
		const globalTpsrc: string = path.join(os.homedir(), '.tps/.tpsrc');

		beforeEach(() => {
			jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(true);

			vol.mkdirSync(globalTps);

			vol.writeFileSync(
				globalTpsrc,
				JSON.stringify({
					'testing-prompt-core': {
						opts: {
							extendedDest: './global-path',
						},
						answers: {
							test1: 'global',
						},
					},
				}),
			);
		});

		afterEach(() => {
			vol.rmdirSync(globalTps, {
				recursive: true,
			});
		});

		it('should be able to load global tpsrc (opts)', async () => {
			const tps: Templates = new Templates('testing-prompt-core');

			expect(tps.opts.extendedDest).toBe('./global-path');
		});

		it('should be able to load global tpsrc (answers)', async () => {
			const tps: Templates = new Templates('testing-prompt-core');

			// eslint-disable-next-line no-underscore-dangle
			expect(tps._prompts.answers.test1).toBe('global');
		});
	});
});
