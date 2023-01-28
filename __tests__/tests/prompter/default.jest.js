/*
 * Modules
 */
import Prompter from '@tps/prompter';
import { PROMPTER_QUESTIONS } from '@test/utilities/constants';

const DEFAULT_ANSWER_TO_PROMPT = {
  testingPrompt: 'default value',
};

/*
 * Constants
 */

describe('[Prompter] Default:', () => {
  let prompter;

  beforeEach(() => {
    prompter = new Prompter(PROMPTER_QUESTIONS, {
      default: true,
    });
  });

  it('should be able to use defaults option', () =>
    prompter.getAnswers().then((promptAnswers) => {
      expect(promptAnswers).toMatchObject(DEFAULT_ANSWER_TO_PROMPT);
    }));
});
