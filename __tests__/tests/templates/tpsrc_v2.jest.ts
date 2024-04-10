/*
 * Modules
 */
import Templates from '@tps/templates';
import path from 'path';
import { reset, vol } from '@test/utilities/vol';
import { CWD, LOCAL_CONFIG_PATH } from '@tps/utilities/constants';
import { DEFAULT_OPTIONS } from '@tps/templates/templates';
import {
	DEFAULT_PROMPT,
	mkGlobal3rdPartyTemplate,
	mkFile,
	mkGlobalTpsrc,
	mkPrompt,
	mkTpsrc,
	mk3rdPartyTemplate,
} from '@test/utilities/templates';

jest.mock('fs');

describe('[TPS] Tpsrc', () => {
	beforeEach(() => {
		reset();
	});

	afterEach(() => {
		// restore the spy created with spyOn
		jest.restoreAllMocks();
	});

	it('should not load config for another template', async () => {
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
		vol.rmSync(LOCAL_CONFIG_PATH);

		const tps: Templates = new Templates('testing-prompt-core');

		expect(tps.opts).toEqual(expect.objectContaining(DEFAULT_OPTIONS));

		// Janky but it works for now
		// ensure answers are empty. user will need to answer all questions via prompts
		// eslint-disable-next-line no-underscore-dangle
		expect(JSON.stringify(tps._prompts.answers)).toBe('{}');
	});

	it('should not throw error when there is no tpsrc', async () => {
		vol.rmSync(LOCAL_CONFIG_PATH);

		expect(() => {
			return new Templates('testing-prompt-core');
		}).not.toThrowError();
	});

	it('should load a local tpsrc file', () => {
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

	it('should load a parent tpsrc file', () => {
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

		const tps: Templates = new Templates('testing-prompt-core');

		expect(tps.opts.extendedDest).toBe('./parent-path');
		// eslint-disable-next-line no-underscore-dangle
		expect(tps._prompts.answers.test1).toBe('parent');
	});

	it('should load a parent tpsrc file', () => {
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

		const tps: Templates = new Templates('testing-prompt-core');

		expect(tps.opts.extendedDest).toBe('./global-path');

		// eslint-disable-next-line no-underscore-dangle
		expect(tps._prompts.answers.test1).toBe('global');
	});

	it('should use local values over global files', async () => {
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

	it('should load a local tpsrc file not in a tps folder', () => {
		// TODO: Shouldnt have to do this but there is a tpsrc file here in templates.json
		vol.rmSync(path.join(CWD, '.tps/.tpsrc'));

		// TODO: should not be in the tests folder
		const localTpsrc = path.join(CWD, '.tpsrc');

		mkTpsrc(localTpsrc, {
			'testing-prompt-core': {
				opts: {
					extendedDest: './local-not-in-tps-path',
				},
				answers: {
					test1: 'local-not-in-tps',
				},
			},
		});

		const tps: Templates = new Templates('testing-prompt-core');

		expect(tps.opts.extendedDest).toBe('./local-not-in-tps-path');

		// eslint-disable-next-line no-underscore-dangle
		expect(tps._prompts.answers.test1).toBe('local-not-in-tps');
	});

	it('should load local tpsrc file for local 3rd party template', () => {
		mk3rdPartyTemplate('tps-test-3rd-party-package', CWD, {
			'./settings.json': JSON.stringify({
				prompts: [mkPrompt()],
			}),
		});

		mkTpsrc(path.join(CWD, '.tps/.tpsrc'), {
			'tps-test-3rd-party-package': {
				opts: {
					extendedDest: './3rd-party',
				},
				answers: {
					[DEFAULT_PROMPT.name]: true,
				},
			},
		});

		const tps: Templates = new Templates('tps-test-3rd-party-package');

		expect(tps.opts.extendedDest).toBe('./3rd-party');

		// eslint-disable-next-line no-underscore-dangle
		expect(tps._prompts.answers.prompt1).toBeTruthy();
	});

	it('should load local tpsrc file for global 3rd party template', () => {
		mkGlobal3rdPartyTemplate('tps-test-3rd-party-package', {
			'./settings.json': JSON.stringify({
				prompts: [mkPrompt()],
			}),
		});

		mkTpsrc(path.join(CWD, '.tps/.tpsrc'), {
			'tps-test-3rd-party-package': {
				opts: {
					extendedDest: './3rd-party',
				},
				answers: {
					[DEFAULT_PROMPT.name]: true,
				},
			},
		});

		const tps: Templates = new Templates('tps-test-3rd-party-package');

		expect(tps.opts.extendedDest).toBe('./3rd-party');

		// eslint-disable-next-line no-underscore-dangle
		expect(tps._prompts.answers.prompt1).toBeTruthy();
	});

	// it('should be able to override a tpsrc file location', () => {

	// 	const randomDir = path.join(process.cwd(), './random/.tps/tpsrc');

	// 	mkTpsrc(LOCAL_CONFIG_PATH, {
	// 		'testing-prompt-core': {
	// 			opts: {
	// 				extendedDest: './local-path',
	// 			},
	// 			answers: {
	// 				test1: 'local',
	// 			},
	// 		},
	// 	});

	// 	const tps: Templates = new Templates('testing-prompt-core');

	// 	expect(tps.opts.extendedDest).toBe('./local-path');

	// 	// eslint-disable-next-line no-underscore-dangle
	// 	expect(tps._prompts.answers.test1).toBe('local');
	// });
});
