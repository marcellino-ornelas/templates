/*
 * Modules
 */
import Prompter from '@tps/prompter';
import { mkPrompt } from '@test/utilities/templates';
import inquirer from 'inquirer';

jest.mock('inquirer');

describe('[Prompter] Core:', () => {
	it('should have all prompt answers', async () => {
		const prompter = new Prompter([
			mkPrompt({
				name: 'prompt1',
			}),
			mkPrompt({
				name: 'prompt2',
			}),
		]);

		const answers = {
			prompt1: true,
			prompt2: true,
		};

		prompter.setAnswers(answers);

		const result = await prompter.getAnswers();

		expect(result).toEqual(expect.objectContaining(answers));
	});

	it('should use default values when passed default option', async () => {
		const prompter = new Prompter(
			[
				mkPrompt({
					name: 'prompt1',
					default: false,
				}),
				mkPrompt({
					name: 'prompt2',
					default: true,
				}),
			],
			{
				default: true,
			},
		);

		const result = await prompter.getAnswers();

		expect(result).toEqual(
			expect.objectContaining({
				prompt1: false,
				prompt2: true,
			}),
		);
	});

	it('should be able to answer prompt with alias', async () => {
		const prompter = new Prompter([
			mkPrompt({
				name: 'prompt1',
				aliases: ['p'],
			}),
		]);

		prompter.setAnswers({
			p: true,
		});

		const result = await prompter.getAnswers();

		expect(result).toEqual(
			expect.objectContaining({
				prompt1: true,
			}),
		);
	});

	it('should return true if prompt has a answer', () => {
		const prompter = new Prompter([
			mkPrompt({
				name: 'prompt1',
			}),
		]);

		prompter.setAnswers({
			prompt1: 'oh ya!',
		});

		expect(prompter.hasAnswerToPrompt('prompt1')).toBeTruthy();
	});

	it('should return true if prompt has an answer, by alias', () => {
		const prompter = new Prompter([
			mkPrompt({
				name: 'prompt1',
				aliases: ['p'],
			}),
		]);

		prompter.setAnswers({
			p: true,
		});

		expect(prompter.hasAnswerToPrompt('prompt1')).toBeTruthy();
	});

	it('should return false if prompt has an answer, by alias', () => {
		const prompter = new Prompter([
			mkPrompt({
				name: 'prompt1',
				aliases: ['p'],
			}),
		]);

		expect(prompter.hasAnswerToPrompt('prompt1')).toBeFalsy();
	});

	it('should tell you if it has answer to a prompt', () => {
		const prompter = new Prompter([
			mkPrompt({
				name: 'prompt1',
			}),
		]);

		prompter.setAnswers({
			prompt1: 'oh ya!',
		});

		expect(prompter.hasAnswerToPrompt('prompt1')).toBeTruthy();
	});

	it('should support hidden prompts', async () => {
		const prompter = new Prompter([
			mkPrompt({
				name: 'prompt1',
			}),
			mkPrompt({
				name: 'prompt2',
				hidden: true,
			}),
		]);

		prompter.setAnswers({
			prompt1: true,
		});

		const result = await prompter.getAnswers();

		expect(result).toEqual(
			expect.objectContaining({
				prompt1: true,
				prompt2: null,
			}),
		);
	});

	it('should answer hidden prompts after regular prompts', async () => {
		jest.mocked(inquirer.prompt).mockResolvedValue({
			prompt1: 'prompt1',
		});

		const prompter = new Prompter([
			// hidden prompt should be able to use answer from non hidden prompt
			mkPrompt({
				name: 'prompt2',
				type: 'input',
				default: (answers) => `${answers.prompt1}`,
				hidden: true,
			}),
			mkPrompt({
				name: 'prompt1',
				type: 'input',
			}),
		]);

		// prompter.setAnswers({
		// 	prompt1: 'prompt1',
		// });

		const result = await prompter.getAnswers();

		expect(result).toEqual(
			expect.objectContaining({
				prompt1: 'prompt1',
				prompt2: 'prompt1',
			}),
		);
	});

	it('should use default value for hidden prompt when set', async () => {
		const prompter = new Prompter([
			mkPrompt({
				name: 'prompt2',
				hidden: true,
				default: true,
			}),
		]);

		const result = await prompter.getAnswers();

		expect(result).toEqual(
			expect.objectContaining({
				prompt2: true,
			}),
		);
	});

	it('should use default value for hidden prompt when set', async () => {
		const prompter = new Prompter([
			mkPrompt({
				name: 'prompt2',
				hidden: true,
				default: true,
			}),
		]);

		const result = await prompter.getAnswers();

		expect(result).toEqual(
			expect.objectContaining({
				prompt2: true,
			}),
		);
	});

	it('should show hidden prompts when showHiddenPrompts is true', async () => {
		const prompter = new Prompter(
			[
				mkPrompt({
					name: 'prompt1',
					hidden: true,
					default: true,
				}),
				mkPrompt({
					name: 'prompt2',
					default: true,
				}),
			],
			{
				showHiddenPrompts: true,
			},
		);

		jest.mocked(inquirer.prompt).mockResolvedValue({
			prompt2: true,
		});

		await prompter.getAnswers();

		expect(inquirer.prompt).toHaveBeenCalledWith(
			expect.arrayContaining([
				expect.objectContaining({
					name: 'prompt1',
					hidden: true,
					default: true,
				}),
				expect.objectContaining({
					name: 'prompt2',
					default: true,
				}),
			]),
		);
	});
});
