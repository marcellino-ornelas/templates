/*
 * Modules
 */
import {
	mkPrompt,
	mkSettingsFileJSON,
	mkTemplate,
} from '@test/utilities/templates';
import { CWD } from '@tps/utilities/constants';
import { reset } from '@test/utilities/vol';
import path from 'path';
import inquirer from 'inquirer';

jest.mock('inquirer');
jest.mock('fs');

describe('Prompting: ', () => {
	beforeEach(() => {
		// jest.resetAllMocks();
		reset();
	});

	it('should be able to use a template with no prompts', async () => {
		const tps = mkTemplate('index', undefined, {
			'./settings.json': JSON.stringify({}),
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App')).toBeDirectory();
	});

	it('should be able to use a template with empty prompts', async () => {
		const tps = mkTemplate('index', undefined, {
			'./settings.json': JSON.stringify({
				prompts: [],
			}),
		});

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App')).toBeDirectory();
	});

	it('should be able use a prompt', async () => {
		const tps = mkTemplate('prompts-core', CWD, {
			'settings.json': mkSettingsFileJSON({
				prompts: [
					mkPrompt({
						name: 'package1',
					}),
				],
			}),
			'default/readme.md': `hey`,
			'package1/package1.js': `hey`,
		});

		await tps.render(CWD, 'App');

		jest.mocked(inquirer.prompt).mockResolvedValue({ package1: true });

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/readme.md')).toBeFile();
		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/package1.js')).not.toBeFile();
	});

	it('should add prompt to answers', async () => {
		const tps = mkTemplate('prompts-core', CWD, {
			'settings.json': mkSettingsFileJSON({
				prompts: [
					mkPrompt({
						name: 'package1',
					}),
				],
			}),
			'default/readme.md.dot': `{{= tps.answers.package1 }}`,
			'package1/package1.js': `hey`,
		});

		tps.setAnswers({ package1: 'hey' });

		await tps.render(CWD, 'App');

		// @ts-expect-error no types for extending jest functions
		expect(path.join(CWD, 'App/readme.md')).toHaveFileContents('hey');
	});

	describe('typeType: ', () => {
		it('should be able use null as answer for package', async () => {
			const tps = mkTemplate('prompts-core', CWD, {
				'settings.json': mkSettingsFileJSON({
					prompts: [
						mkPrompt({
							name: 'package1',
							tpsType: 'package',
						}),
					],
				}),
				'default/readme.md': `hey`,
				'package1/package1.js': `hey`,
			});

			tps.setAnswers({
				package1: null,
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/readme.md')).toBeFile();
			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/package1.js')).not.toBeFile();
		});

		it('should be able use undefined as answer for package', async () => {
			const tps = mkTemplate('prompts-core', CWD, {
				'settings.json': mkSettingsFileJSON({
					prompts: [
						mkPrompt({
							name: 'package1',
							tpsType: 'package',
						}),
					],
				}),
				'default/readme.md': `hey`,
				'package1/package1.js': `hey`,
			});

			tps.setAnswers({
				package1: undefined,
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/readme.md')).toBeFile();

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/package1.js')).not.toBeFile();
		});

		it('should be able use string as answer for package', async () => {
			const tps = mkTemplate('prompts-core', CWD, {
				'settings.json': mkSettingsFileJSON({
					prompts: [
						mkPrompt({
							name: 'prompt',
							tpsType: 'package',
						}),
					],
				}),
				'default/readme.md': `hey`,
				'package1/package1.js': `hey`,
			});

			tps.setAnswers({
				prompt: 'package1',
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/readme.md')).toBeFile();
			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/package1.js')).toBeFile();
		});

		it('should be able use array as answer for package', async () => {
			const tps = mkTemplate('prompts-core', CWD, {
				'settings.json': mkSettingsFileJSON({
					prompts: [
						mkPrompt({
							name: 'prompt',
							tpsType: 'package',
						}),
					],
				}),
				'default/readme.md': `hey`,
				'package1/package1.js': `hey`,
				'package2/package2.js': `hey`,
			});

			tps.setAnswers({
				prompt: ['package1', 'package2'],
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/readme.md')).toBeFile();

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/package1.js')).toBeFile();

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/package2.js')).toBeFile();
		});

		it('should be able use data', async () => {
			const tps = mkTemplate('prompts-core', CWD, {
				'settings.json': mkSettingsFileJSON({
					prompts: [
						mkPrompt({
							name: 'prompt',
							tpsType: 'data',
						}),
					],
				}),
				'default/readme.md': `hey`,
				'package1/package1.js': `hey`,
			});

			tps.setAnswers({
				prompt: 'hey',
			});

			await tps.render(CWD, 'App');

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/readme.md')).toBeFile();

			// @ts-expect-error no types for extending jest functions
			expect(path.join(CWD, 'App/package1.js')).not.toBeFile();
		});
	});
});
