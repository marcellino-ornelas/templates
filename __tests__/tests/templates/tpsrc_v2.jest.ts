/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import Templates from '@tps/templates';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { vol } from '@test/utilities/vol';
import { CWD, LOCAL_CONFIG_PATH, LOCAL_PATH } from '@tps/utilities/constants';

jest.mock('fs');

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS] Tpsrc', () => {
	beforeAll(() => playground.create());
	afterAll(() => playground.destroy());

	beforeEach(() => {
		return playground.createBox('_');
	});

	describe('local', () => {
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

	describe('global', () => {
		const globalTps: string = path.join(os.homedir(), '.tps');
		const globalTpsrc: string = path.join(os.homedir(), '.tps/.tpsrc');

		beforeAll(() => {
			jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(true);

			fs.mkdirSync(globalTps);

			fs.writeFileSync(
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

		afterAll(() => {
			jest.clearAllMocks();

			fs.rmdirSync(globalTps, {
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

	describe('parent', () => {
		const parentTps: string = path.join(LOCAL_PATH, '../../../.tps');
		const parentTpsrc: string = path.join(parentTps, '.tpsrc');

		beforeAll(() => {
			jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);
			jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(false);

			fs.mkdirSync(parentTps);

			fs.writeFileSync(
				parentTpsrc,
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

			fs.rmSync(path.join(CWD, '.tps/.tpsrc'));
			fs.rmSync(LOCAL_CONFIG_PATH);
		});

		afterAll(() => {
			jest.clearAllMocks();

			fs.rmdirSync(parentTps, {
				recursive: true,
			});
		});

		it('should be able to load parent directory tpsrc (opts)', async () => {
			console.log(vol.toTree());
			const tps: Templates = new Templates('testing-prompt-core');

			expect(tps.opts.extendedDest).toBe('./parent-path');
		});

		it('should be able to load parent directory tpsrc (answers)', async () => {
			const tps: Templates = new Templates('testing-prompt-core');

			// eslint-disable-next-line no-underscore-dangle
			expect(tps._prompts.answers.test1).toBe('parent');
		});
	});
});
