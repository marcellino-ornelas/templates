import Prompter from '@tps/prompter';
import { PROMPTER_QUESTIONS } from '@test/utilities/constants';

const prompter = new Prompter(PROMPTER_QUESTIONS);

describe('[Prompter] Prompt:', () => {
  const prompt = prompter.getPrompt('testingPrompt');

  it('should have all correct properties', () => {
    expect(prompt).toMatchObject({
      name: 'testingPrompt',
      aliases: ['test1', 't'],
      message: 'This is a testing testing prompt',
      default: 'default value',
      choices: expect.any(Array),
    });
  });

  it.each([
    ['name', 'testingPrompt'],
    ['alias', 't'],
  ])('should answer prompt by %s', (name, testingPrompt) => {
    const answers = { [testingPrompt]: 'data' };
    expect(prompt.answerWith(answers)).toEqual('data');
  });

  it('should return undefined if not correct answers', () => {
    const answers = { randomKey: 'data' };
    expect(prompt.answerWith(answers)).toBeUndefined();
  });
});
