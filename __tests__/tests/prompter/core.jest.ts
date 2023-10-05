/*
 * Modules
 */
import Prompter from '@tps/prompter';
import { PROMPTER_QUESTIONS } from '@test/utilities/constants';

const ANSWER_TO_PROMPTS = {
	testingPrompt: 'data',
};

describe('[Prompter] Core:', () => {
	let prompter;
	beforeEach(() => {
		prompter = new Prompter(PROMPTER_QUESTIONS);
	});

	it('should have all prompt answers', () => {
		prompter.setAnswers(ANSWER_TO_PROMPTS);

		return prompter.getAnswers().then((promptAnswers) => {
			expect(promptAnswers).toEqual(expect.objectContaining(ANSWER_TO_PROMPTS));
		});
	});

	it('should have all prompt answer when answered with alias', () => {
		prompter.setAnswers({
			t: 'data',
		});

		return prompter.getAnswers().then((promptAnswers) => {
			expect(promptAnswers).toEqual(expect.objectContaining(ANSWER_TO_PROMPTS));
		});
	});

	it('should tell you if it has answer to a prompt', () => {
		prompter.setAnswers({
			t: 'oh ya!',
		});

		expect(prompter.hasAnswerToPrompt('testingPrompt')).toBeTruthy();
	});
});
