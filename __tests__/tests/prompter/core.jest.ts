/*
 * Modules
 */
import Prompter from '@tps/prompter';
import { PROMPTER_QUESTIONS } from '@test/utilities/constants';
import { mkPrompt } from '@test/utilities/templates';

const ANSWER_TO_PROMPTS = {
	testingPrompt: 'data',
};

describe('[Prompter] Core:', () => {
	let prompter;
	beforeEach(() => {
		prompter = new Prompter(PROMPTER_QUESTIONS);
	});

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

	it('should have all prompt answer when answered with alias', async () => {
		prompter.setAnswers({
			t: 'data',
		});

		const result = await prompter.getAnswers();

		expect(result).toEqual(expect.objectContaining(ANSWER_TO_PROMPTS));
	});

	it('should tell you if it has answer to a prompt', () => {
		prompter.setAnswers({
			t: 'oh ya!',
		});

		expect(prompter.hasAnswerToPrompt('testingPrompt')).toBeTruthy();
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
});
