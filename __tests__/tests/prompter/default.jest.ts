/*
 * Modules
 */
import Prompter from '@tps/prompter';
import { PROMPTER_QUESTIONS } from '@test/utilities/constants';
import { SettingsFilePrompt } from '@tps/types/settings';

const DEFAULT_ANSWER_TO_PROMPT = {
  testingPrompt: 'default value',
  testingPrompt2: 'js',
};

/*
 * Constants
 */

describe('[Prompter] Default:', () => {
  let prompter;

  beforeEach(() => {
    prompter = new Prompter(
      [
        ...PROMPTER_QUESTIONS,
        {
          type: 'input',
          name: 'testingPrompt2',
          message: 'hey',
          default: () => 'js',
        } as unknown as SettingsFilePrompt,
      ],
      {
        default: true,
      }
    );
  });

  it('should be able to use defaults option', () =>
    prompter.getAnswers().then((promptAnswers) => {
      expect(promptAnswers).toMatchObject(DEFAULT_ANSWER_TO_PROMPT);
    }));
});
