/*
 * Modules
 */
import Prompter from '@tps/prompter';
import { PROMPTER_QUESTIONS } from '../support/constants';

const ANSWER_TO_PROMPTS = {
  'test-normal-flag': 'value1',
  'test-advanced-long': 'value2',
  'test-advanced-short': 'value3'
};

describe('[Prompter] Core:', () => {
  let prompter;
  beforeEach(() => {
    prompter = new Prompter(PROMPTER_QUESTIONS);
  });

  it('should have all prompt answers', () => {
    prompter.setAnswers(ANSWER_TO_PROMPTS);

    prompter.getAnswers().then(promptAnswers => {
      expect(promptAnswers).toEqual(expect.objectContaining(ANSWER_TO_PROMPTS));
    });
  });

  it('should have all prompt answer when flags are put in', () => {
    prompter.setAnswers({
      'test-normal-flag': 'value1',
      // testing long flag
      test2: 'value2',
      // testing short flag
      d: 'value3'
    });

    prompter.getAnswers().then(promptAnswers => {
      expect(promptAnswers).toEqual(expect.objectContaining(ANSWER_TO_PROMPTS));
    });
  });
});
