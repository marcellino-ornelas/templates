import yargs from 'yargs/yargs';
import use from '@tps/cli/commands/use';
import {
	mkPrompt,
	mkSettingsFileJSON,
	mkTemplate,
} from '@test/utilities/templates';
import { reset } from '@test/utilities/vol';
import { SettingsFilePromptType } from '@tps/types/settings';

jest.mock('fs');

describe('Command Line: Use', () => {
	beforeEach(async () => {
		reset();
	});

	describe('help', () => {
		it('should display template options in help', async () => {
			const templateName = 'testing-use-command';

			await mkTemplate(templateName, undefined, {
				'settings.json': mkSettingsFileJSON({
					prompts: [
						mkPrompt({
							name: 'prompt1',
						}),
					],
				}),
			});

			const parser = yargs([templateName, '--help']).command(use);

			const help = await parser.getHelp();

			expect(help).toContain('--prompt1');
		});

		it('should display template name in sentence case', async () => {
			const templateName = 'testing-use-command';

			await mkTemplate(templateName, undefined, {
				'settings.json': mkSettingsFileJSON({
					prompts: [
						mkPrompt({
							name: 'prompt1',
						}),
					],
				}),
			});

			const parser = yargs([templateName, '--help']).command(use);

			const help = await parser.getHelp();

			expect(help).toContain('Testing use command:');
		});

		it('should display nothing if no prompts', async () => {
			const templateName = 'testing-use-command';

			await mkTemplate(templateName, undefined, {
				'settings.json': mkSettingsFileJSON({}),
			});

			const parser = yargs([templateName, '--help']).command(use);

			const help = await parser.getHelp();

			expect(help).not.toContain('Testing use command:');
		});

		it('should display description if provided in help', async () => {
			const templateName = 'testing-use-command';

			await mkTemplate(templateName, undefined, {
				'settings.json': mkSettingsFileJSON({
					prompts: [
						mkPrompt({
							name: 'prompt1',
							description: 'prompt1 description',
						}),
					],
				}),
			});

			const parser = yargs([templateName, '--help']).command(use);

			const help = await parser.getHelp();

			expect(help).toMatch(/--prompt1\W*prompt1 description/);
		});

		it.each<{ inquireType: SettingsFilePromptType; yargsType: string }>([
			{
				inquireType: SettingsFilePromptType.input,
				yargsType: 'string',
			},
			{
				inquireType: SettingsFilePromptType.confirm,
				yargsType: 'boolean',
			},
			{
				inquireType: SettingsFilePromptType.list,
				yargsType: 'string',
			},
			{
				inquireType: SettingsFilePromptType.checkbox,
				yargsType: 'array',
			},
			{
				inquireType: SettingsFilePromptType.password,
				yargsType: 'string',
			},
			{
				inquireType: SettingsFilePromptType.rawlist,
				yargsType: 'string',
			},
		])(
			'should display correct yargs type ($inquireType, $yargsType)',
			async ({ inquireType, yargsType }) => {
				const templateName = 'testing-use-command';

				await mkTemplate(templateName, undefined, {
					'settings.json': mkSettingsFileJSON({
						prompts: [
							mkPrompt({
								name: 'prompt1',
								type: inquireType,
							}),
						],
					}),
				});

				const parser = yargs([templateName, '--help']).command(use);

				const help = await parser.getHelp();

				expect(help).toMatch(new RegExp(`--prompt1\\W*\\[${yargsType}\\]`));
			},
		);

		it('should display choices', async () => {
			const templateName = 'testing-use-command';

			await mkTemplate(templateName, undefined, {
				'settings.json': mkSettingsFileJSON({
					prompts: [
						mkPrompt({
							name: 'prompt1',
							type: 'checkbox',
							choices: ['one', 'two'],
						}),
					],
				}),
			});

			const parser = yargs([templateName, '--help']).command(use);

			const help = await parser.getHelp();

			expect(help).toMatch(/--prompt1\W*\[array\] \[choices: "one", "two"\]/);
		});

		it('should not use default values', async () => {
			const templateName = 'testing-use-command';

			await mkTemplate(templateName, undefined, {
				'settings.json': mkSettingsFileJSON({
					prompts: [
						mkPrompt({
							name: 'prompt1',
							type: 'confirm',
							default: true,
						}),
					],
				}),
			});

			const parser = yargs([templateName, '--help']).command(use);

			const help = await parser.getHelp();

			expect(help).not.toMatch(
				/--prompt1\W*\[boolean\] \[default: true\]\W*$/m,
			);
		});

		it('should support aliases', async () => {
			const templateName = 'testing-use-command';

			await mkTemplate(templateName, undefined, {
				'settings.json': mkSettingsFileJSON({
					prompts: [
						mkPrompt({
							name: 'prompt1',
							type: 'confirm',
							aliases: ['t', 'p1'],
						}),
					],
				}),
			});

			const parser = yargs([templateName, '--help']).command(use);

			const help = await parser.getHelp();

			expect(help).toMatch(/-t, --prompt1, --p1\W*\[boolean\]/);
		});
	});
});
