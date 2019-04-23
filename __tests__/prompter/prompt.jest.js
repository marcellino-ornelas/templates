import Prompter from '@tps/prompter';
import { PROMPTER_QUESTIONS } from '../support/constants';
import { array } from 'is';

const prompter = new Prompter(PROMPTER_QUESTIONS);

describe('[Prompter] Prompt:', () => {
  let prompt = prompter.getPrompt('testingPrompt');

  it('should have all correct properties', () => {
    expect(prompt).toEqual(
      expect.objectContaining({
        name: 'testingPrompt',
        aliases: expect.arrayContaining(['test1', 't']),
        message: 'This is a testing testing prompt',
        default: 'dont have feauture yet',
        choices: expect.any(Array)
      })
    );
  });

  it.each([['name', 'testingPrompt'], ['alias', 't']])(
    'should answer prompt by %s',
    (name, testingPrompt) => {
      const answers = { [testingPrompt]: 'data' };
      expect(prompt.answerWith(answers)).toEqual('data');
    }
  );

  it('should return undefined if not correct answers', () => {
    const answers = { randomKey: 'data' };
    expect(prompt.answerWith(answers)).toBeUndefined();
  });
});
