/*
 * Modules
 */
import Templates from '@tps/templates';
import path from 'path';
import { reset, vol } from '@test/utilities/vol';
import { CWD, LOCAL_CONFIG_PATH } from '@tps/utilities/constants';
import { DEFAULT_OPTIONS } from '@tps/templates/templates';
import { mkFile, mkGlobalTpsrc, mkTpsrc } from '@test/utilities/templates';

jest.mock('fs');
jest.mock('fs/promises');

describe('[TPS] Tpsrc', () => {
	beforeEach(() => {
		reset();
	});

	afterEach(() => {
		// restore the spy created with spyOn
		jest.restoreAllMocks();
	});

	it('should not load config for another template', async () => {
		jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);

		vol.rmSync(LOCAL_CONFIG_PATH);

		mkTpsrc(LOCAL_CONFIG_PATH, {
			'testing-prompt-core-2': {
				opts: {
					extendedDest: './local-path',
				},
				answers: {
					test1: 'local',
				},
			},
		});

		const tps: Templates = new Templates('testing-prompt-core');

		expect(tps.opts).toEqual(expect.objectContaining(DEFAULT_OPTIONS));

		// Janky but it works for now
		// ensure answers are empty. user will need to answer all questions via prompts
		// eslint-disable-next-line no-underscore-dangle
		expect(JSON.stringify(tps._prompts.answers)).toBe('{}');
	});

	it('should work when there is no tpsrc', async () => {
		jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(false);
		jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(false);

		vol.rmSync(LOCAL_CONFIG_PATH);

		const tps: Templates = new Templates('testing-prompt-core');

		expect(tps.opts).toEqual(expect.objectContaining(DEFAULT_OPTIONS));

		// Janky but it works for now
		// ensure answers are empty. user will need to answer all questions via prompts
		// eslint-disable-next-line no-underscore-dangle
		expect(JSON.stringify(tps._prompts.answers)).toBe('{}');
	});

	it('should user local values over global files', async () => {
		jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);
		jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(true);

		vol.rmSync(LOCAL_CONFIG_PATH);

		mkGlobalTpsrc({
			'testing-prompt-core': {
				opts: {
					extendedDest: './global-path',
				},
				answers: {
					test1: 'global',
				},
			},
		});

		mkTpsrc(LOCAL_CONFIG_PATH, {
			'testing-prompt-core': {
				opts: {
					extendedDest: './local-path',
				},
				answers: {
					test1: 'local',
				},
			},
		});

		const tps: Templates = new Templates('testing-prompt-core');

		expect(tps.opts.extendedDest).toBe('./local-path');
		// eslint-disable-next-line no-underscore-dangle
		expect(tps._prompts.answers.test1).toBe('local');
	});

	it('should be able to load a yaml file', async () => {
		jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);

		vol.rmSync(LOCAL_CONFIG_PATH);

		mkFile(
			LOCAL_CONFIG_PATH,
			`\
testing-prompt-core:
    opts:
        extendedDest: ./yaml-path
    answers:
        test1: yaml
`,
		);

		const tps: Templates = new Templates('testing-prompt-core');

		expect(tps.opts.extendedDest).toBe('./yaml-path');
		// eslint-disable-next-line no-underscore-dangle
		expect(tps._prompts.answers.test1).toBe('yaml');
	});

	it('should be able to load a yaml file', async () => {
		jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);

		vol.rmSync(LOCAL_CONFIG_PATH);

		mkFile(
			LOCAL_CONFIG_PATH,
			`\
testing-prompt-core:
    opts:
        extendedDest: ./yaml-path
    answers:
        test1: yaml
`,
		);

		const tps: Templates = new Templates('testing-prompt-core');

		expect(tps.opts.extendedDest).toBe('./yaml-path');
		// eslint-disable-next-line no-underscore-dangle
		expect(tps._prompts.answers.test1).toBe('yaml');
	});

	describe('local', () => {
		beforeEach(() => {
			jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);
			jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(false);

			mkTpsrc(LOCAL_CONFIG_PATH, {
				'testing-prompt-core': {
					opts: {
						extendedDest: './local-path',
					},
					answers: {
						test1: 'local',
					},
				},
			});
		});

		it('should be able to load tpsrc (opts)', async () => {
			const tps: Templates = new Templates('testing-prompt-core');

			expect(tps.opts.extendedDest).toBe('./local-path');
		});

		it('should be able to load tpsrc (answers)', async () => {
			const tps: Templates = new Templates('testing-prompt-core');

			// eslint-disable-next-line no-underscore-dangle
			expect(tps._prompts.answers.test1).toBe('local');
		});
	});

	describe('parent', () => {
		beforeEach(() => {
			jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(true);
			jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(false);

			vol.rmSync(LOCAL_CONFIG_PATH);

			mkTpsrc(path.join(CWD, '.tps/.tpsrc'), {
				'testing-prompt-core': {
					opts: {
						extendedDest: './parent-path',
					},
					answers: {
						test1: 'parent',
					},
				},
			});
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
		beforeEach(() => {
			jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(true);

			mkGlobalTpsrc({
				'testing-prompt-core': {
					opts: {
						extendedDest: './global-path',
					},
					answers: {
						test1: 'global',
					},
				},
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
