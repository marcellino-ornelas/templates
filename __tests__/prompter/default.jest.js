/*
 * Modules
 */
import Prompter from '@tps/prompter';
import { PROMPTER_QUESTIONS } from '@test/support/constants';

const DEFAULT_ANSWER_TO_PROMPT = {
  testingPrompt: 'default value'
};

/*
 * Constants
 */

describe('[Prompter] Default: ', () => {
  let prompter;

  beforeEach(() => {
    prompter = new Prompter(PROMPTER_QUESTIONS, {
      default: true
    });
  });

  it('should be able to use defaults option', () => {
    prompter.getAnswers().then(promptAnswers => {
      expect(promptAnswers).toEqual(
        expect.objectContaining(DEFAULT_ANSWER_TO_PROMPT)
      );
    });
  });
});
